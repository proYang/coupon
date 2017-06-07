<template>
  <div>
    <div class='crumbs'>
      <el-breadcrumb separator='/'>
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 商户优惠券分析</el-breadcrumb-item>
        <el-breadcrumb-item>优惠券领取和使用状况</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="block">
      <span class="demonstration">数据所在时间段：</span>
      <el-date-picker v-model="times" type="daterange" :clearable="pickerOtherOption.clearable" :editable="pickerOtherOption.editable" @change="pickTime" :picker-options="pickerOptions" placeholder="选择所需数据的时间范围" align="left">
      </el-date-picker>
    </div>
    <div class="plugins-tips tips">小提示：通过每一条消费记录，掌握已消费顾客是否使用优惠券，以及已领取优惠券但未消费的潜在客户。</div>
    <div class="echarts-container">
      <div id="J_echarts-bar" class="echarts"></div>
      <div id="J_echarts-pie" class="echarts"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { Loading } from 'element-ui'
const $window = window
export default {
  data: function () {
    return {
      loadingInstance: undefined,
      bar: {
        color: ['#224870', '#13CE66', '#F7BA2A', '#FF4949'],
        title: {
          text: '优惠券领取和使用记录数量图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: '{b0}: {c0}人<br />'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          data: ['已领券但未消费用户', '已领券并消费用户', '未领券但已消费用户'],
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          name: '人数/个',
          nameGap: 10,
          type: 'value',
          axisLabel: {
            formatter: '{value} 人'
          }
        },
        series: [
          {
            name: '人数',
            type: 'bar',
            barWidth: '50%',
            data: [0, 0, 0]
          }
        ]
      },
      pie: {
        title: {
          text: '优惠券领取和使用记录占比图'
        },
        // color: ['#1abc9c', '#324057', '#9a59b5'],
        color: ['#92140c', '#fa8334', '#111d4a'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}人 ({d}%)'
        },
        legend: {
          orient: 'vertical',
          top: 30,
          x: 'left',
          data: ['已领券但未消费用户', '已领券并消费用户', '未领券但已消费用户']
        },
        series: [
          {
            name: '领取状态',
            type: 'pie',
            radius: '70%',
            center: ['50%', '60%'],
            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 0, name: '已领券但未消费用户' },
              { value: 0, name: '已领券并消费用户' },
              { value: 0, name: '未领券但已消费用户' }
            ]
          }
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
      times: [1483200000000, new Date()]
    }
  },
  methods: {
    fetchData() {
      // 获取数据
      let that = this
      let shopInfo = JSON.parse($window.localStorage.getItem('shop_info'))
      let params = {
        shop_id: shopInfo.id,
        start: new Date(that.times[0]).getTime(),
        end: new Date(that.times[1]).getTime()
      }
      this.$api.couponNumByUseful(params).then(function (res) {
        // res.data = {
        //   spendWithCoupon: 234,
        //   spendWithoutCoupon: 345,
        //   receiveCouponWithSpend: 521
        // }
        // 关闭loading
        that.loadingInstance.close()
        // 0-已领券  1-未领取 2-已使用 3-未使用
        that.bar.series[0].data[0] = res.data.spendWithCoupon
        that.bar.series[0].data[1] = res.data.spendWithoutCoupon
        that.bar.series[0].data[2] = res.data.receiveCouponWithoutSpend
        // 画柱状图
        that.drawbar()
        that.pie.series[0].data[0].value = res.data.spendWithCoupon
        that.pie.series[0].data[1].value = res.data.spendWithoutCoupon
        that.pie.series[0].data[2].value = res.data.receiveCouponWithoutSpend
        // 画饼状图
        that.drawpie()
      })
    },
    drawbar() {
      var chart = echarts.init(document.querySelector('#J_echarts-bar'))
      chart.setOption(this.bar, true)
    },
    drawpie() {
      var chart = echarts.init(document.querySelector('#J_echarts-pie'))
      chart.setOption(this.pie, true)
    },
    pickTime(val) {
      let times = this.times
      if (times[0] === null || times[1] === null) return
      // 重新获取数据
      this.loadingInstance = Loading.service({
        target: '.echarts-container',
        body: 'loading',
        text: '数据获取中'
      })
      this.fetchData()
    }
  },
  mounted() {
    this.loadingInstance = Loading.service({
      target: '.echarts-container',
      body: 'loading',
      text: '数据获取中'
    })
    this.fetchData()
  },
  destroyed() {
    // 关闭loading
    this.loadingInstance.close()
  }
}
</script>

<style lang='less' scoped>
.echarts {
  margin-top: 20px;
  width: 50%;
  height: 450px;
  float: left;
}

.crumbs {
  float: left;
}

.block {
  float: left;
  position: relative;
  top: -12px;
  left: 50px;
}

.echarts-container {
  position: absolute;
  position: absolute;
  width: 85%;
  height: 450px;
  left: 35px;
  top: 120px;
}

.tips {
  position: absolute;
  top: 70px;
  width: 85%;
  font-size: 14px;
  padding: 15px 10px;
}
</style>
