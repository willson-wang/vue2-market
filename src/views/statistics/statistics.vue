/*
 * @Author: peter 
 * @Date: 2017-12-04 18:57:34 
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-20 10:56:02
 */
<template>
    <div>
        <div class="ui-chart-title clearFix">
            <drop-select :drop-down-list="dropDownList" title="全部图表" :is-btn="false" :is-split-btn="false" @dropDownValue="getDropDownValue"></drop-select>
            <span class="f-r">图表管理</span>
        </div>
        <ul class="ui-chart-list">
            <li v-if="chartAuthority.hasSiteSales" v-show="chartShow.isShowSiteSales">
                <site-sales height="390px" @titleOprationEmit="getCurrentOpration"></site-sales>
            </li>
            <li v-if="chartAuthority.hasPersonnelComparison" v-show="chartShow.isShowPersonnelComparison">
                <personnel-comparison height="390px" @titleOprationEmit="getCurrentOpration"></personnel-comparison>
            </li>
            <li v-if="chartAuthority.hasPersonnelPlatform" v-show="chartShow.isShowPersonnelPlatform">
                <personnel-platform height="390px" @titleOprationEmit="getCurrentOpration"></personnel-platform>
            </li>
            <li v-if="chartAuthority.hasPlatformPersonnelComparison" v-show="chartShow.isShowPlatformPersonnelComparison">
                <platform-personnel-comparison height="390px" @titleOprationEmit="getCurrentOpration"></platform-personnel-comparison>
            </li>
            <li v-if="chartAuthority.hasPersonnelSales" v-show="chartShow.isShowPersonnelSales">
                <personnel-sales height="390px" @titleOprationEmit="getCurrentOpration"></personnel-sales>
            </li>
            <li class="clearFix">
                <div class="f-l ui-chart-double">
                    <div class="ui-chart-card-title" style="margin-top: 10px; padding-top: 8px">
                        <span class="f-l">
                            销售目标
                        </span>
                        <span class="f-r">
                            <chart-title @chartTitleListen="getCurrentOpration" :user-options-list="userOptionsList" :is-user-select="false" :is-date-select="false"></chart-title>
                        </span>
                    </div>
                    <div class="ui-chart-card-item" style="height: 390px">
                        <gauge-chart id="nineChart" height="390px" width="100%" :detail-data='zx9DetailData'></gauge-chart>
                    </div>
                </div>
                <div class="f-r ui-chart-double">
                    <div class="ui-chart-card-title" style="margin-top: 10px; padding-top: 8px">
                        <span class="f-l">
                            平台占比统计
                        </span>
                        <span class="f-r">
                            <chart-title @chartTitleListen="getCurrentOpration" :user-options-list="userOptionsList" :is-user-select="false" :is-date-select="false"></chart-title>
                        </span>
                    </div>
                    <div class="ui-chart-card-item" style="height: 390px">
                        <pie-chart id='tenChart' height="390px" :title='zx3Title' :x-title='zx3XTitle' :detail-data='zx4DetailData' width='100%'></pie-chart>
                    </div>
                </div>
            </li>
            <li v-if="chartAuthority.hasPersonnelProfitAndLoss" v-show="chartShow.isShowPersonnelProfitAndLoss">
                <personnel-profit-and-loss @titleOprationEmit="getCurrentOpration" height="390px"></personnel-profit-and-loss>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import CylindricalGraph from '@/components/charts/cylindrical-graph';
    import PieChart from '@/components/charts/pie-chart';
    import LineChart from '@/components/charts/line-chart';
    import GaugeChart from '@/components/charts/gauge-chart';
    import ChartTitle from '@/components/chart-title';
    import SiteSales from './components/site-sales';
    import PersonnelComparison from './components/personnel-comparison';
    import PersonnelPlatform from './components/personnel-platform';
    import PlatformPersonnelComparison from './components/platform-personnel-comparison';
    import PersonnelSales from './components/personnel-sales';
    import PersonnelProfitAndLoss from './components/personnel-profit-and-loss';
    export default {
        components: {
            CylindricalGraph,
            PieChart,
            LineChart,
            GaugeChart,
            ChartTitle,
            SiteSales,
            PersonnelComparison,
            PersonnelPlatform,
            PlatformPersonnelComparison,
            PersonnelSales,
            PersonnelProfitAndLoss
        },
        data () {
            return {
                chartAuthority: {},
                chartShow: {},
                siteSalesDataType: 'month',
                userOptionsList: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                lineChartOptions: {
                    axisLineX: {
                        show: false,
                        lineStyle: {
                            color: '#b1b5c0',
                            type: 'solid'
                        }
                    },
                    splitLineX: {
                        show: false
                    },
                    axisLineY: {
                        show: false,
                        lineStyle: {
                            color: '#b1b5c0',
                            type: 'solid'
                        }
                    },
                    splitLineY: {
                        show: true,
                        lineStyle: {
                            color: '#b1b5c0',
                            type: 'dashed'
                        }
                    },
                    splitAreaY: {
                        show: false
                    }

                },
                clineChartOptions: {
                    axisLineX: {
                        show: false,
                        lineStyle: {
                            color: '#b1b5c0',
                            type: 'solid'
                        }
                    },
                    splitLineX: {
                        show: false
                    },
                    splitAreaX: {
                        show: false
                    },
                    axisLineY: {
                        show: false,
                        lineStyle: {
                            color: '#b1b5c0',
                            type: 'solid'
                        }
                    },
                    splitLineY: {
                        show: true,
                        lineStyle: {
                            color: '#b1b5c0',
                            type: 'dashed'
                        }
                    },
                    splitAreaY: {
                        show: false
                    }

                },
                dropDownList: [
                    {
                        key: 'a',
                        value: '图一'
                    },
                    {
                        key: 'b',
                        value: '图二'
                    },
                    {
                        key: 'c',
                        value: '图三'
                    },
                    {
                        key: 'd',
                        value: '图四'
                    },
                    {
                        key: 'e',
                        value: '图五'
                    }
                ],
                oneData: [{
                    name: 'UK',
                    type: 'bar',
                    data: [6, 10, 86, 30, 50, 50],
                    // 是否进行堆叠，设置相同值即可堆叠，如不需要堆叠则把stack设置为null,且把barwidth设置为auto即可
                    stack: null,
                    barWidth: 'auto',
                    itemStyle: {
                        normal: {
                            color: '#71e1b7'
                        }
                    },
                    // 设置柱状图柱形图内文本，默认不显示即show为false,position设置字体显示的位置，共有top，left，inside，insideLeft，insideBottomLeft各个方向都有
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    }
                }, {
                    name: 'US',
                    type: 'bar',
                    data: [10, 5, 46, 40, 80, 30],
                    // 是否进行堆叠，设置相同值即可堆叠，如不需要堆叠则把stack设置为null,且把barwidth设置为auto即可
                    stack: null,
                    barWidth: 'auto',
                    itemStyle: {
                        normal: {
                            color: '#5b81fe'
                        }
                    },
                    // 设置柱状图柱形图内文本，默认不显示即show为false,position设置字体显示的位置，共有top，left，inside，insideLeft，insideBottomLeft各个方向都有
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    }
                }, {
                    name: 'GERM',
                    type: 'bar',
                    data: [10, 20, 46, 20, 90, 40],
                    // 是否进行堆叠，设置相同值即可堆叠，如不需要堆叠则把stack设置为null,且把barwidth设置为auto即可
                    stack: null,
                    barWidth: 'auto',
                    itemStyle: {
                        normal: {
                            color: '#ffbb36'
                        }
                    },
                    // 设置柱状图柱形图内文本，默认不显示即show为false,position设置字体显示的位置，共有top，left，inside，insideLeft，insideBottomLeft各个方向都有
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    }
                }],
                twoData: [{
                    name: 'pageA',
                    type: 'bar',
                    stack: 'vistors',
                    barWidth: '60%',
                    data: [79, 52, 200, 334, 390, 330, 220],
                    animationDuration: 3000
                }, {
                    name: 'pageB',
                    type: 'bar',
                    stack: 'vistors',
                    barWidth: '60%',
                    data: [80, 52, 200, 334, 390, 330, 220],
                    animationDuration: 3000
                }, {
                    name: 'pageC',
                    type: 'bar',
                    stack: 'vistors',
                    barWidth: '60%',
                    data: [30, 52, 200, 334, 390, 330, 220],
                    animationDuration: 3000
                }],
                threeData: [
                    {
                        name: 'WEEKLY WRITE ARTICLES',
                        type: 'pie',
                        roseType: 'radius',
                        data: [
                            { value: 320, name: 'industries' },
                            { value: 240, name: 'technology' },
                            { value: 149, name: 'forex' },
                            { value: 100, name: 'gold' },
                            { value: 59, name: 'forecasts' },
                            { value: 49, name: 'markets' }
                        ],
                        animationEasing: 'cubicInOut',
                        animationDuration: 2600
                    }
                ],
                fourData: [
                    {
                        name: 'WEEKLY WRITE ARTICLES',
                        type: 'pie',
                        radius: '55%',
                        data: [
                            { value: 320, name: 'industries' },
                            { value: 240, name: 'technology' },
                            { value: 149, name: 'forex' },
                            { value: 100, name: 'gold' },
                            { value: 59, name: 'forecasts' },
                            { value: 49, name: 'markets' }
                        ],
                        animationEasing: 'cubicInOut',
                        animationDuration: 2600
                    }
                ],
                sixData: [{
                    name: 'RF',
                    itemStyle: {
                        areaStyle: {
                            color: 'rgba(255,255,255,0)'
                        },
                        lineStyle: {
                            color: '#5b81fe'
                        }
                    },
                    smooth: true,
                    type: 'line',
                    data: [5, 2, 7, 15, 5, 12, 13],
                    animationDuration: 2600,
                    animationEasing: 'cubicInOut'
                },
                {
                    name: 'EB',
                    smooth: true,
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: 'rgba(2, 197, 233, 0.2)',
                            lineStyle: {
                                color: '#5b81fe'
                            },
                            areaStyle: {
                                color: 'rgba(255,255,255,0)'
                            }
                        }
                    },
                    data: [7, 15, 2, 10, 7, 10, 8],
                    animationDuration: 2000,
                    animationEasing: 'quadraticOut'
                }],
                sevenData: [{
                    name: 'EB',
                    type: 'bar',
                    data: [6, 10, 86, 30, 50, 50],
                    stack: null,
                    barWidth: 'auto',
                    itemStyle: {
                        normal: {
                            color: '#5e82fd'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'insideTop'
                        }
                    }
                }, {
                    name: 'Rumi',
                    type: 'bar',
                    data: [10, 20, 76, 80, 40, 20],
                    stack: null,
                    barWidth: 'auto',
                    itemStyle: {
                        normal: {
                            color: '#ffc935'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'insideTop'
                        }
                    }
                }],
                eightData: [{
                    name: '李月如',
                    itemStyle: {
                        areaStyle: {
                            color: 'rgba(255,255,255,0)'
                        },
                        lineStyle: {
                            color: '#5b81fe'
                        }
                    },
                    smooth: true,
                    type: 'line',
                    data: [10, 5, 3, 8, 9, 12, 6],
                    animationDuration: 2600,
                    animationEasing: 'cubicInOut'
                }],
                nineData: {
                    max: 10,
                    value: 6
                },
                elevenData: [{
                    name: '总额',
                    type: 'bar',
                    data: [6, 10, 86, 30, 50, 50],
                    stack: '总量',
                    barWidth: 'auto',
                    itemStyle: {
                        normal: {
                            color: '#5e82fd'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                            fontSize: 10
                        }
                    }
                }, {
                    name: '毛利',
                    type: 'bar',
                    data: [10, 20, 76, 80, 40, 20],
                    stack: null,
                    barWidth: 'auto',
                    itemStyle: {
                        normal: {
                            color: '#ff586c'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                            fontSize: 10
                        }
                    }
                }, {
                    name: '亏损',
                    type: 'bar',
                    data: [-5, -8, -8, -6, -5, -2],
                    stack: '总量',
                    barWidth: 'auto',
                    itemStyle: {
                        normal: {
                            color: '#48d9a2'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'insideLeft',
                            fontSize: 10
                        }
                    }
                }]

            };
        },
        computed: {
            ...mapGetters([
                'showChartAuthority',
                'showChartStatus'
            ]),
            zxTitle () {
                return '';
            },
            zxXTitle () {
                return ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'];
            },
            zxDetailData () {
                return this.oneData;
            },
            zxlegend () {
                return [{
                    name: 'UK',
                    textStyle: {
                        color: '#71e1b7'
                    }
                }, {
                    name: 'US',
                    textStyle: {
                        color: '#5b81fe'
                    }
                }, {
                    name: 'GERM',
                    textStyle: {
                        color: '#ffbb36'
                    }
                }];
            },
            zx2Title () {
                return '比对图';
            },
            zx2XTitle () {
                return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            },
            zx2DetailData () {
                return this.twoData;
            },
            zx3Title () {
                return '';
            },
            zx3XTitle () {
                return ['industries', 'technology', 'forex', 'gold', 'forecasts', 'markets'];
            },
            zx3DetailData () {
                return this.threeData;
            },
            zx4DetailData () {
                return this.fourData;
            },
            zx5Title () {
                return '';
            },
            zx5XTitle () {
                return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            },
            zx6DetailData () {
                return this.sixData;
            },
            zx6legend () {
                return [{
                    name: 'RF',
                    textStyle: {
                        color: '#71e1b7'
                    }
                }, {
                    name: 'EB',
                    textStyle: {
                        color: '#5b81fe'
                    }
                }];
            },
            zx7DetailData () {
                return this.sevenData;
            },
            zx7legend () {
                return [{
                    name: 'EB',
                    textStyle: {
                        color: '#5e82fd'
                    }
                }, {
                    name: 'Rumi',
                    textStyle: {
                        color: '#ffc935'
                    }
                }];
            },
            zx8DetailData () {
                return this.eightData;
            },
            zx9DetailData () {
                return this.nineData;
            },
            zx11DetailData () {
                return this.elevenData;
            },
            zx11legend () {
                return [{
                    name: '总额',
                    textStyle: {
                        color: '#5e82fd'
                    }
                }, {
                    name: '毛利',
                    textStyle: {
                        color: '#ff586c'
                    }
                }, {
                    name: '亏损',
                    textStyle: {
                        color: '#48d9a2'
                    }
                }];
            }
        },
        methods: {
            ...mapActions([
                'GetShowChartAuthorityInfo'
            ]),
            linkTo (name, params) {
                this.$router.push({
                    name: name,
                    params: params
                });
            },
            getDropDownValue (val) {
                console.log(val);
            },
            getCurrentOpration (info) {
                var _this = this;
                const DISPATCH_STATUS = {
                    show (name) {
                        return [name] && this[name + '_type']();
                    },
                    month_type () {
                        console.log('month');
                        _this.siteSalesDataType = 'month';
                        _this.getSiteSalesInfoList();
                    },
                    quarter_type () {
                        console.log('quarter');
                        _this.siteSalesDataType = 'quarter';
                        _this.getSiteSalesInfoList();
                    },
                    year_type () {
                        console.log('year');
                    },
                    custom_type () {
                        console.log('custom');
                    },
                    user_type () {
                        console.log('user');
                    },
                    del_type () {
                        console.log('del');
                        _this.$store.commit('CHANGE_SHOW_CHART_STATUS', {
                            chartType: info.chartType,
                            value: false
                        });
                    },
                    scal_type () {
                        console.log('scal');
                        _this.linkTo('statistics_detail', {
                            currentView: 'siteSales'
                        });
                    }
                };
                DISPATCH_STATUS.show(info.type);
            }
        },
        created () {
            if (this.showChartAuthority.hasSiteSales) {
                console.log(this.showChartAuthority);
                this.chartAuthority = this.showChartAuthority;
                this.chartShow = this.showChartStatus;
            } else {
                this.GetShowChartAuthorityInfo().then(response => {
                    console.log(response);
                    this.chartAuthority = response;
                    this.chartShow = this.showChartStatus;
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../assets/less/index.less';
    .ui-chart-list {
        list-style: none;
        margin: 0;
        padding: 0;

        >li {
            float: left;
            width: 49%;
            background-color: @base-white;
            margin-top: 20px;
            padding: 0 20px;

            .ui-chart-card-title {
                height: 40px;
                line-height: 40px;
                overflow: hidden;
                color: @base-info1;
            }
            
            .ui-chart-card-item {
                height: 400px;
            }

            .ui-chart-double {
                width: 48%;
                background-color: @base-white;
                padding: 0 20px;

                &:first-of-type {
                    margin-right: 2%;
                }
            }
        }

        >li:first-of-type {
            margin-right: 2%;
        }

        >li:nth-of-type(3) {
            margin-right: 2%;
        }

        >li:nth-of-type(5) {
            margin-right: 2%;
        }

        >li:nth-of-type(6) {
            background-color: @base-body-bg;
            padding: 0;
        }
    }
</style>
