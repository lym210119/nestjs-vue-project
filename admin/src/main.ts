import Vue from 'vue';
import App from './App.vue';
import './plugins/element';
import './plugins/avue.js'
import router from './router';
import axios from 'axios';
// import EleForm from 'vue-ele-form';

// Vue.use(EleForm);

Vue.config.productionTip = false;

Vue.prototype.$http = axios.create({
  baseURL: 'http://192.168.1.3:3000',
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
