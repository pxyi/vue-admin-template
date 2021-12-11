import { typeOf, isType, inType } from './type';
import element from './element';
import { encrypt, decrypt } from './crypto';
import storage from './storage';
import * as math from './math';
import evaluate from './evaluate';
import scroll from './scroll';
import clone from './clone';
import debounce from './debounce';
import throttle from './throttle';
import useState from './useState';
import emitter from './emitter';
import http from './http';
import download from './dowload';
import print from './print';
import uuid from './uuid';

import modal from './../modal';
import drawer from './../drawer';
import screen from './../screen';
const $ = {
  download,
  print,
  typeOf,
  isType,
  inType,
  element,
  encrypt,
  decrypt,
  storage,
  math,
  evaluate,
  scroll,
  clone,
  debounce,
  throttle,
  useState,
  emitter,
  http,
  uuid,
  ...http,

  modal,
  drawer,
  screen
}
export {
  download,
  print,
  typeOf,
  isType,
  inType,
  element,
  encrypt,
  decrypt,
  storage,
  math,
  evaluate,
  scroll,
  clone,
  debounce,
  throttle,
  useState,
  emitter,
  http,

  uuid,

  modal,
  drawer,
  screen
}
export default $