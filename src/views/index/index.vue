<template>
  <div class="index">
    <div class="header">
      <p class="title">精惠投</p>
      <router-link :to="{ path: '/login' }">
        <div class="login">登录</div>
      </router-link>
    </div>
    <div class="index-content index-content-one">
      <div class="option-info">
          <p>O2O优惠券精准投放系统</p>
          <p>对优惠券发放提供合理化建议,为精准投放提供解决方案。</p>
          <a href="https://www.ghostcloud.cn/service?type=enterprise#summary">
              <div class="info-btn">立即入驻</div>
          </a>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.index {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.header {
  position: fixed;
  height: 80px;
  width: 100%;
  background-color: rgba(255,255,255,.2);
  z-index: 1;
  .title {
    font-size: 28px;
    color: #fff;
    line-height: 80px;
    margin-left: 150px;
    letter-spacing: .5em;
  }
  .login {
    position: absolute;
    top: 20px;
    right: 150px;
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
}
.index-content {
  position: relative;
  width: 100%;
  height: 100%;
}
.index-content-one {
  background: url(https://www.ghostcloud.cn/wp-content/themes/ecos/images/home/banner2.png?v=3a624521b0) center center / auto 980px no-repeat #fff;
}
.option-info {
  position: absolute;
  top: 50%;
  margin-top: -100px;
  width: 100%;
  text-align: center;
  > p {
      margin: 24px 0;
      font-size: 30px;
      color: #fff;
      font-weight: 500;
  }
  .info-btn {
    position: absolute;
    left: 50%;
    margin-left: -100px;
    margin-top: 24px;
    border: 2px solid #fff;
    width: 196px;
    height: 46px;
    border-radius: 10px;
    font-size: 20px;
    line-height: 46px;
    color: #fff;
    transition: all .4s;
    &:hover{
      cursor: pointer;
      color: #f45b69;
      border-color: #f45b69;
    }
  }
}
</style>

<script>
export default {
}
</script>
