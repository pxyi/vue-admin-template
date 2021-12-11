import mitt, { Emitter } from 'mitt';
import { onUnmounted } from 'vue';
const emitter: Emitter<any> = mitt();

export default {
  ...emitter,
  on: (eventName, fn) => {
    emitter.on(eventName, fn);
    onUnmounted(() => emitter.off(eventName, fn))
  }
};
