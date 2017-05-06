<template>
  <div class="index">
    <div class="header">
      <img class="logo" src="../../assets/img/logo.png" alt="logo">
      <p class="title">精惠投</p>
      <router-link :to="{ path: '/login' }">
        <div class="login">登录</div>
      </router-link>
    </div>
    <div class="index-content index-content-one">
      <div class="option-info">
        <p>O2O优惠券精准投放系统</p>
        <p>对优惠券发放提供合理化建议,为精准投放提供解决方案。</p>
        <div class="info-btn" v-on:click="scroll">立即入驻</div>
      </div>
    </div>
    <div class="index-content index-content-two">
      <div class="index-content-two-title">
        <h3>立即入驻精惠投预测平台</h3>
      </div>
      <div class="index-content-bg">
        <div class="index-content-bg-img"></div>
        <div class="index-content-bg-mask"></div>
      </div>
      <div class="register-box">
        <div class="item">
          <span class="icon icon-company"></span>
          <span class="input"><input type="text" value="" size="40" placeholder="公司名称"></span>
        </div>
        <div class="item">
          <span class="icon icon-name"></span>
          <span class="input"><input type="text" value="" size="40" placeholder="姓名"></span>
        </div>
        <div class="item">
          <span class="icon icon-email"></span>
          <span class="input"><input type="email" value="" size="40" placeholder="邮件"></span>
        </div>
        <div class="item">
          <span class="icon icon-phone"></span>
          <span class="input"><input type="email" value="" size="40" placeholder="电话"></span>
        </div>
        <button class="submit">提交</button>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data: function () {
    return {

    }
  },
  methods: {
    scroll(event) {
      var $index = document.querySelector('.index')
      var viewportHeight = window.innerHeight
      var speed = viewportHeight / 15
      var timer = setInterval(function () {
        $index.scrollTop = $index.scrollTop + speed
        if ($index.scrollTop == viewportHeight) {
          // 清除动画定时器
          clearInterval(timer)
        }
      }, 1000 / 60)
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}

.header {
  position: fixed;
  height: 80px;
  width: 100%;
  background-color: rgba(255, 255, 255, .2);
  z-index: 1;
  .logo {
    float: left;
    margin: 17px 0 17px 150px;
    height: 46px;
  }
  .title {
    float: left;
    font-size: 28px;
    margin-left: 20px;
    color: #fff;
    line-height: 80px;
    letter-spacing: .2em;
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
  background: url('../../assets/img/background.jpg') center center / auto 980px no-repeat #fff;
}

.option-info {
  position: absolute;
  top: 50%;
  margin-top: -100px;
  width: 100%;
  text-align: center;
  >p {
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
    &:hover {
      cursor: pointer;
      color: #f45b69;
      border-color: #f45b69;
    }
  }
}

.index-content-two {
  .index-content-bg {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    &-img {
      position: relative;
      top: 0;
      height: 100%;
      width: 100%;
      background: url('../../assets/img/background2.jpg') center center / auto 980px no-repeat #fff;
    }
    &-mask {
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 69, 99, 0.7);
    }
  }

  &-title {
    position: absolute;
    width: 100%;
    top: 80px;
    z-index: 1;
    >h3 {
      width: 100%;
      margin: 60px 0 10px;
      font-size: 36px;
      color: #fff;
      text-align: center;
    }
  }

  .register-box {
    position: absolute;
    top: 250px;
    left: 0;
    right: 0;
    font-size: 14px;
    .item {
      position: relative;
      margin: 0 auto 18px;
      width: 500px;
      height: 50px;
      border-radius: 5px;
      background-color: #fff;
      .icon {
        float: left;
        width: 75px;
        height: 100%;
        &-company {
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAeCAMAAAB3ypxcAAAAhFBMVEUAAAALUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUopm+XaXAAAAK3RSTlMAh0pBRoFxDPKPV97BG4A60SP5d27v2MyW5+PEu7afY1qvpXxnTzAtJhcuCNe26AAAAPtJREFUOMvtkclygkAUAEcGBzUJO4LK5hKN6f//vwxLURAJeMjRPryuedVFDTXiAS/LPDFLABDMRN4BQgWHr6nqDDtHCGcP9p/RdwwnS2isBOLreGWDX4oWcw+LkchxIb2LDisH1/ldLQA1XH36kAw21wO48uG3jxD3PmhAVIgRnBgu3WkLbqGWGtvWo3NQnoAuuzBB0rut2vqBUirM/STUtv20kop2qhR9MprL0LwS51rRVgx5x6q0waz0wbrert5e2b9kKbUkt9osm6z/Cp6U0sWQmiVBpQ1HWbHa6XFrs5xJ3Da7G4Zhmnp0Ghw98TzFejHLOhR7niD6AZ8rKqePUpG3AAAAAElFTkSuQmCC) center no-repeat
        }
        &-email {
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAVCAMAAABmKa5TAAAAdVBMVEUAAAALUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUoptVqtzAAAAJnRSTlMAz+La6sW8rtO1qdelj09B+PPvwJ+XZT46MgqxhGEs7Lh6WEgfEs2V/ysAAADLSURBVCjPbc3ZboMwFEXRYwg2QylzaZN0bvf/f2IMQojB+8nS0vGV7jGEi8qrSkjTKFBhwAnoFewOtSgcWUgHMoNI5bBnfSKRRbRSTnfU3KsixEWSw+zVTap45uWrTTesNux9u89ItGf1mOuqXzqy3xea6/z2xG8RpNPeQvN85FeovomkhMG/3/c8gl+UdI5cmnzL1ayT4+ZL8LLw56q+3EqrL+sRRh36mDxFmF+opJM3/FhEQ/unUAU16qG+mUDZBaw0xBeCtXH+/wD6zBxGSdR4jwAAAABJRU5ErkJggg==) center no-repeat
        }
        &-phone {
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAeCAMAAAD5ENUgAAAAWlBMVEUAAAALUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUoptjXyyAAAAHXRSTlMA9pjADMaijsTZvJPv4cy4s52HHe7qrYmCcWBDOBXgqtYAAAB0SURBVCjP7dFJDoMwEETRgrTjdiCMGYG6/zUBS8jQO/a85Zclt1SQhkeux4eVukQdA6g4yonsYVqxtJt9d7UzjbVpHRHe7X0vDyWU1hOZSgRAojZtNNYDIp/+fZFit/yykW1L2vs84Vj4Vff/+Ygl+sqeMs2caQ0cz6nduAAAAABJRU5ErkJggg==) center no-repeat
        }
        &-name {
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAMAAACXfxyGAAAAS1BMVEUAAAALUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUooLUopU7vOZAAAAGHRSTlMAQgz58tGzfVMTBYfqxZGB5T3cqnNsViELrGRmAAAAvUlEQVQoz4WR2w6DIBBEd1nQyk1tq87/f2mtBmsF9TyQISeZsAvtaJwRMW1DRR4aC/pRtEDFSnEFFHyjUa+phs77W1QpVnCZNuAUGSbTApWiglxrfV9+/7T7wcprybFOsCDO5t2tx4Y/fss4S1PzpNTEtQH8uO+NQOh/9z4A0W72BXnTH2/BK/kIzXSANWKaSHrK6GWdT3kMVGCAV8uSAhUJ3zXaDlzWjM7Ox5NOeIIpwp1ph0gBFwTqrnT3AcxPEKKf85e5AAAAAElFTkSuQmCC) center no-repeat
        }
      }
      .input {
        >input {
          position: relative;
          float: left;
          width: 425px;
          height: 100%;
          border: 0;
          outline: 0;
          border-radius: 5px;
        }
      }
    }
    .submit {
      margin: 30px auto;
      display: inherit;
      border-style: none;
      transition: all .4s;
      font-size: 16px;
      text-align: center;
      line-height: 50px;
      width: 150px;
      height: 50px;
      border-radius: 10px;
      color: #fff;
      background-color: #f45b69;
      outline: none;
      &:hover {
        cursor: pointer;
        background-color: #f13546;
      }
    }
  }
}
</style>

