<template>
  <div class="app-container">
    <div class="top-container">
      <el-input v-model="inputSearchTime" placeholder="输入格式如：2021-03-29 10:25:57" style="width: 260px; margin-right: 10px;"/>
      <el-button class="filter-item" type="primary" @click="clickFetchPageList">
        按时间查询
      </el-button>
    </div>

    <el-card>
      <el-table :data="GxPe3Host2List" v-loading="loading" highlight-current-row border style="font-size: 10px;">
        <el-table-column fixed prop="id" label="ID" width="90"/>
        <el-table-column fixed prop="devID" label="设备地址" width="80"/>
        <el-table-column prop="hStart" label="主机启动" width="80"/>
        <el-table-column prop="mCurrVal" label="主机电流实测值" width="95"/>
        <el-table-column prop="pressure" label="压力实测值" width="95"/>
        <el-table-column prop="dr1Temp" label="机筒1区温度实测值" width="95"/>
        <el-table-column prop="dr1TempSet" label="机筒1区温度设定值" width="95"/>
        <el-table-column prop="dr2Temp" label="机筒2区温度实测值" width="95"/>
        <el-table-column prop="dr2TempSet" label="机筒2区温度设定值" width="95"/>
        <el-table-column prop="dr3Temp" label="机筒3区温度实测值" width="95"/>
        <el-table-column prop="dr3TempSet" label="机筒3区温度设定值" width="95"/>
        <el-table-column prop="dr4Temp" label="机筒4区温度实测值" width="95"/>
        <el-table-column prop="dr4TempSet" label="机筒4区温度设定值" width="95"/>
        <el-table-column prop="flangeTemp" label="法兰温度实测值" width="95"/>
        <el-table-column prop="flangeTempSet" label="法兰温度设定值" width="95"/>
        <el-table-column prop="mold1Temp" label="模具1温度实测值" width="95"/>
        <el-table-column prop="mold1TmpSet" label="模具1温度设定值" width="95"/>
        <el-table-column prop="mold2Temp" label="模具2温度实测值" width="95"/>
        <el-table-column prop="mold2TempSet" label="模具2温度设定值" width="95"/>
        <el-table-column prop="mold3Temp" label="模具3温度实测值" width="95"/>
        <el-table-column prop="mold3TempSet" label="模具3温度设定值" width="95"/>
        <el-table-column prop="mold4Temp" label="模具4温度实测值" width="95"/>
        <el-table-column prop="mold4TempSet" label="模具4温度设定值" width="95"/>
        <el-table-column prop="reduTemp" label="减速箱温度实测值" width="95"/>
        <el-table-column prop="reduTempSet" label="减速箱温度设定值" width="95"/>
        <el-table-column prop="meltTemp" label="熔体温度实测值" width="95"/>
        <el-table-column prop="tempLimWarn" label="温度超极限报警" width="95"/>
        <el-table-column prop="hCoolFanFail" label="主机冷却风机故障" width="95"/>
        <el-table-column prop="hGoverFail" label="主机调速器故障" width="95"/>
        <el-table-column prop="hCurLim" label="主机电流超极限" width="95"/>
        <el-table-column prop="meltPreLim" label="熔体压力超极限" width="95"/>
        <el-table-column prop="hStopNotRelease" label="主机急停未松开" width="95"/>
        <el-table-column prop="barFanWarn" label="料筒风机报警" width="95"/>
        <el-table-column prop="gbTempWarn" label="减速箱温度报警" width="95"/>
        <el-table-column prop="hMaintainTimeOut" label="主机保养时间到" width="95"/>
        <el-table-column prop="recordTime" label="数据的记录时" width="95"/>
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
import {GxPe3Host2From, SearchTimeQuery} from "@/api/device/types";

const state = reactive({
  inputSearchTime: '',
  loading: false,
  total: 0,  // 总条数
  GxPe3Host2List: [] as GxPe3Host2From[],
  queryParams: {pageNum: 1, pageSize: 10} as SearchTimeQuery,  // 分页查询
});

const {
  inputSearchTime,
  loading,
  total,
  GxPe3Host2List,
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
