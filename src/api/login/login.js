/*
 * @Author: peter
 * @Date: 2017-10-12 10:12:29
 * @Last Modified by: peter
 * @Last Modified time: 2018-01-17 18:54:53
 */
import fetch from '@/utils/fetch';

export function loginByuserName (userName, password) {
    const data = {
        username: userName,
        pwd: password,
        warehouse_id: '119'
    };

    return fetch.postAjax('/login/login/UserLogin', data);
}

export function loginOut () {
    return fetch({
        url: '/login/loginout',
        method: 'post'
    });
}
