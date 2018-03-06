<template>
    <div class="ui-site-sales">
        <div class="ui-chart-card-title">
            <span class="f-l">
                站点销售统计
            </span>
            <span class="f-r" :class="className">
                <chart-title  @chartTitleListen="getCurrentOpration" :user-options-list="userOptionsList" :is-user-select="false" :is-date-select="true" 
                :is-scal-and-del="isScalAndDel"></chart-title>
            </span>
        </div>
        <div class="ui-chart-card-item" :style="{'height': height}">
            <line-chart id='fiveChart' :height="height" :x-title='initSiteSalesXCoordinate' :detail-data='initSiteSalesData' width='100%'   :line-chart-options='lineChartOptions' :legend="initSiteSalesLegend" :legend-direction="legendDirection"></line-chart>
        </div>
    </div>
</template>

<script>
    import LineChart from '@/components/charts/line-chart';
    import ChartTitle from '@/components/chart-title';
    import {mapActions, mapGetters} from 'vuex';
    export default {
        name: 'siteSales',
        components: {
            LineChart,
            ChartTitle
        },
        props: {
            isScalAndDel: {
                type: Boolean,
                default: true
            },
            height: {},
            // legend显示的位置
            legendDirection: {},
            // 添加是否水平居中的类
            className: {}
        },
        data () {
            return {
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
                            color: '#e4eaec',
                            type: 'dashed'
                        }
                    },
                    splitAreaY: {
                        show: false
                    }

                },
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
                // 站点销售统计
                initSiteSalesXCoordinate: [],
                initSiteSalesData: [],
                initSiteSalesLegend: [],
                siteSalesConfigLegend: [{
                    textStyle: {
                        color: '#767d8f',
                        fontSize: 14
                    }
                }, {
                    textStyle: {
                        color: '#767d8f',
                        fontSize: 14
                    }
                }, {
                    textStyle: {
                        color: '#767d8f',
                        fontSize: 14
                    }
                }],
                siteSalesConfigData: [{
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                color: 'rgba(255,255,255,0)'
                            },
                            lineStyle: {
                                color: '#71e1b7'
                            }
                        }
                    },
                    smooth: true,
                    type: 'line',
                    animationDuration: 2600,
                    animationEasing: 'cubicInOut'
                },
                {
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
                    animationDuration: 2000,
                    animationEasing: 'quadraticOut'
                },
                {
                    smooth: true,
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: 'rgba(2, 197, 233, 0.2)',
                            lineStyle: {
                                color: '#ffbb36'
                            },
                            areaStyle: {
                                color: 'rgba(255,255,255,0)'
                            }
                        }
                    },
                    animationDuration: 2000,
                    animationEasing: 'quadraticOut'
                }]
            };
        },
        computed: {
            ...mapGetters([
                'siteSalesChart'
            ])
        },
        methods: {
            ...mapActions([
                'GetSiteSalesInfo'
            ]),
            linkTo (name, params) {
                this.$router.push({
                    name: name,
                    params: params
                });
            },
            unfoldData (data) {
                const arrList = data.value;
                let siteSalesData = [];
                let siteSalesLegend = [];
                let obj = {};
                let objLegned = {};
                for (let i = 0, len = arrList.length; i < len; i++) {
                    obj = Object.assign({}, this.siteSalesConfigData[i], arrList[i]);
                    objLegned = Object.assign({}, this.siteSalesConfigLegend[i], arrList[i]);
                    siteSalesData.push(obj);
                    siteSalesLegend.push(objLegned);
                }
                // 设置每次获取到的动态数据
                this.initSiteSalesData = siteSalesData;
                // 设置hover时的提示信息
                this.initSiteSalesLegend = siteSalesLegend;
                // 设置坐标轴坐标
                this.initSiteSalesXCoordinate = data.xCoordinate;
            },
            getSiteSalesInfoList () {
                var _this = this;
                this.GetSiteSalesInfo({
                    date_type: this.siteSalesDataType
                }).then((response) => {
                    console.log(response);
                    _this.unfoldData(response);
                }).catch((error) => {
                    console.log(error);
                });
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
                        _this.$emit('titleOprationEmit', {
                            type: 'del',
                            chartType: 'isShowSiteSales'
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
        mounted () {
            // 获取站点销售统计数据
            if (this.siteSalesChart.value) {
                console.log(this.siteSalesChart);
                this.unfoldData(this.siteSalesChart);
            } else {
                this.getSiteSalesInfoList();
            }
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../../assets/less/index.less';
    .ui-site-sales {
        width: 100%;
        padding-top: 0.1px;

        .ui-chart-card-title {
            position: relative;
            height: 40px;
            line-height: 40px;
            overflow: hidden;
            color: @base-info1;
            margin-top: 10px;
            padding-top: 8px;

            .ui-text-center {
                position: absolute;
                left: 50%;

                >div {
                    left: -50%;
                }
            }
        }
        
        .ui-chart-card-item {
            height: 400px;
        }
    }
</style>

