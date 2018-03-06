/*
 * @Author: peter
 * @Date: 2017-10-12 10:13:13
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-01 15:33:38
 */
import { loginByuserName } from '@/api/login/login';
import * as types from './mutations-type';
export default {
    LoginByuserName ({ commit }, userInfo) {
        const username = userInfo.username.trim();
        return new Promise((resolve, reject) => {
            loginByuserName(username, userInfo.password).then(response => {
                const data = response.data;
                commit(types['SAVE_USERINFO'], data);
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
};
