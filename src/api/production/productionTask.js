import axios from '../../libs/AxiosPlugin'
import qs from 'qs'

//生产任务API (增加生产任务)
export const productionTasks = (data) => { return axios.post("/api/productionTasks",data).then(res => res.data)}

//生产任务API（findAll）
export const productiontasksFindall = (params) => {return axios.get(`api/productionTasks?${qs.stringify(params)}`).then(res => res.data)}

//生产任务API（删除生产任务）
export const productionTaskDelete = (id) => {return axios.delete(`api/productionTasks/${id}`).then(res => res.data)}

//生产任务API（修改生产任务）
export const productionTaskEdit = (data) => {return axios.put("api/productionTasks",data).then(res => res.data)}

//生产任务API（findById）
export const productionTaskFindbyid = (id) => {return axios.get(`api/productionTasks/${id}`).then(res => res.data)}