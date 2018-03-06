/*
 * @Author: peter 
 * @Date: 2017-12-04 18:55:39 
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-19 17:45:03
 */
<template>
    <div class="ui-menu-theme">
        <!-- ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素; 如果用在子组件上，引用就指向组件实例 -->
        <pop-over show-position="top" class-name="ui-theme-popover" ref="popover" :width="245"> 
        <div slot="content" class="ui-pop-over">
            <div class="ui-menu-theme-title">选择主题色</div>
            <el-radio-group v-model="themeRadio" @change="changeCurrentTheme">
                <el-radio :label="1"></el-radio>
                <el-radio :label="2"></el-radio>
                <el-radio :label="3"></el-radio>
                <el-radio :label="4"></el-radio>
                <el-radio :label="5"></el-radio>
                <el-radio :label="6"></el-radio>
            </el-radio-group>
        </div>
        <icon-svg slot="icon" :icon-name="iconTheme" class="ui-icon"></icon-svg>
        </pop-over>
    </div>
</template>

<script>
    export default {
        name: 'theme',
        data () {
            return {
                isPopOverShow: false,
                iconTheme: 'theme',
                themeRadio: '1'
            };
        },
        methods: {
            getCurrentTheme () {
                console.log('1111');
                this.$refs.popover.changePopOverShow();
            },
            closePopOver () {
                console.log(this.$refs);
                this.$refs.popover.changePopOverShow();
            },
            changeCurrentTheme () {
                console.log(this.themeRadio);
                this.$refs.popover.changePopOverShow();
            }
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../assets/less/index.less';
    .ui-icon {
        color: @base-shallow-white;
        cursor: pointer;
    }

    .ui-theme-popover {
        .ui-menu-theme-title {
            color: @base-info2;
            height: 30px;
            line-height: 30px;
            margin-bottom: 5px;
        }
    }
</style>

