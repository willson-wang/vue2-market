<template>
    <div class="ui-table">
        <div class="ui-table-left-fixed-wrap" id="table_left_fixed_wrap" v-if="frezonLeftColumns.length"></div>
        <div class="ui-table-wrap" ref='tableWrap' :class="className">
            <div class="ui-table-header-wrap" ref="theadWrap">
                <table class="ui-table-header-tab" :id="tableId" cellspacing="0"  cellpadding="0" border="0">
                    <colgroup>
                        <col  :name="'table1-col' + colIndex" :width="col.width"  v-for="(col, colIndex) in columns"  :key="colIndex" />
                        <col  v-if="columns.length && isOpration" width="160" :name="'table1-col' + (columns.length + 1)"/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th :class="'table1-col' + colIndex" v-for="(col, colIndex) in columns" :key="colIndex">
                                <div class="ui-td-item">
                                    <s-checkbox :reveser="true" v-if="isSelect && colIndex === 0" v-model="selectAll" @change="selectAllHandler"></s-checkbox>
                                    <span> {{col.label}}</span>
                                    <slot :name="col.field"></slot>
                                </div>
                            </th>
                            <th class='table1-col12 disabled ui-table-bdr-right' v-if="columns.length && isOpration">
                                <div>操作</div>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="ui-table-body-wrap" ref="tbodyWrap" :style="{maxHeight: maxHeight + 'px'}">
                <table cellspacing="0" cellpadding="0" border="0" class="ui-table-body-tab" :class="{'ui-table-stripe': isStripe}">
                    <colgroup>
                        <col :name="'table1-col' + colIndex" v-for="(item, colIndex) in columns" :key="colIndex"  />
                        <col v-if="columns.length && isOpration" :name="'table1-col' + (columns.length + 1)"/>
                    </colgroup>
                    <tbody>
                            <tr v-for="(item, rowIndex) in tableData" :key="rowIndex" @click="getCurrentOrderRow(item, rowIndex)">
                                <td :class="col.className" v-for="(col, colIndex) in columns" :key="colIndex" @click="getCurrentOrderCell(item, col, rowIndex,  colIndex)">
                                    <div class="ui-td-item" >
                                        <s-checkbox v-model="selectList[rowIndex].checked" :reveser="true" v-if="isSelect && colIndex === 0" @change.stop="selectItemHandler"></s-checkbox>
                                        <span v-if="isSelect && colIndex === 0">{{item[col.field]}}</span>
                                        <span class="ellipsis block" v-else>
                                            <tool-tip v-if="col.tip" effect="light" placement="top-end" class-name="ui-tooltip ui-tooltip-top-light">
                                                <span slot="content" class="ui-tooltip-info">{{item[col.field]}}</span>
                                                <span>{{item[col.field]}}</span>
                                            </tool-tip >
                                            <span v-else>{{item[col.field]}}</span>
                                        </span>
                                    </div>
                                </td>
                                <td v-if="isOpration">
                                    <com-btn v-for="(item, index) in oprationBtnList" v-if="index < 2" :key="index" :type="item.type" :size="item.size" @click="getCurrentRowInfoByOpration(item.flag)">{{item.title}}</com-btn>
                                    <com-btn v-for="(item, index) in oprationBtnList" v-if="index === 2" :key="index" :type="item.type" :size="item.size">
                                        <pop-over ref="routerPopOver">
                                            <ul slot="content">
                                                <li v-for="item in tabelOptionsList" :key="item.flag" @click="getCurrentRowInfoByOpration(item.flag)" >{{item.title}}</li>
                                            </ul>
                                            <span slot="icon"><i class="el-icon-more"></i></span>
                                        </pop-over>
                                    </com-btn>
                                </td>
                            </tr>
                        </tbody>
                </table>
            </div>
            <div class="ui-nodata-show" v-if="!tableData.length">暂无数据</div>
            <div class="ui-table-resize-proxy"></div>
        </div>
        <div class="ui-table-right-fixed-wrap" id="table_right_fixed_wrap" v-if="frezonRightColumns.length"></div>
        <div class="ui-table-gutter" v-if="frezonRightColumns.length && scrollbarWidth" :style="{'width': scrollbarWidth + 'px', 'height': theadThHeight + 'px'}"></div>
    </div>
</template>

<script>
    import ResizeTable from '@/assets/js/resize-table';
    export default {
        name: 'basicTable',
        data () {
            return {
                // 单选反选数组，一定要先在data这里定义，这样selectItems改变的时候，才会同步到视图上去，如果定义在computed内只有依赖项改变时，数据才会改变，视图才会改变
                selectItems: [],
                scrollbarWidth: 0,
                theadThHeight: 0
            };
        },
        props: {
            tableId: {
                type: String,
                default: 'table_list'
            },
            isSelect: {
                type: Boolean,
                default: false
            },
            list: {
                default () {
                    return {};
                }
            },
            oprationBtnList: {
                type: Array,
                default () {
                    return [];
                }
            },
            className: {
                type: String,
                default: ''
            },
            maxHeight: {
                type: Number
            },
            isStripe: {
                type: Boolean,
                default: false
            },
            isResize: {
                type: Boolean,
                default: false
            },
            isOpration: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            list: {
                handler: function (newVal) {
                    if (!newVal.key.length) return;
                    // var _this = this;
                    this.selectAll = false;
                    /* eslint-disable */
                    // 数据变化的时候重新调用resize方法
                    this.$nextTick(function () {
                        if(!this.isResize) {
                            this.initTableWidth();
                            this.initFrezonTableLayout('table_left_fixed_wrap', 'frezonLeftColumns');
                            this.initFrezonTableLayout('table_right_fixed_wrap', 'frezonRightColumns');
                            this.unbindScrollEvent();
                            this.bindScrollEvent();
                            return;
                        };

                        new ResizeTable({
                            resizeMode: 'auto',
                            tableHeaderId: this.tableId
                        });

                        console.log( document.getElementById('table_left_fixed_wrap'));
                        
                    });
                    /* eslint-disable */
                },
                deep: true
            }
        },
        mounted () {
            // 组件渲染的时候重新调用resize方法，目的是重新进入含有改模块的组件时，数据取的vuex内的缓存数据，导致watch数据无变化，所以在这里调用一次
            var _this = this;
            console.log(_this);
            this.$nextTick(function () {
                if(!this.isResize) {
                    this.initTableWidth();
                    this.initFrezonTableLayout('table_left_fixed_wrap', 'frezonLeftColumns');
                    this.initFrezonTableLayout('table_right_fixed_wrap', 'frezonRightColumns');
                    this.unbindScrollEvent();
                    this.bindScrollEvent();
                };
                new ResizeTable({
                    resizeMode: 'auto',
                    tableHeaderId: this.tableId
                });
                // console.log( document.getElementById('table_left_fixed_wrap'));
                // document.getElementById('table_left_fixed_wrap').appendChild(this.$refs.tableWrap.innerHTML);
            });
        },
        computed: {
            tableData () {
                return this.list.value ?  this.list.value : [];
            },
            columns () {
                return this.list.key ? this.list.key : []
            },
            frezonLeftColumns () {
                return this.list.frezonLeftKey ? this.list.frezonLeftKey : []
            },
            frezonRightColumns () {
                return this.list.frezonRightKey ? this.list.frezonRightKey : []
            },
            tabelOptionsList () {
                return this.oprationBtnList.slice(2);
            },
            // 表格数据更新的时候重新获取单选反选数组
            selectList: function () {
                const arr = [];
                this.list.value && this.list.value.map(function (item, index) {
                    arr.push({
                        orderId: item.orderId,
                        checked: false
                    });
                });
                this.selectItems = arr;
                return arr;
            },
            // 全选计算属性，计算属性可以自定义getter与setter，getter是取值，setter是设置值
            selectAll: {
                get: function () {
                    // 当当前选中的数量与单选单选数组长度相等时，表示全选
                    return this.selectCount == this.selectItems.length;
                },
                set: function (value) {
                    // 点击selectAll时的值来动态设置单选反选item的checked属性值，这里value传入的就是表单控件的checked值
                    this.selectItems.length && this.selectItems.forEach(function (item) {
                        item.checked = value;
                    });
                    return value;
                }
            },
            // 获取当前选中的数量
            selectCount: {
                get: function() {
                    var i = 0;
                    this.selectItems.forEach(function(item) {
                        if (item.checked) {
                            i++;
                        }
                    });
                    return i;
                }
            },
            // 获取当前被选中的数组
            checkedGroups: {
                get: function() {
                    var checkedGroups = [];
                    this.selectItems.forEach(function(item) {
                        if (item.checked) {
                            checkedGroups.push(item);
                        }
                    });
                    return checkedGroups;
                }
            }
        },
        methods: {
            utilHasScrolled (element, direction) {
                if (direction === 'vertical') {
                    return element.scrollHeight > element.clientHeight;
                } else if (direction === 'horizontal') {
                    return element.scrollWidth > element.clientWidth;
                }
            },
            utilGetScrollbarWidth () {
                var div = document.createElement('div');
                var styles = {
                    width: '100px',
                    height: '100px',
                    overflowY: 'scroll'
                };
                var scrollBarWidth;

                for (var prop in styles) {
                    div.style[prop] = styles[prop];
                }

                document.body.appendChild(div);
                scrollBarWidth = div.offsetWidth - div.clientWidth;
                // div.remove(); ie浏览器不支持
                document.body.removeChild(div);
                console.log(scrollBarWidth);
                return scrollBarWidth;
            },
            _createGutterEle: function(ele, scrollbarWidth) {
                var $gutter = ele.querySelector('#gutter');
                if ($gutter) return;
                var $colGroup = ele.querySelectorAll('colgroup')[0];
                var $tr = ele.querySelectorAll('thead tr')[0];
                var $col = document.createElement('col');
                var $th = document.createElement('th');
                $th.id = 'gutter';
                $col.width = scrollbarWidth + 'px';
                $tr.appendChild($th);
                $colGroup.appendChild($col);
            },
            initTableWidth () {
                var thRect;
                var th;
                var _this = this;
                var theadCol;
                var tbodyCol;
                var tableWrapRect = this.$refs.tableWrap.getBoundingClientRect();
                var isScrollBar = this.utilHasScrolled(this.$refs.tbodyWrap, 'vertical');
                if (isScrollBar) {
                    this.scrollbarWidth = this.utilGetScrollbarWidth();
                    this._createGutterEle(this.$refs.theadWrap, this.scrollbarWidth);
                    this.$refs.theadWrap.getElementsByTagName('table')[0].style.width = tableWrapRect.width - 1 + 'px';
                    this.$refs.tbodyWrap.getElementsByTagName('table')[0].style.width = tableWrapRect.width - 1 - this.scrollbarWidth + 'px';
                } else {
                    this.$refs.theadWrap.getElementsByTagName('table')[0].style.width = tableWrapRect.width - 1 + 'px';
                    this.$refs.tbodyWrap.getElementsByTagName('table')[0].style.width = tableWrapRect.width - 1 + 'px';
                }

                th = this.$refs.theadWrap.getElementsByTagName('th');
                theadCol = this.$refs.theadWrap.getElementsByTagName('col');
                tbodyCol = this.$refs.tbodyWrap.getElementsByTagName('col');
                Array.from(th).forEach(function(item, index) {
                    thRect = item.getBoundingClientRect();
                    if (index === (th.length - 1)) return;
                    theadCol[index].width = thRect.width + 'px';
                    tbodyCol[index].width = thRect.width + 'px';
                });

            },
            initFrezonTableLayout (id, type) {
                if (!this[type].length) return;
                const _this = this;
                const $table_fixed_wrap = document.getElementById(id);
                const $theadCol = this.$refs.theadWrap.getElementsByTagName('col');
                const $fixedThead = $table_fixed_wrap.getElementsByClassName('ui-table-header-wrap');
                let $theadColArr = Array.from($theadCol);
                let frezonWidth = 0;
                if (id === 'table_right_fixed_wrap') { 
                    $theadColArr = $theadColArr.reverse().slice(1);
                }

                $theadColArr.forEach(function (item, index) {
                    if (index < _this[type].length) {
                        console.log(parseFloat(item.width));
                        frezonWidth += parseFloat(item.width);
                    }
                });

                $table_fixed_wrap.innerHTML = this.$refs.tableWrap.innerHTML;
                $table_fixed_wrap.style.width = frezonWidth + 'px';
                $table_fixed_wrap.style.height = this.$refs.tableWrap.getBoundingClientRect().height - this.scrollbarWidth + 'px';

                if (id === 'table_right_fixed_wrap') {
                    $table_fixed_wrap.style.right = this.scrollbarWidth + 'px';
                    const $fixedTheadCol = $fixedThead[0].getElementsByTagName('col');
                    $fixedTheadCol[$fixedTheadCol.length - 1].width = 0;
                    this.theadThHeight = $fixedThead[0].getElementsByTagName('th')[0].getBoundingClientRect().height;
                }
                const $table_fixed_body_wrap = $table_fixed_wrap.getElementsByClassName('ui-table-body-wrap')[0];
                $table_fixed_body_wrap.style.maxHeight = $table_fixed_body_wrap.getBoundingClientRect().height - this.scrollbarWidth + 'px';
            },
            unbindScrollEvent () {
                console.log(this.$refs);
                this.$refs.tbodyWrap.removeEventListener('scroll', function () {});
            },
            bindScrollEvent () {
                if (!this.frezonLeftColumns.length && !this.frezonRightColumns.length) return;
                const _this = this;
                var fixedLeftWrap = null,
                    fixedLeftBody = null,
                    fixedRightWrap = null,
                    fixedRightBody = null;
                this.$refs.tbodyWrap.addEventListener('scroll', function() {
                    _this.$refs.theadWrap.scrollLeft = this.scrollLeft;
                    fixedLeftWrap = document.getElementById('table_left_fixed_wrap');
                    fixedRightWrap = document.getElementById('table_right_fixed_wrap');

                    if (fixedLeftWrap) {
                        fixedLeftBody = fixedLeftWrap.getElementsByClassName('ui-table-body-wrap')[0];
                        fixedLeftBody && (fixedLeftBody.scrollTop = this.scrollTop);
                    }

                    if (fixedRightWrap) {
                        fixedRightBody = fixedRightWrap.getElementsByClassName('ui-table-body-wrap')[0];
                        fixedRightBody && (fixedRightBody.scrollTop = this.scrollTop);
                    }
                });
            },
            // 点击获取当前行信息
            getCurrentOrderRow (row, rowIndex) {
                console.log(row);
            }, 
            // 点击获取当前单元格信息
            getCurrentOrderCell (item, col, rowIndex,  colIndex) {
                console.log(col);
                console.log(this.checkedGroups);
            },
            // 单选回调
            selectItemHandler (rowIndex) {
                this.$nextTick(function () {
                    this.$emit('selectItemEmit', this.checkedGroups);
                });
                return false;
            },
            // 全选回调
            selectAllHandler () {
                this.$nextTick(function () {
                    this.$emit('selectAllEmit', this.checkedGroups);
                });
            },
            selectStop () {
                return false;
            },
            getCurrentRowInfoByOpration () {

            }
        },
        beforeDestroy () {
            this.unbindScrollEvent();
            console.log(this);
        },
        destroyed () {
            console.log(this);
        }
    };
</script>