<!-- 系统内容入口 -->
<template>
    <div>
        <div>
            <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="item in shoptypeform" :label="item.title"  :key='item.pgid'>{{item.title}}</el-checkbox>
            </el-checkbox-group>
        </div>
        <el-button @click="savestopattribute">保存</el-button>
    </div>
</template>

<script>
import {
     getProdattributeCheckLISTAPI
} from '@/api/productApi.js'

export default {
    name: "",
    data(){
        return{
            checkList:[],
            shoptypeform:[],
            params: {
                province: [],
                checked: {}
            },
        };
    },
    components: {
    },
    methods: {
    // 获取分类数据
    getattributelist () {
        console.log('属性组')
     getProdattributeCheckLISTAPI()
                .then(res => {
                    const data = res.data.data;
                    // for(let i=0;i<data.length;i++){
                    //     data[i].ischeck=false
                    // }
                    this.shoptypeform=data
                })
                .catch(err => {
                    this.tableLoading = false;
                })
    },
    savestopattribute(){
        let savecheckdata = this.checkList
        let saveattrdata =this.shoptypeform
        let addname =''
        console.log(savecheckdata)
        for(let i=0;i<savecheckdata.length;i++){
            for(let j=0;j<saveattrdata.length;j++){
                if(savecheckdata[i]==saveattrdata[j].title){
                    if(i==0){
                        addname+=saveattrdata[j].names
                    }else{
                        addname+=','+saveattrdata[j].names
                    }
                }
            }
        }
        this.$emit('changeattrlist',addname)
        this.$emit('close-form')
    }
  },
   mounted() {
      this.getattributelist()
},
};
</script>

<style lang="less">
</style>

<style scoped="scoped" lang="less">
</style>