import http from '@/public/http';
/**
 * 获取管理员列表
 * @param {Object} args 
 */
export const getAdminListAPI = (args) =>{
    return http({
        url: '/admins/listByAll',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
          },
        params: args,
    });
}

/**
 * 删除管理员
 * @param {Object} args 
 */
export const deleteAdminAPI = (args) =>{
    return http({
        url: '/admins/delete',
        method: 'DELETE',
        headers: {
            'token': localStorage.getItem('token')
          },
        params: args,
    });
 }

 /**
 * 获取管理员详情
 * @param {Object} args 
 */
export const getAdminInfoAPI = (args) =>{
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
export const pushAdminInfoAPI = (args) =>{
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
export const putAdminInfoAPI = (args) => {
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
 * 给管理员设置角色
 * @param {Object} args 
 */
export const updateAdminRoleAPI = (args) => {
    return http({
        url: '/admins/updateAdminRole',
        method: 'post',
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        data: args,
    });
};