import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../components/login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/welcome',
    component: () => import(/* webpackChunkName: "about" */ '../components/home.vue'),
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import(/* webpackChunkName: "about" */ '../components/welcome.vue')
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import(/* webpackChunkName: "about" */ '../components/user/users.vue')
      },
      {
        path: '/permission',
        name: 'Permission',
        component: () => import(/* webpackChunkName: "about" */ '../components/permission/permission.vue')
      },
      {
        path: '/roles',
        name: 'Roles',
        component: () => import(/* webpackChunkName: "about" */ '../components/permission/roles.vue')
      },
      {
        path: '/categories',
        name: 'Categories',
        component: () => import(/* webpackChunkName: "about" */ '../components/cate/categories.vue')
      },
      {
        path: '/params',
        name: 'Params',
        component: () => import(/* webpackChunkName: "about" */ '../components/cate/params.vue')
      },
      {
        path: '/goods',
        name: 'Goods',
        component: () => import(/* webpackChunkName: "about" */ '../components/cate/goods.vue')
      },
      {
        path: '/goods/add',
        name: 'Add',
        component: () => import(/* webpackChunkName: "about" */ '../components/cate/add.vue')
      },
      {
        path: '/order',
        name: 'Order',
        component: () => import(/* webpackChunkName: "about" */ '../components/order/order.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

///路有导航钩子  这里用来判断登录状态
router.beforeEach((to,from,next) => {
    ///to   去哪个页面
    ///from  从哪个页面来
    ///next  一个函数表示放行     next()默认放行      next('/XXX)跳转到指定路由

    ///默认放行login路由
    if(to.path === '/login')  return next();
    ///其他路由根据是否有token判断
    const token = sessionStorage.getItem('token');
    if(token) return next();
    next('/login');

})


export default router
