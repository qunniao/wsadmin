(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5361e24c"],{"0721":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"header"},[a("p",[e._v("云库存")]),a("el-button",{attrs:{type:"primary"}},[e._v("新增代理库存")])],1),a("div",{staticClass:"filter"},[a("el-form",{staticClass:"fl-l",attrs:{inline:""}},[a("el-form-item",{attrs:{label:"个人信息"}},[a("el-col",{attrs:{span:24}},[a("el-input",{attrs:{placeholder:"请输入名称或者电话"},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}})],1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"}},[e._v("查找")])],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.changeshow}},[e._v("展开")])],1),e.searchshow?a("div",[a("el-form-item",{attrs:{label:"代理等级"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择等级"},model:{value:e.shopClassification,callback:function(t){e.shopClassification=t},expression:"shopClassification"}},[a("el-option",{attrs:{value:1,label:"普通"}}),a("el-option",{attrs:{value:0,label:"会员"}})],1)],1),a("el-form-item",{attrs:{label:"归属类型"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择归属类型"},model:{value:e.ommodityType,callback:function(t){e.ommodityType=t},expression:"ommodityType"}},[a("el-option",{attrs:{value:1,label:"电商"}}),a("el-option",{attrs:{value:0,label:"app"}})],1)],1),a("el-form-item",{attrs:{label:"代理状态"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择状态"},model:{value:e.ommodityType,callback:function(t){e.ommodityType=t},expression:"ommodityType"}},[a("el-option",{attrs:{value:1,label:"电商"}}),a("el-option",{attrs:{value:0,label:"app"}})],1)],1),a("el-form-item",{attrs:{label:"团队信息"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择团队信息"},model:{value:e.ommodityType,callback:function(t){e.ommodityType=t},expression:"ommodityType"}},[a("el-option",{attrs:{value:1,label:"电商"}}),a("el-option",{attrs:{value:0,label:"app"}})],1)],1)],1):e._e(),a("div",{staticStyle:{"margin-bottom":"10px"}},e._l(e.shoptypelist,function(t){return a("el-tag",{key:t.val,class:{active:t.val==e.shoptype}},[e._v(e._s(t.name))])}))],1)],1),a("div",{staticClass:"table_body"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",size:"medium "}},[a("el-table-column",{attrs:{prop:"departmentName",label:"商品信息","min-width":"180"}}),a("el-table-column",{attrs:{prop:"peopleNum",label:"总库存","min-width":"180"}}),a("el-table-column",{attrs:{prop:"subordinateDepartment",label:"可用库存","min-width":"180"}}),a("el-table-column",{attrs:{prop:"subordinateDepartment",label:"锁定库存","min-width":"180"}}),a("el-table-column",{attrs:{prop:"subordinateDepartment",label:"超额库存","min-width":"180"}}),a("el-table-column",{attrs:{label:"操作","min-width":"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"primary",plain:""}},[e._v("修改")]),t.row.subordinateDepartment.length>0?a("el-button",{attrs:{disabled:"",size:"mini",type:"danger",plain:""}},[e._v("删除")]):a("el-button",{attrs:{size:"mini",type:"danger",plain:""}},[e._v("删除")])]}}])})],1),a("div",{staticClass:"table-footer--APP",attrs:{slot:"append"},slot:"append"},[a("el-pagination",{attrs:{"current-page":e.form.page,"page-sizes":[10,20,30,40,50,60,70,80,90],"page-size":e.form.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)])},o=[],i={name:"prodList",data:function(){return{form:{limit:10,page:1,filters:""},shoptypelist:[{name:"出售中",val:"1"},{name:"已经下架",val:"2"},{name:"库存预警",val:"3"}],shoptype:1,shopClassification:"",ommodityType:"",searchshow:!1,keyword:"",tableData:[],totalCount:0,tableLoading:!1,modalAddDepShow:!1,isEdit:!1,depId:0,secondDepShow:!1}},components:{},methods:{handleSizeChange:function(e){this.form.limit=e,this.getFirstDepList()},changeshow:function(){console.log(123),this.searchshow=!this.searchshow},handleCurrentChange:function(e){this.form.page=e,this.getFirstDepList()}}},s=i,n=(a("9d31"),a("2877")),r=Object(n["a"])(s,l,o,!1,null,"3083e2ec",null);r.options.__file="agencyInventoryindex.vue";t["default"]=r.exports},6831:function(e,t,a){},"9d31":function(e,t,a){"use strict";var l=a("6831"),o=a.n(l);o.a}}]);