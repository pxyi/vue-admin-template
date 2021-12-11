import ElementPlus from 'element-plus';
import { Close } from '@element-plus/icons';
import { Component, createApp, createVNode, render } from 'vue';
import Components, { components } from '@/components';
import Store from '@/store';
import router from '@/router'
import element from './../$/element';

import './modal.scss';
const create = <T = any>(opt: ModalCreate): Promise<T> => {
  let options = {
    title: opt.title || null,
    width: opt.width || 720,
    component: opt.component,
    props: opt.props || {},
    zIndex: opt.zIndex || 3000,
    mask: typeof opt.mask === 'undefined' ? true : opt.mask,
    maskClosable: typeof opt.maskClosable === 'undefined' ? true : opt.maskClosable,
    closable: typeof opt.closable === 'undefined' ? true : opt.closable,
    footed: typeof opt.footed === 'undefined' ? true : opt.footed,
    headerStyle: opt.headerStyle || {},
    bodyStyle: opt.bodyStyle || {},
  }

  return new Promise(resolve => {
    const container = element('div', { className: `__modal__${ Date.now() }` });
    let maskEl = element('div', { className: 'modal-mask', style: { zIndex: `${options.zIndex}` }, on: { click: () => options.maskClosable && remove() } })
    options.mask && container.appendChild(maskEl);
    let modalBox = element('div', { className: 'modal-box', style: { width: `${options.width}px`, zIndex: `${options.zIndex + 1}` } });
    let modalBody = element('div', { className: 'modal-body', style: options.bodyStyle });

    modalBox.appendChild(modalBody);
    container.appendChild(modalBox);

    if (options.title) {
      let ModalHeader = element('div', { className: 'modal-header', style: options.headerStyle }, element('span', {}, options.title));
      if (options.closable) {
        let iconEl = element('i', { style: {width: '20px'}, on: { click: () => remove() } });
        let vm = createVNode(Close);
        render(vm, iconEl)
        ModalHeader.appendChild(iconEl);
      }
      modalBox.insertBefore(ModalHeader, modalBox.children[0]);
    }

    if (options.footed) {
      let closeBtn = element('button', { className: 'modal-close-btn', on: { click: () => remove() } }, element('span', {}, '取消'));
      let saveOnClick = () => {
        if (vm['save']) {
          new Promise((resolve, reject) => {
            vm['save'](resolve, reject);
            saveBtn.classList.add('loading');
            saveBtn.insertBefore(element('i', { className: 'el-icon-loading' }), saveBtn.children[0]);
          }).then((res) => remove(res || true)).catch(err => {
            saveBtn.querySelector('i')?.remove()
            saveBtn.classList.remove('loading');
          })
        } else {
          remove();
          console.warn(`请在 ${options.component.name} Component 中定义 save 方法`);
        }
      }
      let saveBtn = element('button', { className: 'modal-save-btn', on: { click: saveOnClick } }, element('span', {}, '确定'));

      let modalFooter = element('div', { className: 'modal-footer' }, [ closeBtn, saveBtn ]);
      modalBox.appendChild(modalFooter);
    }

    const remove = (val?) => {
      maskEl.classList.add('active');
      modalBox.classList.add('active');
      setTimeout(() => {
        app.unmount();
        container && document.body.removeChild(container);
      }, 500);
      val && resolve(val);
    };

    const app = createApp(options.component, { ...options.props });
    // Directives(app)
    app.use(Components);
    app.use(Store);
    app.use(ElementPlus);
    app.use(router);
    app.provide('close', remove);
    const vm = app.mount(modalBody);
    document.body.appendChild(container);

  })
}

const confirm = (opt: ModalConfirm): Promise<boolean> => {
  let options = {
    title: opt.title || '提示',
    message: opt.message,
    width: opt.width || 400,
    maskClosable: typeof opt.maskClosable === 'undefined' ? true : opt.maskClosable,
  }
  return new Promise((resolve, reject) => {
    let maskEl = element('div', { className: 'modal-mask', style: { zIndex: `999` }, on: { click: () => close(false) } })
    let modalBody = element('div', { className: 'modal-body' }, options.message);

    let closeBtn = element('button', { className: 'modal-close-btn', on: { click: () => close(false) } }, element('span', {}, '取消'));
    let saveBtn = element('button', { className: 'modal-save-btn', on: { click: () => close(true) } }, element('span', {}, '确定'));
    let modalFooter = element('div', { className: 'modal-footer' }, [closeBtn, saveBtn]);

    let modalBox = element('div', { className: 'modal-box', style: { width: `${options.width}px`, zIndex: `1000` } }, [modalBody, modalFooter]);
    const container = element('div', { className: 'modal-confirm' }, [maskEl, modalBox]);

    let ModalHeader = element('div', { className: 'modal-header' }, element('span', {}, options.title));
    let iconEl = element('i', { className: 'el-icon-close', on: { click: () => close(false) } });
    ModalHeader.appendChild(iconEl);
    modalBox.insertBefore(ModalHeader, modalBox.children[0]);
    document.body.appendChild(container);

    const close = (is) => { container.remove(); is ? resolve(true) : reject(false); }
  })
}

const closeAll = () => {
  let modal = document.querySelectorAll('[class^=__modal__]') || [];
  modal.forEach(i => i.remove());
}
export default { create, confirm, closeAll };
interface ModalConfirm {
  title?: string;
  message: string | HTMLElement;
  width?: number;
  maskClosable?: boolean;
}
interface ModalCreate {
  title?: string | HTMLElement;
  width?: number;
  component: Component;     // 子组件
  mask?: boolean;          // 是否展示遮罩
  zIndex?: number;
  maskClosable?: boolean;  // 点击蒙层是否允许关闭
  closable?: boolean;      // 是否展示右上角关闭按钮
  props?: object;          // 传入子组件的值
  footed?: boolean;         // 是否拥有默认页脚
  headerStyle?: object;     // modal-header 样式
  bodyStyle?: object        // modal-body 样式
}
