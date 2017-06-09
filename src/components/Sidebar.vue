<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
  
      <el-menu-item index="financeIndex">
        <i class="el-icon-edit"></i>
        <span>数据统计</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>商户设置</span>
        </template>
        <el-menu-item index="setting">资料设置</el-menu-item>
        <el-menu-item index="changePassword">密码设置</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-upload"></i>
          <span>数据接入</span>
        </template>
        <el-menu-item index="uploadFile">文件上传</el-menu-item>
        <!--<el-menu-item index="uploadSql">数据库对接</el-menu-item>-->
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>商户优惠券分析</span>
        </template>
        <el-menu-item index="mapChart">周边顾客分析</el-menu-item>
        <el-menu-item index="lineChart">优惠券领取距离分析</el-menu-item>
        <el-menu-item index="spreadChart">优惠券领取和使用状况</el-menu-item>
        <el-menu-item index="couponList">优惠券领取和使用排行榜</el-menu-item>
        <el-menu-item index="salesChart">商品销售状况</el-menu-item>
        <el-menu-item index="customersChat">新老顾客消费分析</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-date"></i>
          <span>优惠券投放管理</span>
        </template>
        <el-menu-item index="releaseForecast">投放预测</el-menu-item>
        <el-menu-item index="releaseAddCoupon">添加新券</el-menu-item>
        <el-menu-item index="releaseIndex">立即投放</el-menu-item>
        <el-menu-item index="releaseRecords">投放记录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '')
    }
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 230px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #2E363F;
}

.sidebar>ul {
  height: 100%;
}
</style>
