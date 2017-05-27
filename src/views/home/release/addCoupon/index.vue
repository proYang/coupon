<template>
  <div>
    <div class="plugins-tips">添加优惠券</div>
    <div class="coupon-form">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="优惠券名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="优惠券类型" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择优惠券类型">
            <el-option label="折扣券" value="shanghai"></el-option>
            <el-option label="满减券" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="限定条件" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择领券限定条件">
            <el-option label="期间每人领取1张" value="shanghai"></el-option>
            <el-option label="期间每人每天领取1张" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发放数量" prop="number" :rules="[
                        { required: true, message: '数量不能为空'},
                        { type: 'number', message: '数量必须为数字值'}
                      ]">
          <el-input type="number" v-model.number="ruleForm.number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="领取时间" required>
          <el-form-item prop="date2">
            <el-date-picker v-model="ruleForm.date2" type="daterange" :clearable="pickerOtherOption.clearable" :editable="pickerOtherOption.editable" @change="pickTime" :picker-options="pickerOptions" placeholder="选择领取时间范围" align="left">
            </el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="使用时间" required>
          <el-form-item prop="date1">
            <el-date-picker v-model="ruleForm.date1" type="daterange" :clearable="pickerOtherOption.clearable" :editable="pickerOtherOption.editable" @change="pickTime" :picker-options="pickerOptions" placeholder="选择使用时间范围" align="left">
            </el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
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
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        number: 0,
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      pickerOtherOption: {
        editable: false,
        clearable: false
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一年',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
            picker.$emit('pick', [start, end])
          }
        }],
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      times: [new Date().getTime() - 3600 * 1000 * 24 * 500, new Date()]
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
  }
}
</script>

<style lang="less" scoped>
.coupon-form {
  width: 600px;
  height: auto;
}
</style>

