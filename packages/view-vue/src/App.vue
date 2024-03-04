<script setup lang="ts">
import { ref } from 'vue';

const aa = ref("")

const confirm = () => {
  console.log(aa.value)
}
</script>

<template>
  <div>
    1213
    <el-input v-model="aa" placeholder="主机名"></el-input>
    <el-button @click="confirm">确定</el-button>
  </div>
</template>

<style scoped></style>
