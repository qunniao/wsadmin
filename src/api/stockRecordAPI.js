/*
 * @Description: 库存记录
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
import http from '@/public/http';
export const GetStockRecordListAPI = (args) =>{
    return http({
        url: '/stockHistory/page',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }