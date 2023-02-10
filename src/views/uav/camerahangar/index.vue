<template>
  <div class="app-container">
    <div class="search">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item prop="keywords">
          <el-input v-model="queryParams.keywords" placeholder="机库分组名" @keyup.enter="handleQuery"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleQuery">查询</el-button>
          <el-button :icon="Refresh" @click="resetQuery">清空</el-button>
          <el-button type="success" :icon="Plus"  @click="handleAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card>
      <el-table :data="UavCameraHangarList" v-loading="loading" highlight-current-row border>
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="hangarCategory" label="分组名称" width="100" />
        <el-table-column prop="gmtCreate" label="创建时间" width="300" />
        <el-table-column prop="gmtModified" label="更新时间" width="300" />
        <el-table-column label="操作" align="left">
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
      <el-form ref="dataFormRef" :model="cameraHangar" :rules="rules" label-width="100px">
        <!-- el-form-item中的prop属性和输入框绑定的属性名必须一致，否则无法输入 -->
        <el-form-item label="分组名称" prop="hangarCategory">
          <el-input v-model="cameraHangar.hangarCategory"/>
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
import {reactive, toRefs, onMounted, ref} from "vue";

import {
  listCameraHangarPages,
  deleteCameraHangars,
  addHangarCategory,
  updateCameraHangar
} from "@/api/uav/camerahangar";
import {CameraHangarQuery, UavCameraHangar} from "@/api/uav/camerahangar/types";
import {ElMessage, ElMessageBox, ElForm} from "element-plus";
import {Plus, Refresh, Search} from "@element-plus/icons-vue";

const queryFormRef = ref(ElForm);
const dataFormRef = ref(ElForm);

const state = reactive({
  loading: true,
  ids: [] as number[],  // 选中的ID
  total: 0,  // 总条数
  UavCameraHangarList: [] as UavCameraHangar[],
  queryParams: {pageNum: 1, pageSize: 10} as CameraHangarQuery,
  dialog: {title: '', visible: false} as DialogType,
  rules: {hangarCategory: [{required: true, message: '请输入分类名称', trigger: 'blur' }],},
  cameraHangar: {} as UavCameraHangar,
});

const {
  loading,
  ids,
  total,
  UavCameraHangarList,
  queryParams,
  dialog,
  rules,
  cameraHangar,
} = toRefs(state);

// 查询
function handleQuery() {
  loading.value = true;
  listCameraHangarPages(state.queryParams).then(({data}) => {
    state.UavCameraHangarList = data.list;
    state.total = data.total;
    state.loading = false;
  });
}

function handleUpdate(row: any){
  dialog.value = {title: '修改', visible: true};
  const row_id = row.id || state.ids;
  // 找到该行id所对应的完整数据，放到cameraHangar变量里
  const selectedData = state.UavCameraHangarList.find((item) => {
    if(item.id === row_id){
      return item;
    }
  });
  state.cameraHangar.id = row_id;
  if(selectedData !== undefined){
    state.cameraHangar = selectedData;
  }
}

function handleDelete(row: any){
  const ids = [row.id || state.ids].join(',');
  ElMessageBox.confirm('确认删除已选中的数据项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
      deleteCameraHangars(ids).then(() => {
        ElMessage.success('删除成功');
        handleQuery();
      });
    }).catch(() => ElMessage.info('已取消删除'));
}

// 重置查询
function resetQuery(){
  queryFormRef.value.resetFields();
  handleQuery();
}

function handleAdd(){
  dialog.value ={title: '添加', visible: true};
}

function closeDialog(){
  dialog.value.visible = false;
  loading.value = false;
}

function handleSubmit(){
  loading.value = true;
  dataFormRef.value.validate((valid: any) => {
    if(valid){
      // 修改操作
      if(state.cameraHangar.id){
        updateCameraHangar(state.cameraHangar.id, state.cameraHangar.hangarCategory).then(() => {
          ElMessage.success('修改成功');
          closeDialog();
          handleQuery();
          state.cameraHangar.hangarCategory = '';
          loading.value = false;
        })
      }else {
        //添加操作
        addHangarCategory(state.cameraHangar.hangarCategory).then(() => {
          ElMessage.success('分组添加成功');
          closeDialog();
          handleQuery();
          state.cameraHangar.hangarCategory = '';
          loading.value = false;
        }).catch(() => {
          state.cameraHangar.hangarCategory = '';
          loading.value = false;
        });
      }
    }
  });
}

onMounted(() => {
  handleQuery();
});
</script>

<style scoped>

</style>
