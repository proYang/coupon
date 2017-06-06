<template>
  <div>
    <div class='crumbs'>
      <el-breadcrumb separator='/'>
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 商户优惠券分析</el-breadcrumb-item>
        <el-breadcrumb-item>商品销售状况分析</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="block">
      <span class="demonstration">数据所在时间段：</span>
      <el-date-picker v-model="times" type="daterange" :clearable="pickerOtherOption.clearable" :editable="pickerOtherOption.editable" @change="pickTime" :picker-options="pickerOptions" placeholder="选择所需数据的时间范围" align="left">
      </el-date-picker>
    </div>
    <div class="plugins-tips tips">小提示：更清晰的显示，使用优惠券前后同期销量的对比情况。</div>
    <div class="echarts-container">
      <div id="J_echarts-sales" class="echarts"></div>
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
          text: '优惠券使用与销量关系对比图',
          subtext: ''
        },
        color: ['#9a59b5', '#324057'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['使用优惠券后销售量', '未使用优惠券销售量']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['所选时间段内销售量', '销售总量']
        },
        series: [
          {
            name: '使用优惠券后销量',
            type: 'bar',
            data: [0, 0]
          },
          {
            name: '未使用优惠券销量',
            type: 'bar',
            data: [0, 0]
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
      that.$api.getSaleStatus(params).then(function (res) {
        // 关闭loading
        that.loadingInstance.close()
        series[0].data[1] = res.saleWithCouponAll
        series[1].data[1] = res.saleWithoutCouponAll
        series[0].data[0] = res.saleWithCouponCurrent
        series[1].data[0] = res.saleWithoutCouponCurrent
        // 绘图
        that.drawline()
      })
    },
    initChat() {
      this.chart = echarts.init(document.querySelector('#J_echarts-sales'))
    },
    drawline() {
      this.chart.setOption(this.line, true)
    },
    pickTime(val) {
      let times = this.times
      if (times[0] === null || times[1] === null) return
      this.loadingInstance = Loading.service({
        target: '#J_echarts-sales',
        body: 'loading',
        text: '数据获取中'
      })
      // 重新获取数据
      this.fetchData()
    }
  },
  mounted() {
    this.loadingInstance = Loading.service({
      target: '#J_echarts-sales',
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
  left: 35px;
  top: 100px;
  overflow: hidden;
}

.tips {
  position: absolute;
  top: 70px;
  width: 85%;
  font-size: 14px;
  padding: 15px 10px;
}
</style>
