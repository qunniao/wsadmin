<!-- 系统内容入口 -->
<template>
    <div>
        <el-tree
        :data="shoptypeform"
        show-checkbox
        label="typeName"
        node-key="tid"
        :props="defaultProps"
        ref="tree2"
        :default-checked-keys="nonechecklist"
        @check-change="handleCheckChange">
        </el-tree>
        <el-button @click="savestoptype">保存</el-button>
    </div>
</template>

<script>
import {
     getProdtypeCheckLISTAPI
} from '@/api/productApi.js'

export default {
    name: "",
    data(){
        return{
            nonechecklist:[],
            shoptypeform:[],
            defaultProps: {
                children: 'productTypeList',
                label: 'typeName'
            }
        };
    },
    components: {
        
    },
     props: {
        prodtypeList: {
            required: true,
        },
    },
    methods: {
    // 获取分类数据
        getshoptypelist (typelistdata) {
            getProdtypeCheckLISTAPI()
                .then(res => {
                    const data = res.data.data;
                    for(let i=0;i<typelistdata.length;i++){
                        this.nonechecklist.push(typelistdata[i].tid)
                    }
                    this.shoptypeform=data
                })
                .catch(err => {
                    this.tableLoading = false;
                })
        },
        savestoptype(){
            this.$emit('changetype', this.$refs.tree2.getCheckedNodes())
            this.$emit('close-form')
        },
        handleCheckChange(data, checked, indeterminate) {
            // console.log(data, checked, indeterminate);
        },
  },
   mounted() {
      this.getshoptypelist(this.prodtypeList)
      console.log(this.prodtypeList)
    },
};
</script>

<style lang="less">
</style>

<style scoped="scoped" lang="less">
</style>