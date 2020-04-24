/*
 * @Description: 会员列表
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
                <!-- <el-form-item label="访客信息">
                    <el-col :span="24">
                        <el-input v-model="form.name" placeholder="请输入商品名称或者货号" ></el-input>
                    </el-col>
                </el-form-item>
                 <el-form-item label="访问时间">
                        <el-date-picker
                        v-model="value1"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getVisitorsRecordList">查找</el-button>
                </el-form-item> -->
            </el-form>
        </div>        
        <div class="table_body">
            <el-table
            :data="tableData"
            border
            size="medium "
            style="width: 100%">
                <el-table-column
                prop="productName"
                label="会员"
                min-width="360">
                    <template slot-scope="scope">
                        <img class="prod-img" :src="scope.row.cover">
                        <div class="prod-detail" :span="6">
                        <div>{{scope.row.username}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="ip"
                label="数据"
                min-width="180">
                <template>
                   <div>累计消费金额:</div>
                   <div>累计成功交易笔数:</div>
                </template>
                </el-table-column>
                <el-table-column
                prop="region"
                label="地区"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="num"
                label="最近消费时间"
                min-width="180">
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
        </div>
    </div>
</template>

<script>
import {
     timeStamp2String
} from '@/api/globalAPI.js'
import {
     getVistitorsListAPI,
} from '@/api/visitorsRecordAPI.js'
export default {
    name:'prodList',
    data(){
        return{
            form:{
                size:10,
                current:1,
                // name:'',
                // startTime:'',
                // endTime:'',
            },
            value1:[, ],
            id:'',
            ip:'',
            phone:'',
            nickname:'',
            storeName:'',
            tableData:[],
            totalCount:0,
            tableLoading:false,
            secondDepShow:false
        };
    },
    components:{
    },
    methods:{
        /**
         * @msg: 时间处理
         * @param {type} 
         * @return: 
         */
        timechange(time,type){
            return timeStamp2String(time,type)
        },
        /**
         * @msg: 翻页
         * @param {type} 
         * @return: 
         */
        handleSizeChange(cSize) {
            this.form.size = cSize;
            this.getVisitorsRecordList();
        },
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getVisitorsRecordList();
        },
        showVisitorsDetail(id,phone,nickname,storeName){
            this.id=id;
            this.phone=phone
            this.nickname=nickname
            this.storeName=storeName
            this.secondDepShow=true
        },
        getVisitorsRecordList(){
            const params = {...this.form};
            if(this.value1[0]!=''&&this.value1[0]!=undefined&&this.value1[0]!=null){
                params.endTime=timeStamp2String(this.value1[1],2)
                params.startTime=timeStamp2String(this.value1[0],2)
            }
            this.tableLoading = true;
             getVistitorsListAPI(params)
                .then(res => {
                    const data = res.data.data;
                    console.log(data.records)
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
        this.getVisitorsRecordList()
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

