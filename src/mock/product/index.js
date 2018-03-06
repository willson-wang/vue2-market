import { paramURL } from '@/utils';
import Mock from 'mockjs';

const Random = Mock.Random;

export default {
    getProductList: (config) => {
        const param = paramURL(config.url);
        let result = {};
        result.key = [{
                label: '产品名称',
                width: 180,
                field: 'productName',
                className: 'ui-active-color'
            },
            { label: 'SKU', field: 'sku' },
            { label: '公司分类', width: 140, field: 'classify', className: 'ui-active-color' },
            { label: '毛重(g)', field: 'weight' },
            { label: '状态', field: 'status' },
            { label: '是否备货', field: 'isChoice' },
            { label: '基本信息', width: 200, field: 'info', tip: true },
            { label: '相关人员', field: 'staff' },
            { label: '包装', field: 'pack' },
            { label: '侵权平台', field: 'terrace' },
            { label: '仓库', field: 'warehouse' }
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
                selType: 'checks',
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
                selType: 'radio',
                value: [{
                        key: '1',
                        val: '激活'
                    },
                    {
                        key: '2',
                        val: '未激活'
                    },
                    {
                        key: '3',
                        val: '激活中'
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
                    },
                    {
                        key: '55',
                        val: 'E级'
                    },
                    {
                        key: '66',
                        val: 'F级'
                    },
                    {
                        key: '77',
                        val: 'G级'
                    },
                    {
                        key: '88',
                        val: 'H级'
                    },
                    {
                        key: '99',
                        val: 'I级'
                    },
                    {
                        key: '00',
                        val: 'J级'
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
                productName: "@cword('零一二三四五六七八九十', 3)",
                sku: '@float(0, 100000, 2, 4)',
                classify: '@cword("家居户外",2)',
                weight: '@float(0, 1000, 1, 2)',
                skuId: '@increment()',
                status: '@integer(1,2)' === 1 ? '待清仓' : '已停售',
                isChoice: "@integer(1,2)",
                info: '@csentence()',
                staff: '@cname()',
                pack: '@character(upper)' + '袋',
                terrace: '@word(3,8)',
                warehouse: '@cword("零一光明清溪", 2)'
            }))
        }
        result.value = value.slice(start, end);
        result.pagingData = {
            limit: +param.limit,
            offset: +param.offset,
            total: count
        };
        console.log('sssaaa');
        return result;
    }
}