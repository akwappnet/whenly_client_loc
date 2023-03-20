import React, {useEffect, useCallback} from 'react';
import {StyleSheet} from 'react-native';
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
  Alert,
} from 'native-base';
import {useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, authActions, selectAuthState} from '@whenly/redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {metric} from '@whenly/theme/theme';
import SocialLogin from '@whenly/components/SocialLogin';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid format').required('Required Field'),
  password: Yup.string().required('Required Field'),
});

const Login = () => {
  const navigation = useNavigation();
  const appDispatch = useAppDispatch();
  const {error, loading} = useSelector(selectAuthState);

  return (
    <Flex flex={1} safeArea p="4">
      <IconButton
        onPress={() => navigation.goBack()}
        icon={<Icon as={Feather} size="xl" name="chevron-left" />}
        _icon={{color: 'black'}}
        borderRadius="full"
        color={'black'}
        alignSelf={'flex-start'}
      />
      <Heading mt={'8'}>Login</Heading>
      {/* {error && <Alert status="error">{error}</Alert>} */}
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={LoginSchema}
        validateOnMount
        onSubmit={(values, {resetForm}) => {
          appDispatch(authActions.login(values))
            .then(() => {
              resetForm();
              appDispatch(authActions.currentUser());
            })
            .catch((error) => {
              console.log('Error', error);
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
              <FormControl.Label _text={{fontSize: 'xs'}}>
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
              isInvalid={errors.password && touched.password ? true : false}>
              <FormControl.Label _text={{fontSize: 'xs'}}>
                PASSWORD
              </FormControl.Label>
              <Input
                variant="underlined"
                placeholder=""
                autoCapitalize="none"
                secureTextEntry
                autoCorrect={false}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <FormControl.ErrorMessage>
                {errors.password}
              </FormControl.ErrorMessage>
            </FormControl>
            <Button
              mt={'8'}
              isLoading={loading}
              isDisabled={!isValid}
              onPress={handleSubmit}
              borderRadius={metric.buttonRadius}>
              LOGIN
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
          </Stack>
        )}
      </Formik>
    </Flex>
  );
};

export default Login;

const styles = StyleSheet.create({});
