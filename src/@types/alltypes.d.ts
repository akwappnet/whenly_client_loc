declare module '@react-native-google-signin/google-signin';

export type BankDetails = {
  accountName: string;
  accountNumber: string;
  bankName: string;
  default: boolean;
};

export type Address = {
  address: string;
  lat: number;
  long: number;
  default: boolean;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  status: string;
  profilePicture: string;
  providers: string[];
  address: Address[];
  gallery: string[];
  categories: string[];
  favorites: string[];
  billingDetails: BankDetails[];
  companyName: string;
  companyNumber: string;
  companyDescription: string;
  companyHours: string;
  companySocial: object;
  visible: boolean;
};
