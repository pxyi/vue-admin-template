<template>
  <el-container>
    <el-aside :width="`${isExpand ? 210 : 50}px`"><AsideComponent :is-expand="isExpand" /></el-aside>
    <el-container>
      <el-header><HeaderComponent /></el-header>
      <div id="breadcrumb" />
      <el-main style="padding: 30px">
        <div class="ax__container">
          <div class="ax__content">
            <router-view v-slot="{ Component }">
              <component :is="Component" />
            </router-view>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>

  <teleport to="#slideBtn" v-if="isMounted">
    <el-icon @click="isExpand = !isExpand" :size="20" color="#999"><fold v-if="isExpand" /><expand v-else /></el-icon>
  </teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import HeaderComponent from './header.vue';
import AsideComponent from './aside.vue';

let isMounted = ref(false);
onMounted(() => isMounted.value = true);

let isExpand = ref(true);
</script>

<style lang="scss">
.el-aside {
  transition: all .3s;
}
#breadcrumb {
  padding: 0 43px;
  background: #fff;
  border-top: solid 1px #E5F0EF;
}
.el-main {
  background: linear-gradient(90deg, #C1E1E7, #E5ECE4, #E7F4F6);
  .ax__container {
    height: 100%;
    overflow: auto;
    .ax__content {
      height: 100%;
    }
  }
}
</style>
