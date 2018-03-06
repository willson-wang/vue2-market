/*
 * @Author: peter 
 * @Date: 2017-12-04 18:54:55 
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-16 14:40:34
 */
<template>
  <div class="ui-chart-top-title clearFix" >
      <ul class="ui-chart-opration f-r clearFix" v-if="isScalAndDel">
          <li class="f-l" @click="getCurrentOpration('scal')">
              <icon-svg icon-name="fullscreen"></icon-svg>
          </li>
          <li class="f-l" @click="getCurrentOpration('del')">
              <icon-svg icon-name="del-hidden" ></icon-svg>
          </li>
      </ul>
      <div class="ui-chart-select f-r" v-if="isUserSelect">
          <select-item :options="userOptionsList" size="mini" :is-disabled="false" :is-clearable="false" :is-filterable="false" :is-multiple="false" @currentSelectValue="getCurrentSelectValue" :init-select-value='initSelectValue'></select-item>
      </div>
      <ul class="ui-chart-date f-r clearFix" v-if="isDateSelect">
          <li class="f-l" @click="getCurrentOpration('month')" :class="{activeTitle: isActiveDate === 'month'}">
              <strong>本月</strong> 
          </li>
          <li class="f-l" @click="getCurrentOpration('quarter')" :class="{activeTitle: isActiveDate === 'quarter'}">
              <strong>本季</strong> 
          </li>
          <li class="f-l" @click="getCurrentOpration('year')" :class="{activeTitle: isActiveDate === 'year'}">
              <strong>本年</strong> 
          </li>
          <li class="f-l" @click="getCurrentOpration('custom')" :class="{activeTitle: isActiveDate === 'custom'}">
              <strong>
                  <pop-over show-position="bottom" show-title="" ref="chartpopover" :width="350"> 
                      <div slot="content" class="ui-pop-over">
                          <el-row>
                              <el-col :xs="6" :sm="6" :md="6" :lg="6"><div class="ui-chart-date-title">选择日期范围</div></el-col>
                              <el-col :xs="14" :sm="14" :md="14" :lg="14"><date-picker size="small" placeholder="选择日期" :isPickerOptions="true" v-on:pikerDate="getCurrentTime" date-type="daterange"></date-picker></el-col>
                          </el-row>
                          <el-row class="ui-chart-date-btn">
                              <el-col :xs="4" :sm="4" :md="4" :lg="4" :offset="19">
                                  <el-button type="primary" size="small"  @click="closeChartPopOver">确定</el-button>
                              </el-col>
                          </el-row>
                      </div>
                      <span slot="btn">自定义</span> 
                  </pop-over> 
              </strong> 
              
          </li>
      </ul>
  </div>
</template>

<script>
    export default {
        name: 'chartTitle',
        props: {
            // 用户下拉框的list列表
            userOptionsList: {
                type: Array,
                default () {
                    return [];
                }
            },
            // 初始用户下拉框的值
            initSelectValue: {
                type: String || Number,
                default: ''
            },
            // 是否有用户选择下拉框
            isUserSelect: {
                type: Boolean,
                default: true
            },
            // 是否有日期切换条件
            isDateSelect: {
                type: Boolean,
                default: true
            },
            // 是否显示全屏与删除icon
            isScalAndDel: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                selectTimeRange: '',
                isActiveDate: 'month'
            };
        },
        methods: {
            getCurrentTime (time) {
                console.log(time);
                this.selectTimeRange = time;
            },
            getCurrentOpration (val) {
                this.isActiveDate = val;
                if (val === 'custom') return;
                this.$emit('chartTitleListen', {
                    type: val
                });
            },
            closeChartPopOver () {
                this.$refs.chartpopover.changePopOverShow();
                this.$emit('chartTitleListen', {
                    type: 'custom',
                    val: this.selectTimeRange
                });
            },
            getCurrentSelectValue (key) {
                console.log(key);
                this.$emit('chartTitleListen', {
                    type: 'user',
                    val: key
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../assets/less/index.less';
    .ui-chart-top-title {
        position: relative;
        font-size: 14px;
        color: @base-info2;

        .ui-chart-opration, .ui-chart-date {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .ui-chart-select {
            margin: 0 20px;
            cursor: pointer;
        }

        .ui-chart-date {

            li {
                cursor: pointer;

                strong {
                    font-weight: normal;
                    padding: 0 10px;
                    border-right: 1px solid @base-shallow-gray;  
                }

                &:last-of-type {
                    strong {
                        border-right: 0;
                    }
                    
                }
            } 

            .activeTitle {
                color: @base-main;
            }
        }

        .ui-chart-opration {
            li {
                padding: 0 8px;
                cursor: pointer;
            }
        }

        
    }
</style>

