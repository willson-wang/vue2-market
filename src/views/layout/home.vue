<template>
  <div>
      <div class="ui-home-top-info clearFix">
          <dl v-for="(item, index) in infoList" :key="index">
              <dt :style="{color: item.activeColor}">
                  <icon-svg :icon-name="item.icon" :icon-font="3"></icon-svg>
              </dt>
              <dd>
                  <p :style="{color: item.activeColor}">{{item.val}}</p>
                  <p>{{item.description}}</p>
              </dd>
           </dl>
      </div>
      
      <ul class="ui-home-card-info clearFix">
          <li>
              <div class="ui-home-card-title">
                  <span class="f-l">
                      <icon-svg icon-name="trend"></icon-svg>
                      刊登走势
                  </span>
                  <span class="f-r">
                        <s-radio-group v-model="chartData" >
                            <s-radio-button  label="1">日</s-radio-button>
                            <s-radio-button  label="30">月</s-radio-button>
                            <s-radio-button  label="120">季</s-radio-button>
                            <s-radio-button  label="365">年</s-radio-button>
                        </s-radio-group>
                  </span>
              </div>
              <div class="ui-home-card-item">
                  <line-chart id='fiveChart' :title='zx5Title' :x-title='zx5XTitle' :detail-data='zx5DetailData' width='100%' :line-chart-options='lineChartOptions' :is-light-tool-tip="true"></line-chart>
              </div>
          </li>
          <li>
              <div class="ui-home-card-title clearFix">
                  <span class="f-l">
                      <icon-svg icon-name="order-manage"></icon-svg>
                      订单管理
                  </span>
              </div>
              <div class="ui-home-card-item">
                  <s-table :list="orderOneManagelist" class-name="ui-tbody-bdr" :opration-btn-list="oprationBtnList" :is-select="false" :max-height="320"></s-table>
              </div>
          </li>
          <li>
              <div class="ui-home-card-title clearFix">
                  <span class="f-l">
                      <icon-svg icon-name="freight-calculation"></icon-svg>
                      运费计算
                  </span>
              </div>
              <div class="ui-home-card-item">
                  <el-form :inline="true" :model="freightCalculationForm" >
                      <el-row>
                          <el-col :xs="12" :sm="12" :md="12" :lg="12">
                              <el-form-item label="订单号">
                                  <el-input v-model="freightCalculationForm.orderNo" placeholder="订单号"></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :xs="12" :sm="12" :md="12" :lg="12">
                              <el-form-item label="订单号">
                                  <el-input v-model="freightCalculationForm.orderNo" placeholder="订单号"></el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :xs="12" :sm="12" :md="12" :lg="12">
                              <el-form-item label="订单号">
                                  <el-input v-model="freightCalculationForm.orderNo" placeholder="订单号"></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :xs="12" :sm="12" :md="12" :lg="12">
                              <el-form-item label="订单号">
                                  <el-input v-model="freightCalculationForm.orderNo" placeholder="订单号"></el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :xs="12" :sm="12" :md="12" :lg="12">
                              <el-form-item label="订单号">
                                  <el-input v-model="freightCalculationForm.orderNo" placeholder="订单号"></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :xs="12" :sm="12" :md="12" :lg="12">
                              <el-form-item label="订单号">
                                  <el-input v-model="freightCalculationForm.orderNo" placeholder="订单号"></el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :xs="12" :sm="12" :md="12" :lg="12">
                              <el-form-item label="订单号">
                                  <el-input v-model="freightCalculationForm.orderNo" placeholder="订单号"></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :xs="12" :sm="12" :md="12" :lg="12">
                              <el-form-item label="订单号">
                                  <el-input v-model="freightCalculationForm.orderNo" placeholder="订单号"></el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :xs="4" :sm="4" :md="4" :lg="4" :push="18">
                              <el-form-item label="">
                                  <!-- <el-button type="primary" @click="confirm">确认</el-button> -->
                                  <com-btn type="primary" @click="confirm">确认</com-btn>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      
                  </el-form>
              </div>
          </li>
          <li>
              <div class="ui-home-card-title clearFix">
                  <span class="f-l">
                      <icon-svg icon-name="activity"></icon-svg>
                      活跃度
                  </span>
                  <span class="f-r">
                      <date-picker size="small" :isPickerOptions="true" v-on:pikerDate="getCurrentTime" date-type="daterange"></date-picker>
                  </span>
              </div>
              <div class="ui-home-card-item">
                  <cylindrical-graph id='secondChart' :title='zxTitle' :x-title='zxXTitle' :detail-data='zxDetailData' width='100%' :cline-chart-options='clineChartOptions' :is-light-tool-tip="true"></cylindrical-graph>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import * as Boxs from '@/utils/message-box';
    import LineChart from '@/components/charts/line-chart';
    import CylindricalGraph from '@/components/charts/cylindrical-graph';
    import STable from '@/components/table/s-table';
    export default {
        name: 'home',
        components: {
            LineChart,
            CylindricalGraph,
            STable
        },
        data () {
            return {
                orderOneManagelist: [],
                freightCalculationForm: {
                    orderNo: ''
                },
                oprationBtnList: [
                    {
                        type: 'text',
                        size: 'small',
                        title: '编辑',
                        flag: 'edite'
                    }
                ],
                orderData: [{
                    sku: '458546',
                    abnormal: '物流异常结果',
                    orderNo: '45451235215512',
                    user: '二狗',
                    opration: '编辑'
                }, {
                    sku: '458546',
                    abnormal: '物流异常结果',
                    orderNo: '45451235215512',
                    user: '二狗',
                    opration: '编辑'
                }, {
                    sku: '458546',
                    abnormal: '物流异常结果',
                    orderNo: '45451235215512',
                    user: '二狗',
                    opration: '编辑'
                }, {
                    sku: '458546',
                    abnormal: '物流异常结果',
                    orderNo: '45451235215512',
                    user: '二狗',
                    opration: '编辑'
                }],
                chartData: '1',
                oneData: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20],
                    stack: 'vistors',
                    barWidth: '25%',
                    barMaxWidth: '50%',
                    itemStyle: {
                        normal: {
                            color: '#2dc773'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            color: '#2c3e50'
                        }
                    }
                }],
                fiveData: [{
                    name: 'visitors',
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                color: 'rgba(255,255,255,0)'
                            },
                            lineStyle: {
                                color: '#5b81fe'
                            }
                        }
                    },
                    smooth: true,
                    cursor: 'pointer',
                    type: 'line',
                    data: [100, 120, 161, 134, 105, 160, 165, 105],
                    animationDuration: 2600,
                    animationEasing: 'cubicInOut'
                }],
                warehouseList: [],
                count: 9,
                isType: 'a',
                infoList: [
                    {
                        activeColor: '#36d980',
                        val: 23606,
                        icon: 'new-add-product',
                        description: '新刊登产品'
                    },
                    {
                        activeColor: '#5c82ff',
                        val: 4545,
                        icon: 'add-product',
                        description: '新增产品'
                    },
                    {
                        activeColor: '#9771f8',
                        val: 54356,
                        icon: 'totle-product',
                        description: '总产品数量'
                    },
                    {
                        activeColor: '#ffbb36',
                        val: 654767,
                        icon: 'add-new-money',
                        description: '新增成交金额￥'
                    },
                    {
                        activeColor: '#fe4459',
                        val: 434,
                        icon: 'totle-money',
                        description: '总成交金额￥'
                    }
                ],
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

                }
            };
        },
        directives: { // 局部指令
            test: {
                bind: function (el) {
                    console.log(el);
                    console.log('bind');
                },
                inserted: function (el) {
                    el.style.color = '#ccc';
                    el.focus();
                    console.log('inserted');
                },
                update: function (el) {
                    el.style.fontSize = '20px';
                    console.log('update');
                },
                unbind: function (el) {
                    console.log('unbind');
                }
            }
        },
        filters: { // 局部过滤器
            addZero (num) {
                return '000' + num;
            }
        },
        computed: {
            ...mapGetters([
                'userInfo',
                'productMdInfo',
                'orderOneManageListInfo'
            ]),
            userName () {
                return this.userInfo ? this.userInfo.username : '二狗';
            },
            currentTime () {
                return new Date().getTime();
            },
            zxTitle () {
                return '';
            },
            zxXTitle () {
                return ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'];
            },
            zxDetailData () {
                return this.oneData;
            },
            zx5Title () {
                return '';
            },
            zx5XTitle () {
                return ['05-02', '05-06', '05-10', '05-14', '05-18', '05-22', '05-26', '05-30'];
            },
            zx5DetailData () {
                return this.fiveData;
            }
        },
        methods: {
            ...mapActions([
                'GetOrderOneManageList'
            ]),
            toggleValue () {
                this.isType = this.isType === 'a' ? 'b' : 'a';
            },
            openMessage () {
                Boxs.message({
                    message: 'hello world!',
                    type: 'error',
                    customClass: 'ui-message-active',
                    onClose: function () {
                        console.log('message框');
                    }
                });
            },
            openMessageBox () {
                Boxs.messageBox({
                    title: '系统消息',
                    message: '是否需要删除',
                    type: 'info',
                    customClass: 'ui-message-box-active',
                    callback: function (action, instance) { // action返回按钮的类型 instance为messageBox的实例
                        if (action === 'confirm') {
                            console.log('确认');
                        } else {
                            console.log('取消');
                        }
                        console.log(instance);
                        console.log('openMessageBox');
                    }
                });
            },
            openNotification () {
                Boxs.notification({
                    title: '提示',
                    message: '这是一条来自外星球的消息！',
                    type: 'info',
                    customClass: 'ui-notification-active',
                    onClose: function () {
                        console.log('notification');
                    }
                });
            },
            getCurrentTime (time) {
                console.log(time);
            },
            confirm () {
                console.log(this);
            },
            getOrderOneManageList (queryParams) {
                this.GetOrderOneManageList(queryParams).then(response => {
                    console.log(response);
                    this.orderOneManagelist = response;
                }).catch(error => {
                    console.log(error);
                });
            }
        },
        created () {
            console.log(this);
            console.log(this.userInfo);
            console.log(this.productMdInfo);
            console.log(this.$store);
            this.warehouseList = this.userInfo ? this.userInfo.warehouses : '';
            if (this.orderOneManageListInfo.value) {
                this.orderOneManagelist = this.orderOneManageListInfo;
            } else {
                this.getOrderOneManageList();
            }
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../assets/less/index.less';
    .ui-home-top-info {
        
        dl {
            float: left;
            width: 19%;
            margin: 0;
            background-color: @base-white;
            padding: 35px 0;
            margin-right: 1.2%;

            dt {
                float: left;
                width: 30%;
                height: 60px;
                line-height: 60px;
                border-right: 1px solid @base-bdr;
            }

            dd {
                float: left;
            
                p {
                    height: 30px;
                    line-height: 30px;
                    margin: 0;
                }

                p:first-of-type {
                    font-size: 30px;
                }

                p:last-of-type {
                    font-size: 14px;
                }
            }

        }

        dl:last-of-type {
            margin-right: 0; 
        }

    }

    .ui-home-card-info {
        list-style: none;
        margin: 0;
        padding: 0;

        

        >li {
            float: left;
            width: 49%;
            background-color: @base-white;
            margin-top: 20px;
            padding: 0 20px;

            .ui-home-card-title {
                height: 40px;
                line-height: 40px;
                overflow: hidden;
                color: @base-info1;
            }
            
            .ui-home-card-item {
                height: 400px;
            }
        }

        >li:first-of-type {
            margin-right: 2%;
        }

        >li:nth-of-type(3) {
            margin-right: 2%;
        }
    }
</style>

