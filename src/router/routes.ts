
import { RouterView, RouteRecordRaw } from 'vue-router';
import store from '@/store';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
    // @ts-ignore
    component: () => import('@/common/index.vue'),
    children: [

    ]
  },
  {
    path: '/login',
    name: 'login',
    // @ts-ignore
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/error',
    name: 'error',
    // @ts-ignore
    component: () => import('@/views/error/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error'
  }
]

export default routes;