/*
 * @Author: peter 
 * @Date: 2017-12-04 18:53:47 
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-20 10:59:46
 */
<template>
    <div :id='id' :style='{height: height, width: width}' :class='className' :options='lineChartOptions'></div>
</template>

<script>
    const echarts = require('echarts/lib/echarts'); // 引入echarts主模块
    require('echarts/lib/chart/line'); // 引入折线图
    require('echarts/lib/component/tooltip'); // 引入提示框
    require('echarts/lib/component/title'); // 引入标题组件
    require('echarts/theme/macarons'); // echarts 主题

    export default {
        props: {
            id: {
                type: String,
                default: 'chart'
            },
            className: {
                type: String,
                default: 'ui-chart'
            },
            width: {
                type: String,
                default: '600px'
            },
            height: {
                type: String,
                default: '400px'
            },
            title: {
                type: String,
                default: ''
            },
            xTitle: {
                type: Array,
                default () {
                    return [];
                }
            },
            yTitle: {
                type: Array,
                default () {
                    return [];
                }
            },
            detailData: {
                type: Array,
                default () {
                    return [];
                }
            },
            lineChartOptions: {
                type: Object,
                default () {
                    return {};
                }
            },
            legend: {
                type: Array,
                default () {
                    return [];
                }
            },
            legendDirection: {
                type: String,
                default: 'right'
            },
            isLightToolTip: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                chart: null,
                lightToolTip: {
                    trigger: 'axis',
                    padding: [11, 20],
                    axisPointer: {
                        type: 'cross'
                    },
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    borderColor: '#e4eaec',
                    textStyle: {
                        color: '#2c3e50'
                    },
                    // formatter: '{b0}&nbsp;&nbsp;&nbsp;&nbsp;{c0}',
                    extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)'
                },
                darkToolTip: {
                    trigger: 'axis',
                    padding: [11, 20],
                    axisPointer: {
                        type: 'cross'
                    },
                    backgroundColor: 'rgba(52,59,77,0.9)',
                    borderColor: 'rgba(52,59,77,0.9)',
                    textStyle: {
                        color: '#fff'
                    },
                    // formatter: '{b0}<br/>{a0}&nbsp;&nbsp;&nbsp;&nbsp;{c0}<br/>{a1 ? a1}&nbsp;&nbsp;&nbsp;&nbsp;{c1}<br/>{a2}&nbsp;&nbsp;&nbsp;&nbsp;{c2}',
                    extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)'
                }
            };
        },
        mounted () {
            this.initChart();
        },
        beforeDestroy () {
            if (!this.chart) {
                return;
            }
            window.removeEventListener('resize', this.chart.resize);
            this.chart.dispose();
            this.chart = null;
        },
        computed: {
            opt () {
                let setting = {
                    title: {
                        text: this.title,
                        x: 'center'
                    },
                    xAxis: {
                        data: this.xTitle,
                        boundaryGap: false,
                        // axisLine: {
                        //     // 是否显示坐标轴
                        //     show: false,
                        //     // 设置坐标轴颜色与类型
                        //     lineStyle: {
                        //         color: '#b1b5c0',
                        //         type: 'solid'
                        //     }
                        // },
                        axisLine: this.lineChartOptions.axisLineX,
                        // splitLine: {
                        //     // 是否显示x方向的分隔线
                        //     show: false
                        // }
                        splitLine: this.lineChartOptions.splitLineX
                    },
                    legend: {
                        data: this.legend,
                        left: this.legendDirection,
                        top: 15
                    },
                    grid: {
                        left: 10,
                        right: 10,
                        bottom: 20,
                        containLabel: true,
                        show: true
                    },
                    // 提示弹窗样式
                    tooltip: this.isLightToolTip ? this.lightToolTip : this.darkToolTip,
                    yAxis: {
                        axisLine: this.lineChartOptions.axisLineY,
                        splitLine: this.lineChartOptions.splitLineY,
                        // splitArea: {
                        //     // 是否显示坐标区域的背景色，默认显示
                        //     show: false,
                        //     // 背景区域颜色，按顺序依次渲染
                        //     areaStyle: {
                        //         color: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']
                        //     }
                        // }
                        splitArea: this.lineChartOptions.splitAreaY
                    },
                    series: this.detailData
                };

                return setting;
            }
        },
        watch: {
            detailData: {
                handler: function (newVal) {
                    // 重新设置图表参数
                    this.chart.setOption(this.opt);
                },
                deep: true
            }
        },
        methods: {
            addEventListenResize () {
                window.addEventListener('resize', this.chart.resize);
            },
            initChart () {
                this.chart = echarts.init(document.getElementById(this.id), 'macarons');
                this.chart.setOption(this.opt, true);
                this.addEventListenResize();
            }
        }
    };
</script>

<style lang="less" scoped>

</style>
