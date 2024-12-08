import CryptoJS from 'crypto-js';
import { sha256 } from '@noble/hashes/sha256';
import { Buffer } from 'buffer';

export async function hashFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const hash = sha256(new Uint8Array(arrayBuffer));
  return Buffer.from(hash).toString('hex');
}

export function encryptData(data: Uint8Array, key: string): string {
  const wordArray = CryptoJS.lib.WordArray.create(data);
  return CryptoJS.AES.encrypt(wordArray, key).toString();
}

export function decryptData(encryptedData: string, key: string): Uint8Array {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, key);
  return new Uint8Array(decrypted.words);
}