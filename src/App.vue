<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import api from './api'
export default {
  name: 'app',
  data() {
    return {
      $loader: undefined,
      $progress: undefined,
      timer: undefined
    }
  },
  created() {
    // 钩进度条开始之前router-view移动
    let that = this
    this.$router.beforeEach((to, from, next) => {
      that.getElement()
      that.show()
      next()
    })
    // 路由进度条完成后完成router-view移动
    this.$router.afterEach((to, from) => {
      // 关闭加载进度条
      that.close()
    })
  },
  methods: {
    getElement() {
      if (this.$loader) return
      this.$loader = document.getElementById('J_pjax-loader-bar')
      if (!this.$loader) return
      this.$progress = this.$loader.childNodes[0]
    },
    show() {
      let that = this
      if (!this.$progress) return
      this.timer = setInterval(function () {
        that.$progress.style.width = (parseFloat(that.$progress.style.width) >>> 0) + 1 + '%'
      }, 1000 / 60)
      this.$progress.style.width = 0
      this.$loader.className = 'pjax-loader-bar is-loading'
    },
    close() {
      if (!this.$progress || !this.$loader) return
      clearInterval(this.timer)
      this.$progress.style.width = '100%'
      this.$loader.className = 'pjax-loader-bar'
    }
  }
}

</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
































/*深色主题*/
</style>
