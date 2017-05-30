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
      <div id="J_echarts-line" class="echarts"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { Loading } from 'element-ui'
const $window = window

var data0 = splitData([
  ['2013/1/24', 2320, 2320, 2287],
  ['2013/1/25', 2300, 2291, 2288],
  ['2013/1/28', 2295, 2346, 2295],
  ['2013/1/29', 2347, 2358, 2363],
  ['2013/1/30', 2360, 2382, 2347],
  ['2013/1/31', 2383, 2385, 2371],
  ['2013/2/1', 2377, 2419, 2369],
  ['2013/2/4', 2425, 2428, 2417],
  ['2013/2/5', 2411, 2433, 2403],
  ['2013/2/6', 2432, 2434, 2427],
  ['2013/2/7', 2430, 2418, 2394],
  ['2013/2/8', 2416, 2432, 2414],
  ['2013/2/18', 2441, 2421, 2415],
  ['2013/2/19', 2420, 2382, 2373],
  ['2013/2/20', 2383, 2397, 2370],
  ['2013/2/21', 2378, 2325, 2309],
  ['2013/2/22', 2322, 2314, 2308],
  ['2013/2/25', 2320, 2325, 2315],
  ['2013/2/26', 2313, 2293, 2289],
  ['2013/2/27', 2297, 2313, 2292],
  ['2013/2/28', 2322, 2365, 2308],
  ['2013/3/1', 2364, 2359, 2330],
  ['2013/3/4', 2332, 2273, 2259],
  ['2013/3/5', 2274, 2326, 2270],
  ['2013/3/6', 2333, 2347, 2321],
  ['2013/3/7', 2340, 2324, 2304],
  ['2013/3/8', 2326, 2318, 2314],
  ['2013/3/11', 2314, 2310, 2296],
  ['2013/3/12', 2309, 2286, 2264],
  ['2013/3/13', 2282, 2263, 2253],
  ['2013/3/14', 2255, 2270, 2253],
  ['2013/3/15', 2269, 2278, 2250],
  ['2013/3/18', 2267, 2240, 2239],
  ['2013/3/19', 2244, 2257, 2232],
  ['2013/3/20', 2257, 2317, 2257],
  ['2013/3/21', 2318, 2324, 2311],
  ['2013/3/22', 2321, 2328, 2314],
  ['2013/3/25', 2334, 2326, 2319],
  ['2013/3/26', 2318, 2297, 2281],
  ['2013/3/27', 2299, 2301, 2289],
  ['2013/3/28', 2273, 2236, 2232],
  ['2013/3/29', 2238, 2236, 2228],
  ['2013/4/1', 2229, 2234, 2227],
  ['2013/4/2', 2234, 2227, 2220],
  ['2013/4/3', 2232, 2225, 2217],
  ['2013/4/8', 2196, 2211, 2180],
  ['2013/4/9', 2215, 2225, 2215],
  ['2013/4/10', 2224, 2226, 2212],
  ['2013/4/11', 2236, 2219, 2217],
  ['2013/4/12', 2218, 2206, 2204],
  ['2013/4/15', 2199, 2181, 2177],
  ['2013/4/16', 2169, 2194, 2165],
  ['2013/4/17', 2195, 2193, 2178],
  ['2013/4/18', 2181, 2197, 2175],
  ['2013/4/19', 2201, 2244, 2200],
  ['2013/4/22', 2236, 2242, 2232],
  ['2013/4/23', 2242, 2184, 2182],
  ['2013/4/24', 2187, 2218, 2184],
  ['2013/4/25', 2213, 2199, 2191],
  ['2013/4/26', 2203, 2177, 2173],
  ['2013/5/2', 2170, 2174, 2161],
  ['2013/5/3', 2179, 2205, 2179],
  ['2013/5/6', 2212, 2231, 2212],
  ['2013/5/7', 2227, 2235, 2219],
  ['2013/5/8', 2242, 2246, 2235],
  ['2013/5/9', 2246, 2232, 2221],
  ['2013/5/10', 2228, 2246, 2225],
  ['2013/5/13', 2247, 2241, 2231],
  ['2013/5/14', 2238, 2217, 2205],
  ['2013/5/15', 2217, 2224, 2213],
  ['2013/5/16', 2221, 2251, 2210],
  ['2013/5/17', 2249, 2282, 2248],
  ['2013/5/20', 2286, 2299, 2281],
  ['2013/5/21', 2297, 2305, 2290],
  ['2013/5/22', 2303, 2302, 2292],
  ['2013/5/23', 2293, 2275, 2274],
  ['2013/5/24', 2281, 2288, 2270],
  ['2013/5/27', 2286, 2293, 2283],
  ['2013/5/28', 2293, 2321, 2281],
  ['2013/5/29', 2323, 2324, 2321],
  ['2013/5/30', 2316, 2317, 2310],
  ['2013/5/31', 2320, 2300, 2299],
  ['2013/6/3', 2300, 2299, 2294],
  ['2013/6/4', 2297, 2272, 2264],
  ['2013/6/5', 2270, 2270, 2260],
  ['2013/6/6', 2264, 2242, 2240],
  ['2013/6/7', 2242, 2210, 2205],
  ['2013/6/13', 2190, 2148, 2126]
])
function splitData(rawData) {
  var categoryData = []
  var values = []
  for (var i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0])
    values.push(rawData[i])
  }
  values.forEach(function (item) {
    var arr = item
    arr[0] = Math.max(...arr)
    arr[1] = Math.min(...arr)
    arr[2] = Math.max(...arr) - Math.min(...arr)
  })
  return {
    categoryData: categoryData,
    values: values
  }
}
function calculateMA(index) {
  var result = []
  for (var i = 0, len = data0.values.length; i < len; i++) {
    var item = data0.values[i][index]
    result.push(item)
  }
  return result
}
export default {
  data: function () {
    return {
      chat: null,
      loadingInstance: undefined,
      data: [],
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
          data: data0.categoryData,
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
            data: calculateMA(0),
            smooth: true
          },
          {
            name: '老用户下单数',
            type: 'line',
            data: calculateMA(1),
            smooth: true
          },
          {
            name: '总下单数',
            type: 'line',
            data: calculateMA(2),
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
        spacing: 1,
        num: 100,
        start: new Date(that.times[0]).getTime(),
        end: new Date(that.times[1]).getTime()
      }
      that.$api.couponNumByDistance(params).then(function (res) {
        // 关闭loading
        that.loadingInstance.close()
        // res.data.forEach(function (item) {
        //   let index = --item.distance
        //   if (index >= 10) return
        //   let couponVal = series[0].data[index]
        //   let withOutCouponVal = series[1].data[index]
        //   series[0].data[index] = couponVal + parseInt(item.coupon)
        //   series[1].data[index] = withOutCouponVal + parseInt(item.withoutCoupon)
        // })
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
      // let series = this.line.series
      // series[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      // series[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
  width: 960px;
  height: 480px;
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
