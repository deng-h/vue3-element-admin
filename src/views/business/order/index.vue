<template>
  <div class="app-container">
    <div class="top-container">
      <el-button style="margin-right: 20px;" type="success"  @click="addOrder" v-hasPerm="['order:add']">
        添加订单
      </el-button>

      <el-input v-model="inputSearch" placeholder="请输入订单编号或者规格/型号" style="width: 260px;margin-right: 20px;" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, toRefs, onMounted} from "vue";

</script>

<style scoped>

</style>
