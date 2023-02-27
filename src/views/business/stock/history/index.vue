<template>
  <div class="app-container">
    <div class="top-container">
      <el-input v-model="inputSearch" placeholder="请输入批次型号(规格/型号, 支长/根重, 壁厚)" style="width: 330px; margin-right: 10px;" />
      <el-button v-hasPerm="['stock:history']" type="primary" @click="fetchPageList">
        查询
      </el-button>
      <el-button v-hasPerm="['stock:history']" style="margin-left: 20px;" type="success" @click="gotoNowPage">
        查看当前库存数据
      </el-button>
    </div>
    <el-card style="margin-top: 10px">
      <el-table :data="stockList" v-loading="loading" highlight-current-row border style="font-size: 10px;">
        <el-table-column fixed type="index" align="center" label="序号" width="80"/>
        <el-table-column fixed prop="totalModel" align="center" label="用户名" width="180"/>
        <el-table-column prop="stocks" align="center" label="库存数(米)"/>
        <el-table-column prop="adminName" align="center" label="最后更新人员"/>
        <el-table-column prop="updatetime" align="center" label="更新时间"/>
        <el-table-column prop="recordtime" align="center" label="记录时间"/>
      </el-table>

      <pagination
        v-if="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="handleQuery"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {reactive, toRefs, onMounted} from "vue";
import router from '@/router';
import {DevAddrQuery, Stock} from "@/api/business/types";

const state = reactive({
  loading: false,
  total: 0,  // 总条数
  inputSearch: '',
  queryParams: {pageNum: 1, pageSize: 10} as DevAddrQuery,
  stockList: [{'id': '1', 'adminName': 'joy'}] as Stock[],
});

const {
  loading,
  total,
  inputSearch,
  queryParams,
  stockList

} = toRefs(state);

function gotoNowPage(){
  router.push("/business/stock")
}

function handleQuery(){

}

function fetchPageList(){

}

onMounted(() => {
  handleQuery();
})
</script>

<style scoped>

</style>
