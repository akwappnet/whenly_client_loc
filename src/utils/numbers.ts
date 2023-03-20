export const convertToCurrency = (
  value: string | number,
  currency?: string,
) => {
  return `${currency || '₱'}${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value))}`;
};
