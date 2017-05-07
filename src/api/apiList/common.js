import api from '../config'

// 注册接口
export const register = (body) => {
  return api.post('/jinghuitou/public/index.php/register', body)
}

// 登录接口
export const login = (body) => {
  return api.post('/jinghuitou/public/index.php/login', body)
}

// 重置密码接口
export const resetPassword = (body) => {
  return api.post('/jinghuitou/public/index.php/resetPassword', body)
}
