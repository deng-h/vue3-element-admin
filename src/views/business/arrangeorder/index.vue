<template>
  <div class="app-container">
    <div class="top-container">
      <el-button type="success" @click="addArrangeOrder" :icon="Plus" v-hasPerm="['arrangeOrder:add']" style="margin-right: 10px">
        添加排单
      </el-button>

      <el-input v-model="inputSearch" placeholder="请输入设备地址" style="width: 120px; margin-right: 10px;" />
      <el-button type="primary" @click="fetchPageList" :icon="Search" v-hasPerm="['arrangeOrder:list']">查询</el-button>

      <br><br>
      <el-select style="width: 150px;margin-right: 10px;"
                 @change="unfinishedDevIDChange"
                 v-model="unfinishedDevID"
                 placeholder="查看订货总量">
        <el-option v-for="item in deviceList" :key="item.devid" :label="item.label" :value="item.devid"/>
      </el-select>

      未完成订单总订货量:
      <el-input v-model="unfinishedOrderQuantity" style="width: 100px;margin-right: 10px;" />

      当前排单最新合格生产数:
      <el-input v-model="currArrangeQualifiedQuantity" style="width: 100px;" />
    </div>

    <el-card style="margin-top: 10px">
      <el-table :data="tableDatalist" v-loading="loading" highlight-current-row border style="font-size: 10px;">
        <el-table-column fixed type="index" align="center" label="序号" width="100"/>
        <el-table-column fixed prop="devid" align="center" label="设备地址" width="100"/>
        <el-table-column prop="devname" label="设备名称" width="100"/>
        <el-table-column prop="scheQuantity" align="center" label="计划数" width="100"/>
        <el-table-column prop="startDate" align="center" label="排单起始时间" width="180"/>
        <el-table-column prop="endDate" align="center" label="排单结束时间" width="150"/>
        <el-table-column prop="gmtCreate" align="center" label="创建时间" width="180"/>
        <el-table-column prop="gmtModified" align="center" label="更新时间" width="180"/>
        <el-table-column label="操作" align="left" v-hasPerm="['arrangeOrder:edit', 'arrangeOrder:delete']" width="200">
          <template #default="scope">
            <el-button type="primary" link @click="handleUpdate(scope.row)" v-hasPerm="['arrangeOrder:edit']">
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
                <el-button type="danger" link v-hasPerm="['arrangeOrder:delete']" >删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-if="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="handleQuery"
      />
    </el-card>

<!--    添加、编辑dialog-->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" @close="closeDialog">
      <el-form ref="arrangeOrderAddRef" :model="arrangeOrder" :rules="validateRulesAdd" label-width="140px">
        <el-form-item label="设备地址" prop="devid">
          <el-select
            v-model="arrangeOrder.devid"
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

        <el-form-item label="设备名称" disabled  prop="devname" >
          <el-input v-model="arrangeOrder.devname" />
        </el-form-item>

        <el-form-item label="计划产量（米）" prop="scheQuantity" >
          <el-input v-model="arrangeOrder.scheQuantity" />
        </el-form-item>

        <el-form-item label="排单起始时间" prop="startDate">
          <el-date-picker
            v-model="arrangeOrder.startDate"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="排单结束时间" prop="endDate">
          <el-date-picker
            v-model="arrangeOrder.endDate"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择日期时间"
          >
          </el-date-picker>
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
import {ArrangeOrder, DevAddrQuery} from "@/api/business/arrangeorder/types";
import {Plus, Search} from "@element-plus/icons-vue";

const state = reactive({
  inputSearch: '',
  ids: [] as number[],  // 选中的ID
  tableDatalist: [{'devid': '1', 'devname': 'devname', 'scheQuantity': '666', 'startDate': '2023-02-01 00:00:00', 'endDate': '2023-02-22 00:00:00'}],
  loading: false,
  total: 0,  // 总条数
  unfinishedOrderQuantity: '',
  currArrangeQualifiedQuantity: '',
  queryParams: {pageNum: 1, pageSize: 10} as DevAddrQuery,
  dialog: {title: '', visible: false} as DialogType,
  arrangeOrder: {} as ArrangeOrder,
  unfinishedDevID: '',
  deviceList: [{devid: '1', label: '1 (mpp315)', devname: 'mpp315',},
              {devid: '2', label: '2 (mpp250)', devname: 'mpp250',},
              {devid: '3', label: '3 (mpp250)', devname: 'mpp250',},
              {devid: '4', label: '4 (pe160)', devname: 'pe160',},
              {devid: '5', label: '5 (pe63)', devname: 'pe63',},
              {devid: '6', label: '6 (gxpe63)', devname: 'gxpe63',},
              {devid: '7', label: '7 (gxpe63)', devname: 'gxpe63',},],
  validateRulesAdd: { //注意 ： prop绑定的变量名要和 v-model绑定的变量名一样
    devid: [{ required: true, message: '请输入设备地址', trigger: 'blur' },],
    devname: [{ required: true, message: '请输入设备名称', trigger: 'blur' },],
    scheQuantity: [{ required: true, message: '请输入计划产量', trigger: 'blur' },],
    startDate: [{ required: true, message: '请输入排单起始时间', trigger: 'blur' },],
    endDate: [{ required: true, message: '请输入排单结束时间', trigger: 'blur' },],
  },
});

const {
  inputSearch,
  tableDatalist,
  loading,
  unfinishedOrderQuantity,
  currArrangeQualifiedQuantity,
  total,
  queryParams,
  dialog,
  arrangeOrder,
  deviceList,
  validateRulesAdd,
  unfinishedDevID,
} = toRefs(state);

function addArrangeOrder(){
  dialog.value ={title: '添加排单', visible: true};
}

function handleUpdate(row: any) {
  dialog.value = {title: '编辑', visible: true};
  const row_id = row.devid || state.ids;
  const selectedData = state.tableDatalist.find((item) => {
    if(item.devid === row_id){
      return item;
    }
  });
  state.arrangeOrder.devid = row_id;
  if(selectedData !== undefined){
    state.arrangeOrder = selectedData;
  }

}

function unfinishedDevIDChange(){
  console.log("未完成数量");
}

function fetchPageList(){

}

function handleDelete(row: any){

}

function handleQuery(){

}

function closeDialog(){
  dialog.value.visible = false;
  loading.value = false;
}

function handleSubmit(){

}

onMounted(() => {
  handleQuery();
});
</script>

<style scoped>

</style>
