import Vue from 'vue'
import App from '@/App'
import router from './router'
import store from './store'
//import fastclick from 'fastclick'
import LazyLoad from 'vue-lazyload'

import 'common/stylus/index.styl'

/* eslint-disable no-unused-vars */
//import vConsole from 'vconsole'

Vue.use(LazyLoad,{
  preload: 1.3,
  error: require('common/image/default.png'),
  loading: require('common/image/default.png'),
  attempt: 3
})
//fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
