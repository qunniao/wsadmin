(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c370226e"],{"2adc":function(t,e,n){"use strict";var a=n("3cdb"),i=n.n(a);i.a},"3cdb":function(t,e,n){},"4dc8":function(t,e,n){"use strict";n.d(e,"c",function(){return i}),n.d(e,"b",function(){return o}),n.d(e,"d",function(){return r}),n.d(e,"e",function(){return s}),n.d(e,"a",function(){return c});var a=n("5bf4"),i=function(t){return Object(a["a"])({url:"/admins/franchisee/list",method:"get",headers:{token:localStorage.getItem("token")},params:t})},o=function(t){return Object(a["a"])({url:"/admins/info/"+t,method:"get",headers:{token:localStorage.getItem("token")}})},r=function(t){return Object(a["a"])({url:"/admins/save",method:"post",headers:{token:localStorage.getItem("token")},data:t})},s=function(t){return Object(a["a"])({url:"/admins/update",method:"put",headers:{token:localStorage.getItem("token")},data:t})},c=function(t){return Object(a["a"])({url:"/admins/delete",method:"DELETE",headers:{token:localStorage.getItem("token")},params:t})}},"591e":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"header"},[n("p",[t._v("加盟店管理员列表")]),n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.handleAddType(0)}}},[t._v("添加管理员")])],1),n("div",{staticClass:"table_body"},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"row-key":"tid",border:"",size:"medium "}},[n("el-table-column",{attrs:{prop:"trueName",label:"姓名","min-width":"180"}}),n("el-table-column",{attrs:{prop:"nickname",label:"昵称","min-width":"180"}}),n("el-table-column",{attrs:{prop:"cover",label:"头像","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.cover?n("img",{staticClass:"img-upload",attrs:{src:e.row.cover,height:"20",width:"50"},on:{click:function(n){t.hangdleEnlargeImg(e.row.signatureImg)}}}):n("p",[t._v("\n                        -\n                    ")])]}}])}),n("el-table-column",{attrs:{prop:"phone",label:"手机号","min-width":"180"}}),n("el-table-column",{attrs:{prop:"sort",label:"下级加盟店","min-width":"180"}}),n("el-table-column",{attrs:{prop:"sort",label:"奖励积分","min-width":"180"}}),n("el-table-column",{attrs:{prop:"gmtCreate",label:"创建时间","min-width":"180"}}),n("el-table-column",{attrs:{label:"操作","min-width":"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(n){t.handleChange(e.row.uid)}}},[t._v("修改")]),n("el-button",{attrs:{size:"mini",type:"danger",plain:""},on:{click:function(n){t.handleDel(e.row.uid)}}},[t._v("删除")])]}}])})],1),n("div",{staticClass:"table-footer--APP",attrs:{slot:"append"},slot:"append"},[n("el-pagination",{attrs:{"current-page":t.form.current,"page-sizes":[10,20,30,40,50,60,70,80,90],"page-size":t.form.size,layout:"total, sizes, prev, pager, next, jumper",total:t.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1),n("div",[n("el-dialog",{attrs:{title:this.isEdit?"修改管理员":"添加管理员","append-to-body":!0,visible:t.secondDepShow,width:"60%"},on:{"update:visible":function(e){t.secondDepShow=e}}},[t.secondDepShow?n("second-index",{attrs:{"franchise-id":t.franchiseId},on:{"finish-action":t.getFranchiseList,"close-form":function(e){t.secondDepShow=!1}}}):t._e()],1)],1)])},i=[],o=n("c93e"),r=n("4dc8"),s=function(){return n.e("chunk-7ce58a67").then(n.bind(null,"09a3"))},c={name:"prodList",data:function(){return{form:{size:10,current:1},tableData:[],totalCount:0,tableLoading:!1,isEdit:!1,franchiseId:0,secondDepShow:!1}},components:{SecondIndex:s},methods:{getFranchiseList:function(){var t=this,e=Object(o["a"])({},this.form);this.tableLoading=!0,Object(r["c"])(e).then(function(e){var n=e.data.data;console.log(n),t.totalCount=n.length,t.tableData=n}).catch(function(e){t.tableLoading=!1})},handleSizeChange:function(t){this.form.size=t,this.getFranchiseList()},handleCurrentChange:function(t){this.form.current=t,this.getFranchiseList()},handleAddType:function(t){this.franchiseId=t,this.isEdit=!1,this.secondDepShow=!0},handleChange:function(t){this.franchiseId=t,this.isEdit=!1,this.secondDepShow=!0},handleDel:function(t){var e=this,n={uids:t};Object(r["a"])(n).then(function(t){var n=t.data,a="success";200===n.code?e.getFranchiseList():a="error",e.$message({type:a,message:"success"===a?"删除成功！":n.msg})})}},created:function(){this.getFranchiseList()}},l=c,d=(n("2adc"),n("2877")),u=Object(d["a"])(l,a,i,!1,null,"5972dab7",null);u.options.__file="franchisedStoreAdministratorsList.vue";e["default"]=u.exports}}]);