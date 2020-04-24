import http from '@/public/http';
/**
 * 获取分类列表
 * @param {Object} args 
 */
export const getordinaryRewardListAPI = (args) =>{
    return http({
        url: '/rewards/page',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
          },
        params: args,
    });
 }