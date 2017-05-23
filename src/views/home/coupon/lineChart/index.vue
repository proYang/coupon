<template>
  <div>
    <div class='crumbs'>
      <el-breadcrumb separator='/'>
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 我的优惠券</el-breadcrumb-item>
        <el-breadcrumb-item>优惠券领取距离分析</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="block">
      <span class="demonstration">数据所在时间段：</span>
      <el-date-picker v-model="times" type="daterange" :clearable="pickerOtherOption.clearable" :editable="pickerOtherOption.editable" @change="pickTime" :picker-options="pickerOptions" placeholder="选择所需数据的时间范围" align="left">
      </el-date-picker>
    </div>
    <div class="echarts-container">
      <div id="J_echarts-line" class="echarts"></div>
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
      chat: null,
      loadingInstance: undefined,
      line: {
        title: {
          text: '优惠券领取距离分析图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          formatter: (params) => {
            let str = `${params[0].name}km处：<br>
            <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${params[0].color}"></span>${params[0].seriesName}：${params[0].value}人
            <br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${params[1].color}"></span>${params[1].seriesName}：${params[1].value}人`
            return str
          }
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
        legend: {
          data: ['已领取优惠券顾客', '未领取优惠券顾客']
        },
        xAxis: {
          name: '距离/km',
          nameGap: 40,
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            formatter: '{value} km'
          },
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        yAxis: {
          name: '人数/个',
          nameGap: 15,
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
                {
                  type: 'average',
                  name: '平均值'
                }
              ]
            }
          },
          {
            name: '未领取优惠券顾客',
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
      let space = this.line.xAxis.data
      let series = this.line.series

      let params = {
        shop_id: shopInfo.id,
        spacing: 1,
        num: 100,
        start: new Date(that.times[0]).getTime(),
        end: new Date(that.times[1]).getTime()
      }
      that.$api.couponNumByDistance(params).then(function (res) {
        // 关闭loading
        that.loadingInstance.close()
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
    initChat() {
      this.chart = echarts.init(document.querySelector('#J_echarts-line'))
    },
    drawline() {
      this.chart.setOption(this.line, true)
    },
    pickTime(val) {
      let times = this.times
      if (times[0] === null || times[1] === null) return
      this.loadingInstance = Loading.service({
        target: '#J_echarts-line',
        body: 'loading',
        text: '数据获取中'
      })
      // 清除已有数据
      this.clearOldData()
      // 重新获取数据
      this.fetchData()
    },
    clearOldData() {
      let series = this.line.series
      series[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      series[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  mounted() {
    this.loadingInstance = Loading.service({
      target: '#J_echarts-line',
      body: 'loading',
      text: '数据获取中'
    })
    this.initChat()
    this.fetchData()
  },
  destroyed() {
    // 关闭loading
    this.loadingInstance.close()
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

.crumbs {
  float: left;
}

.block {
  float: left;
  position: relative;
  top: -12px;
  left: 50px;
}

.demonstration {
  margin-left: 20px;
}

.echarts-container {
  position: absolute;
  left: 30px;
  top: 60px;
  overflow: hidden;
}
</style>
