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
       <!-- 显示的表格 -->
        <Table border :columns="columns12" :data="data6">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="error" size="small">外发</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
                <Button type="error" size="small" @click="remove(index)">删除</Button>
            </template>
        </Table>
        <!-- 增加 -->
        <Form ref="productionRef" :model="addProductionTask" :rules="productionRules">
            <FormItem label="生产单号" prop="mo_code">
                 <Input v-model="addProductionTask.mo_code"></Input>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                productionRules:{
                    mo_code:[
                        {required: true, message: "内容不能为空", trigger: "change" }
                    ]
                },
                addProductionTask:{
                    mo_code:"",
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
                        align: "center",
                        ellipsis: true,
                        key: 'address',
                        sortable: true
                    },
                    {
                        title: '款号',
                        align: "center",
                        ellipsis: true,
                    },
                     {
                        title: '数量',
                        align: "center",
                        ellipsis: true,
                    },
                    {
                        title: '工期',
                        align: "center",
                        ellipsis: true,
                        sortable: true
                    },
                    {
                        title: '客户名称',
                        align: "center",
                        ellipsis: true,
                    },
                    {
                        title: '品牌',
                        align: "center",
                        ellipsis: true,
                    },
                     {
                        title: '工序',
                        align: "center",
                        ellipsis: true,
                    },
                    {
                        title: '完成率',
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
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park'
                    }
                ]
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            showAddRoad(){}
        }
    }
</script>
