<template>
  <div>
    <div class="plugins-tips">添加优惠券</div>
    <div class="coupon-form">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="优惠券名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="填写优惠券名称"></el-input>
        </el-form-item>
        <el-form-item label="优惠券类型" prop="couponType">
          <el-select v-model="ruleForm.couponType" placeholder="请选择优惠券类型">
            <el-option label="满减券" value="1"></el-option>
            <el-option label="折扣券" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="折扣率" prop="rebate" v-if="ruleForm.couponType=='2'">
          <el-input v-model="ruleForm.rebate" placeholder="例如：0.85"></el-input>
        </el-form-item>
        <el-form-item label="满足金额" prop="condition" v-if="ruleForm.couponType=='1'">
          <el-input v-model="ruleForm.condition" placeholder="单位：元"></el-input>
        </el-form-item>
        <el-form-item label="抵扣金额" prop="discount" v-if="ruleForm.couponType=='1'">
          <el-input v-model="ruleForm.discount" placeholder="单位：元"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" placeholder="填写备注信息" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        couponType: undefined, // 1-满减券  2-折扣券
        rebate: undefined, // 折扣率
        condition: 0,  // 满足金额
        discount: 0, // 折扣金额
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, message: '至少3个字符', trigger: 'blur' }
        ],
        couponType: [
          { required: true, message: '请选择优惠券类型', trigger: 'change' }
        ],
        rebate: [
          { required: true, message: '请输入折扣率', trigger: 'blur' }
        ],
        condition: [
          { required: true, message: '请输入满足金额', trigger: 'blur' }
        ],
        discount: [
          { required: true, message: '请输入折扣金额', trigger: 'blur' }
        ],
        desc: [
          { required: false, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.ruleForm.rebate = parseFloat(that.ruleForm.rebate)
          that.ruleForm.condition = parseFloat(that.ruleForm.condition)
          that.ruleForm.discount = parseFloat(that.ruleForm.discount)
          if (that.ruleForm.couponType == 2) {
            if (that.ruleForm.rebate > 1 || that.ruleForm.rebate < 0 || isNaN(that.ruleForm.rebate)) {
              that.$alert('输入的折扣率有误', '提示', {
                confirmButtonText: '我知道了'
              })
              return
            }
          } else if (that.ruleForm.couponType == 1) {
            if (that.ruleForm.condition < 0 || that.ruleForm.discount < 0 || that.ruleForm.condition < that.ruleForm.discount || isNaN(that.ruleForm.discount) || isNaN(that.ruleForm.condition)) {
              that.$alert('输入的折扣金额或满足金额有误', '提示', {
                confirmButtonText: '我知道了'
              })
              return
            }
          }
          let params = {
            type_id: that.ruleForm.couponType,
            display_name: that.ruleForm.name
          }
          if (that.ruleForm.couponType == 2) {
            // 折扣券
            params.discount = that.ruleForm.rebate
          } else {
            // 满减券
            params.discount = that.ruleForm.discount
            params.condition = that.ruleForm.condition
          }
          that.$api.addCoupon(params).then(function (res) {
            if (res.error) {
              that.$alert(res.error, '提示', {
                confirmButtonText: '我知道了'
              })
            } else {
              that.$alert('添加优惠券成功，快去投放吧', '提示', {
                confirmButtonText: '我知道了'
              })
              that.$refs[formName].resetFields()
            }
          })
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
.coupon-form {
  width: 600px;
  height: auto;
}
</style>

