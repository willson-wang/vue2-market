<template>
    <div class="el-show-view clearFix" :show-list="showList">
        <span class="fl pgs" @click="last"><icon-svg icon-name="page-l"></icon-svg></span>
        <div class="fl el-condition" id="s-view">
            <div class="clearFix" v-for="(item, index) in showList" :key="index">
                <span class="el-condition-tit">{{item.name}} : </span>
                <span class="el-condition-txt">{{item.value}}</span>
                <button type="button" style="color: red;" @click="del(item.key)"><icon-svg icon-name="del-s"></icon-svg></button>
            </div>
        </div>
        <span class="fr pgs" @click="next"><icon-svg icon-name="page-r"></icon-svg></span>
    </div>
</template>
<script>
    export default {
        name: 'show-builder',
        props: {
            showList: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {
                offset: 0
            };
        },
        methods: {
            // 已选条件框向左滚动
            last () {
                const [view, vBox] = [document.querySelector('#s-view'), document.querySelector('.el-show-view')];
                const [viewWidth, vBoxWidth] = [view.offsetWidth, vBox.offsetWidth];
                if (viewWidth > vBoxWidth) {
                    if (this.offset <= 0) return;
                    const [offsetLength] = [100, (viewWidth - vBoxWidth) % 100];
                    this.offset = offsetLength <= this.offset ? this.offset - offsetLength : 0;
                    view.style.left = '-' + this.offset + 'px';
                }
            },
            // 已选条件框向右滚动
            next () {
                const [view, vBox, sView] = [document.querySelector('#s-view'), document.querySelector('.el-show-view'), document.querySelector('.el-show-view')];
                const [viewWidth, vBoxWidth] = [view.offsetWidth, vBox.offsetWidth];
                if (viewWidth > vBoxWidth) {
                    if (this.offset >= viewWidth - vBoxWidth) return;
                    const [offsetLength] = [100, (viewWidth - vBoxWidth) % 100];
                    let num = (viewWidth - vBoxWidth) - this.offset;
                    this.offset = offsetLength <= num ? this.offset + offsetLength : viewWidth - sView.offsetWidth;
                    view.style.left = '-' + this.offset + 'px';
                }
            },
            // 删除单个筛选条件
            del (k) {
                console.log(this.offset);
                const [view, sView] = [document.querySelector('#s-view'), document.querySelector('.el-show-view')];
                let num = view.offsetWidth;
                for (let i = 0; i < this.showList.length; i++) {
                    if (this.showList[i].key === k) {
                        this.showList.splice(i, 1);
                    }
                }
                this.$nextTick(() => {
                    this.offset = view.offsetWidth <= sView.offsetWidth ? 0 : this.offset - (num - view.offsetWidth);
                    console.log(this.offset);
                    view.style.left = '-' + this.offset + 'px';
                });
            }
        },
        watch: {
            // 监听已选条件
            showList: {
                handler (val) {
                    const [view] = [document.querySelector('#s-view')];
                    view.style.width = ''; // 让view的宽度为空，宽度会随子元素撑开
                    if (!val.length) {
                        view.style.left = '0px';
                        this.offset = 0;
                    }
                },
                deep: true
            }
        },
        updated () {
            // 动态设置view的宽度
            const [view] = [document.querySelector('#s-view')];
            const viewChild = document.querySelectorAll('#s-view > div');
            this.$nextTick(() => {
                let viewWidth = 0;
                for (let i = 0; i < viewChild.length; i++) {
                    viewWidth += viewChild[i].offsetWidth + 15; // 15 是固定的margin值
                }
                view.style.width = (viewWidth + 70) + 'px'; // 70 是view固定的padding值
            });
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../assets/less/index.less';
    ul,li {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .el-show-view {
        margin-top: 20px;
        height: 25px;
        position: relative;
        overflow: hidden;
        background-color: @base-white;
        display: inline-block;
        .pgs {
            display: inline-block;
            width: 30px;
            z-index: 123;
            position: relative;
            height: 25px;
            line-height: 25px;
            background: @base-white;
            cursor: pointer;
        }
        .el-condition {
            position: absolute;
            white-space: nowrap;
            float: left;
            padding: 0 30px;
            div {
                margin-right: 15px;
                padding-left: 10px;
                padding-right: 10px;
                height: 25px;
                border: 1px solid @base-bdr;
                border-radius: 1px;
                font-size: 14px;
                line-height: 25px;
                float: left;
                span {
                    display: inline-block;
                    float: left;
                }
                .el-condition-tit {
                    color: @base-info1;
                }
                .el-condition-txt {
                    max-width: 170px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                button {
                    height: 14px;
                    width: 14px;
                    text-align: center;
                    line-height: 14px;
                    border: 0 none;
                    background: none;
                    cursor: pointer;
                    outline: none;
                    padding: 0;
                    margin-top: 6px;
                    margin-left: 4px;
                }
                button:hover {
                    background: @base-main;
                    color: @base-white;
                }
            }
        }
    }
</style>