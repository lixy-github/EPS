<template>
<!-- import { valid } from 'semver'; -->
    <div class="login-bg">
        <!-- 用户登录 -->
        <Card :bordered="false" v-if="!register">
            <div class="login-title">用户登录</div>
            <Form  ref="loginForm" :model="loginForm" :rules="ruleLogin" class="form-box" @keydown.enter.native="loginSubmit">
                <FormItem prop="username">
                    <Input type="text" v-model="loginForm.username" placeholder="请输入手机号/邮箱">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="loginForm.password" placeholder="请输入密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <div class="remember-pwd">
                    <Checkbox v-model="loginForm.rememberPwd">记住密码</Checkbox>
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
                    <FormItem prop="username">
                        <Input v-model="registerPhone.username" placeholder="请输入手机号"/>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="registerPhone.password" placeholder="密码（6-16个字符；英文或数字）"/>
                    </FormItem>
                    <FormItem prop="confirmPwd">
                        <Input type="password" v-model="registerPhone.confirmPwd" placeholder="请再次输入密码"/>
                    </FormItem>
                    <div class="cell-code" >
                        <FormItem style="margin-bottom: 0px;"  prop="verificationCode">
                            <Input v-model="registerPhone.verificationCode" placeholder="请输入图片验证码"/>
                        </FormItem>
                        <img @click="replaceCode()" :src="imgValidateCode">
                    </div>
                    <div class="remember-pwd">
                        <Checkbox v-model="registerPhone.agreement"></Checkbox>
                        <span style="font-size:12px;">
                            阅读并同意易品速的
                            <span>「服务协议」</span>
                        </span>
                    </div>
                    <FormItem>
                        <Button type="primary" long size="large" @click="loginSubmitp()">注册</Button>
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
                    <FormItem prop="username">
                        <Input type="text" v-model="registerEmail.username" placeholder="请输入邮箱"/>
                    </FormItem>
                    <FormItem  prop="password">
                        <Input type="password" v-model="registerEmail.password" placeholder="密码（6-16个字符；英文或数字）"/>
                    </FormItem>
                    <FormItem prop="confirmPwd">
                        <Input type="password" v-model="registerEmail.confirmPwd" placeholder="请确认密码"/>
                    </FormItem>
                    <FormItem prop="verificationCode">
                        <Input type="text" v-model="registerEmail.verificationCode" placeholder="请输入邮箱动态码"/>
                    </FormItem>
                    <div class="remember-pwd">
                        <Checkbox v-model="registerEmail.agreement"></Checkbox>
                        <span style="font-size:12px;">
                            阅读并同意易品速的
                            <span>「服务协议」</span>
                        </span>
                    </div>
                    <FormItem>
                        <Button type="primary" @click="emailhanld" long size="large">注册</Button>
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
import {registerPhone,
        registerEmail,
        usernameValidate,
        login,
        ImageVerification
        } from "../../api/login"
import Storage from '../../libs/Storage'

export default {
    data () {
        const validateUsername = (rule, value, callback) => {
            usernameValidate({username: value}).then(res => {
                if (res.data) {
                    callback()
                } else {
                    callback(new Error('该用户名已存在'))
                }
            })
        };
        // 验证手机号
        const validatePhone = (rule, value, callback) => {
            var phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            if (!phoneReg.test(value)) {
                callback(new Error("请输入正确的手机号"));
            } else {
                usernameValidate({username: value}).then(res => {
                    if (res.data) {
                        callback()
                    } else {
                        callback(new Error('该手机号已注册'))
                    }
            })
            }
        };
        //验证邮箱是否已注册
        const validateEmail = (rule, value, callback) => {
            usernameValidate({username:value}).then(res => {
                if(res.data){
                    callback()
                }else{
                    callback(new Error('该邮箱已注册'));
                }
            })
        }
        // 验证注册手机密码
        const validatePassword = (rule, value, callback) => {
            var pwdReg = /^[0-9a-zA-Z]{6,16}$/;
            if(!pwdReg.test(value)) {
                callback(new Error("密码是由6到16位数字和英文组成"));
            } else if(this.registerPhone.confirmPwd.length>0 && value!=this.registerPhone.confirmPwd) {
                callback(new Error("两次密码不一致"));
            } else {
                callback();
            }
        }
        // 确认注册手机密码
        const validateRePwd = (rule, value, callback) => {
            if(value.length==0) {
                callback(new Error("请再次输入密码"))
            } else if(value!=this.registerPhone.password) {
                callback(new Error("两次密码不一致"))
            } else {
                callback();
            }
        }
        // 验证注册邮箱密码
        const validateEmialPassword = (rule, value, callback) => {
            var pwdReg = /^[0-9a-zA-Z]{6,16}$/;
            if(!pwdReg.test(value)) {
                callback(new Error("密码是由6到16位数字和英文组成"));
            } else if(this.registerEmail.confirmPwd.length>0 && value!=this.registerEmail.confirmPwd) {
                callback(new Error("两次密码不一致"));
            } else {
                callback();
            }
        }
        // 确认注册邮箱密码
        const validateEmailRePwd = (rule, value, callback) => {
            if(value.length==0) {
                callback(new Error("请再次输入密码"))
            } else if(value!=this.registerEmail.password) {
                callback(new Error("两次密码不一致"))
            } else {
                callback();
            }
        }

        return {
            loginForm: {
                username: "",
                password: "",
                rememberPwd: true
            },
            ruleLogin: {
                username: [
                    { required: true, message: '请输入用户名' , trigger: 'blur'}
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '请输入正确的密码', trigger: 'blur' }
                ]
            },
            register: false,
            email: false,
            position: "left",
            registerPhone: {
                username: "",
                password: "",
                confirmPwd: "",
                verificationCode: "",
                phoneCode: "",
                agreement: false
            },
            imgValidateCode: '',
            ruleRegister: {
                username: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: validatePhone, trigger: "change" }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator:validatePassword, trigger: 'change' }
                ],
                confirmPwd: [
                    { required: true, message: '请确认密码', trigger: 'blur' },
                    { validator:validateRePwd, trigger: 'blur' }
                ],
                verificationCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { validator:validateRePwd, trigger: 'blur' }
                ]
            },
            registerEmail: {
                username: "",
                password: "",
                confirmPwd: "",
                verificationCode: "",
                emailCode: "",
                agreement: false
            },
            ruleRegisterEmail: {
                username: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
                    { validator: validateEmail, trigger: "change" }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' },
                    { validator:validateEmialPassword, trigger: 'change' }
                ],
                confirmPwd: [
                    { required: true, message: '请确认密码', trigger: 'change' },
                    { validator:validateEmailRePwd, trigger: 'blur' }
                ],
                verificationCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { validator:validateEmailRePwd, trigger: 'blur' }
                ],
                emailCode: [
                    { required: true, message: '请输入邮箱动态码', trigger: 'blur' },
                    { validator:validateEmailRePwd, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        //登陆
        loginSubmit() {
            this.$refs['loginForm'].validate((valid) => {
                if(valid){
                    login(this.loginForm).then(res => {
                        Storage.set('token', res.token);
                        Storage.set('username', this.loginForm.username);
                        Storage.set('remberPwd', this.loginForm.rememberPwd);
                        console.log(res)
                        if (this.loginForm.rememberPwd) {
                            Storage.set('password', this.loginForm.password);
                        } else {
                            Storage.set('password', '')
                        }
                        this.$router.push("/index/Index");
                    }).catch(err=>{
                        this.$Message.error(err.response.data);
                    })
                }
            })
        },
        // 手机注册
        loginSubmitp() {
            this.$refs['registerPhone'].validate((valid) => {
                if(valid){
                    registerPhone(this.registerPhone).then(res=>{
                        this.$Message.info("注册成功!");
                        this.register = false;
                    })
                }
            })
        },
        //邮箱注册
        emailhanld() {
            this.$refs['registerEmail'].validate((valid) => {
                if(valid){
                    registerEmail(this.registerEmail).then(res => {
                        this.$Message.info("注册成功!");
                        this.email = false;
                        this.register = false;
                    })
                }
            })
        },
        // 切换到登录/注册
        toggleLoginRegister() {
            this.register = !this.register;
            this.email = false;
            if (this.register) {
                this.getImgCode()
            }
        },
        // 切换到注册手机/邮箱
        togglePhoneEmail() {
            this.email = !this.email;
            if (!this.email) {
                this.getImgCode();
            }
        },
        // 图片验证码
        getImgCode() {
            let data = {
                width: 80,
                height: 30,
                length: 6,
                fontSize: 18
            }
            ImageVerification(data).then(res => {
                this.imgValidateCode = res.data.base64;
            })
        },
        // 点击图片更换图片验证码
        replaceCode() {
            this.getImgCode();
        }
    },
    mounted() {
        let username = Storage.get('username');
        let password = Storage.get('password');
        let remberPwd = Storage.get('remberPwd');
        if (username != null) {
            this.loginForm.username = username;
        }
        if (remberPwd != null) {
            this.loginForm.rememberPwd = remberPwd;
        }
        if (remberPwd) {
            this.loginForm.password = password;
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
.login-bg .remember-pwd {
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
    height: 420px;
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
.cell-code{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
</style>
