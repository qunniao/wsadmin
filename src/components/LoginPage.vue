<!-- 登陆页面 -->
<template>
    <div class="child-vhc wrapper--login">
        <div class="form--login">
            <el-form ref="formLogin" :model="formLogin" :rules="rules">
                <div class="loginheader">微商后台管理系统</div>
                <el-form-item prop="phone">
                    <el-input placeholder="请输入手机号" v-model="formLogin.phone"></el-input>
                </el-form-item>
                <el-form-item prop="password ">
                    <el-input placeholder="请输入密码" type="password" v-model="formLogin.password"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-row :gutter="6">
                        <el-col :span="16">
                            <el-input placeholder="请输入验证码" v-model="formLogin.code"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-button @click="getcode">{{count?count+'S':'获取验证码'}}</el-button>
                        </el-col>
                     </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitLoginForm">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {mapMutations, mapState, mapActions} from 'vuex'

import {BASE_URL} from '@/public/constant'
import {loginAPI,getCodeAPI} from '@/api/globalAPI'

export default {
    name: 'HelloWorld',
    data() {
        return {
            codeImg: null,
            formLogin: {
                phone: '',
                password: '',
                code: '',
            },
            count:"",
            timer:null,
            rules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }
                ],
                code: [
                    {
                        required: true,
                        message: '请输入验证码',
                        trigger: 'blur'
                    }
                ],
            },
        };
    },
    methods: {

        /**
         * 提交登陆操作
         */
        submitLoginForm() {
            const formLogin = {
                ...this.formLogin
            }
            this.$refs.formLogin.validate(valid => {
                if (valid) {
                    loginAPI(formLogin).then(res => {
                        const {code, data, message} = res.data
                        console.log(res.data)
                        console.log(code)
                        if (code === 200) {
                            var millisecond = new Date().getTime();
                            var expiresTime = new Date(millisecond +60*60 * 1000);
                            // console.log(expiresTime)
                            // Cookies.set('token', 'value', {
                            //     expires: expiresTime,
                            // });
                            // document.cookie = "token="+  data.token + ";expires=" + expiresTime.toGMTString();
                            localStorage.setItem('token', data.token)
                            // localStorage.setItem('tokendate',expiresTime)
                            console.log(data)
                            sessionStorage.setItem('token', data.admin.token)
                            sessionStorage.setItem('roleId', data.admin.roleId)
                            sessionStorage.setItem('uid', data.admin.uid)
                            // localStorage.setItem('rid', data.tid)
                            // localStorage.setItem('username', formLogin.username)

                            this.$message({type: 'success', message: '登陆成功！'})
                            // 改变登录状态为已登录
                            this
                                .$store
                                .commit('moduleLogin/login')
                            // 跳转到应用
                            this
                                .$router
                                .push('/')
                        } else {
                            this.$message({type: 'error', message: message})
                        }
                    })
                }
            })
           
        },
        getcode(){
            const that =this
            if(!this.timer){
                 if(!(/^1[3456789]\d{9}$/.test(this.formLogin.phone))){ 
                    this.$message({type: 'error', message: '请输入正确的手机号码'}) 
                    return false; 
            }else{
                const pushdata={
                    phone:this.formLogin.phone
                }
                const TIME_COUNT = 60;
                 if (!this.time) {
                        this.count = TIME_COUNT;
                        this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                            } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                            }
                        }, 1000)
                    }
                    getCodeAPI(pushdata)
                    .then(res => {
                            const response = res.data;
                            if(response.code==200){
                                this.$message({
                                    type: 'success',
                                    message: '获取验证码成功',
                                });
                            }
                        })
                        .catch(err => {
                        console.log(err)
                            this.tableLoading = false;
                        }) 
                }
            }
        },
        errorMsg (message) {
            this.$message({
                message: message,
                type: 'error',
                duration: 1500
            })
        },
    },
    mounted() {
    }
}
</script>

<style scoped="scoped" lang="less">
    .wrapper--login {
        width: 100%;
        min-height: 500px;
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("../assets/images/bg.jpg") center no-repeat;
        background-size: cover;
    }
    .form--login {
        width: 400px;
        min-height: 200px;
        padding: 30px 20px;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 6px;
    }
    .captcha--wrapper {
        height: 40px;

        img {
            height: 100%;
            background: #fff;
        }
    }
    .loginheader{
        font-size: 30px;
        text-align: center;
        margin: 10px auto;
        color: #fff;
    }
</style>