import React from 'react';
import {Box, Heading, AspectRatio, Text, Image, Pressable} from 'native-base';

const defaultBackground = `https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80`;

const Featured = () => {
  return (
    <>
      <Box px="20px" py="8px">
        <Heading>Search</Heading>
      </Box>
      <Pressable>
        {({isPressed}) => (
          <AspectRatio ratio={2.35 / 1} opacity={isPressed ? 0.6 : 1}>
            <>
              <Image
                source={{uri: defaultBackground}}
                resizeMode="cover"
                height={'100%'}
                width={'100%'}
                alt="Featured Product"
              />
              <Box
                p="20px"
                justifyContent="flex-end"
                bg={{
                  linearGradient: {
                    colors: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)'],
                    start: [50, 0],
                    end: [50, 1],
                  },
                }}
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                top={0}>
                <Text fontSize="2xl" color="white">
                  Ad
                </Text>
                <Text fontSize="md" color="#FF5656" fontWeight="300">
                  Sample Ad
                </Text>
              </Box>
            </>
          </AspectRatio>
        )}
      </Pressable>
    </>
  );
};

export default Featured;
