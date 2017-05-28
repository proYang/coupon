<template>
  <div>
    <h1 class="title demonstration">投放记录</h1>
    <el-table :data="tableData5" style="width: 100%">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="方案名称：">
              <span>{{ props.row.planName }}</span>
            </el-form-item>
            <el-form-item :label="item.name + `：`" :key="item.name + `：`" v-for="(item, index) in props.row.coupons">
              <span>{{ item.num }}张</span>
            </el-form-item>
            <el-form-item label="投放总数：">
              <span>{{ props.row.totalNum }}张</span>
            </el-form-item>
            <el-form-item label="投放时间：">
              <span>{{ props.row.time }}</span>
            </el-form-item>
            <el-form-item label="备注：">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="方案名称" prop="planName">
      </el-table-column>
      <el-table-column label="投放时间" prop="time">
      </el-table-column>
      <el-table-column label="投放总数" prop="totalNum">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination class="page" @size-change="handleSizeChange" @current-change="handleCurrentChange" current-page.sync="5" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData5: [
        {
          coupons: [{
            name: '8.5折扣券',
            num: 210
          }, {
            name: '7.5折扣券',
            num: 600
          }, {
            name: '满100减20券',
            num: 100
          }, {
            name: '满200减50券',
            num: 321
          }, {
            name: '满30减5券',
            num: 500
          }],
          planName: '端午节促销活动',
          totalNum: 3000,
          time: '2017-5-28',
          desc: '优惠活动'
        }, {
          coupons: [{
            name: '8.5折扣券',
            num: 210
          }, {
            name: '7.5折扣券',
            num: 600
          }, {
            name: '满100减20券',
            num: 100
          }, {
            name: '满200减50券',
            num: 321
          }, {
            name: '满30减5券',
            num: 500
          }],
          planName: '端午节促销活动',
          totalNum: 3000,
          time: '2017-5-28',
          desc: '优惠活动'
        }, {
          coupons: [{
            name: '8.5折扣券',
            num: 210
          }, {
            name: '7.5折扣券',
            num: 600
          }, {
            name: '满100减20券',
            num: 100
          }, {
            name: '满200减50券',
            num: 321
          }, {
            name: '满30减5券',
            num: 500
          }],
          planName: '端午节促销活动',
          totalNum: 3000,
          time: '2017-5-28',
          desc: '优惠活动'
        }, {
          coupons: [{
            name: '8.5折扣券',
            num: 210
          }, {
            name: '7.5折扣券',
            num: 600
          }, {
            name: '满100减20券',
            num: 100
          }, {
            name: '满200减50券',
            num: 321
          }, {
            name: '满30减5券',
            num: 500
          }],
          planName: '端午节促销活动',
          totalNum: 3000,
          time: '2017-5-28',
          desc: '优惠活动'
        }]
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  margin: 20px;
}

.page {
  margin: 40px;
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

