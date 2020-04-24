/*
 * @Description: 库存详情
 * @Author: jian.weng
 * @Date: 2018-11-01 10:49:29
 */

<template>
    <div>
        <div class="header">
            <p>库存详情</p>
            <el-button type="primary">新增商品库存</el-button>
        </div>
        <div class="filter">
            <el-form class="fl-l" inline>
                <el-form-item label="商品信息">
                    <el-col :span="24">
                        <el-input v-model="keyword" placeholder="请输入商品名称或者货号" ></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary">查找</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changeshow">展开</el-button>
                </el-form-item>
                <div v-if="searchshow" >
                    <el-form-item label="商品分类">
                        <el-select v-model="shopClassification" clearable placeholder="请选择" >
                            <el-option
                            :value="1"
                            label="普通"
                            ></el-option>
                            <el-option
                            :value="0"
                            label="会员"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div style="margin-bottom:10px">
                    <el-tag v-for="item in shoptypelist" :key="item.val" :class="{'active':item.val==shoptype}">{{item.name}}</el-tag>
                </div>
            </el-form>
        </div>        
        <div class="table_body">
            <el-table
            :data="tableData"
            border
            size="medium "
            style="width: 100%">
                <el-table-column
                prop="departmentName"
                label="商品名称"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="peopleNum"
                label="商品零售价"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="商品进货价"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="当前库存"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="商品总价"
                min-width="180">
                </el-table-column>
                <el-table-column
                label="操作"
                min-width="300">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            plain>库存调整</el-button>
                        <el-button
                            v-if="scope.row.subordinateDepartment.length > 0"
                            disabled
                            size="mini"
                            type="danger"
                            plain
                            >使用记录</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="table-footer--APP" slot="append">
                <el-pagination
                :current-page="form.page"
                :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90]"
                :page-size="form.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
// const SecondIndex = () => import('./prodInfo.vue');
export default {
    name:'prodList',
    data(){
        return{
            form:{
                limit:10,
                page:1,
                filters: '',
            },
            shoptypelist:[{name:'出售中',val:'1'},{name:'已经下架',val:'2'},{name:'库存预警',val:'3'}],
            shoptype:1,
            shopClassification:'',
            ommodityType:'',
            searchshow:false,
            keyword:"",
            tableData:[],
            totalCount:0,
            tableLoading:false,
            modalAddDepShow:false,//新增科室弹窗
            isEdit:false,//是否编辑
            depId:0,//科室ID
            secondDepShow:false,//产品1弹窗
        };
    },
    components:{
        // AddDepModal,
        // SecondIndex
    },
    methods:{
       
        /**
         * @msg: 翻页
         * @param {type} 
         * @return: 
         */
        handleSizeChange(cSize) {
            this.form.limit = cSize;
            this.getFirstDepList();
        },
        changeshow(){
            console.log(123)
            this.searchshow=!this.searchshow
        },
        handleCurrentChange(currentPage) {
            this.form.page = currentPage;
            this.getFirstDepList();
        },
    }
}
</script>

<style scoped lang="less">
.filter {
    padding-right: 130px;
    position: relative;
    margin-left: 20px;
    .action-export {
        position: absolute;
        top: 0;
        right: 0;
    }
}
</style>

