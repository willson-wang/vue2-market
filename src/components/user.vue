/*
* @Author: peter
* @Date: 2017-12-04 18:55:43
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-19 17:18:24
*/
<template>
    <div class="ui-menu-user" :userImg="userImg">
        <!-- ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素; 如果用在子组件上，引用就指向组件实例 -->
        <pop-over show-position="top" ref="popover" :width="204" show-method="click" :offset="0" class-name="ui-user-popover"> 
            <div slot="content" class="ui-pop-over">
                <div class="ui-menu-user-title">Antilochus</div>
                <ul>
                    <li @click="getUserInfo" class="clearFix">
                        <span class="f-l ui-icon">
                            <icon-svg  icon-name="user" ></icon-svg>
                        </span>
                        <span class="f-l ui-menu-user-item">个人信息</span>
                    </li>
                    <li @click="loginOut" class="clearFix">
                        <span class="f-l ui-icon">
                            <icon-svg  icon-name="login-out" ></icon-svg>
                        </span>
                        <span class="f-l ui-menu-user-item">退出</span>
                    </li>
                </ul>
            </div>
            <img :src="userImg" alt="" slot="icon">
        </pop-over>
    </div>
</template>

<script>
    import ImgUrl from '../svg/user.png';
    export default {
        name: 'user',
        data () {
            return {};
        },
        props: {
            userImg: {
                type: String,
                default: ImgUrl
            }
        },
        methods: {
            getUserInfo () {
                console.log(this.$refs);
                this.$refs.popover.changePopOverShow();
            },
            loginOut () {
                console.log(this.themeRadio);
                this.$refs.popover.changePopOverShow();
            }
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../assets/less/index.less';
    .ui-menu-user {
        img {
            width: 32px;
            height: 32px;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            vertical-align: middle;
            cursor: pointer;
        }

        
        
    }

    .ui-user-popover {
        padding: 0;

        .ui-pop-over {
            .ui-menu-user-title {
                height: 50px;
                line-height: 50px;
                background-color: #6b6feb;
                text-indent: 10%;
                font-size: 16px;
                color: @base-white;
                border-radius: 6px 6px 0 0;
            }

            ul{
                list-style: none;
                margin: 0;
                padding: 0;
                

                .ui-icon {
                    width: 20%;
                    height: 46px;
                    line-height: 46px;
                    text-align: center;
                }

                .ui-menu-user-item {
                    width: 70%;
                    height: 45px;
                    line-height: 45px;
                    border-bottom: 1px solid @base-bdr;
                    color: @base-info1;
                    font-size: 14px;
                    cursor: pointer;

                }

                li:last-of-type {
                    .ui-menu-user-item {
                        border-bottom: 0;
                    }
                }
            }
        }
    }
</style>