<template>
  <div class="header clearfix">
    <img class="logo" src="../assets/img/logo.png" alt="logo">
    <p class="title">精惠投</p>
    <div class="login" @click="login">登录</div>
    <ul class="nav clearfix">
      <li :class="{ active: activeItem[0] }" @click="index">首页</li>
      <li :class="{ active: activeItem[1] }" @click="docs">产品介绍</li>
      <li :class="{ active: activeItem[2] }" @click="about">关于我们</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeItem: new Array(3).fill(false)
    }
  },
  created() {
    // 根据url切换标题状态
    let path = this.$route.path
    switch (path) {
      case '/':
        this.activeItem[0] = true
        break
      case '/about':
        this.activeItem[2] = true
        break
      case '/docs':
        this.activeItem[1] = true
        break
      default:
        break
    }
  },
  methods: {
    login() {
      this.$router.push('/login')
    },
    index() {
      let path = this.$route.path
      if (path === '/') {
        let $index = document.querySelector('.index')
        let viewportHeight = window.innerHeight
        let speed = viewportHeight / 15
        let timer = setInterval(function () {
          $index.scrollTop = $index.scrollTop - speed
          if ($index.scrollTop == 0) {
            // 清除动画定时器
            clearInterval(timer)
          }
        }, 1000 / 60)
      } else {
        this.activeItem[0]
        this.$router.push('/')
      }
    },
    about() {
      this.activeItem[2]
      this.$router.push('/about')
    },
    docs() {
      this.activeItem[1]
      this.$router.push('/docs')
    }
  }
}
</script>


<style lang="less" scoped>
.header {
  position: fixed;
  height: 80px;
  width: 100%;
  background-color: rgba(255, 255, 255, .2);
  z-index: 1;
  .logo {
    float: left;
    margin: 17px 0 17px 150px;
    width: 71px;
    height: 46px;
  }
  .title {
    float: left;
    font-size: 28px;
    margin-left: 20px;
    color: #fff;
    line-height: 80px;
    letter-spacing: .2em;
    cursor: default;
  }
  .login {
    float: right;
    margin-top: 20px;
    margin-right: 150px;
    width: 118px;
    height: 38px;
    border: 1px solid #fff;
    border-radius: 3px;
    text-align: center;
    line-height: 38px;
    color: #fff;
    transition: all .4s ease-in-out;
    &:hover {
      cursor: pointer;
      border-color: #f45b69;
      color: #f45b69;
    }
  }
  .nav {
    float: right;
    width: auto;
    height: 100%;
    margin-right: 80px;
    >li {
      height: 100%;
      line-height: 80px;
      vertical-align: middle;
      padding: 0 35px;
      float: left;
      font-size: 18px;
      list-style: none;
      color: #fff;
      cursor: pointer;
      transition: all .3s ease-in-out;
      &:hover {
        background-color: rgba(255, 255, 255, .2);
      }
    }
    .active {
      background-color: rgba(255, 255, 255, .2);
    }
  }
}
</style>

