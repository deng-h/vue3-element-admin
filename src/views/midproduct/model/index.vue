<template>
  <div class="app-container">
    <div class="top-container">
      <el-button v-hasPerm="['midprodcategory:add']" style="margin-right: 10px;" :icon="Plus" type="success" @click="addModel">
        添加型号
      </el-button>
      <el-select style="width: 120px;margin-left: 10px;margin-right: 10px;" v-model="selcategory" placeholder="选择分类">
        <el-option
          v-for="item in categorylist"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-input v-model="inputSearch" placeholder="请输入型号名称" style="width: 260px; margin-right: 10px;" />
      <el-button v-hasPerm="['midprodcategory:list']" type="primary" :icon="Search" @click="fetchPageList">
        查询
      </el-button>
    </div>

    <el-card style="margin-top: 10px;">
      <el-table :data="midProModelList" v-loading="loading" highlight-current-row border style="font-size: 10px;">
        <el-table-column fixed type="index" align="center" label="序号" width="80"/>
        <el-table-column prop="model" align="center" label="型号" width="200"/>
        <el-table-column prop="name" align="center" label="型号名称" width="200"/>
        <el-table-column prop="category_name" align="center" label="所属分组" width="200"/>
        <el-table-column prop="gmtCreate" align="center" label="创建时间" width="200"/>
        <el-table-column prop="gmtModified" align="center" label="更新时间" width="200"/>
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
    </el-card>

    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" @close="closeDialog">
      <el-form ref="midProModelRef" :model="midProModel" :rules="validateRules" label-width="100px">
        <el-form-item label="产品分类" prop="category">
          <el-select style="width: 120px;margin-right: 10px;" v-model="selcategory" placeholder="选择分类">
            <el-option v-for="item in categorylist" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="型号(唯一)"  prop="model" >
          <el-input v-model="midProModel.model" />
        </el-form-item>

        <el-form-item label="型号名称"  prop="name" >
          <el-input v-model="midProModel.name" />
        </el-form-item>

        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" :disabled="saveBtnDisabled" @click="handleSubmit">确 定</el-button>
            <el-button @click="closeDialog">取 消</el-button>
          </div>
        </template>
      </el-form>
    </el-dialog>
  </div>

</template>

<script setup lang="ts">
import {reactive, toRefs, onMounted} from "vue";
import {MidProModel} from "@/api/midproduct/types";
import {Plus, Search} from "@element-plus/icons-vue";

const state = reactive({
  loading: false,
  midProModelList: [{'model': 'model', 'name': 'name'}] as MidProModel[],
  midProModel: {} as MidProModel,
  dialog: {title: '', visible: false} as DialogType,
  validateRules: reactive({//注意 ： prop绑定的变量名要和 v-model绑定的变量名一样
    category: [{ required: true, message: '请输入分类名称', trigger: 'blur',validator: validateCategory },],
    model: [{ required: true, message: '请输入分类名称', trigger: 'blur' },],
    name: [{ required: true, message: '请输入分类名称', trigger: 'blur' },],}),
});

const {
  loading,
  midProModelList,
  dialog,
  midProModel,
  validateRules,
} = toRefs(state);

function addModel(){
  dialog.value ={title: '添加型号', visible: true};
}

function closeDialog(){
  dialog.value.visible = false;
  loading.value = false;
}

function validateCategory(rule: any, value: any, callback: any){

}

function handleUpdate(row: any){
  state.midProModel.name = row.name;
  state.midProModel.model = row.model;
  state.midProModel.categoryId = row.categoryId;
  dialog.value ={title: '编辑', visible: true};
}
</script>

<style scoped>

</style>
