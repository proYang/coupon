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
  return api.post('/jinghuitou/public/index.php/getRegion', body)
}
