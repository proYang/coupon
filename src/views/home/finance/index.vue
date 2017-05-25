<template>
  <div>
    <h1>数据统计</h1>
    <div class="finance clearfix">
      <div class="item">
        <h1 id="totalPut">{{counts.totalPut}}</h1>
        <p>发券总量</p>
      </div>
      <div class="item">
        <h1 id="totalGet">{{counts.totalGet}}</h1>
        <p>领券总量</p>
      </div>
      <div class="item">
        <h1 id="todayPut">{{counts.todayPut}}</h1>
        <p>今日发券量</p>
      </div>
      <div class="item">
        <h1 id="todayGet">{{counts.todayGet}}</h1>
        <p>今日领券量</p>
      </div>
    </div>
  </div>
</template>

<script>
import CountUp from 'countup.js'
export default {
  data() {
    return {
      counts: {
        todayPut: 236,
        todayGet: 48,
        totalPut: 2354,
        totalGet: 864
      },
      options: {
        useEasing: true,
        useGrouping: true,
        separator: '',
        decimal: '.'
      }
    }
  },
  methods: {
    totalGetAnimate() {
      let count = this.counts.totalGet
      let $totalGet = document.getElementById('totalGet')
      let anmiate = new CountUp($totalGet, 0, count, 0, 1.5, this.options)
      anmiate.start()
    },
    totalPutAnimate() {
      let count = this.counts.totalPut
      let $totalPut = document.getElementById('totalPut')
      let anmiate = new CountUp($totalPut, 0, count, 0, 1.5, this.options)
      anmiate.start()
    },
    todayGetAnimate() {
      let count = this.counts.todayGet
      let $todayGet = document.getElementById('todayGet')
      let anmiate = new CountUp($todayGet, 0, count, 0, 1.5, this.options)
      anmiate.start()
    },
    todayPutAnimate() {
      let count = this.counts.todayPut
      let $todayPut = document.getElementById('todayPut')
      let anmiate = new CountUp($todayPut, 0, count, 0, 1.5, this.options)
      anmiate.start()
    }
  },
  mounted() {
    this.totalPutAnimate()
    this.totalGetAnimate()
    this.todayPutAnimate()
    this.todayGetAnimate()
  }
}
</script>


<style lang="less" scoped>
.finance {
  width: 900px;
  margin: 50px auto 0 auto;
  overflow: auto;
  .item {
    color: #fff;
    border-radius: 5px;
    float: left;
    margin: 20px;
    padding: 20px;
    width: 370px;
    height: 90px;
    background-color: #acf;
    >h1 {
      margin: 0;
      font-weight: 300;
      font-size: 40px;
      padding: 8px;
    }
    >p {
      padding: 10px;
      font-size: 14px;
    }
    &:nth-child(1) {
      background-color: #3598db;
    }
    &:nth-child(2) {
      background-color: #1abc9c;
    }
    &:nth-child(4) {
      background-color: #9a59b5;
    }
    &:nth-child(3) {
      background-color: #324057;
    }
  }
}
</style>

