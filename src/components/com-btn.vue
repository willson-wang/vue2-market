<template>
    <button @click="handleClick" :size="size" :type="type" :class="[
        computType,
        {'is-tag': tag, 'is-disabled': loading},
        tag ? 'tag-' + computType : '',
        size && !tag ? 'ui-size-' + size : '']">
        <i class="el-icon-loading" v-if="loading"></i>
        <span v-if="!loading"><slot></slot></span>
        <span v-if="loading">{{loadingInfo}}</span>
    </button>
</template>
<script>
    export default {
        data () {
            return {};
        },
        props: {
            size: {
                type: String,
                default: 'normal'
            },
            type: {
                type: String,
                default: 'normal'
            },
            tag: Boolean,
            loading: Boolean,
            loadingInfo: {
                type: String,
                default: '加载中'
            }
        },
        computed: {
            computType: function () {
                let isNormal = !(this.type === 'success' || this.type === 'primary' || this.type === 'info' || this.type === 'warning' || this.type === 'danger' || this.type === 'text');
                return isNormal ? 'normal' : this.type;
            }
        },
        created () {
            console.log(this.plain);
        },
        methods: {
            handleClick (evt) {
                this.$emit('click', evt);
            }
        }
    };
</script>
<style lang="less" scoped>
    @import (reference) '../assets/less/index.less';
    @normal-height: 36px;
    @normal-width: 80px;
    button {
        border-radius: 4px;
        text-align: center;
        border: 0 none;
        outline: none;
        font-size: 14px;
        height: @normal-height;
        min-width: @normal-width;
        cursor: pointer;
        padding: 0 12px;
        color: @base-white;
    }
    button:active {
        opacity: 0.76;
    }
    .normal {
        border: 1px solid @base-bdr;
        background-color: @base-white;
        color: @base-info2;
    }
    .primary {
        background-color: @base-main;
    }
    .success {
        background-color: @base-succ;
    }
    .info {
        background-color: @base-info3;
    }
    .warning {
        background-color: @base-error;
    }
    .text {
        border: none;
        color: @base-main;
        background: transparent;
        padding-left: 0;
        padding-right: 0;
    }
    .is-tag {
        background-color: @base-white;
        height: 22px;
        padding: 0 12px;
        color: @base-info1;
        border-radius: 11px 12px;
        border: 1px dotted @base-info1;
    }
    .tag-primary {
        border-color: @base-main;
        color: @base-main;
    }
    .ui-size-small {
        height: 30px;
        min-width: 68px;
    }
    .ui-size-small.text {
        height: auto;
        min-width: auto;
        padding: 0 5px;
    }
    .is-disabled {
        opacity: 0.76;
        cursor: not-allowed;
    }
</style>