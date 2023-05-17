import {StyleSheet, Platform, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  Stack,
  Text,
  Button,
  FormControl,
  HStack,
  Divider,
  KeyboardAvoidingView,
  ScrollView,
  Checkbox,
  Pressable,
  VStack,
  View,
} from 'native-base';
import {metric} from '../../theme/theme';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useSelector} from 'react-redux';
import {authActions, selectAuthState, useAppDispatch} from '@whenly/redux';

import SocialLogin from '@whenly/components/SocialLogin';
import {
  LOGIN,
  MAIN_STACK,
  PHONE_VERIFICATION,
  WEB_EMBED,
} from '@whenly/constants';
import {postForgotPassword} from '@whenly/services';
import {successToast} from '@whenly/utils/useToast';

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid format').required('Required Field'),
});

const ForgotPassword = () => {
  const navigation = useNavigation();
  const appDispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Flex flex={1} safeArea>
      <IconButton
        m="4"
        onPress={() => navigation.goBack()}
        icon={<Icon as={Feather} size="xl" name="chevron-left" />}
        _icon={{color: 'black'}}
        borderRadius="full"
        color={'black'}
        alignSelf={'flex-start'}
      />
      <Heading px="4" mt={'8'}>
        Forgot Password
      </Heading>
      {/* {error && <Text>{error}</Text>} */}
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView px="4">
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={RegisterSchema}
            validateOnMount
            onSubmit={(values, {resetForm,setFieldError}) => {
              setLoading(true);
              console.log('Submit', values);
              postForgotPassword(values.email)
                .then(() => {
                  setLoading(false);
                  resetForm();
                  successToast(
                    'Success',
                    'Forgot password request email sent!',
                  );
                  navigation.navigate(LOGIN);
                })
                .catch((err) => {
                  if (err?.response?.data?.message) {
                    setFieldError('email', err.response.data.message);
                  }
                  setLoading(false);

                  console.log('err@forgotPassword', err);
                });
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isValid,
              errors,
              touched,
            }) => (
              <Stack space={4} mt="8">
                <FormControl
                  isInvalid={errors.email && touched.email ? true : false}>
                  <FormControl.Label m="0" _text={{fontSize: 'xs'}}>
                    EMAIL ADDRESS
                  </FormControl.Label>
                  <Input
                    variant="underlined"
                    placeholder=""
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  <FormControl.ErrorMessage>
                    {errors.email}
                  </FormControl.ErrorMessage>
                </FormControl>

                {loading ? (
                  <View padding={12}>
                    <ActivityIndicator color="#e6b200" />
                  </View>
                ) : (
                  <Button
                    mt={'8'}
                    isDisabled={!isValid || loading}
                    onPress={handleSubmit}
                    borderRadius={metric.buttonRadius}>
                    Submit
                  </Button>
                )}
              </Stack>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </Flex>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
