# Contributing to Aura Wallet

Aura Wallet controls real funds. Changes should be small, reviewable, and backed
by tests. Avoid unrelated refactors in the same pull request, especially in key
derivation, storage, signing, transaction construction, and network code.

## Development setup

1. Install Node.js 22.11 or newer.
2. Run `npm ci`.
3. Configure the native React Native toolchain for the platform you use.
4. Run `npm run verify` before opening a pull request.

## Pull requests

- Explain what changed, why it is needed, and how it was validated.
- Add tests for fixes and security boundaries.
- Keep production dependencies pinned or narrowly constrained and justify new ones.
- Never commit mnemonics, private keys, signing keys, service credentials, or user data.
- Do not weaken TLS, secure storage, backup restrictions, or release-signing checks.
- Include screenshots for visible interface changes.

For a sensitive vulnerability, use GitHub private vulnerability reporting instead
of a public issue.
