import assert from 'node:assert/strict';

const runtime = globalThis as typeof globalThis & {
  TextEncoder?: typeof TextEncoder;
  TextDecoder?: typeof TextDecoder;
};
const nativeEncoder = runtime.TextEncoder;
const nativeDecoder = runtime.TextDecoder;

const run = async (): Promise<void> => {
  try {
    runtime.TextEncoder = undefined;
    runtime.TextDecoder = undefined;

    await import('../src/polyfills/textEncoding');

    assert.equal(typeof runtime.TextEncoder, 'function');
    assert.equal(typeof runtime.TextDecoder, 'function');

    const encoded = new runtime.TextEncoder!().encode('Aura 🔐 محفظة');
    assert.equal(new runtime.TextDecoder!().decode(encoded), 'Aura 🔐 محفظة');
    assert.equal(new runtime.TextDecoder!('windows-1252').decode(Uint8Array.of(0x80)), '€');
    assert.equal(new runtime.TextDecoder!().decode(Uint8Array.of(0xff)), '�');
  } finally {
    runtime.TextEncoder = nativeEncoder;
    runtime.TextDecoder = nativeDecoder;
  }

  console.log('text encoding fallback invariants: ok');
};

void run();
