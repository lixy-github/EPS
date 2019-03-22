<template>
  <div>
    <div>
      <div class="jggl-top clearfix">
        <div class="lt searchBox">
          <Form ref="searchFm" :model="searchFm" :label-width="65" inline>
            <!-- <FormItem prop="enterpriseName" label="企业名称" style="width:320px;" class="alone-dropdown">
                            <Select filterable v-model="searchFm.enterpriseName " clearable  placeholder="请选择">
                                <Option :value="company.name" v-for="company in companyList" :key="company.id" id="qy">{{ company.name }}</Option>
                            </Select>
            </FormItem>-->
            <FormItem prop="moCode" label="订单号" style="width:241px">
              <!-- <DatePicker type="datetime" v-model="searchFm.custom" style="width:141px"></DatePicker> -->
              <Input v-model="searchFm.moCode"/>
              <!-- <Select v-model="searchFm.custom" clearable filterable>
                                    <Option v-for="item in this.constomer" :value="item.id" :key="item.username">{{item.username}}</Option>
              </Select>-->
            </FormItem>
            <!-- <FormItem prop="endTime" label="---" style="width:241px;margin-left:-8%">
                            <DatePicker type="datetime" v-model="searchFm.endTime" style="width:141px"></DatePicker>
            </FormItem>-->
            <FormItem style="margin-left:-50px;">
              <Button type="primary" @click="searchBtn()" icon="ios-search">查询</Button>
            </FormItem>
          </Form>
        </div>
        <div class="rt">
          <Button type="primary" icon="md-add" @click="showAddRoad" class="iconWeight">新增</Button>
          <!-- <Button type="primary" icon="ios-upload-outline" @click="exportData()" class="iconWeight">导出</Button> -->
        </div>
      </div>
    </div>

    <!--增加 全屏-->
    <Modal :loading="add" fullscreen title="增加生产任务" v-model="modal1" :mask-closable="false">
      <div style="width:910px;margin:auto">
        <Form
          ref="productionRef"
          :model="addProductionTask"
          :rules="productionRules"
          :label-width="100"
          inline
        >
          <!-- 上传照片 -->
          <FormItem label="照片" prop="photo">
            <div
              class="demo-upload-list"
              v-if="this.addProductionTask.photo && this.addProductionTask.photo!=''"
              :key="1"
            >
              <img :src="uploadAction+this.addProductionTask.photo">
              <div class="demo-upload-list-cover">
                <Icon type="ios-trash-outline" @click.native="handleRemoveModify()"></Icon>
              </div>
            </div>
            <Upload
              v-else
              :key="2"
              ref="upload"
              :show-upload-list="false"
              accept="image/jpg, image/jpeg, image/png"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-success="handleSuccess"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :headers="headers"
              :data="uploadData"
              type="drag"
              :action="uploadAction+'/api/public/upload'"
              style="display:inline-block;"
            >
              <div style="width: 150px;height:150px;line-height: 150px;">
                <Icon type="ios-camera" size="60"></Icon>
              </div>
            </Upload>
          </FormItem>

          <div style="margin-top: -184px;margin-left: 263px;">
            <FormItem label="产品名称" prop="product" style="width:496px">
              <Input v-model="addProductionTask.product"/>
            </FormItem>
            <FormItem label="客户名称" prop="custom" style="width:240px">
              <Select v-model="addProductionTask.custom" filterable>
                <Option
                  v-for="item in this.constomer"
                  :value="item.id"
                  :key="item.username"
                >{{item.username}}</Option>
              </Select>
            </FormItem>
            <FormItem label="生产单号" prop="moCode">
              <Input v-model="addProductionTask.moCode"/>
            </FormItem>
            <FormItem label="款号" prop="styleCode">
              <Input v-model="addProductionTask.styleCode"/>
            </FormItem>
            <FormItem label="客户款号" prop="customCode">
              <Input v-model="addProductionTask.customCode"/>
            </FormItem>
          </div>
          <FormItem label="品牌" prop="brand">
            <Input v-model="addProductionTask.brand"/>
          </FormItem>
          <FormItem label="针数" prop="pins" style="margin-left: 8px;">
            <Input v-model="addProductionTask.pins"/>
          </FormItem>
          <FormItem label="合同交期" prop="deliveryData" style="width:240px">
            <DatePicker type="datetime" v-model="addProductionTask.deliveryData"></DatePicker>
          </FormItem>
          <FormItem label="工序" prop="procedures" style="min-width:240px">
            <Select v-model="addProductionTask.procedures" multiple>
              <Option v-for="item in Process" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="总数量" prop="qty" style="margin-left: 8px;">
            <Input v-model="addProductionTask.qty"/>
          </FormItem>
          <FormItem label="计量单位" prop="unit" style="width:240px">
            <Select v-model="addProductionTask.unit">
              <Option value="件">件</Option>
              <Option value="包">包</Option>
            </Select>
          </FormItem>
          <FormItem label="备注说明" prop="memo" style="width:755px">
            <Input
              type="textarea"
              :autosize="{minRows: 2,maxRows: 8}"
              v-model="addProductionTask.memo"
            />
          </FormItem>
        </Form>
        <Divider id="titleStyle">生产任务详情</Divider>
        <!-- 生产任务数量详情 -->
        <Form :label-width="80" inline>
          <div
            style="display:flex;justify-content:space-around;width:565px;font-size:13px;margin-bottom:7px"
          >
            <div style="margin-left: 98px;">颜色</div>
            <div>尺码</div>
            <div>数量</div>
          </div>
          <FormItem v-for="(item,index) in this.certificatesList" :key="index">
            <FormItem label prop="color" style="width:140px;margin-left:29px">
              <Select v-model="item.color">
                <Option
                  v-for="item in allColour"
                  :value="item.value"
                  :key="item.value"
                >{{item.label}}</Option>
              </Select>
            </FormItem>
            <FormItem label prop="size" style="width:140px;margin-left:9px">
              <Select v-model="item.size">
                <Option v-for="item in size" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
            <FormItem label prop="qty" style="width:140px;margin-left:9px">
              <Input v-model="item.qty" placeholder="请输入数量"/>
            </FormItem>
            <div style="margin-left: 62px;margin-top: -33px">
              <Button type="primary" style="margin-left:457px;" @click="handleRemove(index)">删除</Button>
            </div>
          </FormItem>
        </Form>
        <!-- <Spin ref="Aloadding"></Spin> -->
      </div>

      <div slot="footer">
        <Button type="dashed" @click="addCertificatesEdit" icon="md-add">添加</Button>
        <Button type="default" @click="cancel">取消</Button>
        <Button type="primary" @click="Addok">提交</Button>
      </div>
    </Modal>

    <!--编辑 全屏-->
    <Modal v-model="editor" :loading="ed" fullscreen title="编辑生产任务">
      <div style="width:910px;margin:auto">
        <Form
          ref="editorProductionRef"
          :model="editorProductionTask"
          :rules="productionRules"
          :label-width="100"
          inline
        >
          <!-- 上传照片 -->
          <FormItem label="照片" prop="photo">
            <div
              class="demo-upload-list"
              v-if="this.editorProductionTask.photo && this.editorProductionTask.photo!=''"
              :key="1"
            >
              <img :src="uploadAction+this.editorProductionTask.photo">
              <div class="demo-upload-list-cover">
                <Icon type="ios-trash-outline" @click.native="edihandleRemove()"></Icon>
              </div>
            </div>
            <Upload
              v-else
              :key="2"
              ref="upload"
              :show-upload-list="false"
              accept="image/jpg, image/jpeg, image/png"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-success="modifyHandleSuccess"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :headers="headers"
              :data="uploadData"
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
            <Input v-model="editorProductionTask.product"/>
          </FormItem>
          <div style="margin-top: -127px;margin-left: 263px;">
            <FormItem label="客户名称" prop="custom" style="width:240px">
              <Select v-model="editorProductionTask.custom" filterable>
                <Option
                  v-for="item in this.constomer"
                  :value="item.id"
                  :key="item.id"
                >{{item.username}}</Option>
              </Select>
            </FormItem>
            <FormItem label="生产单号" prop="moCode">
              <Input v-model="editorProductionTask.moCode"/>
            </FormItem>
            <FormItem label="款号" prop="styleCode">
              <Input v-model="editorProductionTask.styleCode"/>
            </FormItem>
            <FormItem label="客户款号" prop="customCode">
              <Input v-model="editorProductionTask.customCode"/>
            </FormItem>
          </div>
          <FormItem label="品牌" prop="brand">
            <Input v-model="editorProductionTask.brand"/>
          </FormItem>
          <FormItem label="针数" prop="pins" style="margin-left: 8px;">
            <Input v-model="editorProductionTask.pins"/>
          </FormItem>
          <FormItem label="合同交期" prop="deliveryData" style="width:240px">
            <DatePicker type="datetime" v-model="editorProductionTask.deliveryData"></DatePicker>
          </FormItem>
          <FormItem label="工序" prop="procedures" style="min-width:240px">
            <Select v-model="editorProductionTask.procedures" multiple>
              <Option v-for="item in Process" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="总数量" prop="qty" style="margin-left: 8px;">
            <Input v-model="editorProductionTask.qty"/>
          </FormItem>
          <FormItem label="计量单位" prop="unit" style="width:240px">
            <Select v-model="editorProductionTask.unit">
              <Option value="件">件</Option>
              <Option value="包">包</Option>
            </Select>
          </FormItem>
          <br>
          <FormItem label="备注说明" prop="memo" style="width:756px">
            <Input
              type="textarea"
              :autosize="{minRows: 2,maxRows: 8}"
              v-model="editorProductionTask.memo"
            />
          </FormItem>
        </Form>
        <Divider id="titleStyle">生产任务详情</Divider>
        <!-- 生产任务数量详情 -->
        <Form :label-width="80" inline>
          <div
            style="display:flex;justify-content:space-around;width:565px;font-size:13px;margin-bottom:7px"
          >
            <div style="margin-left: 98px;">颜色</div>
            <div>尺码</div>
            <div>数量</div>
          </div>
          <FormItem v-for="(item,index) in this.editCertificatesList" :key="index">
            <FormItem label prop="color" style="width:140px;margin-left:29px">
              <Select v-model="item.color">
                <Option
                  v-for="item in allColour"
                  :value="item.value"
                  :key="item.value"
                >{{item.label}}</Option>
              </Select>
            </FormItem>
            <FormItem label prop="size" style="width:140px;margin-left:9px">
              <Select v-model="item.size">
                <Option v-for="item in size" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
            <FormItem label prop="qty" style="width:140px;margin-left:9px">
              <Input v-model="item.qty" placeholder="请输入数量"/>
            </FormItem>
            <Button
              type="primary"
              style="margin-left: 6px;"
              @click="editHandleRemove(index,item.id)"
            >删除</Button>
          </FormItem>
        </Form>
        <Spin ref="Aloadding"></Spin>
      </div>

      <div slot="footer">
        <Button type="dashed" style="margin-left:119px" @click="addCertificates()" icon="md-add">添加</Button>
        <Button @click="cancel">取消</Button>
        <Button type="success" @click="ok">修改</Button>
      </div>
    </Modal>

    <!-- 外发 全屏-->
    <Modal v-model="outgoing" :loading="ed" fullscreen title="外发任务">
      <div style="width:910px;margin:auto">
        <Form
          ref="outgoingProductionRef"
          :model="outgoingProductionTask"
          :rules="productionRules"
          :label-width="100"
          inline>
          <!-- 上传照片 -->
          <FormItem label="照片" prop="photo">
            <div
              class="demo-upload-list"
              v-if="this.outgoingProductionTask.photo && this.outgoingProductionTask.photo!=''"
              :key="1">
              <img :src="uploadAction+this.outgoingProductionTask.photo">
            </div>
            <Upload
              v-else
              :key="2"
              ref="upload"
              :show-upload-list="false"
              accept="image/jpg, image/jpeg, image/png"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-success="modifyHandleSuccess"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :headers="headers"
              :data="uploadData"
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
            <Input v-model="outgoingProductionTask.product" disabled/>
          </FormItem>
          <div style="margin-top: -127px;margin-left: 263px;">
            <FormItem label="客户名称" prop="custom" style="width:240px" >
              <Select v-model="outgoingProductionTask.custom" filterable disabled>
                <Option
                  v-for="item in this.constomer"
                  :value="item.id"
                  :key="item.username"
                >{{item.username}}</Option>
              </Select>
            </FormItem>
            <FormItem label="生产单号" prop="moCode">
              <Input disabled v-model="outgoingProductionTask.moCode"/>
            </FormItem>
            <FormItem label="款号" prop="styleCode">
              <Input v-model="outgoingProductionTask.styleCode" disabled/>
            </FormItem>
            <FormItem label="客户款号" prop="customCode">
              <Input v-model="outgoingProductionTask.customCode" disabled/>
            </FormItem>
          </div>
          <FormItem label="品牌" prop="brand">
            <Input v-model="outgoingProductionTask.brand" disabled/>
          </FormItem>
          <FormItem label="针数" prop="pins" style="margin-left: 8px;">
            <Input v-model="outgoingProductionTask.pins"/>
          </FormItem>
          <FormItem label="合同交期" prop="deliveryData" style="width:240px">
            <DatePicker type="datetime" v-model="outgoingProductionTask.deliveryData"></DatePicker>
          </FormItem>
          <FormItem label="工序" prop="procedures" style="min-width:240px">
            <Select v-model="outgoingProductionTask.procedures" multiple>
              <Option v-for="item in Process" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="总数量" prop="qty" style="margin-left: 8px;">
            <Input v-model="outgoingProductionTask.qty"/>
          </FormItem>
          <FormItem label="计量单位" prop="unit" style="width:240px">
            <Select v-model="outgoingProductionTask.unit">
              <Option value="件">件</Option>
              <Option value="包">包</Option>
            </Select>
          </FormItem>
          <FormItem label="备注说明" prop="memo" style="width:758px">
            <Input
              type="textarea"
              :autosize="{minRows: 2,maxRows: 8}"
              v-model="outgoingProductionTask.memo"
            />
          </FormItem>
        </Form>
        <Divider id="titleStyle">外发任务</Divider>
        <!-- 生产任务数量详情 -->
        <!-- <Form :label-width="80" inline>
          <div style="display:flex;justify-content:space-around;width:593px;font-size:13px;margin-bottom:7px;margin-left: 124px;">
            <div>外加工单位</div>
            <div style="margin-left:30px">颜色</div>
            <div>尺码</div>
            <div>数量</div>
          </div>
          <FormItem v-for="(item,index) in outgoingCertificatesList" :key="index">
            <FormItem label prop="outgoingId" style="width:220px;margin-left:26px">
              <Select v-model="item.outgoingId">
                <Option v-for="item in constomer" :value="item.id" :key="item.id">{{item.username}}</Option>
              </Select>
            </FormItem>
            <FormItem label prop="color" style="width:100px;">
              <Select v-model="item.color">
                <Option
                  v-for="item in allColour"
                  :value="item.value"
                  :key="item.value"
                >{{item.label}}</Option>
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
            <Button type="primary" @click="outgoingHandleRemove(index,item.id)">删除</Button>
          </FormItem>
        </Form> -->
        <Table :columns="outgoingColumns" :data="outgoingCertificatesList" @on-selection-change="selectTouch">
             <template slot-scope="{ row, index }" slot="cid">
                <Select style="width:150px" v-model="outgoingCertificatesList[index].cid"> 
                  <Option v-for="item in constomer" :value="item.id" :key="item.id">{{item.username}}</Option>
                </Select>
            </template>
            <!-- 工序 -->
            <template slot-scope="{row, index }" slot="detailProcedures">
              <CheckboxGroup v-model="outgoingCertificatesList[index].detailProcedures">
                  <Checkbox label="横机"></Checkbox>
                  <Checkbox label="套口"></Checkbox>
                  <Checkbox label="洗整"></Checkbox>
                  <Checkbox label="包装"></Checkbox>
              </CheckboxGroup>
            </template>
            <!-- 颜色 -->
            <template slot-scope="{ row, index }" slot="color">
              <Select v-model="outgoingCertificatesList[index].color" style="width:65px">
                <Option  v-for="item in allColour" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </template>
            <!-- 尺码 -->
            <template slot-scope="{ row, index }" slot="size">
              <Select v-model="outgoingCertificatesList[index].size" style="width:60px">
                <Option v-for="item in size" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </template>
            <!-- 数量 -->
            <template slot-scope="{ row, index }" slot="qty">
              <Input style="width:60px" type="text" v-model="outgoingCertificatesList[index].qty"/>
            </template>
            <!-- 合同交期 -->
            <template slot-scope="{ row, index }" slot="deliveryData">
              <DatePicker style="width:127px" type="datetime" v-model="outgoingCertificatesList[index].detailDeliveryData"></DatePicker>
            </template>
            <!-- 操作 -->
            <template slot-scope="{ row,index }" slot="action">
              <Button @click="addOutgoingClik(row,index)">增加</Button>
              <Button @click="deleteOutgoingClik(row,index)">删除</Button>
            </template>
        </Table>
        <Spin ref="outgoingAloadding"></Spin>
      </div>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button @click="okOutgoing" type="success">发送</Button>
      </div>
    </Modal>

    <!-- 查看 半屏-->
    <Drawer
      v-model="view"
      width="60%"
      :loading="ed"
      fullscreen
      title="查看外发任务"
      @on-ok="ok"
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
        <span style="font-size:16px;margin-right:17px">计量单位:
          <span style="font-size:14px">{{viewContent.unit}}</span>
        </span>
        <span style="font-size:16px;margin-right:17px">总数量:
          <span style="font-size:14px">{{viewContent.qty}}</span>
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
      <Spin ref="lookAloadding"></Spin>
    </Drawer>

    <!-- 显示的表格 -->
    <div style="position:relative">
      <Table border :columns="columns" :data="dataTable">
        <template slot-scope="{row, index}" slot="action">
          <div>
            <Icon type="ios-paper-plane-outline" size="20" @click="outgoinghanldclick(row)"/>
            <Icon type="ios-eye-outline" size="20" @click="toView(row)"/>
            <Icon type="ios-create-outline" size="20" @click="edit(row,index)"/>
            <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row,index)">编辑</Button> -->
            <Icon type="ios-trash-outline" size="20" @click="remove(row,index)"/>
            <!-- <Button type="error" size="small" @click="remove(row,index)">删除</Button> -->
          </div>
        </template>
      </Table>
      <Spin ref="Aloadding2"></Spin>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <Page
        :total="total"
        size="small"
        show-elevator
        show-sizer
        show-total
        :current="currentPage+1"
        @on-change="changePage"
        @on-page-size-change="handleSizeChange"
      ></Page>
    </div>
  </div>
</template>
<script>
import Spin from "../spin/spin";
import axios from "../../libs/AxiosPlugin";
import Storage from "../../libs/Storage";
import TableExpand from "./tableExpand/TableExpand";
import {
  fileUpload,
  userList,
  productionTasks,
  productiontasksFindall,
  productionTaskDelete,
  productionTaskEdit,
  productionTaskFindbyid,
  AdddcMoDetail,
  searchall,
  TaskdetailChecklist,
  modifyProductionTask,
  modity,
  outgoingEdit,
  modityUpdate
} from "../../api/production/productionTask.js";
import { parse } from "semver";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error("请选择工序"));
      } else {
        callback();
      }
    };
    const validateCustom = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请选择客户名称"));
      } else {
        callback();
      }
    };
    return {
      selectData:[],
      editIndex: -1,
      count: 0,
      data10: [],
      viewContent: {},
      search: {
        moCode: ""
      },
      asdasd: [],
      outgoingColumns: [
        {
          width:"44px",
          align:'center',
          type: 'selection'
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
          slot: 'detailProcedures'
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
      data10: [
        {
          color: "红色",
          sizes: "Ml"
        }
      ],
      editInfo: {
        ids: [],
        jsonString: ""
      },
      Tasklist: [],
      Modify: [],
      cont: 0,
      view: false,
      outgoing: false,
      uploadAction: process.env.API_URL,
      uploadData: { folderName: "driver/head" },
      constomer: [],
      value3: false,
      ed: true,
      add: true,
      searchalls: {
        moCode: ""
      },
      detailChecklist: {
        moCode: ""
      },
      searchFm: {
        moCode: "",
        page: 0,
        size: 10,
        sort: "createTime,desc"
      },
      certificatesList: [
        {
          bzQty: "",
          color: "",
          fzQty: "",
          hjQty: "",
          qty: "",
          size: "",
          tjQty: "",
          ztQty: "",
          moCode: "",
          detailDeliveryData: "",
          detailProcedures: "",
        }
      ],
      editCertificatesList: [
        {
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
      outgoingCertificatesList: [
        {
          bzQty: "",
          color: "",
          fzQty: "",
          hjQty: "",
          qty: "",
          size: "",
          tjQty: "",
          ztQty: "",
          moCode: "",
          outgoingId: "",
          procedures:[],
          deliveryData:"",
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
      currentPage: 0,
      total: 0,
      dataTable: [],
      modal1: false,
      editor: false,
      editorProductionTask: {},
      productionRules: {
        moCode: [
          { required: true, message: "内容不能为空", trigger: "change" }
        ],
        custom: [
          { required: true, validator: validateCustom, trigger: "change" }
        ],
        customCode: [
          { required: true, message: "内容不能为空", trigger: "change" }
        ],
        styleCode: [
          { required: true, message: "内容不能为空", trigger: "change" }
        ],
        pins: [{ required: true, message: "内容不能为空", trigger: "change" }],
        procedures: [
          { required: true, validator: validatePass, trigger: "change" }
        ],
        // unit:[
        //     {required: true, message: "内容不能为空", trigger: "change" }
        // ],
        // qty:[
        //     {required: true, message: "内容不能为空", trigger: "change" }
        // ],
        color: [{ required: true, message: "内容不能为空", trigger: "change" }],
        size: [{ required: true, message: "内容不能为空", trigger: "change" }],
        brand: [{ required: true, message: "内容不能为空", trigger: "change" }]
      },
      addProductionTask: {
        deliveryData: "",
        styleCode: "",
        product: "",
        moCode: "",
        custom: "",
        customCode: "",
        styleCode: "",
        pins: "",
        memo: "",
        qty: 0,
        color: "",
        size: "",
        brand: "",
        unit: "件",
        procedures: "",
        photo: "",
        moId: ""
      },
      outgoingProductionTask: {
        deliveryData: "",
        styleCode: "",
        product: "",
        moCode: "",
        custom: "",
        customCode: "",
        styleCode: "",
        pins: "",
        memo: "",
        qty: 0,
        color: "",
        size: "",
        brand: "",
        unit: "件",
        procedures: "",
        photo: ""
      },
      columns: [
        {
          title: "展开",
          align: "center",
          ellipsis: true,
          width: 60,
          type: "expand",
          render: (h, params) => {
            return h(TableExpand, {
              props: {
                row: params.row,
                toView: this.toView
              }
            });
          }
        },
        {
          title: "产品名称",
          key: "product",
          align: "center",
          ellipsis: true
        },
        {
          title: "产品图",
          align: "center",
          ellipsis: true,
          key: "age",
          render: (h, params) => {
            return h("div", [
              h("img", {
                attrs: {
                  src: this.uploadAction + params.row.photo
                },
                style: {
                  width: "85px",
                  height: "50px",
                  marginTop: "7px"
                }
              })
            ]);
          }
        },
        {
          title: "生产单号",
          key: "moCode",
          align: "center",
          ellipsis: true,
          sortable: true
        },
        {
          title: "款号",
          key: "styleCode",
          align: "center",
          ellipsis: true
        },
        {
          title: "数量",
          key: "qty",
          align: "center",
          ellipsis: true
        },
        {
          title: "工期",
          width: 151,
          key: "deliveryData",
          align: "center",
          ellipsis: true,
          sortable: true
        },
        // {
        //     title: '客户名称',
        //     key: "custom",
        //     align: "center",
        //     ellipsis: true,
        // },
        {
          title: "品牌",
          key: "brand",
          align: "center",
          ellipsis: true
        },
        {
          title: "工序",
          key: "procedures",
          align: "center",
          ellipsis: true,
        },
        {
          title: "完成率",
          key: "",
          align: "center"
        },
        {
          title: "操作",
          key: "",
          slot: "action",
          width: 160,
          align: "center"
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
      tsaaa: []
    };
  },
  components: {
    TableExpand,
    Spin
  },
  methods: {
    // 发送页面选择按钮
    selectTouch(selection){
      this.selectData = selection
    },
    //发送页面添加按钮
    addOutgoingClik(row,index){
      this.outgoingCertificatesList.push(row)
    },
    //发送页面删除按钮
    deleteOutgoingClik(row,index){
      if(this.outgoingCertificatesList.length>1){
        this.outgoingCertificatesList.splice(index, 1);
      }
    },
    //发送
    okOutgoing() {
      this.selectData.forEach(val => {
        val.moCode = this.outgoingProductionTask.moCode;
        val.moId = this.outgoingProductionTask.id;
      });
      this.outgoing = true;
      this.$nextTick(() => {
        this.outgoing = false;
      });
      this.outgoingProductionTask.procedures = this.outgoingProductionTask.procedures.join(",")
      productionTasks(this.outgoingProductionTask).then(res => {
        this.selectData.forEach(val => {
          val.detailProcedures = val.detailProcedures.join(",")
          delete val.id
          delete val.procedures
          delete val.deliveryData
          this.outgoingProductionTask.qty += parseInt(val.qty);
          val.moCode = this.outgoingProductionTask.moCode;
          val.moId = res.data.id;
        });
        // 尾部
          this.editInfo.jsonString = JSON.stringify(this.selectData);
          modityUpdate(this.editInfo).then(res => {
            this.editInfo.ids=[];
            this.searchBtn();
          });
      });
    },
    // 查看
    toView(row) {
      this.$refs.lookAloadding.toggleSpin = true;
      this.data10 = [];
      this.view = true;
      this.searchalls.moCode = row.moCode;
      productiontasksFindall(this.searchalls).then(res => {
        res.data.content[0].procedures = res.data.content[0].procedures;
        this.constomer.forEach(val => {
          if (val.id == res.data.content[0].custom) {
            res.data.content[0].custom = val.username;
          }
        });
        //获取表格数据
        this.viewContent = res.data.content[0];
        this.search.id = row.id;
        outgoingEdit(this.search).then(res => {
          res.data.content.forEach(val => {
            this.data10.push(val);
          });
          this.$refs.lookAloadding.toggleSpin = false;
        });
      });
    },
    // 外发按钮
    outgoinghanldclick(row) {
      this.$refs.outgoingAloadding.toggleSpin = true;
      this.outgoing = true;
      this.searchalls.id = row.id;
      productiontasksFindall(this.searchalls).then(res => {
        let arr = [];
        arr.push(res.data.content[0])
        arr[0].procedures = arr[0].procedures.split(",");
        this.outgoingProductionTask = arr[0]
        //获取尾部
        this.detailChecklist.id = row.id;
        TaskdetailChecklist(this.detailChecklist).then(res => {
          this.outgoingCertificatesList = [];
          res.data.content.forEach( val => {
            val.detailProcedures = val.detailProcedures.split(",");
          });
          console.log(res.data.content)
          this.outgoingCertificatesList = res.data.content;
          this.$refs.outgoingAloadding.toggleSpin = false;
        });
      });
    },
    // submit() {
    //   this.$refs["productionRef"].validate(valid => {
    //     if (valid) {
    //       productionTasks(this.addProductionTask).then(res => {
    //         this.value3 = false;
    //       });
    //     } else {
    //       this.$Message.error("请填写正确信息");
    //     }
    //   });
    // },
    addCertificatesEdit() {
      this.certificatesList.push({
        bzQty: "",
        color: "",
        fzQty: "",
        hjQty: "",
        qty: "",
        size: "",
        tjQty: "",
        ztQty: "",
        moCode: "",
        moId: "",
        detailDeliveryData:"",
        detailProcedures: "",
      });
    },
    addCertificates() {
      this.editCertificatesList.push({
        bzQty: "",
        color: "",
        fzQty: "",
        hjQty: "",
        qty: "",
        size: "",
        tjQty: "",
        ztQty: "",
        moCode: "",
        moId: ""
      });
    },
    outgoingCertificates() {
      this.outgoingCertificatesList.push({
        bzQty: "",
        color: "",
        fzQty: "",
        hjQty: "",
        qty: "",
        size: "",
        tjQty: "",
        ztQty: "",
        moCode: "",
        outgoingId: "",
        moId: ""
      });
    },
    handleRemove(index) {
      // this.addProductionTask.qty=0
      if (this.certificatesList.length > 1) {
        this.certificatesList.splice(index, 1);
        // let deleCount = 0;
        // if(this.certificatesList.length){
        //     this.certificatesList.forEach(val=>{
        //         deleCount +=parseInt(val.qty)
        //     })
        //     this.addProductionTask.qty = deleCount
        // }
      }
    },
    editHandleRemove(index, id) {
      if (id) {
        this.editInfo.ids.push(id);
      }
      if (this.editCertificatesList.length > 1) {
        this.editCertificatesList.splice(index, 1);
      }
    },
    outgoingHandleRemove(index, id) {
      if (id) {
        this.editInfo.ids.push(id);
      }
      if (this.outgoingCertificatesList.length > 1) {
        this.outgoingCertificatesList.splice(index, 1);
      }
    },
    // 人员照片上传成功
    handleSuccess(res, file) {
      this.addProductionTask.photo = res.data;
    },
    // 添加-删除照片
    handleRemoveModify() {
      this.addProductionTask.photo = "";
    },
    // 编辑-删除照片
    edihandleRemove() {
      this.editorProductionTask.photo = "";
    },
    // 修改-人员照片-成功
    modifyHandleSuccess(res, file) {
      this.$set(this.editorProductionTask, "photo", res.data);
    },
    // 上传格式错误
    handleFormatError(file) {
      this.$Message.warning({
        content: "添加 " + file.name + " 是不正确的, 请选择 jpg 或 png"
      });
    },
    // 照片超出限定大小
    handleMaxSize(file) {
      this.$Message.warning({
        content: "照片 " + file.name + " 太大, 不能超过2M"
      });
    },
    //添加
    handleAdd() {},
    //搜索
    searchBtn() {
      this.$refs.Aloadding2.toggleSpin = true;
      productiontasksFindall(this.searchFm).then(res => {
        this.dataTable = res.data.content;
        this.total = res.data.totalElements;
        this.currentPage = res.data.number;
        this.$refs.Aloadding2.toggleSpin = false;
      });
    },
    changePage(val) {
      this.searchFm.page = val - 1;
      this.searchBtn();
    },
    handleSizeChange(val) {
      this.searchFm.size = val;
      this.currentPage = 0;
      this.searchFm.page = 0;
      this.searchBtn();
    },
    //编辑
    edit(row, index) {
      this.addProductionTask.qty = 0;
      this.editInfo.ids = [];
      this.searchalls.moCode = row.moCode;
      this.editor = true;
      this.$refs.Aloadding.toggleSpin = true;
      productiontasksFindall(this.searchalls).then(res => {
        res.data.content[0].procedures = res.data.content[0].procedures.split(",")
        this.editorProductionTask = res.data.content[0];
        //获取尾部数据
        this.detailChecklist.id = row.id;
        TaskdetailChecklist(this.detailChecklist).then(res => {
          this.Tasklist = res.data.content;
          this.editCertificatesList = [];
          res.data.content.forEach(val => {
            this.editCertificatesList.push(val);
          });
          this.$refs.Aloadding.toggleSpin = false;
        });
      });
    },
    //编辑页面的修改
    ok() {
      this.editCertificatesList.forEach(val => {
        val.moCode = this.editorProductionTask.moCode;
        val.moId = this.editorProductionTask.id;
      });
      this.ed = false;
      this.$nextTick(() => {
        this.ed = true;
      });
      this.$refs["editorProductionRef"].validate(valid => {
        if (valid) {
          this.editorProductionTask.procedures = this.editorProductionTask.procedures.join(",")
          this.editCertificatesList.forEach(val => {
            this.editorProductionTask.qty += parseInt(val.qty);
          });
          productionTaskEdit(this.editorProductionTask).then(res => {
            //尾部修改
            this.editInfo.jsonString = JSON.stringify(
              this.editCertificatesList
            );
            modity(this.editInfo).then(res => {
              this.$Message.info("修改成功");
              this.editor = false;
              this.editInfo.ids=[];
              this.searchBtn();
            });
          });
        } else {
          this.$Message.error("请正确填写信息");
        }
      });
    },
    cancel() {
      this.modal1 = false;
      this.editor = false;
      this.outgoing = false;
      // this.$Message.info('取消');
    },
    //删除
    remove(row, index) {
      this.$Modal.confirm({
        title: "删除",
        content: "<p>确定要删除这条记录吗？</p>",
        onOk: () => {
          productionTaskDelete(row.id).then(res => {
            this.searchBtn();
          });
        }
      });
    },
    //新增显示按钮
    showAddRoad() {
      (this.certificatesList = [
        {
          qty: "",
          color: "",
          size: "",
          bzQty: "",
          fzQty: "",
          hjQty: "",
          tjQty: "",
          ztQty: "",
          moCode: "",
          detailDeliveryData: "",
          detailProcedures: "",
        }
      ]),
        (this.modal1 = true);
      this.value3 = true;
      let count = this.certificatesList.length;
      this.certificatesList.splice(1, count);
      this.$refs["productionRef"].resetFields();
    },
    // 增加页面的提交
    Addok() {
      this.$refs.Aloadding.toggleSpin = true;
      this.add = false;
      this.$nextTick(() => {
        this.add = true;
      });
      this.$refs["productionRef"].validate(valid => {
        if (valid) {
          this.addProductionTask.procedures = this.addProductionTask.procedures.join(',')
          productionTasks(this.addProductionTask).then(res => {
            this.dataTable = res.content;
            this.certificatesList.forEach(val => {
                this.addProductionTask.qty += parseInt(val.qty);
                val.detailDeliveryData = res.data.deliveryData;
                val.detailProcedures = res.data.procedures;
                val.moCode = this.addProductionTask.moCode;
                console.log(val.detailProcedures)
                val.moId = res.data.id;
                AdddcMoDetail(val).then(res => {
                this.searchBtn();
              });
            });
            this.modal1 = false;
            this.$refs.Aloadding.toggleSpin = false;
          }).catch(() => {
                this.$refs.Aloadding.toggleSpin = false;
            });
        } else {
          this.$Message.error("请正确填写信息");
          this.$refs.Aloadding.toggleSpin = false;
        }
      });
    }
  },
  computed: {
    // 人员照片
    headers() {
      let jwtToken = Storage.get("token");
      return { Authorization: jwtToken };
    },
  },
  mounted() {
    this.searchBtn();
    userList().then(res => {
      this.constomer = res.data.content;
    });
  }
};
</script>
<style scope>
.demo-drawer-footer {
  width: 100%;
  /* position: absolute; */
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
.ivu-upload-drag {
  width: 150px;
  height: 150px;
}
.demo-upload-list {
  display: inline-block;
  width: 150px;
  height: 150px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
#titleStyle > span {
  font-size: 15px;
}
.certificatesBox > .ivu-form-item-content {
  display: inline-block;
  width: 100%;
  margin-left: 0 !important;
  width: 130px;
}
.certificatesBox .ivu-form-item-content .ivu-form-item .ivu-form-item-content {
  display: inline-block;
}
.certificatesBox .ivu-form-item-content .ivu-form-item {
  width: 232px;
  margin-right: 0;
  margin-bottom: 16px;
}
.certificatesBox .ivu-form-item-content .ivu-input {
  width: 100%;
}
</style>