<template>
    <div class="ui-prodict clearFix">
        <!--<h1>产品页</h1>-->
        <div class="ui-product-screen clearFix" v-if="isSearch">
            <div class="ui-search-screen clearFix">
                <div>
                    <el-input v-model="searchObj.sku" placeholder="sku"
                              style="width: 150px;float: left;height: 30px;"></el-input>
                    <el-select v-model="searchObj.development_group" :placeholder="drop_list.conditionList[0].label"
                               style="margin-left: 10px;width: 150px;float: left;height: 30px;" >
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
                                @headSearchCancel="headSearchCancel"
                                :show-popover="showSearchList"></screen-stencil>
                    </el-popover>
                    <button class="ui-btn-txt" v-popover:popover2>筛选<icon-svg icon-name="filter" style="margin-left: 10px"></icon-svg></button>
                    <com-btn style="float: left;" size="small">重置</com-btn>
                    <com-btn style="float: left; margin-left: 15px;" type="primary" size="small">查询</com-btn>
                    <!--<com-btn type="info">这是一个按钮</com-btn>-->
                    <!--<com-btn type="warning">按钮</com-btn>-->
                    <!--<com-btn type="success" size="small">这是一个按钮</com-btn>-->
                    <!--<com-btn type="warning" size="small">按钮</com-btn>-->
                    <!--<com-btn type="primary" tag>这是一个按钮</com-btn>-->
                    <!--<com-btn type="primary" :loading="loading" @click="test" loadingInfo="拼命加载中">这是一个按钮</com-btn>-->
                </div>
            </div>
        </div>
        <div class="clearFix">
            <!--<show-condition :show-list="addSearchData" style="width: 90%;float: left;" v-show="isConditionShow"></show-condition>-->
            <!--<button class="ui-btn-txt" style="margin-top: 15px;" @click="clearSearchInfo" v-show="isConditionShow">清除</button>-->
        </div>
        <ul class="ui-product-opration clearFix" v-if="!isSearch">
            <li>
                <el-button type="text" @click="deleteProduct">删除</el-button>
            </li>
            <li>
                <el-button type="text" @click="batchOperate">批量操作</el-button>
            </li>
            <li>
                <el-dropdown trigger="click" @command="exportOrLeadingIn">
                  <span class="el-dropdown-link">
                    导出导入<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="in">导入</el-dropdown-item>
                        <el-dropdown-item command="out">导出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
            <li>
                <el-button type="text" @click="copyPublish">复制刊登</el-button>
            </li>
            <li>
                <el-button type="text" @click="sellingPriceLock">卖价锁定</el-button>
            </li>
            <li>
                <el-button type="text" @click="sellingPriceUnLock">取消卖价锁定</el-button>
            </li>
            <li>
                <el-button type="text" @click="theShelves">上架</el-button>
            </li>
            <li>
                <el-button type="text" @click="fromSale">下架</el-button>
            </li>
        </ul>
        <!--表头仓库过滤框-->
        <el-popover
                ref="popoverLocation"
                placement="bottom"
                title=""
                width="280"
                trigger="click"
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
                    <el-button size="medium" round>取消</el-button>
                    <el-button size="medium" round type="primary">确定</el-button>
                </div>
            </div>
        </el-popover>
        <!--表头公司分类过滤框-->
        <el-popover
                ref="popoerClassify"
                placement="bottom"
                width="110"
                trigger="click"
                v-model="showTabelHeadClassify"
                popper-class="clear-popover-style">
            <div class="el-table-head-classify_filter">
                <ul>
                    <li><span>最低</span></li>
                    <li><span>最高</span></li>
                    <li><span>最新</span></li>
                </ul>
            </div>
        </el-popover>
        <div>
            <s-table class-name="ui-theader-bdr" :is-stripe="true" :max-height='tbodyMaxHeight' :is-resize="true" :list="productList" :opration-btn-list="oprationBtnList" :is-select="true" @selectItemEmit="selectItemHandler" @selectAllEmit="selectAll">
                <div slot="warehouse" style="width: 100%; height: 100%; position: absolute;left: 0;top: 0;" @click="filterTabelHeadLocation"><icon-svg icon-name="drop-down" v-popover:popoverLocation :is-down="showLocation" class-name="product-location" style="position: absolute;right: 30px;top: 50%;margin-top: -8px;"></icon-svg></div>
                <div slot="classify" style="width: 100%; height: 100%; position: absolute;left: 0;top: 0;" @click="filterTabelHeadClassify"><icon-svg icon-name="drop-down" v-popover:popoerClassify :is-down="showTabelHeadClassify" class-name="product-classify" style="position: absolute;right: 30px;top: 50%;margin-top: -8px;"></icon-svg></div>
            </s-table>
            <s-pagination :paging-data='pagingData' @currentPageChange='currentPageChange' @pageSizeChange='pageSizeChange'></s-pagination>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import {getClinetHeight} from '@/utils';
    import Config from '@/assets/js/config';
    import pagination from '@/components/pagination';
    import ShowCondition from '@/components/show-condition';
    import IconSvg from '@/components/icon-svg/index';
    import screenStencil from '@/components/screen-stencil';
    import STable from '@/components/table/s-table';
    import SPagination from '@/components/paginations/s-pagination';
    export default {
        name: 'product',
        components: {
            pagination,
            ShowCondition,
            IconSvg,
            screenStencil,
            STable,
            SPagination
        },
        data () {
            return {
                fixedHeight: Config.MUTIL_FIXED_HEIGHT,
                productList: [],
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
                sku: this.$t('sku'),
                customerAlias: this.$t('customerAlias'),
                status: this.$t('status'),
                categoryDesc_alias: this.$t('categoryDesc_alias'),
                title: this.$t('title'),
                grossWeight: this.$t('grossWeight'),
                price: this.$t('price'),
                hsCode: this.$t('hsCode'),
                createTime: this.$t('createTime'),
                showSearchList: false, // 控制显示筛选框
                showLocation: false, // 显示仓库筛选
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
                // 选择筛选条件
                addSearchData: [],
                // 控制显示已选条件框
                isConditionShow: false,
                loading: false,
                isSearch: true,
                showTabelHeadClassify: false,
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
                }
            };
        },
        computed: {
            ...mapGetters([
                'productMdInfo'
            ]),
            pagingData () {
                return this.productMdInfo.pagingData;
            },
            tbodyMaxHeight () {
                // 2是用来修正高度给的一个误差值
                return getClinetHeight() - this.fixedHeight - 2;
            }
        },
        methods: {
            ...mapActions([
                'GetProductList'
            ]),
            test () {
                if (this.loading) return;
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                }, 2000);
            },
            selectAll (selection) {
                console.log(selection);
                this.isSearch = !selection.length;
            },
            // 单选表格
            selectItemHandler (checkedArr) {
                console.log(checkedArr);
                this.isSearch = !checkedArr.length;
            },
            selectItemChange (selection) {
                console.log(selection);
            },
            getCurrentRowInfo (row, event, column) {
                console.log(row);
            },
            formatterData (row, column) {
                return row.createTime;
            },
            pageSizeChange (size) {
                console.log('product' + size);
                this.GetProductList({
                    limit: size,
                    offset: 1
                }).then((response) => {
                    console.log(response);
                    this.productList = response;
                }).catch(error => {
                    console.log(error);
                });
            },
            getProductInfoList (queryParams) {
                this.GetProductList(queryParams).then(response => {
                    console.log(response);
                    this.productList = response;
                }).catch(error => {
                    console.log(error);
                });
            },
            // 删除
            deleteProduct () {
                console.log('删除');
            },
            // 批量操作
            batchOperate () {
                console.log('批量操作');
            },
            // 复制刊登
            copyPublish () {
                console.log('复制刊登');
            },
            // 卖价锁定
            sellingPriceLock () {
                console.log('卖价锁定');
            },
            // 取消卖价锁定
            sellingPriceUnLock () {
                console.log('取消卖价锁定');
            },
            // 上架
            theShelves () {
                console.log('上架');
            },
            // 下架
            fromSale () {
                console.log('下架');
            },
            exportExcel () {
                require.ensure([], () => {
                    const {export_json_to_excel} = require('@/assets/js/export2-excel');
                    console.log(export_json_to_excel);
                    const theader = [this.sku, this.customerAlias, this.status, this.categoryDesc_alias, this.title, this.grossWeight, this.price, this.hsCode, this.createTime];
                    const filterValue = ['sku', 'customerAlias', 'status', 'categoryDesc_alias', 'title', 'grossWeight', 'price', 'hsCode', 'createTime'];
                    const list = this.productList.value;
                    const data = this.formatJson(filterValue, list);
                    console.log(data);
                    export_json_to_excel(theader, data, '产品列表');
                });
            },
            exportOrLeadingIn (command) {
                switch (command) {
                    case 'in':
                        console.log('导入');
                        break;
                    case 'out':
                        this.exportExcel();
                        break;
                }
            },
            currentPageChange ({currentPage, size}) {
                this.GetProductList({
                    limit: size,
                    offset: currentPage
                }).then(response => {
                    this.productList = response;
                }).catch(error => {
                    console.log(error);
                });
            },
            formatJson (filterValue, list) {
                console.log(list);
                return list.map(v => filterValue.map(j => v[j]));
            },
            // 头部筛选框确定
            headSearchConfirm (searchInfo) {
                const [checkArr, listArr] = [this.checkedCities, this.drop_list.conditionList];
                console.log(listArr);
                this.addSearchData.splice(0);
                for (let i = 0; i < checkArr.value.length; i++) {
                    for (let j = 0; j < listArr.length; j++) {
                        for (let n = 0; n < listArr[j].value.length; n++) {
                            if (checkArr.value[i] === listArr[j].value[n].key) {
                                this.addSearchData.push({
                                    name: listArr[j].label,
                                    value: listArr[j].value[n].val,
                                    key: listArr[j].value[n].key
                                });
                                break;
                            }
                        }
                    }
                }
                for (let key in searchInfo) {
                    console.log(searchInfo);
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
            // 头部筛选框取消
            headSearchCancel () {
                this.showSearchList = false;
            },
            // 显示筛选框
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
            // 清除筛选数据
            clearSearchInfo () {
                this.checkedCities.value.splice(0);
                this.addSearchData.splice(0);
            },
            // 表头分类过滤显示
            filterTabelHeadClassify () {
                this.showTabelHeadClassify = !this.showTabelHeadClassify;
            },
            // 表头仓库过滤显示
            filterTabelHeadLocation () {
                this.showLocation = !this.showLocation;
            }
        },
        watch: {
            addSearchData: {
                handler (val) {
                    this.isConditionShow = !!val.length;
                },
                deep: true
            }
        },
        created () {
            if (this.productMdInfo.value) {
                this.productList = this.productMdInfo;
                this.drop_list = this.productList.drop_down_box;
            } else {
                console.log('sss');
                this.GetProductList().then(response => {
                    this.productList = response;
                    this.drop_list = response.drop_down_box;
                }).catch(error => {
                    console.log(error);
                });
            }
        },
        updated () {}
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../assets/less/index.less';
    @font-f: '微软雅黑';
    html {
        font-family: @font-f;
    }
    ul,li{
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .ui-prodict {
        margin: 20px 20px 0 20px;
        padding: 20px;
        background-color: @base-white;
        .ui-product-opration {
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
        .ui-product-screen{
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
            li {
                margin-bottom: 30px;
                span {
                    display: block;
                    margin-bottom: 15px;
                }
            }
        }
    }
    /*表头分类过滤*/
    .el-table-head-classify_filter {
        padding: 5px;
        ul {
            margin: 0;
            padding: 0;
            list-style: none;
            li {
                height: 40px;
                line-height: 40px;
                position: relative;
                span {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    font-size: 14px;
                }
            }
            li:hover{
                background-color: @base-hover;
            }
        }
    }
</style>

