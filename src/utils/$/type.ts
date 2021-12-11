import { Type } from "./_type";

export const typeOf = (data: any): Type => {
  let type = Object.prototype.toString.call(data)
  return type.substr(8, type.length - 9).toLocaleLowerCase() as Type;
}

export const isType = <T>(data: T, type: Type): data is T  => {
  return typeOf(data) === type;
}

export const inType = (data: any, types: Type[]): boolean => {
  return types.some(d => typeOf(data) === d);
}