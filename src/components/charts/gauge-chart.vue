/*
 * @Author: peter 
 * @Date: 2017-12-04 18:53:43 
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-06 19:25:23
 */
<template>
    <div :id='id' :style='{height: height, width: width}' :class='className'></div>
</template>

<script>
    const echarts = require('echarts/lib/echarts'); // 引入echarts主模块
    require('echarts/lib/chart/gauge'); // 引入柱状图
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
            detailData: {
                type: Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                chart: null
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
                        text: `完成情况${this.detailData.value}K      销售目标${this.detailData.max}K`,
                        x: 'center',
                        y: '88%',
                        textStyle: {
                            color: '#8e8d97',
                            fontSize: 14
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    calculable: true,
                    series: [
                        {
                            type: 'gauge',
                            name: 'sales',
                            radius: '75%',
                            min: 0,
                            max: this.detailData.max,
                            splitNumber: 4,
                            // 仪表盘轴线上分隔线设置
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#fff'
                                }
                            },
                            // 仪表盘轴线设置
                            axisLine: {
                                lineStyle: {
                                    color: [[this.detailData.value / this.detailData.max, '#5c6ff0'], [1, '#f0f4f5']],
                                    width: 40
                                }
                            },
                            // 刻度样式
                            axisTick: {
                                show: false,
                                lineStyle: {
                                    color: '#ccc',
                                    splitNumber: 100
                                }
                            },
                            // 刻度标签
                            axisLabel: {
                                show: true,
                                color: '#d3d9de',
                                fontSize: 14,
                                distance: 20,
                                formatter: `{value} K`
                            },
                            // 仪表盘指针样式
                            itemStyle: {
                                normal: {
                                    color: '#758390'
                                }
                            },
                            // 仪表盘指针
                            pointer: {
                                length: '60%'
                            },
                            // 仪表盘详情，用于显示数据
                            detail: {
                                show: false,
                                offsetCenter: [0, '100%'],
                                color: '#a8b2bb',
                                fontSize: 14
                            },
                            animationEasing: 'cubicInOut',
                            animationDuration: 2600,
                            data: [{
                                value: this.detailData.value
                            }]
                        }
                    ]
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
