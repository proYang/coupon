<template>
  <div class="header">
    <router-link :to="{ path: '/' }">
      <div class="logo">精惠投商户系统</div>
    </router-link>
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="user-logo" src="../assets/img/logo_user.jpg"> {{username}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="seetingIndex">商户设置</el-dropdown-item>
          <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
const $window = window
export default {
  data() {
    return {
      name: 'linxin'
    }
  },
  computed: {
    username() {
      // let username = localStorage.getItem('ms_username')
      let username = '沁园重邮店'
      return username ? username : this.name
    }
  },
  mounted() {
    // 判断是否登录
    this.judgeLogin()
    this.getShopInfo()
  },
  methods: {
    handleCommand(command) {
      var that = this
      if (command == 'loginout') {
        // 登出
        localStorage.removeItem('ms_username')
        this.$api.logout().then(function (res) {
          that.$router.push('/')
        })
      } else if (command == 'changePassword') {
        this.$router.push('/changePassword')
      } else if (command == 'seetingIndex') {
        this.$router.push('/setting')
      }
    },
    judgeLogin() {
      var that = this
      this.$api.getInfo().then(function (res) {
        if (res.state == 233) {
          // 未登录
          that.$router.push('/login')
        }
      }, function (rej) {
        // 未登录
        that.$router.push('/login')
      })
    },
    getShopInfo() {
      // 获取商户列表
      let that = this
      this.$api.getShopList().then(function (res) {
        if (res.data.length <= 0) return
        // 需通过localStorage保存 商户信息
        let info = res.data[0]
        $window.localStorage.setItem('shop_info', JSON.stringify(info))
      })
    }
  }
}
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  line-height: 70px;
  color: #fff;
  background-color: #24292e;
}

.header .logo {
  color: #fff;
  float: left;
  width: 250px;
  text-align: center;
  cursor: pointer;
}

.user-info {
  float: right;
  padding-right: 50px;
  font-size: 16px;
  color: #fff;
}

.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}

.user-info .user-logo {
  position: absolute;
  left: 0;
  top: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
}

.el-dropdown-menu__item {
  text-align: center;
}
</style>
