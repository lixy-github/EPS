<template>
<div>
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
              <!-- <Select v-model="editorProductionTask.custom" filterable>
                <Option
                  v-for="item in this.constomer"
                  :value="item.id"
                  :key="item.username"
                >{{item.username}}</Option>
              </Select> -->
              <Input v-model="editorProductionTask.custom"/>
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
        <div style="display:flex;margin:auto;justify-content:center">
        <Form  :label-width="90" :model="addOutgoingTable" inline>
          <FormItem label="外加工单位" prop="custom" style="width:250px">
            <Select filterable v-model="addOutgoingTable.cid">
              <Option v-for="item in this.constomer" :value="item.id" :key="item.username">{{item.username}}</Option>
            </Select>
          </FormItem>
          <FormItem label="合同交期" prop="detailDeliveryData" style="width:250px">
            <DatePicker type="datetime" v-model="addOutgoingTable.detailDeliveryData"></DatePicker>
          </FormItem>
          <FormItem label="工序" prop="detailProcedures" style="min-width:287px">
            <Select v-model="addOutgoingTable.detailProcedures" multiple>
              <Option v-for="item in Process" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Form>
        </div>
        <Table ref="selection" :columns="outgoingTile" :data="editCertificatesList" @on-selection-change="selectTouch" style="margin:auto">
            <!-- <template slot-scope="{ row, index }" slot="cid">
              <Select style="width:150px;" v-model="editCertificatesList[0].cid" :disabled="index>0"> 
                <Option v-for="item in constomer" :value="item.id" :key="item.id">{{item.username}}</Option>
              </Select>
            </template> -->
            <!-- 工序 -->
            <!-- <template slot-scope="{row, index }" slot="selects" v-for="i in editCertificatesList.length">
              <CheckboxGroup :key='i' @on-change="test">
                  <Checkbox>{{index}}</Checkbox>
              </CheckboxGroup>
            </template> -->
            <!-- 颜色 -->
            <template slot-scope="{ row, index }" slot="color">
              <!-- <Select v-model="editCertificatesList[index].color">
                <Option  v-for="item in allColour" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select> -->
              <Input type="text" v-model="editCertificatesListCb[index].color"/>
            </template>
            <!-- 尺码 -->
            <template slot-scope="{ row, index }" slot="size">
              <Select v-model="editCertificatesListCb[index].size">
                <Option v-for="item in size" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </template>
            <!-- 数量 -->
            <template slot-scope="{ row, index }" slot="qty">
              <Input type="text" v-model="editCertificatesListCb[index].qty" @on-keyup="TableE($event)"/>
            </template>
            <!-- 合同交期 -->
            <!-- <template slot-scope="{ row, index }" slot="deliveryData">
              <DatePicker type="datetime" v-model="editCertificatesList[0].detailDeliveryData" :disabled="index>0"></DatePicker>
            </template> -->
            <!-- 操作 -->
            <!-- <template slot-scope="{row}" slot="action"> -->
              <!-- <Button @click="addOutgoingClik(row,index)">增加</Button> -->
              <!-- <Button @click="deleteOutgoingClik(row,index)">删除</Button> -->
              <!-- <Button type="success" @click="okList">修改</Button> -->
            <!-- </template> -->
        </Table>
        <div style="margin-left: 732px;color:red;" v-if="isShow">不能超过总数量</div>
        <!-- <Spin ref="Aloadding"></Spin> -->
        <div v-if="spinShow">
          <Spin fix>
                <Icon type="ios-loading" size=30 class="demo-spin-icon-load"></Icon>
            </Spin>
        </div>
      </div>

      <div slot="footer">
        <!-- <Button type="dashed" style="margin-left:119px" @click="addCertificates()" icon="md-add">添加</Button> -->
        <Button type="success" @click="okList">修改</Button>
        <Button @click="cancel">取消</Button>
      </div>
      
    </Modal>
    <div>
      <Table border :columns="columns" :data="dataTable">
        <template slot-scope="{row, index}" slot="action">
          <div>
            <Icon type="ios-create-outline" size="20" @click="edit(row,index)"/>
            <Icon type="ios-eye-outline" size="20" @click="openToview(row)"/>
            <Icon type="ios-trash-outline" size="20" @click="remove(row,index)"/>
          </div>
        </template>
      </Table>
      <div v-if="spinShow">
        <Spin fix>
            <Icon type="ios-loading" size=30 class="demo-spin-icon-load"></Icon>
        </Spin>
      </div>
    </div>
  </div>
  <div>
    <!-- 查看 半屏-->
    <Drawer
      v-model="view"
      width="60%"
      :loading="ed"
      fullscreen
      title="查看外发任务"
      @on-cancel="cancel">
      <div>
        <img style="width:200px;height:200px" :src="uploadAction+this.viewContent.photo">
      </div>
      <div style="float: left;margin-top: -194px;margin-left: 222px;">
        <span style="font-size:16px;margin-right:17px">生产单号:
          <span style="font-size:14px">{{viewContent.moCode}}</span>
        </span>
        <span style="font-size:16px;margin-right:17px">客户名称:
          <span style="font-size:14px">{{viewContent.custom}}</span>
        </span>
        <span style="font-size:16px;margin-right:17px">客户款号:
          <span style="font-size:14px">{{viewContent.customCode}}</span>
        </span>
        <span style="font-size:16px;margin-right:17px">款号:
          <span style="font-size:14px">{{viewContent.styleCode}}</span>
        </span>
      </div>
      <div style="float: left;margin-top:-121px ;margin-left: 222px;">
        <span style="font-size:16px;margin-right:17px">合同交期:
          <span style="font-size:14px">{{viewContent.deliveryData}}</span>
        </span>
        <span style="font-size:16px;margin-right:17px">品牌:
          <span style="font-size:14px">{{viewContent.brand}}</span>
        </span>
        <span style="font-size:16px;margin-right:17px">总数量:
          <span style="font-size:14px">{{viewContent.qty}} {{viewContent.unit}}</span>
        </span>
      </div>
      <div style="float: left;margin-top:-51px ;margin-left: 222px;">
        <span style="font-size:16px;margin-right:17px">备注说明:
          <span style="font-size:14px">{{viewContent.memo}}</span>
        </span>
      </div>
      <div style="margin-top:20px">
        <Table :columns="lookProduction" :data="data10" border></Table>
      </div>
      <div v-if="spinShow">
        <Spin fix>
              <Icon type="ios-loading" size=30 class="demo-spin-icon-load"></Icon>
          </Spin>
      </div>
    </Drawer>
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
  searlist,
  productionTaskEdit
} from "../../../api/production/productionTask.js";
export default {
  props: {
    row: Object,
    toView: Function
  },
  data() {
    return {
      spinShow:true,
      isShow:false,
      editCertificatesListCb:[
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
      addOutgoingTable:{},
      ed:true,
      viewContent: {},
      view:false,
      data10:[],
      editSelectData:[],
      checkboxarr: [],
      tscheckboxarr: [],
      outgoingTile: [
        // {
          // width:"44px",
          // align:'center',
          // type: 'selection',
          // slot: 'selects'
          // render: (h, params) => {
          //   return h('CheckboxGroup', {
          //     props: {
          //       value: this.checkboxarr
          //     },
          //     on: {
          //       'on-change': (data) => {
          //         this.checkboxarr = data
          //         console.log(this.checkboxarr)
          //         // this.tscheckboxarr.push(...data)
          //         // console.log(this.tscheckboxarr)
          //         // this.checkboxarr = [...new Set(this.tscheckboxarr)]
          //         // console.log(this.checkboxarr)
          //       }
          //     }
          //   }, [
          //     h('Checkbox', {
          //       props: {
          //         label: params.index
          //       }
          //     })
          //   ], '')
          // }
        // },
        // {
        //   width:"170px",
        //   title: '外加工单位',
        //   align:'center',
        //   slot: 'cid',
        // },
        // {
        //   title: '工序',
        //   align:'center',
        //   width:"170px",
        //   slot: 'procedures'
        // },
        // {
        //   title: '合同交期',
        //   align:'center',
        //   width:"190px",
        //   slot: 'deliveryData',
        // },
        {
          title: '尺码',
          align:'center',
          slot: 'size',
        },
        {
          title: '颜色',
          align:'center',
          slot: 'color',
        },
        {
          title: '数量',
          align:'center',
          slot: 'qty',
        },
        // {
        //   title: '操作',
        //   align:'center',
        //   slot: 'action',
        //   width: "160px"
        // },
      ],
      lookProduction: [
        {
          title: "颜色",
          align: "center",
          width: "80px",
          key: "color"
        },
        {
          title: "尺码",
          width: "70px",
          align: "center",
          key: "size"
        },
        {
          title: "计划数",
          align: "center",
          width: "100px",
          key: "qty"
        },
        {
          title: "横机",
          align: "center",
          children: [
            {
              title: "完成数",
              key: "",
              aligin: "center",
              width: "75px"
            },
            {
              title: "比例",
              key: "",
              aligin: "center",
              width: "70px"
            }
          ]
        },
        {
          title: "套口",
          align: "center",
          children: [
            {
              title: "完成数",
              key: "",
              aligin: "center",
              width: "75px"
            },
            {
              title: "比例",
              key: "",
              aligin: "center",
              width: "70px"
            }
          ]
        },
        {
          title: "洗整",
          align: "center",
          children: [
            {
              title: "完成数",
              key: "",
              aligin: "center",
              width: "75px"
            },
            {
              title: "比例",
              key: "",
              aligin: "center",
              width: "70px"
            }
          ]
        },
        {
          title: "包装",
          align: "center",
          children: [
            {
              title: "完成数",
              key: "",
              aligin: "center",
              width: "75px"
            },
            {
              title: "比例",
              width: "70px",
              key: "",
              aligin: "center"
            }
          ]
        },
        {
          title: "合计",
          align: "center"
        }
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
          // render:(h,params) => {
          //   return h('span',params.row.detailDeliveryData.slice(0,-5).replace(/T/g," "))
          // }
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
    TableE(e){
      let a = 0
      this.editCertificatesListCb.forEach(val => {
        a += parseInt(val.qty)
      })
     if(a>this.editorProductionTask.qty){
       this.isShow = true
     }else{
       this.isShow = false
     }
    },
    // 发送页面选择按钮
    selectTouch(selection){
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
    //显示
    openToview(row){
      // this.toView(this.row)
      this.ed = false;
      this.$nextTick(() => {
        this.ed = true;
      });
      this.view = true
      this.searchalls.id = row.id;
      searlist(this.searchalls).then(res => {
        // 头部
        res.data[1].productionTasks.procedures = res.data[1].productionTasks.procedures.split(",")
        this.viewContent = res.data[1].productionTasks
        // 尾部 
        res.data[0].dcMoDetail.forEach( (val) => {
          val.detailProcedures = val.detailProcedures.split(",")
        })
        this.data10 =  res.data[0].dcMoDetail
        this.spinShow = false
        // this.$refs.Outsourcingtasks.toggleSpin = false
      })
    },
    // 表格数据
    getTableData() {
      let aaa = [];
      this.search.id = this.row.id;
      outgoingEdit(this.search).then(res => {
        res.data.content.forEach(val => {
          val.deliveryData = this.row.deliveryData;
          aaa.push(val);
        });
      });
      this.dataTable = aaa;
      this.spinShow = false
    },
    //修改确定
    okList() {
      this.editor = true;
      this.$nextTick(() => {
        this.editor = false;
      });
      if(this.addOutgoingTable.cid){
        this.editorProductionTask.cid = this.addOutgoingTable.cid
      }
      this.editorProductionTask.procedures = this.editorProductionTask.procedures.join(",")
      // this.editorProductionTask.cid=this.editSelectData.cid 
      productionTaskEdit(this.editorProductionTask).then( res => {
        //修改尾部
          this.editCertificatesListCb.forEach(val => {
            // this.editorProductionTask.qty += parseInt(val.qty);
            // val.moCode = this.editorProductionTask.moCode;
            // val.moId = res.data.id;
            val.detailDeliveryData = this.addOutgoingTable.detailDeliveryData;
            val.detailProcedures = this.addOutgoingTable.detailProcedures;
            if(typeof val.detailProcedures != "string"){
              val.detailProcedures = val.detailProcedures.join(",")
            }
            // AdddcMoDetail(val).then(res => {});
            modifyProductionTask(val).then(res => {
              this.getTableData()
            })
          });
      })
      // this.$refs.selection.selectAll(true);
      // this.editCertificatesList.forEach(val=>{
      //       val.moCode = this.editorProductionTask.moCode;
      //       val.moId = this.editorProductionTask.id;
      //   })
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
          productionTaskDelete(row.id).then(res => {
            this.getTableData();
          });
        }
      });
    },
    //编辑
    edit(row) {
      this.editor = true;
      this.searchalls.id = row.id;
      let footerDate = [];
      searlist(this.searchalls).then(res => {
        // 头部
        res.data[1].productionTasks.procedures = res.data[1].productionTasks.procedures.split(",")
        this.editorProductionTask = res.data[1].productionTasks
        // 尾部 
        res.data[0].dcMoDetail.forEach( (val) => {
          val.detailProcedures = val.detailProcedures.split(",")
          val.cid = res.data[1].productionTasks.cid;
        })
        this.editCertificatesList =  res.data[0].dcMoDetail;
        this.addOutgoingTable = res.data[0].dcMoDetail[0]
        this.editCertificatesListCb = JSON.parse(JSON.stringify(this.editCertificatesList))
        this.spinShow = false
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
  .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>