import Vue from 'vue';
import App from './App.vue';
import './plugins/element';
import './plugins/avue.js'
import router from './router';
import axios from 'axios';
// import EleForm from 'vue-ele-form';

// Vue.use(EleForm);

Vue.config.productionTip = false;

const http = axios.create({
  baseURL: process.env.VUE_APP_URL,
});
Vue.prototype.$httpajax = http
Vue.prototype.$http = http

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
