<template>
    <div>
        <div class="expand-row">
            <Form ref="tablefrom" :model="tablefrom" inline>
                <FormItem label="外加工单位">
                    <Select v-model="tablefrom.company">
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                    </Select>
                </FormItem>
                <FormItem label="数量">
                    <Input v-model="tablefrom.count" />
                </FormItem>
                <FormItem label="工期">
                    <DatePicker type="date" v-model="tablefrom.date" transfer></DatePicker>
                </FormItem>
                <FormItem label="工序">
                    <Select v-model="tablefrom.work">
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                    </Select>
                </FormItem>
                <FormItem label="完成率">
                    <span>{{ tablefrom.percent }}%</span>
                </FormItem>
                <FormItem>
                    <Button type="primary" size="small">编辑</Button>
                    <Button type="error" size="small">删除</Button>
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
                tablefrom: {
                    company: '',
                    count: '',
                    date: '',
                    work: '',
                    percent: 20
                }
            }
        }
    };
</script>
<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>