/*
 * @Description: 转账记录
 * @Author: jian.weng
 * @Date: 2019-11-01 10:49:29
 */

<template>
    <div>
        <div class="header">
            <el-button type="primary" >导出</el-button>
        </div>
        <div class="table_body">
            <el-table
            :data="tableData"
            row-key="tid"
            border
            size="medium "
            :tree-props="{children: 'productTypeList', hasChildren: 'hasChildren'}"
            style="width: 100%">
                <el-table-column
                prop="type"
                label="发起人"
                min-width="180">
                <template slot-scope="scope">
                    <div>姓名:{{scope.row.agentName}}</div>
                    <div>手机号:{{scope.row.agentPhone}}</div>
                </template>
                </el-table-column>
                <el-table-column
                prop="trueName"
                label="收款姓名"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="收款人手机"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="amount"
                label="金额"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="gmtCreate"
                label="转账时间"
                min-width="180">
                </el-table-column>
                <!-- <el-table-column
                label="操作"
                min-width="300">
                </el-table-column> -->
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
        <div>
        </div>
    </div>
</template>

<script>
import {
    getPayRecordListAPI,
} from '@/api/financeAPI.js'

export default {
    name:'prodList',
    data(){
        return{
            form:{
                current:1,
                size:10,
            },
            typelist:{
                1:"银行卡",
                2:"支付宝",
                3:"微信"
            },
            tableData:[],
            totalCount:0,
            tableLoading:false,
            isEdit:false,//是否编辑
        };
    },
    components:{
        // AddDepModal,
    },
    methods:{
        /*
         * 获取账户列表
         */
        getPayeeAccountsList() {
            const params = {...this.form};
            
            this.tableLoading = true;
            getPayRecordListAPI(params)
                .then(res => {
                    const data = res.data.data;
                    this.totalCount = data.total;
                    this.tableData = data.records;
                    this.tableLoading = false;
                })
                .catch(err => {
                    this.tableLoading = false;
                })
        },
        /**
         * @msg: 翻页
         * @param {type} 
         * @return: 
         */
        handleSizeChange(cSize) {
            this.form.size = cSize;
            this.getPayeeAccountsList();
        },
        
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getPayeeAccountsList();
        },
        /**
         * @msg: 删除账户
         * @param {Number} row  删除产品分类
         */
        handleDel(index){
            let delID = {
                pgids:index
            }
        },
    },
    created(){
        this.getPayeeAccountsList()
    }
}
</script>

<style scoped lang="less">
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
    .table_body{
        padding: 20px;
    }
    .addDep{
        margin-top: 20px;
    }
.img-upload {
    cursor: pointer;
    
    &:not(:first-child) {
        margin-left: 8px;
    }
}
.qrcodeimg{
    width: 100px;
    height: 100px;
}
.img-enlarge-wrapper {
    width: 100%;
    max-height: 500px;
    text-align: center;
    overflow: auto;

    img {
        width: 100%;
    }
}
</style>

