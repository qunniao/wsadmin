<template>
  <div class="mod-prod-info">
    <el-form :model="dataForm"
             ref="dataForm"
             label-width="150px">
      <el-form-item label="角色名称:"
                    prop="roleName"
                    :rules="[{ required: true, message: '角色名称不能为空'}]">
        <el-col :span="16">
          <el-input v-model="dataForm.roleName"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item  label="备注:"
                    prop="note"
                   >
        <el-col :span="16">
          <el-input v-model="dataForm.note"
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
  getAdminRoleInfoAPI,
  pushAdminRoleInfoAPI,
  putAdminRoleInfoAPI
} from '@/api/adminRoleApi.js'
export default {
   name:'editor',
  data () {
    return {
      // 规格列表
      dataForm:{
        roleName :'',
        note :''
      }
    }
  },
  components: {

  },
  props: {
    updateId: {
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
   
    dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if(valid){
            const params = {
              roleName :this.dataForm.roleName,
              note:this.dataForm.note        
            }
            if(this.updateId==0){
             
              pushAdminRoleInfoAPI(params)
                .then(res => {
                    const sucresponse = res.data;
                    if(sucresponse.code==200){
                      this.$message({
                        type: 'success',
                        message: '添加成功',
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
              params.id=this.updateId
              putAdminRoleInfoAPI(params)
                .then(res => {
                    const sucresponse = res.data;
                    if(sucresponse.code==200){
                      this.$message({
                        type: 'success',
                        message: '修改成功',
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
    
    getDetail(id){
          const params =id
            getAdminRoleInfoAPI(params)
                .then(res => {
                    console.log(res)
                    const data=res.data.data
                    this.dataForm=data
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
    if(this.updateId!=0){
      this.getDetail(this.updateId)
    }
      console.log(this.updateId)
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