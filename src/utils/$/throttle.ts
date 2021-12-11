/** 
 * @节流
 * @param fn    待执行函数
 * @param wait  等待时间
 */
const throttle = function (fn, delay) {
  let timer: any = null;
  let startTime = Date.now();
  return function () {
    let curTime = Date.now();
    let remaining = delay - (curTime - startTime);
    let args = arguments;
    timer && clearTimeout(timer);
    if (remaining <= 0) {
      // @ts-ignore
      fn.apply(this, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(fn, remaining);
    }
  }
}

export default throttle;