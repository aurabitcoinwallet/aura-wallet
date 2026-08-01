import { textDecode, textEncode, type SupportedEncoding } from '@borewit/text-codec';

type Encoder = { encode(input?: string): Uint8Array };
type Decoder = { decode(input?: Uint8Array): string };
type EncoderConstructor = new () => Encoder;
type DecoderConstructor = new (encoding?: string) => Decoder;

const runtime = globalThis as unknown as {
  TextEncoder?: EncoderConstructor;
  TextDecoder?: DecoderConstructor;
};

class TextEncoderFallback implements Encoder {
  encode(input = ''): Uint8Array {
    const current = runtime.TextEncoder;
    runtime.TextEncoder = undefined;
    try {
      return textEncode(String(input), 'utf-8');
    } finally {
      runtime.TextEncoder = current;
    }
  }
}

class TextDecoderFallback implements Decoder {
  private readonly encoding: SupportedEncoding;

  constructor(encoding = 'utf-8') {
    this.encoding = encoding.toLowerCase() as SupportedEncoding;
  }

  decode(input = new Uint8Array()): string {
    const current = runtime.TextDecoder;
    runtime.TextDecoder = undefined;
    try {
      return textDecode(input, this.encoding);
    } finally {
      runtime.TextDecoder = current;
    }
  }
}

// Install before importing the application: wallet derivation, signing, and QR
// modules create encoder instances while their modules are initialized.
if (typeof runtime.TextEncoder === 'undefined') runtime.TextEncoder = TextEncoderFallback;
if (typeof runtime.TextDecoder === 'undefined') runtime.TextDecoder = TextDecoderFallback;
