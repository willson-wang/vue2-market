/*
 * @Author: peter
 * @Date: 2017-10-12 10:13:17
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-18 16:48:56
 */

// 全局的getters，所有的getters都定义在这里
export default {
    userInfo: state => state.userInfo,
    productMdInfo: state => state.product.productMdInfo,
    showLoading: state => state.showLoading,
    showPageTagsList: state => state.showPageTagsList,
    siteSalesChart: state => state.statistics.siteSalesChart,
    personnelComparisonChart: state => state.statistics.personnelComparisonChart,
    personnelPlatformChart: state => state.statistics.personnelPlatformChart,
    platformPersonnelComparisonChart: state => state.statistics.platformPersonnelComparisonChart,
    personnelSalesChart: state => state.statistics.personnelSalesChart,
    personnelProfitAndLossChart: state => state.statistics.personnelProfitAndLossChart,
    orderOneOrderInfo: state => state.order.orderOneOrderInfo,
    orderOneManageListInfo: state => state.order.orderOneManageListInfo,
    showChartAuthority: state => state.statistics.showChartAuthority,
    showChartStatus: state => state.statistics.showChartStatus,
    siteSalesDetailChart: state => state.statistics.siteSalesDetailChart
};
