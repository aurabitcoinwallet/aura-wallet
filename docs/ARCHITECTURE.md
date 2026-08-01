# Aura Wallet architecture

This document describes the main code boundaries and data flows in Aura Wallet.

## Application layers

| Layer | Location | Responsibility |
| --- | --- | --- |
| Interface | `src/screens`, `src/components`, `src/navigation` | User interaction, navigation, and presentation. |
| Wallet domain | `src/wallets` | Wallet creation, derivation, scanning, coin selection, transaction construction, and signing. |
| Network | `src/network` | Electrum communication, optional mempool access, fee estimates, rates, and block explorers. |
| Local protection | `src/utils/encryption.ts`, `src/utils/secureStore.ts`, `src/utils/storage.ts` | Encrypted wallet persistence, keychain access, and non-secret preferences. |
| Platform | `android`, `ios` | Native permissions, signing configuration, transport policy, and application packaging. |

## Wallet creation and storage

1. The application creates or imports wallet key material on-device.
2. Address derivation and public-key generation run in `src/wallets`.
3. Wallet records are encrypted before being persisted to application storage.
4. The device encryption key is stored through the platform keychain API with
   device-only accessibility controls.

## Reading blockchain state

1. Wallet addresses are converted to Electrum scripthashes.
2. Aura connects to the configured Electrum endpoint for balances, UTXOs, and
   transaction history.
3. If Electrum fails, Aura uses mempool.space only when the user has explicitly
   enabled the fallback setting.

This boundary keeps the fallback opt-in because direct address queries disclose
public wallet addresses to that network provider.

## Spending flow

1. The wallet selects UTXOs and constructs an unsigned transaction locally.
2. The signing module derives the required private key and signs on-device.
3. The completed transaction is serialized and only the signed transaction data is
   sent for broadcast.

## Release gates

Pull requests run the following gates before release:

- ESLint and TypeScript.
- Jest and release security invariants.
- Encryption, alert relay, block explorer, and text-encoding boundary tests.
- Official Bitcoin vectors and the transaction-signing self-test.
- Dependency advisory checks and CodeQL.
- Android application compilation.

GitHub Actions are pinned to full commit SHAs, and release tags are created from the
exact merge commit that passed the required checks.
