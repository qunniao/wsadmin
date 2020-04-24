/*
 * @Description: 库存记录
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
                <el-form-item label="商品信息信息">
                    <el-col :span="24">
                        <el-input v-model="form.search" placeholder="请输入商品名称或者货号" ></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="getStockRecordList">查找</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changeshow">展开</el-button>
                </el-form-item>
                <div v-if="searchshow" >
                    <el-form-item label="变更项">
                        <el-select v-model="form.changeType" clearable placeholder="请选择" >
                            <el-option
                                v-for="item in statusSettleList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="选择日期">
                        <el-date-picker
                        v-model="value1"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="订单类型">
                        <el-select v-model="form.orderType" clearable placeholder="请选择归属类型" >
                            <el-option
                                v-for="item in ordertypeslist"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
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
                prop="productName"
                label="商品信息"
                min-width="360">
                    <template slot-scope="scope">
                        <img class="prod-img" :src="scope.row.cover">
                        <div class="prod-detail" :span="6">
                        <div>{{scope.row.productName}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="type"
                label="变更项"
                min-width="180">
                <template slot-scope="scope">
                    {{statusSettle[scope.row.type]}}
                </template>
                </el-table-column>
                <el-table-column
                prop="num"
                label="变更库存"
                min-width="180">
                <template slot-scope="scope">
                    {{changetypelist[scope.row.changeType]}}{{scope.row.num}}
                </template>
                </el-table-column>
                <el-table-column
                prop="stock"
                label="当前库存数"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="orderType"
                label="订单类型"
                min-width="180">
                <template slot-scope="scope">
                    {{orderTypelist[scope.row.orderType]}}
                </template>
                </el-table-column>
                <el-table-column
                prop="gmtCreate"
                label="时间"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="intro"
                label="说明"
                min-width="180">
                </el-table-column>
                <el-table-column
                label="操作"
                min-width="300">
                    <template>
                        <el-button
                            size="mini"
                            type="primary"
                            plain>详情规格</el-button>
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
     GetStockRecordListAPI,
} from '@/api/stockRecordAPI.js'
export default {
    name:'prodList',
    data(){
        return{
            form:{
                size:10,
                current :1,
                search: '',
                // changeType:'',
                // startTime:'',
                // endTime:'',
                // orderType:''
            },
            value1:[, ],
            ordertypeslist:[
                {value:1,name:"采购"},
                {value:2,name:"零售"},
                {value:3,name:"提货"},
                {value:4,name:"换货"},
            ],
            statusSettleList:[
                {value:1,name:"采购实体库存"},
                {value:2,name:"零售发货"},
                {value:3,name:"给下级发货"},
                {value:4,name:"云库存提货"},
                {value:5,name:"总部调整"},
                {value:6,name:"代理调整"},
                {value:7,name:"提货发货"},
                {value:8,name:"转采购发货"},
                {value:9,name:"云库存代发"},
                {value:10,name:"采购实体库存"},
                {value:11,name:"手动调整"},
                {value:12,name:"划拨"},
                {value:13,name:"实体商品换货"},
                {value:14,name:"云库存换货"},
                {value:15,name:"零售出库"}
            ],
            statusSettle: {
                1:"采购实体库存",
                2:"零售发货",
                3:"给下级发货",
                4:"云库存提货",
                5:"总部调整",
                6:"代理调整",
                7:"提货发货",
                8:"转采购发货",
                9:"云库存代发",
                10:"手动调整",
                11:"划拨",
                12:"实体商品换货",
                13:"云库存换货",
                14:"零售出库"
            },
            changetypelist:{
                1:'+',
                2:'-'
            },
            orderTypelist:{
                1:"采购",
                2:"零售",
                3:"提货",
                4:"换货"
            },
            shopClassification:'',
            ommodityType:'',
            searchshow:false,
            keyword:"",
            tableData:[],
            totalCount:0,
            tableLoading:false,
        };
    },
    components:{
        // AddDepModal,
    },
    methods:{
       
        /**
         * @msg: 翻页
         * @param {type} 
         * @return: 
         */
        handleSizeChange(cSize) {
            this.form.size = cSize;
            this.getStockRecordList();
        },
        changeshow(){
            console.log(123)
            this.searchshow=!this.searchshow
        },
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getStockRecordList();
        },
        // 查看规格
        handleChangeSkuStock(id){
            this.prodId=id,
            this.oneDepShow=true 
        },
        // 调整库存
        handleChangeStock(id,num){
            this.prodId=id
            this.prodNum=num
            this.secondDepShow=true 
        },
        // 调整规格库存
        handleChangeAllSkuStock(id){
             this.prodId=id
            this.threeDepShow=true 
        },
        getStockRecordList(){
            const params = {...this.form};
            if(this.value1[0]!=''&&this.value1[0]!=undefined&&this.value1[0]!=null){
                params.endTime=timeStamp2String(this.value1[1],2)
                params.startTime=timeStamp2String(this.value1[0],2)
            }
            this.tableLoading = true;
             GetStockRecordListAPI(params)
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
        this.getStockRecordList()
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

