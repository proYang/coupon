<template>
  <div>
    <div class='crumbs'>
      <el-breadcrumb separator='/'>
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 商户优惠券分析</el-breadcrumb-item>
        <el-breadcrumb-item>周边顾客分析图</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="plugins-tips tips">小提示：以您的店铺位置为中心，查看周边顾客状态。</div>
    <div id="J_echarts-map" class='mix-echarts'></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/dist/extension/bmap.min.js'
import data from '../../../../../static/data.json'
const $window = window
export default {
  data: function () {
    return {
      chart: null
    }
  },
  methods: {
    convertData(oldData) {
      let res = []
      for (let i = 0; i < oldData.length; i++) {
        let geoCoord = data.building.geoCoordMap[oldData[i].name]
        if (geoCoord) {
          res.push({
            name: oldData[i].name,
            value: geoCoord.concat(oldData[i].value)
          })
        }
      }
      return res
    },
    drawMap(id) {
      this.chart = echarts.init(document.querySelector(id))
      this.chart.setOption({
        tooltip: {
          trigger: 'item' // 数据项图形触发
        },
        toolbox: {
          // 工具栏组件
          feature: {
            saveAsImage: {}, // 保存为图片
            dataView: {}    // 可以展现当前图表所用的数据，编辑后可以动态更新。
          },
          right: 15,
          top: 10
        },
        legend: {
          top: '0',
          data: ['已领取优惠券顾客', '未领取优惠券顾客', '商户'],
          itemGap: 25,
          itemHeight: 30,
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          backgroundColor: 'rgba(0,0,0,.4)'
        },
        bmap: {
          // 百度地图中心经纬度
          center: [106.613922, 29.53832],
          // 地图缩放
          zoom: 17,
          roam: true,
          mapStyle: {
            style: ''
          }
        },
        series: [
          {
            name: '商户',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: [{
              name: '您的店铺',
              value: [106.610500, 29.53832]
            }],
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true,
                textStyle: {
                  color: '#000',
                  fontWeight: 'bolder',
                  fontSize: 22
                }
              }
            },
            itemStyle: {
              opacity: 1
            },
            symbol: 'image://data:image/png;base64,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',
            symbolSize: 40
          },
          {
            name: '已领取优惠券顾客',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: [{
              name: '刘**',
              value: [106.611220, 29.534500, 1]
            }, {
              name: '张**',
              value: [106.614520, 29.536600, 1]
            }, {
              name: '淡淡**',
              value: [106.613420, 29.531200, 1]
            }, {
              name: '欧阳**',
              value: [106.613420, 29.533600, 1]
            }, {
              name: '张**',
              value: [106.615420, 29.539800, 1]
            }, {
              name: '深深**',
              value: [106.612220, 29.539900, 1]
            }, {
              name: '浅谈**',
              value: [106.611120, 29.537600, 1]
            }, {
              name: '黄**',
              value: [106.619620, 29.538700, 1]
            }, {
              name: '王**',
              value: [106.613820, 29.539800, 1]
            }, {
              name: '沙**',
              value: [106.615820, 29.534500, 1]
            }, {
              name: '白**',
              value: [106.613220, 29.56500, 1]
            }],
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              emphasis: {
                formatter(params) {
                  return '顾客：' + params.name
                },
                position: 'right',
                show: false
              }
            },
            tooltip: {
              formatter(params) {
                return '顾客：' + params.name
              }
            },
            symbol: 'image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDk0MDg5MjY3NzEyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1MzgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNjU5Ljg0NjA5NSAzMjcuNjhIMzYzLjU5MzE0M2MtMzIuMzc3OTA1IDAtNTguNjYwNTcxIDI3Ljc0NTUyNC01OC42NjA1NzIgNjIuMDAwNzYybDIxLjk0Mjg1OCAyNTcuNTExNjE5IDAuNjMzOTA0IDcuNzI4NzYyYzMuMzQwMTkgMTguNjAyNjY3IDE4Ljc3MzMzMyAzMi42OTQ4NTcgMzcuMzUxNjE5IDMyLjY5NDg1N3YwLjA0ODc2MmgxMS40ODM0MjljMC41MzYzODEtMC4wNDg3NjIgMS4wOTcxNDMtMC4wNDg3NjIgMS42MzM1MjQtMC4wNDg3NjIgMC41NjA3NjIgMCAxLjA3Mjc2MiAwIDEuNjA5MTQzIDAuMDQ4NzYyIDEyLjA2ODU3MSAwLjgwNDU3MSAyMS44MjA5NTIgMTAuNDgzODEgMjMuNDU0NDc2IDIyLjkxODA5NSAwLjIxOTQyOSAxLjIxOTA0OCAwLjI0MzgxIDIuMzQwNTcxIDAuMzE2OTUyIDMuNTM1MjM4bDIwLjMzMzcxNCAyNjkuNzk5NjE5IDAuNDYzMjM5IDYuMDIyMDk2YzIuODUyNTcxIDE5LjIxMjE5IDE4LjU3ODI4NiAzMy45MTM5MDUgMzcuNTIyMjg1IDMzLjkxMzkwNGgxMDAuMjA1NzE1YzE4LjY1MTQyOSAwIDM0LjE4MjA5NS0xNC4yMzg0NzYgMzcuMzUxNjE5LTMzLjA2MDU3MWwwLjU4NTE0Mi03Ljc3NzUyNCAyMC4zMDkzMzQtMjY5LjMxMmMwLTAuODc3NzE0IDAuMTIxOTA1LTEuNzU1NDI5IDAuMjQzODA5LTIuNjA4NzYyIDEuNDg3MjM4LTEyLjcwMjQ3NiAxMS4zNjE1MjQtMjIuNjI1NTI0IDIzLjUwMzIzOC0yMy40MzAwOTUgMC41NjA3NjItMC4wNDg3NjIgMS4wOTcxNDMtMC4wNDg3NjIgMS42MzM1MjQtMC4wNDg3NjJhMTkuOTkyMzgxIDE5Ljk5MjM4MSAwIDAgMSAxLjYwOTE0MyAwLjA0ODc2MmgxMS4zMTI3NjJ2LTAuMDQ4NzYyYzE5LjAxNzE0MyAwIDM0Ljc2NzIzOC0xNC43OTkyMzggMzcuNTQ2NjY3LTM0LjA4NDU3MSAwLjA0ODc2Mi0wLjEyMTkwNSAwLjA0ODc2Mi0wLjI5MjU3MSAwLjA3MzE0My0wLjQ2MzIzOWwwLjM0MTMzMy0zLjk3NDA5NSAyMi4wODkxNDMtMjU5LjQxMzMzM2MwLTM0LjI1NTIzOC0yNi4yMzM5MDUtNjIuMDI1MTQzLTU4LjYzNjE5MS02Mi4wMjUxNDN6TTUxMS43MzE4MSAyNzUuMTE0NjY3YzcxLjYzMTIzOCAwIDEyOS43NTU0MjktNjEuNDY0MzgxIDEyOS43NTU0MjgtMTM3LjI2NDc2MiAwLTc1LjgyNDc2Mi01OC4xMjQxOS0xMzcuMzEzNTI0LTEyOS43NTU0MjgtMTM3LjMxMzUyNC03MS42NTU2MTkgMC0xMjkuNzA2NjY3IDYxLjQ4ODc2Mi0xMjkuNzA2NjY3IDEzNy4zMTM1MjQgMCA3NS44MDAzODEgNTguMDUxMDQ4IDEzNy4yNjQ3NjIgMTI5LjcwNjY2NyAxMzcuMjY0NzYyeiIgcC1pZD0iMTUzOSIgZmlsbD0iIzQ1YWQ5YSI+PC9wYXRoPjwvc3ZnPg==',
            symbolSize: 35
          },
          {
            name: '未领取优惠券顾客',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: [{
              name: '张**',
              value: [106.612320, 29.545500, 1]
            }, {
              name: '柯**',
              value: [106.614420, 29.534450, 1]
            }, {
              name: '潘**',
              value: [106.616520, 29.589200, 1]
            }, {
              name: '葛**',
              value: [106.617620, 29.578600, 1]
            }, {
              name: '周**',
              value: [106.612320, 29.567800, 1]
            }, {
              name: '叶**',
              value: [106.611220, 29.565900, 1]
            }, {
              name: '鹏**',
              value: [106.615620, 29.554600, 1]
            }, {
              name: '尹**',
              value: [106.613420, 29.534700, 1]
            }, {
              name: '白**',
              value: [106.617720, 29.533800, 1]
            }, {
              name: '贾**',
              value: [106.611120, 29.532500, 1]
            }, {
              name: '柴**',
              value: [106.617820, 29.51200, 1]
            }],
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              emphasis: {
                formatter(params) {
                  return '顾客：' + params.name
                },
                position: 'right',
                show: false
              }
            },
            tooltip: {
              formatter(params) {
                return '顾客：' + params.name
              }
            },
            symbol: 'image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDk0MDg5MjY3NzEyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1MzgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNjU5Ljg0NjA5NSAzMjcuNjhIMzYzLjU5MzE0M2MtMzIuMzc3OTA1IDAtNTguNjYwNTcxIDI3Ljc0NTUyNC01OC42NjA1NzIgNjIuMDAwNzYybDIxLjk0Mjg1OCAyNTcuNTExNjE5IDAuNjMzOTA0IDcuNzI4NzYyYzMuMzQwMTkgMTguNjAyNjY3IDE4Ljc3MzMzMyAzMi42OTQ4NTcgMzcuMzUxNjE5IDMyLjY5NDg1N3YwLjA0ODc2MmgxMS40ODM0MjljMC41MzYzODEtMC4wNDg3NjIgMS4wOTcxNDMtMC4wNDg3NjIgMS42MzM1MjQtMC4wNDg3NjIgMC41NjA3NjIgMCAxLjA3Mjc2MiAwIDEuNjA5MTQzIDAuMDQ4NzYyIDEyLjA2ODU3MSAwLjgwNDU3MSAyMS44MjA5NTIgMTAuNDgzODEgMjMuNDU0NDc2IDIyLjkxODA5NSAwLjIxOTQyOSAxLjIxOTA0OCAwLjI0MzgxIDIuMzQwNTcxIDAuMzE2OTUyIDMuNTM1MjM4bDIwLjMzMzcxNCAyNjkuNzk5NjE5IDAuNDYzMjM5IDYuMDIyMDk2YzIuODUyNTcxIDE5LjIxMjE5IDE4LjU3ODI4NiAzMy45MTM5MDUgMzcuNTIyMjg1IDMzLjkxMzkwNGgxMDAuMjA1NzE1YzE4LjY1MTQyOSAwIDM0LjE4MjA5NS0xNC4yMzg0NzYgMzcuMzUxNjE5LTMzLjA2MDU3MWwwLjU4NTE0Mi03Ljc3NzUyNCAyMC4zMDkzMzQtMjY5LjMxMmMwLTAuODc3NzE0IDAuMTIxOTA1LTEuNzU1NDI5IDAuMjQzODA5LTIuNjA4NzYyIDEuNDg3MjM4LTEyLjcwMjQ3NiAxMS4zNjE1MjQtMjIuNjI1NTI0IDIzLjUwMzIzOC0yMy40MzAwOTUgMC41NjA3NjItMC4wNDg3NjIgMS4wOTcxNDMtMC4wNDg3NjIgMS42MzM1MjQtMC4wNDg3NjJhMTkuOTkyMzgxIDE5Ljk5MjM4MSAwIDAgMSAxLjYwOTE0MyAwLjA0ODc2MmgxMS4zMTI3NjJ2LTAuMDQ4NzYyYzE5LjAxNzE0MyAwIDM0Ljc2NzIzOC0xNC43OTkyMzggMzcuNTQ2NjY3LTM0LjA4NDU3MSAwLjA0ODc2Mi0wLjEyMTkwNSAwLjA0ODc2Mi0wLjI5MjU3MSAwLjA3MzE0My0wLjQ2MzIzOWwwLjM0MTMzMy0zLjk3NDA5NSAyMi4wODkxNDMtMjU5LjQxMzMzM2MwLTM0LjI1NTIzOC0yNi4yMzM5MDUtNjIuMDI1MTQzLTU4LjYzNjE5MS02Mi4wMjUxNDN6TTUxMS43MzE4MSAyNzUuMTE0NjY3YzcxLjYzMTIzOCAwIDEyOS43NTU0MjktNjEuNDY0MzgxIDEyOS43NTU0MjgtMTM3LjI2NDc2MiAwLTc1LjgyNDc2Mi01OC4xMjQxOS0xMzcuMzEzNTI0LTEyOS43NTU0MjgtMTM3LjMxMzUyNC03MS42NTU2MTkgMC0xMjkuNzA2NjY3IDYxLjQ4ODc2Mi0xMjkuNzA2NjY3IDEzNy4zMTM1MjQgMCA3NS44MDAzODEgNTguMDUxMDQ4IDEzNy4yNjQ3NjIgMTI5LjcwNjY2NyAxMzcuMjY0NzYyeiIgcC1pZD0iMTUzOSIgZmlsbD0iI2Y4OTA1ZiI+PC9wYXRoPjwvc3ZnPg==',
            symbolSize: 35
          }
        ]
      })
    },
    getMapData() {
      // 获取数据
      // let shopInfo = JSON.parse($window.localStorage.getItem('shop_info'))
      // let params = {
      //   shop_id: shopInfo.id,
      //   spacing: 3,
      //   num: 100,
      //   time: 'year'
      // }
      // this.$api.getMapData(params).then(function (res) {
      //   debugger
      // })
    }
  },
  created() {
    this.getMapData()
  },
  mounted() {
    this.$nextTick(function () {
      this.drawMap('#J_echarts-map')
      var that = this
      var resizeTimer = null
      window.onresize = function () {
        if (resizeTimer) clearTimeout(resizeTimer)
        resizeTimer = setTimeout(function () {
          that.drawMap('#J_echarts-map')
        }, 100)
      }
    })
  }
}
</script>

<style scoped>
.mix-echarts {
  width: 100%;
  height: 500px;
}

.tips {
  font-size: 14px;
  padding: 15px 10px;
  margin-bottom: 15px;
}
</style>
