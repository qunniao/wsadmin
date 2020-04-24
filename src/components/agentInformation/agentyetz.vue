<template>
  <div class="mod-prod-info">
    <el-form :model="dataForm"
             ref="dataForm"
             :rules="rules"
             label-width="150px">
      <el-form-item label="用户昵称:">
        <div class="prod-detail" :span="6">
          <div>{{userdetial.nickname}}</div>
        </div>
      </el-form-item>
       <el-form-item label="余额:">
          {{allnum}}
      </el-form-item>
      <el-form-item style="margin-top:10px"  label="增减方式：">
            <el-select v-model="dataForm.changeType"  placeholder="请选择">
                 <el-option
                  v-for="item in Stocktype"
                  :key="item.val"
                  :label="item.title"
                  :value="item.val">
                </el-option>
            </el-select>
      </el-form-item>    
      <el-form-item label="调整数量:"
                    prop="num">
        <el-col :span="8">
          <el-input  v-enter-number v-model="dataForm.num"
                    placeholder="请输入"
                    type="number">
                    ></el-input>
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
  getAgentDetailAPI,
  changeyeAPI
} from '@/api/agentInformationApi.js'
export default {
   name:'editor',
  data () {
    const validatePass = (rule, value, callback) => {
      console.log(this.dataForm.num)
      if(Number(this.dataForm.num)>Number(this.allnum)&&this.dataForm.changeType==2){
         callback(new Error('调整数目不能大于余额'))
      }else{
        callback()
      }
    }
    return {
      // 规格列表
      Stocktype:[{val:1,title:'增加积分'},{val:2,title:'减少积分'}],
      allnum:'0',
      rules:{
        num: [
          { required: true, message: '不能为空', trigger: ['blur', 'change'] },
           { required: true, trigger: 'blur', validator: validatePass }
        ],
      },
      changeid:'',
      userdetial:{},
      dataForm:{
        changeType:1,
        num:''
      },
      // resourcesUrl: window.SITE_CONFIG.resourcesUrl
    }
  },
  components: {

  },
  props: {
    agentId: {
      required: true,
    },
  },
  computed: {
    defalutSku () {
      return this.$store.state.prod.defalutSku
    }
  },
  methods: {
    dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if(valid){
            const params ={
              agentId :this.changeid,
              adminId:sessionStorage.getItem('uid'),
              changeType:this.dataForm.changeType,
              amount:this.dataForm.num
            }
            changeyeAPI(params)
                .then(res => {
                    const response = res.data;
                    console.log(response)
                    if(response.code==200){
                      this.$message({
                        type: 'success',
                        message: '修改积分成功',
                      });
                      this.$emit('close-form')
                      this.$emit('finish-action')
                    }else{
                      this.errorMsg(response.message)
                    }
                })
                .catch(err => {
                    this.tableLoading = false;
                })
          }
        })
    },
    getAgentDetail(id){
      console.log(id)
       getAgentDetailAPI(id)
        .then(res => {
          const data = res.data.data;
          this.allnum =data.incomeBalance
          this.userdetial=data
          console.log(data)
        })
        .catch(err => {
            this.tableLoading = false;
        })
    },
    errorMsg (message) {
      this.$message({
        message: message,
        type: 'error',
        duration: 1500
      })
    },
    /*
      * 返回上层
      */
    backhtmls(){
        this.$emit('close-form')
    }    
  },
  mounted() {
    this.getAgentDetail(this.agentId)
    this.changeid =this.agentId
  },
}
</script>
<style scoped="scoped" lang="less">
.mbline{
  margin-top:24px;
  padding-left: 20px;
  line-height: 40px;
  background: rgb(249, 249, 249);
}
.prod-img{
  max-width: 64px;
    min-width: 64px;
    width: 64px;
    height: 64px;
    line-height: 64px;
    border-radius: 4px;
}
.prod-detail{
  display: inline-block;
  margin-left: 10px;
  line-height: 24px;
}
</style>