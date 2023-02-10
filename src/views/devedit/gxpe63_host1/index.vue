<template>
  <div class="app-container">
    <el-form ref="gxpe63host1formRef" :model="gxpe63host1form" :rules="validateRules" label-width="150px">
      <el-form-item label="设备地址" prop="devID">
        <el-input v-model="gxpe63host1form.devID" style="width: 200px" />
      </el-form-item>
      <el-form-item label="主机启动" prop="hStart">
        <el-input v-model="gxpe63host1form.hStart" style="width: 200px" />
      </el-form-item>
      <el-form-item label="牵引启动" prop="trStart">
        <el-input v-model="gxpe63host1form.trStart" style="width: 200px" />
      </el-form-item>
      <el-form-item label="25机启动" prop="m25Start">
        <el-input v-model="gxpe63host1form.m25Start" style="width: 200px"  />
      </el-form-item>
      <el-form-item label="25机转速实测值" prop="m25SpVal">
        <el-input v-model="gxpe63host1form.m25SpVal" style="width: 200px"  />
      </el-form-item>
      <el-form-item label="主机电流实测值" prop="mCurrValue">
        <el-input v-model="gxpe63host1form.mCurrValue" style="width: 200px" />
      </el-form-item>
      <el-form-item label="牵引电流实测值" prop="trCurrValue">
        <el-input v-model="gxpe63host1form.trCurrValue" style="width: 200px" />
      </el-form-item>
      <el-form-item label="压力实测值" prop="pressure">
        <el-input v-model="gxpe63host1form.pressure" style="width: 200px" />
      </el-form-item>
      <el-form-item label="机筒1区温度实测值" prop="dr1Temp">
        <el-input v-model="gxpe63host1form.dr1Temp" style="width: 200px" />
      </el-form-item>
      <el-form-item label="机筒1区温度设定值" prop="dr1TempSet">
        <el-input v-model="gxpe63host1form.dr1TempSet" style="width: 200px" />
      </el-form-item>
      <el-form-item label="机筒2区温度实测值" prop="dr2Temp">
        <el-input v-model="gxpe63host1form.dr2Temp" style="width: 200px" />
      </el-form-item>
      <el-form-item label="机筒2区温度设定值" prop="dr2TempSet">
        <el-input v-model="gxpe63host1form.dr2TempSet" style="width: 200px" />
      </el-form-item>
      <el-form-item label="机筒3区温度实测值" prop="dr3Temp">
        <el-input v-model="gxpe63host1form.dr3Temp" style="width: 200px" />
      </el-form-item>
      <el-form-item label="机筒3区温度设定值" prop="dr3TempSet">
        <el-input v-model="gxpe63host1form.dr3TempSet" style="width: 200px" />
      </el-form-item>
      <el-form-item label="机筒4区温度实测值" prop="dr4Temp">
        <el-input v-model="gxpe63host1form.dr4Temp" style="width: 200px" />
      </el-form-item>
      <el-form-item label="机筒4区温度设定值" prop="dr4TempSet">
        <el-input v-model="gxpe63host1form.dr4TempSet" style="width: 200px" />
      </el-form-item>
      <el-form-item label="机筒5区温度实测值" prop="dr5Temp">
        <el-input v-model="gxpe63host1form.dr5Temp" style="width: 200px" />
      </el-form-item>
      <el-form-item label="机筒5区温度设定值" prop="dr5TempSet">
        <el-input v-model="gxpe63host1form.dr5TempSet" style="width: 200px" />
      </el-form-item>
      <el-form-item label="法兰温度实测值" prop="flangeTemp">
        <el-input v-model="gxpe63host1form.flangeTemp" style="width: 200px" />
      </el-form-item>
      <el-form-item label="法兰温度设定值" prop="flangeTempSet">
        <el-input v-model="gxpe63host1form.flangeTempSet" style="width: 200px" />
      </el-form-item>
      <el-form-item label="模具1温度实测值" prop="mold1Temp">
        <el-input v-model="gxpe63host1form.mold1Temp" style="width: 200px" />
      </el-form-item>
      <el-form-item label="模具1温度设定值" prop="mold1TempSet">
        <el-input v-model="gxpe63host1form.mold1TempSet" style="width: 200px" />
      </el-form-item>
      <el-form-item label="模具2温度实测值" prop="mold2Temp">
        <el-input v-model="gxpe63host1form.mold2Temp" style="width: 200px" />
      </el-form-item>
      <el-form-item label="模具2温度设定值" prop="mold2TempSet">
        <el-input v-model="gxpe63host1form.mold2TempSet" style="width: 200px"  />
      </el-form-item>
      <el-form-item label="模具3温度实测值" prop="mold3Temp">
        <el-input v-model="gxpe63host1form.mold3Temp" style="width: 200px" />
      </el-form-item>
      <el-form-item label="模具3温度设定值" prop="mold3TempSet">
        <el-input v-model="gxpe63host1form.mold3TempSet" style="width: 200px"  />
      </el-form-item>
      <el-form-item label="模具4温度实测值" prop="mold4Temp">
        <el-input v-model="gxpe63host1form.mold4Temp" style="width: 200px" />
      </el-form-item>
      <el-form-item label="模具4温度设定值" prop="mold4TempSet">
        <el-input v-model="gxpe63host1form.mold4TempSet" style="width: 200px" />
      </el-form-item>
      <el-form-item label="模具5温度实测值" prop="mold5Temp">
        <el-input v-model="gxpe63host1form.mold5Temp" style="width: 200px" />
      </el-form-item>
      <el-form-item label="模具5温度设定值" prop="mold5TempSet">
        <el-input v-model="gxpe63host1form.mold5TempSet" style="width: 200px" />
      </el-form-item>
      <el-form-item label="模具6温度实测值" prop="mold6Temp">
        <el-input v-model="gxpe63host1form.mold6Temp" style="width: 200px" />
      </el-form-item>
      <el-form-item label="模具6温度设定值" prop="mold6TempSet">
        <el-input v-model="gxpe63host1form.mold6TempSet" style="width: 200px" />
      </el-form-item>
      <el-form-item label="25机1区温度实测值" prop="m25z1Temp">
        <el-input v-model="gxpe63host1form.m25z1Temp" style="width: 200px" />
      </el-form-item>
      <el-form-item label="25机1区温度设定值" prop="m25z1TempSet">
        <el-input v-model="gxpe63host1form.m25z1TempSet" style="width: 200px" />
      </el-form-item>
      <el-form-item label="25机2区温度实测值" prop="m25z2Temp">
        <el-input v-model="gxpe63host1form.m25z2Temp" style="width: 200px" />
      </el-form-item>
      <el-form-item label="25机2区温度设定值" prop="m25z2TempSet">
        <el-input v-model="gxpe63host1form.m25z2TempSet" style="width: 200px" />
      </el-form-item>
      <el-form-item label="减速箱温度实测值" prop="reduTemp">
        <el-input v-model="gxpe63host1form.reduTemp" style="width: 200px" />
      </el-form-item>
      <el-form-item label="减速箱温度设定值" prop="reduTempSet">
        <el-input v-model="gxpe63host1form.reduTempSet" style="width: 200px" />
      </el-form-item>
      <el-form-item label="熔体温度实测值" prop="meltTemp">
        <el-input v-model="gxpe63host1form.meltTemp" style="width: 200px" />
      </el-form-item>
      <el-form-item label="温度超极限报警" prop="tempLimWarn">
        <el-input v-model="gxpe63host1form.tempLimWarn" style="width: 200px" />
      </el-form-item>
      <el-form-item label="主机冷却风机故障" prop="hCoolFanFail">
        <el-input v-model="gxpe63host1form.hCoolFanFail" style="width: 200px" />
      </el-form-item>
      <el-form-item label="主机调速器故障" prop="hGoverGail">
        <el-input v-model="gxpe63host1form.hGoverGail" style="width: 200px" />
      </el-form-item>
      <el-form-item label="主机电流超极限" prop="hCurLim">
        <el-input v-model="gxpe63host1form.hCurLim" style="width: 200px" />
      </el-form-item>
      <el-form-item label="牵引调速器故障" prop="tractgFail">
        <el-input v-model="gxpe63host1form.tractgFail" style="width: 200px" />
      </el-form-item>
      <el-form-item label="牵引电流超极限" prop="tractCurLim">
        <el-input v-model="gxpe63host1form.tractCurLim" style="width: 200px" />
      </el-form-item>
      <el-form-item label="熔体压力超极限" prop="meltPresLim">
        <el-input v-model="gxpe63host1form.meltPresLim" style="width: 200px" />
      </el-form-item>
      <el-form-item label="主机急停未松开" prop="hStopNotRelease">
        <el-input v-model="gxpe63host1form.hStopNotRelease" style="width: 200px" />
      </el-form-item>
      <el-form-item label="料筒风机报警" prop="barFanWarn">
        <el-input v-model="gxpe63host1form.barFanWarn" style="width: 200px" />
      </el-form-item>
      <el-form-item label="减速箱温度报警" prop="gbTempWarn">
        <el-input v-model="gxpe63host1form.gbTempWarn" style="width: 200px" />
      </el-form-item>
      <el-form-item label="25共挤变频器故障" prop="m25CeFail">
        <el-input v-model="gxpe63host1form.m25CeFail" style="width: 200px" />
      </el-form-item>
      <el-form-item label="主机保养时间到" prop="hMaintainTimeOut">
        <el-input v-model="gxpe63host1form.hMaintainTimeOut" style="width: 200px" />
      </el-form-item>
      <el-form-item label="数据的记录时" prop="recordTime">
        <el-input v-model="gxpe63host1form.recordTime" style="width: 200px" />
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
import {GxPe3Host1From} from "@/api/device/types";

const state = reactive({
  gxpe63host1form: {} as GxPe3Host1From,
  validateRules: reactive({
    //注意 ： prop绑定的变量名要和 v-model绑定的变量名一样
    devID: [{ required: true, message: '请输入设备地址', trigger: 'blur' },],
    hStart: [{ required: true, message: '请输入主机启动', trigger: 'blur' },],
    trStart: [{ required: true, message: '请输入牵引启动', trigger: 'blur' },],
    m25Start: [{ required: true, message: '请输入25机启动', trigger: 'blur' },],
    m25SpVal: [{ required: true, message: '请输入25机转速实测值', trigger: 'blur' },],
    mCurrValue: [{ required: true, message: '请输入主机电流实测值', trigger: 'blur' },],
    trCurrValue: [{ required: true, message: '请输入牵引电流实测值', trigger: 'blur' },],
    pressure: [{ required: true, message: '请输入压力实测值', trigger: 'blur' },],
    dr1Temp: [{ required: true, message: '请输入机筒1区温度实测值', trigger: 'blur' },],
    dr1TempSet: [{ required: true, message: '请输入机筒1区温度设定值', trigger: 'blur' },],
    dr2Temp: [{ required: true, message: '请输入机筒2区温度实测值', trigger: 'blur' },],
    dr2TempSet: [{ required: true, message: '请输入机筒2区温度设定值', trigger: 'blur' },],
    dr3Temp: [{ required: true, message: '请输入机筒3区温度实测值', trigger: 'blur' },],
    dr3TempSet: [{ required: true, message: '请输入机筒3区温度设定值', trigger: 'blur' },],
    dr4Temp: [{ required: true, message: '请输入机筒4区温度实测值', trigger: 'blur' },],
    dr4TempSet: [{ required: true, message: '请输入机筒4区温度设定值', trigger: 'blur' },],
    dr5Temp: [{ required: true, message: '请输入机筒5区温度实测值', trigger: 'blur' },],
    dr5TempSet: [{ required: true, message: '请输入机筒5区温度设定值', trigger: 'blur' },],
    flangeTemp: [{ required: true, message: '请输入法兰温度实测值', trigger: 'blur' },],
    flangeTempSet: [{ required: true, message: '请输入法兰温度设定值', trigger: 'blur' },],
    mold1Temp: [{ required: true, message: '请输入模具1温度实测值', trigger: 'blur' },],
    mold1TempSet: [{ required: true, message: '请输入模具1温度设定值', trigger: 'blur' },],
    mold2Temp: [{ required: true, message: '请输入模具2温度实测值', trigger: 'blur' },],
    mold2TempSet: [{ required: true, message: '请输入模具2温度设定值', trigger: 'blur' },],
    mold3Temp: [{ required: true, message: '请输入模具3温度实测值', trigger: 'blur' },],
    mold3TempSet: [{ required: true, message: '请输入模具3温度设定值', trigger: 'blur' },],
    mold4Temp: [{ required: true, message: '请输入模具4温度实测值', trigger: 'blur' },],
    mold4TempSet: [{ required: true, message: '请输入模具4温度设定值', trigger: 'blur' },],
    mold5Temp: [{ required: true, message: '请输入模具5温度实测值', trigger: 'blur' },],
    mold5TempSet: [{ required: true, message: '请输入模具5温度设定值', trigger: 'blur' },],
    mold6Temp: [{ required: true, message: '请输入模具6温度实测值', trigger: 'blur' },],
    mold6TempSet: [{ required: true, message: '请输入模具6温度设定值', trigger: 'blur' },],
    m25z1Temp: [{ required: true, message: '请输入25机1区温度实测值', trigger: 'blur' },],
    m25z1TempSet: [{ required: true, message: '请输入25机1区温度设定值', trigger: 'blur' },],
    m25z2Temp: [{ required: true, message: '请输入25机2区温度实测值', trigger: 'blur' },],
    m25z2TempSet: [{ required: true, message: '请输入25机2区温度设定值', trigger: 'blur' },],
    reduTemp: [{ required: true, message: '请输入减速箱温度实测值', trigger: 'blur' },],
    reduTempSet: [{ required: true, message: '请输入减速箱温度设定值', trigger: 'blur' },],
    meltTemp: [{ required: true, message: '请输入熔体温度实测值', trigger: 'blur' },],
    tempLimWarn: [{ required: true, message: '请输入温度超极限报警', trigger: 'blur' },],
    hCoolFanFail: [{ required: true, message: '请输入主机冷却风机故障', trigger: 'blur' },],
    hGoverGail: [{ required: true, message: '请输入主机调速器故障', trigger: 'blur' },],
    hCurLim: [{ required: true, message: '请输入主机电流超极限', trigger: 'blur' },],
    tractgFail: [{ required: true, message: '请输入牵引调速器故障', trigger: 'blur' },],
    tractCurLim: [{ required: true, message: '请输入牵引电流超极限', trigger: 'blur' },],
    meltPresLim: [{ required: true, message: '请输入熔体压力超极限', trigger: 'blur' },],
    hStopNotRelease: [{ required: true, message: '请输入主机急停未松开', trigger: 'blur' },],
    barFanWarn: [{ required: true, message: '请输入料筒风机报警', trigger: 'blur' },],
    gbTempWarn: [{ required: true, message: '请输入减速箱温度报警', trigger: 'blur' },],
    m25CeFail: [{ required: true, message: '请输入25共挤变频器故障', trigger: 'blur' },],
    hMaintainTimeOut: [{ required: true, message: '请输入主机保养时间到', trigger: 'blur' },],
    recordTime: [{ required: true, message: '请输入数据的记录时', trigger: 'blur' },],
  })
});

const {
  gxpe63host1form,
  validateRules

} = toRefs(state)

function onSubmit(){
}

function onCancel(){
}
</script>

<style scoped>

</style>
