import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Test from '../page/Test/Test';
import Login from '../page/Login/Login';
import Logout from '../page/Logout/Logout';
import Content from '../page/Content/Content.vue';
import ManagementContent from '../page/Content/ManagementContent.vue';
import CreateUpdateContent from '../page/Content/CreateUpdateContent/CreateUpdateContent.vue';
import ViewContent from '../page/Content/ViewContent/ViewContent.vue';

Vue.use(Router)

export default new Router({
  // mode: 'history',
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
  }, {
    path: '/Content',
    name: 'Content',
    component: Content
  }, {
    path: '/ManagementContent',
    name: 'ManagementContent',
    component: ManagementContent
  }, {
    path: '/Content/CreateUpdateContent',
    name: 'CreateUpdateContent',
    component: CreateUpdateContent
  }, {
    path: '/Content/ViewContent',
    name: 'ViewContent',
    component: ViewContent
  }]
})
