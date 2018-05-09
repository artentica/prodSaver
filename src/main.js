import 'babel-polyfill';
import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import 'material-design-icons-iconfont/dist/material-design-icons.scss';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
