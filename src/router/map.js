
export default [
  {
    path: '/',
    name: '首页',
    meta: {},
    component: resolve => require(['../views/index/index'], resolve)
  }, {
    path: '/m',
    component: resolve => require(['../views/home/index'], resolve),
    name: '管理',
    meta: {},
    children: [
      {
        path: '/setting',
        component: resolve => require(['../views/home/setting/index'], resolve)
      },
      {
        path: '/changePassword',
        component: resolve => require(['../views/home/setting/password/index'], resolve)
      },
      {
        path: '/forecast',
        component: resolve => require(['../views/home/forecast/index'], resolve)
      },
      {
        path: '/mapChart',
        component: resolve => require(['../views/home/coupon/mapChart/index'], resolve)
      },
      {
        path: '/otherChart',
        component: resolve => require(['../views/home/coupon/otherChart/index'], resolve)
      },
      {
        path: '/upload',
        component: resolve => require(['../views/home/upload/index'], resolve)
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
