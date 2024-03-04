<script setup lang="ts">
import { ref } from 'vue';

const aa = ref("")

const confirm = () => {
  // 请求后端接口
  console.log(aa.value)
}
</script>

<template>
  <div>
    <el-input v-model="aa" placeholder="主机名"></el-input>

    <el-button @click="confirm">确定</el-button>
  </div>
</template>

<style scoped></style>
