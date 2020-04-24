/*
 * @Description: 加盟店管理员列表
 * @Author: jian.weng
 * @Date: 2018-11-01 10:49:29
 */

<template>
    <div>
        <div class="header">
            <p>加盟店管理员列表</p>
            <el-button type="primary" @click="handleAddType(0)">添加管理员</el-button>
        </div>
        <div class="table_body">
            <el-table
            :data="tableData"
            row-key="tid"
            border
            size="medium "
            style="width: 100%">
                <el-table-column
                prop="trueName"
                label="姓名"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="nickname"
                label="昵称"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="cover"
                label="头像"
                min-width="180">
                <template slot-scope="scope">
                        <img v-if="scope.row.cover" class="img-upload" :src="scope.row.cover" height="20" width="50" @click="hangdleEnlargeImg(scope.row.signatureImg)" />
                        <p v-else>
                            -
                        </p>
                    </template>
                </el-table-column>
                <el-table-column
                prop="phone"
                label="手机号"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="sort"
                label="下级加盟店"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="sort"
                label="奖励积分"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="gmtCreate"
                label="创建时间"
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
                            @click='handleChange(scope.row.uid)'
                            >修改</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            @click='handleDel(scope.row.uid)'
                            >删除</el-button>
                    </template>
                </el-table-column>
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
            <el-dialog
            :title="this.isEdit ? '修改管理员' : '添加管理员'"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="60%">
                <second-index
                v-if="secondDepShow"
                :franchise-id="franchiseId"
                @finish-action="getFranchiseList"
                @close-form="secondDepShow = false"
                ></second-index>
            </el-dialog>
        </div>
    </div>
</template>

<script>
const SecondIndex = () => import('./franchisedStoreAdministratorsInfo.vue');
import {
    getFranchisedListAPI,
    deleteFranchiseAPI
} from '@/api/franchiseStoreAdministrators.js'

export default {
    name:'prodList',
    data(){
        return{
            form:{
                size:10,
                current:1,
            },
            tableData:[],
            totalCount:0,
            tableLoading:false,
            isEdit:false,//是否编辑
            franchiseId:0,//管理员ID
            secondDepShow:false,//管理员添加修改弹窗
        };
    },
    components:{
        // AddDepModal,
        SecondIndex
    },
    methods:{
        /*
         * 获取管理员分类列表
         */
        getFranchiseList() {
            const params = {...this.form};

            this.tableLoading = true;
            getFranchisedListAPI(params)
                .then(res => {
                    const data = res.data.data;
                    console.log(data)
                    this.totalCount = data.length;
                    this.tableData = data;
                    // this.tableLoading = false;
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
            this.getFranchiseList();
        },
        
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getFranchiseList();
        },
        /**
         * @msg: 新增管理员分类
         * @param {type} 
         * @return: 
         */
        handleAddType(typeids){
            this.franchiseId = typeids;
            this.isEdit = false;
            this.secondDepShow = true;
        },
        /**
         * @msg: 修改产品分类
         * @param {Number} row  修改科室的信息
         */
        handleChange(changeid) {
            this.franchiseId = changeid;
            this.isEdit = false;
            this.secondDepShow = true;
        },
        /**
         * @msg: 删除管理员
         * @param {Number} row  删除产品分类
         */
        handleDel(index){
            let delID = {
                uids:index
            }
            deleteFranchiseAPI(delID)
                .then(res => {
                    const response = res.data;
                    let status = 'success';

                    if (response.code === 200) {
                        this.getFranchiseList();
                    } else {
                        status = 'error';
                    }
                    this.$message({
                        type: status,
                        message: status === 'success' ? '删除成功！' : response.msg,
                    })
                })
        },
    },
    created(){
        this.getFranchiseList()
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

