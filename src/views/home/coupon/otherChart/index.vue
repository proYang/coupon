<template>
  <div>
    <div class='crumbs'>
      <el-breadcrumb separator='/'>
        <el-breadcrumb-item><i class="el-icon-menu"></i> 我的优惠券</el-breadcrumb-item>
        <el-breadcrumb-item>更多维度</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='plugins-tips'>我的优惠券状态</div>
    <div id="J_echarts-line" class="echarts"></div>
    <div id="J_echarts-bar" class="echarts"></div>
    <div id="J_echarts-pie" class="echarts"></div>
    <div id="J_echarts-funnel" class="echarts"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
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
        legend: {
          data: ['最高气温', '最低气温']
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
          data: [0, 1, 2, 3, 4, 5, 6]
        },
        yAxis: {
          name: '人数/个',
          nameGap: 10,
          type: 'value',
          axisLabel: {
            formatter: '{value} 个'
          }
        },
        series: [
          {
            name: '已领取优惠券顾客',
            type: 'line',
            data: [11, 11, 15, 10, 12, 8, 5],
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
            data: [1, 0, 2, 5, 3, 2, 10],
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
      },
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
            data: [32, 28, 26, 16]
          }
        ]
      },
      pie: {
        title: {
          text: '饼状图'
        },
        color: ['#20a0ff', '#13CE66', '#F7BA2A', '#FF4949', '#61a0a8'],
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
            radius: [0, '40%'],
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
              { value: 32, name: '已领券优惠券', selected: true },
              { value: 28, name: '未领券优惠券' }
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
              { value: 26, name: '已使用优惠券', selected: true },
              { value: 16, name: '未使用优惠券' }
            ]
          }
        ]
      },
      funnel: {
        title: {
          text: '漏斗图'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        legend: {
          data: ['总推送', '接收', '领取', '使用', '首次使用']
        },
        series: [
          {
            name: '总推送',
            type: 'funnel',
            left: '10%',
            width: '80%',
            label: {
              normal: {
                formatter: '{b}'
              },
              emphasis: {
                position: 'inside',
                formatter: '{b}: {c}%'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.7
              }
            },
            data: [
              { value: 100, name: '总推送' },
              { value: 80, name: '接收' },
              { value: 60, name: '领取' },
              { value: 40, name: '使用' },
              { value: 20, name: '首次使用' }
            ]
          },
          {
            name: '实际',
            type: 'funnel',
            left: '10%',
            width: '80%',
            maxSize: '80%',
            label: {
              normal: {
                position: 'inside',
                formatter: '{c}%',
                textStyle: {
                  color: '#fff'
                }
              },
              emphasis: {
                position: 'inside',
                formatter: '{b}实际: {c}%'
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.5,
                borderColor: '#fff',
                borderWidth: 2
              }
            },
            data: [
              { value: 80, name: '总推送' },
              { value: 50, name: '接收' },
              { value: 30, name: '领取' },
              { value: 10, name: '使用' },
              { value: 5, name: '首次使用' }
            ]
          }
        ]
      }
    }
  },
  methods: {
    drawline() {
      var chart = echarts.init(document.querySelector('#J_echarts-line'))
      chart.setOption(this.line, true)
    },
    drawbar() {
      var chart = echarts.init(document.querySelector('#J_echarts-bar'))
      chart.setOption(this.bar, true)
    },
    drawpie() {
      var chart = echarts.init(document.querySelector('#J_echarts-pie'))
      chart.setOption(this.pie, true)
    },
    drawfunnel() {
      var chart = echarts.init(document.querySelector('#J_echarts-funnel'))
      chart.setOption(this.funnel, true)
    },
    drawEcharts() {
      this.drawline()
      this.drawbar()
      this.drawpie()
      this.drawfunnel()
    }
  },
  mounted() {
    this.drawEcharts()
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
