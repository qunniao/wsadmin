<!-- 代理等级设置 -->
<template>
    <div style="padding-left:20px;padding-top:20px;">
        <el-row>
            <el-col :span="8" v-for="(item, index) in agentlevellist" :key="index" >
                <el-card :body-style="{ padding: '0px' }">
                <div style="padding: 14px;">
                    <div style="width:96%;overflow:hidden">
                        <span style="float:left">{{item.nick}}</span>
                         <span style="float:right" @click="changeAgentLevelShow(item.id)">编辑</span>
                    </div>
                    <div style="width:96%;overflow:hidden">
                        <div style='width:40%;float:left'>
                            <div>
                                <div>代理人数:86</div>
                                <div>已代理:86</div>
                                <div>申请中:0</div>
                            </div>
                            <div>
                                <div>充值权限：不能充值</div>
                                <div>代理加入:首次进货</div>
                                <div>进货折扣:{{item.stockDiscount*100}}%</div>
                            </div>
                            <div class="bottom clearfix">
                            </div>
                        </div>
                        <div style="float:left;height:150px;width:150px" class="wave-echart"  :id='item.name' :ref='item.name' ></div>
                    </div>
                </div>
                </el-card>
            </el-col>
            </el-row>
        <el-dialog
            title="代理等级修改"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="80%">
                <second-index
                v-if="secondDepShow"
                :agentlevel-id="agentlevelId"
                @finish-action="getAgentLevelList"
                @close-form="secondDepShow = false"
                ></second-index>
        </el-dialog>
    </div>
</template>

<script>
const SecondIndex = () => import('./agentLevelSetUpInfo.vue');
import {
  getAgentLevelListAPI,
}from '@/api/agentAduitAPI.js'
import echartsLiquidfill from 'echarts-liquidfill'
export default {
    name:'',
    data()   {
        return   {
           agentlevellist:[],
           secondDepShow:false,
           agentlevelId:''
        };
    },
    components:{
        SecondIndex
    },  
    methods: {
        initWave (ref,value) {
            let _this = this
            setTimeout(() => {
                // _this.chart = this.$echarts.init(_this.$refs[ref])
                _this.chart = this.$echarts.init(document.getElementById(''+ref))
                // 把配置和数据放这里
                _this.chart.setOption({
                title: {// 标题
                    text: '进货折扣',
                    textStyle: {// 标题的样式
                    color: '#888', // 字体颜色
                    fontFamily: 'Microsoft YaHei', // 字体
                    fontSize: 14,
                    fontWeight: '400',
                    align: 'center', // 文字的水平方式
                    baseline: 'middle',
                    position: 'inside',
                    verticalAlign: 'middle'// 文字的垂直方式
                    },
                    left: 'center', // 定位
                    top: '20%'
                },
                series: [{
                    type: 'liquidFill',
                    radius: '95%',
                    waveAnimation: true,
                    data: [{
                    value: value,
                    direction: 'left',
                    itemStyle: {
                        normal: {
                        color: '#1890ff'
                        }
                    }
                    }],
                    outline: {
                    // show: true , //是否显示轮廓 布尔值
                    borderDistance: 1, // 外部轮廓与图表的距离 数字
                    itemStyle: {
                        borderColor: '#1890ff', // 边框的颜色
                        borderWidth: 3 // 边框的宽度
                        // shadowBlur: 5 , //外部轮廓的阴影范围 一旦设置了内外都有阴影
                        // shadowColor: '#000' //外部轮廓的阴影颜色
                    }
                    },
                    itemStyle: {
                    opacity: 0.9, // 波浪的透明度
                    shadowBlur: 0 // 波浪的阴影范围
                    },
                    backgroundStyle: {
                    color: '#fff' // 图表的背景颜色
                    },
                    label: { // 数据展示样式
                    show: true,
                    color: '#000',
                    insideColor: '#fff',
                    fontSize: 20,
                    fontWeight: 400,
                    align: 'center',
                    baseline: 'middle',
                    position: 'inside'
                    }
                }]
                })
            }, 0)
        },changeAgentLevelShow(id){
            this.agentlevelId=id
            this.secondDepShow=true
        },getAgentLevelList(){
            getAgentLevelListAPI()
                .then(res => {
                    const  agentleveldata =res.data.data
                    for(let i=0;i<agentleveldata.length;i++){
                         let agentlevel='waveEchart'+i
                         agentleveldata[i].name=agentlevel
                    }
                    this.agentlevellist=agentleveldata
                     for(let i=0;i<this.agentlevellist.length;i++){
                        let thisid='waveEchart'+i
                        this.initWave(thisid,this.agentlevellist[i].stockDiscount)
                    }
                })
                .catch(err => {
                    this.tableLoading = false;
                })
        }
    },
    created(){
    },
    destroyed(){
    },
    mounted() {
        this.getAgentLevelList()
        // for(let i=0;i<2;i++){
        //     console.log('执行'+i)
        //     let thisid='waveEchart'+(i+1)
        //     this.initWave(thisid,0.5)
        // }
    },
};
</script>

<style scoped lang="less">
.el-col{
    margin-bottom: 10px;
    margin-right: 10px;
}
</style>