import api from '../config'

// 获取热门院校
export const getHotColleges = (url) => {
  return api.get('/api/product/getProductClassList')
}
