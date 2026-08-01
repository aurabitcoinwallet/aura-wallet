module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'no-void': ['error', { allowAsStatement: true }],
    'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
    'react-native/no-inline-styles': 'off',
  },
  overrides: [
    {
      files: [
        'scripts/**/*.{js,ts}',
        'src/components/QRCode.tsx',
        'src/network/electrum.ts',
        'src/screens/RecoveryPhrase.tsx',
        'src/utils/encryption.ts',
        'src/wallets/derivation.ts',
        'src/wallets/message.ts',
        'src/wallets/signing.ts',
      ],
      rules: {
        'no-bitwise': 'off',
      },
    },
  ],
};
