module.exports = {
  preset: '@react-native/jest-preset',
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(?:react-native(?:-[^/]+)?|@react-native|@react-native-community|@react-native-async-storage|@react-navigation|@scure|@noble)/)',
  ],
};
