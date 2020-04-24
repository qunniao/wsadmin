// 本地服务
// export const BASE_URL = 'http://localhost:9091';
// 测试服务
export const BASE_URL = 'http://admin.zhanchengwlkj.com:8080/derivative_system_backstage';
// export const BASE_URL = 'http://2300i2t902.imwork.net/';
// export const BASE_URL = 'http://10.7.17.87:8769/';

// 定义 APP 内容组件名称
export const APP_COMPONENTS = {
    // 首页
    HomePage: () => import('../components/homePage/Index.vue'),
    // 常规产品管理
    ShopPage: () =>import('../components/prod/prodList.vue'),
    // 内购产品管理 
    ShopPageTwo: () =>import('../components/prodTwo/prodList.vue'),
    //总库存管理
    ShopStock: () =>import('../components/shopStock/shopStockindex.vue'),
    //库存记录
    StockRecord: () =>import('../components/stockRecord/stockRecordindex.vue'),
    // 云库存
    CloudInventory: () =>import('../components/agencyInventory/agencyInventoryindex.vue'),
    // 库存详情
    InventoryInfo: () =>import('../components/agencyInventory/agencyInventoryInfo.vue'),
    // 库存记录
    InventoryRecord: () =>import('../components/agencyInventory/agencyInventoryRecord.vue'),
    // 产品分类管理
    ShopTypePage: () =>import('../components/prodtype/prodtypeList.vue'),
    // 产品属性组管理
    ShopGroupPage: () =>import('../components/prodgroup/prodgroupList.vue'),
    // 运费模板管理
    ShopFreightPage: () =>import('../components/freightTemplate/freightTemplateList.vue'),
    // 换货审核
    ReplacementAuditPage: () =>import('../components/replacementAudit/replacementAuditIndex.vue'),

    // 订单
    // 全部订单
    AllOrderPage: () =>import('../components/allOrderManage/allOrderList.vue'),
    // 打款审核
    PaymentAuditPage: () =>import('../components/paymentAudit/paymentAuditIndex.vue'),

   // 代理
   AgentInformationPage: () =>import('../components/agentInformation/agentInformationIndex.vue'),
   //代理等级设置
   AgentLevelSetUpPage: () =>import('../components/agentLevelSetUp/agentLevelSetUpIndex.vue'),
   // 代理加入审核
   AgentAuditPage: () =>import('../components/agentAudit/agentAuditIndex.vue'),
   // 代理邀请设置
   AgentInvitationSetUpPage: () =>import('../components/agentInvitationSetUp/agentInvitationSetUpIndex.vue'),

    //零售
    //访客记录
    VisitorsRecord: () =>import('../components/visitorsRecord/visitorsRecordIndex.vue'),
    //会员列表
    MemberShipPage: () =>import('../components/membershipPage/membershipIndex.vue'),
    // 404 页面
    NotFound: () => import('../components/NotFound.vue'),


    // 奖励
    // 普通一次性奖励
    OrdinaryRewardPage: () =>import('../components/ordinaryReward/ordinaryRewardIndex.vue'),
    // 高级一次性奖励
    SeniorRewardPage: () =>import('../components/seniorReward/seniorRewardIndex.vue'),


    // 财务
    // 财务设置
    FinanceSetUpPage: () =>import('../components/financeSetUp/financeSetUpList.vue'),
    // 转账记录
    TransferRecordPage: () =>import('../components/transferRecord/transferRecordList.vue'),
    //钱包收支明细
    BalanceRecordPage: () =>import('../components/balanceRecord/balanceRecordList.vue'),

    // 加盟店
    FranchisedStoreInformationPage: () =>import('../components/franchisedStoreInformation/franchisedStoreInformationIndex.vue'),
    //加盟店管理员
    FranchisedStoreAdministratorsPage: () =>import('../components/franchisedStoreAdministrators/franchisedStoreAdministratorsList.vue'),
    //组合套餐
    PackagemealPage: () =>import('../components/packagemeal/packagemealList.vue'),

    //账号管理
    AccountManagementPage: () =>import('../components/accountManagement/accountManagementList.vue'),

    //管理员列表
    AdminListPage: () =>import('../components/admin/adminList.vue'),

    //管理员角色列表
    AdminRoleListPage: () =>import('../components/adminRole/adminRoleList.vue'),
    

};

// 菜单列表
// 注意：id 不可重复
export const MENU_LIST = [
        {
            id: 1,
            name: '产品',
            icon: 'el-icon-message',
            children: [
                {
                    id: 2,
                    name: '商品管理',
                    icon: 'el-icon-news',
                    children: [
                        {
                            id: 3,
                            name: '常规商品',
                            icon: 'el-icon-date',
                            componentName: 'ShopPage',
                        },
                        {
                            id: 4,
                            name: '内购商品',
                            icon: 'el-icon-date',
                            componentName:'ShopPageTwo'
                        },
                    ],
                },
                {
                    id: 5,
                    name: '分类管理',
                    icon: 'el-icon-date',
                    componentName: 'ShopTypePage',
                },
                {
                    id: 6,
                    name: '属性组管理',
                    icon: 'el-icon-date',
                    componentName: 'ShopGroupPage',
                },
                {
                    id: 7,
                    name: '运费模板',
                    icon: 'el-icon-date',
                    componentName: 'ShopFreightPage',
                },
                {
                    id: 8,
                    name: '库存管理',
                    icon: 'el-icon-date',
                    componentName: 'ShopStock',
                },
                {
                    id: 9,
                    name: '代理库存',
                    icon: 'el-icon-news',
                    children: [
                        {
                            id: 777,
                            name: '云库存',
                            icon: 'el-icon-date',
                            componentName:'CloudInventory'
                        },
                        {
                            id: 877,
                            name: '实体库存',
                            icon: 'el-icon-date',
                            componentName:'InventoryInfo'
                        },
                        {
                            id: 10,
                            name: '库存记录',
                            icon: 'el-icon-date',
                            componentName:'StockRecord'
                        },
                    ],
                },
                {
                    id: 11,
                    name: '换货审核',
                    icon: 'el-icon-news',
                    children: [
                        {
                            id: 100,
                            name: '云库存',
                            icon: 'el-icon-date',
                            componentName:'ReplacementAuditPage'
                        },
                        {
                            id: 110,
                            name: '实体库存',
                            icon: 'el-icon-date',
                        },
                    ],
                },
            ],
        },{
            id: 12,
            name: '订单',
            icon: 'el-icon-message',
            children: [
                {
                    id: 13,
                    name: '总部订单',
                    icon: 'el-icon-news',
                    children: [
                        {
                            id: 15,
                            name: '全部订单',
                            icon: 'el-icon-date',
                            componentName:'AllOrderPage'
                        },
                        {
                            id: 14,
                            name: '代理订单',
                            icon: 'el-icon-date',
                        },
                        {
                            id: 166,
                            name: '零售订单',
                            icon: 'el-icon-date',
                        },
                        {
                            id: 178,
                            name: '提货订单',
                            icon: 'el-icon-date',
                        },
                        {
                            id: 188,
                            name: '内购',
                            icon: 'el-icon-date',
                        },
                        {
                            id: 198,
                            name: '换货订单',
                            icon: 'el-icon-date',
                        },
                    ],
                },
                {
                    id: 16,
                    name: '打款审核',
                    icon: 'el-icon-date',
                    componentName:'PaymentAuditPage'
                },
                {
                    id: 17,
                    name: '售后处理',
                    icon: 'el-icon-date',
                },
               
            
            ],
        },{
            id: 18,
            name: '代理',
            icon: 'el-icon-message',
            children: [
                {
                    id:19,
                    name: '代理信息',
                    icon: 'el-icon-news',
                    componentName:'AgentInformationPage'
                },
                {
                    id: 20,
                    name: '代理审核',
                    icon: 'el-icon-news',
                    children: [
                        {
                            id: 21,
                            name: '代理加入审核',
                            icon: 'el-icon-date',
                            componentName:'AgentAuditPage'
                        },
                        {
                            id: 22,
                            name: '代理升级审核',
                            icon: 'el-icon-date',
                        },
                        {
                            id:399,
                            name: '代理保证金审核',
                            icon: 'el-icon-date',
                        },
                    ],
                },
                {
                    id:23,
                    name: '代理等级',
                    icon: 'el-icon-news',
                    children: [
                        {
                            id: 24,
                            name: '等级设置',
                            icon: 'el-icon-date',
                            componentName:'AgentLevelSetUpPage'
                        },
                        {
                            id: 25,
                            name: '升级设置',
                            icon: 'el-icon-date',
                        },
                        {
                            id:434,
                            name: '资料设置',
                            icon: 'el-icon-date',
                        },
                        {
                            id:444,
                            name: '进货设置',
                            icon: 'el-icon-date',
                        },
                        {
                            id:26,
                            name: '自定义价格',
                            icon: 'el-icon-date',
                        },
                    ],
                },
                {
                    id:468,
                    name: '暗级管理',
                    icon: 'el-icon-news',
                    children: [
                        {
                            id: 478,
                            name: '暗级列表',
                            icon: 'el-icon-date',
                        },
                        {
                            id: 486,
                            name: '暗级等级设置',
                            icon: 'el-icon-date',
                        },
                    ],
                },
                {
                    id:495,
                    name: '暗级数据',
                    icon: 'el-icon-news',
                },
                {
                    id:27,
                    name: '代理设置',
                    icon: 'el-icon-news',
                    children: [
                        {
                            id: 28,
                            name: '邀请设置',
                            icon: 'el-icon-date',
                            componentName:'AgentInvitationSetUpPage'
                        }
                    ],
                }
            ],
        },
        {
            id: 29,
            name: '访客记录',
            icon: 'el-icon-message',
            componentName:'VisitorsRecord'
        },
        {
            id: 30,
            name: '会员列表',
            icon: 'el-icon-message',
            componentName:'MemberShipPage'
        },
        {
            id:31,
            name: '奖励',
            icon: 'el-icon-news',
            children: [
                {
                    id: 32,
                    name: '积分奖励',
                    icon: 'el-icon-date',
                    componentName:'OrdinaryRewardPage'
                },{
                    id: 33,
                    name: '市场奖励',
                    icon: 'el-icon-date',
                    componentName:'SeniorRewardPage'
                },
            ]
        },
        {
            id:34,
            name: '财务',
            icon: 'el-icon-news',
            children: [
                {
                    id: 35,
                    name: '财务设置',
                    icon: 'el-icon-date',
                    componentName:'FinanceSetUpPage'
                },
                {
                    id: 36,
                    name: '转账记录',
                    icon: 'el-icon-date',
                    componentName:'TransferRecordPage'
                },
                {
                    id: 37,
                    name: '余额收支明细',
                    icon: 'el-icon-date',
                    componentName:'BalanceRecordPage'
                }
            ]
        },
        {
            id:38,
            name: '加盟店',
            icon: 'el-icon-news',
            children: [
                {
                    id: 39,
                    name: '加盟店信息',
                    icon: 'el-icon-date',
                    componentName:'FranchisedStoreInformationPage'
                },
                // {
                //     id: 64,
                //     name: '加盟店审核',
                //     icon: 'el-icon-date',
                // },
                // {
                //     id: 65,
                //     name: '加盟店数据',
                //     icon: 'el-icon-date',
                //     componentName:'PackagemealPage'
                // },
                {
                    id: 40,
                    name: '加盟店管理员',
                    icon: 'el-icon-date',
                    componentName:'FranchisedStoreAdministratorsPage'
                },
            ]
        },
        {
            id:41,
            name: '管理员设置',
            icon: 'el-icon-news',
            children: [
                {
                    id: 42,
                    name: '管理员列表',
                    icon: 'el-icon-date',
                    componentName:'AdminListPage'
                },
                // {
                //     id: 64,
                //     name: '加盟店审核',
                //     icon: 'el-icon-date',
                // },
                // {
                //     id: 65,
                //     name: '加盟店数据',
                //     icon: 'el-icon-date',
                //     componentName:'PackagemealPage'
                // },
                {
                    id: 43,
                    name: '角色',
                    icon: 'el-icon-date',
                    componentName:'AdminRoleListPage'
                },
            ]
        },
        // {
        //     id:66,
        //     name: '账号管理',
        //     icon: 'el-icon-news',
        //     componentName:"AccountManagementPage"
        // }
];


// 社区管理--话题管理--标签
export const TAG_MAP = {
    1: '支持/反对',
    2: '正确/错误',
    3: '喜欢/不喜欢',
};

// 周几文字
export const WEEK_TEXT = {
    0: '周日',
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六',
};
