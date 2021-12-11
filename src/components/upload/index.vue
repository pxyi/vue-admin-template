<template>
  <el-upload :class="['ax__upload', { 'is__image': type === 'image', 'hide__upload': fileList.length >= limit }]" 
    action="#"
    :drag="type === 'file'"
    :file-list="fileList"
    :accept="accept"
    :multiple="multiple" 
    :list-type="type === 'image' ? 'picture-card' : 'text'"
    :before-upload="beforeUpload"
  >
    <template #default>
      <i class="el-icon-plus" v-if="type === 'image'" />
      <template v-else>
        <i class="el-icon-upload" />
        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        <div class="ax-upload__accept" v-if="accept">Supported formats: {{ accept }}</div>
      </template>
    </template>
    <template #file="{ file }" v-if="type === 'image'">
      <div class="image-box">
        <img :src="baseUrl + file.url" :alt="file.name">
        <div class="cover">
          <el-icon :size="20" color="#fff" @click="remove(file)"><delete /></el-icon>
        </div>
      </div>
    </template>
    <template #file="{ file }" v-else>
      <div class="files-box">
        <span :title="file.name">{{ file.name }}</span>
        <el-icon color="#999" @click="remove(file)"><close /></el-icon>
      </div>
    </template>
  </el-upload>
  
</template>

<script lang="ts">
import { ref, PropType, inject, computed, watch } from 'vue'
import axios from 'axios';

const action = '/system/file/uploadFile';

export default {
  name: 'AxUpload',
  props: {
    modelValue: {
      type: [String, Array] as PropType<string | Array<{ name: string, url: string }>>,
      default: () => []
    },
    accept: {
      type: String,
      default: ''
    },
    type: {
      type: String as PropType<'image' | 'file'>,
      default: 'image'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 9
    },
    files: {
      type: Array as PropType<any[]>,
      default: () => null
    }
  },
  emits: ['update:modelValue', 'update:files', 'change', 'remove', 'success'],
  setup({ modelValue, files }, { emit }) {
    const elForm = inject('elForm', {} as any);
    const elFormItem = inject('elFormItem', {} as any)

    const getInit = () => typeof modelValue === 'string' ? modelValue.split(',').map(item => ({ name: item.split('/').reduce((t, c) => c , ''), url: item })) :
              modelValue && modelValue.length ? modelValue : 
              files ? files.map(i => { i.name = i.fileName; i.url = i.filePath; return i; }) : [];
    const fileList = ref(getInit());

    const remove = (file) => {
      fileList.value.splice(fileList.value.findIndex(item => item.url === file.url), 1);
      emit('remove', { ...file });
    }

    watch(() => modelValue, (val) => {
      fileList.value = val ? typeof val === 'string' ? val.split(',').map(item => ({ name: item.split('/').reduce((t, c) => c , ''), url: item })) :  val : [];
      elFormItem.validate?.('change');
    }, { deep: true })
    watch(() => files, (val) => {
      fileList.value = getInit();
      elFormItem.validate?.('change');
      console.log(val)
    }, { deep: true })

    const upload = async (file) => {
      const formData = new FormData();
      formData.append('file', file)
      const res = await axios.post<null, { result: boolean; json: any }>(action, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      const info = { 
        name: res.json.oriFilename, 
        fileName: res.json.oriFilename, 
        ext: res.json.ext, 
        filePath: res.json.filePath,
        fileSize: res.json.fileSize,
        url: res.json.filePath
      }
      fileList.value.push(info);
      emit('success', info)
    }
    
    const beforeUpload = (file) => {
      upload(file)
      return false;
    }
    

    const error = computed(() => elFormItem.validateState === 'error' && elForm.showMessage && !fileList.value.length)

    watch(fileList.value, (val) => {
      emit('update:modelValue', val.map(i => i.url).join(',')); 
      emit('update:files', val);
      emit('change', val);
      elFormItem.validate?.('blur')
    });

    const baseUrl = import.meta.env.AX__BASE_URL;

    return { fileList, remove, beforeUpload, error, baseUrl }
    
  }
}
</script>

<style lang="scss" scoped>
.el-form-item.is-error .ax__upload :deep(.el-upload) {
  border-color: var(--el-color-danger) !important;
}
.ax__upload {

  .el-icon-upload {
    color: $--color-base;
  }
  .ax-upload__accept {
    color: #999;
    margin-top: 10px;
    font-size: 13px;
  }
  :deep(.el-upload-dragger) {
    width: 100% !important;
  }
  &.is__image :deep(.el-upload) {
    display: inline-block;
  }
  &.hide__upload :deep(.el-upload) {
    display: none;
  }
  
  :deep(.el-upload) {
    display: block;
  }
  :deep(.el-upload-list) {
    line-height: 0;
  }
  .image-box {
    height: 100%;
    position: relative;
    overflow: hidden;
    img {
      min-width: 100%;
      min-height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
    &:hover .cover {
      opacity: 1;
    }
    .cover {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: rgba($color: #000, $alpha: .6);
      position: absolute;
      top: 0;
      left: 0;
      user-select: none;
      opacity: 0;
      transition: .25s;
      .el-icon {
        cursor: pointer;
      }
    }
  }
  .files-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    span {
      display: block;
      flex: 1 1 auto;
      padding-right: 12px;
      white-space:nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    i {
      margin-left: 12px;
    }
  }
}
</style>