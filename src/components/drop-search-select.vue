/*
 * @Author: peter 
 * @Date: 2017-12-04 18:55:02 
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-16 14:49:09
 */
<template>
    <!-- 下拉搜索菜单 -->
    <pop-over show-position="top" ref="searchPopover" class-name="ui-drop-search-popover" @showPopoverEmit="showPopover">
        <div class="ui-drop-search-select" slot="content" >
            <div v-if="drapSearchList.length > 9" class="ui-drop-search">
                <input type="text"  v-model="currentSearchTxt" :placeholder="placeholder">
                <span class="ui-search-icon">
                    <icon-svg icon-name="search" ></icon-svg>
                </span>
            </div>
            <ul :class="{'is-scroll': drapSearchList.length > 9}" @click="getCurrentSelectValue">
                <li v-for="(item, index) in filterDrapSearchList" :val="item[attr]" :key="index">{{item[label]}}</li>
            </ul>
            <div v-if="!filterDrapSearchList.length" class="ui-drop-search-none">无匹配项</div>
        </div>
        <span slot="icon" class="ui-icon-more"><i class="el-icon-more"></i></span>
    </pop-over>
    
</template>

<script>
    export default {
        name: 'dropSelect',
        props: {
            drapSearchList: {
                type: Array,
                default () {
                    return [];
                }
            },
            label: {
                type: String
            },
            attr: String,
            placeholder: String
        },
        data () {
            return {
                currentSearchTxt: ''
            };
        },
        methods: {
            createDropSearchSelect () {

            },
            showPopover () {
                // 重新显示popover之时重置筛选条件
                this.currentSearchTxt = '';
            },
            getCurrentSelectValue (event) {
                const val = event.target.getAttribute('val');
                this.$emit('currentSelectValueEmit', val);
            }
        },
        mounted () {
            console.log('mounted');
        },
        computed: {
            filterDrapSearchList () {
                var filterArr = this.drapSearchList;
                var filterStr = this.currentSearchTxt;

                if (!filterStr) {
                    return filterArr;
                }

                filterStr = filterStr.trim().toLowerCase();
                filterArr = filterArr.filter(item => {
                    if (item[this.label].trim().toLowerCase().indexOf(filterStr) !== -1) {
                        return item;
                    }
                });
                return filterArr;
            }
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../assets/less/index.less';
    .ui-drop-search-popover {

        .ui-drop-search-select {
            width: 100%;

            >.ui-drop-search {
                position: relative;
                
                input {
                    width: 100%;
                    height: 34px;
                    line-height: 34px;
                    border-radius: 4px;
                    text-indent: 10px;
                    outline: none;
                    color: @base-info3;
                    border: 1px solid @base-bdr;
                }

                .ui-search-icon {
                    position: absolute;
                    top: 10px;
                    right: 8%;
                    color: @base-bdr;
                }
                
            }

            >ul {
                list-style: none;
                margin: 0;
                padding: 10px 0 0 0;

                li {
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    color: @base-info1;
                    text-indent: 10px;
                    cursor: pointer;
                    border-radius: 4px;

                    &:hover {
                        background-color: #f3f7f9;
                    }
                }
            }

            .is-scroll {
                overflow-x: hidden;
                overflow-y: auto;
                max-height: 370px;
            }

            .ui-drop-search-none {
                height: 40px;
                line-height: 40px;
                width: 100%;
                color: @base-info1;
                text-indent: 10px;
            }
            
        }

        .ui-icon-more {
            display: block;
            padding: 10px;
        }
    }
</style>
