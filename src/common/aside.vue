<template>
  <div :class="['ax__aside', { 'is_fold': !isExpand }]">
    <!-- <div class="ax__logo"><img src="~@/assets/logo.png" alt="Elsie International Education"></div> -->
    <div class="section">
      <!-- 
      <el-menu 
        class="ax__nav" 
        router
        :collapse="!isExpand" 
        :default-active="currentPath"
        background-color="#017AC3" 
        text-color="#fff" 
        active-text-color="#0079C3"
        :collapse-transition="false"
      >
        <template v-for="item in currentMenus" :key="item.key">
          <el-menu-item v-if="item.isLeaf" :index="item.key">
            <el-icon :size="18"><component :is="item.icon" /></el-icon>
            <template #title>{{ item.label }}</template>
          </el-menu-item>
          <el-sub-menu v-else :index="item.key">
            <template #title>
              <el-icon :size="18"><component :is="item.icon" /></el-icon>
              <span>{{ item.label }}</span>
            </template>
            <el-menu-item v-for="menu in item.children" :key="menu.key" :index="menu.key">{{ menu.label }}</el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu> -->
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';


const { isExpand } = defineProps(['isExpand']);

const route = useRoute();

const currentPath = computed(() => route.path);


</script>

<style lang="scss">
$--nav-item-height: 50px;

.ax__aside {
  display: flex;
  flex-direction: column;
  height: 100%;


  .section {
    flex: 1 1 60px;
    background: linear-gradient(180deg, #25A6E0, #017AC3);
  }

}

.el-menu-item.is-active {
  background: #fff !important;
}
</style>