/*
 * @Description: 订单管理
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
import http from '@/public/http';
export const getOrderDepListAPI = (args) =>{
    return http({
        url: '/orderInfos/list',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }
/**
 * 修改产品
 * @param {Object} args 
 */
 export const getOrderDetailAPI = (args) =>{
    return http({
        url: '/orderInfos/info/'+args,
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        // params: args,
    });
 }
 /**
 * 修改产品
 * @param {Object} args 
 */
export const putDeliverGoodsAPI = (args) =>{
    return http({
        url: '/orderInfos/shipments/'+args,
        method: 'put',
        headers: {
            'token': localStorage.getItem('token')
        },
        // params: args,
    });
 }
  /*
 * @Description: 删除订单
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const delOrderDeliverGoodsAPI = (args) =>{
    return http({
        url: '/orderInfos/delete',
        method: 'delete',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }