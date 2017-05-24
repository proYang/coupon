<template>
  <div class="index">
    <indexHead></indexHead>
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
          <span class="input">
            <input type="text" v-model="form.username" size="40" placeholder="公司名称">
          </span>
        </div>
        <div class="item">
          <span class="icon icon-name"></span>
          <span class="input">
            <input type="text" v-model="form.nickname" value="" size="40" placeholder="姓名">
          </span>
        </div>
        <div class="item">
          <span class="icon icon-email"></span>
          <span class="input">
            <input type="email" v-model="form.email" value="" size="40" placeholder="邮件">
          </span>
        </div>
        <div class="item">
          <span class="icon icon-phone"></span>
          <span class="input">
            <input type="tel" v-model="form.phone_number" value="" size="40" placeholder="电话">
          </span>
        </div>
        <div class="item">
          <span class="icon icon-lock"></span>
          <span class="input">
            <input type="password" v-model="form.password" value="" size="40" placeholder="密码">
          </span>
        </div>
        <div class="item">
          <span class="icon icon-lock"></span>
          <span class="input">
            <input type="password" v-model="form.password_confirm" value="" size="40" placeholder="确认密码">
          </span>
        </div>
        <button class="submit" v-on:click="register">提交</button>
      </div>
    </div>
  </div>
</template>



<script>
import indexHead from '../../components/IndexHeader'
export default {
  data: function () {
    return {
      form: {
        username: undefined,
        nickname: undefined,
        email: undefined,
        phone_number: undefined,
        password: undefined,
        password_confirm: undefined
      }
    }
  },
  methods: {
    scroll(event) {
      let $index = document.querySelector('.index')
      let viewportHeight = window.innerHeight
      let speed = viewportHeight / 15
      let timer = setInterval(function () {
        $index.scrollTop = $index.scrollTop + speed
        if ($index.scrollTop == viewportHeight) {
          // 清除动画定时器
          clearInterval(timer)
        }
      }, 1000 / 60)
    },
    register() {
      let that = this
      let object = this.form
      for (let key in object) {
        if (!object[key]) {
          this.$alert('您的信息不完整', '提示', {
            confirmButtonText: '我知道了'
          })
          return
        }
      }
      if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(this.form.email)) {
        this.$alert('请输入正确的邮箱地址', '提示', {
          confirmButtonText: '我知道了'
        })
        return
      }
      if (this.form.nickname.length < 5 || this.form.username < 5) {
        this.$alert('用户名或公司名称必须大于五个字符', '提示', {
          confirmButtonText: '我知道了'
        })
        return
      }
      if (this.form.password != this.form.password_confirm) {
        this.$alert('两次密码不一致', '提示', {
          confirmButtonText: '我知道了'
        })
        return
      }
      if (this.form.password.length < 8) {
        this.$alert('您的密码太短啦', '提示', {
          confirmButtonText: '我知道了'
        })
        return
      }
      let obj = Object.assign({}, this.form)
      this.$api.register(obj).then(function (res) {
        if (res.state == 200) {
          that.$alert('注册成功，快去登录吧', '提示', {
            confirmButtonText: '我知道了'
          })
          // 重置表单
          that.resetForm()
        } else {
          that.$alert('系统错误，请重试', '提示', {
            confirmButtonText: '我知道了'
          })
          return
        }
      })
    },
    resetForm() {
      let object = this.form
      for (let key in object) {
        object[key] = ''
      }
    }
  },
  components: {
    indexHead
  }
}
</script>

<style lang="less" scoped>
.index {
  overflow-y: scroll;
  width: 100%;
  height: 100%;
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
    top: 90px;
    z-index: 1;
    >h3 {
      width: 100%;
      margin: 40px 0 10px;
      font-size: 30px;
      color: #fff;
      text-align: center;
    }
  }

  .register-box {
    position: absolute;
    top: 180px;
    left: 0;
    right: 0;
    font-size: 14px;
    .item {
      position: relative;
      margin: 0 auto 18px;
      width: 420px;
      height: 45px;
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
        &-lock {
          background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDk0MTM2ODYwODg5IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEyNTIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNzQyLjQgNDA5LjZsLTI1LjYgMCAwLTc2LjhjMC0xMjcuMDI3Mi0xMDMuMzcyOC0yMzAuNC0yMzAuNC0yMzAuNHMtMjMwLjQgMTAzLjM3MjgtMjMwLjQgMjMwLjRsMCA3Ni44LTI1LjYgMGMtNDIuMzQyNCAwLTc2LjggMzQuNDU3Ni03Ni44IDc2LjhsMCA0MDkuNmMwIDQyLjM0MjQgMzQuNDU3NiA3Ni44IDc2LjggNzYuOGw1MTIgMGM0Mi4zNDI0IDAgNzYuOC0zNC40NTc2IDc2LjgtNzYuOGwwLTQwOS42YzAtNDIuMzQyNC0zNC40NTc2LTc2LjgtNzYuOC03Ni44ek0zMDcuMiAzMzIuOGMwLTk4LjgxNiA4MC4zODQtMTc5LjIgMTc5LjItMTc5LjJzMTc5LjIgODAuMzg0IDE3OS4yIDE3OS4ybDAgNzYuOC0zNTguNCAwIDAtNzYuOHpNNzY4IDg5NmMwIDE0LjEzMTItMTEuNDY4OCAyNS42LTI1LjYgMjUuNmwtNTEyIDBjLTE0LjEzMTIgMC0yNS42LTExLjQ2ODgtMjUuNi0yNS42bDAtNDA5LjZjMC0xNC4xMzEyIDExLjQ2ODgtMjUuNiAyNS42LTI1LjZsNTEyIDBjMTQuMTMxMiAwIDI1LjYgMTEuNDY4OCAyNS42IDI1LjZsMCA0MDkuNnoiIHAtaWQ9IjEyNTMiIGZpbGw9IiMwYjUyOGEiPjwvcGF0aD48L3N2Zz4=) center no-repeat;
          background-size: 35px;
        }
      }
      .input {
        >input {
          position: relative;
          float: left;
          width: 345px;
          height: 100%;
          border: 0;
          outline: 0;
          border-radius: 5px;
        }
      }
    }
    .submit {
      margin: 20px auto;
      display: inherit;
      border-style: none;
      transition: all .4s;
      font-size: 16px;
      text-align: center;
      line-height: 45px;
      width: 135px;
      height: 45px;
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

