<template>
    <div class="ui-personnel-profit-loss">
        <div class="ui-chart-card-title">
            <span class="f-l">
                人员盈亏统计(万元)
            </span>
            <span class="f-r">
                <chart-title @chartTitleListen="getCurrentOpration" :user-options-list="userOptionsList" :is-user-select="false" :is-date-select="true"></chart-title>
            </span>
        </div>
        <div class="ui-chart-card-item" :style="{'height': height}">
            <cylindrical-graph id='elevenChart' :height="height" :x-title='initPersonnelProfitAndLossXCoordinate' :detail-data='initPersonnelProfitAndLossData' width='100%' :cline-chart-options='clineChartOptions' :is-show-x="false" :legend="initPersonnelProfitAndLossLegend" :legend-direction="legendDirection"></cylindrical-graph>
        </div>
    </div>
</template>

<script>
    import CylindricalGraph from '@/components/charts/cylindrical-graph';
    import ChartTitle from '@/components/chart-title';
    import {mapActions, mapGetters} from 'vuex';
    export default {
        name: 'personnelProfitAndLoss',
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
                initPersonnelProfitAndLossXCoordinate: [],
                initPersonnelProfitAndLossData: [],
                initPersonnelProfitAndLossLegend: [],
                personnelProfitAndLossConfigLegend: [{
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
                personnelProfitAndLossConfigData: [{
                    type: 'bar',
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
                    type: 'bar',
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
                    type: 'bar',
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
                'personnelProfitAndLossChart'
            ])
        },
        methods: {
            ...mapActions([
                'GetPersonnelProfitAndLossInfo'
            ]),
            linkTo (name, params) {
                this.$router.push({
                    name: name,
                    params: params
                });
            },
            unfoldData (data) {
                const arrList = data.value;
                let personnelProfitAndLossData = [];
                let personnelProfitAndLossLegend = [];
                let obj = {};
                let objLegned = {};
                for (let i = 0, len = arrList.length; i < len; i++) {
                    obj = Object.assign({}, this.personnelProfitAndLossConfigData[i], arrList[i]);
                    objLegned = Object.assign({}, this.personnelProfitAndLossConfigLegend[i], arrList[i]);
                    personnelProfitAndLossData.push(obj);
                    personnelProfitAndLossLegend.push(objLegned);
                }
                // 设置每次获取到的动态数据
                this.initPersonnelProfitAndLossData = personnelProfitAndLossData;
                // 设置hover时的提示信息
                this.initPersonnelProfitAndLossLegend = personnelProfitAndLossLegend;
                // 设置坐标轴坐标
                this.initPersonnelProfitAndLossXCoordinate = data.xCoordinate;
            },
            getPersonnelProfitAndLossInfoList () {
                var _this = this;
                this.GetPersonnelProfitAndLossInfo({
                    date_type: this.personnelProfitAndLossDataType
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
                        _this.personnelProfitAndLossDataType = 'month';
                        _this.getPersonnelProfitAndLossInfoList();
                    },
                    quarter_type () {
                        console.log('quarter');
                        _this.personnelProfitAndLossDataType = 'quarter';
                        _this.getPersonnelProfitAndLossInfoList();
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
                            chartType: 'isShowPersonnelProfitAndLoss'
                        });
                    },
                    scal_type () {
                        console.log('scal');
                        _this.linkTo('statistics_detail', {
                            currentView: 'personnelProfitAndLoss'
                        });
                    }
                };
                DISPATCH_STATUS.show(info.type);
            }
        },
        mounted () {
            // 获取站点销售统计数据
            if (this.personnelProfitAndLossChart.value) {
                console.log(this.personnelProfitAndLossChart);
                this.unfoldData(this.personnelProfitAndLossChart);
            } else {
                this.getPersonnelProfitAndLossInfoList();
            }
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../../assets/less/index.less';
    .ui-personnel-profit-loss {
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

