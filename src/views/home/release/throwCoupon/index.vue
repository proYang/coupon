<template>
  <div>
    <h1>投放面板</h1>
    <el-form :model="Form" label-width="100px" class="demo-dynamic">
      <el-form-item label="选择优惠券">
        <el-select class="coupons" v-model="Form.selected" multiple placeholder="请选择需要投放的优惠券">
          <el-option v-for="item in Form.couponOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投放方案名称" prop="name">
        <el-input class="plan-name" v-model="Form.name" placeholder="请填入要投放方案名称"></el-input>
      </el-form-item>
      <el-form-item v-for="(item, index) in Form.selected" :label="item" :key="item">
        <el-input class="numbers" v-model="item.value" placeholder="填入要投放的数量"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <el-input class="textarea" type="textarea" v-model="Form.desc" placeholder="请填写投放备注"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">投放</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Form: {
        couponOptions: [{
          value: '8.5折扣券',
          label: '8.5折扣券'
        }, {
          value: '7.5折扣券',
          label: '7.5折扣券'
        }, {
          value: '满100减20券',
          label: '满100减20券'
        }, {
          value: '满200减50券',
          label: '满200减50券'
        }, {
          value: '满30减5券',
          label: '满30减5券'
        }],
        selected: [],
        desc: '',
        name: ''
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted() {
    var that = this
    // setInterval(function () {
    // console.log(that.value5)
    // }, 100)
  }
}
</script>

<style lang="less" scoped>
.demo-dynamic {
  margin-top: 40px;
}

.coupons {
  width: 500px;
}

.numbers {
  width: 250px;
}

.plan-name {
  width: 350px;
}
.textarea {
  width: 600px;
}
</style>
