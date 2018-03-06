<template>
    <div class="ui-personnel-sales">
        <div class="ui-chart-card-title">
            <span class="f-l">
                个人销售统计(人员，平台)
            </span>
            <span class="f-r">
                <chart-title @chartTitleListen="getCurrentOpration" :user-options-list="userOptionsList" :is-user-select="true" :is-date-select="true"></chart-title>
            </span>
        </div>
        <div class="ui-chart-card-item" :style="{'height': height}">
            <line-chart id='eightChart' :height="height"  :x-title='initPersonnelSalesXCoordinate' :detail-data='initPersonnelSalesData' width='100%'   :line-chart-options='lineChartOptions' :legend="initPersonnelSalesLegend" :legend-direction="legendDirection"></line-chart>
        </div>
    </div>
</template>

<script>
    import LineChart from '@/components/charts/line-chart';
    import ChartTitle from '@/components/chart-title';
    import {mapActions, mapGetters} from 'vuex';
    export default {
        name: 'personnelSales',
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
            legendDirection: {}
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
                initPersonnelSalesXCoordinate: [],
                initPersonnelSalesData: [],
                initPersonnelSalesLegend: [],
                personnelSalesConfigLegend: [{
                    textStyle: {
                        color: '#767d8f',
                        fontSize: 14
                    }
                }],
                personnelSalesConfigData: [{
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
                    animationDuration: 2600,
                    animationEasing: 'cubicInOut'
                }]
            };
        },
        computed: {
            ...mapGetters([
                'personnelSalesChart'
            ])
        },
        methods: {
            ...mapActions([
                'GetPersonnelSalesInfo'
            ]),
            linkTo (name, params) {
                this.$router.push({
                    name: name,
                    params: params
                });
            },
            unfoldData (data) {
                const arrList = data.value;
                let personnelSalesData = [];
                let personnelSalesLegend = [];
                let obj = {};
                let objLegned = {};
                for (let i = 0, len = arrList.length; i < len; i++) {
                    obj = Object.assign({}, this.personnelSalesConfigData[i], arrList[i]);
                    objLegned = Object.assign({}, this.personnelSalesConfigLegend[i], arrList[i]);
                    personnelSalesData.push(obj);
                    personnelSalesLegend.push(objLegned);
                }
                // 设置每次获取到的动态数据
                this.initPersonnelSalesData = personnelSalesData;
                // 设置hover时的提示信息
                this.initPersonnelSalesLegend = personnelSalesLegend;
                // 设置坐标轴坐标
                this.initPersonnelSalesXCoordinate = data.xCoordinate;
            },
            getPersonnelSalesInfoList () {
                var _this = this;
                this.GetPersonnelSalesInfo({
                    date_type: this.personnelSalesDataType
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
                        _this.personnelSalesDataType = 'month';
                        _this.getPersonnelSalesInfoList();
                    },
                    quarter_type () {
                        console.log('quarter');
                        _this.personnelSalesDataType = 'quarter';
                        _this.getPersonnelSalesInfoList();
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
                            chartType: 'isShowPersonnelSales'
                        });
                    },
                    scal_type () {
                        console.log('scal');
                        _this.linkTo('statistics_detail', {
                            currentView: 'personnelSales'
                        });
                    }
                };
                DISPATCH_STATUS.show(info.type);
            }
        },
        mounted () {
            // 获取站点销售统计数据
            if (this.personnelSalesChart.value) {
                console.log(this.personnelSalesChart);
                this.unfoldData(this.personnelSalesChart);
            } else {
                this.getPersonnelSalesInfoList();
            }
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../../assets/less/index.less';
    .ui-personnel-sales {
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

