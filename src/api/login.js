import axios from '../libs/AxiosPlugin'
import qs from 'qs'

// 手机注册
export const registerPhone = (data) => { return axios.post("/api/user/public/register/phone",data).then(res => res.data)}

// 邮箱注册
export const registerEmail = (data) => {return axios.post("/api/user/public/register/email",data).then(res => res.data)}

// （注册时使用）验证用户名是否可用
export const usernameValidate = (params) => {return axios.get(`/api/user/public/register?${qs.stringify(params)}`).then(res => res.data) }

//authentication-rest-controller（auth）
export const login = (data) => {return axios.post(`/auth`, data).then(res => res.data) }

// 图片验证码
export const ImageVerification = (data) =>{return axios.get(`/api/public/imageCode?${qs.stringify(data)}`).then(res => res.data) }