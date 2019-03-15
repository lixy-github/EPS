<template>
<div>
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
import {deleteProduction} from "../../../api/production/productionTask.js"
    export default {
        props: {
            row: Object
        },
        data () {
            return {
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
                    deleteProduction(row.id).then((res) =>{
                    })
                  },
                })
            }
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