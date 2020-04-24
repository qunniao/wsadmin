/*
 * @Description: 访客记录详情
 * @Author: jian.weng
 * @Date: 2019-10-29 10:49:29
 */

<template>
    <div> 
        <div class="table_body">
            <el-table
            :data="tableData"
            border
            size="medium "
            style="width: 100%">
                <el-table-column
                 prop="ip"
                label="访问IP"
                min-width="360">
                </el-table-column>
                <el-table-column
                label="最近访问小店"
                min-width="180">
                 <template>
                       <div>{{storeName}}</div>
                       <div>{{phone}}</div>
                </template>
                </el-table-column>
                <el-table-column
                label="小店归属"
                min-width="180">
                <template>
                       <div>{{nickname}}</div>
                       <div>{{phone}}</div>
                </template>
                </el-table-column>
                <el-table-column
                prop="gmtCreate"
                label="访问时间"
                min-width="180">
                <template slot-scope="scope">
                       <div>{{timechange(scope.row.gmtCreate,2)}}</div>
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
    </div>
</template>

<script>
import {
     timeStamp2String
} from '@/api/globalAPI.js'
import {
     getVistitorsDetailAPI,
} from '@/api/visitorsRecordAPI.js'
export default {
    name:'prodList',
    data(){
        return{
            form:{
                size:10,
                current:1,
                id:''
            },
            value1:[, ],
            ip:'',
            phone:'',
            nickname:'',
            storeName:'',
            tableData:[],
            totalCount:0,
            tableLoading:false,
        };
    },
    components:{
        // AddDepModal,
    },
    props: {
        visitorsId: {
            required: true,
        },
        visitorsPhone: {
            required: true,
        },
        visitorsNickname: {
            required: true,
        },
        visitorsStorename: {
            required: true,
        },
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
            this.getVisitorsRecordDetail();
        },
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getVisitorsRecordDetail();
        },
        getVisitorsRecordDetail(){
            const params = {...this.form};
            this.tableLoading = true;
             getVistitorsDetailAPI(params)
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
    mounted(){
        this.phone=this.visitorsPhone
        this.nickname=this.visitorsNickname
        this.storeName=this.visitorsStorename
        this.form.id=this.visitorsId
        this.getVisitorsRecordDetail()
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

