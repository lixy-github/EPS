<template>
    <div>
        <div class="expand-row">
            <Form ref="dcMoDetail" :model="dcMoDetail" inline>
                <FormItem label="外加工单位" prop="company">
                    <Input v-if="editIndex"  v-model="dcMoDetail.company" />
                    <span v-else>{{dcMoDetail.percent}}</span>
                </FormItem>
                <FormItem label="数量" prop="qty">
                    <Input v-if="editIndex" v-model="dcMoDetail.qty" />
                    <span v-else>{{dcMoDetail.percent}}</span>
                </FormItem>
                <FormItem label="合同交期" prop="deliveryData">
                    <DatePicker v-if="editIndex"  type="date" v-model="dcMoDetail.deliveryData" transfer></DatePicker>
                    <span v-else>{{dcMoDetail.percent}}</span>
                </FormItem>
                <FormItem label="工序" prop="procedure">
                    <!-- <Select v-model="dcMoDetail">
                        <Option v-for="item in Process" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select> -->
                    <Input v-if="editIndex"  v-model="dcMoDetail.procedure"/>
                    <span v-else>{{dcMoDetail.procedure}}</span>
                </FormItem>
                <FormItem label="完成率">
                    <span>{{ dcMoDetail.percent }}%</span>
                </FormItem>
                <FormItem  style="margin-top:32px">
                    <span v-if="editIndex">
                        <Button type="primary" @click="save" size="small">保存</Button>
                        <Button type="error" size="small">删除</Button>
                    </span>
                    <span v-else>
                        <Button  type="primary" @click="handleEdit" size="small">操作</Button>
                    </span>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        },
        data () {
            return {
                editIndex:false,
                dcMoDetail: {
                    procedure:"",
                    company: 20,
                    count: '20',
                    date: '',
                    work: '',
                    percent: 20,
                    fzQty:"",
                    hjQty:"",
                    tjQty:"",
                    ztQty:"",
                    bzQty:"",
                },
                Process: [
                    {
                        value:"fzQty",
                        label:"发织完成数"
                    },
                    {
                        value:"hjQty",
                        label:"横机完成数"
                    },
                    {
                        value:"tjQty",
                        label:"套口完成数"
                    },
                    {
                        value:"ztQty",
                        label:"后整完成数"
                    },
                    {
                        value:"bzQty",
                        label:"成品完成数"
                    }
                ]
            }
        },
        methods:{
            handleEdit(){
                this.editIndex = true
            },
            save(){
                this.editIndex = false
            }
        }
    };
</script>
<style scoped>
    /* .expand-row{
        margin-bottom: 16px;
    } */
</style>