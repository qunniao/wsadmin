/*
 * @Description: 库存管理
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
                <el-form-item label="商品信息">
                    <el-col :span="24">
                        <el-input v-model="keyword" placeholder="请输入商品名称或者货号" ></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary">查找</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changeshow">展开</el-button>
                </el-form-item>
                <div v-if="searchshow" >
                    <el-form-item label="商品分类">
                        <el-select v-model="shopClassification" clearable placeholder="请选择等级" >
                            
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品类型">
                        <el-select v-model="ommodityType" clearable placeholder="请选择归属类型" >
                            <el-option
                            :value="1"
                            label="电商"
                            ></el-option>
                            <el-option
                            :value="0"
                            label="app"
                            ></el-option>
                        </el-select>
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
                prop="productName"
                label="商品信息"
                min-width="360">
                    <template slot-scope="scope">
                        <img class="prod-img" :src="scope.row.cover">
                        <div class="prod-detail" :span="6">
                        <div>{{scope.row.productName}}</div>
                        <div>分类：{{scope.row.typeName}}</div>
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
                            v-if="scope.row.isSku"
                            size="mini"
                            type="primary"
                            @click="handleChangeSkuStock(scope.row.pid)"
                            plain>查看规格</el-button>
                        <el-button
                            v-if="scope.row.isSku"
                            size="mini"
                            type="primary"
                            @click="handleChangeAllSkuStock(scope.row.pid)"
                            plain>调整库存</el-button>
                        <el-button
                            v-else
                            size="mini"
                            type="primary"
                            @click="handleChangeStock(scope.row.pid,scope.row.availableStock)"
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
                :prod-sku='0'
                v-if="secondDepShow"
                @finish-action="getStockList"
                @close-form="secondDepShow = false"
                ></second-index>
            </el-dialog>
            <el-dialog
            title="商品库存"
            :append-to-body="true"
            :visible.sync="oneDepShow"
            width="80%">
                <one-index
                :prod-ids="prodId"
                v-if="oneDepShow"
                @finish-action="getStockList"
                @close-form="oneDepShow = false"
                ></one-index>
            </el-dialog>
            <el-dialog
            title="调整商品库存"
            :append-to-body="true"
            :visible.sync="threeDepShow"
            width="80%">
                <three-index
                :prod-id="prodId"
                v-if="threeDepShow"
                @finish-action="getStockList"
                @close-form="threeDepShow = false"
                ></three-index>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {
     getProductsStockListAPI,
} from '@/api/productStockApi.js'
const SecondIndex = () => import('./prodStockInfo.vue');
const OneIndex = () => import('./shopStockSku.vue');
const ThreeIndex = () => import('./prodStockInfoTwo.vue');
export default {
    name:'prodList',
    data(){
        return{
            form:{
                size:10,
                current:1,
                filters: '',
                statusType:'1'
            },
            shoptypelist:[{name:'出售中',val:'1',nownum:''},{name:'已下架',val:'2',nownum:''},{name:'库存预警',val:'3',nownum:''}],
            shoptype:1,
            shopClassification:'',
            ommodityType:'',
            searchshow:false,
            keyword:"",
            tableData:[],
            totalCount:0,
            tableLoading:false,
            prodId:0,//产品ID
            prodNum:'',
            threeDepShow:false,
            oneDepShow:false,//规格库存
            secondDepShow:false,//调整库存弹窗
        };
    },
    components:{
        // AddDepModal,
        SecondIndex,
        OneIndex,
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
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getStockList();
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
        getStockList(){
            const params = {...this.form};
            this.tableLoading = true;
             getProductsStockListAPI(params)
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

