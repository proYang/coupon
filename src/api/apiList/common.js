import api from '../config'

// 注册接口
export const register = (body) => {
  return api.post('/jinghuitou/public/index.php/register', body)
}

// 登录接口
export const login = (body) => {
  return api.post('/jinghuitou/public/index.php/login', body)
}

// 登出接口
export const logout = (body) => {
  return api.post('/jinghuitou/public/index.php/logout', body)
}

// 重置密码接口
export const resetPassword = (body) => {
  return api.post('/jinghuitou/public/index.php/resetPassword', body)
}

// 获取商家资料
export const getInfo = () => {
  return api.post('/jinghuitou/public/index.php/getInfo')
}

// 更改商家资料
export const editInfo = (body) => {
  return api.post('/jinghuitou/public/index.php/editInfo', body)
}

// 获取省市县三级地址
export const getRegion = (body) => {
  return api.post('/jinghuitou/public/index.php/region/getRegion', body)
}

// 获取商户类型列表
export const getClassification = (body) => {
  return api.get('/jinghuitou/public/index.php/classification', body)
}

// 设置商家分类
export const addClassification = (body) => {
  return api.post('/jinghuitou/public/index.php/classification/add', body)
}

// 添加商户
export const updateShopInfo = (body) => {
  return api.post('/jinghuitou/public/index.php/shop/saveShop', body)
}

// 获取商户列表
export const getShopList = (body) => {
  return api.post('/jinghuitou/public/index.php/shop', body)
}

/*
    获取商户详细信息
    - URL:www.jinghuitou.com/jinghuitou/public/index.php/shop/getInfo
    - | 参数名     | 默认值      | 注释   |
      | ------- | -------- | ---- |
      | shop_id | required | 商店id |
*/
export const getShopInfo = (body) => {
  return api.post('/jinghuitou/public/index.php/shop/getInfo', body)
}

/*
销售记录导入
    - URL:www.jinghuitou.com/jinghuitou/public/index.php/shop/importRecords
    - | 参数名     | 默认值      | 注释           |
      | ------- | -------- | ------------ |
      | records | Required | csv\|excel文件 |
      | shop_id | required | 商店id         |
*/
export const uploadRecords = (body) => {
  return api.post('/jinghuitou/public/index.php/shop/importRecords', body)
}

// 优惠券推荐
export const getCouponList = (body) => {
  return api.post('/jinghuitou/public/index.php/shop/couponStatus', body)
}
