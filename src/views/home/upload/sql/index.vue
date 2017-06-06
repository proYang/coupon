<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-upload"></i> 数据接入</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="clearfix" style="margin-left: 25px;">
      <img class="mysql-logo" src="~assets/img/mysql.jpg">
      <div class="content-title">MySQL</div>
      <div class="content-desc">需开放数据库公网访问权限，可设置每日自动同步。</div>
    </div>
    <el-steps :space="300" :active="active" finish-status="finish" style="margin: 50px 0 20px 30px;">
      <el-step title="连接配置"></el-step>
      <el-step title="同步频率配置"></el-step>
    </el-steps>
    <el-form v-if="active == 0" :inline="true" :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="服务器" prop="ip" :rules="[
                                              { required: true, message: 'ip不能为空'},
                                              { type: 'number', message: 'ip必须为数字值'}
                                            ]">
        <el-input type="ip" v-model.number="numberValidateForm.ip" placeholder="ip地址" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="" prop="port" :rules="[
                                              { required: true, message: '端口不能为空'},
                                              { type: 'number', message: '端口必须为数字值'}
                                            ]">
        <el-input type="port" v-model.number="numberValidateForm.port" placeholder="端口" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="name" :rules="[
                                              { required: true, message: '用户名不能为空'}
                                            ]">
        <el-input type="name" v-model.number="numberValidateForm.name" placeholder="用户名" auto-complete="off"></el-input>
      </el-form-item>
      <el-col>
        <el-form-item label="密码" prop="password" :rules="[
                                              { required: true, message: '密码'}
                                            ]">
          <el-input type="password" v-model.number="numberValidateForm.password" placeholder="密码" auto-complete="off"></el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="数据库" prop="table_name" :rules="[
                                              { required: true, message: '数据库名不能为空'}
                                            ]">
          <el-input type="table_name" v-model.number="numberValidateForm.table_name" placeholder="数据库" auto-complete="off"></el-input>
        </el-form-item>
      </el-col>
      <el-col :offset="3">
        <el-form-item>
          <el-button style="margin-left:12px;margin-right:25px;" @click="resetForm('numberValidateForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('numberValidateForm')">下一步</el-button>
        </el-form-item>
      </el-col>
    </el-form>
    <el-form v-else-if="active == 1" :model="numberValidateForm" ref="numberValidateForm" class="demo-ruleForm">
      <el-form-item label="数据库同步频率">
        <el-select v-model="numberValidateForm.date" placeholder="请选择数据库同步频率">
          <el-option label="每天一次" value="day"></el-option>
          <el-option label="每周一次" value="week"></el-option>
          <el-option label="每月一次" value="month"></el-option>
          <el-option label="每季度一次" value="season"></el-option>
        </el-select>
      </el-form-item>
      <el-col :offset="4">
        <el-form-item>
          <el-button type="primary" @click="submitForm('numberValidateForm')">下一步</el-button>
        </el-form-item>
      </el-col>
    </el-form>
    <el-form v-else-if="active == 2" :model="numberValidateForm" ref="numberValidateForm" class="demo-ruleForm">
      <el-col :offset="4">
        <el-form-item>
          <el-button type="primary" @click="submitForm('numberValidateForm')">完成</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      numberValidateForm: {
        ip: '',
        port: '',
        name: '',
        password: '',
        table_name: '',
        date: ''
      }
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.active++
          if (this.active > 2) this.active = 2
          console.log(this.active)
          // ajax
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.content-title {
  margin-top: 5px;
  font-weight: 400;
  line-height: 50px;
  font-size: 22px;
  color: #1f2f3d;
}

.mysql-logo {
  float: left;
  padding-right: 25px;
  height: 100px;
}

.content-desc {
  line-height: 20px;
  font-size: 16px;
  color: #1f2f3d;
}

.demo-ruleForm {
  width: 700px;
}
</style>
