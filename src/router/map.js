
export default [
  {
    path: '/',
    name: '首页',
    redirect: '/login'
  }, {
    path: '/m',
    component: resolve => require(['../components/Home.vue'], resolve),
    name: '管理',
    meta: {},
    children: [
    ]
  }, {
    path: '/login',
    name: '登录',
    meta: {},
    component: resolve => require(['../views/login/login'], resolve)
  }, {
    path: '*',
    name: '404',
    meta: {keepAlive: false},
    compoment: resolve => { require(['../views/index/index'], resolve) }
  }
]
