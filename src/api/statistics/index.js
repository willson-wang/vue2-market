/*
 * @Author: peter
 * @Date: 2017-12-06 14:27:12
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-18 16:29:15
 */
import fetch from '@/utils/fetch.js';
import CONFIG from '@/assets/js/config';

// 获取站点销售统计数据
export function getSiteSalesInfo (queryData) {
    const data = Object.assign(CONFIG.ajaxData, queryData);
    return fetch.getAjax('/statistics/siteSalesInfo', data);
};

// 获取人员对比统计
export function getPersonnelComparisonInfo (queryData) {
    const data = Object.assign(CONFIG.ajaxData, queryData);
    return fetch.getAjax('/statistics/personnelComparisonInfo', data);
}

// 获取人员对比统计
export function getPersonnelPlatformInfo (queryData) {
    const data = Object.assign(CONFIG.ajaxData, queryData);
    return fetch.getAjax('/statistics/personnelPlatformInfo', data);
}

// 获取平台人员销售额对比
export function getPlatformPersonnelComparisonInfo (queryData) {
    const data = Object.assign(CONFIG.ajaxData, queryData);
    return fetch.getAjax('/statistics/platformPersonnelComparisonInfo', data);
}

// 获取个人销售统计
export function getPersonnelSalesInfo (queryData) {
    const data = Object.assign(CONFIG.ajaxData, queryData);
    return fetch.getAjax('/statistics/personnelSalesInfo', data);
};

// 获取人员盈亏统
export function getPersonnelProfitAndLossInfo (queryData) {
    const data = Object.assign(CONFIG.ajaxData, queryData);
    return fetch.getAjax('/statistics/personnelProfitAndLossInfo', data);
};

// 获取显示图表的权限
export function getShowChartAuthorityInfo (queryData) {
    const data = Object.assign(CONFIG.ajaxData, queryData);
    return fetch.getAjax('/statistics/showChartAuthorityInfo', data);
};

// 获取站点销售统计详情数据
export function getSiteSalesDetailInfo (queryData) {
    const data = Object.assign(CONFIG.ajaxData, queryData);
    return fetch.getAjax('/statistics/siteSalesDetailInfo', data);
};
