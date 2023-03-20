import React from 'react';
import {
  Button,
  FormControl,
  Text,
  VStack,
  Input,
  Divider,
  HStack,
  Switch,
} from 'native-base';
import Container from '@whenly/components/ContainerHOC';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  selectCurrentUser,
  useAppDispatch,
  authActions,
  selectAuthState,
} from '@whenly/redux';
import {User} from '@types/alltypes';
import {successToast} from '@whenly/utils/useToast';
import Card from '@whenly/components/Card';
import {Alert} from 'react-native';

const OwnerSchema = Yup.object().shape({
  firstName: Yup.string().required('First name required'),
  lastName: Yup.string().required('Last name required'),
  email: Yup.string().email().required('Email required'),
  visible: Yup.boolean(),
});

const Settings = (props: any) => {
  const {loading} = useSelector(selectAuthState);
  const currentUser = useSelector(selectCurrentUser);
  const appDispatch = useAppDispatch();

  const initialValues: Partial<User> = {
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    visible: currentUser?.visible || false,
  };

  return (
    <Container title={'Settings'}>
      {/* <Formik
        initialValues={initialValues}
        validationSchema={OwnerSchema}
        validateOnChange={true}
        onSubmit={(values) => {
          appDispatch(
            authActions.updateUser({
              id: currentUser?.id,
              ...values,
            } as User),
          )
            .then(() => {
              successToast('Success', 'Successfully updated profile details');
              props.navigation.goBack();
            })
            .catch((err) => {
              console.log('Error', err);
            });
        }}>
        {({
          values,
          errors,
          isValid,
          touched,
          handleChange,
          handleBlur,
          dirty,
          handleSubmit,
          setFieldValue,
        }) => (
          <VStack px={4} space={4}>
            <Card>
              <Text bold>Owner</Text>
              <VStack mt={2} space={4}>
                <FormControl>
                  <FormControl.Label m="0" _text={{fontSize: 'xs'}}>
                    First Name
                  </FormControl.Label>
                  <Input
                    value={values.firstName}
                    variant="underlined"
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                  />
                  {errors.firstName && touched.firstName && (
                    <FormControl.HelperText
                      _text={{fontSize: 'xs', color: 'red.500'}}>
                      {errors.firstName}
                    </FormControl.HelperText>
                  )}
                </FormControl>
                <FormControl>
                  <FormControl.Label m="0" _text={{fontSize: 'xs'}}>
                    Last Name
                  </FormControl.Label>
                  <Input
                    value={values.lastName}
                    variant="underlined"
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                  />
                  {errors.lastName && touched.lastName && (
                    <FormControl.HelperText
                      _text={{fontSize: 'xs', color: 'red.500'}}>
                      {errors.lastName}
                    </FormControl.HelperText>
                  )}
                </FormControl>
                <FormControl isDisabled={true}>
                  <FormControl.Label m="0" _text={{fontSize: 'xs'}}>
                    Email
                  </FormControl.Label>
                  <Input
                    value={values.email}
                    variant="underlined"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  {errors.email && touched.email && (
                    <FormControl.HelperText
                      _text={{fontSize: 'xs', color: 'red.500'}}>
                      {errors.email}
                    </FormControl.HelperText>
                  )}
                </FormControl>
                <HStack justifyContent={'space-between'} alignItems={'center'}>
                  <Text>Show Listings</Text>
                  <Switch
                    size={'sm'}
                    value={values.visible}
                    onToggle={() => setFieldValue('visible', !values.visible)}
                  />
                </HStack>
              </VStack>
            </Card>
            <Button isDisabled={!isValid || !dirty} onPress={handleSubmit}>
              Save Changes
            </Button>
            <Button
              isDisabled={loading}
              isLoading={loading}
              onPress={() => {
                Alert.alert(
                  'Account Deletion Request',
                  "Are you sure that you want to delete your account? Please note that there is no option to restore the account or its data nor reuse the username once it's deleted. If you confirm you will be automatically log out and not be able to access your account anymore",
                  [
                    {text: 'Cancel', style: 'cancel', onPress: () => {}},
                    {
                      text: 'Delete account',
                      style: 'destructive',
                      onPress: () =>
                        appDispatch(authActions.requestAccountDeletion()),
                    },
                  ],
                );
              }}>
              Request Account Deletion
            </Button>
            <Button
              isDisabled={loading}
              isLoading={loading}
              onPress={() => appDispatch(authActions.logout())}>
              Logout
            </Button>
          </VStack>
        )}
      </Formik> */}
      <VStack px={4} space={4}>
        <Button
          isDisabled={loading}
          isLoading={loading}
          onPress={() => {
            Alert.alert(
              'Account Deletion Request',
              "Are you sure that you want to delete your account? Please note that there is no option to restore the account or its data nor reuse the username once it's deleted. If you confirm you will be automatically log out and not be able to access your account anymore",
              [
                {text: 'Cancel', style: 'cancel', onPress: () => {}},
                {
                  text: 'Delete account',
                  style: 'destructive',
                  onPress: () =>
                    appDispatch(authActions.requestAccountDeletion()),
                },
              ],
            );
          }}>
          Request Account Deletion
        </Button>
        <Button
          isDisabled={loading}
          isLoading={loading}
          onPress={() => appDispatch(authActions.logout())}>
          Logout
        </Button>
      </VStack>
    </Container>
  );
};

export default Settings;
