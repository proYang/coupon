
export default [
  {
    path: '/',
    name: '首页',
    meta: {},
    component: (resolve) => { require(['../views/index/index'], resolve) }
  }, {
    path: '/index',
    name: '首页',
    meta: {},
    component: (resolve) => { require(['../views/index/index'], resolve) }
  }, {
    path: '*',
    name: '404',
    meta: {keepAlive: false},
    compoment: (resolve) => { require(['../views/index/index'], resolve) }
  }
]
