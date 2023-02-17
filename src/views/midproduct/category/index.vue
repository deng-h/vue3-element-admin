<template>
  <div class="app-container">
    <div class="top-container">
      <el-button v-hasPerm="['midprodcategory:add']" style="margin-right: 10px;" type="success" :icon="Plus" @click="addCategory">
        添加分组
      </el-button>

      <el-input v-model="inputSearch" placeholder="请输入分类名称" style="width: 260px; margin-right: 10px;" />
      <el-button v-hasPerm="['midprodcategory:list']" :icon="Search" type="primary" @click="fetchPageList">
        查询
      </el-button>
    </div>

    <el-card style="margin-top: 10px;">
      <el-table :data="midProCategoryList" v-loading="loading" highlight-current-row border style="font-size: 10px;">
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
    </el-card>

    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" @close="closeDialog">
      <el-form ref="midProCategoryRef" :model="midProCategory" :rules="validateRules" label-width="100px">
        <el-form-item label="分组名称"  prop="name" >
          <el-input v-model="midProCategory.name" />
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
import {MidProCategory} from "@/api/midproduct/types";

const state = reactive({
  loading: false,
  saveBtnDisabled: false,
  midProCategoryList: [{'name':'category'}] as MidProCategory[],
  midProCategory: {} as MidProCategory,
  dialog: {title: '', visible: false} as DialogType,
  ids: [] as number[],  // 选中的ID
  validateRules: {//注意 ： prop绑定的变量名要和 v-model绑定的变量名一样
    name: [{ required: true, message: '请输入分类名称', trigger: 'blur' },],},
});

const {
  loading,
  ids,
  midProCategoryList,
  midProCategory,
  dialog,
  saveBtnDisabled,
  validateRules
} = toRefs(state);

function addCategory(){
  dialog.value ={title: '添加分组', visible: true};
}

function fetchPageList(){

}

function closeDialog(){
  dialog.value.visible = false;
  loading.value = false;
}

function handleUpdate(row: any){
  state.midProCategory.name = row.name;
  state.midProCategory.gmt_create = row.name;
  state.midProCategory.gmt_modified = row.gmtModified;
  dialog.value ={title: '编辑', visible: true};
}
</script>

<style scoped>

</style>
