<template>
  <div class="app-container">
    <div class="search">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item style="margin-right: 10px">
          <el-button v-hasPerm="['midprodcategory:add']" style="margin-right: 10px;" :icon="Plus" type="success" @click="addModel">
            添加型号
          </el-button>
        </el-form-item>

        <el-form-item prop="category" style="margin-right: 5px">
          <el-select style="width: 120px;margin-left: 10px;margin-right: 10px;" v-model="queryParams.category" placeholder="选择分类">
            <el-option
              v-for="item in categoryNameList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="model" style="margin-right: 5px">
          <el-input v-model="queryParams.model" placeholder="请输入型号名称" clearable @keyup.enter="handleQuery" style="width: 260px; margin-right: 10px;" />
        </el-form-item>

        <el-form-item>
          <el-button v-hasPerm="['midprodcategory:list']" type="primary" :icon="Search" @click="handleQuery">
            查询
          </el-button>
          <el-button v-hasPerm="['midprodcategory:list']" :icon="Refresh" @click="resetQuery">
            重置查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card style="margin-top: 10px;">
      <el-table :data="midProdModelList" v-loading="loading" highlight-current-row border style="font-size: 10px;">
        <el-table-column fixed type="index" align="center" label="序号" width="80"/>
        <el-table-column prop="model" align="center" label="型号" width="200"/>
        <el-table-column prop="name" align="center" label="型号名称" width="200"/>
        <el-table-column prop="categoryName" align="center" label="所属分组" width="200"/>
        <el-table-column prop="gmtCreate" align="center" label="创建时间" width="220"/>
        <el-table-column prop="gmtModified" align="center" label="更新时间" width="220"/>
        <el-table-column v-hasPerm="['midprodcategory:delete', 'midprodcategory:edit']" fixed="right" label="操作">
          <template #default="scope">
            <el-button type="primary" link v-hasPerm="['midprodcategory:edit']" @click="handleUpdate(scope.row)">
              编辑
            </el-button>
            <el-popconfirm
              confirm-button-text="Yes"
              cancel-button-text="No"
              icon-color="red"
              width="180"
              title="此操作将永久删除该记录, 是否继续?"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button v-hasPerm="['midprodcategory:delete']" type="danger" link>删除</el-button>
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
        <el-form-item label="产品分类" prop="categoryId">
          <el-select style="width: 120px;margin-right: 10px;" v-model="formData.categoryId" placeholder="选择分类">
            <el-option v-for="item in categoryNameList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="型号(唯一)"  prop="model" >
          <el-input v-model="formData.model" />
        </el-form-item>

        <el-form-item label="型号名称" prop="name" >
          <el-input v-model="formData.name" />
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
import {MidProdModel, MidProdModelQuery} from "@/api/midproduct/model/types";
import {Plus, Refresh, Search} from "@element-plus/icons-vue";
import {ElForm, ElMessage} from "element-plus";
import {getMidProdCategoryNameList} from "@/api/midproduct/category";
import {
  listMidProdModelPages,
  getMidProdModelDetail,
  addMidProdModel,
  updateMidProdModel,
  deleteMidProdModel
} from "@/api/midproduct/model";

let categoryNameList = ref([]);
const dataFormRef = ref(ElForm);
const queryFormRef = ref(ElForm);
const state = reactive({
  loading: false,
  total: 0,  // 总条数
  saveBtnDisabled: false,
  ids: [] as string[],  // 选中的ID
  midProdModelList: [] as MidProdModel[],
  formData: {} as MidProdModel,
  queryParams: {pageNum: 1, pageSize: 10} as MidProdModelQuery,
  dialog: {title: '', visible: false} as DialogType,
  validateRules: reactive({//注意 ： prop绑定的变量名要和 v-model绑定的变量名一样
    categoryId: [{ required: true, message: '请选择产品分类', trigger: 'blur'},],
    model: [{ required: true, message: '请输入型号', trigger: 'blur' },],
    name: [{ required: true, message: '请输入型号名称', trigger: 'blur' },],}),
});

const {
  loading,
  midProdModelList,
  saveBtnDisabled,
  dialog,
  formData,
  validateRules,
  total,
  queryParams
} = toRefs(state);

function addModel(){
  dialog.value ={title: '添加型号', visible: true};
}

function closeDialog(){
  dialog.value.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
}

// 编辑
function handleUpdate(row: any){
  dialog.value ={title: '编辑', visible: true};
  const roleId = row.id || state.ids;
  getMidProdModelDetail(roleId).then(({data}) => {
    formData.value = data;
  });
}

function handleDelete(row: any){
  const ids = [row.id || state.ids].join(',');
  deleteMidProdModel(ids).then(() => {
    ElMessage.success('删除成功');
    handleQuery();
  });
}

function handleSubmit(){
  loading.value = true;
  dataFormRef.value.validate((valid: any) => {
    if(valid){
      if(state.formData.id){
        updateMidProdModel(state.formData).then(() => {
          ElMessage.success('修改成功');
          closeDialog();
          handleQuery();
          loading.value = false;
        }).catch(() => {
          ElMessage.error('修改失败');
          loading.value = false;
        });
      }else {
        addMidProdModel(state.formData).then(() => {
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

// 重置查询
function resetQuery() {
  queryFormRef.value.resetFields();
  handleQuery();
}

// 获取产品名称列表
function getCategoryNameList(){
  getMidProdCategoryNameList().then(({data}) => {
    categoryNameList.value = data;
  })
}

function handleQuery(){
  loading.value = true;
  listMidProdModelPages(state.queryParams).then(({data}) => {
    state.midProdModelList = data.list;
    // 返回的数据里只有categoryId 需要根据categoryId设置对应的categoryName
    state.midProdModelList.forEach((item: any) => {
      categoryNameList.value.forEach((category: any) => {
        if(category.id === item.categoryId){
          item.categoryName = category.name;
        }
      })
    });
    state.total = data.total;
    loading.value = false;
  });
}

onMounted(() => {
  getCategoryNameList();
  handleQuery();
});
</script>

<style scoped>

</style>
