<template>
  <div>
    <div class='crumbs'>
      <el-breadcrumb separator='/'>
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 我的优惠券</el-breadcrumb-item>
        <el-breadcrumb-item>周边顾客分析图</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
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
              name: '沁园重邮店',
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
            symbol: 'image://http://www.iconpng.com/download/png/99901',
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
            symbol: 'image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDk0MDg5MjY3NzEyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1MzgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNjU5Ljg0NjA5NSAzMjcuNjhIMzYzLjU5MzE0M2MtMzIuMzc3OTA1IDAtNTguNjYwNTcxIDI3Ljc0NTUyNC01OC42NjA1NzIgNjIuMDAwNzYybDIxLjk0Mjg1OCAyNTcuNTExNjE5IDAuNjMzOTA0IDcuNzI4NzYyYzMuMzQwMTkgMTguNjAyNjY3IDE4Ljc3MzMzMyAzMi42OTQ4NTcgMzcuMzUxNjE5IDMyLjY5NDg1N3YwLjA0ODc2MmgxMS40ODM0MjljMC41MzYzODEtMC4wNDg3NjIgMS4wOTcxNDMtMC4wNDg3NjIgMS42MzM1MjQtMC4wNDg3NjIgMC41NjA3NjIgMCAxLjA3Mjc2MiAwIDEuNjA5MTQzIDAuMDQ4NzYyIDEyLjA2ODU3MSAwLjgwNDU3MSAyMS44MjA5NTIgMTAuNDgzODEgMjMuNDU0NDc2IDIyLjkxODA5NSAwLjIxOTQyOSAxLjIxOTA0OCAwLjI0MzgxIDIuMzQwNTcxIDAuMzE2OTUyIDMuNTM1MjM4bDIwLjMzMzcxNCAyNjkuNzk5NjE5IDAuNDYzMjM5IDYuMDIyMDk2YzIuODUyNTcxIDE5LjIxMjE5IDE4LjU3ODI4NiAzMy45MTM5MDUgMzcuNTIyMjg1IDMzLjkxMzkwNGgxMDAuMjA1NzE1YzE4LjY1MTQyOSAwIDM0LjE4MjA5NS0xNC4yMzg0NzYgMzcuMzUxNjE5LTMzLjA2MDU3MWwwLjU4NTE0Mi03Ljc3NzUyNCAyMC4zMDkzMzQtMjY5LjMxMmMwLTAuODc3NzE0IDAuMTIxOTA1LTEuNzU1NDI5IDAuMjQzODA5LTIuNjA4NzYyIDEuNDg3MjM4LTEyLjcwMjQ3NiAxMS4zNjE1MjQtMjIuNjI1NTI0IDIzLjUwMzIzOC0yMy40MzAwOTUgMC41NjA3NjItMC4wNDg3NjIgMS4wOTcxNDMtMC4wNDg3NjIgMS42MzM1MjQtMC4wNDg3NjJhMTkuOTkyMzgxIDE5Ljk5MjM4MSAwIDAgMSAxLjYwOTE0MyAwLjA0ODc2MmgxMS4zMTI3NjJ2LTAuMDQ4NzYyYzE5LjAxNzE0MyAwIDM0Ljc2NzIzOC0xNC43OTkyMzggMzcuNTQ2NjY3LTM0LjA4NDU3MSAwLjA0ODc2Mi0wLjEyMTkwNSAwLjA0ODc2Mi0wLjI5MjU3MSAwLjA3MzE0My0wLjQ2MzIzOWwwLjM0MTMzMy0zLjk3NDA5NSAyMi4wODkxNDMtMjU5LjQxMzMzM2MwLTM0LjI1NTIzOC0yNi4yMzM5MDUtNjIuMDI1MTQzLTU4LjYzNjE5MS02Mi4wMjUxNDN6TTUxMS43MzE4MSAyNzUuMTE0NjY3YzcxLjYzMTIzOCAwIDEyOS43NTU0MjktNjEuNDY0MzgxIDEyOS43NTU0MjgtMTM3LjI2NDc2MiAwLTc1LjgyNDc2Mi01OC4xMjQxOS0xMzcuMzEzNTI0LTEyOS43NTU0MjgtMTM3LjMxMzUyNC03MS42NTU2MTkgMC0xMjkuNzA2NjY3IDYxLjQ4ODc2Mi0xMjkuNzA2NjY3IDEzNy4zMTM1MjQgMCA3NS44MDAzODEgNTguMDUxMDQ4IDEzNy4yNjQ3NjIgMTI5LjcwNjY2NyAxMzcuMjY0NzYyeiIgcC1pZD0iMTUzOSIgZmlsbD0iIzQ1YWQ5YSI+PC9wYXRoPjwvc3ZnPg==',
            symbolSize: 35
          },
          {
            name: '未领取优惠券顾客',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: [{
              name: 'cy001',
              value: [106.612320, 29.545500, 1]
            }, {
              name: 'cy001',
              value: [106.614420, 29.534450, 1]
            }, {
              name: 'cy001',
              value: [106.616520, 29.589200, 1]
            }, {
              name: 'cy001',
              value: [106.617620, 29.578600, 1]
            }, {
              name: 'cy001',
              value: [106.612320, 29.567800, 1]
            }, {
              name: 'cy001',
              value: [106.611220, 29.565900, 1]
            }, {
              name: 'cy001',
              value: [106.615620, 29.554600, 1]
            }, {
              name: 'cy001',
              value: [106.613420, 29.534700, 1]
            }, {
              name: 'cy001',
              value: [106.617720, 29.533800, 1]
            }, {
              name: 'cy001',
              value: [106.611120, 29.532500, 1]
            }, {
              name: 'cy001',
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
  width: 900px;
  height: 500px;
}
</style>
