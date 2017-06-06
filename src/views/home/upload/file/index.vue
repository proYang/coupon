<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-upload"></i> 数据接入</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-title">请导入您的流水记录</div>
    <div class="plugins-tips" style="position:relative">点击此处下载范例文件
      <!--<div class="el-upload-list__item is-success __web-inspector-hide-shortcut__">-->
      <a class="el-upload-list__item-name" :href="file" style="position: absolute;top: 20px;left: 190px;font-size: 14px;">
        <i class="el-icon-document"></i>范例文件.csv
      </a>
      <!--</div>-->
    </div>
    <el-upload action="/jinghuitou/public/index.php/shop/importRecords" :drag="drag" :data='params' name="records" type="drag" :on-remove="handleRemove" :on-success="handleSuccess" :on-error="handleError" :default-file-list="fileList">
      <i class="el-icon-upload"></i>
      <div class="el-dragger__text">将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传excel或者csv文件</div>
    </el-upload>
    <div class="table-example-wrap">
      <dl>
        <dt>表格示例</dt>
        <dd>
          <p>1.请上传有标准行列的一维数据表格。（有合并单元格的数据请处理过后再上传，否则可能出现表头识别有误）</p>
          <p>2.日期字段需包含年月日（如20160217）</p>
        </dd>
      </dl>
      <ul class="horizon tips-head j-tips-head">
        <li class="tips-head-item">第1列
          <li class="tips-head-item">第2列
            <li class="tips-head-item">第3列
              <li class="tips-head-item">第4列
                <li class="tips-head-item">第5列
                  <li class="tips-head-item">第6列
                    <li class="tips-head-item">第7列</li>
      </ul>
      <table class="bdp-table-normal table-border w100 j-table-example">
        <thead>
          <tr>
            <th>用户ID</th>
            <th>拜访人</th>
            <th>员工编号</th>
            <th>部门</th>
            <th>职位</th>
            <th>拜访日期</th>
            <th>拜访时间</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>乔歆然</td>
            <td>600001</td>
            <td>销售一部</td>
            <td>销售总监</td>
            <td>2016/8/8</td>
            <td>11:23</td>
          </tr>
          <tr>
            <td>1</td>
            <td>乔歆然</td>
            <td>600001</td>
            <td>销售一部</td>
            <td>销售总监</td>
            <td>2016/8/8</td>
            <td>11:23</td>
          </tr>
          <tr>
            <td>1</td>
            <td>乔歆然</td>
            <td>600001</td>
            <td>销售一部</td>
            <td>销售总监</td>
            <td>2016/8/8</td>
            <td>11:23</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import file from '../../../../../static/data.csv'
const $window = window
export default {
  data: function () {
    return {
      params: {
        shop_id: undefined
      },
      src: '../../../../static/img/img.jpg',
      file: file,
      drag: true,
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
    handleSuccess(response, file, fileList) {
      this.$notify.success({
        title: '上传成功',
        message: '文件上传成功，预计两个小时后数据分析完成，请耐心等待',
        duration: 0
      })
    },
    handleError() {
      this.$notify.error({
        title: '上传失败',
        message: '文件上传失败，请检查您的文件格式'
      })
    },
    getShopId() {
      let shopInfo = JSON.parse($window.localStorage.getItem('shop_info'))
      this.params.shop_id = shopInfo.id
    }
  }
}
</script>

<style lang="less" scoped>
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

.table-example-wrap {
  width: 100%!important;
  height: 100%;
  color: #666;
  font-size: 12px;
  dt {
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 6px;
  }
  dl {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  p {
    line-height: 1.5;
  }
  .tips-head {
    list-style: none;
    margin-bottom: 8px;
    .tips-head-item {
      color: #fff;
      width: 100/7%;
      background: rgba(81, 130, 228, .6);
      border-right: 2px #fff solid;
      display: inline-block;
      box-sizing: border-box;
      line-height: 32px;
      text-align: center;
    }
  }
}

.bdp-table-normal {
  width: 100%!important;
  thead th {
    background-color: #ECEFF1;
    color: rgba(10, 18, 32, .64);
  }
  th {
    width: 100/7%;
    padding: 8px 16px;
    line-height: 16px;
    height: 32px;
    text-align: left;
    font-weight: 400;
    box-sizing: border-box;
  }
  th+th,
  td+td {
    border-left: solid 1px #DFE4E7;
  }
  td {
    padding: 8px 18px;
    line-height: 16px;
    height: 32px;
    vertical-align: middle;
  }
  tr {
    background-color: #FFF;
  }
  tr+tr {
    border-top: solid 1px #DFE4E7;
  }
  tr:nth-child(odd) {
    background-color: #FFF;
  }
  tr:nth-child(even) {
    background-color: #F7F8F9;
  }
}

.table-border {
  border: solid 1px #DFE4E7;
}
</style>

<style>
.el-upload-dragger,
.el-upload {
  width: 100%;
}
</style>

