<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-setting"></i> 资料设置（您上次更新资料在{{form.updated_at}}）</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form-box">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="邮箱">
          <span>{{form.email}}</span>
        </el-form-item>
        <el-form-item label="公司名称">
          <span>{{form.username}}</span>
        </el-form-item>
        <el-form-item label="入驻时间">
          <span>{{form.created_at}}</span>
        </el-form-item>
        <el-form-item label="qq号码">
          <el-input type="" v-model="form.qq" placeholder="请输入qq号码"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="form.nickname" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="form.phone_number"></el-input>
        </el-form-item>
        <el-form-item label="商户类型">
          <el-select v-model="classificationId" placeholder="请选择商户类型">
            <el-option v-for="item in classification" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商户地址">
          <el-select v-model="provinceCode" @change="getRegionAsync('city')" placeholder="请选择所在省">
            <el-option v-for="item in province" :key="item.cityCode" :label="item.name" :value="item.cityCode">
            </el-option>
          </el-select>
          <el-select v-model="cityCode" @change="getRegionAsync('county')" placeholder="请选择所在市">
            <el-option v-for="item in city" :key="item.cityCode" :label="item.name" :value="item.cityCode">
            </el-option>
          </el-select>
          <el-select style="margin-top: 20px;" v-model="countyCode" placeholder="请选择所在县">
            <el-option v-for="item in county" :key="item.cityCode" :label="item.name" :value="item.cityCode">
            </el-option>
          </el-select>
          <el-input style="margin-top: 20px;" type='textarea' v-model="address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary " @click="editInfo">更新</el-button>
          <el-button @click="getInfo">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  
  </div>
</template>

<script>
const $window = window
export default {
  data: function () {
    return {
      form: {
        username: undefined, // 公司名称
        nickname: undefined, // 用户名  ----------可修改
        email: undefined, // 邮箱地址
        qq: undefined, // qq号码      ----------可修改
        phone_number: undefined, // 电话号码  ----------可修改
        created_at: undefined, // 入驻时间
        updated_at: undefined // 上次更新记录时间
      },
      // 之前的用户信息
      oldData: {
        phone_number: undefined,
        qq: undefined,
        nickname: undefined
      },
      province: [], // 省
      city: [], // 市
      county: [], // 县
      classification: [], // 商户类型
      provinceCode: '',
      cityCode: '',
      countyCode: '',
      classificationId: '', // 商户类型ID
      address: '', // 详细地址
      shopInfo: {} // 商户列表
    }
  },
  mounted() {
    // 获取资料
    let that = this
    this.getInfo()
    this.getRegionAsync('province').then(function () {
      that.getShopInfo()
    })
    this.getClassification()
  },
  methods: {
    getInfo() {
      let that = this
      let object = this.form
      let oldData = this.oldData
      this.$api.getInfo().then(function (res) {
        for (let key in object) {
          if (object.hasOwnProperty(key)) {
            object[key] = res.data[key]
          }
        }
        for (let key2 in oldData) {
          if (oldData.hasOwnProperty(key2)) {
            oldData[key2] = res.data[key2]
          }
        }
      })
    },
    editInfo() {
      let that = this
      if (this.form.nickname.length < 5) {
        this.$alert('用户名必须大于五个字符', '提示', {
          confirmButtonText: '我知道了'
        })
        return
      }
      let obj = {}
      if (this.form.qq && this.form.qq.length > 0 && this.form.qq != this.oldData.qq) {
        obj.qq = parseInt(this.form.qq)
      }
      if (this.form.nickname != this.oldData.nickname) {
        obj.nickname = this.form.nickname
      }
      if (this.form.phone_number != this.oldData.phone_number) {
        obj.phone_number = this.form.phone_number
      }
      this.$api.editInfo(obj).then(function (res) {
        if (res.state == 200) {
          // 设置其他信息
          that.editOtherInfo()
          that.getInfo()
        } else {
          that.$message.error('更新商户资料失败！')
        }
      })
    },
    getRegionAsync(type, code = undefined) {
      let that = this
      if (type == 'province') {
        code === undefined ? code = '' : ''
      } else if (type == 'city' && code === undefined) {
        code = this.provinceCode
        this.city = []
        this.cityCode = ''
        this.county = []
        this.countyCode = ''
      } else if (type == 'county' && code === undefined) {
        code = this.cityCode
        this.county = []
        this.countyCode = ''
      }
      return new Promise(function (resolve, reject) {
        that.$api.getRegion({ 'cityCode': code }).then(function (res) {
          that[type] = res.data
          resolve()
        })
      })
    },
    getClassification() {
      let that = this
      this.$api.getClassification().then(function (res) {
        that.classification = res.data
      })
    },
    getShopInfo() {
      // 获取商户列表
      let that = this
      this.$api.getShopList().then(function (res) {
        if (res.data.length <= 0) return
        // 需通过localStorage保存 商户信息
        let info = res.data[0]
        $window.localStorage.setItem('shop_info', JSON.stringify(info))
        that.classificationId = info.classification.value
        that.provinceCode = info.region[0].code
        that.getRegionAsync('city', info.region[1].code).then(function () {
          that.cityCode = info.region[1].code
        }).then(function () {
          that.getRegionAsync('county', info.region[1].code).then(function () {
            that.countyCode = info.region[2].code
          })
        })
        that.address = info.address
      })
    },
    editOtherInfo() {
      let that = this
      if (!this.cityCode || !this.address) {
        this.$alert('您的地址信息不完整', '提示', {
          confirmButtonText: '我知道了'
        })
        return
      }
      if (!this.classificationId) {
        this.$alert('您未选择商户类型', '提示', {
          confirmButtonText: '我知道了'
        })
        return
      }
      let obj = {
        name: this.form.username,
        cityCode: this.countyCode,
        classification_id: this.classificationId,
        address: this.address
      }
      this.$api.updateShopInfo(obj).then(function (res) {
        if (res.state == 200) {
          // 获取商户列表
          that.getShopInfo()
          that.$message.success('更新商户资料成功！')
        } else {
          that.$message.error('更新商户资料失败！请检查地址是否正确。')
        }
      })
    }
  }
}
</script>
