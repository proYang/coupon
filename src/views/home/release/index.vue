<template>
  <div class="forecast">
    <h1 class="tittle">投放入口选择</h1>
    <div class="option clearfix">
      <div class="option-item">
        <el-button class="button" type="primary" size="large" @click="goThrowCoupon">人工投放</el-button>
        <div class="image-wrap">
          <img src="~assets/img/usepeople.jpg" class="image" @click="goThrowCoupon">
        </div>
      </div>
      <div class="option-item">
        <el-button class="button" type="primary" size="large" @click="goForecastPlan">智能投放</el-button>
        <div class="image-wrap">
          <img src="~assets/img/usecomputer.jpg" class="image" @click="goForecastPlan">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goThrowCoupon() {
      this.$router.push({ path: '/throwCoupon' })
    },
    goForecastPlan() {
      this.$router.push({ path: '/forecastPlan' })
    }
  },
  mounted() {
  }
}
</script>


<style lang="less" scoped>
.forecast {}

.plugins-tips {
  text-align: center;
}

.option {
  margin: 0 auto;
  width: 960px;
  &-item {
    position: relative;
    float: left;
    margin-top: 50px;
    width: 480px;
    text-align: center;
  }
}

.tittle {
  margin: 20px;
  text-align: center;
  font-size: 25px;
}

.image {
  width: 350px;
  height: 232px;
  transition: all 0.6s;
  cursor: pointer;
  &:hover {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }
}

.image-wrap {
  margin: 0 auto;
  width: 350px;
  height: 232px;
  overflow: hidden;
}

.button {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -70px;
  width: 104px;
  margin: auto;
  display: block;
  &:hover {
    &+.image-wrap {
      >.image {
        -webkit-transform: scale(1.1);
        -ms-transform: scale(1.1);
        transform: scale(1.1);
      }
    }
  }
}
</style>

