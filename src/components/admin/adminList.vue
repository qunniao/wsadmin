/*
 * @Description: 管理员列表
 * @Author: jian.weng
 * @Date: 2018-11-01 10:49:29
 */

<template>
    <div>
        <div class="header">
            <el-button type="primary" @click="handleSecondDepShow(0)">添加管理员</el-button>
        </div>
        <div class="table_body">
            <el-table
            :data="tableData"
            row-key="tid"
            border
            size="medium "
            style="width: 100%">
           
              <el-table-column
                prop="nickname"
                label="名称"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="手机号"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="roleName"
                label="角色"
                min-width="180">
                </el-table-column>
              
                <el-table-column
                prop="gmtCreate"
                label="创建时间"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="gmtModified"
                label="最近登录时间"
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
                            v-if="scope.row.roleId !=1" 
                            size="mini"
                            type="primary"
                            plain
                            @click='handleSetRole(scope.row.uid)'
                            >设置角色</el-button>
                        <el-button
                            v-if="scope.row.roleId !=1" 
                            size="mini"
                            type="danger"
                            plain
                            @click='handleDel(scope.row.uid)'
                            >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
           
        </div>
        <div>
            <el-dialog
            :title="this.isEdit ? '修改管理员' : '添加管理员'"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="60%">
                <second-index
                v-if="secondDepShow"
                :admin-id="adminId"
                @finish-action="getList"
                @close-form="secondDepShow = false"
                ></second-index>
            </el-dialog>

             <el-dialog
            :title="'设置角色'"
            :append-to-body="true"
            :visible.sync="setRoleDepShow"
            width="60%">
                <role-index
                v-if="setRoleDepShow"
                :admin-id="adminId"
                @finish-action="getList"
                @close-form="setRoleDepShow = false"
                ></role-index>
            </el-dialog>

        </div>
    </div>
</template>

<script>
const SecondIndex = () => import('./adminInfo.vue');
const RoleIndex = () => import('./adminRoleSet.vue');
import {
    getAdminListAPI,
    deleteAdminAPI
} from '@/api/adminApi.js'

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
            adminId:0,//管理员ID
            secondDepShow:false,//管理员添加修改弹窗
            setRoleDepShow:false//设置角色弹窗
        };
    },
    components:{
        // AddDepModal,
        SecondIndex,
        RoleIndex
    },
    methods:{
        /*
         * 获取管理员分类列表
         */
        getList() {
            const params = {...this.form};

            this.tableLoading = true;
            getAdminListAPI(params)
                .then(res => {
                    const data = res.data.data;
                    console.log("getAdminListAPI")
                    console.log(res)
                    this.totalCount = data.length;
                    this.tableData = data;
                    // this.tableLoading = false;
                })
                .catch(err => {
                    this.tableLoading = false;
                })
        },
       
       handleSecondDepShow(){
            this.secondDepShow = true;
            this.depId=0
            this.isEdit=false
        },
        /**
         * @msg: 修改
         * 
         */
        handleChange(changeid) {
            this.adminId = changeid;
            this.isEdit = false;
            this.secondDepShow = true;
        },
         handleSetRole(changeid){
            this.adminId = changeid;
            this.setRoleDepShow = true;
        },
        /**
         * @msg: 删除管理员
         * @param {Number} row  删除产品分类
         */
        handleDel(index){
             this.$confirm('确定进行删除操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               let delID = {
                uids:index
                }
                deleteAdminAPI(delID)
                    .then(res => {
                        const response = res.data;
                        let status = 'success';

                        if (response.code === 200) {
                            this.getList();
                        } else {
                            status = 'error';
                        }
                        this.$message({
                            type: status,
                            message: status === 'success' ? '删除成功！' : response.msg,
                        })
                    })
            }).catch(() => { })

            
        },
    },
    created(){
        this.getList()
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

