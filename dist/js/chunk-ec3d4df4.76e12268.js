(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ec3d4df4"],{"922b":function(e,t,a){},b167:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"header"},[a("el-button",{attrs:{type:"primary"},on:{click:e.exportExcel}},[e._v("导出")])],1),a("div",{staticClass:"filter"},[a("el-form",{staticClass:"fl-l",attrs:{inline:""}},[a("el-form-item",{attrs:{label:"代理信息:"}},[a("el-col",{attrs:{span:24}},[a("el-input",{attrs:{placeholder:"姓名、手机号、微信昵称搜索"},model:{value:e.form.search,callback:function(t){e.$set(e.form,"search",t)},expression:"form.search"}})],1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.getStockList}},[e._v("查找")])],1),e.searchshow?a("div",[a("el-form-item",{attrs:{label:"代理微信:"}},[a("el-input",{attrs:{placeholder:"代理微信号搜索"},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}})],1),a("el-form-item",{attrs:{label:"代理等级:"}},[a("el-select",{attrs:{clearable:"",placeholder:"全部等级"},model:{value:e.shopClassification,callback:function(t){e.shopClassification=t},expression:"shopClassification"}})],1),a("el-form-item",{attrs:{label:"代理状态:"}},[a("el-select",{attrs:{clearable:"",placeholder:"全部状态"},model:{value:e.shopClassification,callback:function(t){e.shopClassification=t},expression:"shopClassification"}})],1),a("el-form-item",{attrs:{label:"身份证:"}},[a("el-input",{attrs:{placeholder:"请输入身份证"},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}})],1),a("el-form-item",{attrs:{label:"营业执照:"}},[a("el-select",{attrs:{clearable:"",placeholder:"全部状态"},model:{value:e.shopClassification,callback:function(t){e.shopClassification=t},expression:"shopClassification"}})],1),a("el-form-item",{attrs:{label:"加入时间:"}},[a("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.value1,callback:function(t){e.value1=t},expression:"value1"}})],1),a("el-form-item",{attrs:{label:"业绩筛选"}},[a("el-col",{attrs:{span:8}},[a("el-input",{attrs:{placeholder:"输入数字"},model:{value:e.form.minStore,callback:function(t){e.$set(e.form,"minStore",t)},expression:"form.minStore"}})],1),a("el-col",{staticClass:"line",staticStyle:{"text-align":"center"},attrs:{span:2}},[e._v("~")]),a("el-col",{attrs:{span:8}},[a("el-input",{attrs:{placeholder:"输入数字"},model:{value:e.form.maxStore,callback:function(t){e.$set(e.form,"maxStore",t)},expression:"form.maxStore"}})],1)],1),a("el-form-item",{attrs:{label:"代理地区:"}},[a("el-select",{attrs:{clearable:"",placeholder:"全部状态"},model:{value:e.shopClassification,callback:function(t){e.shopClassification=t},expression:"shopClassification"}})],1),a("el-form-item",{attrs:{label:"余额筛选"}},[a("el-col",{attrs:{span:8}},[a("el-input",{attrs:{placeholder:"输入数字"},model:{value:e.form.minStore,callback:function(t){e.$set(e.form,"minStore",t)},expression:"form.minStore"}})],1),a("el-col",{staticClass:"line",staticStyle:{"text-align":"center"},attrs:{span:2}},[e._v("~")]),a("el-col",{attrs:{span:8}},[a("el-input",{attrs:{placeholder:"输入数字"},model:{value:e.form.maxStore,callback:function(t){e.$set(e.form,"maxStore",t)},expression:"form.maxStore"}})],1)],1)],1):e._e()],1)],1),a("div",{staticClass:"table_body"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",id:"exportTab",size:"medium "}},[a("el-table-column",{attrs:{prop:"nickname",label:"个人信息","min-width":"360"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{on:{click:function(a){e.changeagentdetail(t.row.id)}}},[e._v(e._s(t.row.nickname))]),a("div",[e._v(e._s(t.row.phone))]),a("div",[e._v(e._s(t.row.gmtCreate))])]}}])}),a("el-table-column",{attrs:{prop:"agentLevel",label:"等级信息","min-width":"180"}}),a("el-table-column",{attrs:{prop:"nickname",label:"微信昵称","min-width":"180"}}),a("el-table-column",{attrs:{prop:"lockStock",label:"邀请人","min-width":"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[e._v(e._s(t.row.inviterNick))]),a("div",[e._v(e._s(t.row.inviterPhone))])]}}])}),a("el-table-column",{attrs:{prop:"excessStock",label:"上级","min-width":"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[e._v(e._s(t.row.superiorNick))]),a("div",[e._v(e._s(t.row.superiorPhone))])]}}])}),a("el-table-column",{attrs:{prop:"incomeBalance",label:"余额","min-width":"180"}}),a("el-table-column",{attrs:{prop:"excessStock",label:"身份","min-width":"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[e._v(e._s(9==t.row.levelId?"加盟商":8==t.row.levelId?"VIP":"未知"))])]}}])}),a("el-table-column",{attrs:{prop:"reviewed",label:"审核状态","min-width":"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[e._v(e._s(e.reviewedList[t.row.reviewed]))])]}}])}),a("el-table-column",{attrs:{label:"操作","min-width":"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.reviewed?a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(a){e.changeagentye(t.row.id)}}},[e._v("修改余额")]):e._e(),a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(a){e.delangetuser(t.row.id)}}},[e._v("删除")])]}}])})],1),a("div",{staticClass:"table-footer--APP",attrs:{slot:"append"},slot:"append"},[a("el-pagination",{attrs:{"current-page":e.form.current,"page-sizes":[10,20,30,40,50,60,70,80,90],"page-size":e.form.size,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),a("el-dialog",{attrs:{title:"代理详细信息","append-to-body":!0,visible:e.secondDepShow,width:"80%"},on:{"update:visible":function(t){e.secondDepShow=t}}},[e.secondDepShow?a("second-index",{attrs:{"agent-id":e.agentId},on:{"finish-action":e.getStockList,"close-form":function(t){e.secondDepShow=!1}}}):e._e()],1),a("el-dialog",{attrs:{title:"余额详情","append-to-body":!0,visible:e.threeDepShow,width:"80%"},on:{"update:visible":function(t){e.threeDepShow=t}}},[e.threeDepShow?a("three-index",{attrs:{"agent-id":e.agentId},on:{"finish-action":e.getStockList,"close-form":function(t){e.threeDepShow=!1}}}):e._e()],1)],1)])},n=[],l=a("c93e"),r=a("c706"),i=a("21a6"),s=a.n(i),c=a("1146"),d=a.n(c),u=function(){return a.e("chunk-d967388a").then(a.bind(null,"60d3"))},p=function(){return a.e("chunk-e52883e0").then(a.bind(null,"48eb"))},f={name:"prodList",data:function(){return{form:{size:10,current:1,search:""},agentId:"",reviewedList:{1:"审核通过",0:"未通过"},value1:[,],shoptypelist:[{name:"出售中",val:"1",nownum:""},{name:"已下架",val:"2",nownum:""},{name:"库存预警",val:"3",nownum:""}],shoptype:1,shopClassification:"",ommodityType:"",searchshow:!1,keyword:"",tableData:[],totalCount:0,tableLoading:!1,secondDepShow:!1,threeDepShow:!1}},components:{SecondIndex:u,ThreeIndex:p},methods:{handleSizeChange:function(e){this.form.size=e,this.getStockList()},changeshow:function(){console.log(123),this.searchshow=!this.searchshow},delangetuser:function(e){var t=this;this.$confirm("确定要删除该用户么？（此操作不可逆）","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(r["d"])(e).then(function(e){200===e.data.code?(t.$message({type:"success",message:"该用户已经删除"}),t.getStockList()):t.$message.error(e.data.msg)}).catch(function(e){})})},exportExcel:function(){var e={raw:!0},t=d.a.utils.table_to_book(document.querySelector("#exportTab"),e),a=d.a.write(t,{bookType:"xlsx",bookSST:!0,type:"array"});try{s.a.saveAs(new Blob([a],{type:"application/octet-stream"}),"代理信息表.xlsx")}catch(e){"undefined"!==typeof console&&console.log(e,a)}return a},changeagentdetail:function(e){this.secondDepShow=!0,this.agentId=e},changeagentye:function(e){console.log("点击修改"),this.threeDepShow=!0,this.agentId=e},handleCurrentChange:function(e){this.form.current=e,this.getStockList()},getStockList:function(){var e=this,t=Object(l["a"])({},this.form);this.tableLoading=!0,Object(r["f"])(t).then(function(t){var a=t.data.data;e.totalCount=a.total,e.tableData=a.records,e.tableLoading=!1}).catch(function(t){e.tableLoading=!1})}},created:function(){this.getStockList()}},h=f,m=(a("cd3a"),a("2877")),b=Object(m["a"])(h,o,n,!1,null,"6c9da7dc",null);b.options.__file="agentInformationIndex.vue";t["default"]=b.exports},c706:function(e,t,a){"use strict";a.d(t,"f",function(){return n}),a.d(t,"e",function(){return l}),a.d(t,"g",function(){return r}),a.d(t,"a",function(){return i}),a.d(t,"b",function(){return s}),a.d(t,"c",function(){return c}),a.d(t,"d",function(){return d});var o=a("5bf4"),n=function(e){return Object(o["a"])({url:"/agents/infoList",method:"get",headers:{token:localStorage.getItem("token")},params:e})},l=function(e){return Object(o["a"])({url:"/agents/info/"+e,method:"get",headers:{token:localStorage.getItem("token")}})},r=function(e){return Object(o["a"])({url:"/admins/franchisee/list",method:"get",headers:{token:localStorage.getItem("token")}})},i=function(e){return Object(o["a"])({url:"/agents/register/franchisee",method:"post",headers:{token:localStorage.getItem("token")},data:e})},s=function(e){return Object(o["a"])({url:"/agents/update/franchisee",method:"post",headers:{token:localStorage.getItem("token")},data:JSON.stringify(e)})},c=function(e){return Object(o["a"])({url:"/wallet/adjust",method:"post",headers:{token:localStorage.getItem("token")},data:e})},d=function(e){return Object(o["a"])({url:"/agents/delete/"+e,method:"delete",headers:{token:localStorage.getItem("token")}})}},cd3a:function(e,t,a){"use strict";var o=a("922b"),n=a.n(o);n.a}}]);