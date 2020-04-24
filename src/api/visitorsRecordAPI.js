/*
 * @Description: 店铺访客记录
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
import http from '@/public/http';
export const getVistitorsListAPI = (args) =>{
    return http({
        url: '/storeVisitors/list',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }
 /*
 * @Description: 店铺访客个人记录
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const getVistitorsDetailAPI = (args) =>{
    return http({
        url: '/storeVisitors/info',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }