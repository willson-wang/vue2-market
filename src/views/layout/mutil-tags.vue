<template>
    <div class="ui-mutil-tag" :class="{'ui-fixed-top': isFixTop}">
        <ul class='ui-mutil-tag-wrap clearFix' >
            <li class="f-l pointer">
                <span class="ui-mutil-tag-txt" @click.stop='linkTo("home")' :class="{activeRouter: currentActiveItem === 'home_one'}">首页</span>
            </li>
            <li class='f-l text-align pointer animated bounceInUp'  v-for="item in tagList" :key="item.name">
                <span class="ui-mutil-tag-txt" @contextmenu.prevent="showContextmenu(item.name)" @click.stop='linkTo(item.name)' :class="{activeRouter: currentActiveItem === item.name}">{{item.title}}</span>
                <strong @click.stop='closeItem(item.name)' :color="item.name === currentActiveItem ? 'blue' : 'default'" >
                    <icon-svg icon-name="del"></icon-svg>
                </strong>
            </li>
            <li class="f-l pointer" v-if="userOptionsList.length">
                <drop-search-select ref="routerPopOver" label="title" attr="name" :drapSearchList="userOptionsList" placeholder="搜索" @currentSelectValueEmit="getCurrentSelectValue"></drop-search-select>
            </li>
            <li class="f-r" v-if="currentActiveItem === 'home_one'">
                <pop-over ref="managePopOver" class="ui-popover">
                    <ul slot="content" class="ui-mutiltages-manage">
                        <li v-for="item in manageList" :key="item.title" class="clearFix">
                            <span class="f-l">{{item.title}}</span>
                            <span class="f-r">
                                <el-switch
                                v-model="item.isOpen"
                                on-text=""
                                off-text="">
                                </el-switch>
                            </span>
                        </li>
                    </ul>
                    <span slot="icon">管理</span>
                </pop-over>
            </li>
        </ul>
        <div class="activeRouter-effect">
            <div class="active-effect-icon"></div>
            <div class="active-effect-shadow"></div>
        </div>
    </div>
</template>

<script>
    import RouterMap from '@/assets/js/routerMap';
    import CONFIG from '@/assets/js/config';
    import DropSearchSelect from '@/components/drop-search-select';
    export default {
        name: 'mutilTags',
        components: {
            DropSearchSelect
        },
        data () {
            return {
                isFixTop: false,
                manageList: [
                    {
                        title: '产品统计',
                        isOpen: false
                    },
                    {
                        title: '刊登走势',
                        isOpen: true
                    },
                    {
                        title: '订单管理',
                        isOpen: true
                    },
                    {
                        title: '运费计算',
                        isOpen: true
                    },
                    {
                        title: '活跃度',
                        isOpen: true
                    }
                ],
                // 偏移高度
                OFFSET_TOP: 26,
                OFFSET_LEFT: 50,
                activeEffect: ''
            };
        },
        props: ['pageTagsList'],
        computed: {
            currentActiveItem () {
                return this.$route.name;
            },
            tagList () {
                return this.pageTagsList.slice(0, 5);
            },
            userOptionsList () {
                // 注意这里不能直接对this.pageTagsList进行splice操作(因为splice会改变原数组，而slice方法不会改变原数组)，另外这是在mutations外面，vuex规定操作state内的值只能在mutations内
                const arr = this.pageTagsList.slice();
                return arr.splice(5);
            }
        },
        methods: {
            closeItem (name) {
                console.log(name);
                this.$store.commit('REMOVE_TAG', name);
                this.linkTo(name);
            },
            linkTo (name) {
                console.log(name);
                this.activeEffect = name;
                this.$router.push({
                    name: name
                });
            },
            getCurrentSelectValue (linkTo) {
                this.linkTo(linkTo);
                this.currentItem = RouterMap[linkTo];
                this.$store.commit('ADD_NEW_TAG', this.currentItem);
                this.$refs.routerPopOver.$refs.searchPopover.changePopOverShow();
            },
            showContextmenu (name) {
                // getBoundingClientRect,返回包含了一组用于描述边框的只读属性——left、top、right和bottom的对象，单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的，兼容ie9+
                const rect = event.target.getBoundingClientRect();
                this.$emit('showCxtMenu', {
                    top: rect.top + this.OFFSET_TOP,
                    left: rect.left - this.OFFSET_LEFT
                });
            }
        },
        updated () {
            this.$nextTick(() => {
                const [aimEl, currentEl, shadowEl] = [document.querySelector('.activeRouter'), document.querySelector('.active-effect-icon'), document.querySelector('.active-effect-shadow')];
                if (!aimEl) return;
                let aim = aimEl.getBoundingClientRect().left;
                console.log(aim);
                currentEl.style.left = aim + 'px';
                shadowEl.style.left = aim + 'px';
            });
        },
        mounted () {
            /* eslint-disable */
            var currentScrollTop;
            var _this = this;
            var scrollHandler = function () {
                currentScrollTop = document.documentElement.scrollTop;
                if (currentScrollTop >= CONFIG.TOP_NAV_HEIGHT) {
                    _this.isFixTop = true;
                } else {
                    _this.isFixTop = false;
                }
            }
            window.addEventListener('scroll', scrollHandler);
            /* eslint-disable */
        },
        destroyed () {
            window.removeEventListener('scroll', scrollHandler);
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../assets/less/index.less';
    .ui-mutil-tag-wrap {
        list-style: none;
        .set-padding(5px, 5px, 5px, 5px);
        margin: 0;
        background-color: @base-white;

        li {
            .set-padding(17px, 10px, 17px, 10px);
            .bdr(0);
            .bdr-radius(5px, 5px, 5px, 5px);
            margin-right: 10px;
            font-size: 14px;

            .ui-cirle-defalut {
                .wh(16px, 16px);
                .bdr-radius(8px,8px,8px,8px);
                .bg(@base-shallow-gray);
            }

            .ui-mutil-tag-txt {
                margin: 0 15px;
            }

            >strong {
                position: relative;
                left: -22px;
                top: -12px;
                font-weight: normal;
                .fz(14px);
                opacity: 0;
            }

            &:hover {
                >strong {
                    opacity: 1;
                }
            }

            .activeRouter {
                color: @base-main;
                font-weight: bold;
            }
        }
    }

    .ui-fixed-top {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 2;
        box-shadow: 2px 2px 30px 10px @base-body-bg;
    }
    .activeRouter-effect {
        height: 15px;
        position: absolute;
        width: 100%;
        overflow: hidden;
        .active-effect-icon {
            width: 0;
            height: 0;
            border: solid transparent;
            border-width: 15px 20px 15px 20px;
            border-top-color: @base-white;
            position: absolute;
            z-index:1;
            transition: all .2s ease;
        }
        .active-effect-shadow {
            width: 0;
            height: 0;
            border: solid transparent;
            border-width: 15px 20px 15px 20px;
            border-top-color: @base-info1;
            position: absolute;
            top:1px;
            opacity: 0.1;
            transition: all .2s ease;
        }
    }
</style>
