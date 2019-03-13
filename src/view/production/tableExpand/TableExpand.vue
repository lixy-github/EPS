<template>
    <div>
        <Table
            border
            :columns="columns"
            :data="dataTable">
        </Table>
    </div>
</template>
<script>
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
                        key: 'procedure',
                        align: 'center',
                        ellipsis: true
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
                    }
                ],
                dataTable: []
            }
        },
        methods:{

        }
    };
</script>
<style scoped>
</style>