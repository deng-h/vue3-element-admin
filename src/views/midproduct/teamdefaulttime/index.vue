<template>
  <div class="app-container">
    <div class="top-container">
      <el-form ref="dataFormRef" :model="teamDefaultTime" :rules="validateRules" label-width="140px">
        <el-form-item label="类型" prop="teamType">
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
          <el-button :disabled="saveBtnDisabled" type="primary" @click="handleSubmit">提交</el-button>
          <!-- <el-button @click="onCancel">取消</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, toRefs, onMounted, ref} from "vue";
import {TeamDefaultTime} from "@/api/midproduct/teamdefaulttime/types";
import {getDataByTeamType, updateTeamDefaultTime} from "@/api/midproduct/teamdefaulttime";
import {ElForm, ElMessageBox, ElMessage} from "element-plus";

const dataFormRef = ref(ElForm);
const state = reactive({
  saveBtnDisabled: false,
  loading: false,
  teamDefaultTime: {} as TeamDefaultTime,
  validateRules: reactive({//注意 ： prop绑定的变量名要和 v-model绑定的变量名一样
    // teamType: [{ required: true, message: '请输入正确批次型号', trigger: 'blur'},],
    startTime: [{ required: true, message: '请输入班组起始时间', trigger: 'blur' },],
    endTime: [{ required: true, message: '请输入班组结束时间', trigger: 'blur' },],}),
});

const {
  teamDefaultTime,
  validateRules,
  saveBtnDisabled,
  loading
} = toRefs(state);

function handleSubmit(){
  loading.value = true;
  dataFormRef.value.validate((valid: any) => {
    if(valid){
      ElMessageBox.confirm("确定更新班组时间吗?", '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateTeamDefaultTime(state.teamDefaultTime).then(() => {
          ElMessage.success('成功提交');
          // saveBtnDisabled.value = false;
          getDataByTeamtype(state.teamDefaultTime.teamType);
        }).catch(() => {
          ElMessage.error('提交失败');
        });
      }).catch(() => {
        ElMessage.info('已取消提交');
        // saveBtnDisabled.value = false; // 防止表单重复提交
      });
    }
  });
}

onMounted(() => {
  // 白班标记1，夜班标记2
  getDataByTeamtype("1");
});

function getDataByTeamtype(teamType: string){
  getDataByTeamType(teamType).then(({data}) => {
    teamDefaultTime.value = data;
  }).catch(() => {
    state.saveBtnDisabled = true;
  })
}
</script>

<style scoped>

</style>
