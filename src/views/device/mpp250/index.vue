<template>
  <div class="app-container">
    <div class="top-container">      <el-input v-model="inputSearchTime" placeholder="输入格式如：2021-03-29 10:25:57" style="width: 260px; margin-right: 10px;"/>
      <el-button class="filter-item" type="primary" @click="clickFetchPageList">
        按时间查询
      </el-button>
    </div>

    <el-card>
      <el-table :data="mpp250List" v-loading="loading" highlight-current-row border style="font-size: 10px;">
        <el-table-column fixed prop="id" label="ID" width="90"/>
        <el-table-column fixed prop="devid" label="设备地址" width="80"/>
        <el-table-column prop="hstart" label="主机启动" width="80"/>
        <el-table-column prop="trstart" label="牵引启动" width="80"/>
        <el-table-column prop="mcurrvalue" label="主机电流实测值" width="95"/>
        <el-table-column prop="trcurrvalue" label="牵引电流实测值" width="95"/>
        <el-table-column prop="pressure" label="压力实测值" width="95"/>
        <el-table-column prop="dr1temp" label="机筒1区温度实测值" width="95"/>
        <el-table-column prop="dr1temset" label="机筒1区温度设定值" width="95"/>
        <el-table-column prop="dr2temp" label="机筒2区温度实测值" width="95"/>
        <el-table-column prop="dr2temset" label="机筒2区温度设定值" width="95"/>
        <el-table-column prop="dr3temp" label="机筒3区温度实测值" width="95"/>
        <el-table-column prop="dr3temset" label="机筒3区温度设定值" width="95"/>
        <el-table-column prop="dr4temp" label="机筒4区温度实测值" width="95"/>
        <el-table-column prop="dr4temset" label="机筒4区温度设定值" width="95"/>
        <el-table-column prop="dr5temp" label="机筒5区温度实测值" width="95"/>
        <el-table-column prop="dr5temset" label="机筒5区温度设定值" width="95"/>
        <el-table-column prop="dr6temp" label="机筒6区温度实测值" width="95"/>
        <el-table-column prop="dr6temset" label="机筒6区温度设定值" width="95"/>
        <el-table-column prop="flangetemp" label="法兰温度实测值" width="95"/>
        <el-table-column prop="flangetmset" label="法兰温度设定值" width="95"/>
        <el-table-column prop="mold1temp" label="模具1温度实测值" width="95"/>
        <el-table-column prop="mold1tmset" label="模具1温度设定值" width="95"/>
        <el-table-column prop="mold2temp" label="模具2温度实测值" width="95"/>
        <el-table-column prop="mold2tmset" label="模具2温度设定值" width="95"/>
        <el-table-column prop="mold3temp" label="模具3温度实测值" width="95"/>
        <el-table-column prop="mold3tmset" label="模具3温度设定值" width="95"/>
        <el-table-column prop="mold4temp" label="模具4温度实测值" width="95"/>
        <el-table-column prop="mold4tmset" label="模具4温度设定值" width="95"/>
        <el-table-column prop="mold5temp" label="模具5温度实测值" width="95"/>
        <el-table-column prop="mold5tmset" label="模具5温度设定值" width="95"/>
        <el-table-column prop="mold6temp" label="模具6温度实测值" width="95"/>
        <el-table-column prop="mold6tmset" label="模具6温度设定值" width="95"/>
        <el-table-column prop="mold7temp" label="模具7温度实测值" width="95"/>
        <el-table-column prop="mold7tmset" label="模具7温度设定值" width="95"/>
        <el-table-column prop="mold8temp" label="模具8温度实测值" width="95"/>
        <el-table-column prop="mold8tmset" label="模具8温度设定值" width="95"/>
        <el-table-column prop="mold9temp" label="模具9温度实测值" width="95"/>
        <el-table-column prop="mold9tmset" label="模具9温度设定值" width="95"/>
        <el-table-column prop="mold10temp" label="模具10温度实测值" width="95"/>
        <el-table-column prop="mold10tmset" label="模具10温度设定值" width="95"/>
        <el-table-column prop="mold11temp" label="模具11温度实测值" width="95"/>
        <el-table-column prop="mold11tmset" label="模具11温度设定值" width="95"/>
        <el-table-column prop="redutemp" label="减速箱温度实测值" width="95"/>
        <el-table-column prop="redutmset" label="减速箱温度设定值" width="95"/>
        <el-table-column prop="melttemp" label="熔体温度实测值" width="95"/>
        <el-table-column prop="templimwn" label="温度超极限报警" width="95"/>
        <el-table-column prop="hcoolffail" label="主机冷却风机故障" width="95"/>
        <el-table-column prop="hgoverfail" label="主机调速器故障" width="95"/>
        <el-table-column prop="hcurlim" label="主机电流超极限" width="95"/>
        <el-table-column prop="tractgfail" label="牵引调速器故障" width="95"/>
        <el-table-column prop="tractcurlim" label="牵引电流超极限" width="95"/>
        <el-table-column prop="meltprlim" label="熔体压力超极限" width="95"/>
        <el-table-column prop="hstpnotrel" label="主机急停未松开" width="95"/>
        <el-table-column prop="barfanwn" label="料筒风机报警" width="95"/>
        <el-table-column prop="gbtempwn" label="减速箱温度报警" width="95"/>
        <el-table-column prop="hmtimewn" label="主机保养时间到" width="95"/>
        <el-table-column prop="recordtime" label="数据的记录时" width="95"/>

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
import {Mpp250Form, SearchTimeQuery} from "@/api/device/types";

const state = reactive({
  inputSearchTime: '',
  loading: false,
  total: 0,  // 总条数
  mpp250List: [] as Mpp250Form[],
  queryParams: {pageNum: 1, pageSize: 10} as SearchTimeQuery, // 分页查询
});

const {
  inputSearchTime,
  loading,
  total,
  mpp250List,
  queryParams,
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
