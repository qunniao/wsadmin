/*
 * @Description: 钱包收支明细
 * @Author: jian.weng
 * @Date: 2019-11-01 10:49:29
 */

<template>
    <div>

        <div class="filter">
            <el-form class="fl-l" style="margin-left:20px;margin-top:20px;" inline>
                <el-form-item label="代理编号:">
                    <el-col :span="24">
                        <el-input v-model="form.agentId" placeholder="请输入代理编号" ></el-input>
                    </el-col>
                </el-form-item>

                    <el-form-item label="交易状态:">
                        <el-select v-model="form.inOut" clearable placeholder="请选择" >
                            <el-option
                            :value="1"
                            label="收入"
                            ></el-option>
                            <el-option
                            :value="0"
                            label="支出"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="getBalanceAccountsList">查找</el-button>
                </el-form-item>
                 
                    
                  
                  
              
                <div style="margin-bottom:10px">
                    <el-tag v-for="item in shoptypelist" @click='changesearchtype(item.val)' :key="item.val" :class="{'active':item.val==form.orderState}">{{item.name}}</el-tag>
                </div>
            </el-form>
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
                prop="agentId"
                label="代理编号"
                min-width="80">
                </el-table-column>
                <el-table-column
                prop="trueName"
                label="代理名称"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="tradeDesc"
                label="描述"
                min-width="200">
                </el-table-column>
                <el-table-column
                prop="balance"
                label="交易后余额"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="amount"
                label="交易金额"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="tradeType"
                label="交易类型"
                min-width="180">
                    <template slot-scope="scope">
                        {{typelist[scope.row.inOut]}}
                    </template>
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
                :current-page="form.current"
                :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90]"
                :page-size="form.size"
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
    getBalanceRecordListAPI,
} from '@/api/financeAPI.js'

export default {
    name:'prodList',
    data(){
        return{
            form:{
                current:1,
                size:10,
                inOut:'',
                agentId:''
            },
            typelist:{
                1:"收入",
                0:"支出"
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
        getBalanceAccountsList() {
            const params = {...this.form};
            
            this.tableLoading = true;
            getBalanceRecordListAPI(params)
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
            this.getBalanceAccountsList();
        },
        
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getBalanceAccountsList();
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
        this.getBalanceAccountsList()
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

