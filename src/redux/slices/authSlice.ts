import {Platform} from 'react-native';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AUTH, PHONE_VERIFICATION} from '@whenly/constants';
import {joinWithSlash} from '@whenly/utils/string';
import {
  getCurrentUser,
  getRequestAccountDeletion,
  postFacebookLogin,
  postGoogleLogin,
  postLogin,
  postLogout,
  postRegister,
  postSendOTP,
  postUpdateClient,
  postVerifyOTP,
} from '@whenly/services';
import {
  AccessToken,
  AuthenticationToken,
  LoginManager,
} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {errorToast, successToast} from '@whenly/utils/useToast';
import {postUploadAvatar} from '../../services/uploadService';
import {User} from '@types/alltypes';

export type AuthState = {
  loading: boolean;
  error: string;
  user: User | null;
  accessToken: string | null;
};

const currentUser = createAsyncThunk(
  joinWithSlash(AUTH, 'currentUser'),
  async () => {
    try {
      const response = await getCurrentUser();
      console.log('CURRENT USER', response);
      return response?.data?.user;
    } catch (error) {
      console.log('Error', error);
    }
  },
);

const login = createAsyncThunk(
  joinWithSlash(AUTH, 'login'),
  async (payload: {email: string; password: string}, {rejectWithValue}) => {
    try {
      console.log('loginSlice', payload);
      const response = await postLogin(payload.email, payload.password);
      console.log('loginSliceResponse', response);
      successToast('Success', 'Login successful');
      return response?.data?.user;
    } catch (error) {
      console.log('Error', error);
      errorToast(
        'Authentication Failed',
        error?.response?.data?.message ||
          'Something went wrong.Please try again later',
      );

      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

const register = createAsyncThunk(
  joinWithSlash(AUTH, 'register'),
  async (user: Partial<User>, {rejectWithValue}) => {
    try {
      const response = await postRegister(user);
      successToast('Success', 'Registration successful');
      return response?.data?.user;
    } catch (error) {
      console.log('Error', error);
      errorToast(
        'Authentication Failed',
        error?.response?.data?.message ||
          'Something went wrong.Please try again later',
      );
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

const updateUser = createAsyncThunk(
  joinWithSlash(AUTH, 'updateUser'),
  async (payload: Partial<User>, {rejectWithValue}) => {
    try {
      const {profilePicture, profileUpload, ...rest} = payload;
      let avatar = profilePicture;
      if (profileUpload) {
        const formData = new FormData();
        formData.append('file', {
          name: profileUpload.fileName,
          type: profileUpload.type,
          uri:
            Platform.OS === 'ios'
              ? profileUpload.uri.replace('file://', '')
              : profileUpload.uri,
        });

        const {data} = await postUploadAvatar(formData);
        if (data.url) {
          avatar = data.url;
        }
      }
      const updatedPayload = {
        ...rest,
        profilePicture: avatar,
      };
      console.log('updatedPayload', updatedPayload);
      const response = await postUpdateClient(updatedPayload);
      console.log('TEST', response);
      successToast('Success', 'Account updated successful');
      return response?.data;
    } catch (error) {
      console.log('Error', error);
      // errorToast(
      //   'Authentication Failed',
      //   error?.response?.data?.message ||
      //     'Something went wrong.Please try again later',
      // );
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

const updateFavorites = createAsyncThunk(
  joinWithSlash(AUTH, 'updateFavorites'),
  async (
    payload: {id: string; merchant: string},
    {rejectWithValue, getState},
  ) => {
    try {
      const {auth: AuthState} = getState();
      const {id, merchant} = payload;
      const favorites = AuthState.user.favorites;
      let updatedFavorites = favorites.map((merc) => merc.id);
      const idx = updatedFavorites.findIndex((idx) => idx === merchant);
      if (idx !== -1) {
        updatedFavorites.splice(idx, 1);
      } else {
        updatedFavorites.push(merchant);
      }
      console.log('updateFavorites', updatedFavorites);
      const response = await postUpdateClient({
        id,
        favorites: updatedFavorites,
      } as Partial<User>);
      successToast('Success', 'Favorites successfully updated');
      return response?.data;
    } catch (error) {
      console.log('Error', error);
      errorToast('Error', 'Favorites update failed');
      return rejectWithValue('Favorites update failed');
    }
  },
);

const sendOTP = createAsyncThunk(
  joinWithSlash(AUTH, 'sendOTP'),
  async (phoneNumber: string, {rejectWithValue}) => {
    try {
      const response = await postSendOTP(phoneNumber);
      console.log('response', response);
      successToast('Success', 'OTP successfully sent');
    } catch (error) {
      console.log('Error', error);
      errorToast(
        'OTP Failed',
        error?.response?.data?.message ||
          'Something went wrong.Please try again later',
      );
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

const verifyOTP = createAsyncThunk(
  joinWithSlash(AUTH, 'verifyOTP'),
  async (code: string, {rejectWithValue}) => {
    try {
      console.log('COde', code);
      const response = await postVerifyOTP(code);
      successToast('Success', 'Phone number verified');
      console.log('response', response);
    } catch (error) {
      console.log('Error', error);
      errorToast(
        'OTP Failed',
        error?.response?.data?.message ||
          'Something went wrong.Please try again later',
      );
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

const facebookLogin = createAsyncThunk(
  joinWithSlash(AUTH, 'facebookLogin'),
  async (_, {rejectWithValue}) => {
    try {
      // Attempt a login using the Facebook login dialog asking for default permissions.
      const response = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (Platform.OS === 'ios') {
        const result = await AuthenticationToken.getAuthenticationTokenIOS();
        console.log(result?.authenticationToken);
      } else {
        const result = await AccessToken.getCurrentAccessToken();
        console.log(result?.accessToken);
        const response = await postFacebookLogin(result?.accessToken);
        return response?.data?.user;
      }

      if (response.isCancelled) {
        errorToast('Authentication Failed', 'User cancelled');
        return rejectWithValue('User cancelled');
      }
    } catch (error) {
      console.log('Error', error);
      errorToast(
        'Authentication Failed',
        error?.response?.data?.message ||
          'Something went wrong.Please try again later',
      );
      return rejectWithValue('Something went wrong. Please try again');
    }
  },
);

const googleLogin = createAsyncThunk(
  joinWithSlash(AUTH, 'googleLogin'),
  async (_, {rejectWithValue}) => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Response', userInfo);
      const response = await postGoogleLogin(userInfo?.idToken);
      return response?.data?.user;
    } catch (error: any) {
      console.log('Error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        errorToast('Authentication Failed', 'User cancelled');
        return rejectWithValue('User cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        errorToast(
          'Authentication Failed',
          error?.response?.data?.message ||
            'Something went wrong.Please try again later',
        );
        return rejectWithValue('Something went wrong. Please try again');
      }
    }
  },
);

const requestAccountDeletion = createAsyncThunk(
  joinWithSlash(AUTH, 'requestAccountDeletion'),
  async () => {
    try {
      await getRequestAccountDeletion();
      await postLogout();
      successToast(
        'Account Deletion Request Sent!',
        "Account deletion request sent! We'll contact you shortly with the next steps. Thank you for using Whenly",
      );
    } catch (error) {
      console.log('Error', error);
    }
  },
);

const logout = createAsyncThunk(joinWithSlash(AUTH, 'logout'), async () => {
  try {
    await postLogout();
    await GoogleSignin.signOut();
    successToast('Success', 'Logged out successfully');
  } catch (error) {
    console.log('Error', error);
  }
});

const initialState: AuthState = {
  user: null,
  loading: false,
  error: '',
  accessToken: null,
};

const {actions, reducer} = createSlice({
  name: AUTH,
  initialState: initialState,
  reducers: {
    saveUserLocation: (state, {payload}) => {
      const address = state.user?.address ?? [];

      address.forEach((add) => {
        add.default = false;
      });

      address.push(payload);

      state.user = {...state.user, address};
    },
  },
  extraReducers: {
    [currentUser.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [currentUser.fulfilled.type]: (state, {payload}) => {
      state.loading = false;
      state.user = payload;
    },
    [currentUser.rejected.type]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [updateUser.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [updateUser.fulfilled.type]: (state, {payload}) => {
      state.loading = false;
      state.user = payload;
    },
    [updateUser.rejected.type]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [updateFavorites.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [updateFavorites.fulfilled.type]: (state, {payload}) => {
      state.loading = false;
      state.user = payload;
    },
    [updateFavorites.rejected.type]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [login.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [login.fulfilled.type]: (state, {payload}) => {
      state.user = payload;
      state.loading = false;
    },
    [login.rejected.type]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [register.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [register.fulfilled.type]: (state, {payload}) => {
      state.loading = false;
      state.user = payload;
      state.error = '';
    },
    [register.rejected.type]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [facebookLogin.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [facebookLogin.fulfilled.type]: (state, {payload}) => {
      state.loading = false;
      state.user = payload;
    },
    [facebookLogin.rejected.type]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [googleLogin.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [googleLogin.fulfilled.type]: (state, {payload}) => {
      state.loading = false;
      state.user = payload;
    },
    [googleLogin.rejected.type]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [sendOTP.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [sendOTP.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [sendOTP.rejected.type]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [verifyOTP.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [verifyOTP.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [verifyOTP.rejected.type]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [logout.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [logout.fulfilled.type]: (state) => {
      state.loading = false;
      state.user = null;
      state.error = '';
    },
    [logout.rejected.type]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const authActions = {
  ...actions,
  currentUser,
  updateUser,
  login,
  logout,
  facebookLogin,
  googleLogin,
  sendOTP,
  verifyOTP,
  register,
  requestAccountDeletion,
  updateFavorites,
};

export default reducer;
