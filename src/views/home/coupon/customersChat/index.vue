<template>
  <div>
    <div class='crumbs'>
      <el-breadcrumb separator='/'>
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 商户优惠券分析</el-breadcrumb-item>
        <el-breadcrumb-item>新老顾客消费分析</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="block">
      <span class="demonstration">数据所在时间段：</span>
      <el-date-picker v-model="times" type="daterange" :clearable="pickerOtherOption.clearable" :editable="pickerOtherOption.editable" @change="pickTime" :picker-options="pickerOptions" placeholder="选择所需数据的时间范围" align="left">
      </el-date-picker>
    </div>
    <div class="plugins-tips tips">小提示：分析每一笔消费记录，查看总下单数随时间的变化情况，查看新老客户占比，精准掌握您的店铺经营状况。</div>
    <div class="echarts-container">
      <div id="J_echarts-customers" class="echarts"></div>
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
          text: '新老顾客消费情况分析图',
          left: 0
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['新用户下单数', '老用户下单数', '总下单数']
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          data: [],
          scale: true,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax'
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 50,
            end: 100
          },
          {
            show: true,
            type: 'slider',
            y: '90%',
            start: 50,
            end: 100
          }
        ],
        series: [
          {
            name: '新用户下单数',
            type: 'line',
            data: [],
            smooth: true
          },
          {
            name: '老用户下单数',
            type: 'line',
            data: [],
            smooth: true
          },
          {
            name: '总下单数',
            type: 'line',
            data: [],
            smooth: true
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
        start: new Date(that.times[0]).getTime(),
        end: new Date(that.times[1]).getTime()
      }
      that.$api.getSaleStatusByBuyer(params).then(function (res) {
        // 关闭loading
        that.loadingInstance.close()
        that.splitData(res.data)
        // 绘图
        that.drawline()
      })
    },
    initChat() {
      this.chart = echarts.init(document.querySelector('#J_echarts-customers'))
    },
    drawline() {
      this.chart.setOption(this.line, true)
    },
    pickTime(val) {
      let times = this.times
      if (times[0] === null || times[1] === null) return
      this.loadingInstance = Loading.service({
        target: '#J_echarts-customers',
        body: 'loading',
        text: '数据获取中'
      })
      // 清除已有数据
      this.clearOldData()
      // 重新获取数据
      this.fetchData()
    },
    clearOldData() {
    },
    splitData(rawData) {
      for (let i = 0; i < rawData.length; i++) {
        this.line.xAxis.data.push(rawData[i].date)
        this.line.series[0].data.push(rawData[i].newNum)
        this.line.series[1].data.push(rawData[i].unNewNum)
        this.line.series[2].data.push(rawData[i].spendNum)
      }
    },
    calculateMA(index) {
      let result = []
      let data0 = this.results
      for (let i = 0, len = data0.values.length; i < len; i++) {
        let item = data0.values[i][index]
        result.push(item)
      }
      return result
    }
  },
  mounted() {
    this.loadingInstance = Loading.service({
      target: '#J_echarts-customers',
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
  width: 100%;
  height: 100%;
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
  width: 85%;
  height: 100%;
  left: 35px;
  top: 100px;
}

.tips {
  position: absolute;
  top: 70px;
  width: 85%;
  font-size: 14px;
  padding: 15px 10px;
}
</style>
