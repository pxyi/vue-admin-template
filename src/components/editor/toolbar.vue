<template>
  <div class="ax__toolbar__container">
    <div :class="['ax__toolbar__content', { 'is__disabled': false }]">
      <template v-for="(menu, index) in menuList">
        <template v-if="Array.isArray(menu)">
          <div class="ax__divder" v-if="index > 0 && !Array.isArray(menuList[index - 1])" />
          <template v-for="tool in menu" :key="tool.icon">
            <div class="ax__toolbar__item" 
              @mouseover="mouseover($event, tool.desc)" 
              @mouseleave="tooltip.show = false"
              @click="tool.dropdown ? slide($event, tool) : menuHandle(tool)"
            >
              <i :class="[ 'icon-editor', `icon-${ tool.icon }` ]"></i>
            </div>
          </template>
          <div class="ax__divder" v-if="index < menuList.length - 1" />
        </template>
        <template v-else>
          <div class="ax__toolbar__item" 
            @mouseover="mouseover($event, menu.desc)" 
            @mouseleave="tooltip.show = false"
            @click="menu.dropdown ? slide($event, menu) : menuHandle(menu)"
          >
            <i :class="[ 'icon-editor', `icon-${ menu.icon }` ]"></i>
          </div>
        </template>
      </template>
    </div>
    <div :class="['ax__toolbar__tooltip', { 'is_show': tooltip.show } ]" :style="{ left: `${tooltip.offset}px` }">{{ tooltip.text }}</div>
    <div v-show="showDropdown && (!uuid || currentId === uuid)" class="ax__toolbar__dropdown" ref="dropdownRef" @click.stop></div>
  </div>
</template>

<script lang="ts">
import { ref,h, render, reactive, computed, onUnmounted, watch, inject, PropType } from 'vue';
import store from './store';
import { toolbarList, toolbarDefault, TMenuType } from './utils/toolbar';
type TPropsToolList = Array<TMenuType | TMenuType[]>;
export default {
  name: 'AxEditorToolbar',
  props: {
    toolbarList: {
      type: Array as PropType<TPropsToolList>,
      default: () => toolbarDefault
    }
  },
  setup(props) {
    let menuList = props.toolbarList.reduce((list, type) => {
      if (Array.isArray(type)) {
        list.push(type.filter(t => !!toolbarList[t]).map(type => ({ ...toolbarList[type], type })))
      } else if (!!toolbarList[type]) {
        list.push({ ...toolbarList[type], type });
      }
      return list;
    }, [] as any[])

    /* ------------- 点击工具栏 ------------- */
    const menuHandle = (tool) => {
      if (tool.type === 'image') {
        let fileDom: HTMLInputElement = document.createElement('input');
        fileDom.setAttribute('type', 'file');
        fileDom.setAttribute('accept', '.png,.jpg,.jpeg,.gif');
        fileDom.click();
        fileDom.onchange = async () => {
          let file = fileDom.files![0];
          store.commit('exec_command', { type: tool.type, value: file });
        }
      } else {
        store.commit('exec_command', { type: tool.type })
      }
    }

    /* ------------- 显示工具tip ------------- */
    let tooltip = reactive({ show: false, text: '', offset: 0 });
    const mouseover = ({ target }, text) => {
      tooltip.offset = target.offsetLeft + target.offsetWidth / 2;
      tooltip.text = text;
      tooltip.show = true;
    }

    /* ------------ 显示dropdown，并挂载组件 ------------ */
    let dropdownRef = ref<HTMLDialogElement | null>(null);
    let showDropdown = computed(() => store.state.showDropdown);
    const slide = async ({ target }, { dropdown, type }) => {
      let constructor = (await dropdown()).default;
      let vnode = h(constructor);
      vnode.key = Date.now();               // 通过更新 VNode Key，刷新组件
      render(vnode, dropdownRef.value!);

      dropdownRef.value!.style.left = `${target.offsetLeft}px`;
      store.commit('set_show_dropdown', true);
      store.commit('set_current_type', type);
    }

    /* ------------------ 隐藏dropdown ------------------ */
    const __slideHandle = () => store.commit('set_show_dropdown', false);
    document.body.addEventListener('click', __slideHandle);
    onUnmounted(() => document.body.removeEventListener('click', __slideHandle))

    let uuid = inject<string | null>('uuid', null);
    let currentId = computed(() => store.state.currentId);
    watch(() => store.state.currentId, () => store.commit('set_show_dropdown', false));


    return { menuList, tooltip, mouseover, slide, showDropdown, dropdownRef, menuHandle, uuid, currentId }
  }
}
</script>

<style lang="scss" scoped>
.ax__toolbar__container {
  display: inline-block;
  color: #333;
  position: relative;
  .ax__toolbar__content {
    display: flex;
    padding: 6px;
    background: #fff;
    border-radius: 4px;
    &.is__disabled {
      pointer-events: none;
      color: #999;
    }
    .ax__toolbar__item {
      padding: 4px;
      cursor: pointer;
      border-radius: 4px;
      transition: background .25s;
      &:hover {
        background: #ddd;
      }
      &:not(:last-child) {
        margin-right: 6px;
      }
      &.is_checked {
        color: $--color-base;
      }
      i {
        display: block;
        font-size: 16px;
        line-height: 1;
        pointer-events: none;
      }
    }
    .ax__divder {
      width: 1px;
      height: 18px;
      margin: 3px 6px 0 0;
      background: #ccc;
    }
  }
  .ax__toolbar__tooltip {
    opacity: 0;
    visibility: hidden;
    padding: 6px;
    color: #fff;
    font-size: 12px;
    line-height: 1;
    background: #333;
    border-radius: 4px;
    position: absolute;
    bottom: 0;
    z-index: 9;
    transform: translate3d(-50%, 0, 0);
    margin-bottom: -24px;
    white-space: nowrap;
    pointer-events: none;
    transition: opacity .25s;
    &.is_show {
      opacity: 1;
      visibility: visible;
    }
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -5px;
      margin-top: -10px;
      border: 5px solid rgba(0, 0, 0, 0);
      border-bottom-color: #333;
    }
  }

  .ax__toolbar__dropdown {
    background: #fff;
    padding: 12px 0;
    border-radius: 5px;
    box-shadow: 0 3px 8px 0 rgb(0 0 0 / 20%), 0 0 0 0 rgb(0 0 0 / 70%);
    position: absolute;
    z-index: 10;
    & > :deep(h2) {
      padding: 0 0 10px 10px;
      margin-bottom: 10px;
      color: #999;
      line-height: 1;
      font-size: 12px;
      font-weight: 400;
      border-bottom: solid 1px #ccc;
    }
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 12px;
      margin-left: -5px;
      margin-top: -10px;
      border: 5px solid rgba(0, 0, 0, 0);
      border-bottom-color: #fff;
    }
  }
}
</style>