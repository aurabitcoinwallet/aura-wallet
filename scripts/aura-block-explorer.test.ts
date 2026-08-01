import assert from 'node:assert/strict';

import {
  DEFAULT_EXPLORER_URL,
  explorerTxUrl,
  isValidExplorerUrl,
} from '../src/network/blockExplorers';

const txid = 'a'.repeat(64);
const scriptScheme = ['javascript', 'alert(1)'].join(':');

assert.equal(isValidExplorerUrl('https://mempool.space'), true);
assert.equal(isValidExplorerUrl('http://mempool.space'), false);
assert.equal(isValidExplorerUrl(scriptScheme), false);
assert.equal(isValidExplorerUrl('https://user:pass@example.com'), false);
assert.equal(isValidExplorerUrl('not a url'), false);
assert.equal(explorerTxUrl('https://mempool.space', txid), `https://mempool.space/tx/${txid}`);
assert.equal(explorerTxUrl('http://unsafe.example', txid), `${DEFAULT_EXPLORER_URL}/tx/${txid}`);
assert.equal(explorerTxUrl('https://mempool.space', '../bad'), '');

console.log('block explorer security invariants: ok');
