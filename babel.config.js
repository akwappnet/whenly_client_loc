module.exports = (api) => {
  api.cache(true);

  const dir = [
    'assets',
    'components',
    'screens',
    'redux',
    'services',
    'theme',
    'utils',
    'constants',
  ];

  const alias = dir.reduce(
    (aliasAcc, moduleName) => {
      aliasAcc[`@whenly/${moduleName}`] = `./src/${moduleName}`;
      return aliasAcc;
    },
    {
      // explicitly add redux to avoid conflict with local redux folder's package.json
      redux: './node_modules/redux',
    },
  );

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias,
        },
      ],
    ],
  };
};
