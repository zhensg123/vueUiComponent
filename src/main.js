import Vue from "vue";
// import unitUi from './packages/index'
import App from './App.vue'
import router from './router'
import './packages'
import {codemirror} from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(codemirror)

new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })