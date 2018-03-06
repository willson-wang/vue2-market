import fetch from '@/utils/fetch.js';
import CONFIG from '@/assets/js/config';

export function getOrderOneOrderList (queryData) {
    const data = Object.assign(CONFIG.ajaxData, queryData);
    return fetch.getAjax('/order/orderOne/orderList', data);
}
// 取消订单
export function orderCancel (cancelId) {
    const data = Object.assign(CONFIG.ajaxData, cancelId);
    return fetch.postAjax('/order/orderList/orderCancel', data);
}
// 锁定订单
export function orderLock (cancelId) {
    const data = Object.assign(CONFIG.ajaxData, cancelId);
    return fetch.postAjax('/order/orderList/orderLock', data);
}
// 解锁订单
export function orderUnLock (cancelId) {
    const data = Object.assign(CONFIG.ajaxData, cancelId);
    return fetch.postAjax('/order/orderList/orderUnLock', data);
}

export function getOrderOneManageList (queryData) {
    const data = Object.assign(CONFIG.ajaxData, queryData);
    return fetch.getAjax('/order/orderOne/manageList', data);
}
