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
    <div class="plugins-tips tips">小提示：查看已投放优惠券的使用情况，帮您的店铺有针对性的进行下次优惠券投放。</div>
    <div class="table-container" id="J_table-container">
      <el-table :data="tableData" border @sort-change='sortChange' @filter-change='fliterChange' class="table" :default-sort="{prop: 'number', order: 'descending'}">
        <el-table-column prop="display_name" label="优惠券名称" width="170">
        </el-table-column>
        <el-table-column prop="receive_num" label="领取数量" sortable width="150">
        </el-table-column>
        <el-table-column prop="use_num" label="使用数量" sortable width="150">
        </el-table-column>
        <el-table-column prop="receive_percentage" label="领取率" sortable width="150">
        </el-table-column>
        <el-table-column prop="use_percentage" label="使用率" sortable width="150">
        </el-table-column>
        <el-table-column prop="type_id" label="类型" width="130" :filters="[{ text: '折扣券', value: 2 }, { text: '满减券', value: 1 }]" filter-placement="bottom-end">
          <template scope="scope">
            <el-tag :type="scope.row.type_id == 1 ? 'primary' : 'success'" close-transition>{{scope.row.type_id == 1 ? '满减券':'折扣券'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="130">
          <template scope="scope">
            <el-button type="primary" @click="toThrowCoupon" size="small">再次投放</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page" layout="prev, pager, next" :page-count='totalPage' :page-size='params.size' :current-page='params.page' @current-change='changePage'>
      </el-pagination>
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
      params: {
        page: 1,
        size: 10
      },
      totalPage: 1,
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
      times: [1483200000000, new Date()],
      tableData: []
    }
  },
  methods: {
    toThrowCoupon() {
      this.$router.push({ path: '/throwCoupon' })
    },
    formatter(row, column) {
      return row.address
    },
    fliterChange(filters) {
      let arr = filters['el-table_1_column_6']
      if (arr.length >= 2) {
        this.params.type_id = ''
      } else {
        this.params.type_id = arr[0]
      }
      this.loadingInstance = Loading.service({
        target: '#J_table-container',
        body: 'loading',
        text: '数据获取中'
      })
      // 重新获取数据
      this.fetchData()
    },
    fetchData() {
      // 获取数据
      let that = this
      let shopInfo = JSON.parse($window.localStorage.getItem('shop_info'))
      this.params.shop_id = shopInfo.id
      this.params.start = new Date(that.times[0]).getTime()
      this.params.end = new Date(that.times[1]).getTime()
      this.$api.getCouponStatus(this.params).then(function (res) {
        that.tableData = res.data
        that.totalPage = res.totalPage
        // 关闭loading
        that.loadingInstance.close()
      })
    },
    sortChange(params) {
      if (params.order == 'ascending') {
        this.params.order = 'asc'
      } else {
        this.params.order = 'desc'
      }
      if (params.prop !== null) {
        this.params.order_column = params.prop
      }
      // 重新获取数据
      this.fetchData()
    },
    pickTime(val) {
      let times = this.times
      if (times[0] === null || times[1] === null) return
      this.loadingInstance = Loading.service({
        target: '#J_table-container',
        body: 'loading',
        text: '数据获取中'
      })
      // 重新获取数据
      this.fetchData()
    },
    changePage(currentPage) {
      this.params.page = currentPage
      // 重新获取数据
      this.fetchData()
    }
  },
  mounted() {
    this.loadingInstance = Loading.service({
      target: '#J_table-container',
      body: 'loading',
      text: '数据获取中'
    })
    this.fetchData()
  },
  destroyed() {
    // 关闭loading
    this.loadingInstance.close()
  }
}
</script>

<style scoped>
.table {
  margin-top: 60px;
  margin-left: 10px;
  margin-bottom: 20px;
  width: 100%;
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
  width: 85%;
  height: 100%;
  left: 30px;
  top: 60px;
}

.tips {
  position: absolute;
  top: 70px;
  width: 85%;
  font-size: 14px;
  padding: 15px 10px;
}

.page {
  text-align: center;
  margin-bottom: 20px;
}
</style>
