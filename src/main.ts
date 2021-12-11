import { createApp } from 'vue';


import './element-variables.scss';
import './core/axios'

/* -------------------- router -------------------- */
import { RouterView } from 'vue-router';
import router from './router';

/* -------------------- element -------------------- */
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'

/* -------------------- Vuex -------------------- */
import Store from './store';

import $ from '$';
window['$'] = $;

import Components from './components';
createApp(RouterView)
.use(Store)
.use(router)
.use(Components)
.use(ElementPlus, { locale, size: 'medium' })
.mount('#app')