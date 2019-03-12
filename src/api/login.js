import axios from '../libs/AxiosPlugin'
import qs from 'qs'

//用户信息IPA（手机注册） 
export const registerP = (data) => { return axios.post("/api/user/public/register/phone",data).then(res => res.data)}

//用户信息API（邮箱注册）
export const emailP = (data) => {return axios.post("/api/user/public/register/email",data).then(res => res.data)}

//用户信息IPA（用户名是否可用） 
export const register = (params) => {return axios.get(`/api/user/public/register?${qs.stringify(params)}`).then(res => res.data) }

//authentication-rest-controller（auth）
export const login = (data) => {return axios.post(`/auth`, data).then(res => res.data) }