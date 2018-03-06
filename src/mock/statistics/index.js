import { paramURL } from '@/utils';
import Mock from 'mockjs';

const Random = Mock.Random;

export default {
    // 站点销售统计数据
    getSiteSalesInfo: (config) => {
        console.log(paramURL(config.url));
        let result = null;
        const param = paramURL(config.url);
        const monthData = {
            xCoordinate: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            value: [{
                    name: 'UK',
                    data: [Random.integer(10, 250), Random.integer(10, 250), Random.integer(10, 250), Random.integer(10, 250), Random.integer(10, 250), Random.integer(10, 250), Random.integer(10, 250)]
                },
                {
                    name: 'US',
                    data: [Random.integer(10, 250), Random.integer(10, 250), Random.integer(10, 250), Random.integer(10, 250), Random.integer(10, 250), Random.integer(10, 250), Random.integer(10, 250)]
                },
                {
                    name: 'GERM',
                    data: [Random.integer(10, 250), Random.integer(10, 250), Random.integer(10, 250), Random.integer(10, 250), Random.integer(10, 250), Random.integer(10, 250), Random.integer(10, 250)]
                }
            ]
        }

        const quarterData = {
            xCoordinate: ['第一季度', '第二季度', '第三季度', '第四季度'],
            value: [{
                    name: 'UK',
                    data: [Random.integer(150, 300), Random.integer(150, 300), Random.integer(150, 300), Random.integer(150, 300)]
                },
                {
                    name: 'US',
                    data: [Random.integer(150, 300), Random.integer(150, 300), Random.integer(150, 300), Random.integer(150, 300)]
                },
                {
                    name: 'GERM',
                    data: [Random.integer(150, 300), Random.integer(150, 300), Random.integer(150, 300), Random.integer(150, 300)]
                }
            ]
        }

        if (param.date_type === 'quarter') {
            result = quarterData;
        } else {
            result = monthData;
        }
        return result;
    },
    // 人员对比统计
    getPersonnelComparisonInfo: (config) => {
        let result = null;
        const param = paramURL(config.url);
        const monthData = {
            xCoordinate: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
            value: [{
                    name: 'UK',
                    data: [Random.integer(5, 100), Random.integer(5, 100), Random.integer(5, 100), Random.integer(5, 100), Random.integer(5, 100), Random.integer(5, 100)]
                },
                {
                    name: 'US',
                    data: [Random.integer(5, 100), Random.integer(5, 100), Random.integer(5, 100), Random.integer(5, 100), Random.integer(5, 100), Random.integer(5, 100)]
                },
                {
                    name: 'GERM',
                    data: [Random.integer(5, 100), Random.integer(5, 100), Random.integer(5, 100), Random.integer(5, 100), Random.integer(5, 100), Random.integer(5, 100)]
                }
            ]
        }

        const quarterData = {
            xCoordinate: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
            value: [{
                    name: 'UK',
                    data: [Random.integer(50, 250), Random.integer(50, 250), Random.integer(50, 250), Random.integer(50, 250), Random.integer(50, 250), Random.integer(50, 250)]
                },
                {
                    name: 'US',
                    data: [Random.integer(50, 250), Random.integer(50, 250), Random.integer(50, 250), Random.integer(50, 250), Random.integer(50, 250), Random.integer(50, 250)]
                },
                {
                    name: 'GERM',
                    data: [Random.integer(50, 250), Random.integer(50, 250), Random.integer(50, 250), Random.integer(50, 250), Random.integer(50, 250), Random.integer(50, 250)]
                }
            ]
        }

        if (param.date_type === 'quarter') {
            result = quarterData;
        } else {
            result = monthData;
        }
        return result;
    },
    // 个人平台统计
    getPersonnelPlatformInfo: (config) => {
        let result = null;
        const param = paramURL(config.url);
        const monthData = {
            xCoordinate: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            value: [{
                    name: 'RF',
                    data: [5, 2, 7, 15, 5, 12, 13]
                },
                {
                    name: 'EB',
                    data: [7, 15, 2, 10, 7, 10, 8]
                }
            ]
        }

        const quarterData = {
            xCoordinate: ['第一季度', '第二季度', '第三季度', '第四季度'],
            value: [{
                    name: 'RF',
                    data: [80, 100, 71, 84, 120, 100, 60]
                },
                {
                    name: 'EB',
                    data: [120, 140, 190, 180, 90, 80, 110]
                }
            ]
        }

        if (param.date_type === 'quarter') {
            result = quarterData;
        } else {
            result = monthData;
        }
        return result;
    },
    // 平台人员销售额对比
    getPlatformPersonnelComparisonInfo: (config) => {
        let result = null;
        const param = paramURL(config.url);
        const monthData = {
            xCoordinate: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
            value: [{
                    name: 'EB',
                    data: [6, 10, 86, 30, 50, 50]
                },
                {
                    name: 'Rumi',
                    data: [10, 5, 46, 40, 80, 30]
                }
            ]
        }

        const quarterData = {
            xCoordinate: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
            value: [{
                    name: 'EB',
                    data: [100, 160, 101, 64, 80, 100]
                },
                {
                    name: 'Rumi',
                    data: [160, 120, 90, 80, 150, 180]
                }
            ]
        }

        if (param.date_type === 'quarter') {
            result = quarterData;
        } else {
            result = monthData;
        }
        return result;
    },
    // 个人销售统计数据
    getPersonnelSalesInfo: (config) => {
        let result = null;
        const param = paramURL(config.url);
        const monthData = {
            xCoordinate: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            value: [{
                name: '李月如',
                data: [10, 5, 3, 8, 9, 12, 6]
            }]
        }

        const quarterData = {
            xCoordinate: ['第一季度', '第二季度', '第三季度', '第四季度'],
            value: [{
                name: '李月如',
                data: [300, 180, 201, 234]
            }]
        }

        if (param.date_type === 'quarter') {
            result = quarterData;
        } else {
            result = monthData;
        }
        return result;
    },
    //人员盈亏数据
    getPersonnelProfitAndLossInfo: (config) => {
        let result = null;
        const param = paramURL(config.url);
        const monthData = {
            xCoordinate: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
            value: [{
                    name: '总额',
                    data: [6, 10, 86, 30, 50, 50]
                },
                {
                    name: '毛利',
                    data: [10, 20, 76, 80, 40, 20]
                },
                {
                    name: '亏损',
                    data: [-5, -8, -8, -6, -5, -2]
                }
            ]
        }

        const quarterData = {
            xCoordinate: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
            value: [{
                    name: '总额',
                    data: [100, 160, 101, 64, 80, 100]
                },
                {
                    name: '毛利',
                    data: [160, 120, 90, 80, 150, 180]
                },
                {
                    name: '亏损',
                    data: [0, -8, -15, -36, -0, -10]
                }
            ]
        }

        if (param.date_type === 'quarter') {
            result = quarterData;
        } else {
            result = monthData;
        }
        return result;
    },
    // 获取图表显示的权限
    getShowChartAuthorityInfo(config) {
        let result = null;
        const param = paramURL(config.url);

        return {
            hasSiteSales: true,
            hasPersonnelComparison: true,
            hasPersonnelPlatform: true,
            hasPlatformPersonnelComparison: true,
            hasPersonnelSales: true,
            hasPersonnelProfitAndLoss: true
        }
    },
    // 获取站点销售统计详情数据
    getSiteSalesDetailInfo(config) {
        const param = paramURL(config.url);
        let result = {};
        result.key = [{
                label: '平台',
                field: 'plate',
                width: 100
            },
            { label: '人员', field: 'user', width: 100 },
            { label: '站点', field: 'site', width: 100 },
            { label: '年月', field: 'yearMonth', width: 100 },
            { label: '指标类型', field: 'indexType', width: 100 }
        ];
        const days = 31;
        for (let i = 1; i < days + 1; i++) {
            result.key.push({
                label: i < 10 ? ('0' + i) : i,
                field: 'date' + i,
                width: 75
            });
        }
        result.key.push({ label: '统计', field: 'statistics', width: 120 });

        result.frezonLeftKey = [
            { label: '平台', field: 'plate', },
            { label: '人员', field: 'user' },
            { label: '站点', field: 'site' },
            { label: '年月', field: 'yearMonth' },
            { label: '指标类型', field: 'indexType' }
        ];
        result.frezonRightKey = [
            { label: '统计', field: 'statistics' }
        ];
        const value = [];
        const count = 100;
        const start = (Number(param.offset) - 1) * Number(param.limit);
        const end = Number(param.offset) * Number(param.limit);

        for (let i = 0; i < count; i++) {
            value.push(Mock.mock({
                plate: 'EB',
                user: "@cword('王二狗李四张三刘能', 2)",
                site: "@cword('USJHLOHKGSKKL', 3)",
                yearMonth: '@now("day", "yyyy")',
                indexType: '总额',
                statistics: "@float(0, 100, 1, 2)",
                date1: '@float(0, 10, 1, 2)',
                date2: '@float(0, 10, 1, 2)',
                date3: '@float(0, 10, 1, 2)',
                date4: '@float(0, 10, 1, 2)',
                date5: '@float(0, 10, 1, 2)',
                date6: '@float(0, 10, 1, 2)',
                date7: '@float(0, 10, 1, 2)',
                date8: '@float(0, 10, 1, 2)',
                date9: '@float(0, 10, 1, 2)',
                date10: '@float(0, 10, 1, 2)',
                date11: '@float(0, 10, 1, 2)',
                date12: '@float(0, 10, 1, 2)',
                date13: '@float(0, 10, 1, 2)',
                date14: '@float(0, 10, 1, 2)',
                date15: '@float(0, 10, 1, 2)',
                date16: '@float(0, 10, 1, 2)',
                date17: '@float(0, 10, 1, 2)',
                date18: '@float(0, 10, 1, 2)',
                date19: '@float(0, 10, 1, 2)',
                date20: '@float(0, 10, 1, 2)',
                date21: '@float(0, 10, 1, 2)',
                date22: '@float(0, 10, 1, 2)',
                date23: '@float(0, 10, 1, 2)',
                date24: '@float(0, 10, 1, 2)',
                date25: '@float(0, 10, 1, 2)',
                date26: '@float(0, 10, 1, 2)',
                date27: '@float(0, 10, 1, 2)',
                date28: '@float(0, 10, 1, 2)',
                date29: '@float(0, 10, 1, 2)',
                date30: '@float(0, 10, 1, 2)',
                date31: '@float(0, 10, 1, 2)',
            }))
        }
        result.value = value.slice(start, end);
        result.pagingData = {
            limit: +param.limit,
            offset: +param.offset,
            total: count
        };
        return result;
    }
};