<template>
  <div class="docs clearfix">
    <indexHead></indexHead>
    <h1 class="title">产品介绍</h1>
    <div class="article">
      <p>“精投惠”平台是重庆DataBaseline团队倾力打造的面向零售商家的优惠券发放平台，并在内容与用户行为数据沉淀的同时，深度挖掘潜在用户，以优惠券留住老用户或吸引新客户进店消费，使得商家利润最大化。</p>
      <p>该平台以 O2O 优惠券精准投放为研究场景，以用户的消费情况为研究对象，通过研究其中用户行为规律及其相关场景，深入分析用户购买需求、行为模式和优惠券以往使用情况。 </p>
      <p>在数据共享的时候，对数据进行脱敏，保障用户隐私安全的同时，确保预测结果的准确性。</p>
      <p>旨在研发新一代底层采用并行计算统一框架的大数据挖掘平台，并在其上实现高性能算法集工具，以满足当前的复杂应用新需求。</p>
      <p>包括离线数据分析、优惠券发放、优惠券预测等。包括定制优惠券，一键发放给受众人群，自助式个性化推荐模块；囊括了收益预测系统，能将未来优惠券发放后的经济效益直接以图表的方式展示给商户，能对企业进行高效的管理。</p>
    </div>
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
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  background: url('~assets/img/product_bg.jpg') no-repeat;
  background-size: cover;
  background-color: rgba(32, 45, 92, .87);
  .title {
    margin-top: 120px;
    margin-bottom: 28px;
    color: #fff;
    font-size: 40px;
    font-weight: 200;
    line-height: normal;
  }
  .article {
    margin: 0 auto;
    width: 960px;
    font-size: 14px;
    line-height: 28px;
    text-align: left;
    color: #fff;
    >p {
      text-indent: 2em;
      margin-bottom: 28px;
    }
  }
}
</style>
