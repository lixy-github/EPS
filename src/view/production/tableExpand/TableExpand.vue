<template>
  <div>
    <!-- 编辑内容 -->
    <Modal v-model="editor" :loading="ed" fullscreen title="编辑发送任务">
      <div style="width:910px;margin:auto">
        <Form ref="editorProductionRef" :model="editorProductionTask" :label-width="100" inline>
          <FormItem label="照片" prop="photo">
            <div
              class="demo-upload-list"
              v-if="this.editorProductionTask.photo && this.editorProductionTask.photo!=''"
              :key="1"
            >
              <img :src="uploadAction+this.editorProductionTask.photo">
            </div>
            <Upload
              v-else
              :key="2"
              ref="upload"
              :show-upload-list="false"
              accept="image/jpg, image/jpeg, image/png"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              type="drag"
              :action="uploadAction+'/api/public/upload'"
              style="display:inline-block;"
            >
              <div style="width: 150px;height:150px;line-height: 150px;">
                <Icon type="ios-camera" size="60"></Icon>
              </div>
            </Upload>
          </FormItem>
          <FormItem label="产品名称" prop="product" style="width:492px">
            <Input v-model="editorProductionTask.product" disabled/>
          </FormItem>
          <div style="margin-top: -127px;margin-left: 263px;">
            <FormItem label="客户名称" prop="custom" style="width:240px">
              <Select v-model="editorProductionTask.custom" filterable>
                <Option
                  v-for="item in this.constomer"
                  :value="item.id"
                  :key="item.username"
                >{{item.username}}</Option>
              </Select>
            </FormItem>
            <FormItem label="生产单号" prop="moCode">
              <Input v-model="editorProductionTask.moCode" disabled/>
            </FormItem>
            <FormItem label="款号" prop="styleCode">
              <Input v-model="editorProductionTask.styleCode" disabled/>
            </FormItem>
            <FormItem label="客户款号" prop="customCode">
              <Input v-model="editorProductionTask.customCode" disabled/>
            </FormItem>
          </div>
          <FormItem label="品牌" prop="brand">
            <Input v-model="editorProductionTask.brand" disabled/>
          </FormItem>
          <FormItem label="针数" prop="pins" style="margin-left: 8px;">
            <Input v-model="editorProductionTask.pins" disabled/>
          </FormItem>
          <FormItem label="合同交期" prop="deliveryData" style="width:240px">
            <DatePicker  type="datetime" v-model="editorProductionTask.deliveryData"></DatePicker>
          </FormItem>
          <FormItem label="计量单位" prop="unit" style="width:240px">
            <Select v-model="editorProductionTask.unit" disabled>
              <Option value="件">件</Option>
              <Option value="包">包</Option>
            </Select>
          </FormItem>
          <FormItem label="总数量" prop="qty" style="margin-left: 8px;">
            <Input v-model="editorProductionTask.qty"/>
          </FormItem>
          <FormItem label="工序" prop="procedures" style="min-width:240px">
            <Select v-model="editorProductionTask.procedures" multiple>
              <Option v-for="item in Process" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <br>
          <FormItem label="备注说明" prop="memo" style="width:758px">
            <Input
              disabled
              type="textarea"
              :autosize="{minRows: 2,maxRows: 8}"
              v-model="editorProductionTask.memo"
            />
          </FormItem>
        </Form>
        <Divider id="titleStyle">生产任务详情</Divider>
        <!-- 生产任务 -->
        <!-- <Form :label-width="80" inline>
          <div style="display:flex;justify-content:space-around;width:593px;font-size:13px;margin-bottom:7px;margin-left: 124px;">
            <div>外加工单位</div>
            <div style="margin-left:30px">颜色</div>
            <div>尺码</div>
            <div>数量</div>
          </div>
          <FormItem v-for="(item,index) in this.editCertificatesList" :key="index">
            <FormItem label prop="outgoingId" style="width:220px;margin-left:26px">
              <Select v-model="item.OutgoingId">
                <Option v-for="item in constomer" :value="item.id" :key="item.id">{{item.username}}</Option>
              </Select>
            </FormItem>
            <FormItem label prop="color" style="width:100px;">
              <Select v-model="item.color">
                <Option v-for="item in allColour" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
            <FormItem label prop="size" style="width:100px;margin-left: 12px;">
              <Select v-model="item.size">
                <Option v-for="item in size" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
            <FormItem label prop="qty" style="width:100px;margin-left: 10px;">
              <Input v-model="item.qty" placeholder="请输入数量"/>
            </FormItem>
            <Button type="primary" style="margin-left: 6px;" @click="editHandleRemove(index,item.id)">删除</Button>
          </FormItem>
        </Form> -->
        
        <Table ref="selection" :columns="outgoingTile" :data="editCertificatesList" @on-selection-change="selectTouch">
             <template slot-scope="{ row, index }" slot="cid">
                <Select style="width:150px" v-model="editCertificatesList[index].cid"> 
                  <Option v-for="item in constomer" :value="item.id" :key="item.id">{{item.username}}</Option>
                </Select>
            </template>
            <!-- 工序 -->
            <template slot-scope="{row, index }" slot="procedures">
              <CheckboxGroup v-model="editCertificatesList[index].detailProcedures">
                  <Checkbox label="横机"></Checkbox>
                  <Checkbox label="套口"></Checkbox>
                  <Checkbox label="洗整"></Checkbox>
                  <Checkbox label="包装"></Checkbox>
              </CheckboxGroup>
            </template>
            <!-- 颜色 -->
            <template slot-scope="{ row, index }" slot="color">
              <Select v-model="editCertificatesList[index].color" style="width:65px">
                <Option  v-for="item in allColour" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </template>
            <!-- 尺码 -->
            <template slot-scope="{ row, index }" slot="size">
              <Select v-model="editCertificatesList[index].size" style="width:60px">
                <Option v-for="item in size" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </template>
            <!-- 数量 -->
            <template slot-scope="{ row, index }" slot="qty">
              <Input style="width:60px" type="text" v-model="editCertificatesList[index].qty"/>
            </template>
            <!-- 合同交期 -->
            <template slot-scope="{ row, index }" slot="deliveryData">
              <DatePicker style="width:127px" type="datetime" v-model="editCertificatesList[index].detailDeliveryData"></DatePicker>
            </template>
            <!-- 操作 -->
            <template slot-scope="{row}" slot="action">
              <!-- <Button @click="addOutgoingClik(row,index)">增加</Button> -->
              <!-- <Button @click="deleteOutgoingClik(row,index)">删除</Button> -->
              <Button type="success" @click="okList">修改</Button>
            </template>
        </Table>
        <!-- <Spin ref="Outsourcingtasks"></Spin> -->
      </div>

      <div slot="footer">
        <!-- <Button type="dashed" style="margin-left:119px" @click="addCertificates()" icon="md-add">添加</Button> -->
        <Button @click="cancel">取消</Button>
        <!-- <Button type="success" @click="okList">修改</Button> -->
      </div>
      
    </Modal>
    <div>
      <Table border :columns="columns" :data="dataTable">
        <template slot-scope="{row, index}" slot="action">
          <div>
            <Icon type="ios-create-outline" size="20" @click="edit(row,index)"/>
            <Icon type="ios-eye-outline" size="20" @click="openToview"/>
            <Icon type="ios-trash-outline" size="20" @click="remove(row,index)"/>
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
import axios from "../../../libs/AxiosPlugin";
import Storage from "../../../libs/Storage";
import Spin from "../../spin/spin";
import {
  deleteProduction,
  productiontasksFindall,
  productionTaskDelete,
  outgoingEdit,
  userList,
  AdddcMoDetail,
  modityUpdate,
  productionTasks,
  modifyProductionTask,
  searlist
} from "../../../api/production/productionTask.js";
export default {
  props: {
    row: Object,
    toView: Function
  },
  data() {
    return {
      editSelectData:[],
      outgoingTile: [
        {
          width:"44px",
          align:'center',
          type: 'selection',
        },
        {
          width:"170px",
          title: '外加工单位',
          align:'center',
          slot: 'cid',
        },
        {
          title: '工序',
          align:'center',
          width:'148px',
          slot: 'procedures'
        },
        {
          title: '颜色',
          align:'center',
          slot: 'color',
          width:"83px"
        },
        {
          title: '尺码',
          align:'center',
          slot: 'size',
          width:"78px"
        },
        {
          title: '数量',
          align:'center',
          slot: 'qty',
          width:"78px"
        },
        {
          title: '合同交期',
          align:'center',
          width:'147px',
          slot: 'deliveryData',
        },
        {
          title: '操作',
          align:'center',
          slot: 'action',
          width: "160px"
        },
      ],
      editorProductionTask: {},
      editInfo:{
            ids:[],
            jsonString:""
        },
      editCertificatesList: [
        {
          outgoingId: "",
          cid: "",
          bzQty: "",
          color: "",
          fzQty: "",
          hjQty: "",
          qty: "",
          size: "",
          tjQty: "",
          ztQty: "",
          moCode: ""
        }
      ],
      Process: [
        {
          value: "横机",
          label: "横机"
        },
        {
          value: "套口",
          label: "套口"
        },
        {
          value: "洗整",
          label: "洗整"
        },

        {
          value: "包装",
          label: "包装"
        }
      ],
      size: [
        {
          value: "S",
          label: "S"
        },
        {
          value: "M",
          label: "M"
        },
        {
          value: "L",
          label: "L"
        },
        {
          value: "XL",
          label: "XL"
        },
        {
          value: "XXL",
          label: "XXL"
        },
        {
          value: "3XL",
          label: "3XL"
        }
      ],
      allColour: [
        {
          value: "红色",
          label: "红色"
        },
        {
          value: "藏青",
          label: "藏青"
        }
      ],
      constomer: [],
      search: {
        id: ""
      },
      uploadAction: process.env.API_URL,
      searchalls: {
        id: ""
      },
      ed: false,
      editor: false,
      columns: [
        {
          title: "外加工单位",
          key: "username",
          align: "center",
          ellipsis: true,
          width: "250px",
        },
        {
          title: "工序",
          key: "detailProcedures",
          align: "center",
          ellipsis: true,
        },
        {
          title: "数量",
          key: "qty",
          align: "center",
          ellipsis: true
        },
        {
          title: "交期",
          key: "detailDeliveryData",
          align: "center",
          ellipsis: true,
          render:(h,params) => {
            return h('span',params.row.detailDeliveryData.slice(0,-5).replace(/T/g," "))
          }
        },
        // {
        //   title: "工期",
        //   key: "deliveryData",
        //   align: "center",
        //   ellipsis: true
        // },
        {
          title: "完成率",
          key: "percent",
          align: "center",
          ellipsis: true,
          width: "130px"
        },
        {
          title: "操作",
          align: "center",
          width: 120,
          ellipsis: true,
          slot: "action"
        }
      ],
      dataTable: []
    };
  },
  methods: {
    // 发送页面选择按钮
    selectTouch(selection){
      console.log(selection)
      this.editSelectData = selection
    },
    //发送页面添加按钮
    addOutgoingClik(row,index){
      this.editCertificatesList.push(row)
    },
    //发送页面删除按钮
    deleteOutgoingClik(row,index){
      if(this.editCertificatesList.length>1){
        this.editCertificatesList.splice(index, 1);
      }
    },
    openToview(){
      this.toView(this.row)
    },
    // 表格数据
    getTableData() {
      let aaa = [];
      console.log(this.row)
      this.search.id = this.row.pid;
      outgoingEdit(this.search).then(res => {
        res.data.content.forEach(val => {
          val.deliveryData = this.row.deliveryData;
          aaa.push(val);
        });
      });
      this.dataTable = aaa;
    },
    //修改确定
    okList() {
      this.$refs.selection.selectAll(true);
      // this.editCertificatesList.forEach(val=>{
      //       val.moCode = this.editorProductionTask.moCode;
      //       val.moId = this.editorProductionTask.id;
      //   })
      this.editor = true;
      this.$nextTick(() => {
        this.editor = false;
      });
      this.editorProductionTask.procedures = this.editorProductionTask.procedures.join(",")
      productionTasks(this.editorProductionTask).then(res => {
        //修改尾部
        this.editSelectData.forEach(val => {
          // this.editorProductionTask.qty += parseInt(val.qty);
          val.moCode = this.editorProductionTask.moCode;
          val.moId = res.data.id;
          val.detailProcedures = val.detailProcedures.join(",")
          // AdddcMoDetail(val).then(res => {});
          modifyProductionTask(val).then(res => {
            this.getTableData()
          })
        });
      });
      // this.editInfo.jsonString = JSON.stringify(this.editSelectData);
      // modityUpdate(this.editInfo).then(res => {});
    },
    //添加尾部
    // addCertificates() {
    //   this.editCertificatesList.push({
    //     bzQty: "",
    //     color: "",
    //     fzQty: "",
    //     hjQty: "",
    //     qty: "",
    //     size: "",
    //     tjQty: "",
    //     ztQty: "",
    //     moCode: "",
    //     moId: ""
    //   });
    // },
    //删除尾部
    editHandleRemove(index, id) {
      if (id) {
        this.editInfo.ids.push(id);
      }
      if (this.editCertificatesList.length > 1) {
        this.editCertificatesList.splice(index, 1);
      }
    },
    //删除数据
    remove(row, index) {
      this.$Modal.confirm({
        title: "删除",
        content: "<p>确定要删除这条记录吗？</p>",
        onOk: () => {
          deleteProduction(row.id).then(res => {
            this.getTableData();
          });
        }
      });
    },
    //编辑
    edit(row) {
      // this.$refs.Outsourcingtasks.toggleSpin = true
      this.editor = true;
      this.searchalls.id = row.id;
      let footerDate = [];
      searlist(this.searchalls).then(res => {
        // 头部
        res.data[1].productionTasks.procedures = res.data[1].productionTasks.procedures.split(",")
        this.editorProductionTask = res.data[1].productionTasks
        // 尾部 
        res.data[0].dcMoDetail.detailProcedures  = res.data[0].dcMoDetail.detailProcedures.split(",")
        footerDate.push(res.data[0].dcMoDetail)
        this.editCertificatesList = footerDate
      })
      // productiontasksFindall(this.searchalls).then(res => {
      //   res.data.content[0].procedures = res.data.content[0].procedures.split(",")
      //   this.editorProductionTask = res.data.content[0];
      //   //获取尾部数据
      //   this.search.moCode = this.row.moCode;
      //   outgoingEdit(this.search).then(res => {
      //     this.editCertificatesList = [];
      //     res.data.content.forEach(val => {
      //       val.procedures = val.procedures.split(",")
      //     });
      //     this.editCertificatesList = res.data.content;
      //     // this.$refs.Outsourcingtasks.toggleSpin = false
      //   });
      // });
    },
    cancel() {
      this.editor = false;
    }
  },
  mounted() {
    userList().then(res => {
      this.constomer = res.data.content;
    });
    this.getTableData();
  }
};
</script>
<style scoped>
</style>