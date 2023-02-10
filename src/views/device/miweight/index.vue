<template>
  <div class="app-container">
    <div class="top-container">
      <el-input v-model="inputSearchTime" placeholder="输入格式如：2021-03-29 10:25:57" style="width: 260px; margin-right: 10px;"/>
      <el-button class="filter-item" type="primary" @click="clickFetchPageList">
        按时间查询
      </el-button>
    </div>

    <el-card>
      <el-table :data="miweightList" v-loading="loading" highlight-current-row border style="font-size: 10px;">
        <el-table-column fixed prop="id" label="ID" width="90"/>
        <el-table-column fixed prop="devID" label="设备地址" width="80"/>
        <el-table-column prop="mSpSet" label="主机转速设定值" width="80"/>
        <el-table-column prop="mSpVal" label="主机转速实测值" width="80"/>
        <el-table-column prop="trSpSet" label="牵引转速设定值" width="95"/>
        <el-table-column prop="trSpVal" label="牵引转速实测值" width="95"/>
        <el-table-column prop="mdVal" label="米重实测值" width="95"/>
        <el-table-column prop="mdSet" label="米重设定值" width="95"/>
        <el-table-column prop="extrVal" label="挤出量实测值" width="95"/>
        <el-table-column prop="extrSet" label="挤出量设定值" width="95"/>
        <el-table-column prop="SpdColmh" label="色母机转速" width="95"/>
        <el-table-column prop="totalElectri" label="总电量" width="95"/>
        <el-table-column prop="totalOutput" label="总产量" width="95"/>
        <el-table-column prop="timeOutput" label="计时产量" width="95"/>
        <el-table-column prop="timePower" label="计时电量" width="95"/>
        <el-table-column prop="avengCon" label="总平均能耗" width="95"/>
        <el-table-column prop="avengConph" label="计时平均能耗" width="95"/>
        <el-table-column prop="matLevlWarn" label="主机料斗料位过低" width="95"/>
        <el-table-column prop="speedWarn" label="主机转速超98%警告" width="95"/>
        <el-table-column prop="weightWarn" label="主机米重超主机负荷" width="95"/>
        <el-table-column prop="matlWarn" label="主机料斗料位过高" width="95"/>
        <el-table-column prop="trSpLossWarn" label="牵引速度丢失" width="95"/>
        <el-table-column prop="maSpLossWarn" label="主机转速丢失" width="95"/>
        <el-table-column prop="comtshWarn" label="主机色母料缺料" width="95"/>
        <el-table-column prop="recordTime" label="数据的记录时" width="95"/>

        <pagination
          v-if="total > 0"
          :total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="handleQuery"
        />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {reactive, toRefs, onMounted} from "vue";
import {MiWeightForm, SearchTimeQuery} from "@/api/device/types";
const state = reactive({
  inputSearchTime: '',
  loading: false,
  total: 0,  // 总条数
  miweightList: [] as MiWeightForm[],
  queryParams: {pageNum: 1, pageSize: 10} as SearchTimeQuery, // 分页查询
});

const {
  inputSearchTime,
  loading,
  total,
  miweightList,
  queryParams
} = toRefs(state)

function clickFetchPageList(){

}
function handleQuery(){

}
onMounted(() => {
  handleQuery();
});
</script>

<style scoped>

</style>
