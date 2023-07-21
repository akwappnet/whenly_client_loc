import {Box, ChevronDownIcon, PresenceTransition, Pressable} from 'native-base';
import React, {ReactNode, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';

interface CollapseProps {
  header: ReactNode;
  content: ReactNode;
  expanded?: boolean;
}

export default function Collapse(props: CollapseProps) {
  const [isOpen, setIsOpen] = useState(props.expanded ?? false);

  return (
    <Box my={2}>
      <Pressable
        flexDirection="row"
        alignItems="center"
        onPress={() => setIsOpen(!isOpen)}>
        <Box flex={1}>{props.header}</Box>
        <Box>
          <Feather name={isOpen ? 'chevron-up' : 'chevron-down'} />
        </Box>
      </Pressable>
      <PresenceTransition
        visible={isOpen}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 250,
          },
        }}>
        {isOpen && props.content}
      </PresenceTransition>
    </Box>
  );
}
