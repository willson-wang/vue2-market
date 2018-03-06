/*
 * @Author: peter 
 * @Date: 2017-12-04 18:55:16 
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-19 17:23:30
 */
<template >
    <el-popover 
        :title= "showTitle"
        :placement='showPosition'
        :width='width'
        :popper-class="className"
        :offset = 'offset'
        :trigger='showMethod'
        v-model="isPopOverShow"
        @show="showPopover"
    >
        <slot name='content' ></slot> 
        <span slot="reference">
            <slot name='icon'></slot>
            <slot name='btn'></slot>
        </span>   
    </el-popover>
</template>

<script>
    export default {
        name: 'pop-over',
        data () {
            return {
                isPopOverShow: false
            };
        },
        props: {
            // popover弹窗显示位置
            showPosition: {
                type: String,
                default: 'bottom'
            },
            width: {
                type: Number,
                default: 200
            },
            // 显示方法
            showMethod: {
                type: String,
                default: 'click'
            },
            showTitle: {
                type: String
            },
            isShow: {
                type: Boolean
            },
            className: {
                type: String,
                default: ''
            },
            offset: {
                type: Number
            }
        },
        methods: {
            changePopOverShow () {
                console.log(this.isPopOverShow);
                this.isPopOverShow = !this.isPopOverShow;
            },
            // 显示popover之前触发
            showPopover () {
                this.$emit('showPopoverEmit');
            }
        },
        mounted () {
            // console.log(this.isShow)
        }
    };
</script>

<style lang="less" scoped>

</style>

