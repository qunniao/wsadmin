(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-741e3cae"],{"5be9":function(t,e,n){"use strict";n.d(e,"d",function(){return o}),n.d(e,"c",function(){return r}),n.d(e,"b",function(){return i}),n.d(e,"a",function(){return s});var a=n("5bf4"),o=function(t){return Object(a["a"])({url:"/remits/list",method:"get",headers:{token:localStorage.getItem("token")},params:t})},r=function(t){return Object(a["a"])({url:"/remits/info/"+t,method:"get",headers:{token:localStorage.getItem("token")}})},i=function(t){return Object(a["a"])({url:"/remits/ratifyVoucher",method:"post",headers:{token:localStorage.getItem("token")},data:t})},s=function(t){return Object(a["a"])({url:"/remits/rejectVoucher",method:"post",headers:{token:localStorage.getItem("token")},data:t})}},8211:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"header"},[n("el-button",{attrs:{type:"primary"}},[t._v("导出")])],1),n("div",{staticClass:"filter"},[n("el-form",{staticClass:"fl-l",attrs:{inline:""}},[n("el-form-item",{attrs:{label:"订单号:"}},[n("el-col",{attrs:{span:24}},[n("el-input",{attrs:{placeholder:"请输入订单号"},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1)],1),n("el-form-item",[n("el-button",{attrs:{type:"primary"}},[t._v("查找")])],1),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:t.changeshow}},[t._v("展开")])],1),t.searchshow?n("div",[n("el-form-item",{attrs:{label:"打款单号"}},[n("el-input",{attrs:{placeholder:"请输入商品名称或者货号"},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1)],1):t._e(),n("div",{staticStyle:{"margin-bottom":"10px"}},t._l(t.shoptypelist,function(e){return n("el-tag",{key:e.val,class:{active:e.val==t.form.statusType},on:{click:function(n){t.changesearchtype(e.val)}}},[t._v(t._s(e.name)+t._s(""!=e.nownum?e.nownum:"0"))])}))],1)],1),n("div",{staticClass:"table_body"},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",size:"medium "}},[n("el-table-column",{attrs:{prop:"orderType",label:"订单类型","min-width":"360"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(t.orderTypelist[e.row.orderType])+"\n                ")]}}])}),n("el-table-column",{attrs:{prop:"remitNumber",label:"打款单号/订单号","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",[t._v(t._s(e.row.remitNumber))]),n("div",[t._v(t._s(e.row.orderNumber))])]}}])}),n("el-table-column",{attrs:{prop:"remitterName",label:"打款人","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",[t._v(t._s(e.row.remitterName))]),n("div",[t._v(t._s(e.row.remitterPhone))])]}}])}),n("el-table-column",{attrs:{prop:"amount",label:"打款金额","min-width":"180"}}),n("el-table-column",{attrs:{prop:"remitAccount",label:"打款账户","min-width":"180"}}),n("el-table-column",{attrs:{prop:"payeeAccount",label:"收款账户","min-width":"180"}}),n("el-table-column",{attrs:{prop:"reviewState",label:"状态","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(t.reviewStateList[e.row.reviewState])+"\n                ")]}}])}),n("el-table-column",{attrs:{prop:"gmtCreate",label:"提交时间 ","min-width":"180"}}),n("el-table-column",{attrs:{label:"操作","min-width":"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.reviewState?n("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(n){t.paymentAuditIsOk(e.row.id,1)}}},[t._v("通过")]):t._e(),n("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(n){t.handleChangePatmentDetail(e.row.id)}}},[t._v("查看凭证")])]}}])})],1),n("div",{staticClass:"table-footer--APP",attrs:{slot:"append"},slot:"append"},[n("el-pagination",{attrs:{"current-page":t.form.page,"page-sizes":[10,20,30,40,50,60,70,80,90],"page-size":t.form.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),n("el-dialog",{attrs:{title:"审核打款凭证","append-to-body":!0,visible:t.secondDepShow,width:"60%"},on:{"update:visible":function(e){t.secondDepShow=e}}},[t.secondDepShow?n("second-index",{attrs:{"payment-id":t.paymentId},on:{"finish-action":t.getStockList,"close-form":function(e){t.secondDepShow=!1}}}):t._e()],1)],1)])},o=[],r=n("c93e"),i=n("5be9"),s=function(){return n.e("chunk-4873bfbd").then(n.bind(null,"30f8"))},l={name:"prodList",data:function(){return{form:{current:1,size:10},paymentId:"",secondDepShow:!1,orderTypelist:{1:"采购订单",2:"零售订单",3:"提货订单",4:"内购订单",5:"换货订单"},reviewStateList:{0:"待审核",1:"审核通过",2:"已拒绝"},shoptypelist:[{name:"全部",val:"1",nownum:""},{name:"待总部审核",val:"2",nownum:""},{name:"待代理审核",val:"3",nownum:""},{name:"已付款",val:"4",nownum:""},{name:"已失效",val:"5",nownum:""}],shoptype:1,searchshow:!1,keyword:"",tableData:[],totalCount:0,tableLoading:!1}},components:{SecondIndex:s},methods:{handleSizeChange:function(t){this.form.size=t,this.getStockList()},paymentAuditIsOk:function(t,e){var n=this,a={id:t,reviewState:e,auditorType:1};console.log(a),1==e?Object(i["b"])(a).then(function(t){var e=t.data;200==e.code?(n.$message({type:"success",message:"通过审核成功"}),n.$emit("close-form"),n.$emit("finish-action")):n.errorMsg(e.message)}).catch(function(t){n.tableLoading=!1}):Object(i["a"])(a).then(function(t){var e=t.data;200==e.code?(n.$message({type:"success",message:"驳回审核成功"}),n.$emit("close-form"),n.$emit("finish-action")):n.errorMsg(e.message)}).catch(function(t){n.tableLoading=!1}),console.log(a)},handleChangePatmentDetail:function(t){console.log(t),this.paymentId=t,this.secondDepShow=!0},changeshow:function(){console.log(123),this.searchshow=!this.searchshow},handleCurrentChange:function(t){this.form.current=t,this.getStockList()},getStockList:function(){var t=this,e=Object(r["a"])({},this.form);this.tableLoading=!0,Object(i["d"])(e).then(function(e){var n=e.data.data;t.totalCount=n.totalCount,t.tableData=n.records,t.tableLoading=!1}).catch(function(e){t.tableLoading=!1})}},created:function(){this.getStockList()}},c=l,u=(n("abc8"),n("2877")),d=Object(u["a"])(c,a,o,!1,null,"079a975a",null);d.options.__file="paymentAuditIndex.vue";e["default"]=d.exports},"89f5":function(t,e,n){},abc8:function(t,e,n){"use strict";var a=n("89f5"),o=n.n(a);o.a}}]);