<template>
  <div class="app-container">
    <div class="top-container">
      <el-button style="margin-right: 10px;" :icon="Plus" type="success"  @click="addOrder" v-hasPerm="['order:add']">
        添加订单
      </el-button>

      <el-input v-model="inputSearch" placeholder="请输入订单编号或者规格/型号" style="width: 260px;margin-right: 20px;" />
      <el-button v-hasPerm="['order:list']" :icon="Search" type="primary" @click="clickFetchPageList">
        查询
      </el-button>
      <el-checkbox style="margin-left: 20px;"  @change="checkChange" v-model="allNotFinished">仅显示未完成订单</el-checkbox>
    </div>

    <el-card style="margin-top: 10px">
      <el-table :data="tableDatalist" v-loading="loading" highlight-current-row border style="font-size: 10px;">
        <el-table-column fixed prop="id" label="ID" width="50"/>
        <el-table-column fixed prop="orderNum" label="订单编号" width="180"/>
        <el-table-column prop="status" label="订单完成状态" width="135"/>
        <el-table-column prop="devid" label="设备地址" width="80"/>
        <el-table-column prop="specAndModels" label="规格/型号" width="80"/>
        <el-table-column prop="company" label="订货公司" width="80"/>
        <el-table-column prop="contactPerson" label="订货公司联系人" width="80"/>
        <el-table-column prop="contactPhonenum" label="联系人电话" width="80"/>
        <el-table-column prop="deliveryDates" label="交货日期" width="80"/>
        <el-table-column prop="orderQuantity" label="订货量(米)" width="80"/>
        <el-table-column prop="queueTime" label="预计排单时间" width="80"/>
        <el-table-column prop="responsible" label="责任人" width="80"/>
        <el-table-column prop="respPhonenum" label="责任人电话" width="80"/>
        <el-table-column prop="rawMaterial" label="原料" width="80"/>
        <el-table-column prop="lenAndWeight" label="支长(m)/根重(kg)" width="80"/>
        <el-table-column prop="thickness" label="壁厚(毫米)" width="80"/>
        <el-table-column prop="useStocks" label="使用库存数(米)" width="80"/>
        <el-table-column prop="remark" label="备注" width="80"/>
        <el-table-column prop="gmtCreate" label="创建时间" width="80"/>
        <el-table-column prop="gmtModified" label="更新时间" width="80"/>
      </el-table>
    </el-card>

    <el-dialog :title="dialog.title" v-model="dialog.visible" width="800px" @close="closeDialog">
      <el-form ref="orderRef" :model="order" :rules="validateRules" label-width="auto">
        <el-form-item>
          <el-col :span="12">
            <el-form-item  label="订单编号" prop="orderNum">
              <el-input placeholder="请注意不要填写重复的订单号" v-model="order.orderNum" style="width: 300px"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="订单状态" prop="status">
              <el-select v-model="order.status" filterable style="margin-bottom: 5px;" placeholder="请选择订单状态">
                <el-option v-for="item in statusList" :key="item.status" :label="item.label" :value="item.status"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="设备地址"  prop="devid" >
          <el-checkbox-group v-model="checkedDeviceList">
            <el-checkbox v-for="device in deviceList" :label="device.devid" :key="device.devid">{{device.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="规格/型号"  prop="specAndModels" >
          <el-input placeholder="与库存查询相关" @change="totalModelStocksSearch" v-model="order.specAndModels" />
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="订货公司" prop="company">
              <el-input v-model="order.company" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订货量(米)" prop="orderQuantity">
              <el-input v-model="order.orderQuantity" />
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="订货公司联系人" prop="contactPerson">
              <el-input v-model="order.contactPerson" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人电话" prop="contactPhonenum">
              <el-input v-model="order.contactPhonenum" />
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="交货日期" prop="deliveryDates">
              <el-date-picker
                v-model="order.deliveryDates"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="预计排单时间" prop="queueTime">
              <el-date-picker
                v-model="order.queueTime"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="责任人"  prop="responsible">
              <el-input v-model="order.responsible" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="责任人电话" prop="respPhonenum">
              <el-input v-model="order.respPhonenum" />
            </el-form-item>
          </el-col>
        </el-form-item>


        <el-form-item label="原料" prop="rawMaterial">
          <el-input v-model="order.rawMaterial" />
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="支长(m)/根重(kg)" prop="lenAndWeight">
              <el-input placeholder="与库存查询相关。不带单位，支长和根重中间以 '/' 隔开。如：30/40" @change="totalModelStocksSearch" v-model="order.lenAndWeight" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="壁厚(毫米)" prop="thickness">
              <el-input placeholder="与库存查询相关。不带单位" @change="totalModelStocksSearch" v-model="order.thickness" />
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <span class="demonstration">对应库存中的批次型号为[{{order.specAndModels + "," + order.lenAndWeight + "," + order.thickness}}]的已有库存数(米)：</span>
          <el-input placeholder="输入'规格/型号','支长/根重','壁厚'后，自动查询库存" style="width: 360px;" v-model="stocks" :disabled="true"/>
        </el-form-item>

        <el-form-item label="使用库存数(米)" prop="useStocks">
          <el-input v-model="order.useStocks" />
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="order.remark" />
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
import {Order} from "@/api/business/types";
import {Plus, Search} from "@element-plus/icons-vue";

const state = reactive({
  inputSearch: '',
  tableDatalist: [{'devid': '1'}, {'devid': '2'}],
  loading: false,
  total: 0,  // 总条数
  dialog: {title: '', visible: false} as DialogType,
  order: {} as Order,
  statusList: [{status: '0', label:'未完成'},
    {status: '1', label:'完成'}],
  deviceList: [{devid: '1', label: '1 (mpp315)', specAndModels: 'mpp315',},
    {devid: '2', label: '2 (mpp250)', specAndModels: 'mpp250',},
    {devid: '3', label: '3 (mpp250)', specAndModels: 'mpp250',},
    {devid: '4', label: '4 (pe160)', specAndModels: 'pe160',},
    {devid: '5', label: '5 (pe63)', specAndModels: 'pe63',},
    {devid: '6', label: '6 (gxpe63)', specAndModels: 'gxpe63',},
    {devid: '7', label: '7 (gxpe63)', specAndModels: 'gxpe63',},],
  validateRules: reactive({
    //注意 ： prop绑定的变量名要和 v-model绑定的变量名一样
    num: [{ required: true, message: '请输入订单编号', trigger: 'blur' },],
    status: [{ required: true, message: '请输入订单状态', trigger: 'blur' },],
    devid: [{ required: true, message: '请输入设备地址', trigger: 'blur' },],
    specAndModels: [{ required: true, message: '请输入规格/型号', trigger: 'blur' },],
    company: [{ required: true, message: '请输入订货公司', trigger: 'blur' },],
    contactPerson: [{ required: true, message: '请输入订货公司联系人', trigger: 'blur' },],
    contactPhonenum: [{ required: true, message: '请输入订货公司联系人电话', trigger: 'blur' },],
    deliveryDates: [{ required: true, message: '请输入交货日期', trigger: 'blur' },],
    orderQuantity: [{ required: true, message: '请输入订货量', trigger: 'blur' },],
    queueTime: [{ required: true, message: '请输入排单时间', trigger: 'blur' },],
    responsible: [{ required: true, message: '请输入责任人', trigger: 'blur' },],
    respPhonenum: [{ required: true, message: '请输入责任人电话', trigger: 'blur' },],
    rawMaterial: [{ required: true, message: '请输入原料', trigger: 'blur' },],
    lenAndWeight: [{ required: true, message: '请输入支长(m)/根重(kg)', trigger: 'blur' }, { validator: checkLenAndWeight, trigger: 'blur' }],
    thickness: [{ required: true, message: '请输入壁厚(mm)', trigger: 'blur' }, { validator: checkThickness, trigger: 'blur' }],
    useStocks: [{ required: true, message: '请输入使用库存数', trigger: 'blur' }, { validator: checkUseStocks, trigger: 'blur' }],
    remark: [{ required: true, message: '请输入备注', trigger: 'blur' },],}),
});

const {
  inputSearch,
  tableDatalist,
  loading,
  statusList,
  total,
  order,
  dialog,
  deviceList,
  validateRules
} = toRefs(state)
function clickFetchPageList(){

}

function checkChange(){

}

function addOrder(){
  dialog.value ={title: '添加订单', visible: true};
}

function closeDialog(){
  dialog.value.visible = false;
  loading.value = false;
}

function totalModelStocksSearch(){

}

function checkLenAndWeight(rule: any, value: any, callback: any){

}
function checkThickness(rule: any, value: any, callback: any){

}
function checkUseStocks(rule: any, value: any, callback: any){

}

function handleSubmit(){

}
</script>

<style scoped>

</style>
