/*
 * @Description: 角色列表
 * @Author: jian.weng
 * @Date: 2018-11-01 10:49:29
 */

<template>
    <div>
        <div class="header">
            <p>角色列表</p>
            <el-button type="primary" @click="handleSecondDepShow(0)">添加角色</el-button>
        </div>
        <div class="table_body">
            <el-table
            :data="tableData"
            row-key="tid"
            border
            size="medium "
            style="width: 100%">
            <el-table-column
                prop="id"
                label="ID"
                min-width="80">
                </el-table-column>
            <el-table-column
                prop="roleName"
                label="角色名称"
                min-width="180">
                </el-table-column>
              
                <el-table-column
                prop="note"
                label="备注"
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
                            type="primary"
                            plain
                            @click='handleSetPower(scope.row.id)'
                            >设置权限</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            @click='handleDel(scope.row.id)'
                            >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
           
        </div>
        <div>
            <el-dialog
            :title="this.isEdit ? '修改角色' : '添加角色'"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="60%">
                <second-index
                v-if="secondDepShow"
                :update-id="updateId"
                @finish-action="getList"
                @close-form="secondDepShow = false"
                ></second-index>
            </el-dialog>

            <el-dialog
            :title="'设置角色权限'"
            :append-to-body="true"
            :visible.sync="setPowerDepShow"
            width="60%">
                <power-index
                v-if="setPowerDepShow"
                :role-id="roleId"
                @finish-action="getList"
                @close-form="setPowerDepShow = false"
                ></power-index>
            </el-dialog>
            
        </div>
    </div>
</template>

<script>
const SecondIndex = () => import('./adminRoleInfo.vue');
const PowerIndex = () => import('./adminRoleSetPower.vue');
import {
    getAdminRoleListAPI,
    deleteAdminRoleAPI
} from '@/api/adminRoleApi.js'

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
            updateId:0,//修改ID
            secondDepShow:false,//管理员添加修改弹窗
            setPowerDepShow:false,//设置权限弹窗
            roleId:0
        };
    },
    components:{
        // AddDepModal,
        SecondIndex,
        PowerIndex
    },
    methods:{
        /*
         * 获取管理员分类列表
         */
        getList() {
            const params = {...this.form};

            this.tableLoading = true;
            getAdminRoleListAPI(params)
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
         * @msg: 修改
         * 
         */
        handleChange(changeid) {
            this.updateId = changeid;
            this.isEdit = false;
            this.secondDepShow = true;
        },
       handleSecondDepShow(){
            this.secondDepShow = true;
            this.depId=0
            this.isEdit=false
        },
       handleSetPower(changeid){
            this.roleId = changeid;
            this.setPowerDepShow = true;
        },
       

        /**
         * @msg: 删除
         * 
         */
        handleDel(index){
            this.$confirm('确定进行删除操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               let delID = {
                ids:index
            }
            deleteAdminRoleAPI(delID)
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

