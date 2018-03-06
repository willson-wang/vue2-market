/*
 * @Author: peter 
 * @Date: 2017-12-04 18:53:24 
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-20 11:00:37
 */
<template>
    <div :id='id' :style='{height: height, width: width}' :class='className' :options='clineChartOptions'></div>
</template>

<script>
    const echarts = require('echarts/lib/echarts'); // 引入echarts主模块
    require('echarts/lib/chart/bar'); // 引入柱状图
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
            // x轴的坐标值
            xTitle: {
                type: Array,
                default () {
                    return [];
                }
            },
            // y轴的坐标值
            yTitle: {
                type: Array,
                default () {
                    return [];
                }
            },
            // series配置参数
            detailData: {
                type: Array,
                default () {
                    return [];
                }
            },
            // 是否显示坐标，图形内的背景色等参数
            clineChartOptions: {
                type: Object,
                default () {
                    return {};
                }
            },
            // 显示水平还是竖直柱形图，默认显示竖直柱形图
            isShowX: {
                type: Boolean,
                default: true
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
            // 亮色提示框还是暗色提示框
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
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    // formatter: '{b0}&nbsp;&nbsp;&nbsp;&nbsp;{c0}',
                    padding: [11, 20],
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    borderColor: '#e4eaec',
                    textStyle: {
                        color: '#2c3e50'
                    },
                    extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)'
                },
                darkToolTip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    padding: [11, 20],
                    backgroundColor: 'rgba(52,59,77,0.9)',
                    borderColor: 'rgba(52,59,77,0.9)',
                    textStyle: {
                        color: '#fff'
                    },
                    extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)'
                    // formatter: '{b0}<br/>{a0}&nbsp;&nbsp;&nbsp;&nbsp;{c0}<br/>{a1 ? a1}&nbsp;&nbsp;&nbsp;&nbsp;{c1}<br/>{a2}&nbsp;&nbsp;&nbsp;&nbsp;{c2}',
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
                    title: { text: this.title },
                    tooltip: this.isLightToolTip ? this.lightToolTip : this.darkToolTip,
                    legend: {
                        data: this.legend,
                        left: this.legendDirection,
                        top: 15
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        // type参数决定那个是类目轴哪个是数值轴
                        type: this.isShowX ? 'category' : 'value',
                        data: this.xTitle,
                        axisTick: {
                            alignWithLabel: true
                        },
                        // 设置x轴坐标
                        axisLine: this.clineChartOptions.axisLineX,
                        // 设置x方向竖线
                        splitLine: this.clineChartOptions.splitLineX,
                        // 设置x方向背景色
                        splitArea: this.clineChartOptions.splitAreaX
                    },
                    yAxis: {
                        type: this.isShowX ? 'value' : 'category',
                        data: this.xTitle,
                        axisLine: this.clineChartOptions.axisLineY,
                        splitLine: this.clineChartOptions.splitLineY,
                        splitArea: this.clineChartOptions.splitAreaY
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
            // 设置监听resize事件当触发resize的时候图表也跟着变化
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
