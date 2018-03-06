import * as types from '../../mutations-type';
import { getSiteSalesInfo, getPersonnelComparisonInfo, getPersonnelPlatformInfo, getPlatformPersonnelComparisonInfo, getPersonnelSalesInfo, getPersonnelProfitAndLossInfo, getShowChartAuthorityInfo, getSiteSalesDetailInfo } from '@/api/statistics';

const statistics = {
    state: {
        // 站点销售统计
        siteSalesChart: {},
        // 站点销售统计详情数据
        siteSalesDetailChart: {},
        // 人员对比统计
        personnelComparisonChart: {},
        // 个人平台统计
        personnelPlatformChart: {},
        // 平台人员销售额对比
        platformPersonnelComparisonChart: {},
        // 个人销售统计
        personnelSalesChart: {},
        // 人员盈亏统计
        personnelProfitAndLossChart: {},
        // 拥有哪些图表的显示权限
        showChartAuthority: {},
        // 图表显示的状态
        showChartStatus: {
            isShowSiteSales: true,
            isShowPersonnelComparison: true,
            isShowPersonnelPlatform: true,
            isShowPlatformPersonnelComparison: true,
            isShowPersonnelSales: true,
            isShowPersonnelProfitAndLoss: true
        }
    },
    mutations: {
        [types.SAVE_SITE_SALES_CHART] (state, siteSalesChartInfo) {
            state.siteSalesChart = siteSalesChartInfo;
        },
        [types.SAVE_PERSONNEL_COMPARISON_CHART] (state, personnelComparisonChartInfo) {
            state.personnelComparisonChart = personnelComparisonChartInfo;
        },
        [types.SAVE_PERSONNEL_PLATFORM_CHART] (state, personnelPlatformChartInfo) {
            state.personnelPlatformChart = personnelPlatformChartInfo;
        },
        [types.SAVE_PLATFORM_PERSONNEL_PLATFORM_CHART] (state, platformPersonnelComparisonChartInfo) {
            state.platformPersonnelComparisonChart = platformPersonnelComparisonChartInfo;
        },
        [types.SAVE_PERSONNEL_SALES_CHART] (state, personnelSalesChartInfo) {
            state.personnelSalesChart = personnelSalesChartInfo;
        },
        [types.SAVE_PERSONNEL_PROFIT_AND_LOSS_CHART] (state, personnelProfitAndLossChartInfo) {
            state.personnelProfitAndLossChart = personnelProfitAndLossChartInfo;
        },
        [types.SAVE_SHOW_CHART_AUTHORITY] (state, showChartAuthority) {
            state.showChartAuthority = showChartAuthority;
        },
        [types.CHANGE_SHOW_CHART_STATUS] (state, toggleChart) {
            state.showChartStatus[toggleChart.chartType] = toggleChart.value;
        },
        [types.SAVE_SITE_SALES_DETAIL_CHART] (state, siteSalesDetailChartInfo) {
            state.siteSalesDetailChart = siteSalesDetailChartInfo;
        }
    },
    actions: {
        GetSiteSalesInfo ({ commit }, queryData) {
            if (!queryData) {
                queryData = {};
            }

            return new Promise((resolve, reject) => {
                getSiteSalesInfo(queryData).then(response => {
                    commit(types['SAVE_SITE_SALES_CHART'], response.data);
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        GetPersonnelComparisonInfo ({ commit }, queryData) {
            if (!queryData) {
                queryData = {};
            }

            return new Promise((resolve, reject) => {
                getPersonnelComparisonInfo(queryData).then(response => {
                    commit(types['SAVE_PERSONNEL_COMPARISON_CHART'], response.data);
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        GetPersonnelPlatformInfo ({ commit }, queryData) {
            if (!queryData) {
                queryData = {};
            }

            return new Promise((resolve, reject) => {
                getPersonnelPlatformInfo(queryData).then(response => {
                    commit(types['SAVE_PERSONNEL_PLATFORM_CHART'], response.data);
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        GetPlatformPersonnelComparisonInfo ({ commit }, queryData) {
            if (!queryData) {
                queryData = {};
            }

            return new Promise((resolve, reject) => {
                getPlatformPersonnelComparisonInfo(queryData).then(response => {
                    commit(types['SAVE_PERSONNEL_PLATFORM_CHART'], response.data);
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        GetPersonnelSalesInfo ({ commit }, queryData) {
            if (!queryData) {
                queryData = {};
            }

            return new Promise((resolve, reject) => {
                getPersonnelSalesInfo(queryData).then(response => {
                    commit(types['SAVE_PERSONNEL_PLATFORM_CHART'], response.data);
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        GetPersonnelProfitAndLossInfo ({ commit }, queryData) {
            if (!queryData) {
                queryData = {};
            }

            return new Promise((resolve, reject) => {
                getPersonnelProfitAndLossInfo(queryData).then(response => {
                    commit(types['SAVE_PERSONNEL_PROFIT_AND_LOSS_CHART'], response.data);
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        GetShowChartAuthorityInfo ({ commit }, queryData) {
            if (!queryData) {
                queryData = {};
            }

            return new Promise((resolve, reject) => {
                getShowChartAuthorityInfo(queryData).then(response => {
                    commit(types['SAVE_SHOW_CHART_AUTHORITY'], response.data);
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        GetSiteSalesDetailInfo ({ commit }, queryData) {
            if (!queryData) {
                queryData = {};
            }

            return new Promise((resolve, reject) => {
                getSiteSalesDetailInfo(queryData).then(response => {
                    commit(types['SAVE_SITE_SALES_DETAIL_CHART'], response.data);
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
};

export default statistics;
