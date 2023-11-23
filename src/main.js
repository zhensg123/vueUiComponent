import Vue from "vue";
import unitUi from './packages/index'
import App from './App.vue'
import router from './router'

Vue.use(unitUi)

new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })