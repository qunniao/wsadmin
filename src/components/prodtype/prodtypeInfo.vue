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
                    prop="typeName"
                    :rules="[{ required: true, message: '一级分类名称不能为空'}]">
        <el-col :span="8">
          <el-input v-model="dataForm.typeName"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <div v-if="level==2">
        <el-form-item style="margin-top:10px"  label="上级分类：">
            <el-select v-model="dataForm.pid"  placeholder="请选择" :rules="[{ required: true, message: '上级分类不能为空'}]">
              <el-option
                v-for="item in onetypeidlist"
                :key="item.tid"
                :label="item.typeName"
                :value="item.tid">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item  label="二级分类名称:"
                    prop="typeName"
                    :rules="[{ required: true, message: '二级分类名称'}]">
          <el-col :span="8">
            <el-input v-model="dataForm.typeName"
                      placeholder="请输入"
                      maxlength="50"></el-input>
          </el-col>
        </el-form-item> 
      </div>
      <el-form-item style="margin-top:10px"  label="关联属性组：">
            <el-select v-model="dataForm.pgId"  placeholder="请选择">
              <el-option
                v-for="item in pgIdList"
                :key="item.pgId"
                :label="item.title"
                :value="item.pgId">
              </el-option>
            </el-select>
      </el-form-item>    
      <el-form-item label="排序:"
                    prop="sort">
        <el-col :span="8">
          <el-input v-model="dataForm.sort"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="上传图片:">
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
    getParamListAPI,
    addProdTypeAPI,
    getProdTypeDetailAPI,
    getProdtypeLISTAPI,
    PutProdTypeAPI
} from '@/api/inventoryRecordAPI.js'
export default {
   name:'editor',
  data () {
    return {
      // 规格列表
      level:'1',
      typeSearch:[],
      pgIdList:[],
      onetypeidlist:[],
      dataForm:{
        pgId:'',
        pid:'',
        typeName:'',
        sort:'',
        cover:''
      },
      changeType:2,
      imageShowUrl:''
      // resourcesUrl: window.SITE_CONFIG.resourcesUrl
    }
  },
  components: {

  },
  props: {
    prodtypeId: {
      required: true,
    },
    prodtypeLevel:{
      required: true,
    },
    prodchangeType:{
      required: true,
    }
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
          const args = {
                        pgId:this.dataForm.pgId,
                        pid:this.dataForm.pid,
                        typeName:this.dataForm.typeName,
                        sort:this.dataForm.sort,
                        cover:this.dataForm.cover
                    };
                    if(this.level==1){
                      args.pid=0
                    }
                    // console.log(this.prodchangeType)
                    if(this.changeType==1){
                      addProdTypeAPI(args)
                        .then(res => {
                            const data = res.data;
                            if (data.code === 200) {
                                    this.$message({
                                        type: 'success',
                                        message: '添加分类成功',
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
                      args.tid=this.dataForm.tid
                      PutProdTypeAPI(args)
                        .then(res => {
                            const data = res.data;
                            if (data.code === 200) {
                                    this.$message({
                                        type: 'success',
                                        message: '修改分类成功',
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
        })
    },
    getoneTypeList(id){
      getProdtypeLISTAPI()
                .then(res => {
                    this.onetypeidlist=res.data.data.records
                    if(id!=0){
                      this.dataForm.pid=id
                    }
                })
                .catch(err => {
                    this.tableLoading = false;
                })
    },
    getProdTypeDetail(id){
      const params =id
            getProdTypeDetailAPI(params)
                .then(res => {
                    let prodtypeform= res.data.data
                    console.log(prodtypeform)
                    if(prodtypeform.pid!=0){
                      this.level='2'
                      this.getoneTypeList(prodtypeform.pid,1)
                    }else{
                      this.getoneTypeList(prodtypeform.tid,0)
                    }
                    this.dataForm=prodtypeform
                    this.imageShowUrl=prodtypeform.cover
                })
                .catch(err => {
                    this.tableLoading = false;
                })
    },
    getParamGroups(typechange){
        const params = {
            size:100,
            current:1,
        };

            getParamListAPI(params)
                .then(res => {
                    const data = res.data.data;
                    this.pgIdList=data.records
                    if(typechange==2){
                      console.log(this.prodtypeId)
                      this.getProdTypeDetail(this.prodtypeId)
                    }else{
                      this.getoneTypeList(0,1)
                    }
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
      // console.log(123)
      if(this.prodchangeType==1){
        this.changeType=1
        this.dataForm.pid=''
        this.getParamGroups(1)
      }else{
        this.getParamGroups(2)
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