webpackJsonp([8],{193:function(e,t,o){var n=o(71)(o(658),o(641),null,null);e.exports=n.exports},641:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",{staticClass:"crumbs"},[o("el-breadcrumb",{attrs:{separator:"/"}},[o("el-breadcrumb-item",[o("i",{staticClass:"el-icon-setting"}),e._v(" 商户设置（您上次更新资料在"+e._s(e.form.updated_at)+"）")])],1)],1),e._v(" "),o("div",{staticClass:"form-box"},[o("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px"}},[o("el-form-item",{attrs:{label:"邮箱"}},[o("span",[e._v(e._s(e.form.email))])]),e._v(" "),o("el-form-item",{attrs:{label:"公司名称"}},[o("span",[e._v(e._s(e.form.username))])]),e._v(" "),o("el-form-item",{attrs:{label:"入驻时间"}},[o("span",[e._v(e._s(e.form.created_at))])]),e._v(" "),o("el-form-item",{attrs:{label:"qq号码"}},[o("el-input",{attrs:{type:"",placeholder:"请输入qq号码"},model:{value:e.form.qq,callback:function(t){e.form.qq=t},expression:"form.qq"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"用户姓名"}},[o("el-input",{attrs:{placeholder:"请输入用户姓名"},model:{value:e.form.nickname,callback:function(t){e.form.nickname=t},expression:"form.nickname"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"电话号码"}},[o("el-input",{model:{value:e.form.phone_number,callback:function(t){e.form.phone_number=t},expression:"form.phone_number"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"商户地址"}},[o("el-select",{attrs:{placeholder:"请选择所在省"},on:{change:function(t){e.getRegion("city")}},model:{value:e.provinceCode,callback:function(t){e.provinceCode=t},expression:"provinceCode"}},e._l(e.province,function(e){return o("el-option",{key:e.cityCode,attrs:{label:e.name,value:e.cityCode}})})),e._v(" "),o("el-select",{attrs:{placeholder:"请选择所在市"},on:{change:function(t){e.getRegion("county")}},model:{value:e.cityCode,callback:function(t){e.cityCode=t},expression:"cityCode"}},e._l(e.city,function(e){return o("el-option",{key:e.cityCode,attrs:{label:e.name,value:e.cityCode}})})),e._v(" "),o("el-select",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请选择所在县"},model:{value:e.countyCode,callback:function(t){e.countyCode=t},expression:"countyCode"}},e._l(e.county,function(e){return o("el-option",{key:e.cityCode,attrs:{label:e.name,value:e.cityCode}})})),e._v(" "),o("el-input",{staticStyle:{"margin-top":"20px"},attrs:{type:"textarea",placeholder:"请输入详细地址"},model:{value:e.form.address,callback:function(t){e.form.address=t},expression:"form.address"}})],1),e._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary "},on:{click:e.editInfo}},[e._v("更新")]),e._v(" "),o("el-button",{on:{click:e.getInfo}},[e._v("取消")])],1)],1)],1)])},staticRenderFns:[]}},658:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{form:{username:void 0,nickname:void 0,email:void 0,qq:void 0,phone_number:void 0,created_at:void 0,updated_at:void 0},oldData:{phone_number:void 0,qq:void 0,nickname:void 0},province:[],city:[],county:[],provinceCode:"",cityCode:"",countyCode:""}},mounted:function(){this.getInfo(),this.getRegion("province")},methods:{getInfo:function(){var e=this.form,t=this.oldData;this.$api.getInfo().then(function(o){for(var n in e)e.hasOwnProperty(n)&&(e[n]=o.data[n]);for(var i in t)t.hasOwnProperty(i)&&(t[i]=o.data[i])})},editInfo:function(){var e=this;if(this.form.nickname.length<5)return void this.$alert("用户名必须大于五个字符","提示",{confirmButtonText:"我知道了"});var t={};this.form.qq&&this.form.qq.length>0&&this.form.qq!=this.oldData.qq&&(t.qq=parseInt(this.form.qq)),this.form.nickname!=this.oldData.nickname&&(t.nickname=this.form.nickname),this.form.phone_number!=this.oldData.phone_number&&(t.phone_number=this.form.phone_number),this.$api.editInfo(t).then(function(t){200==t.state?(e.$message.success("更新商户资料成功！"),e.getInfo()):e.$message.error("更新商户资料失败！")})},getRegion:function(e){var t,o=this;"province"==e?t=null:"city"==e?(t=this.provinceCode,this.city=[],this.cityCode="",this.county=[],this.countyCode=""):"county"==e&&(t=this.cityCode,this.county=[],this.countyCode=""),this.$api.getRegion({cityCode:t}).then(function(t){o[e]=t.data})}}}}});