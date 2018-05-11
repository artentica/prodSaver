import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import RuleForm from './views/RuleForm.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Rules',
      component: Home,
    },
    {
      path: '/rule/:id',
      name: 'EditRule',
      component: RuleForm,
      props: true,
    },
  ],
});
