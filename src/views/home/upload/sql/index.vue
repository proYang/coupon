<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-upload"></i> 数据接入</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-title">MySQL</div>
    <div class="content-desc">需开放数据库公网访问权限，可设置每日自动同步。</div>
    <el-steps :space="300" :active="active" finish-status="finish" style="margin-top:25px;">
      <el-step title="连接配置"></el-step>
      <el-step title="同步频率配置"></el-step>
    </el-steps>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  },

  methods: {
    next() {
      if (this.active++ > 1) this.active = 0
    }
  }
}
</script>

<style lang="less" scoped>
.content-title {
  font-weight: 400;
  line-height: 50px;
  font-size: 22px;
  color: #1f2f3d;
}

.content-desc {
  line-height: 20px;
  font-size: 16px;
  color: #1f2f3d;
}
</style>
