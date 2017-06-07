<template>
  <div>
    <h1 class="title demonstration">投放记录</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="方案名称：">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item :label="item.discount_coupon.display_name + `：`" :key="item.discount_coupon.display_name + `：`" v-for="(item, index) in props.row.coupons">
              <span>{{ item.distribute_num }}张</span>
            </el-form-item>
            <el-form-item label="投放总数：">
              <span>{{ props.row.totalNum }}张</span>
            </el-form-item>
            <el-form-item label="投放时间：">
              <span>{{ props.row.created_at }}</span>
            </el-form-item>
            <el-form-item label="备注：">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="方案名称" prop="name">
      </el-table-column>
      <el-table-column label="投放时间" prop="created_at">
      </el-table-column>
      <el-table-column label="投放总数" prop="totalNum">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination class="page" layout="prev, pager, next" :page-count='totalPage' :page-size='params.size' :current-page='params.page' @current-change='changePage'>
      </el-pagination>
    </div>
  </div>
</template>

<script>
const $window = window
export default {
  data() {
    return {
      params: {
        shop_id: undefined,
        page: 1,
        size: 10
      },
      totalPage: 1,
      tableData: []
    }
  },
  methods: {
    fetchData() {
      let that = this
      // 获取数据
      let shopInfo = JSON.parse($window.localStorage.getItem('shop_info'))
      this.params.shop_id = shopInfo.id
      that.$api.distributeRecords(this.params).then(function (res) {
        that.tableData = res.data
        that.tableData.forEach(function (item) {
          let coupons = [...item]
          let totalNum = 0
          coupons.forEach(function (coupon) {
            totalNum = totalNum + coupon.distribute_num
          })
          item.totalNum = totalNum
        })
        that.totalPage = res.totalPage
      })
    },
    changePage(currentPage) {
      this.params.page = currentPage
      this.getCouponList()
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style lang="less" scoped>
.title {
  margin: 20px;
}

.page {
  margin: 40px;
  text-align: center;
}

.demo-table-expand {
  margin: 20px 60px;
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

