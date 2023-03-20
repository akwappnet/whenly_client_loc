import React from 'react';
import {Box, Text} from 'native-base';
import {Merchant} from '@whenly/redux';
import Collapse from '@whenly/components/Collapse';
import {capitalizeFirstLetter} from '@whenly/utils/string';

interface AboutMerchantProps {
  merchant: Merchant | null;
}

interface ContactDetail {
  [key: string]: string | undefined;
}
const AboutMerchant = ({merchant}: AboutMerchantProps) => {
  const contactLabelStyles = {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'gray.800',
  };
  const contactStyles = {
    fontSize: 11,
    color: 'gray.800',
  };

  const contactDetails: ContactDetail = {
    phone: merchant?.companyNumber,
    email: merchant?.email,
    ...(merchant?.companySocial || {}),
  };
  return (
    <Box>
      <Text fontWeight="bold">About</Text>
      <Text fontSize={11} color="gray.500" my={2}>
        {merchant?.companyDescription}
      </Text>
      <Collapse
        header={
          <Box>
            <Text fontWeight="bold">Contact</Text>
          </Box>
        }
        content={
          <Box py={2}>
            {Object.keys(contactDetails).map((social: string) =>
              !!contactDetails[social] ? (
                <Box
                  key={social}
                  flexDirection="row"
                  justifyContent="space-between"
                  my={1}>
                  <Text {...contactLabelStyles}>
                    {capitalizeFirstLetter(social)}
                  </Text>
                  <Text {...contactStyles}>{contactDetails[social]}</Text>
                </Box>
              ) : null,
            )}
          </Box>
        }
      />
      {/* 
        //TODO: add map
      <Collapse
        header={
          <Box>
            <Text fontWeight="bold">Map</Text>
          </Box>
        }
        content={
          <Box py={2}>
           
          </Box>
        }></Collapse> */}
    </Box>
  );
};

export default AboutMerchant;
