/*
 * @Description: 换货审核
 * @Author: jian.weng
 * @Date: 2019-10-21 
 */

<template>
    <div>
        <div class="filter">
            <el-form class="fl-l" inline>
                <el-form-item label="个人信息">
                    <el-col :span="24">
                        <el-input v-model="keyword" placeholder="请输入名称或者电话" ></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary">查找</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changeshow">展开</el-button>
                </el-form-item>
                <div v-if="searchshow" >
                    <el-form-item label="换货单号：">
                        <el-col :span="24">
                            <el-input v-model="keyword" placeholder="请输换货单号" ></el-input>
                        </el-col>
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
                label="换货单号"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="peopleNum"
                label="申请人"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="使用商品"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="商品数量"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="更换商品"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="商品数量"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="支付金额"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="处理状态"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="时间"
                min-width="180">
                </el-table-column>
                <el-table-column
                label="操作"
                min-width="300">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            plain>修改</el-button>
                        <el-button
                            v-if="scope.row.subordinateDepartment.length > 0"
                            disabled
                            size="mini"
                            type="danger"
                            plain
                            >删除</el-button>
                        <el-button
                            v-else
                            size="mini"
                            type="danger"
                            plain>删除</el-button>
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
            shoptypelist:[
                {name:'全部',val:'1'},
                {name:'待付款',val:'2'},
                {name:'待审核',val:'3'},
                {name:'已通过',val:'4'},
                {name:'已驳回',val:'5'},
                {name:'已完成',val:'6'},
                {name:'已取消',val:'7'},
            ],
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
    margin-top: 20px;
    .action-export {
        position: absolute;
        top: 0;
        right: 0;
    }
}
    .header{
        display: flex;
        justify-content: space-between;
    }
    .header p{
        margin:20px;
    }
    .header button{
        margin: 10px
    }
</style>

