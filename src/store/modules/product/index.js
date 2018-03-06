import * as types from '../../mutations-type';
import { getProductList } from '@/api/product';
const product = {
    state: {
        productMdInfo: {}
    },
    mutations: {
        [types.SAVE_PRODUCT_INFO] (state, data) {
            state.productMdInfo = data;
        }
    },
    actions: {
        GetProductList ({ commit }, queryData) {
            if (!queryData) {
                queryData = {
                    limit: 20,
                    offset: 1
                };
            }
            return new Promise((resolve, reject) => {
                getProductList(queryData).then(response => {
                    commit(types['SAVE_PRODUCT_INFO'], response.data);
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
};

export default product;
