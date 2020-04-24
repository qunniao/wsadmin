<template>
  <div class="mod-prod-info">
    <el-form :model="dataForm"
             ref="dataForm"
             label-width="150px">
      <el-form-item  label="设置级别">
          <el-radio v-model="level" label="1">一级</el-radio>
          <el-radio v-model="level" label="2">二级</el-radio>
      </el-form-item>
      <el-form-item v-if="level==1" label="一级分类名称:"
                    prop="prodName"
                    :rules="[{ required: true, message: '一级分类名称不能为空'}]">
        <el-col :span="8">
          <el-input v-model="dataForm.prodName"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <div v-if="level==2">
        <el-form-item style="margin-top:10px"  label="上级分类：">
            <el-select v-model="transportId"  placeholder="请选择">
            </el-select>
        </el-form-item>
        <el-form-item  label="二级分类名称:"
                    prop="prodName"
                    :rules="[{ required: true, message: '二级分类名称'}]">
          <el-col :span="8">
            <el-input v-model="dataForm.prodName"
                      placeholder="请输入"
                      maxlength="50"></el-input>
          </el-col>
        </el-form-item> 
      </div>
      <el-form-item style="margin-top:10px"  label="关联属性组：">
            <el-select v-model="transportId"  placeholder="请选择">
            </el-select>
      </el-form-item>    
      <el-form-item label="排序:"
                    prop="prodName">
        <el-col :span="8">
          <el-input v-model="dataForm.prodName"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="上传图片:">
        <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="uploadImg"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageShowUrl" :src="imageShowUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <div v-if="level==1">
        <div v-for="(item, index) in typeSearch" :key="index">
          <el-form-item  label="二级分类名称:"
                      :rules="[{ required: true, message: '二级分类名称'}]">
            <el-col :span="8">
              <el-input 
                         v-model='item.val' 
                        placeholder="请输入"
                        maxlength="50"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item style="margin-top:10px"  label="关联属性组：">
              <el-select v-model="transportId"  placeholder="请选择">
                </el-select>
              </el-form-item>
                    <el-form-item label="排序:"
                        prop="prodName">
            <el-col :span="8">
              <el-input 
                        placeholder="请输入"
                        maxlength="50"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="上传图片:">
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="uploadImg"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageShowUrl" :src="imageShowUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </div>
      </div>
      <el-button  @click="addnewproduct()">增加</el-button>
      <el-form-item>
        <el-button type="primary"
                   @click="dataFormSubmit()">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
   name:'editor',
  data () {
    return {
      // 规格列表
      level:'1',
      typeSearch:[],
      imageShowUrl:'',
      transportId:'',
      dataForm: {
      },
      tags: [],
      // resourcesUrl: window.SITE_CONFIG.resourcesUrl
    }
  },
  components: {

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
    uploadImg(file){
      console.log(file)
      this.imgFile = file.raw;
      this.imageShowUrl = URL.createObjectURL(file.raw); //创建img file格式地址
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    addnewproduct(){
      this.typeSearch.push({value:''})
    },
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