
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
        path: '/releaseForecast',
        component: resolve => require(['../views/home/release/forecast/index'], resolve)
      }, {
        path: '/releaseAddCoupon',
        component: resolve => require(['../views/home/release/addCoupon/index'], resolve)
      }, {
        path: '/releaseIndex',
        component: resolve => require(['../views/home/release/index'], resolve)
      }, {
        path: '/releaseRecords',
        component: resolve => require(['../views/home/release/records/index'], resolve)
      },
      {
        path: '/mapChart',
        component: resolve => require(['../views/home/coupon/mapChart/index'], resolve)
      },
      {
        path: '/lineChart',
        component: resolve => require(['../views/home/coupon/lineChart/index'], resolve)
      },
      {
        path: '/spreadChart',
        component: resolve => require(['../views/home/coupon/spreadChart/index'], resolve)
      },
      {
        path: '/upload',
        component: resolve => require(['../views/home/upload/index'], resolve)
      },
      {
        path: '/financeForms',
        component: resolve => require(['../views/home/finance/forms/index'], resolve)
      },
      {
        path: '/financeRecharge',
        component: resolve => require(['../views/home/finance/recharge/index'], resolve)
      },
      {
        path: '/financeIndex',
        component: resolve => require(['../views/home/finance/index'], resolve)
      }
    ]
  }, {
    path: '/login',
    name: '登录',
    meta: {},
    component: resolve => require(['../views/login/login'], resolve)
  }, {
    path: '/docs',
    name: '产品介绍',
    meta: {},
    component: resolve => require(['../views/docs/index'], resolve)
  }, {
    path: '/about',
    name: '关于我们',
    meta: {},
    component: resolve => require(['../views/about/index'], resolve)
  }, {
    path: '*',
    name: 'error',
    meta: {},
    component: resolve => require(['../views/errorPage/404'], resolve)
  }
]
