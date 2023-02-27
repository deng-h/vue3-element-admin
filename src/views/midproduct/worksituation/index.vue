<template>
  <div class="app-container">
    <div class="top-container">
      <el-button style="margin-right: 10px;" type="success" :icon="Plus" @click="addWorksituation" v-hasPerm="['midprodworksituation:add']">
        添加班组
      </el-button>
      <el-input v-model="inputSearch" placeholder="请输入产品型号" style="width: 260px; margin-right: 10px;" />
      <el-button v-hasPerm="['midprodworksituation:list']" :icon="Search" type="primary"   @click="fetchPageList">
        查询
      </el-button>
    </div>

    <el-card style="margin-top: 10px">
      <el-table :data="tableDatalist" v-loading="loading" highlight-current-row border style="font-size: 10px;">
        <el-table-column fixed prop="id" align="center" label="ID" width="80"/>
        <el-table-column fixed prop="deviceId" align="center" label="设备地址" width="80"/>
        <el-table-column prop="monitor" align="center" label="班组负责人" width="100"/>
        <el-table-column prop="startTime" align="center" label="班次生产开始时间" width="180"/>
        <el-table-column prop="endTime" align="center" label="班次生产结束时间" width="180"/>
        <el-table-column prop="model" align="center" label="具体型号" width="100"/>
        <el-table-column prop="name" align="center" label="型号名称" width="100"/>
        <el-table-column prop="cname" align="center" label="所属分组" width="100"/>
        <el-table-column prop="orderStartTime" align="center" label="本班次生产该型号开始时间" width="180"/>
        <el-table-column prop="orderEndTime" align="center" label="本班次生产该型号结束时间" width="180"/>
        <el-table-column prop="unqualifiedQuantity" align="center" label="废品数" width="120"/>
        <el-table-column prop="qualifiedQuantity" align="center" label="合格数" width="120"/>
        <el-table-column prop="gmtCreate" align="center" label="创建时间" width="180"/>
        <el-table-column prop="gmtModified" align="center" label="更新时间" width="180"/>
        <el-table-column v-hasPerm="['midprodworksituation:edit', 'midprodworksituation:delete']" fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button v-hasPerm="['midprodworksituation:edit']" type="primary" link @click="handleUpdate(scope.row)">
              编辑
            </el-button>

            <el-popconfirm
              confirm-button-text="Yes"
              cancel-button-text="No"
              icon-color="red"
              title="此操作将永久删除该记录, 是否继续?"
              width="180"
              @confirm="handleDelete(scope.row)">
              <template #reference>
                <el-button v-hasPerm="['midprodworksituation:delete']" type="danger" link>
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="dialog.title" v-model="dialog.visible" width="600px" @close="closeDialog">
      <el-form ref="worksituationRef" :model="workSituation" :rules="validateRules" label-width="200px">
        <el-form-item label="设备地址" prop="deviceId">
          <el-select
            v-model="workSituation.deviceId"
            filterable
            style="margin-bottom: 5px;"
            placeholder="请选择设备地址">
            <el-option v-for="item in deviceList" :key="item.devid" :label="item.devid" :value="item.devid"/>
          </el-select>
        </el-form-item>

        <el-form-item label="班组负责人" prop="monitor" >
          <el-input v-model="workSituation.monitor" style="width: 220px"/>
        </el-form-item>

        <!-- 注意只选择日期，所有type为date -->
        <el-form-item label="班次起始日期"  prop="startTime" >
          <el-date-picker
            v-model="nowDateStr"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            placeholder="选择日期时间"/>
        </el-form-item>

        <el-form-item v-if="nowDateStr.length > 0" label="早晚班" prop="startTime" >
          <el-select
            v-model="shiftTime"
            value-key="start"
            filterable
            style="margin-bottom: 5px;"
            placeholder="请选择早晚班">
            <el-option
              v-for="item in shiftList"
              :key="item.key"
              :label="item.name"
              :value="item.value"/>
          </el-select>
        </el-form-item>

        <el-form-item label="型号" prop="totalModel">
          <el-input
            :disabled="modelInputDisabled"
            placeholder="请准确填写型号"
            @change="totalModelCheckSearch"
            v-model="totalModel"
            style="width: 220px"
          />
        </el-form-item>

        <el-form-item label="型号校验">
          <el-input v-model="modelcheckcontent" style="width: 300px" disabled placeholder="型号输入完后，鼠标切换到库存数等待提示" />
        </el-form-item>

        <el-form-item label="班次生产该订单开始时间"  prop="orderStartTime" >
          <el-date-picker
            @change="orderStartTimeChange"
            v-model="workSituation.orderStartTime"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择日期时间"
          />
        </el-form-item>

        <el-form-item label="班次生产该订单结束时间"  prop="orderEndTime" >
          <el-date-picker
            @change="orderEndTimeChange"
            v-model="workSituation.orderEndTime"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择日期时间"
          />
        </el-form-item>

        <el-form-item label="合格数(米)" prop="qualifiedQuantity">
          <el-input  v-model="workSituation.qualifiedQuantity"  style="width: 300px" :disabled="oneLength === -1 || oneWeight === -1"/>
        </el-form-item>

        <el-form-item label="废品数(千克)" prop="unqualifiedQuantity">
          <el-input v-model="workSituation.unqualifiedQuantity" style="width: 300px" :disabled="oneLength === -1 || oneWeight === -1"/>
        </el-form-item>

        <el-form-item label="班次实际生产数(米)"  prop="shiftProQuantity" >
          <el-input placeholder="填写 合格数(米) 和 废品数(千克) 自动计算" style="width: 300px" v-model="workSituation.shiftProQuantity" :disabled="oneLength === -1 || oneWeight == -1"/>
        </el-form-item>

        <el-form-item label="班次产量(吨)"  prop="shiftOutput" >
          <el-input placeholder="选择订单起始结束时间后，由系统自动导出" style="width: 300px" v-model="workSituation.shiftOutput" :disabled="true"/>
        </el-form-item>

        <el-form-item label="能耗(千瓦时)"  prop="enConsumption" >
          <el-input placeholder="选择订单起始结束时间后，由系统自动导出" style="width: 300px" v-model="workSituation.enConsumption" :disabled="true"/>
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
import {Plus, Search} from "@element-plus/icons-vue";
import {WorkSituation} from "@/api/midproduct/types";

const state = reactive({
  inputSearch: '',
  ids: [] as number[],  // 选中的ID
  loading: false,
  tableDatalist: [{'id':'1', 'deviceId': '3', 'monitor': 'xxx'}] as WorkSituation[],
  workSituation: {} as WorkSituation,
  nowDateStr: '',
  dialog: {title: '', visible: false} as DialogType,
  validateRules: reactive({//注意 ： prop绑定的变量名要和 v-model绑定的变量名一样
    deviceId: [{ required: true, message: '请输入设备地址', trigger: 'blur' },],
    monitor: [{ required: true, message: '请输入班组负责人', trigger: 'blur' },],
    startTime: [{ min: 19,  message: '请输入班组日期', trigger: 'blur' }],
    model: [{ required: true, message: '请输入订单编号', trigger: 'blur' },],
    orderStartTime: [{ required: true, message: '请输入订单起始时间', trigger: 'blur' },],
    orderEndTime: [{ required: true, message: '请输入订单结束时间', trigger: 'blur' },],
    unqualifiedQuantity: [{ required: true, message: '请输入废品数', trigger: 'blur' },],
    qualifiedQuantity: [{ required: true, message: '请输入合格数', trigger: 'blur' },],}),
  deviceList: [{devid: '1'},{devid: '2'},{devid: '3'},{devid: '4'},{devid: '5'},{devid: '6'},{devid: '7'},{devid: '8'},
    {devid: '9'},{devid: '10'},{devid: '11'},{devid: '12'},{devid: '13'},{devid: '14'},{devid: '15'},{devid: '16'}],
  shiftList: [
    {key: 0, name: '早班', value: {start:"08:00:01", end:"20:00:00",}},
    {key: 1, name: '晚班', value: {start: "20:00:01", end:"08:00:00",}}],

});

const {
  inputSearch,
  loading,
  tableDatalist,
  dialog,
  workSituation,
  validateRules,
  deviceList,
  shiftList,
  nowDateStr
} = toRefs(state);

function orderStartTimeChange(){

}

function totalModelCheckSearch(){

}

function orderEndTimeChange(){

}

function addWorksituation(){
  dialog.value ={title: '添加班组', visible: true};
}

function handleUpdate(row: any){
  dialog.value = {title: '编辑', visible: true};
  const row_id = row.id || state.ids;
  const selectedData = state.tableDatalist.find((item) => {
    if(item.id === row_id){
      return item;
    }
  });
  state.workSituation.id = row_id;
  if(selectedData !== undefined){
    state.workSituation = selectedData;
  }
}

function closeDialog(){
  dialog.value.visible = false;
  loading.value = false;
}

function handleSubmit(){

}

function handleDelete(row: any){

}

function fetchPageList(){

}
</script>

<style scoped>

</style>
