<template>
  <div class="ax__table__container">
    <el-table 
      v-bind="$attrs" 
      v-loading="loading" 
      :data="dataset" 
      :stripe="stripe" 
      :size="size"
    >
      <slot />
      <template #empty><div style="line-height: 120px">暂无数据~哦！</div></template>
    </el-table>
    <template v-if="hasPage && dataset.length && page.total > page.size">
      <el-pagination
        v-model:current-page="page.current"
        v-model:page-size="page.size"
        :total="page.total"
        @current-change="request()"
        layout="prev, pager, next"
      />
    </template>
  </div>
</template>
<script lang="ts">
import { ref, reactive, watch, PropType, toRef, isRef } from 'vue';
import axios from 'axios';

export default {
  name: 'AxTable',
  props: {
    url: String,
    method: {
      type: String as PropType<'get' | 'post' | 'json'>,
      default: 'post',
    },
    size: {
      type: String as PropType<'default' | 'medium' | 'small' | 'mini'>,
      default: 'default'
    },
    dataSet: {
      type: Object,
      default: () => ref([])
    },
    autoRequest: {
      type: Boolean,
      default: true
    },
    default: {
      type: Object,
      default: () => ({})
    },
    init: {
      type: Object,
      default: () => ({})
    },
    hasPage: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    let dataset = toRef(props, 'dataSet');

    let loading = ref(false);

    let page = reactive({
      current: 1,
      size: 10,
      total: props.dataSet.length
    });
    watch(() => props.default, () => { page.current = 1; request() });

    let __params = {};
    const request = async (params?) => {
      params && (page.current = 1, __params = params);
      loading.value = true;
      let res = await axios.post<null, any>(props.url!, { ...props.default, ...__params, current: page.current, size: page.size }, props.method === 'json' ? { headers: { 'Content-Type': 'application/json' } } : undefined);
      if (res.result) {
        page.total = res.json.total;
        dataset.value = res.json.records;
      }
      loading.value = false;
    }
    props.url && props.autoRequest && request(props.default);

    return { dataset, page, request, loading }
  }
}
</script>
<style lang="scss" scoped>
.ax__table__container {
  background: #FFFFFF;
  box-shadow: 0px -2px 6px 0px rgba(91, 125, 255, 0.08);
  border-radius: 6px;
  border: 1px solid #EBF0FC;
  overflow: hidden;
  :deep(.el-table__header-wrapper) {
    th {
      background: #fff;
    }
  }
  :deep(.el-table__body-wrapper) {
    .el-table__body tr td {
      border-bottom: 0;
    }
  }
  :deep(.el-table::before) {
    display: none;
  }
  :deep(.el-table--striped) {
    .el-table__body-wrapper .el-table__row td {
      border-top: solid 1px #ddd;
    }
  }
  .el-pagination {
    margin: 20px 0;
    text-align: right;
  }
}
</style>
