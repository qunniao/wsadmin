(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-719f47b2"],{3895:function(t,e,n){"use strict";var c=n("3bde"),o=n.n(c);o.a},"3abc":function(t,e,n){"use strict";n.r(e);var c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",[n("el-checkbox-group",{model:{value:t.checkList,callback:function(e){t.checkList=e},expression:"checkList"}},t._l(t.shoptypeform,function(e){return n("el-checkbox",{key:e.pgid,attrs:{label:e.title}},[t._v(t._s(e.title))])}))],1),n("el-button",{on:{click:t.savestopattribute}},[t._v("保存")])],1)},o=[],i=(n("cadf"),n("551c"),n("097d"),n("a27a")),a={name:"",data:function(){return{checkList:[],shoptypeform:[],params:{province:[],checked:{}}}},components:{},methods:{getattributelist:function(){var t=this;console.log("属性组"),Object(i["c"])().then(function(e){var n=e.data.data;t.shoptypeform=n}).catch(function(e){t.tableLoading=!1})},savestopattribute:function(){var t=this.checkList,e=this.shoptypeform,n="";console.log(t);for(var c=0;c<t.length;c++)for(var o=0;o<e.length;o++)t[c]==e[o].title&&(n+=0==c?e[o].names:","+e[o].names);this.$emit("changeattrlist",n),this.$emit("close-form")}},mounted:function(){this.getattributelist()}},s=a,r=(n("763d"),n("3895"),n("2877")),u=Object(r["a"])(s,c,o,!1,null,"6debfbc8",null);u.options.__file="shopAttribute.vue";e["default"]=u.exports},"3bde":function(t,e,n){},"763d":function(t,e,n){"use strict";var c=n("be5a7"),o=n.n(c);o.a},be5a7:function(t,e,n){}}]);