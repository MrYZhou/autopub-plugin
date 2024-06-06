<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue';

const form = reactive({
    hostName: '',
    host: '',
    account: '',
    password: '',
})
declare let acquireVsCodeApi: any;
interface ResultData {
    message: String
}
const vscode = acquireVsCodeApi()
let eventData = reactive({ data: '', type: '' })
const confirm = () => {
    vscode.postMessage({ type: 'hostAdd', data: toRaw(form) });
}
//监听插件消息
window.addEventListener('message', event => {
    // 确保消息来源是可信的，通常是检查event.origin
    eventData.data = event.data.data
    eventData.type = event.data.type
});
</script>
<template>
  <el-row>
    <el-form :model="form" label-width="auto" :label-position="'right'">
      <el-form-item label="主机名">
        <el-input v-model="form.hostName" />
      </el-form-item>
      <el-form-item label="主机地址">
        <el-input v-model="form.host" />
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="form.account" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item 
        ><el-row class="confirm-wrap">
          <el-button class='confirm-btn' type="primary" @click="confirm" style="width: 100%;">确定</el-button>
        </el-row></el-form-item
      >
    </el-form>
  </el-row>
</template>
<style scoped>
.confirm-wrap{
    width: 110px;
    margin-left: 108px;
}
</style>
