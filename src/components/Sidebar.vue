<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
      <el-menu-item index="setting">
        <i class="el-icon-setting"></i>商户设置
      </el-menu-item>
      <el-menu-item index="upload">
        <i class="el-icon-upload"></i>数据导入
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>我的优惠券</template>
        <el-menu-item index="mapChart">周边顾客分析</el-menu-item>
        <el-menu-item index="lineChart">优惠券领取距离分析</el-menu-item>
        <el-menu-item index="spreadChart">优惠券领取和使用状况</el-menu-item>
      </el-submenu>
      <el-menu-item index="forecast">
        <i class="el-icon-date"></i>投放预测</el-menu-item>
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
  width: 200px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #2E363F;
}

.sidebar>ul {
  height: 100%;
}
</style>
