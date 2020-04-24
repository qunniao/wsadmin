/*
 * @Description: 代理信息
 * @Author: jian.weng
 * @Date: 2019-10-29 10:49:29
 */

<template>
    <div>
        <div class="header">
            <el-button type="primary" @click="exportExcel">导出</el-button>
             <!-- <el-button type="primary">新增</el-button> -->
        </div>
        <div class="filter">
            <el-form class="fl-l" inline>
                <el-form-item label="代理信息:">
                    <el-col :span="24">
                        <el-input v-model="form.search" placeholder="姓名、手机号、微信昵称搜索" ></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item>
                    <el-button @click="getStockList" type="primary">查找</el-button>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="primary" @click="changeshow">展开</el-button>
                </el-form-item> -->
                <div v-if="searchshow" >
                    <el-form-item label="代理微信:">
                            <el-input v-model="keyword" placeholder="代理微信号搜索" ></el-input>
                    </el-form-item>
                    <el-form-item label="代理等级:">
                        <el-select v-model="shopClassification" clearable placeholder="全部等级" >
                            
                        </el-select>
                    </el-form-item>
                    <el-form-item label="代理状态:">
                        <el-select v-model="shopClassification" clearable placeholder="全部状态" >
                            
                        </el-select>
                    </el-form-item>
                    <el-form-item label="身份证:">
                            <el-input v-model="keyword" placeholder="请输入身份证" ></el-input>
                    </el-form-item>
                    <el-form-item label="营业执照:">
                        <el-select v-model="shopClassification" clearable placeholder="全部状态" >
                            
                        </el-select>
                    </el-form-item>
                    <el-form-item label="加入时间:">
                        <el-date-picker
                        v-model="value1"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="业绩筛选">
                        <el-col :span="8">
                            <el-input v-model="form.minStore" placeholder="输入数字" ></el-input>
                        </el-col>
                        <el-col class="line" style="text-align:center" :span="2">~</el-col>
                       <el-col :span="8">
                            <el-input v-model="form.maxStore" placeholder="输入数字" ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="代理地区:">
                        <el-select v-model="shopClassification" clearable placeholder="全部状态" >
                            
                        </el-select>
                    </el-form-item>
                    <el-form-item label="余额筛选">
                        <el-col :span="8">
                            <el-input v-model="form.minStore" placeholder="输入数字" ></el-input>
                        </el-col>
                        <el-col class="line" style="text-align:center" :span="2">~</el-col>
                       <el-col :span="8">
                            <el-input v-model="form.maxStore" placeholder="输入数字" ></el-input>
                        </el-col>
                    </el-form-item>
                </div>
                <!-- <div style="margin-bottom:10px">
                    <el-tag v-for="item in shoptypelist" @click='changesearchtype(item.val)' :key="item.val" :class="{'active':item.val==form.statusType}">{{item.name}}{{item.nownum!=''?item.nownum:'0'}}</el-tag>
                </div> -->
            </el-form>
        </div>        
        <div class="table_body">
            <el-table
            :data="tableData"
            border
            id="exportTab"
            size="medium "
            style="width: 100%">
                <el-table-column
                prop="nickname"
                label="个人信息"
                min-width="360">
                    <template slot-scope="scope">
                        <div @click="changeagentdetail(scope.row.id)">{{scope.row.nickname}}</div>
                        <div>{{scope.row.phone}}</div>
                        <div>{{scope.row.gmtCreate}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="agentLevel"
                label="等级信息"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="nickname"
                label="微信昵称"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="lockStock"
                label="邀请人"
                min-width="180">
                 <template slot-scope="scope">
                        <div>{{scope.row.inviterNick}}</div>
                        <div>{{scope.row.inviterPhone}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="excessStock"
                label="上级"
                min-width="180">
                    <template slot-scope="scope">
                        <div>{{scope.row.superiorNick}}</div>
                        <div>{{scope.row.superiorPhone}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="incomeBalance"
                label="余额"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="excessStock"
                label="身份"
                min-width="180">
                    <template slot-scope="scope">
                        <div>{{scope.row.levelId==9?'加盟商':scope.row.levelId==8?'VIP':'未知'}}</div>
                    </template>
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
                            @click="changeagentye(scope.row.id)">修改余额</el-button>
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
                :page-size="form.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
                </el-pagination>
            </div>
             <el-dialog
            title="代理详细信息"
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
            <el-dialog
            title="余额详情"
            :append-to-body="true"
            :visible.sync="threeDepShow"
            width="80%">
                <three-index
                :agent-id="agentId"
                v-if="threeDepShow"
                @finish-action="getStockList"
                @close-form="threeDepShow = false"
                ></three-index>
            </el-dialog>
        </div>
    </div>
</template>

<script>
const SecondIndex = () => import('./agentInformationInfo.vue');
const ThreeIndex = () => import('./agentyetz.vue');
import {
     getAgentInfoListAPI,
     delAngetuserAPI
} from '@/api/agentInformationApi.js'
import FileSaver from 'file-saver'

import XLSX from 'xlsx'
export default {
    name:'prodList',
    data(){
        return{
            form:{
                size:10,
                current:1,
                search: '',
                // statusType:'1'
            },
            agentId:'',
            reviewedList:{
                1:'审核通过',
                0:'未通过'
            },
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
            threeDepShow:false
        };
    },
    components:{
        SecondIndex,
        ThreeIndex
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
            console.log(123)
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
        // 导出表格
        exportExcel () {
             /* generate workbook object from table */
            var xlsxParam = { raw: true } // 导出的内容只做解析，不进行格式转换
            var wb = XLSX.utils.table_to_book(document.querySelector('#exportTab'), xlsxParam)

            /* get binary string as output */
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '代理信息表.xlsx')
            } catch (e) {
                if (typeof console !== 'undefined') {
                console.log(e, wbout)
                }
            }
            return wbout
        },
        changeagentdetail(id){
            this.secondDepShow=true
            this.agentId=id
        },
        changeagentye(id){
            console.log('点击修改')
            this.threeDepShow=true
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

