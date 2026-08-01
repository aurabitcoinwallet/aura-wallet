#!/usr/bin/env node

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = relativePath => fs.readFileSync(path.join(root, relativePath), 'utf8');

const expectedVersion = '27.27.20';
const expectedRepository = 'https://github.com/aurabitcoinwallet/aura-wallet';
const legacyRepository = 'https://github.com/aurawallet1/aura-wallet';

const packageJson = JSON.parse(read('package.json'));
const packageLock = JSON.parse(read('package-lock.json'));
const androidGradle = read('android/app/build.gradle');
const androidManifest = read('android/app/src/main/AndroidManifest.xml');
const iosProject = read('ios/AuraWallet.xcodeproj/project.pbxproj');
const iosInfo = read('ios/AuraWallet/Info.plist');
const repositoryUrls = read('src/constants/urls.ts');

assert.equal(packageJson.version, expectedVersion, 'package.json version mismatch');
assert.equal(packageLock.version, expectedVersion, 'package-lock.json version mismatch');
assert.equal(packageLock.packages[''].version, expectedVersion, 'lock root version mismatch');
assert.match(androidGradle, /versionName\s+"27\.27\.20"/, 'Android versionName mismatch');
assert.match(androidGradle, /versionCode\s+272720/, 'Android versionCode mismatch');
assert.match(iosProject, /MARKETING_VERSION = 27\.27\.20;/, 'iOS marketing version mismatch');
assert.match(iosProject, /CURRENT_PROJECT_VERSION = 272720;/, 'iOS build version mismatch');

assert.doesNotMatch(
  androidGradle,
  /release\s*\{[^}]*signingConfig\s+signingConfigs\.debug/s,
  'Android release must never use the debug signing key',
);
assert.match(androidGradle, /signingConfig\s+signingConfigs\.release/, 'production signing is required');
assert.match(androidGradle, /usesCleartextTraffic:\s*"false"/, 'Android release must reject HTTP');
assert.match(androidManifest, /android:allowBackup="false"/, 'Android backup must remain disabled');
assert.match(iosInfo, /<key>NSAllowsArbitraryLoads<\/key>\s*<false\/>/, 'iOS ATS must remain enabled');

assert.ok(repositoryUrls.includes(expectedRepository), 'repository URL mismatch');
for (const relativePath of ['README.md', 'SECURITY.md', 'src']) {
  const fullPath = path.join(root, relativePath);
  const stack = [fullPath];
  while (stack.length) {
    const current = stack.pop();
    const stat = fs.statSync(current);
    if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(current)) stack.push(path.join(current, entry));
    } else if (/\.(?:md|ts|tsx)$/.test(current)) {
      assert.ok(!fs.readFileSync(current, 'utf8').includes(legacyRepository), `legacy repository URL in ${current}`);
    }
  }
}

console.log('release security invariants: ok');
