import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  next();
})

axios.defaults.baseURL = "http://127.0.0.1:8000/api"
axios.interceptors.request.use(
  config => {
    // App.vueのthenの前の共通処理
    return config;
  },
  error => {
    // App.vueのcatchの前の共通処理
    return Promise.reject(error);
  },
);
axios.interceptors.response.use(
  config => {
    // App.vueのthenの前の共通処理
    return config;
  },
  error => {
    // App.vueのcatchの前の共通処理
    return Promise.reject(error);
  },
);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
