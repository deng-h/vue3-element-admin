<template>
  <div class="app-container">
    <div class="top-container">
      <el-form ref="teamDefaultTimeRef" :model="teamDefaultTime" :rules="validateRules" label-width="140px">
        <el-form-item label="型号" prop="teamType">
          <el-input :disabled="true" v-model="teamDefaultTime.teamType" style="width: 220px"/>
        </el-form-item>

        <el-form-item label="班组起始时间" prop="startTime">
          <el-time-picker
            v-model="teamDefaultTime.startTime"
            type="datetime"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
            placeholder="选择起始时间"
          />
        </el-form-item>

        <el-form-item label="班组结束时间" prop="endTime">
          <el-time-picker
            v-model="teamDefaultTime.endTime"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
            placeholder="选择结束时间"
          />
        </el-form-item>

        <el-form-item>
          <el-button :disabled="saveBtnDisabled" type="primary" @click="onSubmit">提交</el-button>
          <!-- <el-button @click="onCancel">取消</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, toRefs, onMounted} from "vue";
import {TeamDefaultTime} from "@/api/midproduct/types";
const state = reactive({
  teamDefaultTime: {} as TeamDefaultTime,
  validateRules: reactive({//注意 ： prop绑定的变量名要和 v-model绑定的变量名一样
    teamType: [{ required: true, message: '请输入正确批次型号', trigger: 'blur'},],
    startTime: [{ required: true, message: '请输入库存数', trigger: 'blur' },],
    endTime: [{ required: true, message: '请输入库存数', trigger: 'blur' },],}),
});

const {
  teamDefaultTime,
  validateRules
} = toRefs(state)
</script>

<style scoped>

</style>
