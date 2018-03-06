/*
 * @Author: peter 
 * @Date: 2017-12-04 18:55:09 
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-19 16:20:09
 */
<template>
  <div class="ui-nav-search">
      <label for="" @click="showTxt" v-click-out-side="close">
          <input :class="{'ui-active': isNavSearchShow}" type="text" v-model="searchContent" placeholder="请输入sku编码">
          <span class="ui-search-icon" :class="{'is-active': isNavSearchShow}">
              <icon-svg icon-name="search" ></icon-svg>
          </span>
      </label>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                searchContent: '',
                isNavSearchShow: false
            };
        },
        methods: {
            showTxt () {
                this.isNavSearchShow = true;
            },
            close () {
                this.isNavSearchShow = false;
            }
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../assets/less/index.less';
    .ui-nav-search {
        position: relative;
        width: 202px;
        overflow: hidden;
        margin-right: 18px;

        .ui-active {
            margin-left: 0px;
        }

        input {
            width: 202px;
            height: 32px;
            margin-left: 202px;
            border-radius: 4px;
            border: 0;
            font-size: 14px;
            color: @base-info3;
            text-indent: 15px;
            transition: all .5s ease-in;
        }

        .ui-search-icon {
            position: absolute;
            top: 0;
            left: 180px;
            color: @base-shallow-white;
            cursor: pointer;
        }

        .is-active {
            color: @base-info3;
        }
    }
</style>

