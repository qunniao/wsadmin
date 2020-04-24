<template>
  <div class="mod-prod-info">
    <el-form :model="dataForm"
             ref="dataForm"
             label-width="150px">
      <el-form-item v-if="ispwdshow==0"  label="管理员账号:"
                    prop="username"
                    :rules="[{ required: true, message: '管理员账号不能为空'}]">
        <el-col :span="16">
          <el-input v-model="dataForm.username"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item  label="管理员姓名:"
                    prop="trueName"
                    :rules="[{ required: true, message: '管理员姓名不能为空'}]">
        <el-col :span="16">
          <el-input v-model="dataForm.trueName"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item v-if="ispwdshow==0" label="密码:"
                    prop="pwd"
                    :rules="[{ required: true, message: '管理员密码不能为空'}]">
        <el-col :span="16">
          <el-input v-model="dataForm.pwd "
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="昵称:"
                    prop="nickname">
        <el-col :span="16">
          <el-input v-model="dataForm.nickname"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号:"
                    prop="phone"
                    :rules="[{ required: true, message: '管理员姓名不能为空'}]">
        <el-col :span="16">
          <el-input v-model="dataForm.phone"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="头像:">
        <el-upload
            class="avatar-uploader"
            action="http://admin.zhanchengwlkj.com:8080/derivative_system_backstage/file/addFile"
            :show-file-list="false"
            name="files"
            :on-success="uploadImg"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageShowUrl" :src="imageShowUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
  getFranchiseDetailAPI,
  pushFranchiseDetailAPI,
  putFranchiseDetailAPI
} from '@/api/franchiseStoreAdministrators.js'
export default {
   name:'editor',
  data () {
    return {
      // 规格列表
      dataForm:{
        username :'',
        pwd :'',
        roleId:3,
        nickname:'',
        cover:'',
        phone:''
      },
      ispwdshow:0,
      imageShowUrl:''
      // resourcesUrl: window.SITE_CONFIG.resourcesUrl
    }
  },
  components: {

  },
  props: {
    franchiseId: {
      required: true,
    },
  },
  computed: {
    defalutSku () {
      return this.$store.state.prod.defalutSku
    }
  },
  activated () {
    this.dataForm.prodId = this.$route.query.prodId
    this.getDataList()
  },
  methods: {
    uploadImg(res){
      this.dataForm.cover = res.data;
      this.imageShowUrl=res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if(valid){
            const params = {
              username :this.dataForm.username,
              trueName:this.dataForm.trueName,
              roleId:3,
              nickname:this.dataForm.nickname,
              cover:this.dataForm.cover,
              phone:this.dataForm.phone
            }
            if(this.ispwdshow==0){
              params.pwd=this.dataForm.pwd
              pushFranchiseDetailAPI(params)
                .then(res => {
                    const sucresponse = res.data;
                    if(sucresponse.code==200){
                      this.$message({
                        type: 'success',
                        message: '添加管理员信息成功',
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
            }else{
              params.uid=this.dataForm.uid
              putFranchiseDetailAPI(params)
                .then(res => {
                    const sucresponse = res.data;
                    if(sucresponse.code==200){
                      this.$message({
                        type: 'success',
                        message: '修改管理员信息成功',
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

            console.log(params)
          }
        })
    },
    getoneTypeList(id){
     
    },
    getFranchiseDetail(id){
          const params =id
            getFranchiseDetailAPI(params)
                .then(res => {
                    console.log(res)
                    const data=res.data.data
                    this.dataForm=data
                    this.imageShowUrl=data.cover
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
    if(this.franchiseId!=0){
      this.getFranchiseDetail(this.franchiseId)
      this.ispwdshow=this.franchiseId
    }
      console.log(this.franchiseId)
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
.avatar{
  width: 100px;
  height: 100px;
}
</style>