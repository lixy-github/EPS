import axios from 'axios'
import Storage from './Storage'

const Axios = axios.create({
    baseURL: process.env.API_URL,
    timeout: 10000
})

// 添加请求拦截器
Axios.interceptors.request.use((config) => {
    const token = Storage.get('token');
    if(token){
        config.headers.common['Authorization'] = token;
    }
    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use((res) => {
    return res;
}, (err) => {
    if (!err.res) {
        return Promise.reject(err);
    }
    let code = err.res.status;
    if (location.pathname != '/login') {
        if (code == 401 || code == 402 || code == 403) {
            window.location.href = '/login'
        }
    }
    return Promise.reject(err)
});

Axios.install = (Vue) => {
    Vue.prototype.$http = axios
}

export default Axios