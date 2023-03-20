import {StyleSheet, Platform, ActivityIndicator} from 'react-native';
import React from 'react';
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
import {LOGIN, MAIN_STACK, PHONE_VERIFICATION} from '@whenly/constants';

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required('Required Field'),
  lastName: Yup.string().required('Required Field'),
  phoneNumber: Yup.string().matches(/^\+639\d{9}$/, 'Invalid format'),
  email: Yup.string().email('Invalid format').required('Required Field'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      'Password must contain at least 1 letter and 1 number',
    )
    .required('Required Field'),
});

const Register = () => {
  const navigation = useNavigation();
  const appDispatch = useAppDispatch();
  const {error, loading} = useSelector(selectAuthState);

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
        Sign Up
      </Heading>
      {/* {error && <Text>{error}</Text>} */}
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView px="4">
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              phoneNumber: '',
              email: '',
              password: '',
            }}
            validationSchema={RegisterSchema}
            validateOnMount
            onSubmit={(values, {resetForm}) => {
              console.log('Submit', values);
              appDispatch(authActions.register(values)).then(() => {
                resetForm();
                navigation.navigate(LOGIN);
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
                  isInvalid={
                    errors.firstName && touched.firstName ? true : false
                  }>
                  <FormControl.Label m="0" _text={{fontSize: 'xs'}}>
                    FIRST NAME
                  </FormControl.Label>
                  <Input
                    variant="underlined"
                    placeholder=""
                    autoCorrect={false}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    value={values.firstName}
                  />
                  <FormControl.ErrorMessage>
                    {errors.firstName}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    errors.lastName && touched.lastName ? true : false
                  }>
                  <FormControl.Label m="0" _text={{fontSize: 'xs'}}>
                    LAST NAME
                  </FormControl.Label>
                  <Input
                    variant="underlined"
                    placeholder=""
                    autoCorrect={false}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    value={values.lastName}
                  />
                  <FormControl.ErrorMessage>
                    {errors.lastName}
                  </FormControl.ErrorMessage>
                </FormControl>
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
                <FormControl
                  isInvalid={
                    errors.phoneNumber && touched.phoneNumber ? true : false
                  }>
                  <FormControl.Label m="0" _text={{fontSize: 'xs'}}>
                    PHONE NUMBER (Optional)
                  </FormControl.Label>
                  <Input
                    variant="underlined"
                    placeholder="+639"
                    autoCorrect={false}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                    keyboardType="phone-pad"
                  />
                  <FormControl.ErrorMessage>
                    {errors.phoneNumber}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    errors.password && touched.password ? true : false
                  }>
                  <FormControl.Label m="0" _text={{fontSize: 'xs'}}>
                    PASSWORD
                  </FormControl.Label>
                  <Input
                    variant="underlined"
                    placeholder=""
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  <FormControl.ErrorMessage>
                    {errors.password}
                  </FormControl.ErrorMessage>
                </FormControl>
                {loading ? (
                  <View padding={12}>
                    <ActivityIndicator color="#e6b200" />
                  </View>
                ) : (
                  <>
                    <Button
                      mt={'8'}
                      isDisabled={!isValid || loading}
                      onPress={handleSubmit}
                      borderRadius={metric.buttonRadius}>
                      Register
                    </Button>
                    <HStack
                      mt={4}
                      space={6}
                      overflow="hidden"
                      alignItems={'center'}
                      justifyContent={'center'}>
                      <Divider />
                      <Text textAlign={'center'} color="gray.400">
                        or continue with
                      </Text>
                      <Divider />
                    </HStack>
                    <SocialLogin />
                  </>
                )}
              </Stack>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </Flex>
  );
};

export default Register;

const styles = StyleSheet.create({});
