<template>
  <div class="mod-prod-info">
      <el-form :model="dataForm"
             ref="dataForm"
             label-width="150px">
    
            <el-form-item label-width="180px" label="选择权限：" prop="actionList">
             <template>
                <el-menu 
                :unique-opened="true">
                  
                    <action-item :key="item.actionId" v-for="item in actionList" :menuItem="item"  :menuIndex="item.actionId" :checkList="checkList" v-on:listenTochildEvent="showMessageFromChild"></action-item>
                </el-menu>
            </template>
            </el-form-item>
     
      <el-form-item>
        <el-button type="primary"
                   @click="dataFormSubmit()">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import actionItem from'./actionItem';

import {
  getAdminActionListAPI,getAdminRolePowerListAPI
} from '@/api/adminRoleApi.js'

import {
  updateAdminRolePowerAPI
} from '@/api/adminRoleApi.js'

export default {
   name:'editor',
  data () {
    return {
      // 规格列表
      dataForm:{

      },
      checkList:[],
      actionIds:[],
      actionList:[],
      powerList:[]
    }
  },
  components: {
        actionItem
  },
  props: {
    roleId: {
      required: true,
    },
  },
 
  methods: {
    //获取子组件的值
    showMessageFromChild(data){
          console.log("data:"+data);
          this.checkList = data;
    },

    dataFormSubmit () {
      console.log("roleId:"+this.roleId);
      console.log(this.checkList);
        this.$refs['dataForm'].validate((valid) => {
          var ids = '';
          for(let i=0;i<this.checkList.length;i++){
            ids+=this.checkList[i]+",";
          }
      console.log(ids);
          if(valid){
            const params = {
              roleId:this.roleId,
              ids:ids
            }
           
              updateAdminRolePowerAPI(params).then(res => {
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
   getAdminActionList(){
      console.log("getAdminActionList");
      const params = {
              roleId:this.roleId
            }
            getAdminActionListAPI(params)
                .then(res => {
                  console.log("getAdminActionListAPI 返回")
                    const data = res.data.data.actionList;
                    const powerList = res.data.data.powerList;
                    var checkArray = [];
                    for(var i=0;i<powerList.length;i++){
                      checkArray.push(powerList[i].actionId);
                    }
                    this.checkList = checkArray;
                    this.actionList = data;
                  
                    console.log(this.actionList)
                    console.log(this.checkList)
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
      this.getAdminActionList();  
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