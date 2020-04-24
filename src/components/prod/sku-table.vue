<template>
  <div class="mod-prod-sku-table">
    <el-form-item>
      <el-table
        :data="value"
        border
        style="width: 100%; margin-top: 20px"
         :span-method="tableSpanMethod">
        <el-table-column v-for="(leftTitle, index) in tableLeftTitles" :key="index" :label="leftTitle">
          <template slot-scope="scope">
            {{scope.row.properties.split(';')[index].split(':')[1]}}
          </template>
        </el-table-column>
        <el-table-column
          prop="productNumber"
          label="规格货号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productNumber" type="number" :disabled="!scope.row.status"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price" type="number" :disabled="!scope.row.status"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="weight"
          label="重量">
          <template slot-scope="scope">
            <el-input v-model="scope.row.weight" type="number" :disabled="!scope.row.status"></el-input>
          </template>
        </el-table-column>
        <el-table-column v-if="tableLeftTitles.length"
          prop="pic"
          label="sku图片"
          width="180">
          <template slot-scope="scope">
            <el-upload
              class="pic-uploader-component"
              action="http://admin.zhanchengwlkj.com:8080/derivative_system_backstage/file/addFile"
              :show-file-list="false"
              name="files"
              :on-success="(value)=> changeSkuCover(`${scope.$index}`,value)"
              :before-upload="beforeAvatarUpload">
              <img v-if="scope.row.pic" :src="scope.row.pic" class="pic">
              <i v-else class="el-icon-plus pic-uploader-icon"></i>
            </el-upload>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
  </div>
</template>

<script>
  // import PicUpload from '@/components/pic-upload'
  export default {
    data () {
      return {
        // 数据库中的规格
        dbSpecs: [],
        // 根据选定的规格所查询出来的规格值
        dbSpecValues: [],
        specs: [], // 使用的规格
        initing: false
      }
    },
    components: {
      // PicUpload
    },
    props: {
      value: {
        default: [],
        type: Array
      },
    },
    watch: {
    },
    // activated: function () {
    //   this.$emit('input', [Object.assign({}, this.defalutSku)])
    // },
    created: function () {
      // this.$http({
      //   url: this.$http.adornUrl(`/prod/spec/list`),
      //   method: 'get',
      //   params: this.$http.adornParams()
      // }).then(({data}) => {
      //   this.dbSpecs = data
      // })
    },
    computed: {
      tableLeftTitles () {
        let res = []
        for (let i = 0; i < this.skuTags.length; i++) {
          const skuTag = this.skuTags[i]
          res.push(skuTag.tagName)
        }
        return res
      },
      skuTags: {
        get () { return this.$store.state.prod.skuTags }
      },
      defalutSku () {
        return this.$store.state.prod.defalutSku
      }
    },
    methods: {
      init () {
        this.initing = true
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
      getTableSpecData () {
        return this.value
      },
      tableSpanMethod ({ row, column, rowIndex, columnIndex }) {

      },
      changeSkuCover(index,res){
        console.log(res)
        console.log(index)
        this.value[index].pic = res.data
        
      },
      changeSkuStatus (tagIndex) {
        this.value[tagIndex].status = this.value[tagIndex].status ? 0 : 1
      },
      skuAddProdName () {
        if (this.initing) {
          return
        }
        let skuList = []
        for (let i = 0; i < this.value.length; i++) {
          const sku = Object.assign({}, this.value[i])
          if (!sku.properties) {
            return
          }
          sku.skuName = ''
          let properties = sku.properties.split(';')
          for (const propertiesKey in properties) {
            sku.skuName += properties[propertiesKey].split(':')[1] + ' '
          }
          skuList.push(sku)
        }
        this.$emit('input', skuList)
      }
    }
  }
</script>

<style lang="scss">

  .mod-prod-sku-table{
    .pic-uploader-component .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      .pic-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
      }
      .pic {
        width: 120px;
        height: 120px;
        display: block;
      }
    }
    .pic-uploader-component .el-upload:hover {
      border-color: #409EFF;
    }
  }
</style>
