(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e1e47504"],{"11e9":function(e,t,r){var a=r("52a7"),o=r("4630"),n=r("6821"),i=r("6a99"),c=r("69a8"),s=r("c69a"),u=Object.getOwnPropertyDescriptor;t.f=r("9e1e")?u:function(e,t){if(e=n(e),t=i(t,!0),s)try{return u(e,t)}catch(e){}if(c(e,t))return o(!a.f.call(e,t),e[t])}},"377a":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"mod-prod-info"},[r("el-form",{ref:"dataForm",attrs:{model:e.dataForm,rules:e.rules,"label-width":"150px"}},[r("el-form-item",{attrs:{label:"商品信息:"}},[r("img",{staticClass:"prod-img",attrs:{src:e.cover}}),r("div",{staticClass:"prod-detail",attrs:{span:6}},[r("div",[e._v(e._s(e.prodName))]),r("div",[e._v("分类：")]),r("div",[e._v("规格：")])])]),r("el-form-item",{attrs:{label:"可用库存:"}},[e._v("\n        "+e._s(e.allnum)+"\n    ")]),r("el-form-item",{staticStyle:{"margin-top":"10px"},attrs:{label:"增减方式："}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.dataForm.changeType,callback:function(t){e.$set(e.dataForm,"changeType",t)},expression:"dataForm.changeType"}},e._l(e.Stocktype,function(e){return r("el-option",{key:e.val,attrs:{label:e.title,value:e.val}})}))],1),r("el-form-item",{attrs:{label:"调整数量:",prop:"num"}},[r("el-col",{attrs:{span:8}},[r("el-input",{directives:[{name:"enter-number",rawName:"v-enter-number"}],attrs:{placeholder:"请输入",type:"number"},model:{value:e.dataForm.num,callback:function(t){e.$set(e.dataForm,"num",t)},expression:"dataForm.num"}},[e._v("\n                  >")])],1)],1),r("el-form-item",[r("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请填写备注信息"},model:{value:e.dataForm.remark,callback:function(t){e.$set(e.dataForm,"remark",t)},expression:"dataForm.remark"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dataFormSubmit()}}},[e._v("确定")])],1)],1)],1)},o=[],n=(r("c5f6"),r("8dfa")),i={name:"editor",data:function(){var e=this,t=function(t,r,a){console.log(e.dataForm.num),Number(e.dataForm.num)>Number(e.allnum)&&2==e.dataForm.changeType?a(new Error("调整数目不能大于库存")):a()};return{Stocktype:[{val:1,title:"增加库存"},{val:2,title:"减少库存"}],allnum:"0",prodName:"",cover:"",rules:{num:[{required:!0,message:"不能为空",trigger:["blur","change"]},{required:!0,trigger:"blur",validator:t}]},skuId:"",dataForm:{pid:"",changeType:1,userType:1,operatorId:1,remark:"",num:""}}},components:{},props:{prodId:{required:!0},prodNum:{required:!0},prodSku:{required:!0}},computed:{defalutSku:function(){return this.$store.state.prod.defalutSku}},methods:{dataFormSubmit:function(){var e=this;this.$refs["dataForm"].validate(function(t){if(t){var r=e.dataForm;if(""!=e.skuId){console.log("修改sku库存");var a={pid:r.pid,changeType:r.changeType,remark:r.remark,userType:1,operatorId:1,skuStockDtos:[{skuId:e.skuId,num:Number(r.num)}]};Object(n["b"])(a).then(function(t){var r=t.data;console.log(r),200==r.code?(e.$message({type:"success",message:"修改库存成功"}),e.$emit("close-form"),e.$emit("finish-action")):e.errorMsg(r.message)}).catch(function(t){e.tableLoading=!1})}else r.num=Number(r.num),Object(n["a"])(r).then(function(t){var r=t.data;200==r.code?(e.$message({type:"success",message:"修改库存成功"}),e.$emit("close-form"),e.$emit("finish-action")):errorMsg(r.message)}).catch(function(t){e.tableLoading=!1})}})},getProdDetail:function(e){var t=this;Object(n["c"])(e).then(function(e){var r=e.data.data;t.prodName=r.productName,t.cover=r.cover,console.log(r)}).catch(function(e){t.tableLoading=!1})},errorMsg:function(e){this.$message({message:e,type:"error",duration:1500})},backhtmls:function(){this.$emit("close-form")}},mounted:function(){this.dataForm.pid=this.prodId,this.getProdDetail(this.prodId),this.allnum=this.prodNum,0!=this.prodSku&&(this.skuId=this.prodSku),console.log(this.prodSku),console.log(this.prodNum)}},c=i,s=(r("f21b"),r("2877")),u=Object(s["a"])(c,a,o,!1,null,"755e386c",null);u.options.__file="prodStockInfo.vue";t["default"]=u.exports},"5dbc":function(e,t,r){var a=r("d3f4"),o=r("8b97").set;e.exports=function(e,t,r){var n,i=t.constructor;return i!==r&&"function"==typeof i&&(n=i.prototype)!==r.prototype&&a(n)&&o&&o(e,n),e}},"8b97":function(e,t,r){var a=r("d3f4"),o=r("cb7c"),n=function(e,t){if(o(e),!a(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,a){try{a=r("9b43")(Function.call,r("11e9").f(Object.prototype,"__proto__").set,2),a(e,[]),t=!(e instanceof Array)}catch(e){t=!0}return function(e,r){return n(e,r),t?e.__proto__=r:a(e,r),e}}({},!1):void 0),check:n}},9093:function(e,t,r){var a=r("ce10"),o=r("e11e").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return a(e,o)}},aa77:function(e,t,r){var a=r("5ca1"),o=r("be13"),n=r("79e5"),i=r("fdef"),c="["+i+"]",s="​",u=RegExp("^"+c+c+"*"),l=RegExp(c+c+"*$"),m=function(e,t,r){var o={},c=n(function(){return!!i[e]()||s[e]()!=s}),u=o[e]=c?t(d):i[e];r&&(o[r]=u),a(a.P+a.F*c,"String",o)},d=m.trim=function(e,t){return e=String(o(e)),1&t&&(e=e.replace(u,"")),2&t&&(e=e.replace(l,"")),e};e.exports=m},c5f6:function(e,t,r){"use strict";var a=r("7726"),o=r("69a8"),n=r("2d95"),i=r("5dbc"),c=r("6a99"),s=r("79e5"),u=r("9093").f,l=r("11e9").f,m=r("86cc").f,d=r("aa77").trim,f="Number",p=a[f],h=p,v=p.prototype,g=n(r("2aeb")(v))==f,b="trim"in String.prototype,y=function(e){var t=c(e,!1);if("string"==typeof t&&t.length>2){t=b?t.trim():d(t,3);var r,a,o,n=t.charCodeAt(0);if(43===n||45===n){if(r=t.charCodeAt(2),88===r||120===r)return NaN}else if(48===n){switch(t.charCodeAt(1)){case 66:case 98:a=2,o=49;break;case 79:case 111:a=8,o=55;break;default:return+t}for(var i,s=t.slice(2),u=0,l=s.length;u<l;u++)if(i=s.charCodeAt(u),i<48||i>o)return NaN;return parseInt(s,a)}}return+t};if(!p(" 0o1")||!p("0b1")||p("+0x1")){p=function(e){var t=arguments.length<1?0:e,r=this;return r instanceof p&&(g?s(function(){v.valueOf.call(r)}):n(r)!=f)?i(new h(y(t)),r,p):y(t)};for(var k,_=r("9e1e")?u(h):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),N=0;_.length>N;N++)o(h,k=_[N])&&!o(p,k)&&m(p,k,l(h,k));p.prototype=v,v.constructor=p,r("2aba")(a,f,p)}},f123c:function(e,t,r){},f21b:function(e,t,r){"use strict";var a=r("f123c"),o=r.n(a);o.a},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);