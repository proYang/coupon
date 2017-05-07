<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-setting"></i> 商户设置（您上次更新资料在{{form.updated_at}}）</el-breadcrumb-item>
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
        <el-form-item label="商户地址">
          <el-select v-model="provinceCode" @change="getRegion('city')" placeholder="请选择所在省">
            <el-option v-for="item in province" :label="item.name" :value="item.cityCode">
            </el-option>
          </el-select>
          <el-select v-model="cityCode" @change="getRegion('county')" placeholder="请选择所在市">
            <el-option v-for="item in city" :label="item.name" :value="item.cityCode">
            </el-option>
          </el-select>
          <el-select style="margin-top: 20px;" v-model="countyCode" placeholder="请选择所在县">
            <el-option v-for="item in county" :label="item.name" :value="item.cityCode">
            </el-option>
          </el-select>
          <el-input style="margin-top: 20px;" type='textarea' v-model="form.address" placeholder="请输入详细地址"></el-input>
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
      provinceCode: '',
      cityCode: '',
      countyCode: ''
    }
  },
  mounted() {
    // 获取资料
    this.getInfo()
    this.getRegion('province')
  },
  methods: {
    getInfo() {
      var that = this
      var object = this.form
      var oldData = this.oldData
      this.$api.getInfo().then(function (res) {
        for (var key in object) {
          if (object.hasOwnProperty(key)) {
            object[key] = res.data[key]
          }
        }
        for (var key2 in oldData) {
          if (oldData.hasOwnProperty(key2)) {
            oldData[key2] = res.data[key2]
          }
        }
      })
    },
    editInfo() {
      var that = this
      if (this.form.nickname.length < 5) {
        this.$alert('用户名必须大于五个字符', '提示', {
          confirmButtonText: '我知道了'
        })
        return
      }
      var obj = {}
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
          that.$message.success('更新商户资料成功！')
          that.getInfo()
        } else {
          that.$message.error('更新商户资料失败！')
        }
      })
    },
    getRegion(type) {
      var that = this
      var cityCode
      if (type == 'province') {
        cityCode = null
      } else if (type == 'city') {
        cityCode = this.provinceCode
        this.city = []
        this.cityCode = ''
        this.county = []
        this.countyCode = ''
      } else if (type == 'county') {
        cityCode = this.cityCode
        this.county = []
        this.countyCode = ''
      }
      this.$api.getRegion({'cityCode': cityCode}).then(function (res) {
        that[type] = res.data
      })
    }
  }
}
</script>
