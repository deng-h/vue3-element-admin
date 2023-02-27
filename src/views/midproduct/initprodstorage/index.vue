<template>
  <div class="app-container">
    <div class="search">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item>
          <el-button v-hasPerm="['initprodstorage:add']" :icon="Plus" type="success" @click="addNewModelStorage">
            添加新库存
          </el-button>

          <el-button v-hasPerm="['initprodstorage:history']" type="primary" @click="gotoHistoryPage">
            查看库存历史数据
          </el-button>
        </el-form-item>

        <el-form-item prop="model">
          <el-input v-model="queryParams.model" placeholder="请输入产品型号" clearable style="width: 200px; margin-right: 10px" />
          <el-button :icon="Search" v-hasPerm="['initprodstorage:list']" type="primary" @click="handleQuery">
            查询
          </el-button>
          <el-button v-hasPerm="['initprodstorage:list']" :icon="Refresh" @click="resetQuery">
            重置查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card style="margin-top: 10px;">
      <el-table :data="tableDatalist" v-loading="loading" highlight-current-row border style="font-size: 10px;">
        <el-table-column fixed type="index" align="center" label="序号" width="70"/>
        <el-table-column prop="model" align="center" label="具体型号" width="170"/>
        <el-table-column prop="name" align="center" label="型号名称" width="170"/>
        <el-table-column prop="cname" align="center" label="所属分组" width="170"/>
        <el-table-column prop="stocks" align="center" label="库存数" width="170"/>
        <el-table-column prop="adminName" align="center" label="最后更新人员" width="170"/>
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
      <el-form ref="dataFormRef" :model="formData" :rules="validateRules" label-width="100px">
        <el-form-item label="型号" prop="model">
          <el-input
            :disabled="modelInputDisabled"
            placeholder="请准确填写型号"
            @change="modelCheckSearch"
            v-model="formData.model"
          />
        </el-form-item>

        <el-form-item label="型号校验">
          <el-input v-model="modelCheckContent" disabled placeholder="型号输入完后，鼠标切换到库存数等待提示" />
        </el-form-item>

        <el-form-item label="库存数" prop="stocks">
          <el-input placeholder="请准确填写批次型号库存数" v-model="formData.stocks"/>
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
import {reactive, toRefs, onMounted, ref} from "vue";
import {Plus, Refresh, Search} from "@element-plus/icons-vue";
import router from '@/router';
import {MidProdInitProdQuery, InitProdStorage} from "@/api/midproduct/initprodstorage/types";
import {getModelAndCategoryNameByModel} from "@/api/midproduct/model";
import {
  listMidProdInitProdPages,
  getMidProdInitProdDetail,
  updateMidProdInitProd
} from "@/api/midproduct/initprodstorage";
import {ElForm, ElMessage} from "element-plus";

const dataFormRef = ref(ElForm);
const queryFormRef = ref(ElForm);
const state = reactive({
  dialog: {title: '', visible: false} as DialogType,
  loading: false,
  total: 0,  // 总条数
  modelInputDisabled: false,
  formData: {} as InitProdStorage,
  ids: [] as string[],  // 选中的ID
  tableDatalist: [] as InitProdStorage[],
  modelCheckContent: '',
  queryParams: {pageNum: 1, pageSize: 10} as MidProdInitProdQuery,
  saveBtnDisabled: false,
  validateRules: {//注意 ： prop绑定的变量名要和 v-model绑定的变量名一样
    model: [{ required: true, message: '请输入正确批次型号', trigger: 'blur'},],
    stocks: [{ required: true, message: '请输入库存数', trigger: 'blur' },],},
});

const {
  dialog,
  modelInputDisabled,
  formData,
  ids,
  total,
  queryParams,
  saveBtnDisabled,
  modelCheckContent,
  validateRules,
  loading,
  tableDatalist,
} = toRefs(state);

function closeDialog(){
  dialog.value.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
}

// 重置查询
function resetQuery() {
  queryFormRef.value.resetFields();
  handleQuery();
}

function addNewModelStorage(){
  dialog.value ={title: '添加新库存', visible: true};
}

function handleUpdate(row: any){
  dialog.value ={title: '更新原库存', visible: true};
  const id = row.id || state.ids;
  getMidProdInitProdDetail(id).then(({data}) => {
    formData.value = data;
    modelCheckContent.value = "型号名称："+ data.name + "，型号分类："+ data.cname;
  });
}

function gotoHistoryPage(){
  router.push("/midproduct/initprodstorage/history");
}

function handleQuery(){
  loading.value = true;
  listMidProdInitProdPages(state.queryParams).then(({data}) => {
    state.tableDatalist = data.list;
    state.total = data.total;
    loading.value = false;
  });
}

function modelCheckSearch(){
  if(state.formData.model !== ''){
    getModelAndCategoryNameByModel(state.formData.model).then(({data}) => {
      modelCheckContent.value = "型号名称："+ data.name + "，型号分类："+ data.categoryName;
    }).catch(() => {
      modelCheckContent.value = "未查到相关型号，请确认型号!";
    });
  }
}

function handleSubmit(){
  loading.value = true;
  dataFormRef.value.validate((valid: any) => {
    if(valid){
      if(state.formData.id){
        updateMidProdInitProd(state.formData).then(() => {
          ElMessage.success('修改成功');
          closeDialog();
          handleQuery();
          loading.value = false;
        }).catch(() => {
          ElMessage.error('修改失败');
          loading.value = false;
        });
      }
      // else {
      //
      // }
    }
  })
}

onMounted(() => {
  handleQuery();
});
</script>

<style scoped>

</style>
