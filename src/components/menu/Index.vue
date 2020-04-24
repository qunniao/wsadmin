<!-- 菜单入口 -->
<template>
    <el-menu 
    @select="handleSelectMenu" 
    :default-active="itemActiveIndex" 
    :active-text-color="itemActiveIndex ? '#409EFF' : '#303133'"
    :unique-opened="true">
        <!-- <nav-item :key="index" v-for="(item, index) in menuList" :menuItem="item" :menuIndex="index + ''"></nav-item> -->
        <nav-item :key="item.actionId" v-for="item in menuList" :menuItem="item"  :menuIndex="item.actionId"></nav-item>
    </el-menu>
</template>

<script>
import { mapState } from 'vuex'

import NavItem from'./NavItem';
import Vue from 'vue';
import router from '@/router';
import {Message} from 'element-ui';

import {
    getAuthListAPI,getAdminRolePowerListAPI
} from '@/api/globalAPI.js';
import { MENU_LIST } from '@/public/constant';

export default {
    name:'NavMenu',
    data() {
        return {
            menuList: [],
        };
    },
    components: {
        NavItem,
    },
    computed: {
        ...mapState('menu', {
            itemActiveIndex: state => state.itemActiveIndex,
        })
    },
    methods: {
        /**
         * 菜单点击选择事件
         */
        handleSelectMenu(index) {
            console.log("handleSelectMenu index:"+index);
            if (index !== this.itemActiveIndex) {
                this.$store.commit('menu/changeActiveItem', index);
            }
        },
        /**
         * 构建对应权限菜单
         */
        buildAuthNav() {
            const params ={
                rid:Number(sessionStorage.getItem('roleId'))
            }
            getAuthListAPI(params)
                .then(res => {
                    // console.log(res.data.data)
                    let authList = res.data.data.map(item => item.menu.name);

                    function buildNewMenu(arrayDone) {
                        let newArray = [];
                        arrayDone.forEach((item, index) => {
                            if (item.children && item.children.length > 0) {
                                // 递归过滤 children 
                                let newChildren = buildNewMenu(item.children);
                                // 如果过滤后的 newChildren 长度大于零，push 该菜单
                                if (newChildren.length > 0) {
                                    newArray.push(Object.assign({}, item, {
                                        children: newChildren,
                                    }));
                                }
                            } else {
                                if (authList.indexOf(item.name) > -1) {
                                    newArray.push(item);
                                }
                            }
                        });

                        return newArray;
                    }

                    let newMenu = buildNewMenu(MENU_LIST);
                    this.menuList = newMenu;
                })
        },
         /**
         * 构建对应权限菜单2
         */
        buildAuthNav2() {
            const params ={
                roleId:Number(sessionStorage.getItem('roleId'))
            }
            getAdminRolePowerListAPI(params)
                .then(res => {
                    console.log("buildAuthNav2")
                    console.log(res.data)
                    let authList = res.data.data;
                    /*
                    function buildNewMenu(arrayDone) {
                        let newArray = [];
                        arrayDone.forEach((item, index) => {
                            if (item.children && item.children.length > 0) {
                                // 递归过滤 children 
                                let newChildren = buildNewMenu(item.children);
                                // 如果过滤后的 newChildren 长度大于零，push 该菜单
                                if (newChildren.length > 0) {
                                    newArray.push(Object.assign({}, item, {
                                        children: newChildren,
                                    }));
                                }
                            } else {
                                if (authList.indexOf(item.name) > -1) {
                                    newArray.push(item);
                                }
                            }
                        });

                        return newArray;
                    }
                    */

                   // let newMenu = buildNewMenu(MENU_LIST);
                    this.menuList = authList;
                })
        },
        getCookie(c_name) {
            if (document.cookie.length > 0) {
                var c_start = document.cookie.indexOf(c_name + "=")
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1
                    var c_end = document.cookie.indexOf(";", c_start)
                    if (c_end == -1) c_end = document.cookie.length
                    return unescape(document.cookie.substring(c_start, c_end)).replace(/\"/g, "");
                }
            }
            return null;
        }
    },
    created() {
        //  this.menuList = MENU_LIST;
        this.buildAuthNav2();
        // console.log(this.getCookie("userId"))
        // if(sessionStorage.getItem('token')==undefined||sessionStorage.getItem('token')==null||sessionStorage.getItem('token')==''){
        //     Vue.prototype.$message({type: 'error', message: '登录信息过期！请重新登录'})
        //     // reject('登录信息过期！请重新登录');
        //     router.push('/login');
        // }
        // 重新登录设置首页为初始页面
        this.$store.commit('menu/changeActiveItem', 'home')
    },
}
</script>

<style scoped lang="less">
</style>