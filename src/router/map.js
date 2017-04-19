
export default [
  {
    path: '/',
    name: '首页',
    redirect: '/login'
  }, {
    path: '/m',
    component: resolve => require(['../views/home/index'], resolve),
    name: '管理',
    meta: {},
    children: [
      {
        path: '/',
        component: resolve => require(['../views/home/readme/index'], resolve)
      }
    ]
  }, {
    path: '/login',
    name: '登录',
    meta: {},
    component: resolve => require(['../views/login/login'], resolve)
  }, {
    path: '*',
    name: '404',
    meta: { keepAlive: false },
    compoment: resolve => { require(['../views/errorPage/404'], resolve) }
  }
]
