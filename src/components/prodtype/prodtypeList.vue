/*
 * @Description: 产品分类列表
 * @Author: jian.weng
 * @Date: 2018-11-01 10:49:29
 */

<template>
    <div>
        <div class="header">
            <p>产品分类列表</p>
            <el-button type="primary" @click="addProtype">添加分类</el-button>
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
                prop="typeName"
                label="分类"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="cover"
                label="分类图片"
                min-width="180">
                <template slot-scope="scope">
                        <img v-if="scope.row.cover" class="img-upload" :src="scope.row.cover" height="20" width="50" @click="hangdleEnlargeImg(scope.row.signatureImg)" />
                        <p v-else>
                            -
                        </p>
                    </template>
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="商品数量"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="sort"
                label="排序"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="isHidden"
                label="是否隐藏"
                min-width="180">
                <template slot-scope="scope">
                        <!-- 是否隐藏 0-显示 1-隐藏 -->
                        {{
                            {
                                0: '显示',
                                1: '隐藏',
                            }[scope.row.isHidden]
                        }}
                    </template>
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
                            @click='handleChange(scope.row.tid,scope.row.pid)'
                            >修改</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            @click='handleDel(scope.row.tid)'
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
            :title="this.isEdit ? '修改分类' : '添加分类'"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="60%">
                <second-index
                v-if="secondDepShow"
                :prodtype-id="typeId"
                :prodtype-level="levelId"
                :prodchange-type="changtype"
                @finish-action="getProdtypeList"
                @close-form="secondDepShow = false"
                ></second-index>
            </el-dialog>
        </div>
    </div>
</template>

<script>
const SecondIndex = () => import('./prodtypeInfo.vue');
import {
    getProdtypeLISTAPI,
    deleteProdtypeAPI
} from '@/api/inventoryRecordAPI.js'

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
            typeId:0,//分类ID
            levelId:1,
            changtype:1,
            secondDepShow:false,//产品1弹窗
        };
    },
    components:{
        // AddDepModal,
        SecondIndex
    },
    methods:{
        /*
         * 获取产品分类列表
         */
        getProdtypeList() {
            const params = {...this.form};

            this.tableLoading = true;
            getProdtypeLISTAPI(params)
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
            this.getProdtypeList();
        },
        
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getProdtypeList();
        },
        /**
         * @msg: 新增产品分类
         * @param {type} 
         * @return: 
         */
        handleAddType(typeids,levelids){
            this.typeId = typeids;
            this.levelId=levelids;
            this.changtype=1;
            this.isEdit = false;
            this.secondDepShow = true;
        },
        /**
         * @msg: 修改产品分类
         * @param {Number} row  修改科室的信息
         */
        handleChange(changeid, row) {
            if(row==0){
                this.levelId=1;
            }else{
                this.levelId=2;
            }
            this.typeId = changeid;
            this.changtype=2;
            this.isEdit = false;
            this.secondDepShow = true;
        },
        /**
         * @msg: 删除产品分类
         * @param {Number} row  删除产品分类
         */
        handleDel(index){
            let delID = {
                tids:index
            }
            deleteProdtypeAPI(delID)
                .then(res => {
                    const response = res.data;
                    let status = 'success';

                    if (response.code === 200) {
                        this.getProdtypeList();
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
            this.handleAddType(0,1)
            // this.secondDepShow = true;
        }
    },
    created(){
        this.getProdtypeList()
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

