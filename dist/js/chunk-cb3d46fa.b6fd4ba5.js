(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cb3d46fa"],{"2f21":function(e,t,a){"use strict";var o=a("79e5");e.exports=function(e,t){return!!e&&o(function(){t?e.call(null,function(){},1):e.call(null)})}},"55dd":function(e,t,a){"use strict";var o=a("5ca1"),r=a("d8e8"),l=a("4bf8"),i=a("79e5"),s=[].sort,n=[1,2,3];o(o.P+o.F*(i(function(){n.sort(void 0)})||!i(function(){n.sort(null)})||!a("2f21")(s)),"Array",{sort:function(e){return void 0===e?s.call(l(this)):s.call(l(this),r(e))}})},5962:function(e,t,a){"use strict";var o=a("b60e"),r=a.n(o);r.a},b60e:function(e,t,a){},bfec:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mod-prod-info"},[a("el-form",{ref:"dataForm",attrs:{model:e.dataForm,"label-width":"150px"}},[a("el-form-item",{attrs:{label:"设置级别"}},[a("el-radio",{attrs:{label:"1"},model:{value:e.level,callback:function(t){e.level=t},expression:"level"}},[e._v("一级")]),a("el-radio",{attrs:{label:"2"},model:{value:e.level,callback:function(t){e.level=t},expression:"level"}},[e._v("二级")])],1),1==e.level?a("el-form-item",{attrs:{label:"一级分类名称:",prop:"typeName",rules:[{required:!0,message:"一级分类名称不能为空"}]}},[a("el-col",{attrs:{span:8}},[a("el-input",{attrs:{placeholder:"请输入",maxlength:"50"},model:{value:e.dataForm.typeName,callback:function(t){e.$set(e.dataForm,"typeName",t)},expression:"dataForm.typeName"}})],1)],1):e._e(),2==e.level?a("div",[a("el-form-item",{staticStyle:{"margin-top":"10px"},attrs:{label:"上级分类："}},[a("el-select",{attrs:{placeholder:"请选择",rules:[{required:!0,message:"上级分类不能为空"}]},model:{value:e.dataForm.pid,callback:function(t){e.$set(e.dataForm,"pid",t)},expression:"dataForm.pid"}},e._l(e.onetypeidlist,function(e){return a("el-option",{key:e.tid,attrs:{label:e.typeName,value:e.tid}})}))],1),a("el-form-item",{attrs:{label:"二级分类名称:",prop:"typeName",rules:[{required:!0,message:"二级分类名称"}]}},[a("el-col",{attrs:{span:8}},[a("el-input",{attrs:{placeholder:"请输入",maxlength:"50"},model:{value:e.dataForm.typeName,callback:function(t){e.$set(e.dataForm,"typeName",t)},expression:"dataForm.typeName"}})],1)],1)],1):e._e(),a("el-form-item",{staticStyle:{"margin-top":"10px"},attrs:{label:"关联属性组："}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.dataForm.pgId,callback:function(t){e.$set(e.dataForm,"pgId",t)},expression:"dataForm.pgId"}},e._l(e.pgIdList,function(e){return a("el-option",{key:e.pgId,attrs:{label:e.title,value:e.pgId}})}))],1),a("el-form-item",{attrs:{label:"排序:",prop:"sort"}},[a("el-col",{attrs:{span:8}},[a("el-input",{attrs:{placeholder:"请输入",maxlength:"50"},model:{value:e.dataForm.sort,callback:function(t){e.$set(e.dataForm,"sort",t)},expression:"dataForm.sort"}})],1)],1),a("el-form-item",{attrs:{label:"上传图片:"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://admin.zhanchengwlkj.com:8080/derivative_system_backstage/file/addFile","show-file-list":!1,name:"files","on-success":e.uploadImg,"before-upload":e.beforeAvatarUpload}},[e.imageShowUrl?a("img",{staticClass:"avatar",attrs:{src:e.imageShowUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dataFormSubmit()}}},[e._v("确定")])],1)],1)],1)},r=[],l=(a("55dd"),a("89f8")),i={name:"editor",data:function(){return{level:"1",typeSearch:[],pgIdList:[],onetypeidlist:[],dataForm:{pgId:"",pid:"",typeName:"",sort:"",cover:""},changeType:2,imageShowUrl:""}},components:{},props:{prodtypeId:{required:!0},prodtypeLevel:{required:!0},prodchangeType:{required:!0}},computed:{defalutSku:function(){return this.$store.state.prod.defalutSku}},activated:function(){this.dataForm.prodId=this.$route.query.prodId,this.getDataList()},methods:{uploadImg:function(e){this.dataForm.cover=e.data,this.imageShowUrl=e.data},beforeAvatarUpload:function(e){var t="image/jpeg"===e.type||"image/png"===e.type,a=e.size/1024/1024<2;return t||this.$message.error("上传头像图片只能是 JPG或者PNG 格式!"),a||this.$message.error("上传头像图片大小不能超过 2MB!"),t&&a},dataFormSubmit:function(){var e=this;this.$refs["dataForm"].validate(function(t){var a={pgId:e.dataForm.pgId,pid:e.dataForm.pid,typeName:e.dataForm.typeName,sort:e.dataForm.sort,cover:e.dataForm.cover};1==e.level&&(a.pid=0),1==e.changeType?Object(l["b"])(a).then(function(t){var a=t.data;200===a.code?(e.$message({type:"success",message:"添加分类成功"}),e.backhtmls(),e.$emit("finish-action")):e.$message.error(t.data.msg)}).catch(function(e){}):(a.tid=e.dataForm.tid,Object(l["a"])(a).then(function(t){var a=t.data;200===a.code?(e.$message({type:"success",message:"修改分类成功"}),e.backhtmls(),e.$emit("finish-action")):e.$message.error(t.data.msg)}).catch(function(e){}))})},getoneTypeList:function(e){var t=this;Object(l["f"])().then(function(a){t.onetypeidlist=a.data.data.records,0!=e&&(t.dataForm.pid=e)}).catch(function(e){t.tableLoading=!1})},getProdTypeDetail:function(e){var t=this,a=e;Object(l["e"])(a).then(function(e){var a=e.data.data;console.log(a),0!=a.pid?(t.level="2",t.getoneTypeList(a.pid,1)):t.getoneTypeList(a.tid,0),t.dataForm=a,t.imageShowUrl=a.cover}).catch(function(e){t.tableLoading=!1})},getParamGroups:function(e){var t=this,a={size:100,current:1};Object(l["d"])(a).then(function(a){var o=a.data.data;t.pgIdList=o.records,2==e?(console.log(t.prodtypeId),t.getProdTypeDetail(t.prodtypeId)):t.getoneTypeList(0,1)}).catch(function(e){t.tableLoading=!1})},errorMsg:function(e){this.$message({message:e,type:"error",duration:1500})},backhtmls:function(){this.$emit("close-form")}},mounted:function(){1==this.prodchangeType?(this.changeType=1,this.dataForm.pid="",this.getParamGroups(1)):this.getParamGroups(2)}},s=i,n=(a("5962"),a("2877")),d=Object(n["a"])(s,o,r,!1,null,"87daa6e2",null);d.options.__file="prodtypeInfo.vue";t["default"]=d.exports}}]);