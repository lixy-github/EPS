<template>
    <div class="login-bg">
        <Card :bordered="false">
            <div class="login-title">用户登录</div>
            <Form ref="formInline" :model="formInline" :rules="ruleInline" class="login-box">
                <FormItem prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="请输入手机号/邮箱">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="请输入密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <div class="remeber-pw">
                    <Checkbox>记住密码</Checkbox>
                </div>
                <FormItem>
                    <Button type="primary" long size="large" @click="handleSubmit()">登录</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>
<script>
export default {
    data () {
        return {
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                    { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                ]
            }
        }
    }
}
</script>
<style>
.login-bg {
    width: 100%;
    height: 100%;
    background: url("../../../static/img/bg.jpg") no-repeat;
    background-size: 100% 100%;
    position: relative;
}
.login-bg .ivu-card{
    position: absolute;
    width: 430px;
    height: 320px;
    top: 50%;
    left: 50%;
    margin-left: -215px;
    margin-top: -160px;
}
.login-bg .login-title{
    text-align: center;
    font-size: 17px;
    color: #333;
    font-weight: 500;
}
.login-bg .login-box{
    margin-top: 20px;
}
.login-bg .remeber-pw{
    text-align: right;
    margin: -18px 0 10px 0;
}
</style>
