import http from '@/public/http';
/**
 * 获取角色列表
 * @param {Object} args 
 */
export const getAdminRoleListAPI = (args) =>{
    return http({
        url: '/adminRole/list',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
          },
        params: args,
    });
}

/**
 * 获取全部权限列表
 * @param {Object} args 
 */
export const getAdminActionListAPI = (args) =>{
    return http({
        url: '/adminRole/adminActionlistByAll',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
          },
        params: args,
    });
}

/**
 * 获取角色权限列表
 * @param {Object} args 
 */
export const getAdminRolePowerListAPI = (args) =>{
    return http({
        url: '/adminRole/adminRolePowerList',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
          },
        params: args,
    });
}


/**
 * 删除角色
 * @param {Object} args 
 */
export const deleteAdminRoleAPI = (args) =>{
    return http({
        url: '/adminRole/delete',
        method: 'DELETE',
        headers: {
            'token': localStorage.getItem('token')
          },
        params: args,
    });
 }

 /**
 * 获取角色详情
 * @param {Object} args 
 */
export const getAdminRoleInfoAPI = (args) =>{
    return http({
        url: '/adminRole/info/'+args,
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
          },
        // params: args,
    });
}
/**
 * 添加角色
 * @param {Object} args 
 */
export const pushAdminRoleInfoAPI = (args) =>{
    return http({
        url: '/adminRole/save',
        method: 'post',
        headers: {
            'token': localStorage.getItem('token')
          },
        data: args,
    });
}
/**
 * 修改角色
 * @param {Object} args 
 */
export const putAdminRoleInfoAPI = (args) => {
    return http({
        url: '/adminRole/update',
        method: 'put',
        headers: {
            'token': localStorage.getItem('token')
          },
        data: args,
    });
};

/**
 * 修改角色
 * @param {Object} args 
 */
export const updateAdminRolePowerAPI = (args) => {
    return http({
        url: '/adminRole/updateAdminRolePower',
        method: 'post',
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        data: args,
    });
};

