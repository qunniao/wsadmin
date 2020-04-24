/*
 * @Description: 代理信息管理
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
import http from '@/public/http';
  /**
 * 获取加盟店列表
 * @param {Object} args 
 */
export const getAgentInfoListAPI = (args) =>{
    return http({
        url: '/agents/infoList',
        method: 'get',
        headers: {
          'token': localStorage.getItem('token')
        },
        params: args,
    });
 }
   /**
 * 获取加盟店详情
 * @param {Object} args 
 */
export const getAgentDetailAPI = (args) =>{
    return http({
        url: '/agents/info/'+args,
        method: 'get',
        headers: {
          'token': localStorage.getItem('token')
        },
        // params: args,
    });
 }
/**
 * 获取加盟店管理员列表
 * @param {Object} args 
 */
export const getfranchisedAdminListAPI = (args) =>{
  return http({
      url: '/admins/franchisee/list',
      method: 'get',
      headers: {
        'token': localStorage.getItem('token')
      },
      // params: args,
  });
}
/**
 * 添加加盟店管理员
 * @param {Object} args 
 */
export const addFranchisedadminAPI = (args) =>{
  return http({
      url: '/agents/register/franchisee',
      method: 'post',
      headers: {
        'token': localStorage.getItem('token')
      },
      data: args,
  });
}
/**
 * 修改加盟店管理员
 * @param {Object} args 
 */
export const changeFranchisedadminAPI = (args) =>{
  return http({
      url: '/agents/update/franchisee',
      method: 'post',
      headers: {
        'token': localStorage.getItem('token')
      },
      data: JSON.stringify(args),
  });
}

/**
 * 调整余额
 * @param {Object} args 
 */
export const changeyeAPI = (args) =>{
  return http({
      url: '/wallet/adjust',
      method: 'post',
      headers: {
        'token': localStorage.getItem('token')
      },
      data: args,
  });
}
/**
 * 删除代理
 * @param {Object} args 
 */
export const delAngetuserAPI = (args) =>{
  return http({
      url: '/agents/delete/'+args,
      method: 'delete',
      headers: {
        'token': localStorage.getItem('token')
      },
      // data: args,
  });
}