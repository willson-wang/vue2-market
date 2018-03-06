/*
 * @Author: peter 
 * @Date: 2017-12-04 18:54:00 
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-16 11:35:28
 */
<template>
    <div :id='id' :style='{height: height, width: width}' :class='className'></div>
</template>

<script>
    const echarts = require('echarts/lib/echarts'); // 引入echarts主模块
    require('echarts/lib/chart/pie'); // 引入柱状图
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
                    trigger: 'item',
                    formatter: '{b}  {c} ({d}%)',
                    padding: [11, 20],
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    borderColor: '#e4eaec',
                    textStyle: {
                        color: '#2c3e50'
                    },
                    extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)'
                },
                darkToolTip: {
                    trigger: 'item',
                    formatter: '{b} ({d}%) {c}',
                    padding: [11, 20],
                    backgroundColor: 'rgba(52,59,77,0.9)',
                    borderColor: 'rgba(52,59,77,0.9)',
                    textStyle: {
                        color: '#fff'
                    },
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
                    tooltip: this.isLightToolTip ? this.lightToolTip : this.darkToolTip,
                    legend: {
                        x: 'center',
                        y: 'bottom',
                        data: this.xTitle
                    },
                    calculable: true,
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
