# Aura Wallet FAQ

## Who controls the Bitcoin keys?

The user does. Aura creates and uses recovery phrases, passphrases, and private keys
inside the mobile application. Key material is not sent to an Aura server.

## How are wallets stored?

Wallet records are encrypted before they are written to application storage. The
device encryption key is protected with the iOS Keychain or Android Keystore through
the platform keychain API.

## How does Aura read balances and transaction history?

Aura connects to Electrum servers and requests blockchain information using wallet
scripthashes. A direct mempool.space fallback exists, but it is disabled by default
and must be enabled by the user in Settings.

Network providers can observe connection metadata and the public blockchain queries
sent to them. Recovery phrases, private keys, and unsigned transaction secrets are
not required for these lookups.

## Can a wallet be recovered in another compatible application?

Aura supports standard BIP39 recovery phrases and BIP44, BIP49, and BIP84 derivation
paths. Recovery depends on using the same phrase, optional passphrase, network, and
derivation settings.

## Which Bitcoin address types are supported?

Aura derives Legacy (BIP44), Nested SegWit (BIP49), and Native SegWit (BIP84)
addresses. The send flow also validates Taproot recipient addresses.

## Where can I verify the source?

The canonical repository is
[aurabitcoinwallet/aura-wallet](https://github.com/aurabitcoinwallet/aura-wallet).
The local verification entry point is `npm run verify`.

## How should a security issue be reported?

Use [GitHub Private Vulnerability Reporting](https://github.com/aurabitcoinwallet/aura-wallet/security/advisories/new).
Do not disclose security findings or wallet secrets in a public issue.
