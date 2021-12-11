<template>
  <div 
    :class="['ax__button', `ax__${type}`, { 
      'is__disabled': disabled, 
      'is__loading': loading 
    }]" 
    @click="$emit('click', $event)">
    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
export default {
  name: 'AxButton',
  props: {
    size: {
      default: 'default',
      type: String as PropType<'default' | 'large' | 'medium' | 'small' | 'mini'>,
      validator: (val: string) => ['default', 'large', 'medium', 'small', 'mini'].includes(val),
    },
    type: {
      default: 'default',
      type: String as PropType<'default' | 'success' | 'warning' | 'danger' | 'info'>
    },
    loading: Boolean,
    disabled: Boolean,
  },
  emits: ['click'],
  setup(props, { emit }) {
  }
}
</script>

<style lang="scss" scoped>
.ax__button {
  display: inline-block;
  height: 38px;
  border-radius: 20px;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  &:not(:last-of-type) {
    margin-right: 12px;
  }
  & > div {
    padding: 0 35px;
    color: #fff;
    font-size: $--size-small;
    line-height: 34px;
    position: relative;
  }
  &::before {
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    border-radius: inherit;
    transform: scaleY(.87);
    transform-origin: 0 0;
    position: absolute;
    top: 0;
    left: 0;
    transition: all .1s;
  }
  &:hover {
    box-shadow: 0px 7px 15px 0px rgba(0, 0, 0, .1);
  }
  &:active::before {
    transform: scaleY(.95);
  }
  &.is__disabled,
  &.is__loading {
    pointer-events: none;
  }
  &.ax__default {
    background: $--color-base;
    &::before {
      background: #54bbb1;
    }
  }
  &.ax__success {
    background: #7CB342;
    &::before {
      background: $--color-success;
    }
  }
  // &.is__loading {

  // }
}
</style>