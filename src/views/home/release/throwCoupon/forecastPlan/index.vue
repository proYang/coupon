<template>
  <div>
    <h1 class="title">投放方案预测</h1>
    <el-form :inline="true" :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
      <el-form-item inline label="投放数量" prop="age" :rules="[
                                              { required: true, message: '投放数量不能为空'},
                                              { type: 'number', message: '投放数量必须为数字值'}
                                            ]">
        <el-input class="input" type="age" v-model.number="numberValidateForm.age" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="期望领取率" prop="age" :rules="[
                                              { required: true, message: '领取率不能为空'},
                                              { type: 'number', message: '领取率必须为数字值'}
                                            ]">
        <el-input class="input" type="age" v-model.number="numberValidateForm.age" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="期望使用率" prop="age" :rules="[
                                              { required: true, message: '使用率不能为空'},
                                              { type: 'number', message: '使用率必须为数字值'}
                                            ]">
        <el-input class="input" type="age" v-model.number="numberValidateForm.age" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')">获取推荐方案</el-button>
        <el-button @click="resetForm('numberValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData5" style="width: 100%">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item :label="item.name + `：`" :key="item.name + `：`" v-for="(item, index) in props.row.coupons">
              <span>{{ item.num }}张</span>
            </el-form-item>
            <el-form-item label="投放总数：">
              <span>{{ props.row.totalNum }}张</span>
            </el-form-item>
            <el-form-item label="预计领取率：">
              <span>{{ props.row.reciveRate }}</span>
            </el-form-item>
            <el-form-item label="预计领取人数：">
              <span>{{ props.row.reciveNum }}人</span>
            </el-form-item>
            <el-form-item label="预计使用率：">
              <span>{{ props.row.useRate }}</span>
            </el-form-item>
            <el-form-item label="预计使用人数：">
              <span>{{ props.row.useNum }}人</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="投放数量" prop="totalNum">
      </el-table-column>
      <el-table-column label="预计领取率" prop="reciveRate">
      </el-table-column>
      <el-table-column label="预计使用率" prop="useRate">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="primary" size="small" @click='toThrowCoupon'>使用方案</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numberValidateForm: {
        age: ''
      },
      tableData5: [
        {
          coupons: [{
            name: '8.5折扣券',
            num: 210
          }, {
            name: '7.5折扣券',
            num: 600
          }, {
            name: '满100减20券',
            num: 100
          }, {
            name: '满200减50券',
            num: 321
          }, {
            name: '满30减5券',
            num: 500
          }],
          totalNum: 4000,
          reciveRate: 0.82,
          reciveNum: 2343,
          useRate: 0.34,
          useNum: 1234
        }, {
          coupons: [{
            name: '8.5折扣券',
            num: 210
          }, {
            name: '7.5折扣券',
            num: 600
          }, {
            name: '满100减20券',
            num: 100
          }, {
            name: '满200减50券',
            num: 321
          }, {
            name: '满30减5券',
            num: 500
          }],
          totalNum: 4000,
          reciveRate: 0.82,
          reciveNum: 2343,
          useRate: 0.34,
          useNum: 1234
        }, {
          coupons: [{
            name: '8.5折扣券',
            num: 210
          }, {
            name: '7.5折扣券',
            num: 600
          }, {
            name: '满100减20券',
            num: 100
          }, {
            name: '满200减50券',
            num: 321
          }, {
            name: '满30减5券',
            num: 500
          }],
          totalNum: 4000,
          reciveRate: 0.82,
          reciveNum: 2343,
          useRate: 0.34,
          useNum: 1234
        }, {
          coupons: [{
            name: '8.5折扣券',
            num: 210
          }, {
            name: '7.5折扣券',
            num: 600
          }, {
            name: '满100减20券',
            num: 100
          }, {
            name: '满200减50券',
            num: 321
          }, {
            name: '满30减5券',
            num: 500
          }],
          totalNum: 4000,
          reciveRate: 0.82,
          reciveNum: 2343,
          useRate: 0.34,
          useNum: 1234
        }]
    }
  },
  methods: {
    toThrowCoupon() {
      this.$router.push({ path: '/throwCoupon' })
    },
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
.title {
  margin: 20px;
}

.input {
  width: 150px;
}

.demo-table-expand {
  margin: 20px;
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

