<template>
  <el-card>
    <div class="table" style="padding: 20px 0">
      <el-table v-loading="loading" :data="RealParamList" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="250" />
        <el-table-column prop="bluetoothMacAddress" label="蓝牙地址" width="160" />
        <el-table-column prop="pedalModel" label="踏板型号" width="80" />
        <el-table-column prop="pedalSwitchStatus" label="踏板开关状态" width="110" />
        <el-table-column prop="realtimeVoltage" label="实时电压值" width="110" />
        <el-table-column prop="leftDoorStatus" label="左门状态" width="110" />
        <el-table-column prop="leftPedalStatus" label="左踏板状态" width="110" />
        <el-table-column prop="rightDoorStatus" label="右门状态" width="140" />
        <el-table-column prop="rightPedalStatus" label="右踏板状态" width="140" />
        <el-table-column prop="gmtModified" label="更新时间" width="250" />
      </el-table>
    </div>

    <pagination
      v-if="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="handleQuery"
    />
  </el-card>

</template>

<script lang="ts">
export default {
  name: "FixedParam"
}
</script>

<script setup lang="ts">
import {reactive, toRefs, onMounted} from "vue";
import {FixedParamType, ParamQuery, RealParamType} from "@/api/pedal/types";
import {listRealParamPages} from "@/api/pedal";

const state = reactive({
  loading: true,  // 遮罩层
  total: 0,  // 总条数
  RealParamList: [] as RealParamType[],
  queryParams: {
    pageNum: 1,
    pageSize: 10
  } as ParamQuery,
});

const {
  loading,
  total,
  queryParams,
  RealParamList
} = toRefs(state);

/**
 * 查询  初始化数据
 */
function handleQuery() {
  state.loading = true;
  listRealParamPages(state.queryParams).then(({data}) => {
    state.RealParamList = data.list;
    state.total = data.total;
    state.loading = false;
  })
}

onMounted(()=>{
  handleQuery();
})
</script>

<style scoped>

</style>
