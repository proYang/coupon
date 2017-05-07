<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-setting"></i> 密码设置（密码长度需要8-32个字符）</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form-box">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="原密码">
          <el-input v-model="form.prepassword" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.password_confirm" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      form: {
        prepassword: '',
        password: '',
        password_confirm: ''
      }
    }
  },
  methods: {
    onSubmit() {
      var that = this
      var object = this.form
      for (var key in object) {
        if (!object[key]) {
          this.$alert('您的填写不完整', '提示', {
            confirmButtonText: '我知道了'
          })
          return
        }
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
      this.$api.resetPassword(this.form).then(function (res) {
        if (res.state == 200) {
          that.$message.success('修改成功！')
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
      var object = this.form
      for (var key in object) {
        object[key] = ''
      }
    }
  }
}
</script>
