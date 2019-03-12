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
                        </FormItem> -->
                         <FormItem prop="custom" label="客户名称" style="width:241px">
                            <!-- <DatePicker type="datetime" v-model="searchFm.custom" style="width:141px"></DatePicker> -->
                                <Input v-model="searchFm.custom"/>
                        </FormItem>
                         <!-- <FormItem prop="endTime" label="---" style="width:241px;margin-left:-8%">
                            <DatePicker type="datetime" v-model="searchFm.endTime" style="width:141px"></DatePicker>
                        </FormItem> -->
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
       
        <!-- 增加 -->
        <!-- <Modal
            v-model="modal1"
            title="增加生产任务"
            :loading="add"
            @on-ok="Addok"
            @on-cancel="cancel">
            <Form ref="productionRef" :model="addProductionTask" :rules="productionRules" :label-width="80" inline>
                <FormItem label="生产单号" prop="moCode">
                    <Input v-model="addProductionTask.moCode"/>
                </FormItem>
                <FormItem label="客户名称" prop="custom">
                    <Input v-model="addProductionTask.custom"/>
                </FormItem>
                <FormItem label="产品名称" prop="product">
                    <Input v-model="addProductionTask.product"/>
                </FormItem>
                <FormItem label="款号" prop="styleCode">
                    <Input v-model="addProductionTask.styleCode"/>
                </FormItem>
                <FormItem label="客户款号" prop="customCode">
                    <Input v-model="addProductionTask.customCode"/>
                </FormItem>
                <FormItem label="照片" prop="photo">
                    <Input v-model="addProductionTask.photo"/>
                </FormItem>
                <FormItem label="本厂款号" prop="styleCode">
                    <Input v-model="addProductionTask.styleCode"/>
                </FormItem>
                <FormItem label="针数" prop="pins">
                    <Input v-model="addProductionTask.pins"/>
                </FormItem>
                <FormItem label="生产数量" prop="qty">
                    <Input v-model="addProductionTask.qty"/>
                </FormItem>
                  <FormItem label="客户款号" prop="unit">
                    <Input v-model="addProductionTask.unit"/>
                </FormItem>
                 <FormItem label="客户款号" prop="deliveryData">
                    <Input v-model="addProductionTask.deliveryData"/>
                </FormItem>
                <FormItem label="品牌" prop="brand">
                    <Input v-model="addProductionTask.brand"/>
                </FormItem>
                <FormItem label="工序" prop="procedure">
                    <Input v-model="addProductionTask.procedure"/>
                </FormItem>
                <FormItem label="备注说明" prop="memo">
                    <Input v-model="addProductionTask.memo"/>
                </FormItem>
                 <FormItem label="颜色" prop="color">
                    <Select v-model="addProductionTask.color">
                        <Option v-for="item in colour" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="尺码" prop="size">
                   <Select v-model="addProductionTask.size">
                       <Option v-for="item in size" :value="item.value" :key="item.value">{{item.label}}</Option>
                   </Select> 
                </FormItem>
                <FormItem label="计量单位" prop="unit">
                    <Select v-model="addProductionTask.unit">
                        <Option value="piece">件</Option>
                        <Option value="pack">包</Option>
                    </Select>
                </FormItem>
            </Form>
            <Spin ref="Aloadding"></Spin>
        </Modal> -->

        <!--增加 抽屉-->
        <Drawer
            title="增加生产任务"
            v-model="value3"
            width="60%"
            :mask-closable="false"
        >
            <Form ref="productionRef" :model="addProductionTask" :rules="productionRules" :label-width="120" inline>
                <!-- 上传照片 -->
                <FormItem label="照片" prop="photo">
                    <div class="demo-upload-list" v-if="this.addProductionTask.photo && this.addProductionTask.photo!=''" :key="1">
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
                        :on-success="modifyHandleSuccess"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :headers="headers"
                        :data="uploadData"
                        type="drag"
                        :action="uploadAction+'/api/public/upload'"
                        style="display:inline-block;">
                        <div style="width: 150px;height:150px;line-height: 150px;">
                            <Icon type="ios-camera" size="60"></Icon>
                        </div>
                    </Upload>
                </FormItem>
                <FormItem label="生产单号" prop="moCode" :label-width="160" style="margin-left:-53px;">
                    <Input v-model="addProductionTask.moCode"/>
                </FormItem>
                <FormItem label="客户名称" prop="custom" style="width:261px">  
                     <Select v-model="addProductionTask.custom" filterable>
                        <Option v-for="item in this.constomer" :value="item.id" :key="item.username">{{item.username}}</Option>
                    </Select>
                </FormItem>
                <div style="margin:-126px 0 0 273px">
                <FormItem label="产品名称" prop="product">
                    <Input v-model="addProductionTask.product"/>
                </FormItem>
                <FormItem label="款号" prop="styleCode">
                    <Input v-model="addProductionTask.styleCode"/>
                </FormItem>
                <FormItem label="客户款号" prop="customCode">
                    <Input v-model="addProductionTask.customCode"/>
                </FormItem>
                <FormItem label="品牌" prop="brand">
                    <Input v-model="addProductionTask.brand"/>
                </FormItem>
                </div>
                <FormItem label="针数" prop="pins">
                    <Input v-model="addProductionTask.pins"/>
                </FormItem>
                 <FormItem label="合同交期" prop="deliveryData" style="width:260px">
                    <DatePicker type="date" v-model="addProductionTask.deliveryData"></DatePicker>
                </FormItem>
               
                <FormItem label="工序" prop="procedure" style="width:260px">
                    <Select addProductionTask.procedure>
                        <Option v-for="item in Process" :key="item.value" value="item.label">{{item.label}}</Option>
                    </Select>
                </FormItem>
                 <FormItem label="总数量" prop="qty">
                    <Input v-model="addProductionTask.qty"/>
                </FormItem>
                  <FormItem label="计量单位" prop="unit" style="width:260px">
                    <Select v-model="addProductionTask.unit">
                        <Option value="件">件</Option>
                        <Option value="包">包</Option>
                    </Select>
                </FormItem>
                <FormItem label="备注说明" prop="memo">
                    <Input v-model="addProductionTask.memo"/>
                </FormItem>
            </Form>
            <div style="border:0.5px solid #e8eaec;margin-bottom:14px"></div>
            <!-- 生产任务数量详情 -->
            <Form ref="certificatesList" :label-width="80" inline>
                <FormItem  v-for="(item,index) in this.certificatesList" :key="index">
                    <FormItem label="颜色" prop="color" style="width:140px;margin-left: -39px;">
                        <Select v-model="item.color">
                            <Option v-for="item in colour" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="尺码" prop="size" style="width:140px">
                    <Select v-model="item.size">
                        <Option v-for="item in size" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select> 
                    </FormItem>
                    <FormItem label="数量" prop="qty">
                        <Input v-model="item.qty"/>
                    </FormItem>
                   
                    <div style="margin-left: 479px;margin-top: -33px;">
                        <Button type="dashed" style="margin-left:119px" @click="addCertificatesEdit()" icon="md-add">添加</Button>
                        <Button type="primary" style="margin-left: 6px;" @click="handleRemove(index)">删除</Button>
                    </div>
                </FormItem>
                <div class="demo-drawer-footer">
                    <Button style="margin-right: 8px" @click="value3 = false">取消</Button>
                    <Button type="primary" @click="submit()">提交</Button>
                </div>
            </Form>
           
            <Spin ref="Aloadding"></Spin>
        </Drawer>   
        <!-- 编辑 -->
        <Modal
            v-model="editor"
            :loading="ed"
            title="生产任务"
            @on-ok="ok"
            @on-cancel="cancel">
            <Form ref="editorProductionRef" :model="editorProductionTask" :rules="productionRules" :label-width="80" inline>
                <Steps :current="1" size="small">
                    <Step title="发货"></Step>
                    <Step title="横机织造"></Step>
                    <Step title="套口键盘"></Step>
                    <Step title="后通整理"></Step>
                    <Step title="成品入库"></Step>
                </Steps>
                <br/>
                <FormItem label="生产单号" prop="moCode">
                    <Input v-model="editorProductionTask.moCode"/>
                </FormItem>
                <FormItem label="客户名称" prop="custom">
                    <!-- <Input v-model="editorProductionTask.custom"/> -->
                    <Select v-model="editorProductionTask.custom">
                        <Option v-for="item in this.constomer" :value="item.id" :key="item.username">{{item.username}}</Option>
                    </Select>
                </FormItem>
                 <FormItem label="客户款号" prop="customCode">
                    <Input v-model="editorProductionTask.customCode"/>
                </FormItem>
                <FormItem label="产品名称" prop="product">
                    <Input v-model="editorProductionTask.product"/>
                </FormItem>
                 <FormItem label="照片" prop="photo">
                    <Input v-model="editorProductionTask.photo"/>
                </FormItem>
                <FormItem label="工序" prop="procedure">
                    <Input v-model="editorProductionTask.procedure"/>
                </FormItem>
                 <FormItem label="款号" prop="styleCode">
                    <Input v-model="editorProductionTask.styleCode"/>
                </FormItem>
                 <FormItem label="合同交期" prop="deliveryData">
                    <Input v-model="editorProductionTask.deliveryData"/>
                </FormItem>
                <FormItem label="客户款号" prop="customCode">
                    <Input v-model="editorProductionTask.customCode"/>
                </FormItem>
                <FormItem label="本厂款号" prop="styleCode">
                    <Input v-model="editorProductionTask.styleCode"/>
                </FormItem>
                <FormItem label="针数" prop="pins">
                    <Input v-model="editorProductionTask.pins"/>
                </FormItem>
                <FormItem label="生产数量" prop="qty">
                    <Input v-model="editorProductionTask.qty"/>
                </FormItem>
                <FormItem label="品牌" prop="brand">
                    <Input v-model="editorProductionTask.brand"/>
                </FormItem>
                <FormItem label="备注说明" prop="memo">
                    <Input v-model="editorProductionTask.memo"/>
                </FormItem>
                 <FormItem label="颜色" prop="color">
                    <Select v-model="editorProductionTask.color">
                        <Option v-for="item in colour" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="尺码" prop="size">
                   <Select v-model="editorProductionTask.size">
                       <Option v-for="item in size" :value="item.value" :key="item.value">{{item.label}}</Option>
                   </Select> 
                </FormItem>
                <FormItem label="计量单位" prop="unit">
                    <Select v-model="editorProductionTask.unit">
                        <Option value="piece">件</Option>
                        <Option value="pack">包</Option>
                    </Select>
                </FormItem>
            </Form>
            <Spin ref="Aloadding1"></Spin>
        </Modal>

        <!-- 显示的表格 -->
        <div style="position:relative">
            <Table 
            border 
            :columns="columns" 
            :data="dataTable">

            <template slot-scope="{row, index}" slot="action">
                <Button type="error" size="small">外发</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row,index)">编辑</Button>
                <Button type="error" size="small" @click="remove(row,index)">删除</Button>
            </template>
            </Table>
            <!-- <Spin ref="Aloadding2"></Spin> -->
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
                @on-page-size-change="handleSizeChange">
            </Page> 
        </div>
    </div>
</template>
<script>
import Spin from '../spin/spin'
import axios from '../../libs/AxiosPlugin'
import Storage from '../../libs/Storage'
import TableExpand from './tableExpand/TableExpand'
import {fileUpload,userList,productionTasks,productiontasksFindall,productionTaskDelete,
        productionTaskEdit,productionTaskFindbyid,AdddcMoDetail} from "../../api/production/productionTask.js"
export default {
    data () {
        return {
            uploadAction:process.env.API_URL,
            uploadData:{ folderName:"driver/head" },
            constomer:{},
            value3:false,
            ed:true,
            add: true,
            searchFm:{
                custom:"",
                page: 0,
                size: 10,
                sort: "createTime,desc"
            },
            certificatesList:[
                {
                    "bzQty": "",
                    "color": "",
                    "fzQty": "",
                    "hjQty": "",
                    "qty": "",
                    "size": "",
                    "tjQty": "",
                    "ztQty": "",
                }
            ],
            Process: [
                    {
                        value:"横机",
                        label:"横机"
                    },
                    {
                        value:"套口",
                        label:"套口"
                    },
                    {
                        value:"洗整",
                        label:"洗整"
                    },
                   
                    {
                        value:"包装",
                        label:"包装"
                    },
                ],
            currentPage:0,
            total:0,
            dataTable:[],
            modal1:false,
            editor:false,
            editorProductionTask:{},
            productionRules:{
                moCode:[
                    { required: true, message: "内容不能为空", trigger: "change" }
                ],
                // custom:[
                //     {required: true, message: '该内容为必须项', trigger: 'change'}
                // ],
                customCode:[
                    {required: true, message: "内容不能为空", trigger: "change" }
                ],
                styleCode:[
                    {required: true, message: "内容不能为空", trigger: "change" }
                ],
                pins:[
                    {required: true, message: "内容不能为空", trigger: "change" }
                ],
                memo:[
                    {required: true, message: "内容不能为空", trigger: "change" }
                ],
                unit:[
                    {required: true, message: "内容不能为空", trigger: "change" }
                ],
                // qty:[
                //     {required: true, message: "内容不能为空", trigger: "change" }
                // ],
                color:[
                    {required: true, message: "内容不能为空", trigger: "change" }
                ],
                size:[
                    {required: true, message: "内容不能为空", trigger: "change" }
                ],
                brand:[
                    {required: true, message: "内容不能为空", trigger: "change" }
                ],
            },
            addProductionTask:{
                deliveryData:"",
                styleCode:"",
                product:"",
                moCode:"",
                custom:"",
                customCode:"",
                styleCode:"",
                pins:"",
                memo:"",
                qty:0,
                color:"",
                size:"",
                brand:"",
                unit:"piece",
                procedure:"",
                photo:"",
            },
            columns: [
                {
                    title: '展开',
                    align: "center",
                    ellipsis: true,
                    width: 60,
                    type: 'expand',
                    render: (h, params) => {
                        return h(TableExpand, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },
                {
                    title: '名称',
                    key: 'name',
                    align: 'center',
                    ellipsis: true
                },
                {
                    title: '产品图',
                    align: "center",
                    ellipsis: true,
                    key: 'age'
                },
                {
                    title: '生产单号',
                    key: 'moCode',
                    align: "center",
                    ellipsis: true,
                    sortable: true
                },
                {
                    title: '款号',
                    key: "styleCode",
                    align: "center",
                    ellipsis: true,
                },
                    {
                    title: '数量',
                    key: "qty",
                    align: "center",
                    ellipsis: true,
                },
                {
                    title: '工期',
                    key: "",
                    align: "center",
                    ellipsis: true,
                    sortable: true
                },
                {
                    title: '客户名称',
                    key: "custom",
                    align: "center",
                    ellipsis: true,
                },
                {
                    title: '品牌',
                    key: "brand",
                    align: "center",
                    ellipsis: true,
                },
                    {
                    title: '工序',
                    key: "procedure",
                    align: "center",
                    ellipsis: true,
                },
                {
                    title: '完成率',
                    key: "",
                    slot: 'action',
                    width: 170,
                    align: 'center'
                }
            ],
            size:[
                {
                    value:"S",
                    label:"S"
                },
                {
                    value:"M",
                    label:"M"
                },
                {
                    value:"L",
                    label:"L"
                },
                {
                    value:"XL",
                    label:"XL"
                },
                {
                    value:"XXL",
                    label:"XXL"
                },
                {
                    value:"3XL",
                    label:"3XL"
                }
            ],
            colour:[
                {
                    value:"红色",
                    label:"红色"
                },
                {
                    value:"藏青",
                    label:"藏青"
                }
            ]
        }
    },
    components: {
        TableExpand,
        Spin
    },
    methods: {
        submit(){
            this.$refs['productionRef'].validate((valid)=>{
                if(valid){
                    productionTasks(this.addProductionTask).then(res =>{
                        console.log(res)
                        this.value3 = false
                   })
                }else{
                    this.$Message.error("请填写正确信息")
                }
            })
            // this.certificatesList.forEach(val =>{
            //     productionTasks(val).then(res =>{
            //         console.log(res)
            //     })
            // })
        },
        addCertificatesEdit(){
            this.certificatesList.push({
                "bzQty": "",
                "color": "",
                "fzQty": "",
                "hjQty": "",
                "qty": "",
                "size": "",
                "tjQty": "",
                "ztQty": "",
            });
        },
        handleRemove(index){
            if(index>0){
                this.certificatesList.splice(index,1)
            }
        },
        // 修改-删除照片
        handleRemoveModify(){
            this.addProductionTask.photo="";
        },
         // 修改-人员照片-成功
        modifyHandleSuccess (res, file) {
            this.$set( this.addProductionTask, "photo", res.data);
        },
        // 上传格式错误
        handleFormatError(file) {
        this.$Message.warning({
            content:"添加 " +file.name +" 是不正确的, 请选择 jpg 或 png"
             });
        },
        // 照片超出限定大小
        handleMaxSize (file) {
            this.$Message.warning({
                content: '照片 ' + file.name + ' 太大, 不能超过2M'
            });
        },
        //添加
        handleAdd(){},
        //搜索
        searchBtn() {
            // this.$refs.Aloadding2.toggleSpin=true
            productiontasksFindall(this.searchFm).then((res)=>{
            this.dataTable = res.data.content
            this.total = res.data.totalElements
            this.currentPage = res.data.number
            // this.$refs.Aloadding2.toggleSpin=false
            })
        },
        changePage(val) {
            this.searchFm.page = val - 1;
            this.searchBtn();
        },
        handleSizeChange (val){
            this.searchFm.size = val;
            this.currentPage=0;
            this.searchFm.page=0;
            this.searchBtn();
        },
        //编辑
        edit (row,index) {
            this.editor=true
            this.$refs.Aloadding1.toggleSpin=true
            productionTaskFindbyid(row.id).then((res) => {
                    this.editorProductionTask=res.data 
                    this.$refs.Aloadding1.toggleSpin=false
                })
        },
         //修改
        ok () {
            this.ed = false
            this.$nextTick(()=>{
                this.ed = true
            })
            this.$refs['editorProductionRef'].validate((valid)=>{
                if(valid){
                    productionTaskEdit(this.editorProductionTask).then((res) =>{
                        this.$Message.info('修改成功')
                        this.editor=false
                        this.searchBtn()
                    })
                }else{
                    this.$Message.error('请正确填写信息')
                }
            })
        },
        cancel () {
            // this.$Message.info('取消');
        },
        //删除
        remove (row,index) {
            this.$Modal.confirm({
                title:"删除",
                content:"<p>确定要删除这条记录吗？</p>",
                onOk: () => {
                    productionTaskDelete(row.id).then((res) =>{
                        this.searchBtn()
                    })
                    // this.dataTable.splice(index, 1)
                    // this.$Message.info('删除成功')
                },
            })
        },
        //新增显示按钮
        showAddRoad(){
            this.modal1=true
            this.value3=true
            this.$refs['productionRef'].resetFields()
        },
        // 增加
        Addok () {
            this.$refs.Aloadding.toggleSpin=true
            this.add = false;
            this.$nextTick(() => {
                this.add = true;
            });
            this.$refs['productionRef'].validate((valid)=>{
                if(valid){
                    productionTasks(this.addProductionTask).then((res) => {
                        this.dataTable = res.content;
                        this.searchBtn()
                        this.$refs.Aloadding.toggleSpin=false
                        this.modal1 = false;
                    })
                }else{
                    this.$Message.error("请正确填写信息");
                    this.$refs.Aloadding.toggleSpin=false
                }
            })
        },
    },
    computed:{
         // 人员照片
        headers(){
            let jwtToken = Storage.get("token");
            return { Authorization:jwtToken }; 
        }
    },
    mounted(){
       this.searchBtn()
       userList().then(res =>{
           this.constomer = res.data.content
       })
    }
}
</script>
<style scope>
    .demo-drawer-footer{
        width: 100%;
        /* position: absolute; */
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
    .ivu-upload-drag{
        width: 150px;
        height: 150px;
    }
    .demo-upload-list{
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
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>