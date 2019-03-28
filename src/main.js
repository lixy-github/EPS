// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import router from './router'
import 'font-awesome/css/font-awesome.min.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import AxiosPlugin from './libs/AxiosPlugin'
import '../src/assets/css/public.css'
import App from './App'
import $ from 'jquery'
import './my-theme/index.less'
import store from './vuex/index'

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(AxiosPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
