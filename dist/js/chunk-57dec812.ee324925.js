(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-57dec812"],{"0358":function(t,e,i){"use strict";var a=i("9e93"),n=i.n(a);n.a},"33e7":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"lineChart",staticClass:"line-chart-wrapper"})},n=[],s={name:"",data:function(){return{lineChart:null}},props:{titleText:{type:String},xAxisData:{required:!0,type:Array},seriesData:{required:!0,type:Array}},watch:{seriesData:function(){this.setOption()}},methods:{initChart:function(){var t=this.$refs.lineChart;this.lineChart=this.$echarts.init(t),this.setOption()},setOption:function(){this.lineChart.setOption({title:{text:this.titleText||"",left:"middle"},tooltip:{trigger:"axis"},xAxis:{type:"category",data:this.xAxisData,axisTick:{alignWithLabel:!0}},yAxis:{type:"value"},series:[{data:this.seriesData,type:"line"}]})}},mounted:function(){this.initChart()}},r=s,l=(i("0358"),i("2877")),h=Object(l["a"])(r,a,n,!1,null,"de7aa712",null);h.options.__file="LineChart.vue";e["default"]=h.exports},"9e93":function(t,e,i){}}]);