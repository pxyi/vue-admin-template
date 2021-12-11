<template>
  <div class="container">
    <img src="~@/assets/404.jpg" alt="Not Found">
    <h2>Sorry, we could not find the page</h2>
    <div class="actions">
      <el-button type="text" @click="handle(true)">Go Home</el-button>
      <span>or</span>
      <el-button type="text" @click="handle(false)">Go Login</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { RESEARCH_MENU, TEACHING_MENU } from '@/core/config';
const store = useStore();

const router = useRouter();

const handle = (isGoHome) => {
  if (isGoHome && store.getters.userRoles) {
    const allowPath = store.getters.userRoles.reduce((paths, role) => role.isAdmin || paths.includes('**') ? '**' : `${paths},${role.menuUrls}`, '') || '';
    const routes = [...RESEARCH_MENU, ...TEACHING_MENU].reduce((arrs, route) =>  route.isLeaf ? [...arrs, route] : [...arrs, ...route.children], []);
    if (allowPath.includes('**')) {
      router.push(routes[0].key)
    } else {
      router.push(routes.find(route => allowPath.includes(route.key)).key)
    }
  } else {
    router.push('/login')
  }
}

</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  h2 {
    margin-top: 40px;
    color: #00539f;
    font-size: 30px;
    font-weight: 400;
  }
  .actions {
    margin-top: 20px;
    & > span {
      font-size: 16px;
      margin: 0 16px;
    }
  }
  .el-button {
    font-size: 20px;
  }
}
</style>