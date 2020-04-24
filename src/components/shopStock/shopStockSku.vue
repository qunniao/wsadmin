/*
 * @Description: 库存管理
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
                label="商品信息"
                min-width="360">
                    <template slot-scope="scope">
                        <img class="prod-img" :src="scope.row.pic">
                        <div class="prod-detail" :span="6">
                        <div>{{productName}}</div>
                        <div>分类：</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="totalStock"
                label="总库存"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="availableStock"
                label="可用库存"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="lockStock"
                label="锁定库存"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="excessStock"
                label="超额库存"
                min-width="180">
                </el-table-column>
                <el-table-column
                label="操作"
                min-width="300">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleChangeStock(scope.row.skuId,scope.row.availableStock)"
                            plain>调整库存</el-button>
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
            <el-dialog
            title="调整商品库存"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="80%">
                <second-index
                :prod-id="prodId"
                :prod-num="prodNum"
                :prod-sku="skuid"
                v-if="secondDepShow"
                @finish-action="getStockList"
                @close-form="secondDepShow = false"
                ></second-index>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {
     getProdSkuStockListAPI,
} from '@/api/productStockApi.js'
const SecondIndex = () => import('./prodStockInfo.vue');
export default {
    name:'prodList',
    data(){
        return{
            form:{
                current :1,
                size:10,
                pid:''
            },
            productName:'',
            tableData:[],
            totalCount:0,
            tableLoading:false,
            prodId:0,//产品ID
            skuid:0,
            prodNum:'',
            secondDepShow:false,//调整库存弹窗
        };
    },
    components:{
        // AddDepModal,
        SecondIndex
    },
    props:{
         prodIds: {
            required: true,
        },
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
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getStockList();
        },
        handleChangeStock(id,num){
            this.skuid=id
            this.prodNum=num
            this.secondDepShow=true 
        },
        getStockList(){
            const params = {...this.form};
            this.tableLoading = true;
             getProdSkuStockListAPI(params)
                .then(res => {
                    const data = res.data.data;
                    this.totalCount = data.skuStock.totalCount;
                    this.tableData = data.skuStock.records;
                    this.productName=data.product_name
                    this.tableLoading = false;
                })
                .catch(err => {
                    this.tableLoading = false;
                })
        }
    },
    mounted(){
        console.log(this.prodIds)
        this.prodId=this.prodIds
        this.form.pid=this.prodIds
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

