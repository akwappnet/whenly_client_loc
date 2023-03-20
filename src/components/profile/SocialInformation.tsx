import React from 'react';
import {Heading, Input, VStack, FormControl} from 'native-base';
import Card from '@whenly/components/Card';
import {FormikProps} from 'formik';
import {ProfileFormValues} from '@whenly/screens/profile/EditProfile';

const SocialInformation = (props: FormikProps<ProfileFormValues>) => {
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
        {/* <Heading size="sm">Social Media</Heading> */}
        <FormControl
          isInvalid={
            errors.companySocial?.website && touched.companySocial?.website
              ? true
              : false
          }>
          <FormControl.Label m="0" _text={{fontSize: 'xs'}}>
            Website
          </FormControl.Label>
          <Input
            variant="underlined"
            placeholder=""
            autoCorrect={false}
            onChangeText={handleChange('companySocial.website')}
            onBlur={handleBlur('companySocial.website')}
            value={values.companySocial?.website || ''}
          />
          <FormControl.ErrorMessage>
            {errors.companySocial?.website}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={
            errors.companySocial?.facebook && touched.companySocial?.facebook
              ? true
              : false
          }>
          <FormControl.Label m="0" _text={{fontSize: 'xs'}}>
            Facebook
          </FormControl.Label>
          <Input
            variant="underlined"
            placeholder=""
            autoCorrect={false}
            onChangeText={handleChange('companySocial.facebook')}
            onBlur={handleBlur('companySocial.facebook')}
            value={values.companySocial?.facebook}
          />
          <FormControl.ErrorMessage>
            {errors.companySocial?.facebook}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={
            errors.companySocial?.instagram && touched.companySocial?.instagram
              ? true
              : false
          }>
          <FormControl.Label m="0" _text={{fontSize: 'xs'}}>
            Instagram
          </FormControl.Label>
          <Input
            variant="underlined"
            placeholder=""
            autoCorrect={false}
            onChangeText={handleChange('companySocial.instagram')}
            onBlur={handleBlur('companySocial.instagram')}
            value={values.companySocial?.instagram}
          />
          <FormControl.ErrorMessage>
            {errors.companySocial?.instagram}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={
            errors.companySocial?.tiktok && touched.companySocial?.tiktok
              ? true
              : false
          }>
          <FormControl.Label m="0" _text={{fontSize: 'xs'}}>
            TikTok
          </FormControl.Label>
          <Input
            variant="underlined"
            placeholder=""
            autoCorrect={false}
            onChangeText={handleChange('companySocial.tiktok')}
            onBlur={handleBlur('companySocial.tiktok')}
            value={values.companySocial?.tiktok}
          />
          <FormControl.ErrorMessage>
            {errors.companySocial?.tiktok}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={
            errors.companySocial?.youtube && touched.companySocial?.youtube
              ? true
              : false
          }>
          <FormControl.Label m="0" _text={{fontSize: 'xs'}}>
            YouTube
          </FormControl.Label>
          <Input
            variant="underlined"
            placeholder=""
            autoCorrect={false}
            onChangeText={handleChange('companySocial.youtube')}
            onBlur={handleBlur('companySocial.youtube')}
            value={values.companySocial?.youtube}
          />
          <FormControl.ErrorMessage>
            {errors.companySocial?.youtube}
          </FormControl.ErrorMessage>
        </FormControl>
      </VStack>
    </Card>
  );
};

export default SocialInformation;
