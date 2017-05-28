webpackJsonp([20],{1029:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=o(186),a=i(n),s=o(188),r=i(s),c=window;t.default={data:function(){return{form:{username:void 0,nickname:void 0,email:void 0,qq:void 0,phone_number:void 0,created_at:void 0,updated_at:void 0},oldData:{phone_number:void 0,qq:void 0,nickname:void 0},province:[],city:[],county:[],classification:[],provinceCode:"",cityCode:"",countyCode:"",classificationId:"",address:"",shopInfo:{}}},mounted:function(){var e=this;this.getInfo(),this.getRegionAsync("province").then(function(){e.getShopInfo()}),this.getClassification()},methods:{getInfo:function(){var e=this.form,t=this.oldData;this.$api.getInfo().then(function(o){for(var i in e)e.hasOwnProperty(i)&&(e[i]=o.data[i]);for(var n in t)t.hasOwnProperty(n)&&(t[n]=o.data[n])})},editInfo:function(){var e=this;if(this.form.nickname.length<5)return void this.$alert("用户名必须大于五个字符","提示",{confirmButtonText:"我知道了"});var t={};this.form.qq&&this.form.qq.length>0&&this.form.qq!=this.oldData.qq&&(t.qq=parseInt(this.form.qq)),this.form.nickname!=this.oldData.nickname&&(t.nickname=this.form.nickname),this.form.phone_number!=this.oldData.phone_number&&(t.phone_number=this.form.phone_number),this.$api.editInfo(t).then(function(t){200==t.state?(e.editOtherInfo(),e.getInfo()):e.$message.error("更新商户资料失败！")})},getRegionAsync:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,o=this;return"province"==e?void 0===t&&(t=""):"city"==e&&void 0===t?(t=this.provinceCode,this.city=[],this.cityCode="",this.county=[],this.countyCode=""):"county"==e&&void 0===t&&(t=this.cityCode,this.county=[],this.countyCode=""),new r.default(function(i,n){o.$api.getRegion({cityCode:t}).then(function(t){o[e]=t.data,i()})})},getClassification:function(){var e=this;this.$api.getClassification().then(function(t){e.classification=t.data})},getShopInfo:function(){var e=this;this.$api.getShopList().then(function(t){if(!(t.data.length<=0)){var o=t.data[0];c.localStorage.setItem("shop_info",(0,a.default)(o)),e.classificationId=o.classification.value,e.provinceCode=o.region[0].code,e.getRegionAsync("city",o.region[1].code).then(function(){e.cityCode=o.region[1].code}).then(function(){e.getRegionAsync("county",o.region[1].code).then(function(){e.countyCode=o.region[2].code})}),e.address=o.address}})},editOtherInfo:function(){var e=this;if(!this.cityCode||!this.address)return void this.$alert("您的地址信息不完整","提示",{confirmButtonText:"我知道了"});if(!this.classificationId)return void this.$alert("您未选择商户类型","提示",{confirmButtonText:"我知道了"});var t={name:this.form.username,cityCode:this.countyCode,classification_id:this.classificationId,address:this.address};this.$api.updateShopInfo(t).then(function(t){200==t.state?(e.getShopInfo(),e.$message.success("更新商户资料成功！")):e.$message.error("更新商户资料失败！请检查地址是否正确。")})}}}},503:function(e,t,o){var i=o(185)(o(1029),o(987),null,null);e.exports=i.exports},987:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",{staticClass:"crumbs"},[o("el-breadcrumb",{attrs:{separator:"/"}},[o("el-breadcrumb-item",[o("i",{staticClass:"el-icon-setting"}),e._v(" 资料设置（您上次更新资料在"+e._s(e.form.updated_at)+"）")])],1)],1),e._v(" "),o("div",{staticClass:"form-box"},[o("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px"}},[o("el-form-item",{attrs:{label:"邮箱"}},[o("span",[e._v(e._s(e.form.email))])]),e._v(" "),o("el-form-item",{attrs:{label:"公司名称"}},[o("span",[e._v(e._s(e.form.username))])]),e._v(" "),o("el-form-item",{attrs:{label:"入驻时间"}},[o("span",[e._v(e._s(e.form.created_at))])]),e._v(" "),o("el-form-item",{attrs:{label:"qq号码"}},[o("el-input",{attrs:{type:"",placeholder:"请输入qq号码"},model:{value:e.form.qq,callback:function(t){e.form.qq=t},expression:"form.qq"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"用户姓名"}},[o("el-input",{attrs:{placeholder:"请输入用户姓名"},model:{value:e.form.nickname,callback:function(t){e.form.nickname=t},expression:"form.nickname"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"电话号码"}},[o("el-input",{model:{value:e.form.phone_number,callback:function(t){e.form.phone_number=t},expression:"form.phone_number"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"商户类型"}},[o("el-select",{attrs:{placeholder:"请选择商户类型"},model:{value:e.classificationId,callback:function(t){e.classificationId=t},expression:"classificationId"}},e._l(e.classification,function(e){return o("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),o("el-form-item",{attrs:{label:"商户地址"}},[o("el-select",{attrs:{placeholder:"请选择所在省"},on:{change:function(t){e.getRegionAsync("city")}},model:{value:e.provinceCode,callback:function(t){e.provinceCode=t},expression:"provinceCode"}},e._l(e.province,function(e){return o("el-option",{key:e.cityCode,attrs:{label:e.name,value:e.cityCode}})})),e._v(" "),o("el-select",{attrs:{placeholder:"请选择所在市"},on:{change:function(t){e.getRegionAsync("county")}},model:{value:e.cityCode,callback:function(t){e.cityCode=t},expression:"cityCode"}},e._l(e.city,function(e){return o("el-option",{key:e.cityCode,attrs:{label:e.name,value:e.cityCode}})})),e._v(" "),o("el-select",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请选择所在县"},model:{value:e.countyCode,callback:function(t){e.countyCode=t},expression:"countyCode"}},e._l(e.county,function(e){return o("el-option",{key:e.cityCode,attrs:{label:e.name,value:e.cityCode}})})),e._v(" "),o("el-input",{staticStyle:{"margin-top":"20px"},attrs:{type:"textarea",placeholder:"请输入详细地址"},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}})],1),e._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary "},on:{click:e.editInfo}},[e._v("更新")]),e._v(" "),o("el-button",{on:{click:e.getInfo}},[e._v("取消")])],1)],1)],1)])},staticRenderFns:[]}}});