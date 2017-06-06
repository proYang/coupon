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
  ['2017/1/24', 4640, 2320, 2320],
  ['2017/1/25', 4591, 2300, 2291],
  ['2017/1/28', 4641, 2295, 2346],
  ['2017/1/29', 4705, 2347, 2358],
  ['2017/1/30', 4742, 2360, 2382],
  ['2017/1/31', 4768, 2383, 2385],
  ['2017/2/1', 4796, 2377, 2419],
  ['2017/2/4', 4853, 2425, 2428],
  ['2017/2/5', 4844, 2411, 2433],
  ['2017/2/6', 4866, 2432, 2434],
  ['2017/2/7', 4848, 2430, 2418],
  ['2017/2/8', 4848, 2416, 2432],
  ['2017/2/18', 4862, 2441, 2421],
  ['2017/2/19', 4802, 2420, 2382],
  ['2017/2/20', 4780, 2383, 2397],
  ['2017/2/21', 4703, 2378, 2325],
  ['2017/2/22', 4636, 2322, 2314],
  ['2017/2/25', 4645, 2320, 2325],
  ['2017/2/26', 4606, 2313, 2293],
  ['2017/2/27', 4610, 2297, 2313],
  ['2017/2/28', 4687, 2322, 2365],
  ['2017/3/1', 4723, 2364, 2359],
  ['2017/3/4', 4605, 2332, 2273],
  ['2017/3/5', 4600, 2274, 2326],
  ['2017/3/6', 4680, 2333, 2347],
  ['2017/3/7', 4664, 2340, 2324],
  ['2017/3/8', 4644, 2326, 2318],
  ['2017/3/11', 4624, 2314, 2310],
  ['2017/3/12', 4595, 2309, 2286],
  ['2017/3/13', 4545, 2282, 2263],
  ['2017/3/14', 4525, 2255, 2270],
  ['2017/3/15', 4547, 2269, 2278],
  ['2017/3/18', 4507, 2267, 2240],
  ['2017/3/19', 4501, 2244, 2257],
  ['2017/3/20', 4574, 2257, 2317],
  ['2017/3/21', 4642, 2318, 2324],
  ['2017/3/22', 4649, 2321, 2328],
  ['2017/3/25', 4660, 2334, 2326],
  ['2017/3/26', 4615, 2318, 2297],
  ['2017/3/27', 4600, 2299, 2301],
  ['2017/3/28', 4509, 2273, 2236],
  ['2017/3/29', 4474, 2238, 2236],
  ['2017/4/1', 4463, 2229, 2234],
  ['2017/4/2', 4461, 2234, 2227],
  ['2017/4/3', 4457, 2232, 2225],
  ['2017/4/8', 4407, 2196, 2211],
  ['2017/4/9', 4440, 2215, 2225],
  ['2017/4/10', 4450, 2224, 2226],
  ['2017/4/11', 4455, 2236, 2219],
  ['2017/4/12', 4424, 2218, 2206],
  ['2017/4/15', 4380, 2199, 2181],
  ['2017/4/16', 4363, 2169, 2194],
  ['2017/4/17', 4388, 2195, 2193],
  ['2017/4/18', 4378, 2181, 2197],
  ['2017/4/19', 4445, 2201, 2244],
  ['2017/4/22', 4478, 2236, 2242],
  ['2017/4/23', 4426, 2242, 2184],
  ['2017/4/24', 4405, 2187, 2218],
  ['2017/4/25', 4412, 2213, 2199],
  ['2017/4/26', 4380, 2203, 2177],
  ['2017/5/2', 4344, 2170, 2174],
  ['2017/5/3', 4384, 2179, 2205],
  ['2017/5/6', 4443, 2212, 2231],
  ['2017/5/7', 4462, 2227, 2235],
  ['2017/5/8', 4488, 2242, 2246],
  ['2017/5/9', 4478, 2246, 2232],
  ['2017/5/10', 4474, 2228, 2246],
  ['2017/5/13', 4488, 2247, 2241],
  ['2017/5/14', 4455, 2238, 2217],
  ['2017/5/15', 4441, 2217, 2224],
  ['2017/5/16', 4472, 2221, 2251],
  ['2017/5/17', 4531, 2249, 2282],
  ['2017/5/20', 4585, 2286, 2299],
  ['2017/5/21', 4602, 2297, 2305],
  ['2017/5/22', 4605, 2303, 2302],
  ['2017/5/23', 4568, 2293, 2275],
  ['2017/5/24', 4569, 2281, 2288],
  ['2017/5/27', 4579, 2286, 2293],
  ['2017/5/28', 4614, 2293, 2321],
  ['2017/5/29', 4647, 2323, 2324],
  ['2017/5/30', 4633, 2316, 2317],
  ['2017/5/31', 4620, 2320, 2300],
  ['2017/6/3', 4599, 2300, 2299],
  ['2017/6/4', 4569, 2297, 2272],
  ['2017/6/5', 4540, 2270, 2270],
  ['2017/6/6', 4506, 2264, 2242],
  ['2017/6/7', 4452, 2242, 2210],
  ['2017/6/13', 4338, 2190, 2148]
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
            data: calculateMA(2),
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
            data: calculateMA(0),
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
