<script setup lang="ts">
import { reactive, ref } from 'vue';

const aa = ref("")
declare let  acquireVsCodeApi: any;
interface ResultData {
    message:String
}
const vscode = acquireVsCodeApi()
let  eventData = reactive({message:''})
const confirm = () => {
  // 请求后端接口
  console.log(aa.value)
  vscode.postMessage({ type: 'hostAdd',data:'hostAdd' });
}
//监听插件消息
window.addEventListener('message', event => {
    // 确保消息来源是可信的，通常是检查event.origin
    // vscode.postMessage({ message: 'hostAdd',data:event });
    console.log(JSON.parse(event.data));
    
    // if (event.origin !== 'yourExtensionOrigin') return;
    // alert(event)
    // const message = event.data;
    // console.log('Received message:', message);

    // if (message.command === 'yourCommand') {
    //     console.log(11);
    // }
});
</script>

<template>
  <div>
    <el-input v-model="aa" placeholder="主机名"></el-input>
    {{ eventData }} {{ eventData.message }}
    <el-button @click="confirm">确定</el-button>
  </div>
</template>

<style scoped></style>
