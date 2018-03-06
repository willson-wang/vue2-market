/*
 * @Author: peter
 * @Date: 2017-10-12 10:13:01
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-06 19:30:48
 */
import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/login/login';
import Home from '@/views/layout/home';
import NotFound from '@/views/not-found/404';
import Product from '@/views/product/product';
import Layout from '@/views/layout/layout';
import Statistics from '@/views/statistics/statistics';
import StatisticsDetail from '@/views/statistics/statistics-detail';
import Basic from '@/views/basic/basic';
import Order from '@/views/order/order';
import Purchase from '@/views/purchase/purchase';
import System from '@/views/system/system';
import Warehouse from '@/views/warehouse/warehouse';
import Logistics from '@/views/logistics/logistics';

Vue.use(Router);

export const constantRouterMap = [{
    path: '/login',
    component: Login,
    hidden: true
}, {
    path: '/home',
    component: Layout,
    redirect: '/home/home_one',
    hidden: true,
    name: 'home',
    title: '首页',
    children: [
        { path: 'home_one', component: Home, name: 'home_one' }
    ]
}, {
    path: '/product',
    name: 'product',
    title: '产品',
    component: Layout,
    redirect: '/product/product_one',
    hidden: true,
    children: [
        { path: 'product_one', component: Product, 'name': 'product_one', title: '产品1' }
    ]
}, {
    path: '/order',
    name: 'order',
    title: '订单',
    component: Layout,
    redirect: '/order/order_one',
    hidden: true,
    children: [
        { path: 'order_one', component: Order, 'name': 'order_one', title: '订单1' }
    ]
}, {
    path: '/purchase',
    name: 'purchase',
    title: '采购',
    component: Layout,
    redirect: '/purchase/purchase_one',
    hidden: true,
    children: [
        { path: 'purchase_one', component: Purchase, 'name': 'purchase_one', title: '采购1' }
    ]
}, {
    path: '/system',
    name: 'system',
    title: '系统',
    component: Layout,
    redirect: '/system/system_one',
    hidden: true,
    children: [
        { path: 'system_one', component: System, 'name': 'system_one', title: '系统1' }
    ]
}, {
    path: '/basic',
    name: 'basic',
    title: '基础',
    component: Layout,
    redirect: '/basic/basic_one',
    hidden: true,
    children: [
        { path: 'basic_one', component: Basic, 'name': 'basic_one', title: '基础1' }
    ]
}, {
    path: '/warehouse',
    name: 'warehouse',
    title: '仓库',
    component: Layout,
    redirect: '/warehouse/warehouse_one',
    hidden: true,
    children: [
        { path: 'warehouse_one', component: Warehouse, 'name': 'warehouse_one', title: '仓库1' }
    ]
}, {
    path: '/logistics',
    name: 'logistics',
    title: '物流',
    component: Layout,
    redirect: '/logistics/logistics_one',
    hidden: true,
    children: [
        { path: 'logistics_one', component: Logistics, 'name': 'logistics_one', title: '物流1' }
    ]
}, {
    path: '/statistics',
    name: 'statistics',
    title: '统计',
    component: Layout,
    redirect: '/statistics/statistics_one',
    hidden: true,
    children: [
        { path: 'statistics_one', component: Statistics, 'name': 'statistics_one', title: '统计1' },
        { path: 'statistics_detail', component: StatisticsDetail, 'name': 'statistics_detail', title: '统计详情' }
    ]
}, {
    path: '/error',
    name: '错误页面',
    component: Layout,
    redirect: '/error/404',
    hidden: true,
    children: [
        { path: '404', component: NotFound }
    ]
}, {
    path: '/',
    redirect: '/home'
}, {
    path: '*',
    redirect: '/error'
}];

export default new Router({ routes: constantRouterMap });
