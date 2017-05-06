<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-upload"></i>  数据导入</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-title">请导入您的消费记录</div>
    <div class="plugins-tips">
      Element UI自带上传组件。 访问地址：
      <a href="http://element.eleme.io/#/zh-CN/component/upload" target="_blank">Element UI Upload</a>
    </div>
    <el-upload action="/api/posts/" type="drag" :on-remove="handleRemove" :on-error="handleError" :default-file-list="fileList">
      <i class="el-icon-upload"></i>
      <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传excel或者csv文件</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      src: '../../../static/img/img.jpg',
      fileList: []
    }
  },
  methods: {
    imageuploaded(res) {
      console.log(res)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleError() {
      this.$notify.error({
        title: '上传失败',
        message: '图片上传接口上传失败，可更改为自己的服务器接口'
      })
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
