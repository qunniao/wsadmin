/*
 * @Description: 代理库存记录
 * @Author: jian.weng
 * @Date: 2018-11-01 10:49:29
 */

<template>
    <div>
        <div class="header">
            <el-button type="primary">导出</el-button>
        </div>
        <div class="filter">
            <el-form class="fl-l" inline>
                <el-form-item label="商品信息：">
                    <el-col :span="24">
                        <el-input v-model="keyword" placeholder="请输入商品名称" ></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changeshow">展开</el-button>
                </el-form-item>
                <div v-if="searchshow" >
                    <el-form-item label="个人信息：">
                        <el-col :span="24">
                            <el-input v-model="keyword" placeholder="请输入名称或者电话" ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="代理等级">
                        <el-select v-model="shopClassification" clearable placeholder="请选择等级" >
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
                    <el-form-item label="库存类型：">
                        <el-select v-model="ommodityType" clearable placeholder="请选择库存类型" >
                            <el-option
                            :value="1"
                            label="电商"
                            ></el-option>
                            <el-option
                            :value="0"
                            label="app"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="变更项：">
                        <el-select v-model="ommodityType" clearable placeholder="请选择变更项" >
                            <el-option
                            :value="1"
                            label="电商"
                            ></el-option>
                            <el-option
                            :value="0"
                            label="app"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择日期：">
                        <el-date-picker
                        v-model="value1"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="订单类型">
                        <el-select v-model="ommodityType" clearable placeholder="请选择订单类型" >
                            <el-option
                            :value="1"
                            label="电商"
                            ></el-option>
                            <el-option
                            :value="0"
                            label="app"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动类型">
                        <el-select v-model="ommodityType" clearable placeholder="请选择活动类型" >
                            <el-option
                            :value="1"
                            label="电商"
                            ></el-option>
                            <el-option
                            :value="0"
                            label="app"
                            ></el-option>
                        </el-select>
                    </el-form-item>
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
                label="个人信息"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="peopleNum"
                label="等级信息"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="商品信息"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="变更项"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="变更库存"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="当前库存数"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="库存类型"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="订单类型"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="活动类型"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="时间"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="说明"
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
            value1:'',
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

