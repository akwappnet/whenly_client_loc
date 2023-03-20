import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Product} from '@whenly/redux';

type RootStackParams = {
  Details: Product;
};

export type DetailsScreenNavigationProp = NativeStackScreenProps<
  RootStackParams,
  'Details'
>;
