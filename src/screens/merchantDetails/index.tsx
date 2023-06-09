import HeaderBar from '@whenly/components/HeaderBar';
import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  planActions,
  classActions,
  selectMerchantState,
  selectPlanState,
  useAppDispatch,
  selectClassState,
  selectAuthState,
  authActions,
} from '@whenly/redux';
import {DetailsScreenNavigationProp} from 'routes/types';

import {useSelector} from 'react-redux';
import {Animated, Dimensions, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FA from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerTabSVG from '@whenly/components/DrawerTabSVG';
import useAnimation from '@whenly/utils/useAnimation';
import {
  AboutMerchant,
  MerchantPackages,
  MerchantClasses,
} from '@whenly/components/merchantDetails';
import Carousel from 'react-native-snap-carousel';
import {metric} from '@whenly/theme/theme';

const {height, width} = Dimensions.get('screen');

const dummyPhoto =
  'https://images.unsplash.com/photo-1596357395217-80de13130e92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80';

const MerchantDetailsScreen = (props: DetailsScreenNavigationProp) => {
  const {navigation} = props;
  const insets = useSafeAreaInsets();
  const appDispatch = useAppDispatch();
  const {user} = useSelector(selectAuthState);

  const [collapse, setCollapse] = useState(false);
  const {interpolate} = useAnimation(collapse);
  const {merchant} = useSelector(selectMerchantState);
  const {docs} = useSelector(selectPlanState);
  const {docs: classes} = useSelector(selectClassState);

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (merchant?.id) {
      appDispatch(planActions.plans(merchant.id));
      appDispatch(classActions.classes(merchant.id));
    }
  }, []);

  console.log('Merchant', merchant);

  const content = useMemo(() => {
    switch (activeTab) {
      case 0:
        return <AboutMerchant merchant={merchant} />;
      case 1:
        return <MerchantPackages plans={docs} />;
      case 2:
        return <MerchantClasses classes={classes} />;
      default:
        return <AboutMerchant merchant={merchant} />;
    }
  }, [activeTab, merchant]);

  const sliderWidth = metric.fullWidth;
  const itemWidth = metric.fullWidth;

  const _renderItem = ({item, index}) => {
    return (
      <Image
        source={{uri: item || dummyPhoto}}
        alt="background photo"
        height={'100%'}
        width={'100%'}
        resizeMode="cover"
      />
    );
  };

  const favorites =
    (user?.favorites && user?.favorites.map((merch) => merch.id)) || [];
  const isFavorite = favorites.includes(merchant?.id);

  const toggleFavorite = async () => {
    try {
      await appDispatch(
        authActions.updateFavorites({
          id: user?.id,
          merchant: merchant?.id,
        }),
      );
    } catch (err) {
      console.log('Err', err);
    }
  };

  console.log('isFavorite', isFavorite);

  return (
    <View>
      <View position="absolute" height={height} width={width} zIndex={100}>
        <Box
          flex={1}
          paddingTop={insets.top}
          background={{
            linearGradient: {
              colors: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)'],
              end: [50, 0],
              start: [50, 0.9],
            },
          }}>
          <HeaderBar white onBack={() => navigation.goBack()} title="" />
          <Box px={'20px'}>
            <Heading color="#fff">{merchant?.companyName}</Heading>
          </Box>
        </Box>
        <Animated.View
          style={{
            height: interpolate([height * 0.72, height * 0.1 + insets.bottom]),
          }}>
          <Box alignItems="center" mb={-2.5}>
            <IconButton
              icon={<Feather name="chevron-down" color="primary" />}
              mb={-9}
              zIndex={110}
              onPress={() => setCollapse(!collapse)}
            />

            <DrawerTabSVG />
          </Box>
          <Box
            backgroundColor="#fff"
            width="100%"
            flex={1}
            borderTopLeftRadius={30}
            borderTopRightRadius={30}
            py={4}>
            <VStack space={2} px={'20px'}>
              <Box alignItems="flex-end">
                <IconButton
                  onPress={toggleFavorite}
                  icon={
                    <FA
                      name={isFavorite ? 'star' : 'star-o'}
                      color="#ffc600"
                      size={24}
                    />
                  }
                />
              </Box>
              <Box flexDirection="row">
                <Avatar
                  size="lg"
                  source={{
                    uri: merchant?.profilePicture || dummyPhoto,
                  }}
                />
                <Box pl={4} flex={1} pr={4}>
                  <Text fontWeight="bold">{merchant?.companyName}</Text>
                  <Text fontSize={11} color="gray.500" numberOfLines={3}>
                    {merchant?.address[0]?.address}
                  </Text>
                </Box>
              </Box>
              <HStack space={2} my={4}>
                <Button
                  onPress={() => setActiveTab(0)}
                  variant="outline"
                  size="xs"
                  borderRadius="2xl"
                  flex={1}
                  borderColor={activeTab === 0 ? 'primary.400' : 'gray.300'}
                  color={activeTab === 0 ? 'primary.400' : 'gray.300'}>
                  About
                </Button>
                <Button
                  onPress={() => setActiveTab(1)}
                  variant="outline"
                  size="xs"
                  borderRadius="2xl"
                  flex={1}
                  borderColor={activeTab === 1 ? 'primary.400' : 'gray.300'}
                  color={activeTab === 1 ? 'primary.400' : 'gray.300'}>
                  Packages
                </Button>
                <Button
                  onPress={() => setActiveTab(2)}
                  variant="outline"
                  size="xs"
                  borderRadius="2xl"
                  flex={1}
                  borderColor={activeTab === 2 ? 'primary.400' : 'gray.300'}
                  color={activeTab === 2 ? 'primary.400' : 'gray.300'}>
                  Classes
                </Button>
              </HStack>
            </VStack>
            <Box flex={1} px={'20px'}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                mb={insets.bottom}>
                {content}
              </ScrollView>
            </Box>
          </Box>
        </Animated.View>
      </View>
      <Animated.View
        style={{
          position: 'absolute',
          height: interpolate([height * 0.36, height]),
          width: width,
        }}>
        <Carousel
          data={merchant?.gallery || []}
          renderItem={_renderItem}
          sliderWidth={sliderWidth}
          loop
          autoplay
          autoplayInterval={5000} // 5 sec per image
          itemWidth={itemWidth}
        />
      </Animated.View>
    </View>
  );
};

export default MerchantDetailsScreen;
