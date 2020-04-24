/*
 * @Description: 代理加入审核
 * @Author: jian.weng
 * @Date: 2019-10-29 10:49:29
 */

<template>
    <div>
        <div class="header">
            <el-button type="primary">导出</el-button>
        </div>
        <div class="filter">
            <el-form class="fl-l" inline>
                <el-form-item label="订单号:">
                    <el-col :span="24">
                        <el-input v-model="keyword" placeholder="请输入订单号" ></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary">查找</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changeshow">展开</el-button>
                </el-form-item>
                <div v-if="searchshow" >
                    <el-form-item label="打款单号">
                        <el-input v-model="keyword" placeholder="姓名、手机、微信昵称搜索" ></el-input>
                    </el-form-item>
                </div>
                <div style="margin-bottom:10px">
                    <el-tag v-for="item in shoptypelist" @click='changesearchtype(item.val)' :key="item.val" :class="{'active':item.val==form.statusType}">{{item.name}}{{item.nownum!=''?item.nownum:'0'}}</el-tag>
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
                prop="orderType"
                label="个人信息"
                min-width="360">
                    <template slot-scope="scope">
                        <div>{{scope.row.nickname}}</div>
                        <div>{{scope.row.phone}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="applyInfo"
                label="申请信息"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="inviterNick"
                label="邀请人"
                min-width="180">
                <template slot-scope="scope">
                    {{scope.row.inviterNick?scope.row.inviterNick:'总部'}}
                    {{scope.row.inviterPhone}}
                </template>
                </el-table-column>
                <el-table-column
                prop="gmtCreate"
                label="申请时间"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="remitAccount"
                label="加入状态"
                min-width="180">
                <template slot-scope="scope">
                    {{statusList[scope.row.status]}}
                </template>
                </el-table-column>
                <el-table-column
                prop="payeeAccount"
                label="代理时间"
                min-width="180">
                </el-table-column>
                <el-table-column
                label="操作"
                min-width="300">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.status==0||scope.row.status==1||scope.row.status==2"
                            size="mini"
                            type="primary"
                            @click="paymentAuditIsNO(scope.row.id)"
                            plain>驳回</el-button>
                        <el-button
                            v-if="scope.row.status==0||scope.row.status==1||scope.row.status==2"
                            size="mini"
                            type="primary"
                            @click="paymentAuditIsOk(scope.row.id)"
                            plain>通过</el-button>
                        <!-- <el-button
                            size="mini"
                            type="primary"
                            @click="handleChangePatmentDetail(scope.row.id)"
                            plain>查看凭证</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="table-footer--APP" slot="append">
                <el-pagination
                :current-page="form.page"
                :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90]"
                :page-size="form.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
                </el-pagination>
            </div>
            <el-dialog
            title="提示"
            :append-to-body="true"
            :visible.sync="modelExamine"
            width="400px">
                <div class="form-examine">
                    <p class="msg-danger color-red">是否拒绝该申请</p>
                    <div class="wrapper-examine-option">
                        <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="notext">
                        </el-input>
                        <el-button type="primary"  @click="checnoOk">确认</el-button>
                        <el-button @click="closeExamineForm">取消</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
// const SecondIndex = () => import('./paymentAuditInfo.vue');
import {
     getAgentDepListAPI,
     checkagentOkAPI,
     checkagentNoAPI
} from '@/api/agentAduitAPI.js'
export default {
    name:'prodList',
    data(){
        return{
            form:{
                current:1,
                size:10,
            },
            paymentId:'',
            secondDepShow:false,
            statusList:{
                0:"未审核",
                1:"资料审核",
                2:"付款审核",
                3:"审核通过",
                4:"已拒绝"
            },
            reviewStateList:{
                0:'待审核',
                1:'审核通过',
                2:'已拒绝'
            },
            notext:'',
            noid:'',
            shoptypelist:[{name:'资料审核',val:'1',nownum:''},{name:'付款审核',val:'2',nownum:''},{name:'完成审核',val:'3',nownum:''},{name:'已拒绝',val:'4',nownum:''},{name:'全部申请',val:'5',nownum:''}],
            shoptype:1,
            searchshow:false,
            keyword:"",
            tableData:[],
            totalCount:0,
            tableLoading:false,
            modelExamine: false,
        };
    },
    components:{
        // SecondIndex
    },
    methods:{
       
        /**
         * @msg: 翻页
         * @param {type} 
         * @return: 
         */
        handleSizeChange(cSize) {
            this.form.size = cSize;
            this.getAgentList();
        },
        closeExamineForm(){
            this.modelExamine=false
            this.notext=''
            this.noid=''
        },
        paymentAuditIsOk(id){
            const params={
                id:id,
            }
            checkagentOkAPI(params)
                .then(res => {
                    const response = res.data;
                    if(response.code==200){
                      this.$message({
                        type: 'success',
                        message: '通过审核成功',
                      });
                      this.getAgentList()
                    }else{
                      this.errorMsg(response.message)
                    }
                })
                .catch(err => {
                    this.tableLoading = false;
                })
            console.log(params)
        },
        checnoOk(){
            const params={
                id:this.noid,
                refuseReason:this.notext
            }
            checkagentNoAPI(params)
                .then(res => {
                    const response = res.data;
                    if(response.code==200){
                      this.$message({
                        type: 'success',
                        message: '已驳回该审核',
                      });
                      this.modelExamine=false
                    }else{
                      this.errorMsg(response.message)
                    }
                })
                .catch(err => {
                    this.tableLoading = false;
                })
        },
        errorMsg (message) {
            this.$message({
                message: message,
                type: 'error',
                duration: 1500
            })
        },
        paymentAuditIsNO(id){
            this.modelExamine=true
            this.noid=id
        },
        handleChangePatmentDetail(id){
            console.log(id)
            this.paymentId=id;
            this.secondDepShow=true
        },
        changeshow(){
            console.log(123)
            this.searchshow=!this.searchshow
        },
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getAgentList();
        },
        getAgentList(){
            const params = {...this.form};
            this.tableLoading = true;
             getAgentDepListAPI(params)
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
        this.getAgentList()
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

