import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/index.vue';
import Login from '../views/Login';
import Register from '../views/Register';
import NewDetails from '../views/NewDetails';
import Personal from '../views/Personal';
import Search from '../views/Search.vue';

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
    path: '/search',
    name: 'Search',
    component: Search
  }
];

const router = new VueRouter({
  routes
});

export default router;
