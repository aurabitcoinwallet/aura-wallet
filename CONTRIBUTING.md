# Contributing to Aura Wallet

Aura Wallet handles Bitcoin key material and signed transactions. Changes must be
focused, reviewable, and supported by evidence appropriate to their risk.

## Development setup

1. Install Node.js 22.11 or newer.
2. Run `npm ci` from the repository root.
3. Configure the React Native toolchain for the platform you use.
4. Run `npm run verify` before opening a pull request.

## Change guidelines

- Keep each pull request focused on one problem or closely related set of changes.
- Explain why the change is needed, how it works, and what user behavior changes.
- Add tests for fixes, parsing boundaries, and security-sensitive behavior.
- Prefer TypeScript for new application and test modules.
- Keep user-facing text in the localization files instead of inline screen strings.
- Avoid new production dependencies unless the benefit and maintenance cost are
  clearly justified. Pin security-sensitive dependencies narrowly.
- Do not mix unrelated formatting or refactoring into a functional change.

Changes to key derivation, encrypted storage, signing, transaction construction,
network requests, permissions, or release configuration require especially careful
review and direct tests of both expected and rejected inputs.

## Pull-request checklist

- Describe the problem and implementation.
- Run `npm run verify` and `npm run audit:dependencies`.
- Include screenshots or a short recording for visible interface changes.
- Confirm that no generated native artifacts or unrelated files are included.
- Confirm that no recovery phrases, private keys, signing material, credentials,
  notification tokens, addresses, transaction data, or other user information are
  present in code, tests, logs, or screenshots.

## Security reports

Do not open a public issue for a vulnerability. Use
[GitHub Private Vulnerability Reporting](https://github.com/aurabitcoinwallet/aura-wallet/security/advisories/new).
