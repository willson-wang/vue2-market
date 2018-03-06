<template>
    <div class='ui-topnb-wrap clearFix'>
      <div class="ui-menu-left">
          <ul class="ui-nav clearFix" @click="openMenu">
              <li class="ui-nav-item">
                  <span><icon-svg icon-name="product" ></icon-svg>产品</span>
                  <ul class="ui-nav-box animated fadeInDown">
                      <li>
                          <span link-to="product_one">产品</span>
                          <span>电器</span>
                          <span>电热</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                      </li>
                      <li>
                          <span>产品</span>
                          <span>电器</span>
                          <span>电热</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                      </li>
                      <li>
                          <span>产品</span>
                          <span>电器</span>
                          <span>电热</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                      </li>
                      <li>
                          <span>产品</span>
                          <span>电器</span>
                          <span>电热</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                      </li>
                      <li>
                          <span>产品</span>
                          <span>电器</span>
                          <span>电热</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                      </li>
                      <li>
                          <span>产品</span>
                          <span>电器</span>
                          <span>电热</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                      </li>
                  </ul>
              </li>
              <li class="ui-nav-item">
                  <span><icon-svg icon-name="order" ></icon-svg>订单</span>
                  <ul class="ui-nav-box animated fadeInDown">
                      <li>
                          <span link-to="order_one">订单1</span>
                          <span>电器</span>
                          <span>电热</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                      </li>
                      <li>
                          <span>产品</span>
                          <span>电器</span>
                          <span>电热</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                      </li>
                      <li>
                          <span>产品</span>
                          <span>电器</span>
                          <span>电热</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                      </li>
                      <li>
                          <span>产品</span>
                          <span>电器</span>
                          <span>电热</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                      </li>
                      <li>
                          <span>产品</span>
                          <span>电器</span>
                          <span>电热</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                      </li>
                      <li>
                          <span>产品</span>
                          <span>电器</span>
                          <span>电热</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                      </li>
                  </ul>
              </li>
              <li class="ui-nav-item">
                  <span><icon-svg icon-name="buy" ></icon-svg>采购</span>
                  <ul class="ui-nav-box animated fadeInDown">
                      <li>
                          <span link-to="purchase_one">采购1</span>
                          <span>电器</span>
                          <span>电热</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                      </li>
                      <li>电热</li>
                      <li>冰箱</li>
                      <li>冰箱</li>
                      <li>冰箱</li>
                  </ul>
              </li>
              <li class="ui-nav-item">
                  <span><icon-svg icon-name="system" ></icon-svg>系统</span>
                  <ul class="ui-nav-box animated fadeInDown">
                      <li><span link-to="system_one">系统1</span>
                          <span>电器</span>
                          <span>电热</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                          <span>冰箱</span></li>
                      <li>电热</li>
                      <li>冰箱</li>
                      <li>冰箱</li>
                      <li>冰箱</li>
                  </ul>
              </li>
              <li class="ui-nav-item">
                  <span><icon-svg icon-name="basic" ></icon-svg>基础</span>
                  <ul class="ui-nav-box animated fadeInDown">
                      <li><span link-to="basic_one">基础1</span>
                          <span>电器</span>
                          <span>电热</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                          <span>冰箱</span></li>
                      <li>电热</li>
                      <li>冰箱</li>
                      <li>冰箱</li>
                      <li>冰箱</li>
                  </ul>
              </li>
              <li class="ui-nav-item">
                  <span><icon-svg icon-name="warehouse" ></icon-svg>仓库</span>
                  <ul class="ui-nav-box animated fadeInDown">
                      <li><span link-to="warehouse_one">仓库1</span>
                          <span>电器</span>
                          <span>电热</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                          <span>冰箱</span></li>
                      <li>电热</li>
                      <li>冰箱</li>
                      <li>冰箱</li>
                      <li>冰箱</li>
                  </ul>
              </li>
              <li class="ui-nav-item">
                  <span><icon-svg icon-name="logistics" ></icon-svg>物流</span>
                  <ul class="ui-nav-box animated fadeInDown">
                      <li><span link-to="logistics_one">物流1</span>
                          <span>电器</span>
                          <span>电热</span>
                          <span>冰箱</span>
                          <span>冰箱</span>
                          <span>冰箱</span></li>
                      <li>电热</li>
                      <li>冰箱</li>
                      <li>冰箱</li>
                      <li>冰箱</li>
                  </ul>
              </li>
              <li class="ui-nav-item">
                  <span> <icon-svg icon-name="statistics" ></icon-svg> 统计</span>
                  <ul class="ui-nav-box animated fadeInDown">
                      <li ><span link-to="statistics_one">统计</span></li>
                      <li>电器</li>
                      <li>电热</li>
                      <li>冰箱</li>
                      <li>冰箱</li>
                      <li>冰箱</li>
                  </ul>
              </li>
              <li class="ui-nav-item">
                  <span><icon-svg icon-name="network" ></icon-svg>网页</span>
                  <ul class="ui-nav-box animated fadeInDown">
                      <li><span link-to="purchase_one">电器</span> </li>
                      <li>电热</li>
                      <li>冰箱</li>
                      <li>冰箱</li>
                      <li>冰箱</li>
                  </ul>
              </li>
              <li class="ui-nav-item">
                  <span></span>
              </li>
          </ul>                         
      </div>
      <div class='ui-menu-right'>
          <user></user>
          <div class="ui-nav-tips">
              <el-badge :value="12" class="item">
                  <icon-svg icon-name="inform" class="ui-icon"></icon-svg> 
              </el-badge>
          </div>
          <theme></theme>
          <nav-search></nav-search>
      </div>
    </div>
</template>

<script>
    import RouterMap from '@/assets/js/routerMap';
    import Theme from '@/components/theme';
    import NavSearch from '@/components/nav-search';
    import User from '@/components/user';
    export default {
        data () {
            return {
                activeIndex: '1',
                currentItem: null,
                visible2: false,
                product_one: 'test'
            };
        },
        methods: {
            openMenu (event) {
                console.log(event.target.getAttribute('link-to'));
                const linkTo = event.target.getAttribute('link-to');
                if (!linkTo) return;
                this.currentItem = RouterMap[linkTo];
                this.$store.commit('ADD_NEW_TAG', this.currentItem);
                this.$router.push({
                    name: this.currentItem.name
                });
            }

        },
        components: {
            Theme,
            NavSearch,
            User
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../assets/less/index.less';
    .ui-topnb-wrap {
        background-color: @base-main;
    }

    .ui-nav {
        list-style: none;
        margin: 0;
        width: 100%;
        padding: 0;

        .ui-nav-item {
            float: left;
            width: 10%;
            position: relative;

                >span {
                    position: relative;
                    display: block;
                    height: 68px;
                    line-height: 68px;
                    cursor: pointer;
                    color: @base-shallow-white;
                    z-index: 3;
                    background-color: @base-main;
                }


                .ui-nav-box {
                    display: none;
                    position: absolute;
                    top: 68px;
                    left: 0;
                    list-style: none;
                    padding: 0;
                    width: 600px;
                    background-color: @base-white;
                    box-shadow: 0 0 10px @base-shallow-gray;

                    span {
                        display: inline-block;
                        padding: 10px 20px;
                        cursor: pointer;
                    }
                }

                &:hover {
                    >span {
                        background-color: @base-main-hover;
                        color: @base-white;
                    }

                &:last-of-type {
                    >span:last-of-type {
                        background-color: @base-main;
                    }
                }
                    

                    .ui-nav-box {
                        display: block;
                        z-index: 2;
                    }
                } 
            }

    }

    .ui-menu-left {
        float: left;
        width: 60%;

    }

    .ui-menu-right {
        position: relative;
        float: left;
        width: 40%;
        height: 68px;
        line-height: 68px;
        z-index: 3;
        background-color: @base-main;

        .ui-nav-search {
            float: right;
        }

        .ui-menu-theme {
            float: right;
            width: 10%;
        }

        .ui-menu-user {
            float: right;
            width: 10%;
        }

        .ui-nav-tips {
            float: right;
            width: 10%;
            line-height: 30px;
            margin-top: 20px;

            .ui-icon {
                color: @base-shallow-white;
            }
        }
        // background-color: #324157;
    }


</style>

