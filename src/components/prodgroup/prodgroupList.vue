/*
 * @Description: 产品属性组列表
 * @Author: jian.weng
 * @Date: 2018-11-01 10:49:29
 */

<template>
    <div>
        <div class="header">
            <p>产品属性组列表</p>
            <el-button type="primary" @click="addProtype">添加属性组</el-button>
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
                prop="title"
                label="属性组名称"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="属性项数"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="sort"
                label="关联的分类数"
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
                            @click='handleChange(scope.row.pgId)'
                            >修改</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            @click='handleDel(scope.row.pgId)'
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
            :title="this.isEdit ? '修改属性组' : '添加属性组'"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="60%">
                <second-index
                v-if="secondDepShow"
                :prodgroup-id="groupId"
                @finish-action="getGroupList"
                @close-form="secondDepShow = false"
                ></second-index>
            </el-dialog>
        </div>
    </div>
</template>

<script>
const SecondIndex = () => import('./prodgroupInfo.vue');
import {
    getProdGroupsListAPI,
    deleteGroupAPI
} from '@/api/prodGroupAPI.js'

export default {
    name:'prodList',
    data(){
        return{
            form:{
                size:10,
                current:1,
                sortType: 0,
            },
            tableData:[],
            totalCount:0,
            tableLoading:false,
            isEdit:false,//是否编辑
            groupId:0,//分类ID
            secondDepShow:false,//产品1弹窗
        };
    },
    components:{
        // AddDepModal,
        SecondIndex
    },
    methods:{
        /*
         * 获取产品属性组列表
         */
        getGroupList() {
            const params = {...this.form};

            this.tableLoading = true;
            getProdGroupsListAPI(params)
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
            this.form.limit = cSize;
            this.getGroupList();
        },
        
        handleCurrentChange(currentPage) {
            this.form.page = currentPage;
            this.getGroupList();
        },
        /**
         * @msg: 新增产品属性组
         * @param {type} 
         * @return: 
         */
        handleAddType(){
            this.groupId = 0;
            this.isEdit = false;
            this.secondDepShow = true;
        },
        /**
         * @msg: 修改产品属性组
         * @param {Number} row  修改产品属性组
         */
        handleChange(changeid, row) {
            this.groupId = changeid;
            this.isEdit = false;
            this.secondDepShow = true;
        },
        /**
         * @msg: 删除产品属性组
         * @param {Number} row  删除产品分类
         */
        handleDel(index){
            let delID = {
                pgids:index
            }
            deleteGroupAPI(delID)
                .then(res => {
                    const response = res.data;
                    let status = 'success';

                    if (response.code === 200) {
                        this.getGroupList();
                    } else {
                        status = 'error';
                    }
                    this.$message({
                        type: status,
                        message: status === 'success' ? '删除成功！' : response.msg,
                    })
                })
        },
        addProtype(){
            this.handleAddType()
        }
    },
    created(){
        this.getGroupList()
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

