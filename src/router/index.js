import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Test from '../page/Test/Test';
import Login from '../page/Login/Login';
import Logout from '../page/Logout/Logout';

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/Test',
    name: 'Test',
    component: Test
  }, {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Elderly Admin'
    }
  }, {
    path: '/Logout',
    name: 'Logout',
    component: Logout
  }]
})
