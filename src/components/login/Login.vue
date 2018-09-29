<template>
    <div class="login-bg">
        <!-- 用户登录 -->
        <Card :bordered="false" v-if="!register">
            <div class="login-title">用户登录</div>
            <Form ref="loginForm" :model="loginForm" :rules="ruleLogin" class="form-box">
                <FormItem prop="user">
                    <Input type="text" v-model="loginForm.user" placeholder="请输入手机号/邮箱">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="loginForm.password" placeholder="请输入密码">
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
                <span class="rt" @click="toggleLoginRegister()">新用户注册</span>
            </div>
        </Card>

        <!-- 手机注册 -->
        <Card :bordered="false" class="register-box" v-if="register">
            <div class="register-title">
                <span>手机注册</span>
                <span @click="togglePhoneEmail()">邮箱注册</span>
            </div>
            <div class="form-box">
                <Form ref="registerPhone" :model="registerPhone" :rules="ruleRegister">
                    <FormItem prop="phoneNumber">
                        <Input type="text" v-model="registerPhone.phoneNumber" placeholder="请输入手机号"/>
                    </FormItem>
                    <FormItem prop="phonePwd">
                        <Input type="password" v-model="registerPhone.phonePwd" placeholder="密码（6-16个字符；字符或数字）"/>
                    </FormItem>
                    <FormItem prop="confirmPwd">
                        <Input type="password" v-model="registerPhone.confirmPwd" placeholder="请再次输入密码"/>
                    </FormItem>
                    <FormItem prop="verificationCode">
                        <Input type="text" v-model="registerPhone.verificationCode" placeholder="验证码"/>
                    </FormItem>
                    <FormItem prop="phoneCode">
                        <Input type="text" v-model="registerPhone.phoneCode" placeholder="手机动态码"/>
                    </FormItem>
                    <div class="remeber-pw">
                        <Checkbox></Checkbox>
                        <span style="font-size:12px;">
                            阅读并同意易品速的
                            <span>「服务协议」</span>
                        </span>
                    </div>
                    <FormItem>
                        <Button type="primary" long size="large" @click="loginSubmit()">注册</Button>
                    </FormItem>
                </Form>
                <div class="back-login">
                    已有账号：<span @click="toggleLoginRegister()">直接登录</span>
                </div>
            </div>
        </Card>

        <!-- 邮箱注册 -->
        <Card :bordered="false" class="register-box" v-if="email">
            <div class="register-title">
                <span>邮箱注册</span>
                <span @click="togglePhoneEmail()">手机注册</span>
            </div>
            <div class="form-box">
                <Form ref="registerEmail" :model="registerEmail" :rules="ruleRegisterEmail">
                    <FormItem prop="emailNumber">
                        <Input type="text" v-model="registerEmail.emailNumber" placeholder="请输入邮箱"/>
                    </FormItem>
                    <FormItem prop="emailPwd">
                        <Input type="password" v-model="registerEmail.emailPwd" placeholder="密码（6-16个字符；字符或数字）"/>
                    </FormItem>
                    <FormItem prop="confirmPwd">
                        <Input type="password" v-model="registerEmail.confirmPwd" placeholder="请再次输入密码"/>
                    </FormItem>
                    <FormItem prop="verificationCode">
                        <Input type="text" v-model="registerEmail.verificationCode" placeholder="验证码"/>
                    </FormItem>
                    <FormItem prop="emailCode">
                        <Input type="text" v-model="registerPhone.emailCode" placeholder="邮箱动态码"/>
                    </FormItem>
                    <div class="remeber-pw">
                        <Checkbox></Checkbox>
                        <span style="font-size:12px;">
                            阅读并同意易品速的
                            <span>「服务协议」</span>
                        </span>
                    </div>
                    <FormItem>
                        <Button type="primary" long size="large" @click="loginSubmit()">注册</Button>
                    </FormItem>
                </Form>
                <div class="back-login">
                    已有账号：<span @click="toggleLoginRegister()">直接登录</span>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
export default {
    data () {
        return {
            loginForm: {
                user: '',
                password: ''
            },
            ruleLogin: {
                user: [
                    { required: true, message: '请输入正确的用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '请输入正确的密码', trigger: 'blur' }
                ]
            },
            register: false,
            email: false,
            registerPhone: {
                phoneNumber: "",
                phonePwd: "",
                confirmPwd: "",
                verificationCode: "",
                phoneCode: ""
            },
            ruleRegister: {
                phoneNumber: [
                    { required: true, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                phonePwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '请输入正确的密码', trigger: 'blur' }
                ],
                confirmPwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '请输入正确的密码', trigger: 'blur' }
                ],
                verificationCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                phoneCode: [
                    { required: true, message: '请输入手机动态码', trigger: 'blur' }
                ]
            },
            registerEmail: {
                emailNumber: "",
                emailPwd: "",
                confirmPwd: "",
                verificationCode: "",
                emailCode: ""
            },
            ruleRegisterEmail: {
                emailNumber: [
                    { required: true, message: '请输入正确的邮箱', trigger: 'blur' }
                ],
                emailPwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '请输入正确的密码', trigger: 'blur' }
                ],
                confirmPwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '请输入正确的密码', trigger: 'blur' }
                ],
                verificationCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                emailCode: [
                    { required: true, message: '请输入邮箱动态码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 登录
        loginSubmit() {
            this.$router.push("/index/Index");
        },
        // 切换到登录/注册
        toggleLoginRegister() {
            this.register = !this.register;
            this.email = false;
        },
        // 切换到注册手机/邮箱
        togglePhoneEmail() {
            this.email = !this.email;
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
.login-bg .ivu-card {
    position: absolute;
    width: 400px;
    height: 320px;
    padding: 0 20px;
    top: 50%;
    left: 50%;
    margin-left: -210px;
    margin-top: -170px;
}
.login-bg .login-title {
    text-align: center;
    font-size: 18px;
    color: #333;
    font-weight: 500;
    margin-top: 5px;
}
.login-bg .form-box {
    margin-top: 30px;
}
.login-bg .remeber-pw {
    text-align: right;
    margin: -10px 0 10px 0;
}
.login-bg .form-other span {
    font-size: 12px;
    cursor: pointer;
}
.login-bg .form-other span:hover,
.back-login span:hover {
    color: #f1390b;
}
.login-bg .register-box {
    height: 500px;
    margin-top: -260px;
}
.login-bg .register-title {
    position: relative;
    text-align: center;
    margin-top: 5px;
}
.login-bg .register-title span {
    font-size: 18px;
    color: #333;
    font-weight: 500;
}
.login-bg .register-title span:last-child {
    position: absolute;
    top: 8px;
    right: 0;
    font-size: 12px;
    font-weight: normal;
    cursor: pointer;
}
.back-login {
    text-align: center;
    font-size: 12px;
}
.back-login span {
    color: #333;
    cursor: pointer;
}
</style>
