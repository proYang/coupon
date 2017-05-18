<template>
  <div class="login-wrap">
    <div class="ms-title">精惠投商户系统</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="user">
          <el-input v-model="ruleForm.user" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <el-button class="back" v-on:click="back" icon="arrow-left" size="mini">返回</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
          callback(new Error('请输入正确的邮箱地址'))
        } else {
          callback()
        }
      }, 300)
    }
    return {
      ruleForm: {
        user: '', // user
        password: ''
      },
      rules: {
        user: [
          { required: true, validator: checkAge, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      const that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.login(that.ruleForm).then(function (res) {
            if (res.state == 200) {
              // 登陆成功
              that.resetForm()
              localStorage.setItem('ms_user', that.ruleForm.user)
              that.$router.push('/state')
            } else {
              that.$alert('用户名不存在或密码错误', '提示', {
                confirmButtonText: '我知道了'
              })
              return
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    back() {
      this.$router.back()
    },
    resetForm() {
      var object = this.ruleForm
      for (var key in object) {
        object[key] = ''
      }
    }
  }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #24292e;
}

.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
}

.back {
  margin-top: 13px;
}
</style>
