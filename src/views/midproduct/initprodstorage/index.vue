<template>
  <div class="app-container">
    <div class="top-container">
      <el-button v-hasPerm="['initprodstorage:add']" :icon="Plus" style="margin-right: 10px;" type="success" @click="addNewModelStorage">
        添加新库存
      </el-button>

      <el-input v-model="inputSearch" placeholder="请输入产品型号" style="width: 260px; margin-right: 10px;" />
      <el-button :icon="Search" v-hasPerm="['initprodstorage:list']" type="primary" @click="fetchPageList">
        查询
      </el-button>

      <el-button v-hasPerm="['initprodstorage:history']" style="margin-left: 20px;" type="success" @click="gotoHistoryPage">
        查看库存历史数据
      </el-button>

    </div>

    <el-card style="margin-top: 10px;">
      <el-table :data="tableDatalist" v-loading="loading" highlight-current-row border style="font-size: 10px;">
        <el-table-column fixed type="index" align="center" label="序号" width="70"/>
        <el-table-column prop="model" align="center" label="具体型号" width="120"/>
        <el-table-column prop="name" align="center" label="型号名称" width="120"/>
        <el-table-column prop="cname" align="center" label="所属分组" width="120"/>
        <el-table-column prop="stocks" align="center" label="库存数" width="130"/>
        <el-table-column prop="adminName" align="center" label="最后更新人员" width="130"/>
        <el-table-column prop="gmtCreate" align="center" label="更新时间"/>
        <el-table-column prop="gmtModified" align="center" label="记录时间"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button v-hasPerm="['initprodstorage:edit']" type="primary" link @click="handleUpdate(scope.row)">
              更新原库存
            </el-button>
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

    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" @close="closeDialog">
      <el-form ref="stockRef" :model="stock" :rules="validateRules" label-width="100px">
        <el-form-item label="型号" prop="totalModel">
          <el-input
            :disabled="modelInputDisabled"
            placeholder="请准确填写型号"
            @change="totalModelCheckSearch"
            v-model="stock.totalModel"
          />
        </el-form-item>

        <el-form-item label="型号校验">
          <el-input v-model="modelCheckContent" disabled placeholder="型号输入完后，鼠标切换到库存数等待提示" />
        </el-form-item>

        <el-form-item label="库存数" prop="stocks">
          <el-input placeholder="请准确填写批次型号库存数" v-model="stock.stocks"/>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" :disabled="saveBtnDisabled" @click="handleSubmit">确 定</el-button>
          <el-button @click="closeDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {reactive, toRefs, onMounted} from "vue";
import {Plus, Search} from "@element-plus/icons-vue";
import {Stock} from "@/api/business/types";
import router from '@/router';

const state = reactive({
  dialog: {title: '', visible: false} as DialogType,
  loading: false,
  modelInputDisabled: false,
  stock: {} as Stock,
  tableDatalist: [{'totalModel': 'totalModel', 'stocks': 'stocks'}],
  modelCheckContent: '',
  saveBtnDisabled: false,
  validateRules: {//注意 ： prop绑定的变量名要和 v-model绑定的变量名一样
    totalModel: [{ required: true, message: '请输入正确批次型号', trigger: 'blur'},],
    stocks: [{ required: true, message: '请输入库存数', trigger: 'blur' },],},

});

const {
  dialog,
  modelInputDisabled,
  stock,
  saveBtnDisabled,
  modelCheckContent,
  validateRules,
  loading,
  tableDatalist,
} = toRefs(state);

function closeDialog(){
  dialog.value.visible = false;
  loading.value = false;
}
function addNewModelStorage(){
  dialog.value ={title: '添加新库存', visible: true};
}

function handleUpdate(row: any){
  dialog.value ={title: '更新原库存', visible: true};
  state.stock.id = row.id;
  state.stock.totalModel = row.totalModel;
  state.stock.stocks = row.stocks;
}

function gotoHistoryPage(){
  router.push("/midproduct/initprodstorage/history");
}
</script>

<style scoped>

</style>
