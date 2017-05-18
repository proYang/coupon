<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
      <el-menu-item index="state">
        <i class="el-icon-date"></i>经营概况
      </el-menu-item>
      <el-menu-item index="dispatch"><i class="el-icon-view"></i>投放中心</el-menu-item>
      <el-menu-item index="setting">
        <i class="el-icon-setting"></i>商户设置
      </el-menu-item>
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
