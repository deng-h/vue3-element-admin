<template>
  <div class="app-container">
    <div class="top-container">
      <el-button style="margin-right: 10px;" type="success" @click="addWorkSituation" v-hasPerm="['worksituation:add']">
        添加班组
      </el-button>
      <el-input v-model="inputSearch" placeholder="请输入订单编号" style="width: 260px; margin-right: 10px;" />
      <el-button v-hasPerm="['worksituation:list']" type="primary" @click="fetchPageList">
        查询
      </el-button>
    </div>
    <el-card style="margin-top: 10px">
      <el-table :data="workSituationList" v-loading="loading" highlight-current-row border style="font-size: 10px;">
        <el-table-column fixed prop="id" label="ID" width="80"/>
        <el-table-column fixed prop="devid" label="设备地址" width="80"/>
        <el-table-column prop="monitor" label="班组负责人" width="100"/>
        <el-table-column prop="startTime" label="班次生产开始时间" width="180"/>
        <el-table-column prop="endTime" label="班次生产结束时间" width="180"/>
        <el-table-column prop="orderNum" label="订单编号" width="120"/>
        <el-table-column prop="orderStartTime" label="班次生产该订单开始时间" width="180"/>
        <el-table-column prop="orderEndTime" label="班次生产该订单结束时间" width="180"/>
        <el-table-column prop="unqualifiedQuantity" label="废品数(千克)" width="120"/>
        <el-table-column prop="shiftProQuantity" label="班次实际生产数(米)" width="150"/>
        <el-table-column prop="qualifiedQuantity" label="合格数(米)" width="120"/>
        <el-table-column prop="shiftOutput" label="班次产量(吨)" width="120"/>
        <el-table-column prop="enConsumption" label="能耗(千瓦时)" width="120"/>
        <el-table-column prop="gmtCreate" label="创建时间" width="180"/>
        <el-table-column prop="gmtModified" label="更新时间" width="180"/>

        <el-table-column v-hasPerm="['worksituation:delete', 'worksituation:edit']" fixed="right" label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" link v-hasPerm="['worksituation:edit']" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-popconfirm
              confirm-button-text="Yes"
              cancel-button-text="No"
              icon-color="red"
              width="180"
              title="此操作将永久删除该记录, 是否继续?"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button type="danger" link v-hasPerm="['worksituation:delete']">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="dialog.title" v-model="dialog.visible" width="600px" @close="closeDialog">
      <el-form ref="workSituationRef" :model="workSituation" :rules="validateRules" label-width="200px">

        <el-form-item label="设备地址" prop="devid">
          <el-select
            @change="getOrderNum"
            v-model="workSituation.devid"
            filterable
            style="margin-bottom: 5px;"
            placeholder="请选择设备地址">
            <el-option v-for="item in deviceList" :key="item.devid" :value="item.devid"/>
          </el-select>
        </el-form-item>

        <el-form-item label="班组负责人"  prop="monitor" >
          <el-input v-model="workSituation.monitor" />
        </el-form-item>

        <el-form-item label="班次起始日期"  prop="startTime" >
          <el-date-picker
            v-model="nowDateStr"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            placeholder="选择日期时间"
          />
        </el-form-item>

        <el-form-item v-if="nowDateStr.length > 0" label="早晚班" prop="startTime" >
          <el-select
            v-model="shiftTime"
            value-key="start"
            filterable
            style="margin-bottom: 5px;"
            placeholder="请选择早晚班">
            <el-option v-for="item in shiftList" :key="item.key" :label="item.name" :value="item.value"/>
          </el-select>
        </el-form-item>

        <el-form-item label="订单编号" prop="orderNum" >
          <el-select
            @change="getLenAndWeight"
            v-model="workSituation.orderNum"
            value-key="start"
            filterable
            style="margin-bottom: 5px;"
            placeholder="请选择订单编号">
            <el-option v-for="item in orderNumList" :key="item" :label="item" :value="item"/>
          </el-select>
          <el-checkbox style="margin-left: 20px;" @change="getOrderNum" v-model="finished" label="显示最近已完成的订单编号"></el-checkbox>
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
          <el-input  v-model="workSituation.qualifiedQuantity"  :disabled="oneLength === -1 || oneWeight === -1"/>
        </el-form-item>

        <el-form-item label="废品数(千克)" prop="unqualifiedQuantity">
          <el-input v-model="workSituation.unqualifiedQuantity" :disabled="oneLength === -1 || oneWeight === -1"/>
        </el-form-item>

        <el-form-item label="班次实际生产数(米)"  prop="shiftProQuantity" >
          <el-input placeholder="填写 合格数(米) 和 废品数(千克) 自动计算"  v-model="workSituation.shiftProQuantity" :disabled="oneLength === -1 || oneWeight === -1"/>
        </el-form-item>

        <el-form-item label="班次产量(吨)"  prop="shiftOutput" >
          <el-input placeholder="选择订单起始结束时间后，由系统自动导出" v-model="workSituation.shiftOutput" :disabled="true"/>
        </el-form-item>

        <el-form-item label="能耗(千瓦时)"  prop="enConsumption" >
          <el-input placeholder="选择订单起始结束时间后，由系统自动导出" v-model="workSituation.enConsumption" :disabled="true"/>
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
import {WorkSituation} from "@/api/business/types";

const state = reactive({
  loading: false,
  workSituationList: [{'devid': '1'}] as WorkSituation[],
  dialog: {title: '', visible: false} as DialogType,
  workSituation: {} as WorkSituation,
  nowDateStr: '',
  shiftTime: {start: "", end:"",},
  oneLength: -1, // 支长
  oneWeight: -1, // 根重
  orderNumList: [],
  deviceList: [{devid: '1', label: '1 (mpp315)',},
    {devid: '2', label: '2 (mpp250)',},
    {devid: '3', label: '3 (mpp250)',},
    {devid: '4', label: '4 (pe160)',},
    {devid: '5', label: '5 (pe63)',},
    {devid: '6', label: '6 (gxpe63)',},
    {devid: '7', label: '7 (gxpe63)',},],
  shiftList: [{key: 0, name: '早班', value: {start:"08:00:01", end:"20:00:00",}},
    {key: 1, name: '晚班', value: {start: "20:00:01", end:"08:00:00",}}],
  validateRules: {//注意 ： prop绑定的变量名要和 v-model绑定的变量名一样
    devid: [{ required: true, message: '请输入设备地址', trigger: 'blur' },],
    monitor: [{ required: true, message: '请输入班组负责人', trigger: 'blur' },],
    startTime: [{ min: 19,  message: '请输入班组日期', trigger: 'blur' }],
    orderNum: [{ required: true, message: '请输入订单编号', trigger: 'blur' },],
    orderStartTime: [{ required: true, message: '请输入订单起始时间', trigger: 'blur' },],
    orderEndTime: [{ required: true, message: '请输入订单结束时间', trigger: 'blur' },],
    unqualifiedQuantity: [{ required: true, message: '请输入废品数', trigger: 'blur' },],
    shiftProQuantity: [{ required: true, message: '请输入实际生产数', trigger: 'blur' },],
    qualifiedQuantity: [{ required: true, message: '请输入合格数', trigger: 'blur' },],
    shiftOutput: [{ required: true, message: '请输入班次产量', trigger: 'blur' },],
    enConsumption: [{ required: true, message: '请输入能耗', trigger: 'blur' },],},

});

const {
  workSituationList,
  loading,
  dialog,
  nowDateStr,
  oneLength,
  oneWeight,
  orderNumList,
  workSituation,
  deviceList,
  shiftList,
  shiftTime,
  validateRules,
} = toRefs(state);
function handleUpdate(row: any) {

}

function handleDelete(row: any){

}

function orderEndTimeChange(){

}
function addWorkSituation(){
  dialog.value ={title: '添加班组', visible: true};
}

function fetchPageList(){

}

function getLenAndWeight(){

}

function getOrderNum(){

}

function handleSubmit(){

}

function orderStartTimeChange(){

}

function closeDialog(){
  dialog.value.visible = false;
  loading.value = false;
}

onMounted(() => {

});
</script>

<style scoped>

</style>
