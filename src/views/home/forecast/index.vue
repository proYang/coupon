<template>
  <div class="table">
    <div class="plugins-tips">投放方案预测</div>
    <div>
      <span class="el-breadcrumb__item__inner">您当前用户总数
        <span style="font-weight:700">{{totalNum}}人</span>
      </span>
    </div>
    <div class="table-item" v-for="item in stamps">
      <div class="stamp stamp01" v-if="item.type.value == 1">
        <div class="par">
          <p>沁园重邮店</p>
          <sub class="sign">￥</sub>
          <span>{{parseInt(item.sellingPrice)}}</span>
          <sub>{{item.type.display}}</sub>
          <p>订单满{{parseInt(item.originalPrice)}}元</p>
        </div>
        <div class="copy">副券
          <p>2017-05-13
            <br>2018-08-13</p>
        </div>
        <i></i>
      </div>
      <div class="stamp stamp02" v-else-if="item.type.value == 2">
        <div class="par">
          <p>沁园重邮店</p>
          <sub class="sign">&nbsp</sub>
          <span>{{(item.rebate*10).toFixed(1)}}</span>
          <sub>{{item.type.display}}</sub>
        </div>
        <div class="copy">副券
          <p>2017-05-1
            <br>2017-09-1</p>
        </div>
        <i></i>
      </div>
      <p class="info">预测有
        <span>{{item.num}}</span>人使用此类优惠券</p>
      <el-button @click='push' type="primary">投放</el-button>
    </div>
    <div class="block">
      <el-pagination layout="prev, pager, next" :total="totalNum" :page-size='params.size' :current-page='params.page' @current-change='changePage'>
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
        size: 6,
        page: 1
      },
      totalNum: 100,
      stamps: []
    }
  },
  mounted() {
    this.getShopId()
    this.getCouponList()
  },
  methods: {
    push() {
      this.$notify({
        title: '提示',
        message: '您还未开通一键投放功能，请联系客服开通',
        type: 'warning'
      })
    },
    getCouponList() {
      let that = this
      let params = this.params
      this.$api.getCouponList(params).then(function (res) {
        that.stamps = res.data
      })
    },
    getShopId() {
      let shopInfo = JSON.parse($window.localStorage.getItem('shop_info'))
      this.params.shop_id = shopInfo.id
    },
    changePage(currentPage) {
      this.params.page = currentPage
      this.getCouponList()
    }
  }
}
</script>

<style lang="less" scoped>
.table-item {
  margin-bottom: 40px;
  width: 420px;
  display: inline-block;
  text-align: center;
}

.info {
  margin-bottom: 20px;
  text-align: center;
  &>span {
    font-weight: 600;
  }
}

.stamp {
  width: 387px;
  height: 140px;
  padding: 0 10px;
  position: relative;
  overflow: hidden;
  transform: scale(.7);
  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 10px;
    right: 10px;
    z-index: 0;
  }
  i {
    position: absolute;
    left: 20%;
    top: 45px;
    height: 190px;
    width: 390px;
    background-color: rgba(255, 255, 255, .15);
    transform: rotate(-30deg);
  }
  .par {
    position: relative;
    float: left;
    padding: 16px 15px;
    width: 220px;
    border-right: 2px dashed rgba(255, 255, 255, .3);
    text-align: left;
    p {
      color: #fff;
      font-size: 16px;
      line-height: 21px;
    }
    span {
      font-size: 50px;
      color: #fff;
      margin-right: 5px;
      line-height: 65px;
    }
    .sign {
      font-size: 34px;
    }
    sub {
      position: relative;
      top: -5px;
      color: rgba(255, 255, 255, .8);
    }
  }
  .copy {
    position: relative;
    display: inline-block;
    padding: 21px 14px;
    width: 100px;
    vertical-align: text-bottom;
    font-size: 30px;
    color: rgb(255, 255, 255);
    text-align: center;
    line-height: initial;
    p {
      font-size: 16px;
      margin-top: 15px;
    }
  }
}

.stamp01 {
  background: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 5px, #F39B00 5px);
  background-size: 15px 15px;
  background-position: 9px 3px;
  &:before {
    background-color: #F39B00;
  }
}

.stamp02 {
  background: radial-gradient(transparent 0, transparent 5px, #D24161 5px);
  background-size: 15px 15px;
  background-position: 9px 3px;
}

.stamp02:before {
  background-color: #D24161;
}

.stamp03 {
  background: radial-gradient(transparent 0, transparent 5px, #7EAB1E 5px);
  background-size: 15px 15px;
  background-position: 9px 3px;
}

.stamp03:before {
  background-color: #7EAB1E;
}

.stamp03 .copy {
  padding: 10px 6px 10px 12px;
  font-size: 24px;
}

.stamp04 {
  width: 390px;
  background: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 4px, #50ADD3 4px);
  background-size: 12px 8px;
  background-position: -5px 10px;
}

.stamp04:before {
  background-color: #50ADD3;
  left: 5px;
  right: 5px;
}

.stamp04 .copy {
  padding: 10px 6px 10px 12px;
  font-size: 24px;
}

.block {
  text-align: center;
  margin-left: -180px;
}
</style>
