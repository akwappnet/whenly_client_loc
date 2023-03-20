export const join =
  (separator: string) =>
  (...args: Array<string | number>) =>
    args.join(separator);

export const joinWithSlash = join('/');
export const joinWithHyphen = join('-');
export const joinWithParams = join('&');

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
