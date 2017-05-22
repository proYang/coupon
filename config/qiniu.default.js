/**
 * @desc 七牛云线上资源默认配置文件
 * @link    https://github.com/longtian/qiniu-webpack-plugin
 */
var config = {
  assetsPublicPath: 'http://cdn.test.cn/assets/', // 编译后静态资源路径
  config: {
    ACCESS_KEY: '',
    SECRET_KEY: '',
    bucket: 'test',
    path: 'assets/'
  }
}

try {
  // 加载非公开配置文件
  config = require('./qiniu.config')
}
catch (err) {
  console.log('can not find qiniu.config.js, so use qiniu.default.js')
}

module.exports = config