# Release process

Aura Wallet releases must come from the protected default branch after review.

1. Start from the latest `main` branch and use a dedicated release branch.
2. Update the version in `package.json`, `package-lock.json`, Android, iOS, and the
   release-security test.
3. Run `npm ci`, `npm run verify`, and `npm run audit:dependencies`.
4. Review the complete diff and confirm that no secrets, signing material, generated
   native artifacts, or unrelated files are included.
5. Merge the pull request only when CI and CodeQL are successful.
6. Create the `vX.Y.Z` GitHub release from the exact merge commit.
7. Publish mobile binaries only when they are produced and signed by the authorized
   production signing process. Never publish debug-signed or ad-hoc binaries as a
   production release.

Release notes should summarize user-visible changes, security hardening, test results,
and any known limitations without claiming absolute security.
