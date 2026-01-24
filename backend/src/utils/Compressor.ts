import { gzipSync, gunzipSync } from 'node:zlib';

class Compressor {
  // Compress a Buffer and return Base64
  static compress = (buffer: Buffer): string => {
    const compressed = gzipSync(buffer);
    return compressed.toString('base64');
  };

  // Decompress a Base64 string back to Buffer
  static decompress = (base64String: string): Buffer => {
    const compressedBuffer = Buffer.from(base64String, 'base64');
    return gunzipSync(compressedBuffer);
  };
}

export default Compressor;
