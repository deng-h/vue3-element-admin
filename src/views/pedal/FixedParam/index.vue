<template>
  <el-card>
    <div class="table" style="padding: 20px 0">
      <el-table v-loading="loading" :data="FixedParamList" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="250" />
        <el-table-column prop="bluetoothMacAddress" label="蓝牙地址" width="160" />
        <el-table-column prop="pedalModel" label="踏板型号" width="80" />
        <el-table-column prop="outputBlockCurrent" label="堵转电流输出" width="110" />
        <el-table-column prop="inputBlockCurrent" label="堵转电流输入" width="110" />
        <el-table-column prop="lowVoltageLowerLimit" label="低电压点下限" width="110" />
        <el-table-column prop="lowVoltageUpperLimit" label="低电压点上限" width="110" />
        <el-table-column prop="startVoltageLowerLimit" label="汽车启动电压下限" width="140"/>
        <el-table-column prop="startVoltageUpperLimit" label="汽车启动电压上限" width="140"/>
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
import {FixedParamType, ParamQuery} from "@/api/pedal/types";
import {listFixedParamPages} from "@/api/pedal";

const state = reactive({
  loading: true,  // 遮罩层
  total: 0,  // 总条数
  FixedParamList: [] as FixedParamType[],
  queryParams: {
    pageNum: 1,
    pageSize: 10
  } as ParamQuery,
});

const {
  loading,
  total,
  queryParams,
  FixedParamList
} = toRefs(state);

/**
 * 查询  初始化数据
 */
function handleQuery() {
  state.loading = true;
  listFixedParamPages(state.queryParams).then(({data}) => {
    state.FixedParamList = data.list;
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
