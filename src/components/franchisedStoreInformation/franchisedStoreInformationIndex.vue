/*
 * @Description: 加盟店信息
 * @Author: jian.weng
 * @Date: 2019-10-29 10:49:29
 */

<template>
    <div>
        <!-- <div class="header"> -->
            <!-- <el-button type="primary">导出</el-button> -->
        <!-- </div> -->
        <div class="filter" style="margin-top:20px">
            <el-form class="fl-l" inline>
                <el-form-item>
                    <el-button type="primary" @click="changeagentdetail(-1)">新增</el-button>
                </el-form-item>
                <el-form-item label="代理信息:">
                    <el-col :span="24">
                        <el-input v-model="form.search" placeholder="姓名、手机号、微信昵称搜索" ></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button @click="getStockList" type="primary">查找</el-button>
                </el-form-item>
            </el-form>
        </div>        
        <div class="table_body">
            <el-table
            :data="tableData"
            border
            size="medium "
            style="width: 100%">
                <el-table-column
                prop="trueName"
                label="加盟店信息"
                min-width="300">
                    <template slot-scope="scope">
                        <div @click="changeagentdetail(scope.row.id)">店主姓名:{{scope.row.trueName}}</div>
                        <div>加盟店名称:{{scope.row.storeName }}</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="inviterNick"
                label="邀请人信息"
                min-width="300">
                    <template slot-scope="scope">
                        <div>邀请人姓名:{{scope.row.inviterNick}}</div>
                        <div>邀请人手机号:{{scope.row.inviterPhone}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="phone"
                label="电话"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="lockStock"
                label="加盟店管理员信息"
                min-width="180">
                 <template slot-scope="scope">
                        <div>管理员姓名:{{scope.row.adminName}}</div>
                        <div>手机号:{{scope.row.adminPhone}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="monthPrice"
                label="最近30天进货金额"
                min-width="180">
                <template slot-scope="scope">
                        <div>{{scope.row.monthPrice?scope.row.monthPrice:'0.00'}}</div>
                </template>
                </el-table-column>
                <el-table-column
                prop="totalPrice"
                label="总进货金额"
                min-width="180">
                 <template slot-scope="scope">
                        <div>{{scope.row.totalPrice?scope.row.totalPrice:'0.00'}}</div>
                </template>
                </el-table-column>
                <el-table-column
                prop="gmtCreate"
                label="加入时间"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="reviewed"
                label="审核状态"
                min-width="180">
                    <template slot-scope="scope">
                        <div>{{reviewedList[scope.row.reviewed]}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                label="操作"
                min-width="300">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            v-if="scope.row.reviewed==1"
                            plain
                            @click="changeagentdetail(scope.row.id)">修改</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="delangetuser(scope.row.id)">删除</el-button>    
                    </template>
                </el-table-column>
            </el-table>
            <div class="table-footer--APP" slot="append">
                <el-pagination
                :current-page="form.current"
                :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90]"
                :page-size="form.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
                </el-pagination>
            </div>
            <el-dialog
            title="加盟店信息"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="80%">
                <second-index
                :agent-id="agentId"
                v-if="secondDepShow"
                @finish-action="getStockList"
                @close-form="secondDepShow = false"
                ></second-index>
            </el-dialog>
          
        </div>
    </div>
</template>

<script>
const SecondIndex = () => import('./franchisedStoreInformationInfo.vue');
import {
     getAgentInfoListAPI,
     delAngetuserAPI
} from '@/api/agentInformationApi.js'
export default {
    name:'prodList',
    data(){
        return{
            form:{
                size:10,
                current:1,
                levelId:9,
                search:''
            },
            reviewedList:{
                1:'审核通过',
                0:'未通过'
            },
            agentId:'',
            value1:[,],
            shoptypelist:[{name:'出售中',val:'1',nownum:''},{name:'已下架',val:'2',nownum:''},{name:'库存预警',val:'3',nownum:''}],
            shoptype:1,
            shopClassification:'',
            ommodityType:'',
            searchshow:false,
            keyword:"",
            tableData:[],
            totalCount:0,
            tableLoading:false,
            secondDepShow:false,
          
        };
    },
    components:{
        SecondIndex,
    },
    methods:{
       
        /**
         * @msg: 翻页
         * @param {type} 
         * @return: 
         */
        handleSizeChange(cSize) {
            this.form.size = cSize;
            this.getStockList();
        },
        changeshow(){
            this.searchshow=!this.searchshow
        },
        delangetuser(id){
            this.$confirm('确定要删除该用户么？（此操作不可逆）', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    delAngetuserAPI(id)
                    .then(res => {
                        if(res.data.code === 200){
                            this.$message({
                                type: 'success',
                                message: '该用户已经删除',
                            });
                            this.getStockList()
                        }else{
                            this.$message.error(res.data.msg)
                        }                   
                    })
                    .catch(err => {
                    })
                })
        },
        changeagentdetail(id){
            this.secondDepShow=true
            this.agentId=id
        },
       
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getStockList();
        },
        getStockList(){
            const params = {...this.form};
            this.tableLoading = true;
             getAgentInfoListAPI(params)
                .then(res => {
                    const data = res.data.data;
                    this.totalCount = data.total;
                    this.tableData = data.records;
                    this.tableLoading = false;
                })
                .catch(err => {
                    this.tableLoading = false;
                })
        }
    },
    created(){
        this.getStockList()
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
.prod-img{
  max-width: 64px;
    min-width: 64px;
    width: 64px;
    height: 64px;
    line-height: 64px;
    border-radius: 4px;
}
.prod-detail{
  display: inline-block;
  margin-left: 10px;
  line-height: 24px;
}
</style>

