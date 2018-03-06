/*
 * @Author: peter 
 * @Date: 2017-12-04 18:55:13 
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-07 17:06:23
 */
<template>
    <div class='ui-pagination-wrap'>
        <el-pagination @size-change='pageSizeChange' @current-change='currentPageChange' :current-page='currentPage' :page-sizes='[20, 50, 100, 200, 300, 400]' :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="listTotel">

        </el-pagination>
    </div>
</template>

<script>
    export default {
        props: ['pagingData'],
        data () {
            return {
                cancelDoubleRequest: false
            };
        },
        computed: {
            // 总条数
            listTotel () {
                return this.newPagingData.total;
            },
            // 当前页
            currentPage () {
                return this.newPagingData.offset;
            },
            // 每页显示条数
            limit () {
                return this.newPagingData.limit;
            },
            // 页面信息
            newPagingData () {
                return this.pagingData ? this.pagingData : {}; // 防止报错
            }
        },
        methods: {
            pageSizeChange (size) {
                console.log(size);
                this.cancelDoubleRequest = true;
                this.$emit('pageSizeChange', size);
            },
            currentPageChange (currentPage) {
                console.log(currentPage);
                if (this.cancelDoubleRequest) { // 防止显示数据条数切换时导致的重复请求
                    this.cancelDoubleRequest = false;
                    return;
                }
                this.$emit('currentPageChange', {currentPage: currentPage, size: this.limit});
            }
        },
        created () {
            console.log(this.pagingData);
        }
    };
</script>

<style lang="less" scoped>

</style>
