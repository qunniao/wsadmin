<template>
  <div class="mod-prod-info">
      <el-form :model="dataForm"
             ref="dataForm"
             label-width="150px">
     
            <el-form-item label-width="180px" label="设置角色：" prop="roleList">
                <el-radio-group v-model="dataForm.roleId"  >
                          <el-radio v-for="item in roleList" :label="item.id" :key="item.id">{{item.roleName}}</el-radio>
                </el-radio-group>
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
  getAdminRoleListAPI,
} from '@/api/adminRoleApi.js'

import {
  updateAdminRoleAPI
} from '@/api/adminApi.js'

export default {
   name:'editor',
  data () {
    return {
      // 规格列表
   
      dataForm:{
        roleId:0,
        roleName:''
      },
      roleList:[],
    }
  },
  components: {

  },
  props: {
    adminId: {
      required: true,
    },
  },
 
  methods: {
  
    dataFormSubmit () {
      console.log("adminId:"+this.adminId+" roleId:"+this.dataForm.roleId);
        this.$refs['dataForm'].validate((valid) => {
          if(valid){
            const params = {
              adminId:this.adminId,
              roleId:this.dataForm.roleId
            }
           
              updateAdminRoleAPI(params).then(res => {
                    const sucresponse = res.data;
                    if(sucresponse.code==200){
                      this.$message({
                        type: 'success',
                        message: '设置成功',
                      });
                      this.$emit('close-form')
                      this.$emit('finish-action')
                    }else{
                      this.errorMsg(sucresponse.message)
                    }
                })
                .catch(err => {
                  console.log(err)
                   
                })
           

            console.log(params)
          }
        })
    },
   
    getAdminRoleList(){
      console.log("getAdminRoleList adminId:"+this.adminId);
            getAdminRoleListAPI()
                .then(res => {
                    const data = res.data.data;
                    console.log(data)
                    this.roleList = data;
                    console.log(roleList)
                })
                .catch(err => {
                    
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
      console.log("mounted方法");
      this.getAdminRoleList();  
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