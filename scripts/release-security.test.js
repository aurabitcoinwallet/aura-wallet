#!/usr/bin/env node

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = relativePath => fs.readFileSync(path.join(root, relativePath), 'utf8');

const expectedVersion = '27.27.60';
const expectedRepository = 'https://github.com/aurabitcoinwallet/aura-wallet';
const legacyRepositorySlug = 'aurawallet1/aura-wallet';
const privateReportingUrl = `${expectedRepository}/security/advisories/new`;
const forbiddenAuditDisclaimers = [
  /(?:has|have) not (?:yet )?(?:been )?(?:formally )?audited/i,
  /not (?:yet )?(?:been )?audited by (?:an? )?(?:independent|third[- ]party)/i,
  /(?:has|have) not (?:yet )?undergone.{0,80}(?:independent|third[- ]party).{0,40}audit/i,
  /(?:not|never) (?:independently|externally|third[- ]party) audited/i,
  /لم يخضع.{0,100}(?:لتدقيق|لفحص).{0,100}(?:طرف ثالث|مستقل)/i,
];

const packageJson = JSON.parse(read('package.json'));
const packageLock = JSON.parse(read('package-lock.json'));
const androidGradle = read('android/app/build.gradle');
const androidManifest = read('android/app/src/main/AndroidManifest.xml');
const iosProject = read('ios/AuraWallet.xcodeproj/project.pbxproj');
const iosInfo = read('ios/AuraWallet/Info.plist');
const repositoryUrls = read('src/constants/urls.ts');
const securityPolicy = read('SECURITY.md');
const readme = read('README.md');
const workflowFiles = ['.github/workflows/ci.yml', '.github/workflows/codeql.yml'];

assert.ok(
  forbiddenAuditDisclaimers.some(pattern =>
    pattern.test('It has not yet undergone a formal third-party security audit.'),
  ),
  'audit-disclaimer guard must reject the retired wording',
);

assert.equal(packageJson.version, expectedVersion, 'package.json version mismatch');
assert.equal(packageLock.version, expectedVersion, 'package-lock.json version mismatch');
assert.equal(packageLock.packages[''].version, expectedVersion, 'lock root version mismatch');
assert.match(androidGradle, /versionName\s+"27\.27\.60"/, 'Android versionName mismatch');
assert.match(androidGradle, /versionCode\s+272760/, 'Android versionCode mismatch');
assert.match(iosProject, /MARKETING_VERSION = 27\.27\.60;/, 'iOS marketing version mismatch');
assert.match(iosProject, /CURRENT_PROJECT_VERSION = 272760;/, 'iOS build version mismatch');

assert.doesNotMatch(
  androidGradle,
  /release\s*\{[^}]*signingConfig\s+signingConfigs\.debug/s,
  'Android release must never use the debug signing key',
);
assert.match(androidGradle, /signingConfig\s+signingConfigs\.release/, 'production signing is required');
assert.match(androidGradle, /usesCleartextTraffic:\s*"false"/, 'Android release must reject HTTP');
assert.match(androidManifest, /android:allowBackup="false"/, 'Android backup must remain disabled');
assert.match(iosInfo, /<key>NSAllowsArbitraryLoads<\/key>\s*<false\/>/, 'iOS ATS must remain enabled');
assert.doesNotMatch(iosInfo, /NSAllowsLocalNetworking/, 'iOS must not bypass ATS for local networking');
assert.doesNotMatch(iosInfo, /NSLocationWhenInUseUsageDescription/, 'unused location permission description must stay removed');
assert.match(securityPolicy, /^# Security Policy/m, 'security policy heading is required');
assert.ok(securityPolicy.includes(privateReportingUrl), 'security policy must use private reporting');
assert.doesNotMatch(securityPolicy, /audit status/i, 'security policy must not publish an audit-status section');

for (const workflowFile of workflowFiles) {
  const workflow = read(workflowFile);
  const actionRefs = [...workflow.matchAll(/uses:\s+[^\s@]+@([^\s#]+)/g)].map(match => match[1]);
  assert.ok(actionRefs.length > 0, `${workflowFile} must use at least one action`);
  for (const ref of actionRefs) {
    assert.match(ref, /^[0-9a-f]{40}$/, `${workflowFile} action must be pinned to a full commit SHA`);
  }
}

assert.ok(repositoryUrls.includes(expectedRepository), 'repository URL mismatch');
assert.ok(readme.includes(`v${expectedVersion}`), 'README release line mismatch');
assert.equal(packageJson.description, 'Open-source self-custody Bitcoin wallet for iOS and Android.');
assert.equal(packageJson.homepage, expectedRepository);
assert.equal(packageJson.bugs.url, `${expectedRepository}/issues`);
for (const [name, version] of Object.entries(packageJson.dependencies)) {
  assert.match(version, /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/, `production dependency ${name} must be pinned`);
}

for (const relativePath of ['README.md', 'FAQ.md', 'SECURITY.md', 'docs', 'src']) {
  const fullPath = path.join(root, relativePath);
  const stack = [fullPath];
  while (stack.length) {
    const current = stack.pop();
    const stat = fs.statSync(current);
    if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(current)) stack.push(path.join(current, entry));
    } else if (/\.(?:md|ts|tsx)$/.test(current)) {
      const contents = fs.readFileSync(current, 'utf8');
      assert.ok(!contents.includes(legacyRepositorySlug), `legacy repository reference in ${current}`);
      for (const pattern of forbiddenAuditDisclaimers) {
        assert.doesNotMatch(contents, pattern, `unwanted audit disclaimer in ${current}`);
      }
    }
  }
}

console.log('release security invariants: ok');
