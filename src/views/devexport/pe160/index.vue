<template>
  <div class="app-container" v-loading="loading" element-loading-text="正在导出请耐心等待" element-loading-spinner="el-icon-loading">
    <div class="filter-container">
      <el-input v-model="num" placeholder="输入要导出的条数" style="width: 200px;"/>
      <el-button style="margin-left: 10px;" type="primary" @click="fetchNumList">
        按条数导出数据
      </el-button>
      <br><br>
    </div>

    <div class="filter-container">
      <span class="demonstration">输入开始时间：</span>
      <el-date-picker
        v-model="startTime"
        type="datetime"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        placeholder="选择日期时间"
        style="margin-right: 10px;"
      />

      <span class="demonstration">输入截止时间：</span>
      <el-date-picker
        v-model="endTime"
        type="datetime"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        placeholder="选择日期时间"
      />
      <el-button  style="margin-left: 10px;" type="primary" @click="fetchTimeList">
        按时间导出数据
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, toRefs} from "vue";

const state = reactive({
  loading: false,
  num: '',
  startTime: '',
  endTime: '',

});

const {
  loading,
  num,
  startTime,
  endTime
} = toRefs(state)

function fetchNumList(){
  state.loading = true;

}

function fetchTimeList(){
  state.loading = true;
}
</script>

<style scoped>

</style>
