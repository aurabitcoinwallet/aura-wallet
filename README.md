<div align="center">

<img src="img/about-logo.png" width="112" alt="Aura Wallet logo" />

# Aura Wallet

**Open-source, self-custody Bitcoin wallet for iOS and Android.**

Your recovery phrase and private keys are created and handled on your device.

[![Latest release](https://img.shields.io/github/v/release/aurabitcoinwallet/aura-wallet?display_name=tag)](https://github.com/aurabitcoinwallet/aura-wallet/releases/latest)
[![CI](https://github.com/aurabitcoinwallet/aura-wallet/actions/workflows/ci.yml/badge.svg)](https://github.com/aurabitcoinwallet/aura-wallet/actions/workflows/ci.yml)
[![CodeQL](https://github.com/aurabitcoinwallet/aura-wallet/actions/workflows/codeql.yml/badge.svg)](https://github.com/aurabitcoinwallet/aura-wallet/actions/workflows/codeql.yml)
[![MIT License](https://img.shields.io/github/license/aurabitcoinwallet/aura-wallet)](LICENSE)
[![React Native](https://img.shields.io/badge/React%20Native-0.85-61dafb.svg)](https://reactnative.dev)
[![Languages](https://img.shields.io/badge/languages-40-orange.svg)](src/i18n)

[App Store](https://apps.apple.com/app/id6749847943) ·
[Releases](https://github.com/aurabitcoinwallet/aura-wallet/releases) ·
[Community](https://t.me/aurabitcoinwallet) ·
[Report a vulnerability](https://github.com/aurabitcoinwallet/aura-wallet/security/advisories/new)

</div>

---

## About Aura

Aura Wallet is an independent open-source Bitcoin wallet built around one clear
boundary: the user controls the keys. Wallet creation, recovery, address derivation,
transaction construction, and signing happen inside the mobile application.

The project is developed publicly under the MIT license. Source changes are checked
with linting, TypeScript, wallet security invariants, official Bitcoin test vectors,
cryptographic signing tests, dependency advisories, CodeQL, and an Android build.

Current release line: **v27.27.60**.

## Capabilities

- BIP32 and BIP39 hierarchical deterministic wallets.
- BIP44, BIP49, and BIP84 address derivation.
- Legacy, Nested SegWit, Native SegWit, and Taproot recipients.
- `m-of-n` multisig wallet creation and import.
- Coin control, custom fees, change-address selection, and UTXO labels.
- QR scanning and generation, message signing, and watch-only exports.
- Biometric or passcode application lock.
- 40 interface languages.

## Security and privacy boundaries

| Area | Aura behavior |
| --- | --- |
| Key material | Mnemonics, passphrases, and private keys are generated and used on-device. |
| Stored wallets | Wallet records are encrypted before persistence; the device key is protected by the system keychain. |
| Blockchain data | Aura connects to Electrum servers using wallet scripthashes. |
| Optional fallback | Direct address queries to mempool.space are disabled by default and require the user to enable them. |
| Spending | Transactions are assembled and signed locally; only signed transaction data is broadcast. |
| External links | Custom block explorers must use HTTPS and transaction IDs are validated before opening. |

More detail is available in [Architecture](docs/ARCHITECTURE.md) and
[FAQ](FAQ.md). Sensitive findings must be submitted through
[private vulnerability reporting](SECURITY.md).

## Project layout

```text
src/
├── components/   Shared interface components
├── constants/    Project-wide constants
├── i18n/         Localized interface text
├── navigation/   Navigation stacks and route types
├── network/      Electrum, mempool, fees, rates, and explorers
├── polyfills/    Runtime compatibility shims
├── screens/      Application screens
├── types/        Shared TypeScript contracts
├── utils/        Storage, encryption, and platform helpers
└── wallets/      Derivation, scanning, signing, and transactions
```

Native projects live in `android/` and `ios/`. Automated verification lives in
`scripts/`, `__tests__/`, and `.github/workflows/`.

## Build and run

Requirements:

- Node.js 22.11 or newer.
- The current React Native environment for the target platform.
- Xcode and CocoaPods for iOS, or Android Studio and Java 17 for Android.

```sh
git clone https://github.com/aurabitcoinwallet/aura-wallet.git
cd aura-wallet
npm ci
```

Start Metro:

```sh
npm start
```

Run a platform build in another terminal:

```sh
npm run ios
# or
npm run android
```

For iOS native dependencies, run `bundle install` and `bundle exec pod install`
inside `ios/` when required by your local toolchain.

## Verification

The verification suite exercises Aura's application modules rather than replacing
them with test-only wallet implementations.

```sh
npm run verify
npm run audit:dependencies
```

`npm run verify` includes linting, TypeScript, Jest, release invariants, encryption
and network security tests, official Bitcoin vectors, and the signing self-test.
Pull requests also run CodeQL and build the Android application on GitHub Actions.

## Project information

| Resource | Purpose |
| --- | --- |
| [FAQ](FAQ.md) | User-facing answers about custody, recovery, and network access. |
| [Architecture](docs/ARCHITECTURE.md) | Module boundaries and data flows. |
| [Contributing](CONTRIBUTING.md) | Development and pull-request expectations. |
| [Release process](RELEASE.md) | Required release checks and signing rules. |
| [Code of Conduct](CODE_OF_CONDUCT.md) | Community participation standards. |
| [Security Policy](SECURITY.md) | Private vulnerability reporting. |

## Contributing

Focused issues and pull requests are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md)
before changing wallet storage, key derivation, signing, transaction construction,
or networking. Never include real wallet secrets or user data in reports, tests,
screenshots, or logs.

## License

Aura Wallet is released under the [MIT License](LICENSE).

© 2026 Aura Wallet.
