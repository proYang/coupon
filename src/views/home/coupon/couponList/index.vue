<template>
  <div>
    <div class='crumbs'>
      <el-breadcrumb separator='/'>
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 商户优惠券分析</el-breadcrumb-item>
        <el-breadcrumb-item>优惠券领取和使用状况排行榜</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="block">
      <span class="demonstration">数据所在时间段：</span>
      <el-date-picker v-model="times" type="daterange" :clearable="pickerOtherOption.clearable" :editable="pickerOtherOption.editable" @change="pickTime" :picker-options="pickerOptions" placeholder="选择所需数据的时间范围" align="left">
      </el-date-picker>
    </div>
    <div class="table-container">
      <el-table :data="tableData" max-height="400" border class="table" :default-sort="{prop: 'number', order: 'descending'}">
        <el-table-column prop="name" label="优惠券名称" width="170">
        </el-table-column>
        <el-table-column prop="number" label="领取数量" sortable width="150">
        </el-table-column>
        <el-table-column prop="number" label="使用数量" sortable width="150">
        </el-table-column>
        <el-table-column prop="probability" label="领取率" sortable width="150">
        </el-table-column>
        <el-table-column prop="probability" label="使用率" sortable width="150">
        </el-table-column>
        <el-table-column prop="tag" label="类型" width="120" :filters="[{ text: '折扣券', value: '折扣券' }, { text: '满减券', value: '满减券' }]" :filter-method="filterTag" filter-placement="bottom-end">
          <template scope="scope">
            <el-tag :type="scope.row.tag === '折扣券' ? 'primary' : 'success'" close-transition>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="130">
          <template scope="scope">
            <el-button type="primary" @click="toThrowCoupon" size="small">再次投放</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
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
      times: [new Date().getTime() - 3600 * 1000 * 24 * 500, new Date()],
      tableData: [{
        date: '2016-05-02',
        number: 120,
        probability: 0.82,
        name: '王小虎',
        tag: '折扣券'
      }, {
        date: '2016-05-04',
        number: 120,
        probability: 0.82,
        name: '王小虎',
        tag: '满减券'
      }, {
        date: '2016-05-01',
        number: 120,
        probability: 0.82,
        name: '王小虎',
        tag: '满减券'
      }, {
        date: '2016-05-03',
        number: 120,
        probability: 0.82,
        name: '王小虎',
        tag: '折扣券'
      }, {
        date: '2016-05-03',
        number: 120,
        probability: 0.82,
        name: '王小虎',
        tag: '满减券'
      }, {
        date: '2016-05-03',
        number: 120,
        probability: 0.82,
        name: '王小虎',
        tag: '折扣券'
      }, {
        date: '2016-05-03',
        number: 120,
        probability: 0.82,
        name: '王小虎',
        tag: '折扣券'
      }, {
        date: '2016-05-03',
        number: 120,
        probability: 0.82,
        name: '王小虎',
        tag: '满减券'
      }, {
        date: '2016-05-03',
        number: 120,
        probability: 0.82,
        name: '王小虎',
        tag: '折扣券'
      }, {
        date: '2016-05-03',
        number: 120,
        probability: 0.82,
        name: '王小虎',
        tag: '折扣券'
      }, {
        date: '2016-05-03',
        number: 120,
        probability: 0.82,
        name: '王小虎',
        tag: '满减券'
      }, {
        date: '2016-05-03',
        number: 120,
        probability: 0.82,
        name: '王小虎',
        tag: '折扣券'
      }, {
        date: '2016-05-03',
        number: 120,
        probability: 0.82,
        name: '王小虎',
        tag: '折扣券'
      }, {
        date: '2016-05-03',
        number: 120,
        probability: 0.82,
        name: '王小虎',
        tag: '满减券'
      }]
    }
  },
  methods: {
    toThrowCoupon() {
      this.$router.push({ path: '/throwCoupon' })
    },
    formatter(row, column) {
      return row.address
    },
    filterTag(value, row) {
      return row.tag === value
    },
    fetchData() {
      // 获取数据
      let that = this
    },
    pickTime(val) {
      let times = this.times
      if (times[0] === null || times[1] === null) return
      // this.loadingInstance = Loading.service({
      //   target: '#J_echarts-line',
      //   body: 'loading',
      //   text: '数据获取中'
      // })
      // 重新获取数据
      this.fetchData()
    }
  },
  mounted() {
    // this.loadingInstance = Loading.service({
    //   target: '#J_echarts-line',
    //   body: 'loading',
    //   text: '数据获取中'
    // })
    this.fetchData()
  },
  destroyed() {
    // 关闭loading
    // this.loadingInstance.close()
  }
}
</script>

<style scoped>
.table {
  margin-top: 20px;
  margin-bottom: 40px;
  float: left;
  width: 900px;
  height: auto;
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

.table-container {
  position: absolute;
  left: 30px;
  top: 60px;
}
</style>
