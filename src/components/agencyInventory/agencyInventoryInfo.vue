<template>
  <div class="mod-prod-info">
    <el-form :model="dataForm"
             ref="dataForm"
             label-width="150px">
      <el-form-item label="商品信息:">
        
      </el-form-item>
     <el-form-item label="当前库存:">
        
      </el-form-item>
      <el-form-item  label="增减方式：">
            <el-select v-model="transportId"  placeholder="请选择">
            </el-select>
      </el-form-item>
      <el-form-item label="基础销量:"
                    prop="prodName">
            <el-col :span="8">
              <el-input v-model="dataForm.prodName"
                        placeholder="请输入"
                        maxlength="50"></el-input>
            </el-col>
      </el-form-item>
       <el-form-item label="备注:"
                    prop="prodName">
            <el-col :span="8">
              <el-input v-model="dataForm.prodName"
                        type="textarea"
                        :rows="4"
                        placeholder="请填写备注信息"></el-input>
            </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
   name:'editor',
  data () {
    return {
      transportId:'',
      prodName:'',
      dataForm: {
        prodName:'',
        id:''
      }
      // 分类树展示与回显
      // resourcesUrl: window.SITE_CONFIG.resourcesUrl
    }
  },
  components: {
  },
  computed: {

  },
  methods: {
    dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          console.log(valid)
          console.log(this.dataForm)
        })
    },
    errorMsg (message) {
      this.$message({
        message: message,
        type: 'error',
        duration: 1500
      })
    },
  },
  mounted() {
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