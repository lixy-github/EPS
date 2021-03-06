import axios from '../../libs/AxiosPlugin'
import qs from 'qs'

//生产任务API (增加生产任务)
export const productionTasks = (data) => { return axios.post("/api/productionTasks",data).then(res => res.data)}

//生产任务API（findAll）
export const productiontasksFindall = (params) => {return axios.get(`/api/productionTasks?${qs.stringify(params)}`).then(res => res.data)}

//生产任务API（删除生产任务）
export const productionTaskDelete = (id) => {return axios.delete(`/api/productionTasks/${id}`).then(res => res.data)}

//生产任务API（修改生产任务）
export const productionTaskEdit = (data) => {return axios.put("/api/productionTasks",data).then(res => res.data)}

//生产任务API（findById）
export const productionTaskFindbyid = (id) => {return axios.get(`/api/productionTasks/${id}`).then(res => res.data)}

export const searchall = (params) => {return axios.get(`/api/productionTasks/searchall?${qs.stringify(params)}`).then(res => res.data)}

//用户信息API（用户列表）
export const userList = (data) => {return axios.get("/api/user",data).then(res => res.data)}

//公共API（文件上传）
export const fileUpload = (url) => {return axios.post("/api/public/upload",data).then(res => res.data)}

//生产任务单色码数量详表API （创建生产任务详情）
export const AdddcMoDetail = (data) => {return axios.post("/api/dcMoDetail",data).then(res => res.data)}

//生产任务单色码数量详表API （任务详情关联单）
export const TaskdetailChecklist = (params) => {return axios.get(`api/dcMoDetail/searchall?${qs.stringify(params)}`).then(res => res.data)}

//生产任务单色码数量详表API（修改生产任务详情）
export const modifyProductionTask = (data) => {return axios.post("/api/dcMoDetail",data).then(res => res.data)}

//生产任务单色码数量详表API（删除生产任务详情）
export const deleteProduction = (id) => {return axios.delete(`/api/dcMoDetail/${id}`).then(res => res.data)}

//生产任务单色码数量详表API（任务编辑）
export const modity = (data) => {return axios.put(`api/dcMoDetail/moidty?${qs.stringify(data,{arrayFormat:"repeat"})}`).then(res => res.data)}

//生产任务单色码数量详表API（外发编辑列表）
export const outgoingEdit = (data) => {return axios.get(`api/dcMoDetail/searwaifa?${qs.stringify(data)}`).then(res => res.data)}

//生产任务单色码数量详表API（外发编辑）
export const modityUpdate = (data) => {return axios.put(`api/dcMoDetail/update?${qs.stringify(data,{arrayFormat:"repeat"})}`).then(res => res.data)}

//生产任务单色码数量详表API（外发单条编辑）

export const searlist = (data) => {return axios.get(`api/dcMoDetail/searlist?${qs.stringify(data)}`).then(res => res.data)}