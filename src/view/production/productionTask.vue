<template>
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
</template>
<script>
    export default {
        data () {
            return {
                columns12: [
                    {
                        type: 'expand',
                        title: '展开',
                        align: "center",
                        ellipsis: true,
                        slot: 'name'
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
                        key: 'address'
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
            }
        }
    }
</script>
