<template>
  <div class="ui-side-bar" :class="{'ui-side-bar-active': isShowSidebar}" v-click-out-side="hiddenSidebar">
      <div class="f-l ui-side-bar-icon pointer"  @click="showSidebar"><icon-svg icon-name="tool"></icon-svg></div>
      <ul class="f-r ui-side-bar-menu">
          <li>侧栏1</li>
          <li>侧栏2</li>
          <li>侧栏3</li>
          <li>侧栏4</li>
          <li>侧栏5</li>
          <li>侧栏6</li>
          <li>侧栏7</li>
          <li>侧栏8</li>
          <li>侧栏9</li>
          <li>侧栏10</li>
      </ul>
  </div>
</template>

<script>
    export default {
        name: 'sidebar',
        data () {
            return {
                isShowSidebar: false
            };
        },
        methods: {
            showSidebar () {
                this.isShowSidebar = !this.isShowSidebar;
            },
            hiddenSidebar () {
                this.isShowSidebar = false;
            }
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../assets/less/index.less';
    .ui-side-bar {
        position: fixed;
        right: -195px;
        top: 20%;
        z-index: 3;
        transition: all .5s ease-in-out;

        .ui-side-bar-icon {
            position: absolute;
            width: 46px;
            height: 43px;
            left: -46px;
            line-height: 43px;
            border-radius: 50% 0 0 50%;
            background-color: @base-white;
            box-shadow: -1px 1px 0 @base-shallow-gray, //左边阴影
                        0 -1px 0 @base-shallow-gray, //顶部阴影
                        0 1px 0 @base-shallow-gray, //底部阴影
                        0 0 0 @base-shallow-gray; //右边阴影
        }

        .ui-side-bar-menu {
            padding: 0;
            margin: 0;
            list-style: none;
            background-color: @base-white;
            box-shadow: 0 0 5px @base-shallow-gray;

            li {
                width: 195px;
                height: 38px;
                line-height: 38px;
                font-size: 14px;
                cursor: pointer;
                text-align: left;
                text-indent: 50px;

                &:hover {
                    background-color: @base-shallow-hover;
                    color: @base-main;
                }
            }

        }

        
    }

    .ui-side-bar-active {
        right: 0;
    }
</style>

