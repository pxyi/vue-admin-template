<template>
  <el-form ref="formRef" :model="formGroup" :rules="rules" label-position="top">
    <el-form-item v-for="control in controlList" :key="control.key" :prop="control.key" :label="control.label">
      <template v-if="control.type === 'input'">
        <el-input v-model="formGroup[control.key]" :placeholder="control.placeholder || `Please enter a ${control.label}`" />
      </template>
      <template v-if="control.type === 'password'">
        <el-input type="password" v-model="formGroup[control.key]" :placeholder="control.placeholder || `Please enter a ${control.label}`" />
      </template>
      <template v-else-if="control.type === 'textarea'">
        <el-input v-model="formGroup[control.key]" type="textarea" :rows="control.rows || 2" :placeholder="control.placeholder || `Please enter a ${control.label}`" />
      </template>
      <template v-else-if="control.type === 'image'">
        <ax-upload v-model="formGroup[control.key]" :limit="control.limit" />
      </template>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { ref, reactive, computed } from 'vue'
import { PropType } from 'vue';
export default {
  name: 'AxForm',
  props: {
    formGroup: {
      type: Object as PropType<any>
    },
    controls: {
      type: Array as PropType<any[]>
    },
    callback: {
      type: Function as PropType<(params) => Promise<boolean>>
    }
  },
  setup(props) {

    const formRef = ref(null);

    const __formGroup = props.formGroup ? 
      Object.entries(props.formGroup).reduce((group, [key, value]) => { group[key] = value.default || null; return group; }, {}) : 
      props.controls.reduce((group, item) => { group[item.key] = item.default || null; return group; }, {});
      
    const formGroup = reactive(__formGroup)

    const __getRules = () => props.formGroup ? 
      Object.entries(props.formGroup).reduce((group, [key, value]) => { value.rules && (group[key] = value.rules); return group; }, {}) : 
      props.controls.reduce((group, item) => { item.rules && (group[item.key] = item.rules); return group; }, {});
    
    const rules = computed(__getRules);

    const __getControls = () =>  props.formGroup ? 
      Object.entries(props.formGroup).map(([key, value]) => ({ ...value, key })) :
      [ ...props.controls ]
    const controlList = computed(__getControls);


    const save = (resolve, reject) => formRef.value.validate(valid => {
      if (valid) {
        let result = Object.entries({ ...formGroup }).reduce((group, [key, value]) => { if (value || value === 0) { group[key] = value }  return group }, {})
        if (props.callback) {
          props.callback(result).then(res => res ? resolve() : reject());
        } else {
          resolve(result)
        }
      } else {
        reject()
      }
    })

    const validate = computed(() => formRef.value?.validate);

    return { formRef, controlList, formGroup, rules, validate, save }

  }
}
</script>

<style lang="scss" scoped>

</style>