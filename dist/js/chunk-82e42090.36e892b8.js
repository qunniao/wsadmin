(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-82e42090"],{"416e":function(e,t,i){"use strict";var n=i("8331"),a=i.n(n);a.a},8331:function(e,t,i){},ef52:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"wrapper-index"},[i("div",{staticClass:"home-overview"},[i("div",{staticClass:"sum-count",on:{click:function(t){e.showDetail("doctor")}}}),i("div",{staticClass:"sum-count"}),i("div",{staticClass:"sum-count",on:{click:function(t){e.showDetail("pacient")}}})]),i("div",{directives:[{name:"show",rawName:"v-show",value:e.detailName,expression:"detailName"}],staticClass:"detail-msg"},["doctor"===e.detailName?i("doctor-detail",{on:{"back-overview":e.showDetail}}):e._e(),"pacient"===e.detailName?i("pacient-detail",{on:{"back-overview":e.showDetail}}):e._e()],1)])},a=[],o=function(){return Promise.all([i.e("chunk-950e3ebe"),i.e("chunk-6da3b8f2")]).then(i.bind(null,"5a8e"))},c=function(){return Promise.all([i.e("chunk-950e3ebe"),i.e("chunk-37f1c298")]).then(i.bind(null,"6f7f"))},s={name:"",data:function(){return{doctorNum:"",inquisitionNum:"",patientNum:"",detailName:""}},components:{DoctorDetail:o,PacientDetail:c},methods:{getPeopleCount:function(){},showDetail:function(e){this.detailName=e}},created:function(){this.getPeopleCount()}},l=s,u=(i("416e"),i("2877")),d=Object(u["a"])(l,n,a,!1,null,"61cd363f",null);d.options.__file="Index.vue";t["default"]=d.exports}}]);