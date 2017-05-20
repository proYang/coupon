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
    <div id="J_echarts-line" class="echarts"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
const $window = window
export default {
  data: function () {
    return {
      line: {
        title: {
          text: '折线图'
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: false,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          name: '距离/km',
          nameGap: 3,
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            formatter: '{value} km'
          },
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
            name: '已领取优惠券顾客',
            type: 'line',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '未领取优惠券顾客',
            type: 'line',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            markPoint: {
              data: [
                { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' },
                [{
                  symbol: 'none',
                  x: '90%',
                  yAxis: 'max'
                }, {
                  symbol: 'circle',
                  label: {
                    normal: {
                      position: 'start',
                      formatter: '最大值'
                    }
                  },
                  type: 'max',
                  name: '最高点'
                }]
              ]
            }
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
      let space = this.line.xAxis.data
      let series = this.line.series

      let params = {
        shop_id: shopInfo.id,
        spacing: 1,
        num: 100,
        time_level: 'year',
        time: 2
      }
      that.$api.couponNumByDistance(params).then(function (res) {
        res.data.forEach(function (item) {
          let index = --item.distance
          if (index >= 10) return
          let couponVal = series[0].data[index]
          let withOutCouponVal = series[1].data[index]
          series[0].data[index] = couponVal + parseInt(item.coupon)
          series[1].data[index] = withOutCouponVal + parseInt(item.withoutCoupon)
        })
        // 绘图
        that.drawline()
      })
    },
    drawline() {
      var chart = echarts.init(document.querySelector('#J_echarts-line'))
      chart.setOption(this.line, true)
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
  }
}
</script>

<style scoped>
.echarts {
  margin-top: 20px;
  float: left;
  width: 900px;
  height: 400px;
}
</style>
