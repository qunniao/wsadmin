/*
 * @Description: 代理等级修改
 * @Author: jian.weng
 * @Date: 2019-10-29 10:49:29
 */

<template>
    <div> 
        <el-form :model="dataForm"
            ref="dataForm"
            label-width="150px">
            <el-form-item label="代理等级:"
                    prop="level">
                <el-col :span="8">
                <el-input v-model="dataForm.level"
                            placeholder="请输入"
                            maxlength="50"
                            disabled></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="等级别名:"
                    prop="nick">
                <el-col :span="8">
                <el-input v-model="dataForm.nick"
                            placeholder="请输入"
                            maxlength="50"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="进货折扣:"
                    prop="stockDiscount">
                <el-col :span="8">
                <el-input v-model="dataForm.stockDiscount"
                            placeholder="请输入"
                            maxlength="50"></el-input>
                </el-col>
            </el-form-item>
            <div  class="mbline">代理加入设置</div>
            <el-form-item label-width="180px" label="代理方式：" prop="checkList">
                 <el-radio v-model="dataForm.isTask" label="0">无任务</el-radio>
                 <el-radio v-model="dataForm.isTask" label="1">有任务</el-radio>
            </el-form-item>
            <div v-if="dataForm.isTask==1">
                <el-form-item label="任务金额:"
                    prop="taskAmount">
                    <el-col :span="8">
                    <el-input v-model="dataForm.taskAmount"
                                placeholder="请输入"
                                maxlength="50"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label-width="180px" label="首进折扣：">
                    <el-col :span="6">
                        <el-radio v-model="isDiscount" label="0">默认折扣</el-radio>
                        <el-radio v-model="isDiscount" label="1">
                            自定义折扣
                        </el-radio>
                    </el-col>
                    <el-col v-if="isDiscount==1" :span="6">
                        <el-input v-model="dataForm.firstDiscount"
                                    placeholder="请输入"
                                    maxlength="50"></el-input>
                    </el-col>
                </el-form-item>
            </div>
            <div  class="mbline">基础设置</div>
             <el-form-item label="最低进货额度:"
                prop="minStock">
                <el-col :span="8">
                <el-input v-model="dataForm.minStock"
                    placeholder="请输入"
                    maxlength="50"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="授权有效期:"
                prop="timeLimit">
                <el-select v-model="dataForm.timeLimit" clearable placeholder="请选择" >
                    <el-option
                        v-for="item in timelist"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="注册提示语:"
                prop="registPrompt">
                <el-col :span="8">
                <el-input v-model="dataForm.registPrompt"
                    placeholder="请输入"
                    maxlength="50"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                        @click="dataFormSubmit()">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {
     timeStamp2String,
} from '@/api/globalAPI.js'
import {
  getAgentLevelInfoAPI,
  postAgentLevelUpdateAPI
}from '@/api/agentAduitAPI.js'
export default {
    name:'prodList',
    data(){
        return{
            isDiscount:'0',
            agentid:'',
            dataForm:{
                title:'',
                istask:'0',
                sales:'',
                typeId:1
            },
            timelist:[
                {name:'永久',value:0},
                {name:'1个月',value:1},
                {name:'2个月',value:2},
                {name:'3个月',value:3},
                {name:'4个月',value:4},
                {name:'5个月',value:5},
                {name:'6个月',value:6},
                {name:'7个月',value:7},
                {name:'8个月',value:8},
                {name:'9个月',value:9},
                {name:'10个月',value:10},
                {name:'11个月',value:11},
                {name:'12个月',value:12},
                {name:'13个月',value:13},                
                {name:'14个月',value:14},
                {name:'15个月',value:15},
                {name:'16个月',value:16},
                {name:'17个月',value:17},
                {name:'18个月',value:18},
                {name:'19个月',value:19},
                {name:'20个月',value:20},
                {name:'21个月',value:21},
                {name:'22个月',value:22},
                {name:'23个月',value:23},
                {name:'24个月',value:24},
                {name:'36个月',value:36},
            ],
            stock_type:1,
        };
    },
    components:{
        // AddDepModal,
    },
    props: {
        agentlevelId:{
            required: true,
        }
    },
    methods:{
        /**
         * @msg: 时间处理
         * @param {type} 
         * @return: 
         */
        timechange(time,type){
            return timeStamp2String(time,type)
        },
        /**
         * @msg: 获取等级详情
         * @param {type} 
         * @return: 
         */
        getAgentLevelInfo(){
            getAgentLevelInfoAPI(this.agentid)
                .then(res => {
                    const  agentleveldata =res.data.data
                    this.dataForm=agentleveldata
                    if(agentleveldata.firstDiscount!=null &&agentleveldata.firstDiscount!=''){
                        this.isDiscount=1
                    }
                    this.dataForm.isTask=''+this.dataForm.isTask
                    console.log(this.dataForm)
                    this.dataForm.stockDiscount=Number(this.dataForm.stockDiscount)*100
                })
                .catch(err => {
                    this.tableLoading = false;
                })
        },
        dataFormSubmit () {
          let that=this;
            this.$refs['dataForm'].validate((valid) => {
                if(valid){
                    const params =this.dataForm
                    params.id=Number(params.id)
                    params.stockType=1
                    const pushdata={
                        stockType:1,
                        stockDiscount:Number(params.stockDiscount)/100,
                        id:params.id,
                        firstDiscount: params.firstDiscount,
                        isDarklevel: params.isDarklevel,
                        isTask: Number(params.isTask),
                        level:  params.level,
                        minStock: Number(params.minStock),
                        nick: params.nick,
                        registPrompt: params.registPrompt,
                        taskAmount: Number(params.taskAmount),
                        timeLimit: params.timeLimit,
                    }
                    postAgentLevelUpdateAPI(pushdata)
                        .then(res => {
                            const sucresponse = res.data;
                            if(sucresponse.code==200){
                            this.$message({
                                type: 'success',
                                message: '修改等级成功',
                            });
                            this.$emit('close-form')
                            this.$emit('finish-action')
                            }else{
                            this.errorMsg(sucresponse.message)
                            }
                        })
                        .catch(err => {
                        console.log(err)
                            this.tableLoading = false;
                        }) 
                }
            })
        },errorMsg (message) {
            this.$message({
                message: message,
                type: 'error',
                duration: 1500
            })
        },
    },
    mounted(){
        console.log(this.agentlevelId)
        this.agentid=this.agentlevelId
        this.getAgentLevelInfo()
    }
}
</script>

<style scoped lang="less">
.el-row{
    padding: 10px;
    border:1px solid #000;
}
.mbline{
  margin-top:24px;
  padding-left: 20px;
  line-height: 40px;
  background: rgb(249, 249, 249);
}
</style>

