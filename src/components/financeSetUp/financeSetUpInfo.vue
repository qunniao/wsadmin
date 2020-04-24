<template>
  <div class="mod-prod-info">
    <el-form :model="dataForm"
             ref="dataForm"
             label-width="150px">
      <el-form-item label="选择账户类别:">
        <el-select v-model="dataForm.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <div v-if="dataForm.type!=''">
        <div v-if="dataForm.type==1">
          <el-form-item label="开户行"
                    prop="title">
            <el-col :span="8">
              <el-input v-model="dataForm.depositBank"
                        placeholder="请输入"
                        maxlength="50"></el-input>
            </el-col>
          </el-form-item>          
        </div>
        <el-form-item :label="dataForm.type==3?'微信名':'账户姓名'"
                    prop="title">
          <el-col :span="16">
            <el-input v-model="dataForm.trueName"
                      placeholder="请输入"
                      maxlength="50"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item :label="dataForm.type==3?'微信号':'账户号'"
                    prop="title">
          <el-col :span="16">
            <el-input v-model="dataForm.account"
                      placeholder="请输入"
                      maxlength="50"></el-input>
          </el-col>
        </el-form-item> 
      </div>
      <el-form-item label="收款二维码:" prop="picfile">
        <el-upload
            class="avatar-uploader"
            action="http://admin.zhanchengwlkj.com:8080/derivative_system_backstage/file/addFile"
            :show-file-list="false"
            :auto-upload="true"
            name="files"
            :on-success="uploadImg"
            :before-upload="beforeAvatarUpload">
            <img v-if="dataForm.qrCode" :src="dataForm.qrCode" class="avatar">
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
    getPayeeAccountsInfoAPI,
    updatePayeeAccountsInfoAPI
} from '@/api/financeAPI.js'
export default {
   name:'editor',
  data () {
    return {
      // 规格列表
      pgid:'',
      options: [
        {
          value: 1,
          label: '银行卡'
        },{
          value: 2,
          label: '支付宝'
        },{
          value: 3,
          label: '微信'
        }
      ],
      dataForm:{
        title:'',
        domains: [],
        type:'',
        cover:''
      },
      imageShowUrl:''
      // resourcesUrl: window.SITE_CONFIG.resourcesUrl
    }
  },
  components: {

  },
  props: {
    financeId: {
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
    uploadImg(res){
      this.dataForm.qrCode = res.data;
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
    getFinanceSetUpInfo(id){
      getPayeeAccountsInfoAPI(id)
        .then(res => {
          console.log(res)
          const  data =res.data.data
          this.dataForm=data
          console.log(data)
        }).catch(err => {
            this.tableLoading = false;
        })
    },
    dataFormSubmit () {
          let that=this;
        this.$refs['dataForm'].validate((valid) => {
          if(valid){
            const putdata={
              id:this.dataForm.id,
              type:this.dataForm.type,
              trueName:this.dataForm.trueName,
              depositBank:this.dataForm.depositBank,
              qrCode:this.dataForm.qrCode
            }
            updatePayeeAccountsInfoAPI(putdata)
                .then(res => {
                    const sucresponse = res.data;
                    if(sucresponse.code==200){
                      this.$message({
                        type: 'success',
                        message: '修改账户成功',
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
    },
    /*
      * 返回上层
      */
    backhtmls(){
        this.$emit('close-form')
    }    
  },
  mounted() {
    console.log(this.financeId)
    if(this.financeId!=0){
      // this.pgid=this.prodgroupId;
      this.getFinanceSetUpInfo(this.financeId)
      // this.getGroupDetail(this.prodgroupId)
    }
  },
}
</script>
<style scoped="scoped" lang="less">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>