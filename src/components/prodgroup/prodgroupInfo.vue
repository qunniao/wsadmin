<template>
  <div class="mod-prod-info">
    <el-form :model="dataForm"
             ref="dataForm"
             label-width="150px">
      <el-form-item label="属性组名称:"
                    prop="title"
                    :rules="[{ required: true, message: '属性值不能为空'}]">
        <el-col :span="8">
          <el-input v-model="dataForm.title"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item> 
       <el-form-item
          v-for="(domain, index) in dataForm.domains"
          :label="'属性' + index+1"
          :key="domain.key"
          :prop="'domains.' + index + '.value'"
          :rules="{
            required: true, message: '属性值不能为空', trigger: 'blur'
          }"
        >
        <el-col :span="8">
          <el-input v-model="domain.value"></el-input>
        </el-col>
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="addDomain">新增属性值</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="pushGroupFormData()">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
    addProdGroupsDataAPI,
    getProdGroupsDetailAPI,
    updateProdGroupsDataAPI
} from '@/api/prodGroupAPI.js'
export default {
   name:'editor',
  data () {
    return {
      // 规格列表
      pgid:'',
      dataForm:{
        title:'',
        domains: [],
      },
      imageShowUrl:''
      // resourcesUrl: window.SITE_CONFIG.resourcesUrl
    }
  },
  components: {

  },
  props: {
    prodgroupId: {
      required: true,
    },
  },
  computed: {
  },
  methods: {
    /*
      * 获取添加属性组
      */
    pushGroupFormData () {
        this.$refs['dataForm'].validate((valid) => {
          if(valid){
            if(this.dataForm.domains.length<1){
              this.$message({
                type: 'error',
                message: '请添加子分类',
              });
              return false
            }
            let namesdata =''
            for(let i=0;i<this.dataForm.domains.length;i++){
                if(i==0){
                  namesdata+=''+this.dataForm.domains[i].value
                }else{
                  namesdata+=','+this.dataForm.domains[i].value
                }
            }
            const  args = {
                title:this.dataForm.title,
                names:namesdata,
            };
            if(this.pgid!=0&&this.pgid!=''){
              args.pgid=this.pgid
              updateProdGroupsDataAPI(args)
		                .then(res => {
		                    const data = res.data;
		                    if (data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '修改属性组成功',
                                });
		                        this.backhtmls()
                                this.$emit('finish-action')
		                    }else{
		                        this.$message.error(res.data.msg)
		                    }
		                })
		                .catch(err => {
		                });
            }else{
              addProdGroupsDataAPI(args)
		                .then(res => {
		                    const data = res.data;
		                    if (data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '添加属性组成功',
                                });
		                        this.backhtmls()
                                this.$emit('finish-action')
		                    }else{
		                        this.$message.error(res.data.msg)
		                    }
		                })
		                .catch(err => {
		                });
            }
          }
        })
    },
    removeDomain(item) {
      console.log(123)
        var index = this.dataForm.domains.indexOf(item)
        if (index !== -1) {
          this.dataForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dataForm.domains.push({
          value: '',
          key: Date.now()
        });
      },
    errorMsg (message) {
      this.$message({
        message: message,
        type: 'error',
        duration: 1500
      })
    },
    getGroupDetail(groubid){
            this.wholeLoding = true;
            getProdGroupsDetailAPI(groubid)
                .then(res => {
                    let groupdata=res.data.data
                    this.dataForm.title=groupdata.title
                    let groupdatanamelsit =groupdata.names.split(',')
                    for(let i=0;i<groupdatanamelsit.length;i++){
                      this.dataForm.domains.push({value:groupdatanamelsit[i]})
                    }
                    console.log()
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
    if(this.prodgroupId!=0){
      this.pgid=this.prodgroupId;
      this.getGroupDetail(this.prodgroupId)
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
</style>