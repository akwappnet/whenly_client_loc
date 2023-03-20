import {Dimensions} from 'react-native';
import {extendTheme} from 'native-base';

const {width, height} = Dimensions.get('screen');

export const theme = extendTheme({
  colors: {
    primary: {
      50: '#ffe380',
      100: '#ffdd66',
      200: '#ffd74d',
      300: '#ffd133',
      400: '#ffcc1a',
      500: '#ffc600',
      600: '#e6b200',
      700: '#cc9e00',
      800: '#b38b00',
      900: '#997700',
    },
  },
  components: {
    Button: {
      baseStyle: {
        backgroundColor: '#fff',
        color: '#ffc600',
      },
      variants: {
        solid: {
          backgroundColor: '#ffc600',
          color: '#fff',
        },
        outline: {
          borderColor: '#ffc600',
          borderWidth: 2,
        },
      },
    },
  },
});

// 2. Get the type of the CustomTheme
type CustomThemeType = typeof theme;

// 3. Extend the internal NativeBase Theme
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}

export const metric = {
  buttonRadius: 20,
  containerRadius: 5,
  fullWidth: width,
  fullHeight: height,
};
