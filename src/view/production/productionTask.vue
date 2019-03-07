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
        <Modal
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
                <FormItem label="客户款号" prop="customCode">
                    <Input v-model="addProductionTask.customCode"/>
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
                <FormItem label="品牌" prop="brand">
                    <Input v-model="addProductionTask.brand"/>
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
        </Modal>

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
                    <Input v-model="editorProductionTask.custom"/>
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
                @on-page-size-change="handleSizeChange">
            </Page> 
        </div>
    </div>
</template>
<script>
import Spin from '../spin/spin'
import TableExpand from './tableExpand/TableExpand'
import {productionTasks,productiontasksFindall,productionTaskDelete,
        productionTaskEdit,productionTaskFindbyid} from "../../api/production/productionTask.js"
export default {
    data () {
        return {
            ed:true,
            add: true,
            searchFm:{
                custom:"",
                page: 0,
                size: 10,
                sort: "createTime,desc"
            },
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
                custom:[
                    {required: true, message: "内容不能为空", trigger: "change" }
                ],
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
                    value:"red",
                    label:"红色"
                },
                {
                    value:"navy",
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
        //搜索
        searchBtn() {
            this.$refs.Aloadding2.toggleSpin=true
            productiontasksFindall(this.searchFm).then((res)=>{
            this.dataTable = res.data.content
            this.total = res.data.totalElements
            this.currentPage = res.data.number
            this.$refs.Aloadding2.toggleSpin=false
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
    mounted(){
       this.searchBtn()
    }
}
</script>
