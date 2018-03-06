/*
 * @Author: peter
 * @Date: 2017-10-12 10:12:17
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-01 11:55:14
 */
import fetch from '@/utils/fetch.js';
import CONFIG from '@/assets/js/config';

export function getProductList (queryData) {
    const data = Object.assign(CONFIG.ajaxData, queryData);
    return fetch.getAjax('/basic/productinfo/getProductInfoList', data);
}
