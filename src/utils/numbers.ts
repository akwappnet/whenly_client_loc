import parsePhoneNumber from 'libphonenumber-js';

export const convertToCurrency = (
  value: string | number,
  currency?: string,
) => {
  return `${currency || '₱'}${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value))}`;
};

export const normalizePhoneNumber = (phone: string) => {
  const parsedNumber = parsePhoneNumber(phone, 'PH');
  console.log('parsedNumber', parsedNumber?.format('E.164'));
  return parsedNumber?.format('E.164');
};
