import {Box} from 'native-base';

const Card = (props: any) => {
  const {children, ...rest} = props;

  return (
    <Box backgroundColor="#fff" p={4} borderRadius="xl" shadow={6} {...rest}>
      {children}
    </Box>
  );
};

export default Card;
