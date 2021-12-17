module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@src': './src',
          '@assets': './assets',
          '@api':'./api',
          '@common':"./common",
          '@componentapp':"./component",
         
          
        },
      },
    ],
  ],
};
