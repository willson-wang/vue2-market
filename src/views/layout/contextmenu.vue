<template>
    <div class="ui-contextmenu" >
        <div class="ui-triangle-pointer">
            <span class="ui-triangle"></span>
            <span class="ui-triangle ui-triangle-transparent"></span>
        </div>
        <span>刷新标签页</span>
        <span>关闭标签页</span>
        <span>关闭其它标签页</span>
        <span>关闭右侧标签页</span>
    </div>
</template>

<script>
    export default {
        name: 'contextmenu'
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../assets/less/index.less';
    .ui-contextmenu {
        position: absolute;
        top: 68px;
        border: 1px solid @base-bdr;
        padding: 6px;
        font-size: 14px;
        color: #373e4f;
        background-color: @base-white;
        border-radius: 3px;
        box-shadow: 0 0 2px @base-bdr;
        z-index: 999;

        >span {
            display: block;
            width: 124px;
            height: 40px;
            line-height: 40px;
            text-align: center;

            &:hover {
                background-color: @base-shallow-hover;
                cursor: pointer;
            }
        }

        .ui-triangle-pointer {
            position: absolute;
            top: -10px;
            left: 56px;
            text-align: center;

            .ui-triangle-transparent {
                position: absolute;
                top: 2px;
                border-bottom: 9px solid @base-white;
            }
        }
    }

    .ui-triangle {
        display: block;
        width: 0;
        height: 0;
        border-left: 12px solid @base-transparent;
        border-right: 12px solid @base-transparent;
        border-bottom: 9px solid @base-bdr;
    }
</style>
