(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dd3fa3ba"],{"068f":function(e,t,a){"use strict";var l=a("532e"),n=a.n(l);n.a},"532e":function(e,t,a){},acbc:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"header"},[a("el-button",{attrs:{type:"primary"}},[e._v("导出")])],1),a("div",{staticClass:"filter"},[a("el-form",{staticClass:"fl-l",attrs:{inline:""}},[a("el-form-item",{attrs:{label:"商品信息信息"}},[a("el-col",{attrs:{span:24}},[a("el-input",{attrs:{placeholder:"请输入商品名称或者货号"},model:{value:e.form.search,callback:function(t){e.$set(e.form,"search",t)},expression:"form.search"}})],1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.getStockRecordList}},[e._v("查找")])],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.changeshow}},[e._v("展开")])],1),e.searchshow?a("div",[a("el-form-item",{attrs:{label:"变更项"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.form.changeType,callback:function(t){e.$set(e.form,"changeType",t)},expression:"form.changeType"}},e._l(e.statusSettleList,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})}))],1),a("el-form-item",{attrs:{label:"选择日期"}},[a("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.value1,callback:function(t){e.value1=t},expression:"value1"}})],1),a("el-form-item",{attrs:{label:"订单类型"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择归属类型"},model:{value:e.form.orderType,callback:function(t){e.$set(e.form,"orderType",t)},expression:"form.orderType"}},e._l(e.ordertypeslist,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})}))],1)],1):e._e()],1)],1),a("div",{staticClass:"table_body"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",size:"medium "}},[a("el-table-column",{attrs:{prop:"productName",label:"商品信息","min-width":"360"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("img",{staticClass:"prod-img",attrs:{src:t.row.cover}}),a("div",{staticClass:"prod-detail",attrs:{span:6}},[a("div",[e._v(e._s(t.row.productName))])])]}}])}),a("el-table-column",{attrs:{prop:"type",label:"变更项","min-width":"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                "+e._s(e.statusSettle[t.row.type])+"\n            ")]}}])}),a("el-table-column",{attrs:{prop:"num",label:"变更库存","min-width":"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                "+e._s(e.changetypelist[t.row.changeType])+e._s(t.row.num)+"\n            ")]}}])}),a("el-table-column",{attrs:{prop:"stock",label:"当前库存数","min-width":"180"}}),a("el-table-column",{attrs:{prop:"orderType",label:"订单类型","min-width":"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                "+e._s(e.orderTypelist[t.row.orderType])+"\n            ")]}}])}),a("el-table-column",{attrs:{prop:"gmtCreate",label:"时间","min-width":"180"}}),a("el-table-column",{attrs:{prop:"intro",label:"说明","min-width":"180"}}),a("el-table-column",{attrs:{label:"操作","min-width":"300"}},[[a("el-button",{attrs:{size:"mini",type:"primary",plain:""}},[e._v("详情规格")])]],2)],1),a("div",{staticClass:"table-footer--APP",attrs:{slot:"append"},slot:"append"},[a("el-pagination",{attrs:{"current-page":e.form.page,"page-sizes":[10,20,30,40,50,60,70,80,90],"page-size":e.form.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)])},n=[],o=a("c93e"),r=a("5bf4"),s=function(e){return Object(r["a"])({url:"/stockHistory/page",method:"get",headers:{token:localStorage.getItem("token")},params:e})},i={name:"prodList",data:function(){return{form:{size:10,current:1,search:""},value1:[,],ordertypeslist:[{value:1,name:"采购"},{value:2,name:"零售"},{value:3,name:"提货"},{value:4,name:"换货"}],statusSettleList:[{value:1,name:"采购实体库存"},{value:2,name:"零售发货"},{value:3,name:"给下级发货"},{value:4,name:"云库存提货"},{value:5,name:"总部调整"},{value:6,name:"代理调整"},{value:7,name:"提货发货"},{value:8,name:"转采购发货"},{value:9,name:"云库存代发"},{value:10,name:"采购实体库存"},{value:11,name:"手动调整"},{value:12,name:"划拨"},{value:13,name:"实体商品换货"},{value:14,name:"云库存换货"},{value:15,name:"零售出库"}],statusSettle:{1:"采购实体库存",2:"零售发货",3:"给下级发货",4:"云库存提货",5:"总部调整",6:"代理调整",7:"提货发货",8:"转采购发货",9:"云库存代发",10:"手动调整",11:"划拨",12:"实体商品换货",13:"云库存换货",14:"零售出库"},changetypelist:{1:"+",2:"-"},orderTypelist:{1:"采购",2:"零售",3:"提货",4:"换货"},shopClassification:"",ommodityType:"",searchshow:!1,keyword:"",tableData:[],totalCount:0,tableLoading:!1}},components:{},methods:{handleSizeChange:function(e){this.form.size=e,this.getStockRecordList()},changeshow:function(){console.log(123),this.searchshow=!this.searchshow},handleCurrentChange:function(e){this.form.current=e,this.getStockRecordList()},handleChangeSkuStock:function(e){this.prodId=e,this.oneDepShow=!0},handleChangeStock:function(e,t){this.prodId=e,this.prodNum=t,this.secondDepShow=!0},handleChangeAllSkuStock:function(e){this.prodId=e,this.threeDepShow=!0},getStockRecordList:function(){var e=this,t=Object(o["a"])({},this.form);""!=this.value1[0]&&void 0!=this.value1[0]&&null!=this.value1[0]&&(t.endTime=timeStamp2String(this.value1[1],2),t.startTime=timeStamp2String(this.value1[0],2)),this.tableLoading=!0,s(t).then(function(t){var a=t.data.data;console.log(a.records),e.totalCount=a.total,e.tableData=a.records,e.tableLoading=!1}).catch(function(t){e.tableLoading=!1})}},created:function(){this.getStockRecordList()}},c=i,u=(a("068f"),a("2877")),d=Object(u["a"])(c,l,n,!1,null,"1f72275a",null);d.options.__file="stockRecordindex.vue";t["default"]=d.exports}}]);