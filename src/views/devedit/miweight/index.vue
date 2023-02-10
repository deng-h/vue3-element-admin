<template>
  <div class="app-container">
    <el-form ref="miweightformRef" :model="miweightform" :rules="validateRules" label-width="150px">
      <el-form-item label="设备地址" prop="devID">
        <el-input v-model="miweightform.devID" />
      </el-form-item>
      <el-form-item label="主机转速设定值" prop="mSpSet">
        <el-input v-model="miweightform.mSpSet" />
      </el-form-item>
      <el-form-item label="主机转速实测值" prop="mSpVal">
        <el-input v-model="miweightform.mSpVal" />
      </el-form-item>
      <el-form-item label="牵引转速设定值" prop="trSpSet">
        <el-input v-model="miweightform.trSpSet" />
      </el-form-item>
      <el-form-item label="牵引转速实测值" prop="trSpVal">
        <el-input v-model="miweightform.trSpVal" />
      </el-form-item>
      <el-form-item label="米重实测值" prop="mdVal">
        <el-input v-model="miweightform.mdVal" />
      </el-form-item>
      <el-form-item label="米重设定值" prop="mdSet">
        <el-input v-model="miweightform.mdSet" />
      </el-form-item>
      <el-form-item label="挤出量实测值" prop="extrVal">
        <el-input v-model="miweightform.extrVal" />
      </el-form-item>
      <el-form-item label="挤出量设定值" prop="extrSet">
        <el-input v-model="miweightform.extrSet" />
      </el-form-item>
      <el-form-item label="色母机转速" prop="SpdColmh">
        <el-input v-model="miweightform.SpdColmh" />
      </el-form-item>
      <el-form-item label="总电量" prop="totalElectri">
        <el-input v-model="miweightform.totalElectri" />
      </el-form-item>
      <el-form-item label="总产量" prop="totalOutput">
        <el-input v-model="miweightform.totalOutput" />
      </el-form-item>
      <el-form-item label="计时产量" prop="timeOutput">
        <el-input v-model="miweightform.timeOutput" />
      </el-form-item>
      <el-form-item label="计时电量" prop="timePower">
        <el-input v-model="miweightform.timePower" />
      </el-form-item>
      <el-form-item label="总平均能耗" prop="avengCon">
        <el-input v-model="miweightform.avengCon" />
      </el-form-item>
      <el-form-item label="计时平均能耗" prop="avengConph">
        <el-input v-model="miweightform.avengConph" />
      </el-form-item>
      <el-form-item label="主机料斗料位过低" prop="matlWarn">
        <el-input v-model="miweightform.matlWarn" />
      </el-form-item>
      <el-form-item label="主机转速超98%警告" prop="speedWarn">
        <el-input v-model="miweightform.speedWarn" />
      </el-form-item>
      <el-form-item label="主机米重超主机负荷" prop="weightWarn">
        <el-input v-model="miweightform.weightWarn" />
      </el-form-item>
      <el-form-item label="主机料斗料位过高" prop="matlWarn">
        <el-input v-model="miweightform.matlWarn" />
      </el-form-item>
      <el-form-item label="牵引速度丢失" prop="trSpLossWarn">
        <el-input v-model="miweightform.trSpLossWarn" />
      </el-form-item>
      <el-form-item label="主机转速丢失" prop="maSpLossWarn">
        <el-input v-model="miweightform.maSpLossWarn" />
      </el-form-item>
      <el-form-item label="主机色母料缺料" prop="comtshWarn">
        <el-input v-model="miweightform.comtshWarn" />
      </el-form-item>
      <el-form-item label="数据的记录时" prop="recordTime">
        <el-input v-model="miweightform.recordTime" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {reactive, toRefs} from "vue";
import {MiWeightForm} from "@/api/device/types";

const state = reactive({
  miweightform: {} as MiWeightForm,
  validateRules: reactive({
    //注意 ： prop绑定的变量名要和 v-model绑定的变量名一样
    devID: [{ required: true, message: '请输入设备地址', trigger: 'blur' },],
    mSpSet: [{ required: true, message: '请输入主机转速设定值', trigger: 'blur' },],
    mSpVal: [{ required: true, message: '请输入主机转速实测值', trigger: 'blur' },],
    trSpSet: [{ required: true, message: '请输入牵引转速设定值', trigger: 'blur' },],
    trSpVal: [{ required: true, message: '请输入牵引转速实测值', trigger: 'blur' },],
    mdVal: [{ required: true, message: '请输入米重实测值', trigger: 'blur' },],
    mdSet: [{ required: true, message: '请输入米重设定值', trigger: 'blur' },],
    extrVal: [{ required: true, message: '请输入挤出量实测值', trigger: 'blur' },],
    extrSet: [{ required: true, message: '请输入挤出量设定值', trigger: 'blur' },],
    SpdColmh: [{ required: true, message: '请输入色母机转速', trigger: 'blur' },],
    totalElectri: [{ required: true, message: '请输入总电量', trigger: 'blur' },],
    totalOutput: [{ required: true, message: '请输入总产量', trigger: 'blur' },],
    timeOutput: [{ required: true, message: '请输入计时产量', trigger: 'blur' },],
    timePower: [{ required: true, message: '请输入计时电量', trigger: 'blur' },],
    avengCon: [{ required: true, message: '请输入总平均能耗', trigger: 'blur' },],
    avengConph: [{ required: true, message: '请输入计时平均能耗', trigger: 'blur' },],
    matLevlWarn: [{ required: true, message: '请输入主机料斗料位过低', trigger: 'blur' },],
    speedWarn: [{ required: true, message: '请输入主机转速超98%警告', trigger: 'blur' },],
    weightWarn: [{ required: true, message: '请输入主机米重超主机负荷', trigger: 'blur' },],
    matlWarn: [{ required: true, message: '请输入主机料斗料位过高', trigger: 'blur' },],
    trSpLossWarn: [{ required: true, message: '请输入牵引速度丢失', trigger: 'blur' },],
    maSpLossWarn: [{ required: true, message: '请输入主机转速丢失', trigger: 'blur' },],
    comtshWarn: [{ required: true, message: '请输入主机色母料缺料', trigger: 'blur' },],
    recordTime: [{ required: true, message: '请输入数据的记录时', trigger: 'blur' },],})
});

const {
  miweightform,
  validateRules
} = toRefs(state)

function onSubmit(){
}

function onCancel(){
}

</script>

<style scoped>

</style>
