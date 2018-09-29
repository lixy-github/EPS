<template>
    <div class="login-bg">
        <!-- 用户登录 -->
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
                    <Button type="primary" long size="large" @click="loginSubmit()">登录</Button>
                </FormItem>
            </Form>
            <div class="form-other clearfix">
                <span class="lt">忘记密码</span>
                <span class="rt">新用户注册</span>
            </div>
        </Card>

        <!-- 用户注册 -->
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
                    { required: true, message: '请输入正确的用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '请输入正确的密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        loginSubmit(){
            this.$router.push("/index/Index");
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
    width: 400px;
    height: 320px;
    padding: 0 20px;
    top: 50%;
    left: 50%;
    margin-left: -210px;
    margin-top: -160px;
}
.login-bg .login-title{
    text-align: center;
    font-size: 17px;
    color: #333;
    font-weight: 500;
    margin-top: 5px;
}
.login-bg .login-box{
    margin-top: 30px;
}
.login-bg .remeber-pw{
    text-align: right;
    margin: -10px 0 10px 0;
}
.login-bg .form-other span{
    font-size: 12px;
    cursor: pointer;
}
.login-bg .form-other span:hover {
    color: #f1390b;
}
</style>
