import CryptoJS from 'crypto-js';

/* ------------------ AES加密 ------------------ */
const secret = 'phuhoang'
const key = CryptoJS.enc.Utf8.parse(secret);
const iv = CryptoJS.enc.Utf8.parse('');

export const encrypt = (word: string): string => {
  if (import.meta.env.MODE === 'development') { return word }
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}
export const decrypt = (word: string): string => {
  if (import.meta.env.MODE === 'development') { return word }
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}