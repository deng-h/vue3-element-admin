<template>
  <div class="app-container">
    <div class="search">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item style="margin-right: 10px">
          <el-button v-hasPerm="['midprodcategory:add']" style="margin-right: 10px;" type="success" :icon="Plus" @click="addCategory">
            添加分组
          </el-button>
        </el-form-item>

        <el-form-item prop="categoryName" style="margin-right: 5px">
          <el-input v-model="queryParams.categoryName" placeholder="请输入分类名称" clearable @keyup.enter="handleQuery" style="width: 260px; margin-right: 10px;" />
        </el-form-item>

        <el-form-item>
          <el-button v-hasPerm="['midprodcategory:list']" :icon="Search" type="primary" @click="handleQuery">
            查询
          </el-button>
          <el-button v-hasPerm="['midprodcategory:list']" :icon="Refresh" @click="resetQuery">
            重置查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card style="margin-top: 10px;">
      <el-table
        ref="dataTableRef"
        :data="midProCategoryList"
        v-loading="loading"
        @selection-change="handleSelectionChange"
        highlight-current-row
        border
        style="font-size: 10px;"
      >
        <el-table-column fixed type="index" align="center" label="序号" width="100"/>
        <el-table-column prop="name" align="center" label="分组名称" width="260"/>
        <el-table-column prop="gmtCreate" align="center" label="创建时间" width="300"/>
        <el-table-column prop="gmtModified" align="center" label="更新时间" width="300"/>
        <el-table-column label="操作" align="left" v-hasPerm="['midprodcategory:edit', 'midprodcategory:delete']" width="200">
          <template #default="scope">
            <el-button type="primary" link @click="handleUpdate(scope.row)" v-hasPerm="['midprodcategory:edit']">
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
                <el-button type="danger" link v-hasPerm="['midprodcategory:delete']">删除</el-button>
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

    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" @close="closeDialog">
      <el-form ref="dataFormRef" :model="formData" :rules="validateRules" label-width="100px">
        <el-form-item label="分组名称"  prop="name" >
          <el-input v-model="formData.name" @keyup.enter="handleSubmit"/>
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
import {ElForm, ElMessage} from "element-plus";
import {MidProdCategory, MidProdCategoryQuery} from "@/api/midproduct/category/types";
import {
  listMidProdCategoryPages,
  getMidProdCategoryDetail,
  updateMidProdCategory,
  addMidProdCategory,
  deleteMidProdCategory,
} from "@/api/midproduct/category";

const dataFormRef = ref(ElForm);
const queryFormRef = ref(ElForm);
const state = reactive({
  loading: false,
  saveBtnDisabled: false,
  total: 0,  // 总条数
  midProCategoryList: [] as MidProdCategory[],
  formData: {} as MidProdCategory,
  dialog: {title: '', visible: false} as DialogType,
  queryParams: {pageNum: 1, pageSize: 10} as MidProdCategoryQuery,
  ids: [] as string[],  // 选中的ID
  validateRules: {//注意 ： prop绑定的变量名要和 v-model绑定的变量名一样
    name: [{ required: true, message: '请输入分类名称', trigger: 'blur' },],},
});

const {
  ids,
  loading,
  midProCategoryList,
  formData,
  dialog,
  total,
  saveBtnDisabled,
  validateRules,
  queryParams
} = toRefs(state);

function addCategory(){
  dialog.value ={title: '添加分组', visible: true};
}

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

function handleSelectionChange(selection: any) {
  state.ids = selection.map((item: any) => item.id);
}

function handleUpdate(row: any){
  dialog.value ={title: '编辑', visible: true};
  const id = row.id || state.ids;
  getMidProdCategoryDetail(id).then(({data}) => {
    formData.value = data;
  });
}

function handleDelete(row: any){
  const ids = [row.id || state.ids].join(',');
  deleteMidProdCategory(ids).then(() => {
    ElMessage.success('删除成功');
    handleQuery();
  })
}

function handleSubmit(){
  loading.value = true;
  dataFormRef.value.validate((valid: any) => {
    if(valid){
      if(state.formData.id){
        updateMidProdCategory(state.formData.id, state.formData.name).then(() => {
          ElMessage.success('修改成功');
          closeDialog();
          handleQuery();
          loading.value = false;
        }).catch(() => {
          ElMessage.error('修改失败');
          loading.value = false;
        });
      }else {
        addMidProdCategory(state.formData.name).then(() => {
          ElMessage.success('添加成功');
          closeDialog();
          handleQuery();
          loading.value = false;
        }).catch(() => {
          ElMessage.error('添加失败');
          loading.value = false;
        });
      }
    }
  });
}

function handleQuery(){
  loading.value = true;
  listMidProdCategoryPages(state.queryParams).then(({data}) => {
    state.midProCategoryList = data.list;
    state.total = data.total;
    loading.value = false;
  });
}

onMounted(() => {
  handleQuery();
});
</script>

<style scoped>

</style>
