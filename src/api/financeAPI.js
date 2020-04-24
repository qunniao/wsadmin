import http from '@/public/http';
/**
 * 获取账户列表
 * @param {Object} args 
 */
export const getPayeeAccountsListAPI = (args) =>{
    return http({
        url: '/payeeAccounts/list',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
          },
        params: args,
    });
 }
 /**
 * 获取账户信息
 * @param {Object} args 
 */
export const getPayeeAccountsInfoAPI = (args) =>{
    return http({
        url: '/payeeAccounts/info/'+args,
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
          },
        // params: args,
    });
 }

  /**
 * 修改账户信息
 * @param {Object} args 
 */
export const updatePayeeAccountsInfoAPI = (args) => {
    return http({
        url: '/payeeAccounts/update',
        method: 'put',
        headers: {
            'token': localStorage.getItem('token')
          },
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        // },
        params: args,
    });
};
/**
 * 获取转账记录列表
 * @param {Object} args 
 */
export const getPayRecordListAPI = (args) =>{
    return http({
        url: '/transfers/page',
        headers: {
            'token': localStorage.getItem('token')
          },
        method: 'get',
        params: args,
    });
 }
 /**
 * 获取钱包收支明细列表
 * @param {Object} args 
 */
export const getBalanceRecordListAPI = (args) =>{
    return http({
        url: '/wallet/history/page',
        headers: {
            'token': localStorage.getItem('token')
          },
        method: 'get',
        params: args,
    });
 }