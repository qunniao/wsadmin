<template>
  <div class="mod-prod-info">
    <el-form :model="dataForm"
             ref="dataForm"
             :rules="rules"
             label-width="150px">
      <el-form-item label="商品名称:"
                    prop="productName"
                    :rules="[{ required: true, message: '商品名称不能为空'}]">
        <el-col :span="8">
          <el-input v-model="dataForm.productName"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="商品主图:" prop="picfile">
        <el-upload
            class="avatar-uploader"
            action="http://admin.zhanchengwlkj.com:8080/derivative_system_backstage/file/addFile"
            :show-file-list="false"
            :auto-upload="true"
            name="files"
            :on-success="uploadImg"
            :before-upload="beforeAvatarUpload">
            <img v-if="dataForm.cover" :src="dataForm.cover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品图片:">
       <el-upload
        action="http://admin.zhanchengwlkj.com:8080/derivative_system_backstage/file/addFile"
        list-type="picture-card"
        name='files'
        :file-list="dataForm.productImageDtos"
        :auto-upload="true"
        :on-success="uploadImgTwo"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      </el-form-item>
      <el-form-item label="商品货号:"
                    prop="productNumber"
                    :rules="[{ required: true, message: '商品货号不能为空'}]">
        <el-col :span="8">
          <el-input v-model="dataForm.productNumber"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="商品零售价:"
                    prop="price"
                    :rules="[{ required: true, message: '商品零售价不能为空'}]">
        <el-col :span="8">
          <el-input v-model="dataForm.price"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="商品市场价:"
                    prop="marketPrice"
                    :rules="[{ required: true, message: '商品市场价格不能为空'}]">
        <el-col :span="8">
          <el-input v-model="dataForm.marketPrice"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="进货价:"
                    prop="stockPrice">
        <el-col :span="8">
          <el-input v-model="dataForm.stockPrice"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="邀请奖励金额:"
                    prop="inviteReward">
        <el-col :span="8">
          <el-input v-model="dataForm.inviteReward"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="装箱数:"
                    prop="weight"
                    :rules="[{ required: true, message: '装箱数不能为空'}]">
        <el-col :span="8">
          <el-input v-model="dataForm.weight"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="（必选）商品分类:">
        <el-col :span="8">
          <el-button @click="handleSecondDepShow" type="primary">选择分类</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
          <el-tag
            v-for="item in shoptypelist"
            :key="item.tid"
            closable
            @close='delshoptype(item.tid)'
            >
            {{item.typeName}}
          </el-tag>
      </el-form-item>
      <el-form-item label="商品属性组:">
        <el-col :span="8">
          <el-button @click="handleAttributeDepShow" type="primary">选择属性组</el-button>
        </el-col>
      </el-form-item>
      <el-form-item >
        <el-col :span="8">
          <el-input v-model="attrtext"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
          <el-button @click="saveattrtext">添加</el-button>
      </el-form-item>
      <el-form-item
          v-for="(domain, index) in attributeDepList"
          :label="domain.name"
          :key="index"
          :rules="{
            required: true, message: '属性值不能为空', trigger: 'blur'
          }"
        >
        <el-col :span="8">
          <el-input v-model="domain.value"></el-input>
        </el-col>
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>
      <el-collapse  @change="handleChange">
        <el-collapse-item title="更多设置" name="1">
          <el-form-item label="下单时是否显示库存:">
            <el-radio-group v-model="dataForm.showStock">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商品排序:"
                    prop="sort">
            <el-col :span="8">
              <el-input v-model="dataForm.sort"
                        placeholder="请输入"
                        maxlength="50"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="基础销量:"
                    prop="sales">
            <el-col :span="8">
              <el-input v-model="dataForm.sales"
                        placeholder="请输入"
                        maxlength="50"></el-input>
            </el-col>
          </el-form-item>
          <!-- <el-form-item label="商品箱规设置:"
                    prop="units"
                    :rules="[{ required: true, message: '商品箱规不能为空'}]">
            <el-col :span="8">
              <el-button @click="handleSecondDepShow" type="primary">选择分类</el-button>
            </el-col>
          </el-form-item> -->
          <!-- 商品规格 -->
          <sku-tag ref="skuTag"
               @change="skuTagChangeSkuHandler"></sku-tag>
          <sku-table ref="skuTable"
                 v-model="skuList"
                 :prodName.sync="prodName"></sku-table>
        </el-collapse-item>
      </el-collapse>
      <div  class="mbline">运费模板</div>
      <el-form-item label="配送方式">
        <div >
          <el-radio v-model="dataForm.isUniformFreight" label="0">分别设置</el-radio>
          <el-form-item  label-width="180px" label="零售运费模板：">
            <el-select v-model="dataForm.retailFreightId" v-bind:disabled="dataForm.isUniformFreight==1"  placeholder="请选择">
              <el-option
                v-for="item in freightlist"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-top:10px" label-width="180px" label="代理运费模板：">
            <el-select v-model="dataForm.agentFreightId"  v-bind:disabled="dataForm.isUniformFreight==1" placeholder="请选择">
              <el-option
                v-for="item in freightlist"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-top:10px" label-width="180px" label="云仓库提货运费模板：">
            <el-select v-model="dataForm.cloudFreightId" v-bind:disabled="dataForm.isUniformFreight==1" placeholder="请选择">
              <el-option
                v-for="item in freightlist"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-radio v-model="dataForm.isUniformFreight" label="1">统一设置</el-radio>
          <el-form-item label-width="180px" label="设置：">
            <el-select v-model="allfreight"  placeholder="请选择">
              <el-option
                v-for="item in freightlist"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form-item>
      <div  class="mbline">上下架/其他</div>
      <el-form-item label-width="180px" label="代理方式：" prop="checkList">
          <el-checkbox-group v-model="dataForm.checkList"  >
                <el-checkbox label="物流进货"  ></el-checkbox>
                <el-checkbox label="云仓库储货" ></el-checkbox>
          </el-checkbox-group>
      </el-form-item>
      <el-form-item label-width="180px" label="上架时间">
          <el-radio v-model="shopup" label="1">立即上架</el-radio>
          <el-radio v-model="shopup" label="2">定时上架</el-radio>
          <el-radio v-model="shopup" label="3">暂不上架</el-radio>
          <el-form-item  v-if="shopup==2">
            <el-date-picker
              v-model="dataForm.putawayTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
      </el-form-item>
      <el-form-item v-if="shopup!=3" label-width="180px" label="定时下架">
          <el-radio v-model="shopdown" label="1">是</el-radio>
          <el-radio v-model="shopdown" label="2">否</el-radio>
          <el-form-item  v-if="shopdown==1">
            <el-date-picker
              v-model="dataForm.soldoutTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
      </el-form-item>
      <el-form-item  label="商品详情：">
          <div id="editorElem"  style="text-align:left"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="dataFormSubmit()">确定</el-button>
      </el-form-item>
       <el-dialog
            title="商品分类"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="60%">
                <second-index
                v-if="secondDepShow"
                @changetype="changeshoptype"
                :prodtype-list="shoptypelist"
                @close-form="secondDepShow = false"
                ></second-index>
        </el-dialog>
        <el-dialog
            title="商品属性组"
            :append-to-body="true"
            :visible.sync="AttributeDepShow"
            width="60%">
                <attribute-index
                v-if="AttributeDepShow"
                @changeattrlist="changeattrlist"
                @close-form="AttributeDepShow = false"
                ></attribute-index>
        </el-dialog>
    </el-form>
  </div>
</template>

<script>
const AttributeIndex = () => import('./shopAttribute.vue');
const SecondIndex = () => import('./shoptype.vue');
import {
  getProdDetailAPI,
  getTemplateListAPI,
  pushProdDataAPI,
  putProdDataAPI
}from '@/api/productApi.js'
import axios from 'axios';
import { treeDataTranslate, idList } from '@/utils'
import E from 'wangeditor';
import SkuTable from './sku-table'
import SkuTag from './sku-tag'
export default {
   name:'editor',
  data () {
    return {
      // 分类树展示与回显
      transportId: null,
      shopid:0,
      shopup:'1',
      shopdown:'1',
      value1:'',
      attrtext:'',
      attributeDepList:[],
      category: {
        list: [],
        selected: [],
        props: {
          value: 'categoryId',
          label: 'categoryName'
        }
      },
      rules: {
        checkList: [
                { type: 'array', required: true, message: '请选择代理购买方式', trigger: 'change' }
              ],
        picfile: [ 
            { required: true, message: '请上传图片' }          
          ]
      },
      fileList:[],
      freightlist:[],
      allfreight:'',
      AttributeDepShow:false,
      secondDepShow:false,
      imageShowUrl:'',
      // 规格列表
      shoptypelist:[],
      skuList:[],
      prodName:'',
      dialogImageUrl: '',
      dialogVisible: false,
      dataForm: {
        checkList:[],
        productType:0,
        sid:0,
        productNumber:'',
        productName: '',
        cover:'',
        productIntro:'',
        price:'',
        inviteReward:'',
        marketPrice:'',
        weight:'',
        stockPrice:'',
        isUniformFreight:'0',
        showStock:1,
        content:'',
        retailFreightId:'',
        agentFreightId:'',
        cloudFreightId:'',
        sales:'',
        agentBuy:'',
        sort:'',
        putawayTime:'',
        soldoutTime:'',
        typeIds:[],
        productParams:[],
        units:[],
        standardDtos:[],
        productImageDtos:[]
      },
      tags: [],
      // resourcesUrl: window.SITE_CONFIG.resourcesUrl
    }
  },
  components: {
    SkuTable,
    SkuTag,
    SecondIndex,
    AttributeIndex
  },
  props: {
    depId: {
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
    // 获取分类数据
    getDataList () {
     
    },
    handleRemove(file, fileList) {
      for(let i=0;i<this.dataForm.productImageDtos.length;i++){
        if(file.url==this.dataForm.productImageDtos[i].url){
          this.dataForm.productImageDtos.splice(i,1)
        }
      }
    },
    uploadImgTwo(res){
      this.dataForm.productImageDtos.push({
        sort:0,
        url:res.data
      })
    },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
    removeDomain(item) {
        for(let j=0;j<this.attributeDepList.length;j++){
          if(this.attributeDepList[j].name==item.name){
            this.attributeDepList.splice(j,1)
          }
        }
      },
    delshoptype(deltid){
     for(let i=0;i<this.shoptypelist.length;i++){
       if(this.shoptypelist[i].tid==deltid){
         this.shoptypelist.splice(i,1)
       }
     }
    },
    saveattrtext(){
      let isokpush =true;
      for(let j=0;j<this.attributeDepList.length;j++){
          if(this.attributeDepList[j].name==this.attrtext){
            isokpush=false
            this.$message({
              type: 'error',
              message: '不能添加已有属性值',
            });
          }
      }
      if(isokpush){
        if(this.attrtext!=''){
            this.attributeDepList.push({
            name:this.attrtext,
            value:''
          })
          
          this.attrtext=''
        }else{
          this.$message({
              type: 'error',
              message: '属性值不能为空',
            });
        }
      }
    },
    changeshoptype(typelist){
      this.shoptypelist=typelist
    },
    changeattrlist(attrlist){
      let attribute =attrlist.split(',')
      for(let i=0;i<attribute.length;i++){
        let ischeck=true
        for(let j=0;j<this.attributeDepList.length;j++){
          if(this.attributeDepList[j].name==attribute[i]){
            ischeck=false
          }
        }
        if(ischeck){
          this.attributeDepList.push({name:attribute[i],value:''})
        }
      }
    },
    handleChange(){
      
    },
    handleSecondDepShow(){
      this.secondDepShow = true;
    },
    handleAttributeDepShow(){
      this.AttributeDepShow=true
    },
    uploadImg(res){
      this.dataForm.cover = res.data;
      this.imageShowUrl=res.data
      this.rules.picfile = [{ required: true, message: '请上传图片' }] 
      if (this.dataForm.cover!='') {
        this.rules.picfile = []
      }
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
    // 获取分类信息
    getCategoryList () {
    },
    // 选择分类改变事件
    handleCategoryChange (val) {
      this.dataForm.categoryId = val[val.length - 1]
    },
    // 表单提交
    dataFormSubmit () {
          let that=this;
        this.$refs['dataForm'].validate((valid) => {
          if(valid){
            if(this.shoptypelist.length<1){
              this.$message({
                type: 'error',
                message: '产品分类不能为空',
              });
              return false
            }
            const pushdata =this.dataForm
            if(this.dataForm.checkList.length==0){
              pushdata.agentBuy=0
            }else if(this.dataForm.checkList.length==2){
              pushdata.agentBuy=3
            }else{
              if(this.dataForm.checkList[0]=='物流进货'){
                pushdata.agentBuy=1
              }else{
                pushdata.agentBuy=2
              }
            }
            if(this.shopup==1){
              pushdata.putawayTime=0
              if(this.shopdown==2){
                pushdata.soldoutTime=0
              }
            }else if(this.shopup==3){
              pushdata.putawayTime=0
              pushdata.soldoutTime=0
            }else{
              if(this.shopdown==2){
                pushdata.soldoutTime=0
              }
            }
            pushdata.standardDtos=[]
            pushdata.productGuigeNames=[]
            if(this.skuList.length>0){
               let skuguigelist =this.skuList[0].properties.split(';')
               if(skuguigelist.length==1){
                 pushdata.productGuigeNames.push({
                   gname:skuguigelist[0],
                   lvevl:1
                 })
               }else{
                  pushdata.productGuigeNames.push({
                   gname:skuguigelist[0],
                   lvevl:1
                 },{
                   gname:skuguigelist[1],
                   lvevl:2
                 })
               }
            }
            for(let i=0;i<this.skuList.length;i++){
              let skulistdata={
                sp1:'',
                sp2:'',
                productNumber:'',
                price:'',
                weight:'',
                pic:''
              }
              let skulistsplist =this.skuList[i].properties.split(';')
              if(skulistsplist.length<=1){
                  skulistdata.sp1=skulistsplist[0].split(':')[1]
                  skulistdata.productNumber=this.skuList[i].productNumber
                  skulistdata.weight=this.skuList[i].weight
                  skulistdata.price=this.skuList[i].price
                  skulistdata.pic=this.skuList[i].pic
              }else{
                  skulistdata.sp1=skulistsplist[0].split(':')[1]
                  skulistdata.sp2=skulistsplist[1].split(':')[1]
                  skulistdata.productNumber=this.skuList[i].productNumber
                  skulistdata.weight=this.skuList[i].weight
                  skulistdata.price=this.skuList[i].price
                  skulistdata.pic=this.skuList[i].pic
              }
              pushdata.standardDtos.push(skulistdata)
            }
            pushdata.typeIds=[]
            for(let i=0;i<this.shoptypelist.length;i++){
              pushdata.typeIds.push(this.shoptypelist[i].tid)
            }
            if(this.dataForm.isUniformFreight==2){
              pushdata.retailFreightId=this.allfreight
              pushdata.agentFreightId=this.allfreight
              pushdata.cloudFreightId=this.allfreight
            }
            pushdata.productType=1
            if(this.shopid!=0){
              const putdata={
                pid:this.shopid,
                productType:1,
                productNumber:pushdata.productNumber,
                cover:pushdata.cover,
                productName:pushdata.productName,
                productIntro:'',
                price:pushdata.price,
                isUniformFreight:pushdata.isUniformFreight,
                marketPrice:pushdata.marketPrice,
                weight:pushdata.weight,
                showStock:pushdata.showStock,
                content:pushdata.content,
                retailFreightId:pushdata.retailFreightId,
                agentFreightId:pushdata.agentFreightId,
                cloudFreightId:pushdata.cloudFreightId,
                sales:pushdata.sales,
                sort:pushdata.sort,
                inviteReward:pushdata.inviteReward,
                stockPrice:pushdata.stockPrice,
                putawayTime:pushdata.putawayTime,
                soldoutTime:pushdata.soldoutTime,
                typeIds:pushdata.typeIds,
                productParams:pushdata.productParams,
                units:pushdata.units,
                standardDtos:pushdata.standardDtos,
                productImageDtos:pushdata.productImageDtos,
              }
              putProdDataAPI(putdata)
                .then(res => {
                    const sucresponse = res.data;
                    if(sucresponse.code==200){
                      this.$message({
                        type: 'success',
                        message: '修改产品成功',
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
              pushProdDataAPI(pushdata)
                .then(res => {
                    const response = res.data;
                    if(response.code==200){
                      this.$message({
                        type: 'success',
                        message: '添加产品成功',
                      });
                      this.$emit('close-form')
                      this.$emit('finish-action')
                    }else{
                      this.errorMsg(response.message)
                    }
                })
                .catch(err => {
                  console.log(err)
                    this.tableLoading = false;
                })            
            }
          }
         
        })
    },
    paramSetPriceAndStocks (param) {
      
    },
    skuTagChangeSkuHandler (skuList) {
      const prodName = this.prodName
      skuList.forEach(sku => {
        if (sku.properties) {
          sku.skuName = ''
          let properties = sku.properties.split(';')
          for (const propertiesKey in properties) {
            sku.skuName += properties[propertiesKey].split(':')[1] + ' '
          }
          sku.prodName = prodName + ' ' + sku.skuName
        }
      })
      this.skuList = skuList
    },
    getproddetail(id){
      getProdDetailAPI(id)
        .then(res => {
          const data = res.data.data;
          this.dataForm=data
          this.dataForm.productImageDtos=data.productImageList
          this.rules.picfile = [{ required: true, message: '请上传图片' }] 
          if (this.dataForm.cover!='') {
            this.rules.picfile = []
          }
          if(data.agentBuy=0){
              this.dataForm.checkList=[]
          }else if(data.agentBuy=3){
              this.dataForm.checkList=["物流进货","云仓库储货"]
          }else{
              if( data.agentBuy=1){
                this.dataForm.checkList=["物流进货"]
              }else{
                this.dataForm.checkList=["云仓库储货"]
              }
          }
          this.shoptypelist=data.productTypeList
          this.dataForm.isUniformFreight=data.isUniformFreight
          this.attributeDepList=data.productParamList
          let skulistData =data.productSkuList
          let skunamelist =data.productGuigeNameList
          for(let i=0;i<skulistData.length;i++){
            let skulistpushdata ={
              pic: "",
              price: 0,
              prodName: " 标签值 二级标签值 ",
              productNumber: 0,
              properties: "一级标签:标签值;二级标签:二级标签值",
              skuName: "标签值 二级标签值 ",
              status: 1,
              weight: 0,
            }
            skulistpushdata.pic=skulistData[i].pic
            skulistpushdata.price=skulistData[i].price
            skulistpushdata.weight=skulistData[i].weight
            skulistpushdata.productNumber=skulistData[i].productNumber
            if(skunamelist.length==2){
              skulistpushdata.properties=skunamelist[0].gname+':'+skulistData[i].sp1+';'+skunamelist[1].gname+':'+skulistData[i].sp2
              skulistpushdata.skuName=skulistData[i].sp1 + ' '+skulistData[i].sp2
              skulistpushdata.prodName=' '+skulistData[i].sp1 + ' '+skulistData[i].sp2+' '
            }else{
               skulistpushdata.skuName=skulistData[i].sp1
               skulistpushdata.properties=skunamelist[0].gname+':'+skulistData[i].sp1
               skulistpushdata.skuName=skulistData[i].sp1
               skulistpushdata.prodName=' '+skulistData[i].sp1
            }
            this.skuList.push(skulistpushdata)
          }
          if(data.status==-1){
              this.shopup="3"
            }else{
              if(data.putawayTime==0){
                this.shopup="1"
                if(data.soldoutTime!=0){
                  this.shopdown="1"
                }else{
                  this.shopdown="2"
                }
              }else{
                this.shopup="2"
                if(data.soldoutTime!=0){
                  this.shopdown="1"
                }else{
                  this.shopdown="2"
                }
              }
            }

            var editor = new E('#editorElem')
            editor.customConfig.onchange = (html) => {
              this.dataForm.content = html
            }
            editor.customConfig.customUploadImg = (files, insert) => {
              const formData = new FormData();
              formData.append('files', files[0]);
               axios.post("http://admin.zhanchengwlkj.com:8080/derivative_system_backstage/file/addFile", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data"
                  }
                }).then(res => {
                  let { data } = res
                  insert(data.data)  
                  // 插入图片到editor
                });
              // formData.append('path', 'files/ne-icev3-dashboard/content/content/');
              
            };
            editor.customConfig.uploadImgShowBase64 = true //图片以base64形式保存
            editor.create()
            editor.txt.html(this.dataForm.content)
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
    getfreightlist(){
        const getTempParam = {
          current:1,
          size:100
        };
        getTemplateListAPI(getTempParam)
            .then(res => {
                const response = res.data.data.records;
                this.freightlist =response
            })
            .catch(err => {
                this.tableLoading = false;
            })
    }
  },
  mounted() {
        //wangEditor自带方法
        if(this.depId!=0){
          this.shopid=this.depId
          this.getproddetail(this.depId)
        }else{
            var editor = new E('#editorElem')
            editor.customConfig.uploadImgShowBase64 = true //图片以base64形式保存
            editor.customConfig.onchange = (html) => {
              this.dataForm.content = html
            }
            editor.customConfig.customUploadImg = (files, insert) => {
              const formData = new FormData();
              formData.append('files', files[0]);
               axios.post("http://admin.zhanchengwlkj.com:8080/derivative_system_backstage/file/addFile", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data"
                  }
                }).then(res => {
                  let { data } = res
                  insert(data.data)  
                  // 插入图片到editor
                });
              // formData.append('path', 'files/ne-icev3-dashboard/content/content/');
              
            };
            editor.customConfig.uploadImgShowBase64 = true //图片以base64形式保存
            editor.create()
        }
        this.getfreightlist()
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