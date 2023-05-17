import React, {useRef, useEffect, useState, useMemo} from 'react';
import {Platform} from 'react-native';
import {
  Button,
  VStack,
  ScrollView,
  KeyboardAvoidingView,
  Box,
  Text,
  useTheme,
  HStack,
} from 'native-base';
import {useSelector} from 'react-redux';
import Container from '@whenly/components/ContainerHOC';
import {authActions, selectAuthState, useAppDispatch} from '@whenly/redux';
import {metric} from '@whenly/theme/theme';
import {Formik, useFormik} from 'formik';
import * as Yup from 'yup';
import {
  PrimaryInformation,
  SocialInformation,
  Gallery,
  AddressMap,
  Categories,
} from '@whenly/components/profile';
import Wizard, {WizardRef} from 'react-native-wizard';
import StepIndicator from 'react-native-step-indicator';
import {User} from '@types/alltypes';
import {infoToast, successToast} from '@whenly/utils/useToast';
import {useNavigation, useRoute} from '@react-navigation/native';
import {MAIN_STACK} from '@whenly/constants';

export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

const UserSchema = Yup.object().shape({
  firstName: Yup.string().required('Required Field'),
  lastName: Yup.string().required('Required Field'),
  email: Yup.string().email().required('Required Field'),
  phoneNumber: Yup.string()
    .matches(/^\+639\d{9}$/, 'Invalid format')
    .required('Required Field'),
});

const EditProfile = (props: any) => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFirstTime = route.params?.firstTime || false;
  const {loading, user} = useSelector(selectAuthState);
  const {colors} = useTheme();
  const appDispatch = useAppDispatch();

  const addressRef = useRef(null);
  const wizard = useRef<WizardRef>(null);

  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [address, setAddress] = useState(
    (user?.address && user?.address[0]) || null,
  );
  const [categories, setCategories] = useState(user?.categories || []);
  const [imageUpload, setImageUpload] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phoneNumber: user?.phoneNumber || '',
      email: user?.email || '',
    },
    validationSchema: UserSchema,
    validateOnMount: true,
    validateOnChange: true,
    onSubmit: (values) => {
      const payload = {
        id: user?.id,
        ...values,
        address: [address],
        profileUpload: imageUpload,
      };
      console.log('Payload', payload);
      appDispatch(authActions.updateUser(payload as Partial<User>))
        .then(() => {
          successToast('Success', 'Successfully updated profile details');
          navigation.goBack();
        })
        .catch((err) => {
          console.log('Error', err);
        });
    },
  });

  // Step Indicator
  const labels = ['Info', 'Profile Image', 'Address'];
  const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: colors.primary[500],
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: colors.primary[500],
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: colors.primary[500],
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: colors.primary[500],
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 10,
    currentStepIndicatorLabelFontSize: 10,
    stepIndicatorLabelCurrentColor: colors.primary[500],
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 10,
    currentStepLabelColor: colors.primary[500],
  };

  // Wizard
  const stepList = [
    {
      content: <PrimaryInformation {...formik} />,
    },
    {
      content: (
        <Gallery
          initialData={user?.profilePicture || ''}
          data={imageUpload}
          onChange={(image) => setImageUpload(image)}
        />
      ),
    },
    {
      content: (
        <AddressMap
          initialValue={user?.address && user.address[0]}
          ref={addressRef}
        />
      ),
    },
  ];

  const canProceed = (step: number) => {
    let valid = true;
    if (currentStep === 1 && step > 1) {
      // if (user?.gallery.length === 0 && imageUpload.length === 0) {
      //   infoToast('Please upload at lease one image', '');
      //   valid = false;
      // }
    }
    if (currentStep === 4) {
      if (categories?.length === 0) {
        valid = false;
      }
    }
    return valid;
  };

  return (
    <Container backBtnVisible={!isFirstTime} title="Profile">
      <VStack space={4}>
        <StepIndicator
          currentPosition={currentStep}
          labels={labels}
          stepCount={stepList.length}
          customStyles={customStyles}
          onPress={(step) => {
            if (canProceed(step)) {
              wizard.current?.goTo(step);
            }
          }}
        />
        <KeyboardAvoidingView
          h={{
            base: metric.fullHeight - 320,
            // lg: 'auto',
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView px={'20px'} py={2}>
            <Wizard
              ref={wizard}
              activeStep={0}
              steps={stepList}
              isFirstStep={(val) => setIsFirstStep(val)}
              isLastStep={(val) => setIsLastStep(val)}
              currentStep={({currentStep, isLastStep, isFirstStep}) => {
                setCurrentStep(currentStep);
                if (currentStep === 2) {
                  if (address && addressRef?.current) {
                    setTimeout(() => {
                      addressRef?.current?.setAddress(address);
                    }, 500);
                  }
                }
              }}
              onNext={() => {
                if (currentStep === 2) {
                  console.log(addressRef?.current.address());
                  setAddress(addressRef?.current.address());
                }
              }}
              onPrev={() => {
                if (currentStep === 2) {
                  console.log(addressRef?.current.address());
                  setAddress(addressRef?.current.address());
                }
              }}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <HStack space={4} px={4}>
          {!isFirstStep && (
            <Button
              flex={1}
              bg={'gray.400'}
              isDisabled={isFirstStep}
              onPress={() => {
                wizard?.current.prev();
              }}>
              Back
            </Button>
          )}
          <Button
            // isDisabled={isLastStep}
            isDisabled={!canProceed(currentStep + 1) || loading}
            flex={1}
            onPress={() => {
              if (isLastStep) {
                setAddress(addressRef?.current.address());
                formik.handleSubmit();
              } else {
                if (canProceed(currentStep + 1)) {
                  wizard?.current.next();
                }
              }
            }}>
            {isLastStep ? 'Save Changes' : 'Next'}
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default EditProfile;
