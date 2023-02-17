<template>
  <div class="app-container">
    <div class="top-container">
      <el-button style="margin-right: 10px;" type="success" @click="addPlan" :icon="Plus" v-hasPerm="['arrangeOrder:add']">
        添加计划
      </el-button>
      <el-input v-model="inputSearch" placeholder="请输设备地址" style="width: 120px; margin-right: 10px;" />
      <el-button v-hasPerm="['midprodplansetting:list']" type="primary" :icon="Search" @click="fetchPageList">
        查询
      </el-button>
    </div>

    <el-card style="margin-top: 10px">
      <el-table :data="tableDatalist" v-loading="loading" highlight-current-row border style="font-size: 10px;">
        <el-table-column fixed type="index" align="center" label="序号" width="120"/>
        <el-table-column prop="deviceId" align="center" label="设备地址" width="120"/>
        <el-table-column prop="model" align="center" label="具体型号" width="120"/>
        <el-table-column prop="name" align="center" label="型号名称" width="120"/>
        <el-table-column prop="cname" align="center" label="所属分组" width="120"/>
        <el-table-column prop="scheQuantity" align="center" label="计划数" width="120"/>
        <el-table-column prop="startTime" align="center" label="起始时间"/>
        <el-table-column prop="endTime" align="center" label="结束时间"/>
        <el-table-column prop="gmtCreate" align="center" label="创建时间" />
        <el-table-column prop="gmtModified" align="center" label="更新时间" />
        <el-table-column v-hasPerm="['midprodplansetting:edit', 'midprodplansetting:delete']" fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button v-hasPerm="['midprodplansetting:edit']" type="primary" link @click="handleUpdate(scope.row)">
              编辑
            </el-button>
            <el-popconfirm
              confirm-button-text="Yes"
              cancel-button-text="No"
              icon-color="red"
              width="180"
              title="此操作将永久删除该记录, 是否继续?"
              @confirm="handleDelete(scope.row)">
              <template #reference>
                <el-button v-hasPerm="['midprodplansetting:delete']" type="danger" link>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="dialog.title" v-model="dialog.visible" width="600px" @close="closeDialog">
      <el-form ref="planRef" :model="plan" :rules="validateRules" label-width="140px">
        <el-form-item label="设备地址" prop="deviceId">
          <el-select
            v-model="plan.deviceId"
            filterable
            style="margin-bottom: 5px;"
            placeholder="请选择设备地址">
            <el-option
              v-for="item in deviceList"
              :key="item.devid"
              :label="item.devid"
              :value="item.devid"/>
          </el-select>
        </el-form-item>

        <el-form-item label="型号" prop="totalModel">
          <el-input
            :disabled="modelInputDisabled"
            placeholder="请准确填写型号"
            @change="totalModelCheckSearch"
            v-model="totalModel"
          />
        </el-form-item>

        <el-form-item label="型号校验">
          <el-input v-model="modelCheckContent" disabled placeholder="型号输入完后，鼠标切换到库存数等待提示" />
        </el-form-item>

        <el-form-item label="计划数" prop="scheQuantity">
          <el-input placeholder="请准确填写计划数" v-model="plan.scheQuantity"/>
        </el-form-item>

        <el-form-item label="计划起始时间" prop="startTime">
          <el-date-picker
            v-model="plan.startTime"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择日期时间"
          />
        </el-form-item>

        <el-form-item label="计划结束时间" prop="endTime">
          <el-date-picker
            v-model="plan.endTime"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择日期时间"
          />
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
import {Plan} from "@/api/midproduct/types";

const state = reactive({
  loading: false,
  ids: [] as number[],  // 选中的ID
  tableDatalist: [{'id': '1','deviceId':'1'}] as Plan[],
  plan: {} as Plan,
  dialog: {title: '', visible: false} as DialogType,
  deviceList: [{devid: '1'},{devid: '2'},{devid: '3'},{devid: '4'},{devid: '5'},{devid: '6'},{devid: '7'},{devid: '8'},
    {devid: '9'},{devid: '10'},{devid: '11'},{devid: '12'},{devid: '13'},{devid: '14'},{devid: '15'},{devid: '16'}],
  validateRules: reactive({//注意 ： prop绑定的变量名要和 v-model绑定的变量名一样
    scheQuantity: [{ required: true, message: '请输入库存数', trigger: 'blur' },],
    startTime: [{ required: true, message: '请输入排单起始时间', trigger: 'blur' },],
    endTime: [{ required: true, message: '请输入排单结束时间', trigger: 'blur' },],}),
});

const {
  loading,
  ids,
  plan,
  tableDatalist,
  dialog,
  deviceList,
  validateRules
} = toRefs(state);

function addPlan(){
  dialog.value ={title: '添加计划', visible: true};
}

function closeDialog(){
  dialog.value.visible = false;
  loading.value = false;
}

function handleUpdate(row: any){
  dialog.value = {title: '修改', visible: true};
  const row_id = row.id || state.ids;
  const selectedData = state.tableDatalist.find((item) => {
    if(item.id === row_id){
      return item;
    }
  });
  state.plan.id = row_id;
  if(selectedData !== undefined){
    state.plan = selectedData;
  }
}
onMounted(() => {

});
</script>

<style scoped>

</style>
