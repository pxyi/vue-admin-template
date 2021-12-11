/// <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare interface ImportMeta {
  readonly env: ImportMetaEnv
}
declare interface ImportMetaEnv {
  AX__BASE_URL: string;
}

import _$ from '$'
declare global {
  const $: typeof _$;
}
