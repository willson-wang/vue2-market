/*
 * @Author: peter
 * @Date: 2017-10-12 10:14:20
 * @Last Modified by: peter
 * @Last Modified time: 2018-01-17 19:02:12
 */
import * as types from './mutations-type';
import * as Storage from '@/utils/storage';

export default {
    [types.SAVE_USERINFO] (state, userInfo) {
        state.userInfo = userInfo;
        Storage.setSessionStorage('userInfo', JSON.stringify(userInfo));
    },
    [types.TOGGLE_LOADING] (state, flag) {
        state.showLoading = flag;
    },
    [types.ADD_NEW_TAG] (state, tagInfo) {
        state.showPageTagsList.map((item, index) => {
            if (tagInfo.name === item.name) {
                state.showPageTagsList.splice(index, 1);
            }
        });
        state.showPageTagsList.unshift(tagInfo);
        Storage.setLocalStorage('showPageTagsList', JSON.stringify(state.showPageTagsList));
    },
    [types.REMOVE_TAG] (state, tagName) {
        state.showPageTagsList.map((item, index) => {
            if (item.name === tagName) {
                state.showPageTagsList.splice(index, 1);
                Storage.setLocalStorage('showPageTagsList', JSON.stringify(state.showPageTagsList));
            }
        });
    },
    [types.SET_TAG] (state) {
        state.showPageTagsList = Storage.getLocalStorage('showPageTagsList') ? JSON.parse(Storage.getLocalStorage('showPageTagsList')) : [];
    }
};
