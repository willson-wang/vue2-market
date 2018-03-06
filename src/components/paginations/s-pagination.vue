<template>
    <div class="ui-pagination-wrap">
        <div class="ui-pagination-select">
            <span>行数</span>
            <span>
                <select v-model="currentSize" @change="selectSizeHandler">
                    <option v-for="(item, index) in pageSizes" :key="index" :value="item">{{item}}</option>  
                </select>
            </span>
        </div>
        <ul class="ui-pagination clearFix" @click="pagerClickHandler">
            <li :class="{active: currentPage === 1}" v-if="pageCount > 0" class="ui-pagination-number">1</li>
            <li :class="[quickprevIconClass]" v-if="showPrevMore" class="el-icon more btn-quickprev" @mouseenter="quickprevIconClass = 'el-icon-d-arrow-left'" @mouseleave="quickprevIconClass = 'el-icon-more'"></li>
            <li v-for="(pager, index) in pagers" :class="{active: currentPage === pager}" :key="index" class="ui-pagination-number">{{pager}}</li>
            <li :class="[quicknextIconClass]" v-if="showNextMore" class="el-icon more btn-quicknext" @mouseenter="quicknextIconClass = 'el-icon-d-arrow-right'" @mouseleave="quicknextIconClass = 'el-icon-more'"></li>
            <li :class="{ active: currentPage === pageCount }"  class="ui-pagination-number" v-if="pageCount > 1">{{ pageCount }}</li>
        </ul>
        <div class="ui-pagination-jump">
            <span>跳转至</span>
            <input type="text" v-model="jumpTo">
            <button type="button" @click="jumpToHandler">确定</button>
            <span>总数{{totle}}条</span>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: 'sPagination',
        props: {
            pagingData: {
                type: Object,
                default () {
                    return {};
                }
            },
            pageSizes: {
                type: Array,
                default () {
                    return [20, 50, 100, 200, 300, 400];
                }
            }
        },
        data () {
            return {
                currentSize: 20,
                jumpTo: '',
                showPrevMore: false,
                showNextMore: false,
                quicknextIconClass: 'el-icon-more',
                quickprevIconClass: 'el-icon-more'
            };
        },
        computed: {
            pageCount () {
                return Math.ceil(this.totle / this.pageLimit);
            },
            currentPage () {
                return this.pagingData.offset;
            },
            pageLimit () {
                this.currentSize = this.pagingData.limit;
                return this.pagingData.limit;
            },
            totle () {
                return this.pagingData.total;
            },
            pagers () {
                // 默认展示7条分页页码
                const pagerCount = 7;
                const currentPage = Number(this.currentPage);
                const pageCount = Number(this.pageCount);

                let showPrevMore = false;
                let showNextMore = false;

                // 如果实际分页数大于默认分页数
                if (pageCount > pagerCount) {
                    if (currentPage > pagerCount - 3) {
                        showPrevMore = true;
                    }

                    if (currentPage < pageCount - 3) {
                        showNextMore = true;
                    }
                }

                // 处理需要显示的页码
                let arr = [];
                if (showPrevMore && !showNextMore) {
                    const startPage = pageCount - (pagerCount - 2);
                    for (let i = startPage; i < pageCount; i++) {
                        arr.push(i);
                    }
                } else if (!showPrevMore && showNextMore) {
                    for (let i = 2; i < pagerCount; i++) {
                        arr.push(i);
                    }
                } else if (showPrevMore && showNextMore) {
                    const offset = Math.floor(pagerCount / 2) - 1;
                    for (let i = currentPage - offset; i <= currentPage + offset; i++) {
                        arr.push(i);
                    }
                } else {
                    for (let i = 2; i < pageCount; i++) {
                        arr.push(i);
                    }
                }

                this.showPrevMore = showPrevMore;
                this.showNextMore = showNextMore;
                return arr;
            }
        },
        methods: {
            fixPage (newPage, pageCount, currentPage) {
                // 对页码的修正
                if (!isNaN(newPage)) {
                    if (newPage < 1) {
                        newPage = 1;
                    } else if (newPage > pageCount) {
                        newPage = pageCount;
                    }
                }

                if (newPage !== currentPage) {
                    this.$emit('currentPageChange', {currentPage: newPage, size: this.pageLimit});
                }
            },
            // 切换当前页
            pagerClickHandler (event) {
                const target = event.target;
                if (target.tagName === 'UL') return;
                // 获取当前点击元素的页码
                let newPage = Number(event.target.textContent);

                const pageCount = this.pageCount;
                const currentPage = this.currentPage;

                // 设置更前与更后页码
                if (target.className.indexOf('more') !== -1) {
                    if (target.className.indexOf('quickprev') !== -1) {
                        // 默认向前走5页
                        newPage = currentPage - 5;
                    } else if (target.className.indexOf('quicknext') !== -1) {
                        // 默认向后走5页
                        newPage = currentPage + 5;
                    }
                }
                // 修正当前页码
                this.fixPage(newPage, pageCount, currentPage);
            },
            // 切换显示条数
            selectSizeHandler () {
                console.log(this.currentSize);
                this.$emit('pageSizeChange', this.currentSize);
            },
            // 跳转页
            jumpToHandler () {
                const newPage = Number(this.jumpTo);
                if (isNaN(newPage)) return;
                // 修正当前页码
                this.fixPage(newPage, this.pageCount, this.currentPage);
            }
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../assets/less/index.less';
    .ui-pagination-wrap {
        width: 100%;
        height: 60px;
        background-color: @base-white;
        padding-top: 15px;
        color: @base-info2;
        padding-left: 15px;

        .ui-pagination-select {
            float: left;

            span {
                display: inline-block;
                vertical-align: middle;
                margin-right: 12px;
                cursor: pointer;

                select {
                    width: 76px;
                    height: 30px;
                    border-radius: 4px;
                    color:  @base-info2;
                    outline: none;
                    border: 1px solid @base-bdr;
                }
            }

        }

        .ui-pagination {
            float: left;
            list-style: none;
            margin: 0;
            padding: 0;
            font-size: 14px;
            color: @base-info2;

            li {
                float: left;
                height: 30px;
                line-height: 30px;
                padding: 0 15px;
                border: 1px solid @base-bdr;
                margin-right: 12px;
                border-radius: 4px;
                cursor: pointer;
                outline: none;
            }

            .active {
                background-color: @base-main;
                color: @base-white;
            }
        }

        .ui-pagination-jump {
            float: left;
            font-size: 0;

            span, input, button {
                display: inline-block;
                vertical-align: middle;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                border: 0;
                outline: none;
            }

            input {
                width: 80px;
                border-radius: 4px 0 0 4px;
                border: 1px solid @base-bdr;
                text-indent: 10px;
                margin-left: 12px;
                color: @base-info2;
            }

            button {
                width: 50px;
                border-radius: 0 4px 4px 0;
                border: 1px solid @base-bdr;
                background-color: @base-white;
                border-left: 0;
                line-height: 26px;
                color: @base-info2;
                margin-right: 20px;
                cursor: pointer;
            }

        }
    }
    
</style>

