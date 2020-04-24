/*
 * @Description: 产品管理
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
import http from '@/public/http';
  /**
 * 获取库存列表
 * @param {Object} args 
 */
export const getProductsStockListAPI = (args) =>{
    return http({
        url: '/stock/page',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }
   /**
 * 获取规格库存列表
 * @param {Object} args 
 */
export const getProdSkuStockListAPI = (args) =>{
    return http({
        url: '/stock/sku/page',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }
  /**
 * 获取商品详情
 * @param {Object} args 
 */
 export const getProdDetailAPI = (args) =>{
    return http({
        url: '/products/info/'+args,
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        // params: args,
    });
 }
/**
 * 修改商品库存
 * @param {Object} args 
 */
export const changeProdDetilAPI = (args) =>{
    return http({
        url: '/stock/adjustStock',
        method: 'post',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: args,
    });
 }
 /**
 * 修改规格商品库存
 * @param {Object} args 
 */
 export const changeSkuDetilAPI = (args) =>{
     console.log(JSON.stringify(args))
    return http({
        url: '/stock/adjustSkuStock',
        method: 'post',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: JSON.stringify(args),
    });
 }
