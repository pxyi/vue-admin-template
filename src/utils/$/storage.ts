import { encrypt, decrypt } from './crypto';

/**
 * @本地加密存储
 */
interface IStorage {
  get: <T = any>(key: string) => T;
  set: (key: string, value: object | string) => void;
  remove: (key: string | string[]) => void;
}

const Storage: IStorage = {
  get(key) {
    let val = window.localStorage.getItem(encrypt(key));
    try {
      return JSON.parse(decrypt(val!));
    } catch (error) {
      return val ? decrypt(val) : null;
    }
  },
  set(key, value) {
    let val = value instanceof Object ? JSON.stringify(value) : value;
    window.localStorage.setItem(encrypt(key), encrypt(val));
  },
  remove(key) {
    let keys = typeof key === 'string' ? [ key ] : key;
    keys.map(item => window.localStorage.removeItem(encrypt(item)))
  }
};

export default Storage;



// class storage {
//   private eventsMap = new Map();
//   private storage = window.localStorage;
//   constructor() { }
//   get(key) {
//     let val = this.storage.getItem(encrypt(key));
//     try {
//       return JSON.parse(decrypt(val!));
//     } catch (error) {
//       return val ? decrypt(val) : null;
//     }
//   }
//   set(key, value) {
//     let val = value instanceof Object ? JSON.stringify(value) : value;
//     this.storage.setItem(encrypt(key), encrypt(val));
//     this.eventsMap.has(key) && this.eventsMap.get(key).map(fn => fn(value));
//     this.eventsMap.has('*') && this.eventsMap.get('*').map(fn => fn(value));
//   }
//   remove(key?) {
//     key ? this.storage.removeItem(encrypt(key)) : this.storage.clear();
//   }
//   change(key = '*', fn = () => {}) {
//     this.eventsMap.has(key) ? this.eventsMap.get(key).push(fn) : this.eventsMap.set(key, [ fn ]);
//   }
// }