import { ref, Ref, UnwrapRef, watch } from 'vue';

interface IRef<T> extends Ref<UnwrapRef<T>> {
  set: (v: T) => T;

  watch: (fn: (value) => void, opt?: { deep?: boolean, immediate?: boolean }) => void
}

const useState = <T = any>(init?: T): IRef<T> => {
  let state = ref<T>(init);
  return Object.assign(state, { 
    set: (v) => state.value = v, 
    watch: (fn, opt = {}) => watch(() => state.value, (v) => fn(v), opt)
  });
}
export default useState;