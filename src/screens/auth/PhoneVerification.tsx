import React, {useEffect, useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
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
  Box,
  Alert,
  ScrollView,
  useTheme,
} from 'native-base';
import {useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, authActions, selectAuthState} from '@whenly/redux';
import {metric} from '@whenly/theme/theme';
import OtpInputs from '@whenly/components/OTPInputs';

const phoneRegex = new RegExp(/^\+639\d{9}$/);

enum Mode {
  Phone = 'Phone',
  OTP = 'OTP',
}

const verbiage = {
  Phone: {
    title: 'Your Phone',
    subtitle:
      'Enter your phone number and we will send you a confirmation code',
  },
  OTP: {
    title: 'Confirmation',
    subtitle:
      'Please enter the verification code from the sms we just send you',
  },
};

const PhoneVerification = () => {
  const navigation = useNavigation();
  const appDispatch = useAppDispatch();
  const {error, loading, user} = useSelector(selectAuthState);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '+639');
  const [code, setCode] = useState('');
  const [mode, setMode] = useState(Mode.Phone);
  const {colors} = useTheme();

  const isValid =
    mode === Mode.Phone
      ? phoneRegex.test(phoneNumber) && phoneNumber !== ''
      : code !== '';

  console.log('isValid', isValid);

  const nextStep = async () => {
    try {
      if (mode === Mode.Phone) {
        console.log('Update User and send Phone Verification');
        const response = await appDispatch(authActions.sendOTP(phoneNumber));
        console.log('OTP response', response);
        setMode(Mode.OTP);
      } else {
        const response = await appDispatch(authActions.verifyOTP(code));
        await appDispatch(authActions.currentUser());
        console.log('Verify code', response);
      }
    } catch (err) {
      console.log('Error', err);
    }
  };

  return (
    <Flex flex={1} safeArea p="4">
      <IconButton
        onPress={() => {
          if (mode === Mode.Phone) {
            navigation.goBack();
          } else {
            setMode(Mode.Phone);
          }
        }}
        icon={<Icon as={Feather} size="xl" name="chevron-left" />}
        _icon={{color: 'black'}}
        borderRadius="full"
        color={'black'}
        alignSelf={'flex-start'}
      />
      <Heading mt={'8'}>{verbiage[mode].title}</Heading>
      <Text mt="4">{verbiage[mode].subtitle}</Text>
      <ScrollView>
        <Stack space={4} mt="8">
          {mode === Mode.Phone ? (
            <FormControl mt="8" isInvalid={!isValid}>
              <FormControl.Label>PHONE NUMBER</FormControl.Label>
              <Input
                variant="underlined"
                placeholder="+639"
                autoCorrect={false}
                onChangeText={setPhoneNumber}
                value={phoneNumber}
                keyboardType="phone-pad"
              />
              <FormControl.ErrorMessage>
                {isValid
                  ? ''
                  : phoneNumber === ''
                  ? 'Require Field'
                  : 'Invalid format'}
              </FormControl.ErrorMessage>
            </FormControl>
          ) : (
            <Flex flex={1}>
              <OtpInputs
                numberOfInputs={6}
                inputStyle={{padding: 8, margin: 4}}
                onFilledCode={setCode}
                currentBorderColor={colors['primary'][500]}
              />
            </Flex>
          )}
          <Button
            isDisabled={!isValid}
            mt={'8'}
            isLoading={loading}
            onPress={nextStep}
            borderRadius={metric.buttonRadius}>
            {mode === Mode.Phone ? 'Next' : 'Continue'}
          </Button>
        </Stack>
      </ScrollView>
    </Flex>
  );
};

export default PhoneVerification;

const styles = StyleSheet.create({});
