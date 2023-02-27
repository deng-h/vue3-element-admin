<template>
  <div class="app-container">
    <div class="search">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item prop="keywords">
          <el-input v-model="queryParams.keywords" placeholder="摄像头编号" @keyup.enter="handleQuery"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleQuery">查询</el-button>
          <el-button :icon="Refresh" @click="resetQuery">清空</el-button>
          <el-button type="success" :icon="Plus"  @click="handleAdd">添加</el-button>
          <el-button type="danger" :icon="Delete" :disabled="ids.length === 0" @click="handleDelete">批量删除</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card>
      <el-table
        :data="UavCameraStateList"
        v-loading="loading"
        @selection-change="handleSelectionChange"
        highlight-current-row
        border>
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="categoryName" label="分组名称" width="100" />
        <el-table-column prop="cameraId" label="摄像头编号" width="100" />
        <el-table-column prop="cameraUrl" label="URL" width="400" />
        <el-table-column fixed="right" label="操作" >
          <template #default="scope">
            <el-button type="primary" link @click.stop="handleUpdate(scope.row)">修改</el-button>
            <el-button type="danger" link @click.stop="handleDelete(scope.row)">删除</el-button>
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

    <!-- 添加功能与修改功能弹窗菜单 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" @close="closeDialog">
      <el-form ref="dataFormRef" :model="cameraStateForm" :rules="rules" label-width="100px">
        <!-- el-form-item中的prop属性和输入框绑定的属性名必须一致，否则无法输入 -->
        <el-form-item label="产品分类" prop="categoryId">
<!--          根据机库名称得到机库的id-->
          <el-select v-model="cameraStateForm.categoryId" placeholder="选择分组名称">
            <el-option v-for="item in hangarCategoryList" :key="item.id" :label="item.hangarCategory" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="编号" prop="cameraId"  >
          <el-input v-model="cameraStateForm.cameraId" />
        </el-form-item>
        <el-form-item label="URL" prop="cameraUrl" >
          <el-input v-model="cameraStateForm.cameraUrl" />
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
import {reactive, ref, toRefs, onMounted} from "vue";
import {ElForm, ElMessage, ElMessageBox} from "element-plus";
import {Delete, Plus, Refresh, Search} from "@element-plus/icons-vue";
import {CameraStateForm, CameraStateQuery, UavCameraState} from "@/api/uav/camerastate/types";
import {listCameraStatePages, deleteCameraState, addCameraState, updateCameraState} from "@/api/uav/camerastate";
import {getHangarCategory} from "@/api/uav/camerahangar";

const dataFormRef = ref(ElForm);
const queryFormRef = ref(ElForm);
const state = reactive({
  loading: true,
  ids: [] as number[],  // 选中的ID
  total: 0,  // 总条数
  UavCameraStateList: [] as UavCameraState[],
  queryParams: {pageNum: 1, pageSize: 10} as CameraStateQuery,
  dialog: {title: '', visible: false} as DialogType,
  rules: {categoryId: [{ required: true, message: '请输入分类id', trigger: 'blur' },],
          cameraId: [{ required: true, message: '请输入摄像头编号', trigger: 'blur' },],
          cameraUrl: [{ required: true, message: '请输入摄像头的URL地址', trigger: 'blur' },], },
  cameraStateForm: {} as CameraStateForm,
  hangarCategoryList: {},
});

const {
  loading,
  ids,
  total,
  UavCameraStateList,
  queryParams,
  dialog,
  rules,
  cameraStateForm,
  hangarCategoryList,

} = toRefs(state)

//查询
function handleQuery(){
  loading.value = true;
  listCameraStatePages(state.queryParams).then(({data}) => {
    state.UavCameraStateList = data.list;
    state.total = data.total;
    loading.value = false;
  })
}

function resetQuery(){
  queryFormRef.value.resetFields();
  handleQuery();
}

function handleAdd(){
  dialog.value ={title: '添加', visible: true};
}

function handleSubmit(){
  loading.value = true;
  dataFormRef.value.validate((valid: any) => {
    if(valid){
      //  修改操作
      if(state.cameraStateForm.id){
        updateCameraState(state.cameraStateForm).then(() => {
          ElMessage.success('修改成功');
          closeDialog();
          handleQuery();
          loading.value = false;
        });
      }else {
        //添加操作
        addCameraState(state.cameraStateForm).then(() => {
          ElMessage.success('添加成功');
          closeDialog();
          handleQuery();
          loading.value = false;
        });
      }
    }
  })
}

function handleDelete(row: any){
  const ids = [row.id || state.ids].join(',');
  ElMessageBox.confirm('确认删除已选中的数据项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteCameraState(ids).then(() => {
      ElMessage.success('删除成功');
      handleQuery();
    });
  }).catch(() => ElMessage.info('已取消删除'));
}

function handleUpdate(row: any){
  dialog.value = {title: '修改', visible: true};
  const row_id = row.id || state.ids;
  const selectedData = state.UavCameraStateList.find((item) => {
    if(item.id === row_id){
      return item;
    }
  });
  state.cameraStateForm.id = row_id;
  if(selectedData !== undefined){
    state.cameraStateForm = selectedData;
  }
}

//获取机库表格相关数据
function fetchHangarCategoryInfo(){
  getHangarCategory().then(({data}) => {
    state.hangarCategoryList = data;
  });
}

function handleSelectionChange(selection: any) {
  state.ids = selection.map((item: any) => item.id);
}

function closeDialog(){
  dialog.value.visible = false;
  loading.value = false;
}

onMounted(() => {
  fetchHangarCategoryInfo();
  handleQuery();
});
</script>

<style scoped>

</style>
