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
                         <FormItem prop="startTime" label="开始时间" style="width:241px">
                            <DatePicker type="datetime" v-model="searchFm.startTime" style="width:141px"></DatePicker>
                        </FormItem>
                         <!-- <FormItem prop="endTime" label="---" style="width:241px;margin-left:-8%">
                            <DatePicker type="datetime" v-model="searchFm.endTime" style="width:141px"></DatePicker>
                        </FormItem> -->
                        <FormItem style="margin-left:-100px;">
                            <Button type="primary" @click="searchBtn()" icon="android-search">查询</Button>
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
            @on-ok="ok"
            @on-cancel="cancel">
            <Form ref="productionRef" :model="addProductionTask" :rules="productionRules" :label-width="80" inline>
                <FormItem label="生产单号" prop="mo_code">
                    <Input v-model="addProductionTask.mo_code"/>
                </FormItem>
                <FormItem label="客户名称" prop="custom">
                    <Input v-model="addProductionTask.custom"/>
                </FormItem>
                <FormItem label="客户款号" prop="custom_code">
                    <Input v-model="addProductionTask.custom_code"/>
                </FormItem>
                <FormItem label="本厂款号" prop="style_code">
                    <Input v-model="addProductionTask.style_code"/>
                </FormItem>
                <FormItem label="针数" prop="pins">
                    <Input v-model="addProductionTask.pins"/>
                </FormItem>
                <FormItem label="生产数量" prop="qty">
                    <Input v-model="addProductionTask.qty"/>
                </FormItem>
                <FormItem label="品牌" prop="memo">
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
                <FormItem label="尺码" prop="sizes">
                   <Select v-model="addProductionTask.sizes">
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
        </Modal>
         <!-- 编辑 -->
        <Modal
            v-model="editor"
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
                <FormItem label="生产单号" prop="mo_code">
                    <Input v-model="editorProductionTask.mo_code"/>
                </FormItem>
                <FormItem label="客户名称" prop="custom">
                    <Input v-model="editorProductionTask.custom"/>
                </FormItem>
                <FormItem label="客户款号" prop="custom_code">
                    <Input v-model="editorProductionTask.custom_code"/>
                </FormItem>
                <FormItem label="本厂款号" prop="style_code">
                    <Input v-model="editorProductionTask.style_code"/>
                </FormItem>
                <FormItem label="针数" prop="pins">
                    <Input v-model="editorProductionTask.pins"/>
                </FormItem>
                <FormItem label="生产数量" prop="qty">
                    <Input v-model="editorProductionTask.qty"/>
                </FormItem>
                <FormItem label="品牌" prop="memo">
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
                <FormItem label="尺码" prop="sizes">
                   <Select v-model="editorProductionTask.sizes">
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
        </Modal>
        <!-- 显示的表格 -->
        <Table border :columns="columns12" :data="data6">
            <Row>
            <Col span="8">
                <span class="expand-key">Favorite book: </span>
                <span class="expand-value">《{{ row.book }}》</span>
            </Col>
            <Col span="8">
                <span class="expand-key">Favorite movie: </span>
                <span class="expand-value">{{ row.movie }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">Favorite music: </span>
                <span class="expand-value">{{ row.music }}</span>
            </Col>
        </Row>

            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="error" size="small">外发</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
                <Button type="error" size="small" @click="remove(index)">删除</Button>
            </template>
        </Table>
         <!-- 分页 -->
        <!-- <div class="pagination">
            <Page 
                :total="total" 
                size="small" 
                show-elevator 
                show-sizer 
                show-total
                :current="currentPage+1"
                @on-change="changePage"
                @on-page-size-change="handleSizeChange">
            </Page> -->
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                modal1:false,
                editor:false,
                editorProductionTask:{},
                productionRules:{
                    mo_code:[
                        {required: true, message: "内容不能为空", trigger: "change" }
                    ],
                    custom:[
                        {required: true, message: "内容不能为空", trigger: "change" }
                    ],
                    custom_code:[
                        {required: true, message: "内容不能为空", trigger: "change" }
                    ],
                    style_code:[
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
                    qty:[
                        {required: true, message: "内容不能为空", trigger: "change" }
                    ],
                    color:[
                        {required: true, message: "内容不能为空", trigger: "change" }
                    ],
                    sizes:[
                        {required: true, message: "内容不能为空", trigger: "change" }
                    ],
                    brand:[
                        {required: true, message: "内容不能为空", trigger: "change" }
                    ],
                },
                addProductionTask:{
                    mo_code:"",
                    custom:"",
                    custom_code:"",
                    style_code:"",
                    pins:"",
                    memo:"",
                    qty:"",
                    color:"",
                    sizes:"",
                    brand:"",
                    unit:"piece",
                },
                searchFm: {
                    startTime:'',
                    enterpriseName: "",
                    page: 0,
                    size: 10,
                    sort: "createTime,desc"
                },
                columns12: [
                    {
                        type: 'expand',
                        title: '展开',
                        align: "center",
                        ellipsis: true,
                        slot: 'name',
                        width: 60
                    },
                    {
                        title: '产品图',
                        align: "center",
                        ellipsis: true,
                        key: 'age'
                    },
                    {
                        title: '生产单号',
                        key: 'mo_code',
                        align: "center",
                        ellipsis: true,
                        sortable: true
                    },
                    {
                        title: '款号',
                        key: "style_code",
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
                data6: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
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
        methods: {
            show (index) {
                this.editor=true
            },
            remove (index) {
                this.$Modal.confirm({
                    title:"删除",
                    content:"<p>确定要删除这条记录吗？</p>",
                   onOk: () => {
                        this.data6.splice(index, 1)
                        this.$Message.info('删除成功')
                    },
                })
            },
            showAddRoad(){
                this.modal1=true
            },
            ok () {
                this.$Message.info('确定');
            },
            cancel () {
                this.$Message.info('取消');
            }
        }
    }
</script>
