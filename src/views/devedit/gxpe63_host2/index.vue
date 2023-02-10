<template>
  <div class="app-container">
    <el-form ref="gxpe63host2formRef" :model="gxpe63host2form" :rules="validateRules" label-width="150px">
      <el-form-item label="设备地址" prop="devID">
        <el-input v-model="gxpe63host2form.devID" />
      </el-form-item>
      <el-form-item label="主机启动" prop="hStart">
        <el-input v-model="gxpe63host2form.hStart" />
      </el-form-item>
      <el-form-item label="主机电流实测值" prop="mCurrVal">
        <el-input v-model="gxpe63host2form.mCurrVal" />
      </el-form-item>
      <el-form-item label="压力实测值" prop="pressure">
        <el-input v-model="gxpe63host2form.pressure" />
      </el-form-item>
      <el-form-item label="机筒1区温度实测值" prop="dr1Temp">
        <el-input v-model="gxpe63host2form.dr1Temp" />
      </el-form-item>
      <el-form-item label="机筒1区温度设定值" prop="dr1TempSet">
        <el-input v-model="gxpe63host2form.dr1TempSet" />
      </el-form-item>
      <el-form-item label="机筒2区温度实测值" prop="dr2Temp">
        <el-input v-model="gxpe63host2form.dr2Temp" />
      </el-form-item>
      <el-form-item label="机筒2区温度设定值" prop="dr2TempSet">
        <el-input v-model="gxpe63host2form.dr2TempSet" />
      </el-form-item>
      <el-form-item label="机筒3区温度实测值" prop="dr3Temp">
        <el-input v-model="gxpe63host2form.dr3Temp" />
      </el-form-item>
      <el-form-item label="机筒3区温度设定值" prop="dr3TempSet">
        <el-input v-model="gxpe63host2form.dr3TempSet" />
      </el-form-item>
      <el-form-item label="机筒4区温度实测值" prop="dr4Temp">
        <el-input v-model="gxpe63host2form.dr4Temp" />
      </el-form-item>
      <el-form-item label="机筒4区温度设定值" prop="dr4TempSet">
        <el-input v-model="gxpe63host2form.dr4TempSet" />
      </el-form-item>
      <el-form-item label="法兰温度实测值" prop="flangeTemp">
        <el-input v-model="gxpe63host2form.flangeTemp" />
      </el-form-item>
      <el-form-item label="法兰温度设定值" prop="flangeTempSet">
        <el-input v-model="gxpe63host2form.flangeTempSet" />
      </el-form-item>
      <el-form-item label="模具1温度实测值" prop="mold1Temp">
        <el-input v-model="gxpe63host2form.mold1Temp" />
      </el-form-item>
      <el-form-item label="模具1温度设定值" prop="mold1TmpSet">
        <el-input v-model="gxpe63host2form.mold1TmpSet" />
      </el-form-item>
      <el-form-item label="模具2温度实测值" prop="mold2Temp">
        <el-input v-model="gxpe63host2form.mold2Temp" />
      </el-form-item>
      <el-form-item label="模具2温度设定值" prop="mold2TempSet">
        <el-input v-model="gxpe63host2form.mold2TempSet" />
      </el-form-item>
      <el-form-item label="模具3温度实测值" prop="mold3Temp">
        <el-input v-model="gxpe63host2form.mold3Temp" />
      </el-form-item>
      <el-form-item label="模具3温度设定值" prop="mold3TempSet">
        <el-input v-model="gxpe63host2form.mold3TempSet" />
      </el-form-item>
      <el-form-item label="模具4温度实测值" prop="mold4Temp">
        <el-input v-model="gxpe63host2form.mold4Temp" />
      </el-form-item>
      <el-form-item label="模具4温度设定值" prop="mold4TempSet">
        <el-input v-model="gxpe63host2form.mold4TempSet" />
      </el-form-item>
      <el-form-item label="减速箱温度实测值" prop="reduTemp">
        <el-input v-model="gxpe63host2form.reduTemp" />
      </el-form-item>
      <el-form-item label="减速箱温度设定值" prop="reduTempSet">
        <el-input v-model="gxpe63host2form.reduTempSet" />
      </el-form-item>
      <el-form-item label="熔体温度实测值" prop="meltTemp">
        <el-input v-model="gxpe63host2form.meltTemp" />
      </el-form-item>
      <el-form-item label="温度超极限报警" prop="tempLimWarn">
        <el-input v-model="gxpe63host2form.tempLimWarn" />
      </el-form-item>
      <el-form-item label="主机冷却风机故障" prop="hCoolFanFail">
        <el-input v-model="gxpe63host2form.hCoolFanFail" />
      </el-form-item>
      <el-form-item label="主机调速器故障" prop="hGoverFail">
        <el-input v-model="gxpe63host2form.hGoverFail" />
      </el-form-item>
      <el-form-item label="主机电流超极限" prop="hCurLim">
        <el-input v-model="gxpe63host2form.hCurLim" />
      </el-form-item>
      <el-form-item label="熔体压力超极限" prop="meltPreLim">
        <el-input v-model="gxpe63host2form.meltPreLim" />
      </el-form-item>
      <el-form-item label="主机急停未松开" prop="hStopNotRelease">
        <el-input v-model="gxpe63host2form.hStopNotRelease" />
      </el-form-item>
      <el-form-item label="料筒风机报警" prop="barFanWarn">
        <el-input v-model="gxpe63host2form.barFanWarn" />
      </el-form-item>
      <el-form-item label="减速箱温度报警" prop="gbTempWarn">
        <el-input v-model="gxpe63host2form.gbTempWarn" />
      </el-form-item>
      <el-form-item label="主机保养时间到" prop="hMaintainTimeOut">
        <el-input v-model="gxpe63host2form.hMaintainTimeOut" />
      </el-form-item>
      <el-form-item label="数据的记录时" prop="recordTime">
        <el-input v-model="gxpe63host2form.recordTime" />
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
import {GxPe3Host2From} from "@/api/device/types";

const state = reactive({
  gxpe63host2form: {} as GxPe3Host2From,
  validateRules: reactive({
    //注意 ： prop绑定的变量名要和 v-model绑定的变量名一样
    devID: [{ required: true, message: '请输入设备地址', trigger: 'blur' },],
    hStart: [{ required: true, message: '请输入主机启动', trigger: 'blur' },],
    mCurrVal: [{ required: true, message: '请输入主机电流实测值', trigger: 'blur' },],
    pressure: [{ required: true, message: '请输入压力实测值', trigger: 'blur' },],
    dr1Temp: [{ required: true, message: '请输入机筒1区温度实测值', trigger: 'blur' },],
    dr1TempSet: [{ required: true, message: '请输入机筒1区温度设定值', trigger: 'blur' },],
    dr2Temp: [{ required: true, message: '请输入机筒2区温度实测值', trigger: 'blur' },],
    dr2TempSet: [{ required: true, message: '请输入机筒2区温度设定值', trigger: 'blur' },],
    dr3Temp: [{ required: true, message: '请输入机筒3区温度实测值', trigger: 'blur' },],
    dr3TempSet: [{ required: true, message: '请输入机筒3区温度设定值', trigger: 'blur' },],
    dr4Temp: [{ required: true, message: '请输入机筒4区温度实测值', trigger: 'blur' },],
    dr4TempSet: [{ required: true, message: '请输入机筒4区温度设定值', trigger: 'blur' },],
    flangeTemp: [{ required: true, message: '请输入法兰温度实测值', trigger: 'blur' },],
    flangeTempSet: [{ required: true, message: '请输入法兰温度设定值', trigger: 'blur' },],
    mold1Temp: [{ required: true, message: '请输入模具1温度实测值', trigger: 'blur' },],
    mold1TmpSet: [{ required: true, message: '请输入模具1温度设定值', trigger: 'blur' },],
    mold2Temp: [{ required: true, message: '请输入模具2温度实测值', trigger: 'blur' },],
    mold2TempSet: [{ required: true, message: '请输入模具2温度设定值', trigger: 'blur' },],
    mold3Temp: [{ required: true, message: '请输入模具3温度实测值', trigger: 'blur' },],
    mold3TempSet: [{ required: true, message: '请输入模具3温度设定值', trigger: 'blur' },],
    mold4Temp: [{ required: true, message: '请输入模具4温度实测值', trigger: 'blur' },],
    mold4TempSet: [{ required: true, message: '请输入模具4温度设定值', trigger: 'blur' },],
    reduTemp: [{ required: true, message: '请输入减速箱温度实测值', trigger: 'blur' },],
    reduTempSet: [{ required: true, message: '请输入减速箱温度设定值', trigger: 'blur' },],
    meltTemp: [{ required: true, message: '请输入熔体温度实测值', trigger: 'blur' },],
    tempLimWarn: [{ required: true, message: '请输入温度超极限报警', trigger: 'blur' },],
    hCoolFanFail: [{ required: true, message: '请输入主机冷却风机故障', trigger: 'blur' },],
    hGoverFail: [{ required: true, message: '请输入主机调速器故障', trigger: 'blur' },],
    hCurLim: [{ required: true, message: '请输入主机电流超极限', trigger: 'blur' },],
    meltPreLim: [{ required: true, message: '请输入熔体压力超极限', trigger: 'blur' },],
    hStopNotRelease: [{ required: true, message: '请输入主机急停未松开', trigger: 'blur' },],
    barFanWarn: [{ required: true, message: '请输入料筒风机报警', trigger: 'blur' },],
    gbTempWarn: [{ required: true, message: '请输入减速箱温度报警', trigger: 'blur' },],
    hMaintainTimeOut: [{ required: true, message: '请输入主机保养时间到', trigger: 'blur' },],
    recordTime: [{ required: true, message: '请输入数据的记录时', trigger: 'blur' },],
  })
});

const {
  gxpe63host2form,
  validateRules,

} = toRefs(state)

function onSubmit(){
}

function onCancel(){
}

</script>

<style scoped>

</style>
