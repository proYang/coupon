webpackJsonp([18],{1005:function(e,r,t){var a=t(944);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t(483)("0f391c54",a,!0)},1036:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default={data:function(){return{ruleForm:{name:"",couponType:void 0,rebate:void 0,condition:"",number:0,date1:"",date2:"",desc:""},rules:{name:[{required:!0,message:"请输入活动名称",trigger:"blur"},{min:3,max:5,message:"长度在 3 到 5 个字符",trigger:"blur"}],region:[{required:!0,message:"请选择活动区域",trigger:"change"}],date1:[{type:"date",required:!0,message:"请选择日期",trigger:"change"}],date2:[{type:"date",required:!0,message:"请选择时间",trigger:"change"}],type:[{type:"array",required:!0,message:"请至少选择一个活动性质",trigger:"change"}],resource:[{required:!0,message:"请选择活动资源",trigger:"change"}],desc:[{required:!0,message:"请填写活动形式",trigger:"blur"}]},pickerOtherOption:{editable:!1,clearable:!1},pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var r=new Date,t=new Date;t.setTime(t.getTime()-6048e5),e.$emit("pick",[t,r])}},{text:"最近一个月",onClick:function(e){var r=new Date,t=new Date;t.setTime(t.getTime()-2592e6),e.$emit("pick",[t,r])}},{text:"最近三个月",onClick:function(e){var r=new Date,t=new Date;t.setTime(t.getTime()-7776e6),e.$emit("pick",[t,r])}},{text:"最近一年",onClick:function(e){var r=new Date,t=new Date;t.setTime(t.getTime()-31536e6),e.$emit("pick",[t,r])}}],disabledDate:function(e){return e.getTime()>Date.now()}},times:[(new Date).getTime()-432e8,new Date]}},methods:{submitForm:function(e){this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;alert("submit!")})},resetForm:function(e){this.$refs[e].resetFields()}}}},497:function(e,r,t){t(1005);var a=t(185)(t(1036),t(982),"data-v-710c4da9",null);e.exports=a.exports},944:function(e,r,t){r=e.exports=t(482)(),r.push([e.i,".coupon-form[data-v-710c4da9]{width:600px;height:auto}",""])},982:function(e,r){e.exports={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[t("div",{staticClass:"plugins-tips"},[e._v("添加优惠券")]),e._v(" "),t("div",{staticClass:"coupon-form"},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"优惠券名称",prop:"name"}},[t("el-input",{model:{value:e.ruleForm.name,callback:function(r){e.ruleForm.name=r},expression:"ruleForm.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"优惠券类型",prop:"region"}},[t("el-select",{attrs:{placeholder:"请选择优惠券类型"},model:{value:e.ruleForm.couponType,callback:function(r){e.ruleForm.couponType=r},expression:"ruleForm.couponType"}},[t("el-option",{attrs:{label:"折扣券",value:"1"}}),e._v(" "),t("el-option",{attrs:{label:"满减券",value:"2"}})],1)],1),e._v(" "),"1"==e.ruleForm.couponType?t("el-form-item",{attrs:{label:"折扣率",prop:"rebate"}},[t("el-input",{model:{value:e.ruleForm.rebate,callback:function(r){e.ruleForm.rebate=r},expression:"ruleForm.rebate"}})],1):e._e(),e._v(" "),t("el-form-item",{attrs:{label:"限定条件",prop:"region"}},[t("el-select",{attrs:{placeholder:"请选择领券限定条件"},model:{value:e.ruleForm.condition,callback:function(r){e.ruleForm.condition=r},expression:"ruleForm.condition"}},[t("el-option",{attrs:{label:"期间每人领取1张",value:"shanghai"}}),e._v(" "),t("el-option",{attrs:{label:"期间每人每天领取1张",value:"beijing"}})],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"发放数量",prop:"number",rules:[{required:!0,message:"数量不能为空"},{type:"number",message:"数量必须为数字值"}]}},[t("el-input",{attrs:{type:"number","auto-complete":"off"},model:{value:e.ruleForm.number,callback:function(r){e.ruleForm.number=e._n(r)},expression:"ruleForm.number"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"领取时间",required:""}},[t("el-form-item",{attrs:{prop:"date2"}},[t("el-date-picker",{attrs:{type:"daterange",clearable:e.pickerOtherOption.clearable,editable:e.pickerOtherOption.editable,"picker-options":e.pickerOptions,placeholder:"选择领取时间范围",align:"left"},on:{change:e.pickTime},model:{value:e.ruleForm.date1,callback:function(r){e.ruleForm.date1=r},expression:"ruleForm.date1"}})],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"使用时间",required:""}},[t("el-form-item",{attrs:{prop:"date1"}},[t("el-date-picker",{attrs:{type:"daterange",clearable:e.pickerOtherOption.clearable,editable:e.pickerOtherOption.editable,"picker-options":e.pickerOptions,placeholder:"选择使用时间范围",align:"left"},on:{change:e.pickTime},model:{value:e.ruleForm.date2,callback:function(r){e.ruleForm.date2=r},expression:"ruleForm.date2"}})],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"备注",prop:"desc"}},[t("el-input",{attrs:{type:"textarea"},model:{value:e.ruleForm.desc,callback:function(r){e.ruleForm.desc=r},expression:"ruleForm.desc"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(r){e.submitForm("ruleForm")}}},[e._v("立即添加")]),e._v(" "),t("el-button",{on:{click:function(r){e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)],1)])},staticRenderFns:[]}}});