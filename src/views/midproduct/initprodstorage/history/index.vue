<template>
  <div class="app-container">
    <div class="top-container">
      <el-input v-model="inputSearch" placeholder="请输入产品型号" style="width: 260px; margin-right: 10px;" />
      <el-button :icon="Search" v-hasPerm="['initprodstorage:list']" type="primary" @click="fetchPageList">
        查询
      </el-button>

      <el-button v-hasPerm="['initprodstorage:history']" style="margin-left: 20px;" type="success" @click="gotoCurrentPage">
        查看当前库存数据
      </el-button>
    </div>

    <el-card style="margin-top: 10px;">
      <el-table :data="tableDatalist" v-loading="loading" highlight-current-row border style="font-size: 10px;">
        <el-table-column fixed type="index" align="center" label="序号" width="70"/>
        <el-table-column prop="model" align="center" label="具体型号" width="120"/>
        <el-table-column prop="name" align="center" label="型号名称" width="120"/>
        <el-table-column prop="cname" align="center" label="所属分组" width="120"/>
        <el-table-column prop="stocks" align="center" label="库存数" width="130"/>
        <el-table-column prop="adminName" align="center" label="最后更新人员" width="130"/>
        <el-table-column prop="gmtCreate" align="center" label="更新时间"/>
        <el-table-column prop="gmtModified" align="center" label="记录时间"/>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import {Search} from "@element-plus/icons-vue";
import {reactive, toRefs} from "vue";

const state = reactive({
  loading: false,
  inputSearch: '',
});

const {
  loading,
  inputSearch
} = toRefs(state);

function gotoCurrentPage(){
  router.push("/midproduct/initprodstorage");
}

function fetchPageList(){

}
</script>

<style scoped>

</style>
