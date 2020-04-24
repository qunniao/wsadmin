<template>
  <div class="mod-prod-info">
    <el-form :model="dataForm"
             ref="dataForm"
             :rules="rules"
             label-width="150px">
      <el-form-item label="商品信息:">
        <img class="prod-img" :src="cover">
        <div class="prod-detail" :span="6">
          <div>{{prodName}}</div>
          <div>分类：</div>
          <div>规格：</div>
        </div>
      </el-form-item>
       <el-form-item label="可用库存:">
          {{allnum}}
      </el-form-item>
      <el-form-item style="margin-top:10px"  label="增减方式：">
            <el-select v-model="dataForm.changeType"  placeholder="请选择">
                 <el-option
                  v-for="item in Stocktype"
                  :key="item.val"
                  :label="item.title"
                  :value="item.val">
                </el-option>
            </el-select>
      </el-form-item>    
      <el-form-item label="调整数量:"
                    prop="num">
        <el-col :span="8">
          <el-input  v-enter-number v-model="dataForm.num"
                    placeholder="请输入"
                    type="number">
                    ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请填写备注信息"
        v-model="dataForm.remark">
      </el-input>
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
  getProdDetailAPI,
  changeProdDetilAPI,
  changeSkuDetilAPI
} from '@/api/productStockApi.js'
export default {
   name:'editor',
  data () {
    const validatePass = (rule, value, callback) => {
      console.log(this.dataForm.num)
      if(Number(this.dataForm.num)>Number(this.allnum)&&this.dataForm.changeType==2){
         callback(new Error('调整数目不能大于库存'))
      }else{
        callback()
      }
    }
    return {
      // 规格列表
      Stocktype:[{val:1,title:'增加库存'},{val:2,title:'减少库存'}],
      allnum:'0',
      prodName:'',
      cover:'',
      rules:{
        num: [
          { required: true, message: '不能为空', trigger: ['blur', 'change'] },
           { required: true, trigger: 'blur', validator: validatePass }
        ],
      },
      skuId:'',
      dataForm:{
        pid:'',
        changeType:1,
        userType:1,
        operatorId:1,
        remark:'',
        num:''
      },
      // resourcesUrl: window.SITE_CONFIG.resourcesUrl
    }
  },
  components: {

  },
  props: {
    prodId: {
      required: true,
    },
    prodNum: {
      required: true,
    },
    prodSku: {
      required: true,
    },
  },
  computed: {
    defalutSku () {
      return this.$store.state.prod.defalutSku
    }
  },
  methods: {
    dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if(valid){
            const params =this.dataForm
            if(this.skuId!=''){
              console.log('修改sku库存')
              let pushparams={
                pid:params.pid,
                changeType:params.changeType,
                remark:params.remark,
                userType:1,
                operatorId:1,
                skuStockDtos:[{
                  skuId:this.skuId,
                  num:Number(params.num)
                }]
              }
              changeSkuDetilAPI(pushparams)
                .then(res => {
                    const response = res.data;
                    console.log(response)
                    if(response.code==200){
                      this.$message({
                        type: 'success',
                        message: '修改库存成功',
                      });
                      this.$emit('close-form')
                      this.$emit('finish-action')
                    }else{
                      this.errorMsg(response.message)
                    }
                })
                .catch(err => {
                    this.tableLoading = false;
                }) 
            }else{
              params.num=Number(params.num)
              changeProdDetilAPI(params)
                .then(res => {
                    const response = res.data;
                    if(response.code==200){
                      this.$message({
                        type: 'success',
                        message: '修改库存成功',
                      });
                      this.$emit('close-form')
                      this.$emit('finish-action')
                    }else{
                      errorMsg(response.message)
                    }
                })
                .catch(err => {
                    this.tableLoading = false;
                })     
            }
          }
        })
    },
    getProdDetail(id){
       getProdDetailAPI(id)
        .then(res => {
          const data = res.data.data;
          this.prodName=data.productName
          this.cover=data.cover
          console.log(data)
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
    this.dataForm.pid=this.prodId
    this.getProdDetail(this.prodId)
    this.allnum=this.prodNum
    if(this.prodSku!=0){
      this.skuId=this.prodSku
    }
    console.log(this.prodSku)
    console.log(this.prodNum)
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
.prod-img{
  max-width: 64px;
    min-width: 64px;
    width: 64px;
    height: 64px;
    line-height: 64px;
    border-radius: 4px;
}
.prod-detail{
  display: inline-block;
  margin-left: 10px;
  line-height: 24px;
}
</style>