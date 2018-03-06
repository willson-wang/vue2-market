<template>
    <div class="ui-personnel-comparison">
        <div class="ui-chart-card-title">
            <span class="f-l">
                人员对比统计(多人员单平台)
            </span>
            <span class="f-r">
                <chart-title @chartTitleListen="getCurrentOpration" :user-options-list="userOptionsList" :is-user-select="false" :is-date-select="true"></chart-title>
            </span>
        </div>
        <div class="ui-chart-card-item" :style="{'height': height}">
            <cylindrical-graph id='secondChart' :height="height"  :x-title='initPersonnelComparisonXCoordinate' :detail-data='initPersonnelComparisonData' width='100%' :cline-chart-options='clineChartOptions' :is-show-x="false" :legend="initPersonnelComparisonLegend" :legend-direction="legendDirection"></cylindrical-graph>
        </div>
    </div>
</template>

<script>
    import CylindricalGraph from '@/components/charts/cylindrical-graph';
    import ChartTitle from '@/components/chart-title';
    import {mapActions, mapGetters} from 'vuex';
    export default {
        name: 'personnelComparison',
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
                initPersonnelComparisonXCoordinate: [],
                initPersonnelComparisonData: [],
                initPersonnelComparisonLegend: [],
                personnelComparisonConfigLegend: [{
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
                personnelComparisonConfigData: [{
                    type: 'bar',
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
                    type: 'bar',
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
                    type: 'bar',
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
                }]
            };
        },
        computed: {
            ...mapGetters([
                'personnelComparisonChart'
            ])
        },
        methods: {
            ...mapActions([
                'GetPersonnelComparisonInfo'
            ]),
            linkTo (name, params) {
                this.$router.push({
                    name: name,
                    params: params
                });
            },
            unfoldData (data) {
                const arrList = data.value;
                let personnelComparisonData = [];
                let personnelComparisonLegend = [];
                let obj = {};
                let objLegned = {};
                for (let i = 0, len = arrList.length; i < len; i++) {
                    obj = Object.assign({}, this.personnelComparisonConfigData[i], arrList[i]);
                    objLegned = Object.assign({}, this.personnelComparisonConfigLegend[i], arrList[i]);
                    personnelComparisonData.push(obj);
                    personnelComparisonLegend.push(objLegned);
                }
                // 设置每次获取到的动态数据
                this.initPersonnelComparisonData = personnelComparisonData;
                // 设置hover时的提示信息
                this.initPersonnelComparisonLegend = personnelComparisonLegend;
                // 设置坐标轴坐标
                this.initPersonnelComparisonXCoordinate = data.xCoordinate;
            },
            getPersonnelComparisonInfoList () {
                var _this = this;
                this.GetPersonnelComparisonInfo({
                    date_type: this.personnelComparisonDataType
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
                        _this.personnelComparisonDataType = 'month';
                        _this.getPersonnelComparisonInfoList();
                    },
                    quarter_type () {
                        console.log('quarter');
                        _this.personnelComparisonDataType = 'quarter';
                        _this.getPersonnelComparisonInfoList();
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
                            chartType: 'isShowPersonnelComparison'
                        });
                    },
                    scal_type () {
                        console.log('scal');
                        _this.linkTo('statistics_detail', {
                            currentView: 'personnelComparison'
                        });
                    }
                };
                DISPATCH_STATUS.show(info.type);
            }
        },
        mounted () {
            // 获取站点销售统计数据
            if (this.personnelComparisonChart.value) {
                console.log(this.personnelComparisonChart);
                this.unfoldData(this.personnelComparisonChart);
            } else {
                this.getPersonnelComparisonInfoList();
            }
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../../assets/less/index.less';
    .ui-personnel-comparison {
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

