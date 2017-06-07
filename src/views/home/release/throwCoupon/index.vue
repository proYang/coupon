<template>
  <div>
    <h1>投放面板</h1>
    <el-form :model="Form" ref="ruleForm" label-width="140px" class="demo-dynamic">
      <el-form-item label="选择优惠券">
        <el-select class="coupons" v-model="Form.selected" @change="changeContent" filterable :filter-method="searchList" multiple placeholder="请输入优惠券名称，搜索需要投放的优惠券">
          <el-option v-for="item in Form.couponOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投放方案名称" prop="name">
        <el-input class="plan-name" v-model="Form.name" placeholder="请填入要投放方案名称"></el-input>
      </el-form-item>
      <el-form-item label="领取时间范围" :clearable="pickerOtherOption.clearable" :editable="pickerOtherOption.editable" required>
        <el-date-picker v-model="useTimes" type="daterange" @change="pickTime" placeholder="选择领取时间范围" align="left">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="使用时间范围" :clearable="pickerOtherOption.clearable" :editable="pickerOtherOption.editable" required>
        <el-date-picker v-model="receiveTimes" type="daterange" @change="pickTime" placeholder="选择使用时间范围" align="left">
        </el-date-picker>
      </el-form-item>
      <el-form-item v-for="(item, index) in selected" :label="item.label" :key="item.value">
        <el-input class="numbers" v-model="item.num" placeholder="填入要投放的数量（张）" required></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <el-input class="textarea" type="textarea" v-model="Form.desc" placeholder="请填写投放备注"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">投放</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const $window = window
export default {
  data() {
    return {
      pickerOtherOption: {
        editable: false,
        clearable: false
      },
      searchParams: {
        search: '',
        size: 10,
        page: 1
      },
      selected: [], // 带label的选中值
      couponHistory: [],
      Form: {
        couponOptions: [],
        selected: [],
        desc: '',
        name: ''
      },
      useTimes: [new Date().getTime(), new Date().getTime() + 3600 * 1000 * 24 * 30],
      receiveTimes: [new Date().getTime(), new Date().getTime() + 3600 * 1000 * 24 * 40]
    }
  },
  methods: {
    pickTime() {
      console.log(this.useTimes)
      console.log(this.receiveTimes)
    },
    changeContent(selectList) {
      let that = this
      that.selected = []
      selectList.forEach(function (item) {
        that.couponHistory.forEach(function (coupon) {
          if (item == coupon.value) {
            that.selected.push(coupon)
          }
        })
      })
    },
    searchList(val) {
      let that = this
      let params = this.searchParams
      if (val && val.length > 0) {
        params.search = val
      } else {
        params.search = ''
      }
      that.$api.getAllCoupon(params).then(function (res) {
        that.Form.couponOptions = []
        res.data.forEach(function (item) {
          that.couponHistory.push({ value: item.id, label: item.display_name })
          that.Form.couponOptions.push({ value: item.id, label: item.display_name })
        })
      })
    },
    submitForm(formName) {
      // 获取数据
      let that = this
      let shopInfo = JSON.parse($window.localStorage.getItem('shop_info'))
      let coupons = this.selected
      let useTimes = this.useTimes
      let receiveTimes = this.receiveTimes
      let newCoupons = []
      // 拼接参数
      coupons.forEach(function (item) {
        newCoupons.push({
          coupon_id: item.value,
          num: item.num,
          receive_start: receiveTimes[0],
          receive_end: receiveTimes[1],
          use_start: useTimes[0],
          use_end: useTimes[1]
        })
      })
      let params = {
        shop_id: shopInfo.id,
        name: that.Form.name,
        description: that.Form.desc,
        coupons: newCoupons
      }
      that.$api.distributeCoupon(params).then(function (res) {
        if (res.state == 200) {
          that.$alert('投放成功', '提示', {
            confirmButtonText: '我知道了'
          })
          that.$router.replace({ path: '/throwCoupon' })
        } else {
          that.$alert('系统错误，请重试', '提示', {
            confirmButtonText: '我知道了'
          })
          return
        }
      })
    }
  },
  mounted() {
    var that = this
    this.searchList('')
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
