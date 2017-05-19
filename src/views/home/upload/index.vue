<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-upload"></i> 数据导入</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-title">请导入您的流水记录</div>
    <div class="plugins-tips">点击此处下载范例文件
      <div class="el-upload-list__item is-success __web-inspector-hide-shortcut__">
        <a class="el-upload-list__item-name" :href="file" style="display:inline-block">
          <i class="el-icon-document"></i>范例文件.csv
        </a>
      </div>
    </div>
    <el-upload action="/jinghuitou/public/index.php/shop/importRecords" :data='params' name="records" type="drag" :on-remove="handleRemove" :on-error="handleError" :default-file-list="fileList">
      <i class="el-icon-upload"></i>
      <div class="el-dragger__text">将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传excel或者csv文件</div>
    </el-upload>
  </div>
</template>

<script>
import file from '../../../../static/data.csv'
const $window = window
export default {
  data: function () {
    return {
      params: {
        shop_id: undefined
      },
      src: '../../../static/img/img.jpg',
      file: file,
      fileList: []
    }
  },
  mounted() {
    this.getShopId()
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleError() {
      this.$notify.error({
        title: '上传失败',
        message: '文件上传失败，请检查您的文件类型'
      })
    },
    getShopId() {
      let shopInfo = JSON.parse($window.localStorage.getItem('shop_info'))
      this.params.shop_id = shopInfo.id
    }
  }
}
</script>

<style scoped>
.content-title {
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}

.pre-img {
  width: 250px;
  height: 250px;
  margin-bottom: 20px;
}
</style>
