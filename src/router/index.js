import Vue from 'vue';
import vueRouter from 'vue-router';

import store from '@/store';

Vue.use(vueRouter);

const Home = resolve => require(['../components/Index'], resolve);
const LoginPage = resolve => require(['../components/LoginPage'], resolve);
const LoginPageByPwd = resolve => require(['../components/LoginPageByPwd'], resolve);
const NotFound = resolve => require(['../components/NotFound'], resolve);

const routes = [
    // 后台内容
    {
        name: 'Home',
        path: '/',
        component: Home,
    },
    // 登陆
    {
        name: 'login',
        path: '/login',
        component: LoginPage,
    },
    // 密码登陆
    {
        name: 'loginbypwd',
        path: '/loginbypwd',
        component: LoginPageByPwd,
    },
    // 404
    {
        name: '/notFound',
        path: '*',
        meta: {
            requireAuth: true,
        },
        component: NotFound,
    },
]
const router = new vueRouter({routes});

if (sessionStorage.getItem('token') || localStorage.getItem('rid')) {
    console.log("sessionStorage.getItem('token')为空");
    store.commit('moduleLogin/login');
}

router.beforeEach((to, from, next) => {
   
    if (!store.state.moduleLogin.isLogin && to.path !== '/login' && to.path !== '/loginbypwd') {
        console.log("to.path:"+to.path);
        
            next('/login');
       
        
    } else {
        next();
    }
    
})
export default router;