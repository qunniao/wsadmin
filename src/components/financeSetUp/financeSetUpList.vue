/*
 * @Description: 财务设置
 * @Author: jian.weng
 * @Date: 2019-11-01 10:49:29
 */

<template>
    <div>
        <div class="header">
            <el-button type="primary" @click="addProtype">添加收款账户</el-button>
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
                label="账户类型"
                min-width="180">
                <template slot-scope="scope">
                    {{typelist[scope.row.type]}}
                </template>
                </el-table-column>
                <el-table-column
                prop="trueName"
                label="账户姓名"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="depositBank"
                label="开户行信息"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="account"
                label="收款账号"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="qrCode"
                label="收款二维码"
                min-width="180">
                <template slot-scope="scope">
                        <img class="qrcodeimg" :src="scope.row.qrCode">
                </template>
                </el-table-column>
                <el-table-column
                prop="gmtCreate"
                label="申请时间"
                min-width="180">
                </el-table-column>
                <el-table-column
                label="操作"
                min-width="300">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click='handleChange(scope.row.id)'
                            >修改</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            @click='handleDel(scope.row.id)'
                            >删除</el-button>
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
        <div>
            <el-dialog
            :title="this.isEdit ? '修改账户' : '添加账户'"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="60%">
                <second-index
                v-if="secondDepShow"
                :finance-id="financeId"
                @finish-action="getPayeeAccountsList"
                @close-form="secondDepShow = false"
                ></second-index>
            </el-dialog>
        </div>
    </div>
</template>

<script>
const SecondIndex = () => import('./financeSetUpInfo.vue');
import {
    getPayeeAccountsListAPI,
} from '@/api/financeAPI.js'

export default {
    name:'prodList',
    data(){
        return{
            form:{
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
            financeId:0,//分类ID
            secondDepShow:false,//产品1弹窗
        };
    },
    components:{
        // AddDepModal,
        SecondIndex
    },
    methods:{
        /*
         * 获取账户列表
         */
        getPayeeAccountsList() {
            const params = {...this.form};

            this.tableLoading = true;
            getPayeeAccountsListAPI(params)
                .then(res => {
                    const data = res.data.data;
                    this.totalCount = data.length;
                    this.tableData = data;
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
         * @msg: 新增账户
         * @param {type} 
         * @return: 
         */
        handleAddType(){
            this.financeId = 0;
            this.isEdit = false;
            this.secondDepShow = true;
        },
        /**
         * @msg: 修改账户
         * @param {Number} row  修改产品属性组
         */
        handleChange(changeid) {
            this.financeId = changeid;
            this.isEdit = false;
            this.secondDepShow = true;
        },
        /**
         * @msg: 删除账户
         * @param {Number} row  删除产品分类
         */
        handleDel(index){
            let delID = {
                pgids:index
            }
            // deleteGroupAPI(delID)
            //     .then(res => {
            //         const response = res.data;
            //         let status = 'success';

            //         if (response.code === 200) {
            //             this.getGroupList();
            //         } else {
            //             status = 'error';
            //         }
            //         this.$message({
            //             type: status,
            //             message: status === 'success' ? '删除成功！' : response.msg,
            //         })
            //     })
        },
        addProtype(){
            this.handleAddType()
        }
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

