import ElementPlus from 'element-plus';
import { createApp } from 'vue';
import Components from '@/components';
import Store from '@/store';
import router from '@/router';
import element from './../$/element';


const serviceList = new Map();

const create = (component, props = {}, opt?: { zIndex?: number, showBack?: boolean }) => {
  const uuid = `__screen__${Date.now()}`;

  let options = {
    zIndex: opt?.zIndex || 1010,
    showBack: opt?.showBack || false
  }
  return new Promise((resolve, reject) => {

    let historyState = history.state;
    let url = document.URL;
    const popstateFn = () => {
      close();
      history.replaceState(historyState, '', url);
      history.go(1);
    }

    let closeBtn = $.element('div', { 
      className: 'el-icon-back', 
      style: { fontSize: '28px', position: 'absolute', top: '15px', left: '30px', color: '#fff', cursor: 'pointer', zIndex: '1' },
      on: { click: () => close() }
    })

    window.addEventListener('popstate', popstateFn);

    let body = element('div', { className: uuid, style: { overflow: 'auto', height: '100%', background: '#fff' } });

    let close = (val?) => {
      window.removeEventListener('popstate', popstateFn);

      container.style.transform = 'scale(.5)'
      container.style.opacity = '0';
      setTimeout(() => {
        app.unmount();
        container.remove();
      }, 250);
      val ? resolve(val) : reject(false);
    }
    const app = createApp(component, { ...props });

    serviceList.set(uuid, { close, app });

    Object.keys(props).map(key => app.provide(key, props[key]));
    app.use(Components);
    app.use(Store);
    app.use(ElementPlus);
    app.provide('close', close);
    app.use(router)
    const vm = app.mount(body);
    let containerStyle = { 
      width: '100%', 
      height: '100%', 
      position: 'fixed', 
      zIndex: `${options.zIndex}`, 
      top: '0', 
      opacity: '0', 
      transition: 'all .25s',
      transform: 'scale(.5)'
    };
    setTimeout(() => {
      container.style.opacity = '1';
      container.style.transform = 'none'
    }, 0);

    let container = element('div', { style: containerStyle }, options.showBack ? [body, closeBtn] : [body]);
    document.body.appendChild(container);
  });
}


const closeAll = (val?) => {
  for (let { close } of serviceList.values()) {
    close(val);
  };

  serviceList.clear();
}

export default { create, closeAll }