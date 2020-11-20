import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/index.vue';
import Login from '../views/Login';
import Register from '../views/Register';
import NewDetails from '../views/NewDetails';
import Personal from '../views/Personal';
import Search from '../views/Search';
import userEdit from '../views/userEdit';
import collect from '../views/collect';
import commentList from '../views/commentList';
import attention from '../views/attention';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/newdetails/:id',
    name: 'NewDetails',
    component: NewDetails
  },
  {
    path: '/personal',
    name: 'Personal',
    component: Personal
  },
  {
    path: '/personal/useredit',
    name: 'Edit',
    component: userEdit
  },
  {
    path: '/personal/collect',
    name: 'Collect',
    component: collect
  },
  {
    path: '/personal/commentlist',
    name: 'Commentlist',
    component: commentList
  },
  {
    path: '/personal/attention',
    name: 'Attention',
    component: attention
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  }
];

const router = new VueRouter({
  routes
});

export default router;
