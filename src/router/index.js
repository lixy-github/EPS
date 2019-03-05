import Vue from 'vue'
import Router from 'vue-router'

const PublicTemplate = ()=> import("@/components/publicTemplate/publicTemplate")
const Login = ()=> import("@/view/login/Login")
const Index = ()=> import("@/components/Index")
const productionTask = ()=> import("@/view/production/productionTask")

Vue.use(Router)

export default new Router({
  mode: "history",
  // base: "/web/EPS/dist/",    // 打包测试
  routes: [
    {
      path: '/Login', // 登录
      component: Login
    },
    {
      path: '/index', // 业务
      component: PublicTemplate,
      children: [
        {
          path: "Index",
          component: Index
        }
      ]
    },
    {
      path: "/production", // 生产任务
      component: PublicTemplate,
      children: [
        {
          path: "productionTask", 
          component: productionTask
        }
      ]
    },
    // {
    //   path: "*",
    //   redirect: "/Login"
    // }
  ]
})
