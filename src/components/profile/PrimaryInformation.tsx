import React from 'react';
import {Heading, Input, VStack, FormControl, TextArea} from 'native-base';
import Card from '@whenly/components/Card';
import {FormikProps} from 'formik';
import {ProfileFormValues} from '@whenly/screens/profile/EditProfile';

const PrimaryInformation = (props: FormikProps<ProfileFormValues>) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
    isValid,
  } = props;
  return (
    <Card>
      <VStack space={4}>
        {/* <Heading size="sm">Primary Information</Heading> */}
        <FormControl
          isInvalid={errors.firstName && touched.firstName ? true : false}>
          <FormControl.Label m="0" _text={{fontSize: 'xs'}}>
            First Name
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
          isInvalid={errors.lastName && touched.lastName ? true : false}>
          <FormControl.Label m="0" _text={{fontSize: 'xs'}}>
            Last Name
          </FormControl.Label>
          <Input
            variant="underlined"
            placeholder=""
            autoCorrect={false}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            value={values.lastName}
          />
          <FormControl.ErrorMessage>{errors.lastName}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          isDisabled={true}
          isInvalid={errors.phoneNumber && touched.phoneNumber ? true : false}>
          <FormControl.Label m="0" _text={{fontSize: 'xs'}}>
            Contact Number
          </FormControl.Label>
          <Input
            variant="underlined"
            placeholder="+639"
            autoCorrect={false}
            keyboardType="phone-pad"
            onChangeText={handleChange('phoneNumber')}
            onBlur={handleBlur('phoneNumber')}
            value={values.phoneNumber}
          />
          <FormControl.ErrorMessage>
            {errors.phoneNumber}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          isDisabled={true}
          isInvalid={errors.email && touched.email ? true : false}>
          <FormControl.Label m="0" _text={{fontSize: 'xs'}}>
            Email
          </FormControl.Label>
          <Input
            variant="underlined"
            placeholder=""
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
        </FormControl>
      </VStack>
    </Card>
  );
};

export default PrimaryInformation;
