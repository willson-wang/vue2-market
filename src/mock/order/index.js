import { paramURL } from '@/utils';
import Mock from 'mockjs';

const Random = Mock.Random;

export default {
    getOrderOneOrderList: (config) => {
        const param = paramURL(config.url);
        let result = {};
        result.key = [{
                label: '订单号',
                width: 180,
                field: 'orderNo',
                className: 'ui-active-color'
            },
            { label: '销售平台', field: 'salesPlat' },
            { label: 'SKU', width: 140, field: 'sku', className: 'ui-active-color' },
            { label: '产品品牌', field: 'productBrand' },
            { label: '所属仓库', field: 'warehouse' },
            { label: '订单类型', field: 'orderType' },
            { label: '平台订单号', width: 200, field: 'platOrderNo' },
            { label: '物流方式\跟踪号', field: 'logistics', tip: true },
            { label: '出货状态', field: 'sailStatus' },
            { label: '完成状态', field: 'complateStatus' },
            { label: '金额', field: 'price' },
            { label: '北京付款时间', width: 180, field: 'payTime' }
        ];
        const drop_down_box = {};
        drop_down_box.conditionList = [{
                name: Random.word(3, 8),
                label: '所在部门',
                value: [{
                        key: '111',
                        val: '开发部门'
                    },
                    {
                        key: '222',
                        val: 'UED'
                    },
                    {
                        key: '333',
                        val: '客服部'
                    },
                    {
                        key: '444',
                        val: '业务部'
                    }
                ]
            },
            {
                name: Random.word(3, 8),
                label: '所有侵权平台',
                selType: 'radio',
                value: [{
                        key: '1111',
                        val: '电热热'
                    },
                    {
                        key: '2222',
                        val: '电动头发'
                    },
                    {
                        key: '3333',
                        val: '超级棒棒糖'
                    },
                    {
                        key: '4444',
                        val: '激光灯泡'
                    }
                ]
            },
            {
                name: Random.word(3, 8),
                label: '激活状态',
                value: [{
                        key: '1',
                        val: '激活'
                    },
                    {
                        key: '2',
                        val: '未激活'
                    }
                ]
            },
            {
                name: Random.word(3, 8),
                label: '安全等级',
                value: [{
                        key: '11',
                        val: 'A级'
                    },
                    {
                        key: '22',
                        val: 'B级'
                    },
                    {
                        key: '33',
                        val: 'C级'
                    },
                    {
                        key: '44',
                        val: 'D级'
                    }
                ]
            }
        ];
        result.drop_down_box = drop_down_box;
        const value = [];
        const count = 300;
        const start = (Number(param.offset) - 1) * Number(param.limit);
        const end = Number(param.offset) * Number(param.limit);
        // 第一种造数据的方式，引入Random来进行造数据
        // for (let i = 0; i < count; i++) {
        //     value.push({
        //         orderId: Random.increment(),
        //         orderNo: 'CO' + Random.now('day', 'yyyyMMdd') + 'LZD',
        //         salesPlat: Random.first(),
        //         sku: Random.float(0, 100000000000, 2),
        //         skuId: Random.increment(),
        //         productBrand: Random.cword('零一二三四五六七八九十', 3),
        //         warehouse: Random.cword('光明清溪', 2),
        //         warehouseId: '172',
        //         orderType: '普通',
        //         platOrderNo: Random.integer(0),
        //         logistics: Random.cword('零一二三四五六七八九十', 5),
        //         sailStatus: '未出货',
        //         complateStatus: '备货中',
        //         price: Random.float(0, 100, 4) + 'USD',
        //         payTime: Random.now('second')
        //     })
        // }

        // 第二种方式直接使用Mock.mock并加@来进行造数据
        for (let i = 0; i < count; i++) {
            value.push(Mock.mock({
                orderId: '@increment',
                orderNo: 'CO' + '@now("day", "yyyyMMdd")' + 'LZD',
                salesPlat: '@first',
                sku: '@float(0, 100000, 2, 4)',
                skuId: '@increment()',
                productBrand: "@cword('零一二三四五六七八九十', 3)",
                warehouse: '@cword("光明清溪", 2)',
                warehouseId: '172',
                orderType: '普通',
                platOrderNo: '@integer(0)',
                logistics: '@cword("零一二三四五六七八九十画江湖电风扇", 10)',
                sailStatus: '未出货',
                complateStatus: '备货中',
                price: '@float(0, 100, 2, 4)' + 'USD',
                payTime: '@now("second")'
            }))
        }
        result.value = value.slice(start, end);
        result.pagingData = {
            limit: +param.limit,
            offset: +param.offset,
            total: count
        };
        return result;
    },
    // 取消订单
    orderCancel: (config) => {
        return {
            status: Random.boolean(1, 2, false)
        };
    },
    // 锁定订单
    orderLock: () => {
        return {
            status: Random.boolean()
        }
    },
    // 解锁订单
    orderUnLock: () => {
        return {
            status: Random.boolean()
        }
    },
    getOrderOneManageList: (config) => {
        const param = paramURL(config.url);
        let result = {};
        result.key = [
            { label: '亏损SKU', field: 'lossSku' },
            { label: '异常原因', field: 'errorReason' },
            {
                label: '订单号',
                width: 180,
                field: 'orderNo',
                className: 'ui-active-color'
            },
            { label: '账号', field: 'userAccount' },
        ];
        const value = [];
        const count = 20;
        const start = (Number(param.offset) - 1) * Number(param.limit);
        const end = Number(param.offset) * Number(param.limit);


        // 第二种方式直接使用Mock.mock并加@来进行造数据
        for (let i = 0; i < count; i++) {
            value.push(Mock.mock({
                orderId: '@increment',
                orderNo: 'CO' + '@now("day", "yyyyMMdd")' + 'LZD',
                salesPlat: '@first',
                sku: '@float(0, 100000, 2, 4)',
                lossSku: '@float(0, 100000, 2, 4)',
                skuId: '@increment()',
                productBrand: "@cword('零一二三四五六七八九十', 3)",
                warehouse: '@cword("光明清溪", 2)',
                warehouseId: '172',
                orderType: '普通',
                platOrderNo: '@integer(0)',
                logistics: '@cword("零一二三四五六七八九十", 5)',
                errorReason: '@cword("零一二三四五六七八九十", 5)',
                sailStatus: '未出货',
                complateStatus: '备货中',
                price: '@float(0, 100, 2, 4)' + 'USD',
                userAccount: '@float(0, 100, 2, 4)',
                payTime: '@now("second")'
            }));

        }



        result.value = value.slice(start, end);
        result.pagingData = {
            limit: +param.limit,
            offset: +param.offset,
            total: count
        }
        return result;
    }
}