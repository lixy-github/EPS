import axios from '../libs/AxiosPlugin'
import qs from 'qs'

export const test = (data) => { return axios.post('/url', qs.stringify(data)).then(res => res.data) }

export const t2 = (params) => { return axios.get(`url?${qs.stringify(params)}`).then(res => res.data) }

export const register = (data) => { return axios.post("/api/user/public/register",data).then(res => res.data)}