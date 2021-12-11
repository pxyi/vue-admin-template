import axios, { AxiosRequestConfig } from 'axios';

export const post = <T = AxResponse>(url: string, data?: any, config?: AxiosRequestConfig | undefined): Promise<T> => axios.post(url, data, config);

export const get = <T = AxResponse>(url: string, config?: AxiosRequestConfig | undefined): Promise<T> => axios.get(url, config);

export const put = <T = AxResponse>(url: string, data?: any, config?: AxiosRequestConfig | undefined): Promise<T> => axios.put(url, data, config);

export const json = <T = AxResponse>(url: string, data?: any, config?: AxiosRequestConfig | undefined): Promise<T> => axios.post(url, data, Object.assign(config || {}, { headers: { 'Content-Type': 'application/json' } }));

export const upload = <T = AxResponse>(url: string, data: any, config?): Promise<T> => axios.post(url, data, Object.assign(config || {}, { headers: { 'Content-Type': 'multipart/form-data' } }));

export default {
  post,
  get,
  put,
  json,
  upload
}

export interface AxResponse {
  result  : boolean;
  msg     : string;
  json?   : any;
  records? : any;
  [propName: string]: any
}
