import Vue from 'vue'
import Router from 'vue-router'

const PublicTemplate = ()=> import("../components/publicTemplate/publicTemplate.vue")
const Login = ()=> import("../components/login/Login.vue")
const Index = ()=> import("../components/Index")

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/Login', // 登录
      component: Login
    },
    {
      path: '/Index', // 主页
      component: PublicTemplate,
      children: [
        {
          path: "Index",
          component: Index
        }
      ]
    },
    {
      path: "*",
      redirect: "/Login"
    }
  ]
})
