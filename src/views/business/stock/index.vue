<template>
  <div class="app-container">
    <div class="top-container">
      <el-input v-model="inputSearch" placeholder="请输入批次型号(规格/型号, 支长/根重, 壁厚)" style="width: 330px; margin-right: 10px;"/>
      <el-button v-hasPerm="['stock:list']" type="primary" :icon="Search" @click="fetchPageList">查询</el-button>
      <el-button v-hasPerm="['stock:history']" type="success" @click="gotoHistoryPage" style="margin-left: 20px;">
        查看历史库存数据
      </el-button>
    </div>

    <el-card style="margin-top: 10px;">
      <el-table :data="stockList" v-loading="loading" highlight-current-row border style="font-size: 10px;">
        <el-table-column fixed type="index" align="center" label="序号" width="80"/>
        <el-table-column fixed prop="totalModel" align="center" label="用户名" width="180"/>
        <el-table-column prop="stocks" align="center" label="库存数(米)"/>
        <el-table-column prop="adminName" align="center" label="最后更新人员"/>
        <el-table-column prop="updatetime" align="center" label="更新时间"/>
        <el-table-column prop="recordtime" align="center" label="记录时间"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" link @click="handleUpdate(scope.row)" v-hasPerm="['stock:edit']" >
              更新
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="dialog.title" v-model="dialog.visible" width="600px" @close="closeDialog">
      <el-form ref="stockRef" :model="stock" :rules="validateRules" label-width="140px">
        <el-form-item label="批次型号" prop="totalModel">
          <el-input placeholder="请准确填写批次型号(规格/型号、支长/根重、壁厚)" v-model="stock.totalModel"/>
        </el-form-item>

        <el-form-item label="库存数" prop="stocks">
          <el-input placeholder="请准确填写批次型号(规格/型号、支长/根重、壁厚)" v-model="stock.stocks"/>
        </el-form-item>

      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :disabled="saveBtnDisabled" type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="closeDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import {reactive, toRefs, onMounted} from "vue";
import {Stock} from "@/api/business/types";
import {Search} from "@element-plus/icons-vue";

const state = reactive({
  loading: false,
  inputSearch: '',
  stockList: [{'id': '1', 'adminName': 'joy'}] as Stock[],
  stock: {} as Stock,
  ids: [] as number[],  // 选中的ID
  saveBtnDisabled: false,
  dialog: {title: '', visible: false} as DialogType,
  validateRules: reactive({//注意 ： prop绑定的变量名要和 v-model绑定的变量名一样
    totalModel: [{ required: true, message: '请输入批次型号', trigger: 'blur' },],
    stocks: [{ required: true, message: '请输入库存数', trigger: 'blur' },],}),
});

const {
  loading,
  stockList,
  dialog,
  ids,
  saveBtnDisabled,
  validateRules,
  stock,
  inputSearch
} = toRefs(state);

function gotoHistoryPage(){
  router.push("/business/stock/history")
}

function fetchPageList(){

}

function handleUpdate(row: any){
  dialog.value = {title: '更新', visible: true};
  const row_id = row.devid || state.ids;
  const selectedData = state.stockList.find((item) => {
    if(item.id === row_id){
      return item;
    }
  });

  state.stock.id = row_id;
  if(selectedData !== undefined){
    state.stock = selectedData;
  }
}

function onCancel(){

}

function closeDialog(){
  dialog.value.visible = false;
  loading.value = false;
}

function handleSubmit(){

}
</script>

<style scoped>

</style>
