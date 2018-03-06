<template>
    <div class="ui-personnel-platfrom">
        <div class="ui-chart-card-title">
            <span class="f-l">
                个人平台统计(人员，平台)
            </span>
            <span class="f-r">
                <chart-title @chartTitleListen="getCurrentOpration" :user-options-list="userOptionsList" :is-user-select="true" :is-date-select="true"></chart-title>
            </span>
        </div>
        <div class="ui-chart-card-item" :style="{'height': height}">
            <line-chart id='sixChart' :height="height"  :x-title='initPersonnelPlatformXCoordinate' :detail-data='initPersonnelPlatformData' width='100%'   :line-chart-options='lineChartOptions' :legend="initPersonnelPlatformLegend" :legend-direction="legendDirection"></line-chart>
        </div>
    </div>
</template>

<script>
    import LineChart from '@/components/charts/line-chart';
    import ChartTitle from '@/components/chart-title';
    import {mapActions, mapGetters} from 'vuex';
    export default {
        name: 'personnelPlatform',
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
                initPersonnelPlatformXCoordinate: [],
                initPersonnelPlatformData: [],
                initPersonnelPlatformLegend: [],
                personnelPlatformConfigLegend: [{
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
                personnelPlatformConfigData: [{
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
                }]
            };
        },
        computed: {
            ...mapGetters([
                'personnelPlatformChart'
            ])
        },
        methods: {
            ...mapActions([
                'GetPersonnelPlatformInfo'
            ]),
            linkTo (name, params) {
                this.$router.push({
                    name: name,
                    params: params
                });
            },
            unfoldData (data) {
                const arrList = data.value;
                let personnelPlatformData = [];
                let personnelPlatformLegend = [];
                let obj = {};
                let objLegned = {};
                for (let i = 0, len = arrList.length; i < len; i++) {
                    obj = Object.assign({}, this.personnelPlatformConfigData[i], arrList[i]);
                    objLegned = Object.assign({}, this.personnelPlatformConfigLegend[i], arrList[i]);
                    personnelPlatformData.push(obj);
                    personnelPlatformLegend.push(objLegned);
                }
                // 设置每次获取到的动态数据
                this.initPersonnelPlatformData = personnelPlatformData;
                // 设置hover时的提示信息
                this.initPersonnelPlatformLegend = personnelPlatformLegend;
                // 设置坐标轴坐标
                this.initPersonnelPlatformXCoordinate = data.xCoordinate;
            },
            getPersonnelPlatformInfoList () {
                var _this = this;
                this.GetPersonnelPlatformInfo({
                    date_type: this.personnelPlatformDataType
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
                        _this.personnelPlatformDataType = 'month';
                        _this.getPersonnelPlatformInfoList();
                    },
                    quarter_type () {
                        console.log('quarter');
                        _this.personnelPlatformDataType = 'quarter';
                        _this.getPersonnelPlatformInfoList();
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
                            chartType: 'isShowPersonnelPlatform'
                        });
                    },
                    scal_type () {
                        console.log('scal');
                        _this.linkTo('statistics_detail', {
                            currentView: 'personnelPlatform'
                        });
                    }
                };
                DISPATCH_STATUS.show(info.type);
            }
        },
        mounted () {
            // 获取站点销售统计数据
            if (this.personnelPlatformChart.value) {
                console.log(this.personnelPlatformChart);
                this.unfoldData(this.personnelPlatformChart);
            } else {
                this.getPersonnelPlatformInfoList();
            }
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../../assets/less/index.less';
    .ui-personnel-platfrom {
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

