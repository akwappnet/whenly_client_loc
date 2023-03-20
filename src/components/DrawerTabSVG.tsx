import {SvgXml} from 'react-native-svg';
const xml =
  '<svg width="99" height="40" viewBox="0 0 99 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 15C9 6.71573 15.7157 0 24 0H75C83.2843 0 90 6.71573 90 15V40H9V15Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M99 30C94.0294 30 90 25.9706 90 21H9C9 25.9706 4.97056 30 0 30V40H99V30Z" fill="white"/></svg>';

const DrawerTabSVG = () => {
  return <SvgXml xml={xml} />;
};

export default DrawerTabSVG;
