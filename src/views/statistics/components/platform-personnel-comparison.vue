<template>
    <div class="ui-platform-personnel-comparison">
        <div class="ui-chart-card-title">
            <span class="f-l">
                平台人员销售额对比(多人员，多平台)
            </span>
            <span class="f-r">
                <chart-title @chartTitleListen="getCurrentOpration" :user-options-list="userOptionsList" :is-user-select="false" :is-date-select="true" :height="height"></chart-title>
            </span>
        </div>
        <div class="ui-chart-card-item" :style="{'height': height}">
            <cylindrical-graph id='sevenChart'  :x-title='initPlatformPersonnelComparisonXCoordinate' :detail-data='initPlatformPersonnelComparisonData' width='100%' :cline-chart-options='clineChartOptions' :legend="initPlatformPersonnelComparisonLegend" :height="height" :legend-direction="legendDirection"></cylindrical-graph>
        </div>
    </div>
</template>

<script>
    import CylindricalGraph from '@/components/charts/cylindrical-graph';
    import ChartTitle from '@/components/chart-title';
    import {mapActions, mapGetters} from 'vuex';
    export default {
        name: 'platformPersonnelComparison',
        components: {
            CylindricalGraph,
            ChartTitle
        },
        props: {
            isScalAndDel: {
                type: Boolean,
                default: true
            },
            height: {},
            legendDirection: {}
        },
        data () {
            return {
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
                initPlatformPersonnelComparisonXCoordinate: [],
                initPlatformPersonnelComparisonData: [],
                initPlatformPersonnelComparisonLegend: [],
                platformPersonnelComparisonConfigLegend: [{
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
                platformPersonnelComparisonConfigData: [{
                    type: 'bar',
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
                    type: 'bar',
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
                }]
            };
        },
        computed: {
            ...mapGetters([
                'platformPersonnelComparisonChart'
            ])
        },
        methods: {
            ...mapActions([
                'GetPlatformPersonnelComparisonInfo'
            ]),
            linkTo (name, params) {
                this.$router.push({
                    name: name,
                    params: params
                });
            },
            unfoldData (data) {
                const arrList = data.value;
                let platformPersonnelComparisonData = [];
                let platformPersonnelComparisonLegend = [];
                let obj = {};
                let objLegned = {};
                for (let i = 0, len = arrList.length; i < len; i++) {
                    obj = Object.assign({}, this.platformPersonnelComparisonConfigData[i], arrList[i]);
                    objLegned = Object.assign({}, this.platformPersonnelComparisonConfigLegend[i], arrList[i]);
                    platformPersonnelComparisonData.push(obj);
                    platformPersonnelComparisonLegend.push(objLegned);
                }
                // 设置每次获取到的动态数据
                this.initPlatformPersonnelComparisonData = platformPersonnelComparisonData;
                // 设置hover时的提示信息
                this.initPlatformPersonnelComparisonLegend = platformPersonnelComparisonLegend;
                // 设置坐标轴坐标
                this.initPlatformPersonnelComparisonXCoordinate = data.xCoordinate;
            },
            getPlatformPersonnelComparisonInfoList () {
                var _this = this;
                this.GetPlatformPersonnelComparisonInfo({
                    date_type: this.platformPersonnelComparisonDataType
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
                        _this.platformPersonnelComparisonDataType = 'month';
                        _this.getPlatformPersonnelComparisonInfoList();
                    },
                    quarter_type () {
                        console.log('quarter');
                        _this.platformPersonnelComparisonDataType = 'quarter';
                        _this.getPlatformPersonnelComparisonInfoList();
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
                            chartType: 'isShowPlatformPersonnelComparison'
                        });
                    },
                    scal_type () {
                        console.log('scal');
                        _this.linkTo('statistics_detail', {
                            currentView: 'platformPersonnelComparison'
                        });
                    }
                };
                DISPATCH_STATUS.show(info.type);
            }
        },
        mounted () {
            // 获取站点销售统计数据
            if (this.platformPersonnelComparisonChart.value) {
                console.log(this.platformPersonnelComparisonChart);
                this.unfoldData(this.platformPersonnelComparisonChart);
            } else {
                this.getPlatformPersonnelComparisonInfoList();
            }
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../../assets/less/index.less';
    .ui-platform-personnel-comparison {
        width: 100%;

        .ui-chart-card-title {
            height: 40px;
            line-height: 40px;
            overflow: hidden;
            color: @base-info1;
            margin-top: 10px;
            padding-top: 8px;
        }
        
        .ui-chart-card-item {
            height: 400px;
        }
    }
</style>

