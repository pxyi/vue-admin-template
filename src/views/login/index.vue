<template>
  <div class="login__container">
    <div class="login-content">
      <div class="desc"><img src="~@/assets/login/desc.png" alt="Login"></div>
      <div class="login-main">
        <div class="logo"><img src="~@/assets/logo.png" alt="Logo"></div>
        <el-form :model="formGroup" :rules="rules" ref="formRef">
          <el-form-item prop="mobile">
            <el-input placeholder="Please input a username" prefix-icon="el-icon-user" v-model="formGroup.mobile" />
          </el-form-item>
          <el-form-item prop="md5Password">
            <el-input placeholder="Please input a password" show-password v-model="formGroup.md5Password">
            </el-input>
          </el-form-item>
          <div class="tip">If you forget your password, please contact the administrator</div>
          <el-button round :loading="loading" @click="login">Login</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { RESEARCH_MENU, TEACHING_MENU } from '@/core/config';

export default {
  setup() {
    window.localStorage.clear();

    let router = useRouter();
    let store = useStore();

    $.drawer.closeAll();
    $.modal.closeAll();
    $.screen.closeAll();

    let formRef = ref();
    let formGroup = reactive({
      mobile: null,
      md5Password: null,
    });
    let loading = ref(false);
    let rules = {
      mobile: [{ required: true, message: 'Please input a username' }],
      md5Password: [{ required: true, message: 'Please input a password' }],
    };
    const login = async () => {
      await formRef.value.validate();
      // loading.value = true;
      
      // loading.value = false;
    };
    
    return { formRef, formGroup, rules, login, loading };
  },
};
</script>

<style lang="scss">
.login__container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url('@/assets/login/background.jpeg') no-repeat center;
  background-size: cover;
  .login-content {
    display: flex;
    width: 1000px;
    height: 470px;
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
    .desc {
      width: 500px;
    }
    .login-main {
      width: 500px;
      padding: 55px 70px;
      .logo {
        width: 226px;
        margin: 0 auto 52px;
        img {
          width: 100%;
        }
      }
      .tip {
        margin-bottom: 28px;
        color: $--color-2;
        font-weight: 300;
      }
      .el-button {
        width: 100%;
        color: $--color-base;
        border-color: $--color-base;
      }
    }
  }
}
</style>