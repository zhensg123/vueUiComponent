import Vue from "vue";
// import unitUi from './packages/index'
import App from './App.vue'
import router from './router'
import './packages'
import {codemirror} from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, { size: 'mini', zIndex: 3000 })

Vue.use(codemirror)

new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })