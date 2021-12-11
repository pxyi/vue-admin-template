import { typeOf } from './type';

const clone = <T = any>(data: T): T => __deep(data);

const __deep = (data) => {
  switch (typeOf(data)) {
    case 'object': {
      return Object.fromEntries(Object.keys(data).map(key => [key, __deep(data[key])]));
    }
    case 'array': {
      return data.map(d => __deep(d));
    }
    case 'date': {
      return new Date(data);
    }
    case 'function': {
      return new Function(`return ${data.toString()}`)()
    }
    case 'regexp': {
      return new RegExp(data.toString());
    }
    default:
      return data;
  }
}
export default clone;