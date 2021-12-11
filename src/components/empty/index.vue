<template>
  <div class="ax__empty">
    <slot>
      <div class="ax_empty_image"><img src="~@/assets/empty.png" alt="No Data"></div>
      <div class="ax_empty_text">No Data</div>
    </slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AxEmpty'
}
</script>

<style lang="scss" scoped>
.ax__empty {
  padding: 20px 0;
  text-align: center;
  .ax_empty_image {
    img {
      width: 120px;
      margin-bottom: 10px;
    }
  }
  .ax_empty_text {
    color: #999;
  }
}
</style>