import Mock from 'mockjs';
import statisticsAPI from './statistics';
import orderAPI from './order'
import productAPI from './product'
import loginAPI from './login'

Mock.setup({
    // 指定被拦截的 Ajax 请求的响应时间，单位是毫秒
    timeout: '350-600'
});

// 登录接口
Mock.mock(/\/login\/login\/UserLogin/, 'post', loginAPI.loginIn);

// 统计模块模拟接口
Mock.mock(/\/statistics\/siteSalesInfo/, 'get', statisticsAPI.getSiteSalesInfo);
Mock.mock(/\/statistics\/personnelComparisonInfo/, 'get', statisticsAPI.getPersonnelComparisonInfo);
Mock.mock(/\/statistics\/personnelPlatformInfo/, 'get', statisticsAPI.getPersonnelPlatformInfo);
Mock.mock(/\/statistics\/platformPersonnelComparisonInfo/, 'get', statisticsAPI.getPlatformPersonnelComparisonInfo);
Mock.mock(/\/statistics\/personnelSalesInfo/, 'get', statisticsAPI.getPersonnelSalesInfo);
Mock.mock(/\/statistics\/personnelProfitAndLossInfo/, 'get', statisticsAPI.getPersonnelProfitAndLossInfo);
Mock.mock(/\/statistics\/showChartAuthorityInfo/, 'get', statisticsAPI.getShowChartAuthorityInfo);
Mock.mock(/\/statistics\/siteSalesDetailInfo/, 'get', statisticsAPI.getSiteSalesDetailInfo);

// 订单模块模拟接口
Mock.mock(/\/order\/orderOne\/orderList/, 'get', orderAPI.getOrderOneOrderList);
Mock.mock(/\/order\/orderList\/orderCancel/, 'post', orderAPI.orderCancel);
Mock.mock(/\/order\/orderList\/orderLock/, 'post', orderAPI.orderLock);
Mock.mock(/\/order\/orderList\/orderUnLock/, 'post', orderAPI.orderUnLock);
Mock.mock(/\/order\/orderOne\/manageList/, 'get', orderAPI.getOrderOneManageList);

// 产品模块接口
Mock.mock(/\/product\/product\/productList/, 'get', productAPI.getProductList);

export default Mock;