/*
 * @Description: 全部
 * @Author: jian.weng
 * @Date: 2019-10-24 18:21:00
 */

<template>
    <div>
        <div class="header">
            <el-button @click="exportExcel" type="primary">导出</el-button>
            <el-button type="primary">待发货商品统计</el-button>
        </div>
                <div class="filter">
            <el-form class="fl-l" inline>
                <el-form-item label="订单信息:">
                    <el-col :span="24">
                        <el-input v-model="form.search" placeholder="请输入订单号" ></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="getOrderList">查找</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changeshow">展开</el-button>
                </el-form-item>
                <div v-if="searchshow" >
                    <el-form-item label="商品名称:">
                        <el-input v-model="form.search" placeholder="请输入订单号" ></el-input>
                    </el-form-item>
                    <el-form-item label="下单时间:">
                        <el-date-picker
                        v-model="value1"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="支付方式:">
                        <el-select v-model="form.typeId" clearable placeholder="请选择" >
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
                    <el-form-item label="订单金额:">
                        <el-col :span="8">
                            <el-input v-model="form.minStore" placeholder="请输入数字" ></el-input>
                        </el-col>
                        <el-col class="line" style="text-align:center" :span="2">~</el-col>
                       <el-col :span="8">
                            <el-input v-model="form.maxStore" placeholder="请输入数字" ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="收货人地区:">
                        <el-select v-model="form.typeId" clearable placeholder="请选择" >
                        </el-select>
                    </el-form-item>
                    <el-form-item label="配送方式:">
                        <el-select v-model="form.typeId" clearable placeholder="请选择" >
                        </el-select>
                    </el-form-item>
                    <el-form-item label="运单号:">
                        <el-col :span="16">
                        <el-input v-model="form.productNumber" placeholder="请输入规格货号" ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="退款状态:">
                        <el-select v-model="form.typeId" clearable placeholder="请选择" >
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否云订单:">
                        <el-select v-model="form.typeId" clearable placeholder="请选择" >
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动订单:">
                        <el-select v-model="form.typeId" clearable placeholder="请选择" >
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否拆单:">
                        <el-select v-model="form.typeId" clearable placeholder="请选择" >
                        </el-select>
                    </el-form-item>
                </div>
                <div style="margin-bottom:10px">
                    <el-tag v-for="item in shoptypelist" @click='changesearchtype(item.val)' :key="item.val" :class="{'active':item.val==form.orderState}">{{item.name}}</el-tag>
                </div>
            </el-form>
        </div>  
        <div class="table_body">
            <el-table
            :data="tableData"
            border
            id="exportTab"
            @sort-change='changetable'
            size="medium "
            :default-sort = "{prop: 'price', order: 'descending'}"
            style="width: 100%">
                <el-table-column
                prop="orderNumber"
                label="订单编号"
                min-width="360">
                </el-table-column>
                 <el-table-column
                prop="gmtCreate"
                label="下单时间"
                sortable='custom'
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="contactName"
                label="下单人"
                sortable='custom'
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="nick"
                label="下单上级"
                sortable='custom'
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="productNum"
                label="商品数量"
                sortable='custom'
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="payMoney"
                label="订单金额"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="gmtCreate"
                label="订单状态"
                sortable='custom'
                min-width="180">
                <template slot-scope="scope">
                  {{orderstatelist[scope.row.orderState]}}
                 </template>
                </el-table-column>
                <el-table-column
                prop="gmtCreate"
                label="是否删除"
                sortable='custom'
                min-width="180">
                <template slot-scope="scope">
                    {{scope.row.deleted?'已删除':'未删除'}}
                 </template>
                </el-table-column>
                <el-table-column
                prop="contactName"
                label="收货人"
                sortable='custom'
                min-width="180">
                </el-table-column>
                <el-table-column
                label="操作"
                min-width="300">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="changeOrderShow(scope.row.oid)">订单详情</el-button>
                        <el-button v-if="scope.row.orderState==4" type="primary" @click="changeOrderDeliverGoods(scope.row.oid)">发货</el-button>
                        <el-button type="danger" v-if="!scope.row.deleted" @click="delOrderDeliverGoods(scope.row.oid)">删除</el-button>
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
            <div>
            <el-dialog
            title="订单详情"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="80%">
                <second-index
                v-if="secondDepShow"
                :order-id='orderId'
                @finish-action="getOrderList"
                @close-form="secondDepShow = false"
                ></second-index>
            </el-dialog>
        </div>
        </div>
    </div>
</template>

<script>
const SecondIndex = () => import('./allOrderInfo.vue');
import {
     getOrderDepListAPI,
     putDeliverGoodsAPI,
     delOrderDeliverGoodsAPI
} from '@/api/prodOrderAPI.js'
import {
     timeStamp2String
} from '@/api/globalAPI.js'
import FileSaver from 'file-saver'

import XLSX from 'xlsx'

export default {
    name:'prodList',
    data(){
        return{
            payfun:{
                1:"打款凭证",
                2:"线上支付"
            },
            orderstatelist:{
                "-1":"已删除",
                0:"已关闭",
                1:"待确认",
                2:"待付款",
                3:"待总部处理",
                4:"待发货",
                5:"待收货",
                6:"待评价",
                7:"已完成"
            },
            orderId:'',
            form:{
                current :1,
                size :10,
                orderState: '',
                sortType:'1'
            },
            freightlist:[],
            value1:[, ],
            shoptypelist:[{name:'全部',val:'',nownum:''},{name:'待付款',val:'1',nownum:''},{name:'待总部处理',val:'2',nownum:''},{name:'待发货',val:'3',nownum:''},{name:'待收货',val:'4',nownum:''},{name:'已完成',val:'5',nownum:''},{name:'已关闭',val:'6',nownum:''},{name:'已删除',val:'7',nownum:''}],
            shoptype:1,
            shopClassification:'',
            ommodityType:'',
            searchshow:false,
            keyword:"",
            tableData:[],
            totalCount:0,
            tableLoading:false,
            modalAddDepShow:false,//新增科室弹窗
            isEdit:false,//是否编辑
            depId:0,//科室ID
            secondDepShow:false,//产品1弹窗
        };
    },
    components:{
        // AddDepModal,
        SecondIndex
    },
    methods:{
        changeOrderShow(id){
            this.orderId=id
            console.log(id)
            console.log(this.orderId)
            this.secondDepShow=true
        },
        delOrderDeliverGoods(id){
            this.$confirm('确定要删除该订单么？（此操作不可逆）', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    const deldata={
                        oids:id
                    }
                    delOrderDeliverGoodsAPI(deldata)
                    .then(res => {
                        if(res.data.code === 200){
                            this.$message({
                                type: 'success',
                                message: '该订单已经删除',
                            });
                            this.getOrderList()
                        }else{
                            this.$message.error(res.data.msg)
                        }                   
                    })
                    .catch(err => {
                    })
                })
        },
        /*
         * 获取订单列表
         */
        getOrderList(){
            const params = {...this.form};
            // if(this.value1[0]!=''&&this.value1[0]!=undefined&&this.value1[0]!=null){
            //     params.endTime=timeStamp2String(this.value1[1],2)
            //     params.startTime=timeStamp2String(this.value1[0],2)
            // }
            this.tableLoading = true;
             getOrderDepListAPI(params)
                .then(res => {
                    const data = res.data.data;
                    this.totalCount = data.total;
                    this.tableData = data.records;
                    this.tableLoading = false;
                    let nowprodnum =data.count;
                    this.shoptypelist[0].nownum=nowprodnum.putawayNum
                    this.shoptypelist[1].nownum=nowprodnum.sellOutNum
                    this.shoptypelist[2].nownum=nowprodnum.soldOutNum
                    this.shoptypelist[3].nownum=nowprodnum.warningNum
                })
                .catch(err => {
                    this.tableLoading = false;
                })
        },
        changeOrderDeliverGoods(id){
            putDeliverGoodsAPI(id)
                .then(res => {
                    const response = res.data;
                    let status = 'success';                    
                    if (response.code === 200) {
                        this.getOrderList();
                    } else {
                        status = 'error';
                    }
                    this.$message({
                        type: status,
                        message: status === 'success' ? '操作成功！' : response.message,
                    })
                })
        },
        exportExcel () {
             /* generate workbook object from table */
            var xlsxParam = { raw: true } // 导出的内容只做解析，不进行格式转换
            var wb = XLSX.utils.table_to_book(document.querySelector('#exportTab'), xlsxParam)

            /* get binary string as output */
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '订单信息表.xlsx')
            } catch (e) {
                if (typeof console !== 'undefined') {
                console.log(e, wbout)
                }
            }
            return wbout
        },
        changesearchtype(id){
            this.form.orderState=id
            this.getOrderList()
        },
        changetable(e){
            console.log(e)
            if(e.prop=='price'&&e.order=='ascending'){
                this.form.sortType=1
            }else if(e.prop=='price'&&e.order=='descending'){
                this.form.sortType=2
            }
            console.log(this.form)
            this.getOrderList()
        },
        /**
         * @msg: 翻页
         * @param {type} 
         * @return: 
         */
        handleSizeChange(cSize) {
            this.form.size = cSize;
            this.getOrderList();
        },
        
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getOrderList();
        },
        /**
         * @msg: 新增产品
         * @param {type} 
         * @return: 
         */
        handleAddDep(){
            this.depId = 0;
            this.isEdit = false;
            this.secondDepShow = true;
        },
        /**
         * @msg: 修改产品
         * @param {Number} row  修改产品的信息
         */
        handleCheck(index, row) {
            this.depId = row.pid;
            this.secondDepShow = true;
            this.isEdit = true;
        },
        /**
         * @msg: 删除产品
         * @param {Number} row  删除产品信息
         */
        handleDel(index, row){
            let delID = row.id
            deleteFirstDepAPI(delID)
                .then(res => {
                    const response = res.data;
                    let status = 'success';

                    if (response.code === 1000) {
                        this.getOrderList();
                    } else {
                        status = 'error';
                    }
                    this.$message({
                        type: status,
                        message: status === 'success' ? '删除成功！' : response.msg,
                    })
                })
        },
        changeshow(){
            console.log(123)
            this.searchshow=!this.searchshow
        },
        handleSecondDepShow(){
            this.secondDepShow = true;
            this.depId=0
            this.isEdit=false
        }
    },
    created(){
        this.getOrderList()
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
.active{
    background: #409EFF;
    color: #fff;
}
</style>

