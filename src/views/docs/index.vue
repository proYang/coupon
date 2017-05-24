<template>
  <div class="docs">
    <indexHead></indexHead>
    <h1>产品介绍</h1>
  </div>
</template>

<script>
import indexHead from '../../components/IndexHeader'
export default {
  components: {
    indexHead
  }
}
</script>

<style lang="less" scoped>
.docs {
  width: 100%;
  height: 100%;
  min-height: 600px;
  max-height: 740px;
  text-align: center;
  background: url('../../assets/img/about_bg.jpg') no-repeat;
  background-size: cover;
  background-color: rgba(32, 45, 92, .87);
}
</style>
