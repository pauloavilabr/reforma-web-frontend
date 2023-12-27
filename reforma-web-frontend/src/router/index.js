import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import Basket from '../views/ShoppingBasket.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import Sell from '../views/Sell.vue'
import MyProducts from '../views/MyProducts.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'LoginUser',
    component: Login
  },
  {
    path: '/register',
    name: 'RegisterUser',
    component: Register
  },
  {
    path: '/basket',
    name: 'Basket',
    component: Basket,

  },
  {
    path: '/profile',
    name: 'ProfileUser',
    component: Profile
  },
  {
    path: '/sell',
    name: 'SellProduct',
    component: Sell
  },
  {
    path: '/myproducts',
    name: 'MyProducts',
    component: MyProducts
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
