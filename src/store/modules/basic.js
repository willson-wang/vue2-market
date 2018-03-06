/*
 * @Author: peter
 * @Date: 2017-10-12 10:12:00
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-01 15:33:27
 */
import * as types from '../mutations-type';
import { getProductList } from '@/api/basic';
const product = {
    state: {
        productMdInfo: {}
    },
    mutations: {
        [types.SAVE_PRODUCTMD_INFO] (state, productMdInfo) {
            state.productMdInfo = productMdInfo;
        }
    },
    actions: {
        GetProductList ({ commit }, queryData) {
            if (!queryData) {
                queryData = {};
            }
            return new Promise((resolve, reject) => {
                getProductList(queryData).then(response => {
                    console.log(response.data);
                    commit(types['SAVE_PRODUCTMD_INFO'], response.data);
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
};

export default product;
