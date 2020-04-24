<template>
  <div class="mod-prod-info">
    <el-form :model="dataForm"
             ref="dataForm"
             label-width="150px">
      <el-form-item v-if="franchid==-1" label="加盟店名称:">
        <el-col :span="12">
          <el-input v-model="dataForm.storeName"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item v-if="franchid!=-1" label="邀请人手机号:">
        <el-col :span="12">
          <el-input v-model="dataForm.inviterPhone"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="用户姓名:">
        <el-col :span="12">
          <el-input v-model="dataForm.trueName "
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号码:">
        <el-col :span="12">
          <el-input v-model="dataForm.phone"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="地址:">
        <el-col :span="12">
          <el-input v-model="dataForm.region"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item v-if="franchid==-1" label="设置密码:">
        <el-col :span="12">
          <el-input v-model="dataForm.password"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="加盟店管理员:">
        <el-select v-model="dataForm.adminId"   placeholder="请选择">
              <el-option
                v-for="item in freightlist"
                :key="item.uid"
                :label="item.nickname"
                :value="item.uid">
              </el-option>
            </el-select>
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
     getfranchisedAdminListAPI,
     addFranchisedadminAPI,
     changeFranchisedadminAPI,
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
      freightlist:[],
      dataForm:{
        
      },
      franchid:-1,
      imageShowUrl:'',
      wholeLoding:true
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
    //添加修改加盟店
    dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if(valid){
            if(this.franchid!=-1){
              const paramstwo ={
                id:this.franchid,
                trueName:this.dataForm.trueName,
                phone:this.dataForm.phone,
                inviterPhone:this.dataForm.inviterPhone,
                adminId :this.dataForm.adminId ,
                region :this.dataForm.region ,
              }
              changeFranchisedadminAPI(paramstwo)
               .then(res => {
                    const sucresponse = res.data;
                    if(sucresponse.code==200&&sucresponse.data==true){
                      this.$message({
                        type: 'success',
                        message: '修改加盟店成功',
                      });
                      this.$emit('close-form')
                      this.$emit('finish-action')
                    }else{
                      this.errorMsg(sucresponse.message)
                    }
                })
                .catch(err => {
                    this.tableLoading = false;
                })
            }else{
              const params =this.dataForm
              addFranchisedadminAPI(params)
               .then(res => {
                    const sucresponse = res.data;
                    if(sucresponse.code==200){
                      this.$message({
                        type: 'success',
                        message: '添加加盟店成功',
                      });
                      this.$emit('close-form')
                      this.$emit('finish-action')
                    }else{
                      this.errorMsg(sucresponse.message)
                    }
                })
                .catch(err => {
                    this.tableLoading = false;
                })
            }
          }
        })
    },
    // 获取管理员列表
    getfranchisedAdminList(){
      getfranchisedAdminListAPI()
        .then(res => {
            const data=res.data.data
            this.freightlist=data
        })
        .catch(err => {
          this.wholeLoding = false;
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
    this.getfranchisedAdminList()
    if(this.agentId!=-1){
      this.getAgentInfomationDetail(this.agentId)
      this.franchid=this.agentId
    }
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