<template>
  <div class="app-container">
    <el-form ref="pe63formRef" :model="pe63form" :rules="validateRules" label-width="150px">
      <el-form-item label="设备地址" prop="devid">
        <el-input v-model="pe63form.devid" />
      </el-form-item>
      <el-form-item label="主机启动" prop="hstart">
        <el-input v-model="pe63form.hstart" />
      </el-form-item>
      <el-form-item label="牵引启动" prop="trstart">
        <el-input v-model="pe63form.trstart" />
      </el-form-item>
      <el-form-item label="主机电流实测值" prop="mcurrvalue">
        <el-input v-model="pe63form.mcurrvalue" />
      </el-form-item>
      <el-form-item label="牵引电流实测值" prop="trcurrvalue">
        <el-input v-model="pe63form.trcurrvalue" />
      </el-form-item>
      <el-form-item label="压力实测值" prop="pressure">
        <el-input v-model="pe63form.pressure" />
      </el-form-item>
      <el-form-item label="机筒1区温度实测值" prop="dr1temp">
        <el-input v-model="pe63form.dr1temp" />
      </el-form-item>
      <el-form-item label="机筒1区温度设定值" prop="dr1temset">
        <el-input v-model="pe63form.dr1temset" />
      </el-form-item>
      <el-form-item label="机筒2区温度实测值" prop="dr2temp">
        <el-input v-model="pe63form.dr2temp" />
      </el-form-item>
      <el-form-item label="机筒2区温度设定值" prop="dr2temset">
        <el-input v-model="pe63form.dr2temset" />
      </el-form-item>
      <el-form-item label="机筒3区温度实测值" prop="dr3temp">
        <el-input v-model="pe63form.dr3temp" />
      </el-form-item>
      <el-form-item label="机筒3区温度设定值" prop="dr3temset">
        <el-input v-model="pe63form.dr3temset" />
      </el-form-item>
      <el-form-item label="机筒4区温度实测值" prop="dr4temp">
        <el-input v-model="pe63form.dr4temp" />
      </el-form-item>
      <el-form-item label="机筒4区温度设定值" prop="dr4temset">
        <el-input v-model="pe63form.dr4temset" />
      </el-form-item>
      <el-form-item label="机筒5区温度实测值" prop="dr5temp">
        <el-input v-model="pe63form.dr5temp" />
      </el-form-item>
      <el-form-item label="机筒5区温度设定值" prop="dr5temset">
        <el-input v-model="pe63form.dr5temset" />
      </el-form-item>
      <el-form-item label="法兰温度实测值" prop="flangetemp">
        <el-input v-model="pe63form.flangetemp" />
      </el-form-item>
      <el-form-item label="法兰温度设定值" prop="flangetmset">
        <el-input v-model="pe63form.flangetmset" />
      </el-form-item>
      <el-form-item label="模具1温度实测值" prop="mold1temp">
        <el-input v-model="pe63form.mold1temp" />
      </el-form-item>
      <el-form-item label="模具1温度设定值" prop="mold1tmset">
        <el-input v-model="pe63form.mold1tmset" />
      </el-form-item>
      <el-form-item label="模具2温度实测值" prop="mold2temp">
        <el-input v-model="pe63form.mold2temp" />
      </el-form-item>
      <el-form-item label="模具2温度设定值" prop="mold2tmset">
        <el-input v-model="pe63form.mold2tmset" />
      </el-form-item>
      <el-form-item label="模具3温度实测值" prop="mold3temp">
        <el-input v-model="pe63form.mold3temp" />
      </el-form-item>
      <el-form-item label="模具3温度设定值" prop="mold3tmset">
        <el-input v-model="pe63form.mold3tmset" />
      </el-form-item>
      <el-form-item label="模具4温度实测值" prop="mold4temp">
        <el-input v-model="pe63form.mold4temp" />
      </el-form-item>
      <el-form-item label="模具4温度设定值" prop="mold4tmset">
        <el-input v-model="pe63form.mold4tmset" />
      </el-form-item>
      <el-form-item label="模具5温度实测值" prop="mold5temp">
        <el-input v-model="pe63form.mold5temp" />
      </el-form-item>
      <el-form-item label="模具5温度设定值" prop="mold5tmset">
        <el-input v-model="pe63form.mold5tmset" />
      </el-form-item>
      <el-form-item label="模具6温度实测值" prop="mold6temp">
        <el-input v-model="pe63form.mold6temp" />
      </el-form-item>
      <el-form-item label="模具6温度设定值" prop="mold6tmset">
        <el-input v-model="pe63form.mold6tmset" />
      </el-form-item>
      <el-form-item label="减速箱温度实测值" prop="redutemp">
        <el-input v-model="pe63form.redutemp" />
      </el-form-item>
      <el-form-item label="减速箱温度设定值" prop="redutmset">
        <el-input v-model="pe63form.redutmset" />
      </el-form-item>
      <el-form-item label="熔体温度实测值" prop="melttemp">
        <el-input v-model="pe63form.melttemp" />
      </el-form-item>
      <el-form-item label="温度超极限报警" prop="templimwn">
        <el-input v-model="pe63form.templimwn" />
      </el-form-item>
      <el-form-item label="主机冷却风机故障" prop="hcoolffail">
        <el-input v-model="pe63form.hcoolffail" />
      </el-form-item>
      <el-form-item label="主机调速器故障" prop="hgoverfail">
        <el-input v-model="pe63form.hgoverfail" />
      </el-form-item>
      <el-form-item label="主机电流超极限" prop="hcurlim">
        <el-input v-model="pe63form.hcurlim" />
      </el-form-item>
      <el-form-item label="牵引调速器故障" prop="tractgfail">
        <el-input v-model="pe63form.tractgfail" />
      </el-form-item>
      <el-form-item label="牵引电流超极限" prop="tractcurlim">
        <el-input v-model="pe63form.tractcurlim" />
      </el-form-item>
      <el-form-item label="熔体压力超极限" prop="meltprlim">
        <el-input v-model="pe63form.meltprlim" />
      </el-form-item>
      <el-form-item label="主机急停未松开" prop="hstpnotrel">
        <el-input v-model="pe63form.hstpnotrel" />
      </el-form-item>
      <el-form-item label="料筒风机报警" prop="barfanwn">
        <el-input v-model="pe63form.barfanwn" />
      </el-form-item>
      <el-form-item label="减速箱温度报警" prop="gbtempwn">
        <el-input v-model="pe63form.gbtempwn" />
      </el-form-item>
      <el-form-item label="主机保养时间到" prop="hmtimewn">
        <el-input v-model="pe63form.hmtimewn" />
      </el-form-item>
      <el-form-item label="数据的记录时" prop="recordtime">
        <el-input v-model="pe63form.recordtime" />
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
import {Pe63Form} from "@/api/device/types";

const state = reactive({
  pe63form: {} as Pe63Form,
  validateRules: reactive({
    //注意 ： prop绑定的变量名要和 v-model绑定的变量名一样
    devid: [{ required: true, message: '请输入设备地址', trigger: 'blur' },],
    hstart: [{ required: true, message: '请输入主机启动', trigger: 'blur' },],
    trstart: [{ required: true, message: '请输入牵引启动', trigger: 'blur' },],
    mcurrvalue: [{ required: true, message: '请输入主机电流实测值', trigger: 'blur' },],
    trcurrvalue: [{ required: true, message: '请输入牵引电流实测值', trigger: 'blur' },],
    pressure: [{ required: true, message: '请输入压力实测值', trigger: 'blur' },],
    dr1temp: [{ required: true, message: '请输入机筒1区温度实测值', trigger: 'blur' },],
    dr1temset: [{ required: true, message: '请输入机筒1区温度设定值', trigger: 'blur' },],
    dr2temp: [{ required: true, message: '请输入机筒2区温度实测值', trigger: 'blur' },],
    dr2temset: [{ required: true, message: '请输入机筒2区温度设定值', trigger: 'blur' },],
    dr3temp: [{ required: true, message: '请输入机筒3区温度实测值', trigger: 'blur' },],
    dr3temset: [{ required: true, message: '请输入机筒3区温度设定值', trigger: 'blur' },],
    dr4temp: [{ required: true, message: '请输入机筒4区温度实测值', trigger: 'blur' },],
    dr4temset: [{ required: true, message: '请输入机筒4区温度设定值', trigger: 'blur' },],
    dr5temp: [{ required: true, message: '请输入机筒5区温度实测值', trigger: 'blur' },],
    dr5temset: [{ required: true, message: '请输入机筒5区温度设定值', trigger: 'blur' },],
    flangetemp: [{ required: true, message: '请输入法兰温度实测值', trigger: 'blur' },],
    flangetmset: [{ required: true, message: '请输入法兰温度设定值', trigger: 'blur' },],
    mold1temp: [{ required: true, message: '请输入模具1温度实测值', trigger: 'blur' },],
    mold1tmset: [{ required: true, message: '请输入模具1温度设定值', trigger: 'blur' },],
    mold2temp: [{ required: true, message: '请输入模具2温度实测值', trigger: 'blur' },],
    mold2tmset: [{ required: true, message: '请输入模具2温度设定值', trigger: 'blur' },],
    mold3temp: [{ required: true, message: '请输入模具3温度实测值', trigger: 'blur' },],
    mold3tmset: [{ required: true, message: '请输入模具3温度设定值', trigger: 'blur' },],
    mold4temp: [{ required: true, message: '请输入模具4温度实测值', trigger: 'blur' },],
    mold4tmset: [{ required: true, message: '请输入模具4温度设定值', trigger: 'blur' },],
    mold5temp: [{ required: true, message: '请输入模具5温度实测值', trigger: 'blur' },],
    mold5tmset: [{ required: true, message: '请输入模具5温度设定值', trigger: 'blur' },],
    mold6temp: [{ required: true, message: '请输入模具6温度实测值', trigger: 'blur' },],
    mold6tmset: [{ required: true, message: '请输入模具6温度设定值', trigger: 'blur' },],
    redutemp: [{ required: true, message: '请输入减速箱温度实测值', trigger: 'blur' },],
    redutmset: [{ required: true, message: '请输入减速箱温度设定值', trigger: 'blur' },],
    melttemp: [{ required: true, message: '请输入熔体温度实测值', trigger: 'blur' },],
    templimwn: [{ required: true, message: '请输入温度超极限报警', trigger: 'blur' },],
    hcoolffail: [{ required: true, message: '请输入主机冷却风机故障', trigger: 'blur' },],
    hgoverfail: [{ required: true, message: '请输入主机调速器故障', trigger: 'blur' },],
    hcurlim: [{ required: true, message: '请输入主机电流超极限', trigger: 'blur' },],
    tractgfail: [{ required: true, message: '请输入牵引调速器故障', trigger: 'blur' },],
    tractcurlim: [{ required: true, message: '请输入牵引电流超极限', trigger: 'blur' },],
    meltprlim: [{ required: true, message: '请输入熔体压力超极限', trigger: 'blur' },],
    hstpnotrel: [{ required: true, message: '请输入主机急停未松开', trigger: 'blur' },],
    barfanwn: [{ required: true, message: '请输入料筒风机报警', trigger: 'blur' },],
    gbtempwn: [{ required: true, message: '请输入减速箱温度报警', trigger: 'blur' },],
    hmtimewn: [{ required: true, message: '请输入主机保养时间到', trigger: 'blur' },],
    recordtime: [{ required: true, message: '请输入数据的记录时', trigger: 'blur' },],})
});

const {
  pe63form,
  validateRules
} = toRefs(state)

function onSubmit(){
}

function onCancel(){
}
</script>

<style scoped>

</style>
