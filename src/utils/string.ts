import moment from 'moment';
import {v4 as uuidV4} from 'uuid';

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

export const generateTransactionId = () => {
  const id = uuidV4().split('-')[0].toUpperCase();
  const txnId = `WHENLY${moment().format('yyyyMMDD')}-${id}`;

  return txnId;
};
