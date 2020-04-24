<template>
  <div class="mod-prod-info">
    <el-form :model="dataForm"
             ref="dataForm"
             label-width="150px">
      <el-form-item label="代理姓名:">
        {{dataForm.trueName}}
      </el-form-item>
      <el-form-item label="代理手机:">
        {{dataForm.phone}}
      </el-form-item>
      <el-form-item label="登录密码:">
        {{dataForm.payeeAccount}}
      </el-form-item>
      <el-form-item label="身份证:">
        {{dataForm.idCard}}
      </el-form-item>
      <el-form-item label="微信号:">
        {{dataForm.nickname}}
      </el-form-item>
      <el-form-item label="性别:">
        {{genderlist[dataForm.gender]}}
      </el-form-item>
      <el-form-item label="出生年月:">
        {{dataForm.birthday}}
      </el-form-item>
      <el-form-item label="地区:">
        {{dataForm.region}}
      </el-form-item>
      <el-form-item label="学历:">
        {{dataForm.education}}
      </el-form-item>
      <el-form-item label="身份证:">
        {{dataForm.idCard}}
      </el-form-item>
      <!-- <el-form-item label="身份证(正面):">
            <img :src="dataForm.remark" class='paymentpic'>
      </el-form-item>
      <el-form-item label="身份证(反面):">
            <img :src="dataForm.remark" class='paymentpic'>
      </el-form-item> -->
      <!-- <el-form-item label="代理信息"
                    prop="piclist">
           <el-form-item style="margin-top:20px" label="授权编号:">
            {{dataForm.remark}}
           </el-form-item>
           <el-form-item label="授权权限:">
            {{dataForm.remark}}
           </el-form-item>
           <el-form-item label="邀请人:">
            {{dataForm.remark}}
           </el-form-item>  
           <el-form-item label="加入时姓名:">
            {{dataForm.remark}}
           </el-form-item>  
           <el-form-item label="加入时手机号:">
            {{dataForm.remark}}
           </el-form-item>  
           <el-form-item label="加入等级:">
            {{dataForm.remark}}
           </el-form-item>  
           <el-form-item label="当前等级:">
            {{dataForm.remark}}
           </el-form-item>  
      </el-form-item> -->
      <!-- <el-form-item label="申请信息"
                    prop="piclist">
           <el-form-item style="margin-top:20px" label="邀请人:">
            {{dataForm.remark}}
           </el-form-item>
           <el-form-item label="申请等级:">
            {{dataForm.remark}}
           </el-form-item>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import {
     getAgentDetailAPI,
} from '@/api/agentInformationApi.js'
export default {
   name:'editor',
  data () {
    return {
      // 规格列表
      pgid:'',
      genderlist:{
        0:"女",
        1:"男"
      },
      dataForm:{
        
      },
      imageShowUrl:''
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
  },
  methods: {    
    errorMsg (message) {
      this.$message({
        message: message,
        type: 'error',
        duration: 1500
      })
    },
    // 获取代理详细详情
    getAgentInfomationDetail(id){
            this.wholeLoding = true;
            getAgentDetailAPI(id)
                .then(res => {
                   const data=res.data.data
                    console.log(data)
                    this.dataForm=data
                })
                .catch(err => {
                    this.wholeLoding = false;
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
    this.getAgentInfomationDetail(this.agentId)
    // console.log(this.agentId)
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
.paymentpic{
  width: 100px;
  height: 100px;
}
</style>