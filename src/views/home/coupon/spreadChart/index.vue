<template>
  <div>
    <div class='crumbs'>
      <el-breadcrumb separator='/'>
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 我的优惠券</el-breadcrumb-item>
        <el-breadcrumb-item>优惠券领取和使用状况</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="block">
      <span class="demonstration">数据所在时间段：</span>
      <el-date-picker v-model="times" type="daterange" :clearable="pickerOtherOption.clearable" :editable="pickerOtherOption.editable" @change="pickTime" :picker-options="pickerOptions" placeholder="选择所需数据的时间范围" align="left">
      </el-date-picker>
    </div>
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
        color: ['#20a0ff', '#13CE66', '#F7BA2A', '#FF4949'],
        title: {
          text: '优惠券领取和使用状况对比图（一）'
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
          data: ['已领券优惠券', '未领券优惠券', '已使用优惠券', '未使用优惠券'],
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
            data: [0, 0, 0, 0]
          }
        ]
      },
      pie: {
        title: {
          text: '优惠券领取和使用状况对比图（二）'
        },
        color: ['#13CE66', '#F7BA2A', '#FF4949', '#61a0a8', '#20a0ff'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}人 ({d}%)'
        },
        legend: {
          orient: 'vertical',
          top: 30,
          x: 'left',
          data: ['已领券优惠券', '未领券优惠券', '已使用优惠券', '未使用优惠券']
        },
        series: [
          {
            name: '领取状态',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
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
              { value: 0, name: '已领券优惠券', selected: true },
              { value: 0, name: '未领券优惠券' }
            ]
          },
          {
            name: '使用状态',
            type: 'pie',
            radius: ['50%', '80%'],
            label: {
              normal: {
                position: 'outside'
              }
            },
            data: [
              { value: 0, name: '已使用优惠券', selected: true },
              { value: 0, name: '未使用优惠券' }
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
      times: [new Date().getTime() - 3600 * 1000 * 24 * 500, new Date()]
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
        // 关闭loading
        that.loadingInstance.close()
        // 0-已领券  1-未领取 2-已使用 3-未使用
        that.bar.series[0].data[0] = res.data.spendWithCoupon
        that.bar.series[0].data[1] = res.data.spendWithoutCoupon
        that.bar.series[0].data[2] = res.data.receiveCouponWithSpend
        that.bar.series[0].data[3] = res.data.receiveCouponWithoutSpend
        // 画柱状图
        that.drawbar()
        that.pie.series[0].data[0].value = res.data.spendWithCoupon
        that.pie.series[0].data[1].value = res.data.spendWithoutCoupon
        that.pie.series[1].data[0].value = res.data.receiveCouponWithSpend
        that.pie.series[1].data[1].value = res.data.receiveCouponWithoutSpend
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
  float: left;
  width: 500px;
  height: 400px;
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
  left: 30px;
  top: 60px;
  overflow: hidden;
}
</style>
