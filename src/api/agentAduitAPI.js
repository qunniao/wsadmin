/*
 * @Description: 代理审核管理
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
import http from '@/public/http';
export const getAgentDepListAPI = (args) =>{
    return http({
        url: '/agentRegisterReviews/list',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }
 /**
 * 通过审核
 */
 export const checkagentOkAPI = (args) =>{
    return http({
        url: '/agentRegisterReviews/ratifyVoucher',
        method: 'post',
        headers:{"Content-Type":'application/x-www-form-urlencoded','token': localStorage.getItem('token')},
        data: args,
    });
 }
  /**
 * 驳回审核
 */
export const checkagentNoAPI = (args) =>{
    return http({
        url: '/agentRegisterReviews/rejectVoucher',
        method: 'post',
        headers:{"Content-Type":'application/x-www-form-urlencoded','token': localStorage.getItem('token')},
        data: args,
    });
 }
/**
 * 获取代理等级列表
 */
 export const getAgentLevelListAPI = (args) =>{
    return http({
        url: '/agentLevels/list',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }
 /**
 * 获取代理等级详情
 */
export const getAgentLevelInfoAPI = (args) =>{
    return http({
        url: '/agentLevels/info/'+args,
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        // params: args,
    });
 }
  /**
 * 修改代理等级
 */
export const putAgentLevelUpdateAPI = (args) =>{
    return http({
        url: '/agentLevels/update',
        method: 'post',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: args,
    });
 }
 export const postAgentLevelUpdateAPI = (args) =>{
    return http({
        url: '/agentLevels/update',
        method: 'post',
        headers:{"Content-Type":'application/x-www-form-urlencoded','token': localStorage.getItem('token')},
        data: args,
    });
 }