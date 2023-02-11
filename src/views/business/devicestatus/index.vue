<template>
  <div class="app-container">
    <div class="top-container">
      <el-button type="success" @click="updateDeviceStatus" v-hasPerm="['deviceStatus:add']" style="margin-right: 20px;">
        更新设备状态
      </el-button>

      <el-input v-model="inputSearch" placeholder="请输入设备地址" style="width: 260px; margin-right: 10px;" />
      <el-button type="primary" @click="clickFetchPageList" v-hasPerm="['deviceStatus:list']">
        查询
      </el-button>
      <el-checkbox style="margin-left: 20px;" @change="checkChange" v-model="latestStatus" label="仅显示最新设备状态"></el-checkbox>
    </div>

    <el-card style="margin-top: 10px;">
      <el-table :data="tableDatalist" v-loading="loading" highlight-current-row border style="font-size: 10px;">
        <el-table-column fixed prop="devid" align="center" label="设备地址" width="100"/>
        <el-table-column prop="powerstatus" align="center" label="设备运行状态(0:维修, 1:运行, 2:保养)" width="300"/>
        <el-table-column prop="recordtime" align="center" label="记录时间" width="250"/>
      </el-table>

      <pagination
        v-if="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="handleQuery"
      />
    </el-card>

    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" @close="closeDialog">
      <el-form ref="deviceStatusRef" :model="deviceStatus" :rules="validateRulesUpdate" label-width="140px">
        <el-form-item label="设备地址" prop="devid">
          <el-select
            v-model="deviceStatus.devid"
            filterable
            style="margin-bottom: 5px;"
            placeholder="请选择设备地址">
            <el-option
              v-for="item in deviceList"
              :key="item.devid"
              :label="item.label"
              :value="item.devid">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="设备运行状态" prop="powerstatus">
          <el-select
            v-model="deviceStatus.powerstatus"
            filterable
            style="margin-bottom: 5px;"
            placeholder="0:维修, 1:运行, 2:保养">
            <el-option
              v-for="item in powerStatusList"
              :key="item.powerstatus"
              :label="item.label"
              :value="item.powerstatus">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="closeDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import {reactive, toRefs, onMounted} from "vue";
import {DevAddrQuery, DeviceStatus} from "@/api/business/types";
const state = reactive({
  inputSearch: '',
  latestStatus: true,
  loading: false,
  total: 0,  // 总条数,
  tableDatalist: [{'devid': '1', 'powerstatus': '0', 'recordtime': '1'}],
  dialog: {title: '', visible: false} as DialogType,
  deviceStatus: {} as DeviceStatus,
  queryParams: {pageNum: 1, pageSize: 10} as DevAddrQuery,
  deviceList: [{devid: '1', label: '1 (mpp315)',},
    {devid: '2', label: '2 (mpp250)',},
    {devid: '3', label: '3 (mpp250)',},
    {devid: '4', label: '4 (pe160)',},
    {devid: '5', label: '5 (pe63)',},
    {devid: '6', label: '6 (gxpe63)',},
    {devid: '7', label: '7 (gxpe63)',},],
  powerStatusList:  [{powerstatus: '0', label:'维修'},
    {powerstatus: '1', label:'运行'},
    {powerstatus: '2', label:'保养'}],
  validateRulesUpdate: {//注意 ： prop绑定的变量名要和 v-model绑定的变量名一样
    devid: [{ required: true, message: '请输入设备地址', trigger: 'blur' },],
    powerstatus: [{ required: true, message: '请输入设备运行状态', trigger: 'blur' },],
  }
});

const {
  inputSearch,
  latestStatus,
  queryParams,
  loading,
  total,
  tableDatalist,
  dialog,
  deviceStatus,
  deviceList,
  powerStatusList,
  validateRulesUpdate
} = toRefs(state);

function updateDeviceStatus(){
  dialog.value ={title: '更新设备状态', visible: true};
}

function clickFetchPageList(){

}

function handleSubmit(){

}

function checkChange(){

}

function closeDialog(){
  dialog.value.visible = false;
  loading.value = false;
}

function handleQuery(){

}

onMounted(() => {
  handleQuery();
});
</script>

<style scoped>

</style>
