/*
 * @Description: 常规商品列表
 * @Author: jian.weng
 * @Date: 2019-10-24 18:21:00
 */

<template>
    <div>
        <div class="header">
            <p>产品列表</p>
            <el-button type="primary" @click="handleSecondDepShow">添加产品</el-button>
        </div>
                <div class="filter">
            <el-form class="fl-l" inline>
                <el-form-item label="商品信息">
                    <el-col :span="24">
                        <el-input v-model="form.search" placeholder="请输入商品名称和商品货号进行搜索" ></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="getProdList">查找</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changeshow">展开</el-button>
                </el-form-item>
                <div v-if="searchshow" >
                    <el-form-item label="创建时间">
                        <el-date-picker
                        v-model="value1"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="规格货号">
                        <el-col :span="16">
                        <el-input v-model="form.productNumber" placeholder="请输入规格货号" ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="商品分类">
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
                    <el-form-item label="库存区间:">
                        <el-col :span="8">
                            <el-input v-model="form.minStore" placeholder="区间最低" ></el-input>
                        </el-col>
                        <el-col class="line" style="text-align:center" :span="2">~</el-col>
                       <el-col :span="8">
                            <el-input v-model="form.maxStore" placeholder="区间最高" ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="价格区间:">
                        <el-col :span="8">
                            <el-input v-model="form.minPrice" placeholder="区间最低" ></el-input>
                        </el-col>
                        <el-col class="line" style="text-align:center" :span="2">~</el-col>
                       <el-col :span="8">
                            <el-input v-model="form.maxPrice" placeholder="区间最高" ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="销量区间:">
                        <el-col :span="8">
                            <el-input v-model="form.minSales" placeholder="区间最低" ></el-input>
                        </el-col>
                        <el-col class="line" style="text-align:center" :span="2">~</el-col>
                       <el-col :span="8">
                            <el-input v-model="form.maxSales" placeholder="区间最高" ></el-input>
                        </el-col>
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
            @sort-change='changetable'
            size="medium "
            :default-sort = "{prop: 'price', order: 'descending'}"
            style="width: 100%">
                <el-table-column
                prop="departmentName"
                label="商品"
                min-width="360">
                 <template slot-scope="scope">
                        <img class="prod-img" :src="scope.row.cover">
                        <div class="prod-detail" :span="6">
                            <div>
                                {{scope.row.productName}}
                            </div>
                            <div>
                                货号:{{scope.row.productNumber}}
                            </div>
                            <div>
                                分类:{{scope.row.typeName}}
                            </div>
                        </div>
                 </template>
                </el-table-column>
                <el-table-column
                prop="price"
                label="价格"
                sortable='custom'
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="库存"
                min-width="180">
                 <template slot-scope="scope">
                     <div>
                        <div>
                            总库存：{{scope.row.totalStock}}
                        </div>
                        <div>
                            可用库存:{{scope.row.availableStock}}
                        </div>
                     </div>
                 </template>
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="销量"
                sortable='custom'
                min-width="180">
                <template slot-scope="scope">
                     <div>
                        <div>
                            实际销量:{{scope.row.realSales}}
                        </div>
                        <div>
                            基础销量:{{scope.row.sales}}
                        </div>
                        <div>
                            流水销量:{{scope.row.flowSales}}
                        </div>
                     </div>
                 </template>
                </el-table-column>
                <el-table-column
                prop="gmtCreate"
                label="创建时间"
                sortable='custom'
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="sort"
                label="排序"
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
                            @click="handleCheck(scope.$index, scope.row)">修改</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            @click="handleDel(scope.$index, scope.row)">删除</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="handleputAway(scope.$index, scope.row)">{{scope.row.status=='0'?'下':'上'}}架</el-button>
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
        <div>
            <el-dialog
            :title="this.isEdit ? '修改产品' : '新增产品'"
            :append-to-body="true"
            :visible.sync="modalAddDepShow"
            width="40%">
                <add-dep-modal
                v-if="modalAddDepShow"
                :dep-id="depId"
                @finish-action="getProdList"
                @close-form="modalAddDepShow = false"
                ></add-dep-modal>
            </el-dialog>
            <el-dialog
            title="产品详情"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="90%">
                <second-index
                :dep-id="depId"
                v-if="secondDepShow"
                @finish-action="getProdList"
                @close-form="secondDepShow = false"
                ></second-index>
            </el-dialog>
        </div>
    </div>
</template>

<script>
const SecondIndex = () => import('./prodInfo.vue');
import {
     getProductsDepListAPI,
     putProdShopAPI,
     deleteFirstDepAPI
} from '@/api/productApi.js'
import {
     timeStamp2String
} from '@/api/globalAPI.js'

export default {
    name:'prodList',
    data(){
        return{
            form:{
                current :1,
                size :10,
                productType: 0,
                // search:'',
                // startTime:'',
                // endTime:'',
                // productNumber:'',
                // typeId:'',
                // minStore:'',
                // maxStore:'',
                // minPrice:'',
                // maxPrice:'',
                // minSales:'',
                // maxSales:'',
                statusType:1,
                sortType:1
                // freightId:''
            },
            freightlist:[],
            value1:[, ],
            shoptypelist:[{name:'出售中',val:'1',nownum:''},{name:'已下架',val:'2',nownum:''},{name:'已售完',val:'3',nownum:''},{name:'库存预警',val:'4',nownum:''}],
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
        /*
         * 获取产品列表
         */
        getProdList(){
            const params = {...this.form};
            if(this.value1[0]!=''&&this.value1[0]!=undefined&&this.value1[0]!=null){
                params.endTime=timeStamp2String(this.value1[1],2)
                params.startTime=timeStamp2String(this.value1[0],2)
            }
            this.tableLoading = true;
             getProductsDepListAPI(params)
                .then(res => {
                    const data = res.data.data;
                    if(data!=null){
                        this.totalCount = data.page.total;
                        this.tableData = data.page.records;
                        this.tableLoading = false;
                        let nowprodnum =data.count;
                        this.shoptypelist[0].nownum=nowprodnum.sellNum
                        this.shoptypelist[1].nownum=nowprodnum.soldOutNum
                        this.shoptypelist[2].nownum=nowprodnum.sellOutNum
                        this.shoptypelist[3].nownum=nowprodnum.warningNum
                    }else{
                        this.tableData=[]
                         this.tableLoading = false;
                         this.totalCount = 0;
                    }
                })
                .catch(err => {
                    this.errorMsg(err)
                    this.tableLoading = false;
                })
        },
        changesearchtype(id){
            this.form.statusType=id
            this.getProdList()
        },
        changetable(e){
            if(e.prop=='price'&&e.order=='ascending'){
                this.form.sortType=1
            }else if(e.prop=='price'&&e.order=='descending'){
                this.form.sortType=2
            }
            this.getProdList()
        },
        /**
         * @msg: 翻页
         * @param {type} 
         * @return: 
         */
        handleSizeChange(cSize) {
            this.form.size = cSize;
            this.getProdList();
        },
        
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getProdList();
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
            let delID = ''+row.pid
            const params={
                pids:delID
            }
            deleteFirstDepAPI(params)
                .then(res => {
                    const response = res.data;
                    let status = 'success';
                    if (response.code === 200) {
                        this.getProdList();
                    } else {
                        status = 'error';
                    }
                    this.$message({
                        type: status,
                        message: status === 'success' ? '删除成功！' : response.message,
                    })
                })
        },
        handleputAway(index, row){
            let putid = row.pid
            let putstatus =0
            if(row.status==0){
                putstatus=-1
            }
            const params={
                pid:putid,
                status:putstatus
            }
            putProdShopAPI(params)
                .then(res => {
                    const response = res.data;
                    let status = 'success';                    
                    if (response.code === 200) {
                        this.getProdList();
                    } else {
                        status = 'error';
                    }
                    this.$message({
                        type: status,
                        message: status === 'success' ? '操作成功！' : response.message,
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
        },
        errorMsg (message) {
            this.$message({
                message: message,
                type: 'error',
                duration: 1500
            })
        },
    },
    created(){
        this.getProdList()
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

