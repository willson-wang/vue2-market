import * as types from '../../mutations-type';
import { getOrderOneOrderList, getOrderOneManageList, orderCancel } from '@/api/order';
const order = {
    state: {
        orderOneOrderInfo: {},
        orderOneManageListInfo: {}
    },
    mutations: {
        [types.SAVE_ORDER_ONE_ORDER_INFO] (state, data) {
            state.orderOneOrderInfo = data;
        },
        [types.SAVE_ORDER_ONE_MANAGE_LIST_INFO] (state, data) {
            state.orderOneManageListInfo = data;
        }
    },
    actions: {
        GetOrderOneOrderList ({ commit }, queryData) {
            if (!queryData) {
                queryData = {
                    limit: 20,
                    offset: 1
                };
            }

            return new Promise((resolve, reject) => {
                getOrderOneOrderList(queryData).then(response => {
                    commit(types['SAVE_ORDER_ONE_ORDER_INFO'], response.data);
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        OrderCancel ({ commit }, cancelId) {
            return new Promise((resolve, reject) => {
                orderCancel(cancelId).then(response => {
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        GetOrderOneManageList ({ commit }, queryData) {
            if (!queryData) {
                queryData = {
                    limit: 20,
                    offset: 1
                };
            }

            return new Promise((resolve, reject) => {
                getOrderOneManageList(queryData).then(response => {
                    commit(types['SAVE_ORDER_ONE_MANAGE_LIST_INFO'], response.data);
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
};

export default order;
