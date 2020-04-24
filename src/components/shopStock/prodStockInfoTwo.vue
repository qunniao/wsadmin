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
      <el-form-item label="增减方式：">
         <el-radio v-model="changshowtype" label="1">按规格调整</el-radio>
         <el-radio v-model="changshowtype" label="2">统一调整</el-radio>
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
      <div v-if="changshowtype==1">  
        <el-form-item  v-for="(item,index) in skuStockList" :key="index" :label="item.sp1+item.sp2"
                  >
          <el-col :span="8">
            <el-input  v-enter-number v-model="item.value"
                      placeholder="请输入"
                      type="number">
                      ></el-input>
          </el-col>
          <div>可用库存:{{item.availableStock}}</div>
        </el-form-item>
      </div>
      <div v-if="changshowtype==2">
        <el-form-item  label="调整数量:"
                      prop="allchangenum">
          <el-col :span="8">
            <el-input  v-enter-number v-model="dataForm.allchangenum"
                      placeholder="请输入"
                      type="number">
                      ></el-input>
          </el-col>
        </el-form-item>
      </div>
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
  getProdSkuStockListAPI,
  changeSkuDetilAPI
} from '@/api/productStockApi.js'
export default {
   name:'editor',
  data () {
    const validatePass = (rule, value, callback) => {
      if(Number(this.dataForm.allchangenum)>Number(this.allnum)&&this.dataForm.changeType==2&&this.changshowtype==2){
         callback(new Error('调整数目不能大于库存'))
      }else{
        callback()
      }
    }
    return {
      // 规格列表
      Stocktype:[{val:1,title:'增加库存'},{val:2,title:'减少库存'}],
      prodName:'',
      changshowtype:'1',
      cover:'',
      allnum:'',
      rules:{
        allchangenum: [
          { required: true, message: '不能为空', trigger: ['blur', 'change'] },
           { required: true, trigger: 'blur', validator: validatePass }
        ],
      },
      skuStockList:[],
      skuId:'',
      dataForm:{
        allchangenum:'',
        pid:'',
        changeType:1,
        userType:1,
        operatorId:1,
        remark:'',
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
              let pushparams={
                pid:params.pid,
                changeType:params.changeType,
                remark:params.remark,
                userType:1,
                operatorId:1,
                skuStockDtos:[]
              }
              console.log(this.allnum)
              for(let i=0;i<this.skuStockList.length;i++){
                pushparams.skuStockDtos.push({
                  skuId:this.skuStockList[i].skuId,
                  num:Number(this.skuStockList[i].value)
                })
              }
              if(this.changshowtype==2){
                  for(let i=0;i<pushparams.skuStockDtos.length;i++){
                    pushparams.skuStockDtos.num=params.allchangenum
                  }
              }
              console.log(pushparams)
              changeSkuDetilAPI(pushparams)
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
                      this.errorMsg(response.message)
                    }
                })
                .catch(err => {
                    this.tableLoading = false;
                }) 
          }
        })
    },
    getProdDetail(id){
      const params ={
        current :1,
        size:10,
        pid:id
      }
       getProdSkuStockListAPI(params)
        .then(res => {
          const data = res.data.data;
          this.prodName=data.product_name
          this.cover=data.cover
          this.allnum=data.available_stock
          let skulistdata=data.skuStock.records
          for(let i=0;i<skulistdata.length;i++){
            skulistdata[i].value=''
          }
          this.skuStockList=skulistdata
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