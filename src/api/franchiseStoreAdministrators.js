import http from '@/public/http';
/**
 * 获取加盟店管理员列表
 * @param {Object} args 
 */
export const getFranchisedListAPI = (args) =>{
    return http({
        url: '/admins/franchisee/list',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
          },
        params: args,
    });
}
/**
 * 获取加盟店管理员详情
 * @param {Object} args 
 */
export const getFranchiseDetailAPI = (args) =>{
    return http({
        url: '/admins/info/'+args,
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
export const pushFranchiseDetailAPI = (args) =>{
    return http({
        url: '/admins/save',
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
export const putFranchiseDetailAPI = (args) => {
    return http({
        url: '/admins/update',
        method: 'put',
        headers: {
            'token': localStorage.getItem('token')
          },
        data: args,
    });
};
/**
 * 修改加盟店管理员
 * @param {Object} args 
 */
export const deleteFranchiseAPI = (args) =>{
    return http({
        url: '/admins/delete',
        method: 'DELETE',
        headers: {
            'token': localStorage.getItem('token')
          },
        params: args,
    });
 }