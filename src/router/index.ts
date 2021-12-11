import { ElMessage } from 'element-plus';
import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';

import routes from './routes';

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.protected) {
    next();
  }
  next();
})
export default router;
