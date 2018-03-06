<template>
    <div class="ui-search-condition clearFix"
         :condition-list="conditionList"
         :search-data="addSearchData"
         :checked-cities="checkedCities"
         :show-popover="showPopover">
        <div class="ui-search-list">
            <ul class="ui-search-nav">
                <li><a href="#search_id1">常用筛选</a></li>
                <li><a href="#search_id2">搜索</a></li>
            </ul>
        </div>
        <div class="ui-search-select">
            <div class="ui-search-select_list">
                <ul class="ui-search-com_sel" id="search_id1">
                    <li>
                        <div v-if="conditionList[0].selType !== 'radio'">
                            <span class="ui-search-com_sel_tit">{{conditionList[0].label}}</span>
                            <div class="ui-search-all_btn" :class="conditionList[0].allSel">
                                <el-button size="mini" style="padding-left: 10px;padding-right: 10px" @click="selectAllScreen(conditionList[0].label)">不限</el-button>
                            </div>
                            <s-checkbox-group v-model="checkedCities.value">
                                <div v-for="(item, index) in conditionList[0].value" :key="index">
                                    <s-checkbox :reveser="true" :disabled="false" :label="item.key" :key="item.key">{{item.val}}</s-checkbox>
                                </div>
                            </s-checkbox-group>
                        </div>
                        <div v-if="conditionList[0].selType === 'radio'">
                            <span class="ui-search-com_sel_tit">{{conditionList[0].label}}</span>
                            <div class="ui-search-all_btn" :class="conditionList[0].allSel">
                                <el-button size="mini" style="padding-left: 10px;padding-right: 10px" @click="selectAllScreen(conditionList[0].label, true)">不限</el-button>
                            </div>
                            <s-radio-group v-model="radioValue[0]" style="text-align: initial; float: left">
                                <s-radio-button @click="handlerRadioClick(0)" :isScreen="true" v-for="(item, index) in conditionList[0].value" :key="index" :label="item.key">{{item.val}}</s-radio-button>
                            </s-radio-group>
                        </div>
                    </li>
                    <li>
                        <div v-if="conditionList[1].selType !== 'radio'">
                            <span class="ui-search-com_sel_tit">{{conditionList[1].label}}</span>
                            <div class="ui-search-all_btn" :class="conditionList[1].allSel">
                                <el-button size="mini" style="padding-left: 10px;padding-right: 10px" @click="selectAllScreen(conditionList[1].label)">不限</el-button>
                            </div>
                            <s-checkbox-group v-model="checkedCities.value">
                                <div v-for="(item, index) in conditionList[1].value" :key="index">
                                    <s-checkbox :reveser="true" :disabled="false" :label="item.key" :key="item.key">{{item.val}}</s-checkbox>
                                </div>
                            </s-checkbox-group>
                        </div>
                        <div v-if="conditionList[1].selType === 'radio'">
                            <span class="ui-search-com_sel_tit">{{conditionList[1].label}}</span>
                            <div class="ui-search-all_btn" :class="conditionList[1].allSel">
                                <el-button size="mini" style="padding-left: 10px;padding-right: 10px" @click="selectAllScreen(conditionList[1].label, 1)">不限</el-button>
                            </div>
                            <s-radio-group v-model="radioValue[1]" style="text-align: initial; float: left">
                                <s-radio-button @click="handlerRadioClick(1)" :isScreen="true" v-for="(item, index) in conditionList[1].value" :key="index" :label="item.key">{{item.val}}</s-radio-button>
                            </s-radio-group>
                        </div>
                    </li>
                    <li>
                        <div v-if="conditionList[2].selType !== 'radio'">
                            <span class="ui-search-com_sel_tit">{{conditionList[2].label}}</span>
                            <div class="ui-search-all_btn" :class="conditionList[2].allSel">
                                <el-button size="mini" style="padding-left: 10px;padding-right: 10px" @click="selectAllScreen(conditionList[2].label)">不限</el-button>
                            </div>
                            <s-checkbox-group v-model="checkedCities.value">
                                <div v-for="(item, index) in conditionList[2].value" :key="index">
                                    <s-checkbox :reveser="true" :disabled="false" :label="item.key" :key="item.key">{{item.val}}</s-checkbox>
                                </div>
                            </s-checkbox-group>
                        </div>
                        <div v-if="conditionList[2].selType === 'radio'">
                            <span class="ui-search-com_sel_tit">{{conditionList[2].label}}</span>
                            <div class="ui-search-all_btn" :class="conditionList[2].allSel">
                                <el-button size="mini" style="padding-left: 10px;padding-right: 10px" @click="selectAllScreen(conditionList[2].label, 2)">不限</el-button>
                            </div>
                            <s-radio-group v-model="radioValue[2]" style="text-align: initial; float: left">
                                <s-radio-button @click="handlerRadioClick(2)" :isScreen="true" v-for="(item, index) in conditionList[2].value" :key="index" :label="item.key" >{{item.val}}</s-radio-button>
                            </s-radio-group>
                        </div>
                    </li>
                    <li>
                        <div v-if="conditionList[3].selType !== 'radio'">
                            <span class="ui-search-com_sel_tit">{{conditionList[3].label}}</span>
                            <div class="ui-search-all_btn" :class="conditionList[3].allSel">
                                <el-button size="mini" style="padding-left: 10px;padding-right: 10px" @click="selectAllScreen(conditionList[3].label)">不限</el-button>
                            </div>
                            <s-checkbox-group v-model="checkedCities.value">
                                <div v-for="(item, index) in conditionList[3].value" :key="index">
                                    <s-checkbox :reveser="true" :disabled="false" :label="item.key" :key="item.key" style="font-size: 14px;">{{item.val}}</s-checkbox>
                                </div>
                            </s-checkbox-group>
                        </div>
                        <div v-if="conditionList[3].selType === 'radio'">
                            <span class="ui-search-com_sel_tit">{{conditionList[3].label}}</span>
                            <div class="ui-search-all_btn" :class="conditionList[3].allSel">
                                <el-button size="mini" style="padding-left: 10px;padding-right: 10px" @click="selectAllScreen(conditionList[3].label, true)">不限</el-button>
                            </div>
                            <s-radio-group v-model="radioValue[3]" style="text-align: initial; float: left">
                                <s-radio-button @click="handlerRadioClick(3)" :isScreen="true" v-for="(item, index) in conditionList[3].value" :key="index" :label="item.key" >{{item.val}}</s-radio-button>
                            </s-radio-group>
                        </div>
                    </li>
                </ul>
                <ul class="ui-search-input clearFix" id="search_id2">
                    <li>
                        <span>SKU搜索模式</span>
                        <el-select v-model="addSearchSelect.sku_model.value" :placeholder="conditionList[0].label"
                                   style="width: 100%;">
                            <el-option
                                    v-for="item in conditionList[0].value"
                                    :key="item.key"
                                    :label="item.val"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span>子SKU</span>
                        <el-input v-model="addSearchSelect.sku_child.value" placeholder="sku"
                                  style="width: 100%;"></el-input>
                    </li>
                    <li>
                        <span>子SKU</span>
                        <el-input v-model="addSearchSelect.sku_child2.value" placeholder="sku"
                                  style="width: 100%;"></el-input>
                    </li>
                    <li>
                        <span>ITEM ID</span>
                        <el-input v-model="addSearchSelect.item_id.value" placeholder="sku"
                                  style="width: 100%;"></el-input>
                    </li>
                    <li>
                        <span>线上SKU</span>
                        <el-input v-model="addSearchSelect.on_sku.value" placeholder="sku"
                                  style="width: 100%;"></el-input>
                    </li>
                </ul>
            </div>
            <div class="ui-search-btn">
                <com-btn @click="headSearchCancel">取消</com-btn>
                <com-btn @click="headSearchConfirm">确定</com-btn>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'screen-stencil',
        props: {
            // 弹框显示
            showPopover: {
                type: Boolean,
                default: false
            },
            // 筛选条件列表
            conditionList: {
                type: Array,
                default () {
                    return [
                        {
                            name: '',
                            allSel: '',
                            value: []
                        },
                        {
                            name: '',
                            allSel: '',
                            value: []
                        },
                        {
                            name: '',
                            allSel: '',
                            value: []
                        },
                        {
                            name: '',
                            allSel: '',
                            value: []
                        }
                    ];
                }
            },
            // 已选的筛选条件
            addSearchData: {
                type: Array,
                default () {
                    return [];
                }
            },
            // 筛选搜索框
            addSearchSelect: {
                type: Object,
                default () {
                    return {
                        sku_model: {
                            name: 'SKU搜索模式',
                            value: '',
                            key: ''
                        },
                        sku_child: {
                            name: '子SKU',
                            value: '',
                            key: ''
                        },
                        sku_child2: {
                            name: '子SKU',
                            value: '',
                            key: ''
                        },
                        item_id: {
                            name: 'ITEM ID',
                            value: '',
                            key: ''
                        },
                        on_sku: {
                            name: '线上SKU',
                            value: '',
                            key: ''
                        }
                    };
                }
            },
            // 勾选列表
            checkedCities: {
                type: Object,
                default () {
                    return {
                        name: '',
                        value: []
                    };
                }
            },
            oldRadioArr: []
        },
        data () {
            return {
                showSearchList: false,
                radioValue: [],
                radioIndex: -1, // 修改 radio 的索引;
                radioOldVal: []
            };
        },
        computed: {
            // 作多选处理时忽略单选
            radioIndexArr () {
                // 保存单选列表索引值
                const listArr = this.conditionList;
                let arr = [];
                for (let i = 0; i < listArr.length; i++) {
                    if (listArr[i].selType === 'radio') {
                        arr.push(i);
                    }
                }
                return arr;
            }
        },
        watch: {
            // 监听勾选数组，动态选择不限按钮
            checkedCities: {
                handler (val) {
                    const [checkArr, listArr, radioInx] = [val, this.conditionList, this.radioIndexArr];
                    let hd = false;
                    this.addSearchData.splice(0);
                    for (let j = 0; j < listArr.length; j++) {
                        if (radioInx.indexOf(j) !== -1) continue;
                        for (let n = 0; n < listArr[j].value.length; n++) {
                            for (let i = 0; i < checkArr.value.length; i++) {
                                if (checkArr.value[i] === listArr[j].value[n].key) {
                                    hd = true;
                                    break;
                                }
                            }
                            if (hd) break;
                        }
                        listArr[j].allSel = hd ? '' : 'ui-head-select-all_btn';
                        hd = false;
                    }
                },
                deep: true
            },
            radioValue: {
                handler: function (val) {
                    this.$nextTick(() => {
                        const [arr, listArr, index] = [val, this.conditionList, this.radioIndex];
                        console.log(arr);
                        if (index === -1) return;
                        let hd = false;
                        this.addSearchData.splice(0);
                        for (let n = 0; n < listArr[index].value.length; n++) {
                            for (let i = 0; i < arr.length; i++) {
                                if (arr[i] === listArr[index].value[n].key) {
                                    hd = true;
                                    break;
                                }
                            }
                            if (hd) break;
                        }
                        listArr[index].allSel = hd ? '' : 'ui-head-select-all_btn';

                        const [checkArr, oldArr] = [this.checkedCities.value, this.radioOldVal];
                        let inx = checkArr.indexOf(oldArr[index]);
                        if (!arr[index]) {
                            if (inx !== -1) {
                                checkArr.splice(inx, 1);
                            }
                            return;
                        }
                        if (checkArr.length) {
                            if (inx === -1) {
                                checkArr.push(arr[index]);
                            } else {
                                checkArr.splice(inx, 1, arr[index]);
                            }
                        } else {
                            checkArr.push(arr[index]);
                        }
                        console.log(checkArr);
                    });
                },
                deep: true
            },
            // 监听弹框显示
            showPopover: function (val) {
                if (val) {
                    let el = document.querySelector('.ui-search-nav').querySelectorAll('li');
                    for (let x = 0; x < el.length; x++) {
                        el[x].className = el[x].className.replace(/active/g, '');
                    }
                    el[0].className = el[0].className + 'active';

                    // 单选按钮刷新选中状态
                    let [arr, listArr] = [this.radioValue, this.conditionList];
                    for (let i = 0; i < arr.length; i++) {
                        listArr[i].allSel = arr[i] ? '' : listArr[i].selType === 'radio' ? 'ui-head-select-all_btn' : '';
                    }
                }
            }
        },
        methods: {
            // 点击单选按钮
            handlerRadioClick (index) {
                this.radioIndex = index;
                this.radioOldVal = JSON.parse(JSON.stringify(this.radioValue));
            },
            // 筛选框确认
            headSearchConfirm () {
                console.log(this.checkedCities);
                this.offset = 0;
                this.$emit('headSearchConfirm', this.addSearchSelect);
            },
            // 筛选框去取消
            headSearchCancel () {
                this.$emit('headSearchCancel', this.addSearchSelect);
            },
            // 控制全选不限按钮
            /**
             * params isRadio ： 区分单选列表
             * */
            selectAllScreen (name, radioIndex) {
                if (radioIndex) {
                    this.radioIndex = radioIndex;
                    this.radioOldVal = JSON.parse(JSON.stringify(this.radioValue));
                    this.radioValue.splice(radioIndex, 1, null);
                    return;
                }
                const [arr, checkArr, listArr] = [[], this.checkedCities, this.conditionList];
                for (let i = 0; i < checkArr.value.length; i++) {
                    for (let j = 0; j < listArr.length; j++) {
                        for (let n = 0; n < listArr[j].value.length; n++) {
                            if (checkArr.value[i] === listArr[j].value[n].key) {
                                arr.push({
                                    name: listArr[j].label,
                                    value: listArr[j].value[n].val,
                                    key: listArr[j].value[n].key
                                });
                                break;
                            }
                        }
                    }
                }
                let i = 0;
                while (i < arr.length) {
                    if (arr[i].name === name) {
                        checkArr.value.splice(i, 1);
                        arr.splice(i, 1);
                    } else {
                        i++;
                    }
                }
            }
        },
        mounted () {
            this.$nextTick(() => {
                const [elNav, elList] = [document.querySelector('.ui-search-nav'), document.querySelector('.ui-search-select_list')];
                const elListChild = elNav.querySelectorAll('li');
                elListChild[0].className = elListChild[0].className + ' ' + 'active';
                elList.onscroll = function () {
                    let activeNum = Math.floor(this.scrollTop / 280);
                    let cName = elListChild[activeNum].className;
                    for (let x = 0; x < elListChild.length; x++) {
                        elListChild[x].className = cName.replace(/active/g, '');
                    }
                    elListChild[activeNum].className = cName + ' ' + 'active';
                };
            });
        }
    };
</script>
<style lang="less" scoped>
    @import (reference) '../assets/less/index.less';
    ul,li{
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .ui-search-condition {
        width: 1068px;
        height: 365px;
    }
    .ui-search-list {
        height: 365px;
        width: 110px;
        background-color: @base-deep-bg;
        float: left;
        ul {
            li {
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                color: @base-info2;
                a {
                    display: block;
                    padding-left: 15px;
                }
            }
            li.active {
                color: @base-font-shallow-white;
                background-color: @base-shallow-deep-bg;
            }
            li:hover {
                color: @base-font-shallow-white;
                background-color: @base-shallow-deep-bg;
            }
        }
    }
    .ui-search-select{
        width: 940px;
        height: 365px;
        float: right;
    }
    .ui-search-select {
        .ui-search-select_list{
            max-height: 280px;
            overflow: hidden;
            overflow-y: scroll;
        }
        .ui-search-com_sel {
            height: 280px;
            li {
                border-bottom: 1px solid #e4eaec;
                .ui-search-com_sel_tit {
                    color: @base-info2;
                    float: left;
                }
                .ui-search-com_sel_tit, .ui-search-all_btn{
                    width: 125px;
                    height: 40px;
                    /*display: inline-block;*/
                    line-height: 40px;
                    font-size: 14px;
                    float: left;
                }
                &::after {
                    content: '';
                    display: block;
                    clear: both;
                }
                > div::after{
                    content: '';
                    display: block;
                    clear: both;
                }
                > div {
                    &> div:last-of-type{
                        max-width: 612px;
                    }
                }
            }
            .ui-head-select-all_btn {
                button {
                    // color: #20a0ff;
                    // border-color: #20a0ff;
                    color: @base-white;
                    background-color: @base-shallow-blue-bg;
                    border-color: @base-shallow-blue-bg;
                }
            }
        }
        .ui-search-input {
            height: 280px;
            padding-top: 30px;
            padding-left: 10px;
            li {
                margin-bottom: 40px;
                margin-right: 25px;
                width: 270px;
                font-size: 14px;
                float: left;
                span {
                    display: block;
                    margin-bottom: 15px;
                }
            }
        }
        .ui-search-btn {
            position: absolute;
            right: 55px;
            bottom: 40px;
            button {
                padding-left: 30px;
                padding-right: 30px;
            }
            button:last-child{
                background-color: @base-main;
                color: @base-white;
            }
        }
    }
</style>