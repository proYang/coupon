webpackJsonp([10],{1013:function(t,a,e){var n=e(951);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e(483)("3ab6aa29",n,!0)},1019:function(t,a,e){e(192),e(1021),t.exports=e(37).Array.from},1020:function(t,a,e){"use strict";var n=e(63),r=e(124);t.exports=function(t,a,e){a in t?n.f(t,a,r(0,e)):t[a]=e}},1021:function(t,a,e){"use strict";var n=e(62),r=e(80),o=e(126),i=e(189),l=e(188),s=e(125),u=e(1020),c=e(191);r(r.S+r.F*!e(190)(function(t){Array.from(t)}),"Array",{from:function(t){var a,e,r,p,d=o(t),f="function"==typeof this?this:Array,m=arguments.length,_=m>1?arguments[1]:void 0,v=void 0!==_,b=0,g=c(d);if(v&&(_=n(_,m>2?arguments[2]:void 0,2)),void 0==g||f==Array&&l(g))for(a=s(d.length),e=new f(a);a>b;b++)u(e,b,v?_(d[b],b):d[b]);else for(p=g.call(d),e=new f;!(r=p.next()).done;b++)u(e,b,v?i(p,_,[r.value,b],!0):r.value);return e.length=b,e}})},1023:function(t,a,e){t.exports={default:e(1019),__esModule:!0}},1024:function(t,a,e){"use strict";a.__esModule=!0;var n=e(1023),r=function(t){return t&&t.__esModule?t:{default:t}}(n);a.default=function(t){if(Array.isArray(t)){for(var a=0,e=Array(t.length);a<t.length;a++)e[a]=t[a];return e}return(0,r.default)(t)}},1040:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e(1024),r=function(t){return t&&t.__esModule?t:{default:t}}(n),o=window;a.default={data:function(){return{params:{shop_id:void 0,page:1,size:10},totalPage:1,tableData:[]}},methods:{fetchData:function(){var t=this,a=JSON.parse(o.localStorage.getItem("shop_info"));this.params.shop_id=a.id,t.$api.distributeRecords(this.params).then(function(a){t.tableData=a.data,t.tableData.forEach(function(t){var a=[].concat((0,r.default)(t)),e=0;a.forEach(function(t){e+=t.distribute_num}),t.totalNum=e}),t.totalPage=a.totalPage})},changePage:function(t){this.params.page=t,this.getCouponList()}},mounted:function(){this.fetchData()}}},500:function(t,a,e){e(1013);var n=e(185)(e(1040),e(990),"data-v-b10e3878",null);t.exports=n.exports},951:function(t,a,e){a=t.exports=e(482)(),a.push([t.i,".title[data-v-b10e3878]{margin:20px}.page[data-v-b10e3878]{margin:40px;text-align:center}.demo-table-expand[data-v-b10e3878]{margin:20px 60px;font-size:0}.demo-table-expand label[data-v-b10e3878]{width:90px;color:#99a9bf}.demo-table-expand .el-form-item[data-v-b10e3878]{margin-right:0;margin-bottom:0;width:50%}",""])},990:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("h1",{staticClass:"title demonstration"},[t._v("投放记录")]),t._v(" "),e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[e("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[e("el-form-item",{attrs:{label:"方案名称："}},[e("span",[t._v(t._s(a.row.name))])]),t._v(" "),t._l(a.row.coupons,function(a,n){return e("el-form-item",{key:a.discount_coupon.display_name+"：",attrs:{label:a.discount_coupon.display_name+"："}},[e("span",[t._v(t._s(a.distribute_num)+"张")])])}),t._v(" "),e("el-form-item",{attrs:{label:"投放总数："}},[e("span",[t._v(t._s(a.row.totalNum)+"张")])]),t._v(" "),e("el-form-item",{attrs:{label:"投放时间："}},[e("span",[t._v(t._s(a.row.created_at))])]),t._v(" "),e("el-form-item",{attrs:{label:"备注："}},[e("span",[t._v(t._s(a.row.description))])])],2)]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"方案名称",prop:"name"}}),t._v(" "),e("el-table-column",{attrs:{label:"投放时间",prop:"created_at"}}),t._v(" "),e("el-table-column",{attrs:{label:"投放总数",prop:"totalNum"}})],1),t._v(" "),e("div",{staticClass:"block"},[e("el-pagination",{staticClass:"page",attrs:{layout:"prev, pager, next","page-count":t.totalPage,"page-size":t.params.size,"current-page":t.params.page},on:{"current-change":t.changePage}})],1)],1)},staticRenderFns:[]}}});