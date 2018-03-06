import fetch from '@/utils/fetch.js';
import CONFIG from '@/assets/js/config';

export function getProductList (queryData) {
    const data = Object.assign(CONFIG.ajaxData, queryData);
    return fetch.getAjax('/product/product/productList', data);
}
