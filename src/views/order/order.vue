<template>
    <div class="ui-order">
        <div class="ui-order-screen">
            <div class="ui-search-screen clearFix" v-if="isSearch">
                <!--<show-condition :show-list="addSearchData" style="width: 85%;float: left;" v-show="isConditionShow"></show-condition>-->
                <!--<button class="ui-btn-txt" @click="clearSearchInfo" v-show="isConditionShow">清除</button>-->
                <!--<button class="ui-btn-txt" v-popover:popover2 style="margin-right: 20px;float: right;">筛选<icon-svg icon-name="filter" style="margin-left: 10px"></icon-svg></button>-->
                <div>
                    <el-input v-model="searchObj.sku" placeholder="sku"
                              style="width: 150px;float: left;height: 30px;"></el-input>
                    <el-select v-model="searchObj.development_group" :placeholder="drop_list.conditionList[0].label"
                               style="margin-left: 10px;width: 150px;float: left;height: 30px;">
                        <el-option
                                v-for="item in drop_list.conditionList[0].value"
                                :key="item.key"
                                :label="item.val"
                                :value="item.key">
                        </el-option>
                    </el-select>
                    <el-select v-model="searchObj.tort_platform" :placeholder="drop_list.conditionList[1].label"
                               style="margin-left: 10px;width: 150px;float: left;height: 30px;">
                        <el-option
                                v-for="item in drop_list.conditionList[1].value"
                                :key="item.key"
                                :label="item.val"
                                :value="item.key">
                        </el-option>
                    </el-select>
                    <el-select v-model="searchObj.product_status" :placeholder="drop_list.conditionList[2].label"
                               style="margin-left: 10px;width: 150px;float: left;height: 30px;">
                        <el-option
                                v-for="item in drop_list.conditionList[2].value"
                                :key="item.key"
                                :label="item.val"
                                :value="item.key">
                        </el-option>
                    </el-select>
                    <el-select v-model="searchObj.security_level" :placeholder="drop_list.conditionList[3].label"
                               style="margin-left: 15px;width: 150px;float: left;height: 30px;">
                        <el-option
                                v-for="item in drop_list.conditionList[3].value"
                                :key="item.key"
                                :label="item.val"
                                :value="item.key">
                        </el-option>
                    </el-select>
                    <el-popover
                            ref="popover2"
                            placement="bottom"
                            title=""
                            width="1070"
                            trigger="click"
                            v-model="showSearchList"
                            @show="showCondition"
                            popper-class="clear-popover-style">
                        <screen-stencil
                                :condition-list="drop_list.conditionList"
                                :search-data="addSearchData"
                                :checked-cities="checkedCities"
                                @headSearchConfirm="headSearchConfirm"
                                @headSearchCancel="headSearchCancel"></screen-stencil>
                    </el-popover>
                    <button class="ui-btn-txt" v-popover:popover2>筛选<icon-svg icon-name="filter" style="margin-left: 10px"></icon-svg></button>
                    <com-btn style="float: left;" size="small">重置</com-btn>
                    <com-btn style="float: left; margin-left: 15px;" type="primary" size="small">查询</com-btn>
                </div>
            </div>
        </div>
        <ul class="ui-order-opration clearFix" v-if="!isSearch">
            <li>
                <el-button type="text" @click="cancelOrder">取消订单</el-button>
            </li>
            <li>
                <el-button type="text" @click="lockOrder">锁定订单</el-button>
            </li>
            <li>
                <el-button type="text" @click="unlockOrder">解锁订单</el-button>
            </li>
            <li>
                <el-button type="text" @click="addOrder">添加线下订单</el-button>
            </li>
            <li>
                <el-dropdown trigger="click" @command="exportOrLeadingIn">
      <span class="el-dropdown-link">
        导出导入<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="in">导出</el-dropdown-item>
                        <el-dropdown-item command="out">导入</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
            <li>
                <el-button type="text" @click="exportSearchOrder">按查询条件导出订单</el-button>
            </li>
            <li>
                <el-button type="text" @click="batchRemark">批量备注</el-button>
            </li>
        </ul>
        <el-popover
                ref="popoverLocation"
                placement="bottom"
                title=""
                width="280"
                trigger="hover"
                v-model="showLocation"
                @show="showCondition"
                popper-class="clear-popover-style">
            <div class="el-table-location-filter">
                <ul>
                    <li class="clearFix">
                        <span>实际库存</span>
                        <el-select v-model="searchObj.development_group" :placeholder="drop_list.conditionList[0].label">
                            <el-option
                                    v-for="item in drop_list.conditionList[0].value"
                                    :key="item.key"
                                    :label="item.val"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="clearFix">
                        <span>可用库存</span>
                        <el-select v-model="searchObj.development_group" :placeholder="drop_list.conditionList[1].label">
                            <el-option
                                    v-for="item in drop_list.conditionList[1].value"
                                    :key="item.key"
                                    :label="item.val"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="clearFix">
                        <span>在途</span>
                        <el-select v-model="searchObj.development_group" :placeholder="drop_list.conditionList[2].label">
                            <el-option
                                    v-for="item in drop_list.conditionList[2].value"
                                    :key="item.key"
                                    :label="item.val"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </li>
                </ul>
                <div>
                    <el-button size="medium" round @click="showLocation = !showLocation">取消</el-button>
                    <el-button size="medium" round type="primary" @click="showLocation = !showLocation">确定</el-button>
                </div>
            </div>
        </el-popover>
        <div>
            <s-table :list="orderOnelist" class-name="ui-theader-bdr" :is-stripe="true" :max-height='tbodyMaxHeight' :is-resize="true" :opration-btn-list="oprationBtnList" :is-select="true" @selectItemEmit="selectItemHandler" @selectAllEmit="selectAll">
                <div slot="salesPlat" style="width: 100%; height: 100%; position: absolute;left: 0;top: 0;" v-popover:popoverLocation @click="test"></div>
            </s-table>
            <s-pagination :paging-data='pagingData' @currentPageChange='currentPageChange' @pageSizeChange='pageSizeChange'></s-pagination>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import {getClinetHeight} from '@/utils';
    import Config from '@/assets/js/config';
    import Pagination from '@/components/pagination';
    import ShowCondition from '@/components/show-condition';
    import IconSvg from '@/components/icon-svg/index';
    import screenStencil from '@/components/screen-stencil';
    import {orderCancel, orderLock, orderUnLock} from '@/api/order/index';
    import STable from '@/components/table/s-table';
    import SPagination from '@/components/paginations/s-pagination';
    export default {
        name: 'order',
        data () {
            return {
                orderOnelist: [],
                fixedHeight: Config.MUTIL_FIXED_HEIGHT,
                oprationBtnList: [
                    {
                        type: 'text',
                        size: 'small',
                        title: '编辑',
                        flag: 'edite'
                    },
                    {
                        type: 'text',
                        size: 'small',
                        title: '标记付款',
                        flag: 'buy'
                    },
                    {
                        type: 'text',
                        size: 'small',
                        title: '删除',
                        flag: 'del'
                    },
                    {
                        type: 'text',
                        size: 'small',
                        title: '复制',
                        flag: 'copy'
                    }
                ],
                showSearchList: false, // 控制显示筛选框
                searchObj: {
                    sku: '',
                    development_group: '',
                    tort_platform: '',
                    product_status: '',
                    security_level: ''
                },
                // 勾选筛选条件
                checkedCities: {
                    name: '所有部门',
                    value: []
                },
                // 所有菜单列表
                drop_list: {
                    conditionList: [
                        {
                            label: '',
                            name: '',
                            value: []
                        },
                        {
                            label: '',
                            name: '',
                            value: []
                        },
                        {
                            label: '',
                            name: '',
                            value: []
                        },
                        {
                            label: '',
                            name: '',
                            value: []
                        }
                    ]
                },
                // 选择筛选条件
                addSearchData: [],
                // 控制显示已选条件框
                isConditionShow: false,
                // 控制查询显示
                isSearch: true,
                showLocation: false
            };
        },
        components: {
            Pagination,
            ShowCondition,
            IconSvg,
            screenStencil,
            STable,
            SPagination
        },
        computed: {
            ...mapGetters([
                'productMdInfo',
                'orderOneOrderInfo'
            ]),
            pagingData () {
                return this.orderOneOrderInfo.pagingData;
            },
            tbodyMaxHeight () {
                // 2是用来修正高度给的一个误差值
                return getClinetHeight() - this.fixedHeight - 2;
            }
        },
        methods: {
            ...mapActions([
                'GetProductList',
                'GetOrderOneOrderList',
                'OrderCancel'
            ]),
            test () {
                this.showLocation = true;
            },
            selectAll (selection) {
                this.isSearch = !selection.length;
            },
            selectItemChange (selection) {
                console.log(selection.length);
                this.isSearch = !selection.length;
            },
            // 单选表格
            selectItemHandler (checkedArr) {
                console.log(checkedArr);
                this.isSearch = !checkedArr.length;
            },
            getCurrentRowInfo (row, event, column) {
                console.log(row);
            },
            formatterData (row, column) {
                return row.payTime;
            },
            getOrderOneOrderList (queryParams) {
                this.GetOrderOneOrderList(queryParams).then(response => {
                    console.log(response);
                    this.orderOnelist = response;
                    this.drop_list = this.orderOnelist.drop_down_box;
                    console.log(this.drop_list);
                    console.log(response);
                }).catch(error => {
                    console.log(error);
                });
            },
            pageSizeChange (size) {
                console.log('product' + size);
                this.getOrderOneOrderList({
                    limit: size,
                    offset: 1
                });
            },
            currentPageChange ({currentPage, size}) {
                console.log('product' + size);
                this.getOrderOneOrderList({
                    limit: size,
                    offset: currentPage
                });
            },
            exportExcel () {
                require.ensure([], () => {
                    const {export_json_to_excel} = require('@/assets/js/export2-excel');
                    console.log(export_json_to_excel);
                    const theader = [this.sku, this.customerAlias, this.status, this.categoryDesc_alias, this.title, this.grossWeight, this.price, this.hsCode, this.createTime];
                    const filterValue = ['sku', 'customerAlias', 'status', 'categoryDesc_alias', 'title', 'grossWeight', 'price', 'hsCode', 'createTime'];
                    const list = this.orderOnelist.value;
                    const data = this.formatJson(filterValue, list);
                    console.log(data);
                    export_json_to_excel(theader, data, '产品列表');
                });
            },
            formatJson (filterValue, list) {
                console.log(list);
                return list.map(v => filterValue.map(j => v[j]));
            },
            getCurrentRowInfoByOpration (info) {
                console.log(info);
            },
            headSearchConfirm (searchInfo) {
                const [checkArr, listArr] = [this.checkedCities, this.drop_list.conditionList];
                this.addSearchData.splice(0);
                for (let i = 0; i < checkArr.value.length; i++) {
                    for (let j = 0; j < listArr.length; j++) {
                        for (let n = 0; n < listArr[j].value.length; n++) {
                            if (checkArr.value[i] === listArr[j].value[n].key) {
                                this.addSearchData.push({
                                    name: listArr[j].name,
                                    value: listArr[j].value[n].val,
                                    key: listArr[j].value[n].key
                                });
                                break;
                            }
                        }
                    }
                }
                for (let key in searchInfo) {
                    if (searchInfo[key].value) {
                        this.addSearchData.push({
                            name: searchInfo[key].name,
                            value: searchInfo[key].value,
                            key: searchInfo[key].key
                        });
                    }
                }
                console.log(this.addSearchData);
                this.showSearchList = false;
            },
            headSearchCancel () {
                this.showSearchList = false;
            },
            showCondition () {
                this.checkedCities.value.splice(0);
                const [listArr, searchArr] = [this.drop_list.conditionList, this.addSearchData];
                let hd = false;
                for (let i = 0; i < searchArr.length; i++) {
                    this.checkedCities.value.push(searchArr[i].key);
                }
                for (let i = 0; i < listArr.length; i++) {
                    for (let x = 0; x < searchArr.length; x++) {
                        if (listArr[i].name === searchArr[x].name) {
                            hd = true;
                            break;
                        }
                    }
                    listArr[i].allSel = hd ? '' : 'ui-head-select-all_btn';
                    hd = false;
                }
            },
            clearSearchInfo () {
                this.checkedCities.value.splice(0);
                this.addSearchData.splice(0);
            },
            cancelOrder () {
                orderCancel('1').then(response => {
                    if (response.data.status) {
                        this.$message({
                            showClose: true,
                            message: '取消订单成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: '取消订单失败',
                            type: 'error'
                        });
                    }
                });
            },
            lockOrder () {
                orderLock('1').then(response => {
                    if (response.data.status) {
                        this.$message({
                            showClose: true,
                            message: '锁定订单成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: '锁定订单失败',
                            type: 'error'
                        });
                    }
                });
            },
            unlockOrder () {
                orderUnLock('1').then(response => {
                    if (response.data.status) {
                        this.$message({
                            showClose: true,
                            message: '解锁订单成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: '解锁订单失败',
                            type: 'error'
                        });
                    }
                });
            },
            addOrder () {
                console.log('添加订单');
            },
            exportOrLeadingIn (command) {
                switch (command) {
                    case 'in':
                        console.log('导入');
                        break;
                    case 'out':
                        console.log('导出');
                        break;
                }
            },
            exportSearchOrder () {
                console.log('导出搜索条件订单');
            },
            batchRemark () {
                console.log('批量备注');
            }
        },
        created () {
            if (this.orderOneOrderInfo.value) {
                this.orderOnelist = this.orderOneOrderInfo;
                this.drop_list = this.orderOnelist.drop_down_box;
            } else {
                this.getOrderOneOrderList();
            }
        },
        updated () {
            console.log(1111);
        },
        watch: {
            addSearchData: {
                handler (val) {
                    this.isConditionShow = !!val.length;
                },
                deep: true
            }
        }
    };
</script>

<style lang="less" scoped>
     @import (reference) '../../assets/less/index.less';
    .ui-order {
        margin: 20px 20px 0 20px;
        padding: 20px;
        background-color: @base-white;
        .ui-order-opration {
            list-style: none;
            margin: 0 0 20px 0;
            padding: 0;
            background-color: @base-white;
            li {
                float: left;
                height: 30px;
                line-height: 30px;
                .fz(14px);
                span {
                    display: inline-block;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 10px;
                    border-right: 1px solid @base-info3;
                    cursor: pointer;
                }
                button {
                    padding: 0 10px;
                    border-right: 1px solid @base-info3;
                    border-radius: 0;
                }
                &:last-of-type span {
                    border-right: 0;
                }
            }
        }
        /*筛选模块样式*/
        .ui-order-screen{
            background: @base-white;
            .ui-btn-txt {
                border: 0 none;
                background: none;
                float: left;
                height: 30px;
                font-size: 16px;
                width: 74px;
                text-align: left;
                margin-left: 10px;
                color: @base-main;
                outline: none;
                cursor: pointer;
            }
            .ui-search-screen {
                margin-bottom: 20px;
            }
        }
    }
     .el-table-location-filter {
         padding: 30px;
         font-size: 14px;
         ul {
             margin: 0;
             padding: 0;
             li {
                 margin: 0 0 30px 0;
                 padding: 0;
                 list-style: none;
                 span {
                     display: block;
                     margin-bottom: 15px;
                 }
             }
         }
     }
</style>
