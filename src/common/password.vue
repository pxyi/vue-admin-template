<template>
  <el-form ref="formRef" :model="formGroup" :rules="rules" label-position="top">
    <el-form-item prop="pass" label="New Pawssword">
      <el-input type="password" v-model="formGroup.pass" placeholder="Please input the new password" />
    </el-form-item>
    <el-form-item prop="password" label="Again">
      <el-input type="password" v-model="formGroup.password" placeholder="Please input the password again" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const rules = {
  pass: [ { required: true, message: 'Please input the new password' } ],
  password: [ 
    { required: true, message: 'Please input the password again' }, 
    { validator: (_, v, c) => c(v === formGroup.pass ? undefined : new Error("Two inputs don't match!")) } 
  ]
}

const formGroup = reactive({
  pass: null,
  password: null
});
const formRef = $.useState(null);
const store = useStore();
const router = useRouter();
const save = (resolve, reject) => formRef.value.validate(async valid => {
  if (valid) {
    let res = await $.post('/permission/user/updatePassword', { id: store.getters.userInfo.id, password: formGroup.password });
    res.result ? (resolve(), router.push('/login')) : reject();
  } else {
    reject()
  }
});
defineExpose({ save });
</script>

<style lang="scss" scoped>

</style>