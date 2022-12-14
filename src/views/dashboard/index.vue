<template>
  <div class="dashboard-container">
    <!-- Echarts 图表 -->
    <el-row :gutter="40" style="margin-top: 20px">
      <el-col :sm="24" :lg="8" class="card-panel__col">
        <BarChart id="barChart" height="400px" width="100%" class="chart-container"/>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="8" class="card-panel__col">
        <PieChart id="pieChart" height="400px" width="100%" class="chart-container"/>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="8" class="card-panel__col">
        <RadarChart id="radarChart" height="400px" width="100%" class="chart-container"/>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
export default { name: 'Dashboard' };
</script>

<script setup lang="ts">

import BarChart from './components/Chart/BarChart.vue';
import PieChart from './components/Chart/PieChart.vue';
import RadarChart from './components/Chart/RadarChart.vue';

</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 24px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .card-panel__col {
    margin-bottom: 12px;
  }

  .chart-container {
    background: #ffffff;
  }
}
</style>
