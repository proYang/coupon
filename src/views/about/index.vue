<template>
  <div class="about clearfix">
    <indexHead></indexHead>
    <h1 class="title">关于我们</h1>
    <div class="article">
      <p>DATABASELINE技术有限公司，是一个拥有自主知识产权，集产、学、研及针对优惠券预测评估、精确投放于一体的O2O优惠券大数据使用及精准投放服务有限责任公司。</p>
      <p>本公司以大数据专利技术和竞赛《一种基于MPI的ML-KNN多标签中文文本分类方法》（授权专利号 201710026254.4） 《一种基于主动学习的数据自动标注方法》（授权专利号201710081921.9） 《校园记账资金管理软件》（登记号2016SR330170）（阿里天池大数据竞赛：生活大实惠：O2O 优惠券使用预测 TOP 2%）（阿里天池大数据竞赛：IJCAI-17 口碑商家客流量预测 TOP 4%）等为支撑立足于“大数据”面向O2O平台和商家等客户，针对像支付宝，淘宝等本身拥有优惠券发放平台的，我们给予数据分析，预测用户的优惠券使用率，提高发放精准度，添加特定人群发放。</p>
      <p>平台针对微商店铺本身无技术的该平台提供一站式服务。涵盖数据分析和优惠券发放，回收统计。业务范围涵盖数据分析，数据预测，和优惠券一站式发放等，并在服务中收取一定的专利使用费，检测服务费，咨询费，养护方案设计费等作为主要盈利来源。</p>
      <p>公司有重庆邮电大学DATABASELINE做技术团队以及重庆邮电大学教授王进和教授胡峰为指导。并依托产学研合作伙伴——国家重点实验室“X-DATA大数据实验室”实验中心。以“专业技术、专业人员、专业平台、专业服务”为宗旨，不断研发完善大数据预测技术，进一步发展“互联网＋”，发展O2O模式，并发现解决行业中的问题，成为行业中一股不可阻挡的力量。</p>
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
.about {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  background: url('~assets/img/about_bg.jpg') no-repeat;
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
