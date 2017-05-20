<template>
  <div>
    <div class='crumbs'>
      <el-breadcrumb separator='/'>
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 我的优惠券</el-breadcrumb-item>
        <el-breadcrumb-item>更多维度</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='plugins-tips'>我的优惠券状态</div>
    <div id="J_echarts-bar" class="echarts"></div>
    <div id="J_echarts-pie" class="echarts"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
const $window = window
export default {
  data: function () {
    return {
      bar: {
        color: ['#20a0ff', '#13CE66', '#F7BA2A', '#FF4949'],
        title: {
          text: '柱状图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
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
        yAxis: {},
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
          text: '饼状图'
        },
        color: ['#13CE66', '#F7BA2A', '#FF4949', '#61a0a8', '#20a0ff'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
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
      }
    }
  },
  methods: {
    fetchData() {
      // 获取数据
      let that = this
      let shopInfo = JSON.parse($window.localStorage.getItem('shop_info'))
      let params = {
        shop_id: shopInfo.id,
        time_level: 'year',
        time: 2
      }
      this.$api.couponNumByUseful(params).then(function (res) {
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
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style scoped>
.echarts {
  margin-top: 20px;
  float: left;
  width: 500px;
  height: 400px;
}
</style>
