<template>
<div>
    <!-- 编辑内容 -->
    <!-- <Modal
        v-model="editor"
        :loading="ed"
        fullscreen
        title="编辑生产任务">
        <div style="width:910px;margin:auto">
            <Form ref="editorProductionRef" :model="editorProductionTask" :label-width="100" inline>
                <FormItem label="照片" prop="photo">
                    <img :src="uploadAction+this.editorProductionTask.photo">
                </FormItem>
                    <FormItem label="产品名称" prop="product" style="width:492px">
                    <Input v-model="editorProductionTask.product"/>
                </FormItem>
                <div style="margin-top: -127px;margin-left: 263px;">
                    <FormItem label="客户名称" prop="custom" style="width:240px">  
                        <Select v-model="editorProductionTask.custom" filterable>
                            <Option v-for="item in this.constomer" :value="item.id" :key="item.username">{{item.username}}</Option>
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
                    <DatePicker type="date" v-model="editorProductionTask.deliveryData"></DatePicker>
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
                <FormItem label="备注说明" prop="memo" style="width:351px">
                    <Input type="textarea" :autosize="{minRows: 2,maxRows: 8}" v-model="editorProductionTask.memo" />
                </FormItem>
            </Form>
            <Divider id='titleStyle'>生产任务详情</Divider>

            <Form :label-width="80"  inline>
                <div style="display:flex;justify-content:space-around;width:565px;font-size:13px;margin-bottom:7px">
                    <div style="margin-left: 98px;">颜色</div>
                    <div>尺码</div>
                    <div>数量</div>
                </div>
                <FormItem v-for="(item,index) in this.editCertificatesList" :key="index">
                    <FormItem label="" prop="color" style="width:140px;margin-left:29px">
                        <Select v-model="item.color">
                            <Option v-for="item in allColour" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="" prop="size" style="width:140px;margin-left:9px">
                        <Select v-model="item.size">
                            <Option v-for="item in size" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select> 
                    </FormItem>
                    <FormItem label="" prop="qty" style="width:140px;margin-left:9px">
                        <Input v-model="item.qty" placeholder="请输入数量"/>
                    </FormItem>
                        <Button type="primary" style="margin-left: 6px;" @click="editHandleRemove(index,item.id)">删除</Button>
                </FormItem>
            </Form>
            <Spin ref="Aloadding"></Spin>
        </div>

        <div slot="footer">
            <Button type="dashed" style="margin-left:119px" @click="addCertificates()" icon="md-add">添加</Button>
            <Button @click="cancel">取消</Button>
            <Button type="success" @click="ok">修改</Button>
        </div>
    </Modal>   -->
    <div>
        <Table
            border
            :columns="columns"
            :data="dataTable">
            <template slot-scope="{row, index}" slot="action">
                <div>
                <Icon type="ios-create-outline" size="20" @click="edit(row,index)"/>   
                <Icon type="ios-trash-outline" size="20"  @click="remove(row,index)"/>
                </div>
            </template>
        </Table>
    </div>
</div>    
</template>
<script>
import axios from '../../../libs/AxiosPlugin'
import Storage from '../../../libs/Storage'
import {deleteProduction,productiontasksFindall,productionTaskDelete} from "../../../api/production/productionTask.js"
    export default {
        props: {
            row: Object
        },
        data () {
            return {
                uploadAction:process.env.API_URL,
                editorProductionTask:[],
                searchalls:{
                    moCode:"",
                },
                ed:false,
                editor:false,
                columns: [
                    {
                        title: '外加工单位',
                        key: 'company',
                        align: 'center',
                        ellipsis: true
                    },
                    {
                        title: '数量',
                        key: 'qty',
                        align: 'center',
                        ellipsis: true
                    },
                    {
                        title: '工序',
                        key: 'procedures',
                        align: 'center',
                        ellipsis: true,
                        render: (h,params) => {
                            return h('span',JSON.parse(params.row.procedures).join(','))
                        }
                    },
                    {
                        title: '合同交期',
                        key: 'deliveryData',
                        align: 'center',
                        ellipsis: true
                    },
                    {
                        title: '完成率',
                        key: 'percent',
                        align: 'center',
                        ellipsis: true
                    },
                     {
                        title: '操作',
                        align: 'center',
                        width: 120,
                        ellipsis: true,
                        slot: 'action',
                    }
                ],
                dataTable: []
            }
        },
        methods:{
            remove(row,index){
                this.$Modal.confirm({
                    title:"删除",
                    content:"<p>确定要删除这条记录吗？</p>",
                    onOk: () => {
                    productionTaskDelete(row.id).then((res) =>{
                    })
                  },
                })
            },
            edit(row){
               this.editor=true; 
               this.searchalls.moCode = row.moCode;
               productiontasksFindall(this.searchalls).then((res) => {
                    res.data.content[0].procedures=JSON.parse(res.data.content[0].procedures)
                    this.editorProductionTask=res.data.content[0];
                })
            },
            cancel(){
               this.editor=false;  
            },
        },
        mounted(){
            let aaa = [];
            aaa.push(this.row)
            this.dataTable=aaa
        }
    };
</script>
<style scoped>
</style>