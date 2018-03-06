'use strict';
var ResizeTable = function (options) {
    var defaults = {
        resizeMode: 'fit',
        draggingClass: 'ui-table-drag-active',
        minWidth: '50',
        hoverCursor: 'col-resize',
        disabledColumns: [],
        onDragStart: null,
        onDraging: null,
        onDragEnd: null,
        tableHeaderId: 'my_table_header'
    };

    var opts = Object.assign({}, defaults, options);
    console.log(document.getElementById('order_table_list'));
    this.init(document.getElementById(opts.tableHeaderId), opts);
};

ResizeTable.prototype = {
    constructor: ResizeTable,
    init: function (table, options) {
        if (!table.getBoundingClientRect().width) {
            console.log('隐藏状态');
            table.parentNode.parentNode.className = 'ui-layout';
        }
        this.options = options;
        this.table = table;
        this.scrollbarWidth = this.utilGetScrollbarWidth();
        this.dragging = false;
        this.draggingColumn = null;
        this.resizeType = this.options.resizeMode;
        this.dragState = {};

        this.onDragStart = this.options.onDragStart;
        this.onDragEnd = this.options.onDragEnd;
        this.onDraging = this.options.onDraging;

        this.initializeElement();
        this.initialization();

        this.isScroll = this.utilHasScrolled(this.$tbodyTableWrap, 'vertical');
        this.initLayoutTable();
    },
    utilHasScrolled: function (element, direction) {
        if (direction === 'vertical') {
            return element.scrollHeight > element.clientHeight;
        } else if (direction === 'horizontal') {
            return element.scrollWidth > element.clientWidth;
        }
    },
    utilGetScrollbarWidth: function () {
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
    _extendArray: function () {
        /* eslint-disable */
        Array.prototype.myForEach = function myForEach(callback, context) {
            typeof context === 'undefined' ? context = window : null;

            if ('forEach' in Array.prototype) {
                this.forEach(callback, context);
                return;
            }

            for (var i = 0; i < this.length; i++) {
                typeof callback === 'function' ? callback.call(context, this[i], i, this) : null;
            }
        };
        /* eslint-disable */
    },
    _nodeListToArr: function(nodeList) {
        return [].slice.call(nodeList);
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
    _getAllColWidth: function() {
        var result = 0;
        for (var i = 0; i < this.$theadCol.length - 1; i++) {
            result += parseInt(this.$theadCol[i].getAttribute('width'));
        }
        return result + 2;
    },
    _calculationWidth: function(index, theadTableWitdh, allColWidth) {
        var lastColWidth;
        if (index !== this.$theadCol.length - 1) {
            if (theadTableWitdh - allColWidth > this.options.minWidth) {
                lastColWidth = theadTableWitdh - allColWidth;
            } else {
                lastColWidth = this.options.minWidth;
            }
            this.$theadCol[this.$theadCol.length - 1].width = lastColWidth + 'px';
            this.$tbodyCol[this.$theadCol.length - 1].width = lastColWidth + 'px';
        }
    },
    _calculationWidthOfFlex: function(index, theadTableWitdh, columnWidth) {
        var avgWidth = (theadTableWitdh - columnWidth) / (this.$theadCol.length - 1);
        var _this = this;
        this.$theadCol.myForEach(function(item, idx) {
            if (idx !== index) {
                item.width = avgWidth + 'px';
                _this.$tbodyCol[idx].width = avgWidth + 'px';
            }
        });
    },
    _calculationWidthOfAuto: function(index, theadTableWitdh, columnWidth) {
        // 获取index前面的col总宽度
        var berforeIndexColWidth = 0;
        var avgWidth;
        var _this = this;
        var surplus = this.$theadCol.length - 1 - index;

        this.$theadCol.myForEach(function(item, idx) {
            if (idx < index) {
                console.log(item.width);
                berforeIndexColWidth += parseInt(item.width);
            }
        });

        avgWidth = (theadTableWitdh - berforeIndexColWidth - columnWidth) / surplus;

        this.$theadCol.myForEach(function(item, idx) {
            if (idx > index) {
                if (idx === (_this.$theadCol.length - 1)) return;
                item.width = avgWidth + 'px';
                _this.$tbodyCol[idx].width = avgWidth + 'px';
            }
        });
    },
    _relayoutTable: function(column, columnWidth) {
        var theadTableWitdh;
        var allColWidth;
        var _this = this;
        var isScrollBarwidth = this.isScroll ? this.scrollbarWidth : 0;
        this.$theadCol.myForEach(function(item, index) {
            if (column.className === item.getAttribute('name')) {
                item.width = columnWidth + 'px';
                _this.$tbodyCol[index].width = columnWidth + 'px';

                allColWidth = _this._getAllColWidth();

                if (_this.resizeType === 'fit') { // 表格可以小于包裹层的宽度，且可以出现横向滚动条
                    theadTableWitdh = _this.$theadTable.getBoundingClientRect().width;
                    _this.$theadTable.style.width = allColWidth + columnWidth + 'px';
                    _this.$tbodyTable.style.width = allColWidth + columnWidth - isScrollBarwidth + 'px';

                    _this._calculationWidth(index, theadTableWitdh, allColWidth);
                } else if (_this.resizeType === 'overflow') { // 表格会出现横向滚动条
                    theadTableWitdh = parseInt(_this.$theadTable.style.width) - isScrollBarwidth; // 保持表格的宽度不变，使用style.width获取的就是静态的宽度，而使用getBoundingClientRect方法获取的就是动态的宽度
                    _this._calculationWidth(index, theadTableWitdh, allColWidth);
                } else if (_this.resizeType === 'flex') { // 表格不会出现横向滚动条，但是其余col会均分剩余的宽度
                    theadTableWitdh = parseInt(_this.$theadTable.style.width) - isScrollBarwidth;
                    _this._calculationWidthOfFlex(index, theadTableWitdh, columnWidth);
                } else if (_this.resizeType === 'auto') { // 表格不会出现横向滚动条，当前拖拽的th前的宽度不变，但是当前被拖拽的th后的col会均分剩余的宽度
                    theadTableWitdh = parseInt(_this.$theadTable.style.width) - isScrollBarwidth;
                    _this._calculationWidthOfAuto(index, theadTableWitdh, columnWidth);
                }
            }
        });
    },
    handleMouseOut: function() {
        document.body.style.cursor = '';
    },
    handleMouseMove: function(event) {
        var e = event || window.event;
        var reg = /disabled/g;
        var rect;
        var bodyStyle;

        var target = e.target;

        while (target && target.nodeName !== 'TH') {
            target = target.parentNode;
        }

        if (!this.dragging) {
            rect = target.getBoundingClientRect();
            bodyStyle = document.body.style;

            if (rect.width > 12 && rect.right - e.pageX < 8 && !reg.test(target.className)) {
                bodyStyle.cursor = this.options.hoverCursor; // 'col-resize'
                this.draggingColumn = target;
            } else if (!this.dragging) {
                bodyStyle.cursor = '';
                this.draggingColumn = null;
            }
        }
    },
    handleMouseDown: function(event) {
        var e = event || window.event;
        var tableLeft;
        var currentColumnEl;
        var columnRect;
        var minLeft;
        var _this = this;
        if (this.draggingColumn) {
            this.dragging = true;
            this.$proxy.style.display = 'block';

            tableLeft = this.$tableWrap.getBoundingClientRect().left;
            currentColumnEl = this.draggingColumn;
            columnRect = currentColumnEl.getBoundingClientRect();
            minLeft = columnRect.left - tableLeft + 30;

            this.dragState = {
                startMouseLeft: e.clientX,
                startLeft: columnRect.right - tableLeft,
                startColumnLeft: columnRect.left - tableLeft,
                tableLeft: tableLeft
            };

            this.$proxy.style.left = this.dragState.startLeft + 'px';

            document.onselectstart = function() { return false; };
            document.ondragstart = function() { return false; };

            this.onDragStart && this.onDragStart.apply(this.draggingColumn, [e, this.draggingColumn]);

            var handleMouseMove = function(event) {
                var e = event || window.event;
                var deltaLeft = e.clientX - _this.dragState.startMouseLeft;
                var proxyLeft = _this.dragState.startLeft + deltaLeft;

                _this.$proxy.style.left = Math.max(minLeft, proxyLeft) + 'px';

                _this.onDraging && _this.onDraging.apply(_this.draggingColumn, [e, _this.draggingColumn]);
            };

            var handleMouseUp = function() {
                if (_this.dragging) {
                    var startColumnLeft = _this.dragState.startColumnLeft;
                    // var startLeft = _this.dragState.startLeft;
                    var finalLeft = parseInt(_this.$proxy.style.left, 10);
                    var columnWidth = finalLeft - startColumnLeft;

                    // currentColumnEl.style.width = columnWidth + "px";

                    _this._relayoutTable(_this.draggingColumn, columnWidth);
                    _this.onDragEnd && _this.onDragEnd.apply(_this.draggingColumn, [e, _this.draggingColumn]);

                    document.body.style.cursor = '';
                    _this.dragging = false;
                    _this.draggingColumn = null;
                    _this.dragState = {};
                    _this.$proxy.style.display = 'none';
                }

                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);

                document.onselectstart = null;
                document.ondragstart = null;
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
    },
    _bindEvent: function() {
        var _this = this;
        this.$th.myForEach(function(item, index) {
            item.onmousedown = _this.handleMouseDown.bind(_this);
            item.onmousemove = _this.handleMouseMove.bind(_this);
            item.onmouseout = _this.handleMouseOut.bind(_this);
        });
        var fixedLeftWrap = null,
            fixedLeftBody = null,
            fixedRightWrap = null,
            fixedRightBody = null;
        this.$tbodyTableWrap.addEventListener('scroll', function() {
            _this.$theadTableWrap.scrollLeft = this.scrollLeft;
            fixedLeftWrap = document.getElementById('table_left_fixed_wrap');
            fixedRightWrap = document.getElementById('table_right_fixed_wrap');

            if (fixedLeftWrap) {
                fixedLeftBody = fixedLeftWrap.getElementsByClassName('ui-table-body-wrap')[0];
                fixedLeftBody.scrollTop = this.scrollTop;
            }

            if (fixedRightWrap) {
                fixedRightBody = fixedRightWrap.getElementsByClassName('ui-table-body-wrap')[0];
                fixedRightBody.scrollTop = this.scrollTop;
            }
        });
    },
    initLayoutTable: function() {
        var thRect;
        var _this = this;
        var tableWrapRect = this.$tableWrap.getBoundingClientRect();
        if (!this.$theadCol.length) return;

        if (this.isScroll) {
            this._createGutterEle(this.$theadTableWrap, this.scrollbarWidth);
            this.$theadTable.style.width = tableWrapRect.width - 1 + 'px';
            this.$tbodyTable.style.width = tableWrapRect.width - 1 - this.scrollbarWidth + 'px';
        } else {
            this.$theadTable.style.width = tableWrapRect.width - 1 + 'px';
            this.$tbodyTable.style.width = tableWrapRect.width - 1 + 'px';
        }

        // $th = document.querySelectorAll(".ui-table-header-wrap th");

        this.$th.myForEach(function(item, index) {
            thRect = item.getBoundingClientRect();
            if (index === (_this.$theadCol.length - 1)) return;
            _this.$theadCol[index].width = thRect.width + 'px';
            _this.$tbodyCol[index].width = thRect.width + 'px';
        });

        var classStr = this.table.parentNode.parentNode.getAttribute('class');
        classStr = classStr.replace('ui-layout', '');
        this.table.parentNode.parentNode.setAttribute('class', classStr);
    },
    initializeElement: function() {
        this.$tableWrap = this.table.parentNode.parentNode;
        this.$th = this._nodeListToArr(this.$tableWrap.querySelectorAll('.ui-table-header-wrap th'));
        this.$theadCol = this._nodeListToArr(this.$tableWrap.querySelectorAll('.ui-table-header-wrap col'));
        this.$tbodyCol = this._nodeListToArr(this.$tableWrap.querySelectorAll('.ui-table-body-wrap col'));
        this.$proxy = this.$tableWrap.querySelectorAll('.ui-table-resize-proxy')[0];
        this.$tbodyTableWrap = this.$tableWrap.querySelectorAll('.ui-table-body-wrap')[0];
        this.$theadTableWrap = this.$tableWrap.querySelectorAll('.ui-table-header-wrap')[0];
        this.$theadTable = this.$tableWrap.querySelectorAll('.ui-table-header-tab')[0];
        this.$tbodyTable = this.$tableWrap.querySelectorAll('.ui-table-body-tab')[0];


    },
    initialization: function() {
        this._extendArray();
        this._bindEvent();
    }
};

// var root = typeof self == 'object' && self.self === self && self ||
//     typeof global == 'object' && global.global === global && global ||
//     this || {};

// var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

// var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
// var moduleName = ResizeTable;
// if (typeof exports != 'undefined' && !exports.nodeType) {
//     if (typeof module != 'undefined' && !module.nodeType && module.exports) {
//         exports = module.exports = moduleName;
//     }
//     exports.moduleName = moduleName;
// } else if (typeof define == 'function' && define.amd) {
//     define(function() {
//         return moduleName;
//     });
// } else {
//     root.moduleName = moduleName;
// }

// if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
//     root.ResizeTable = ResizeTable;

//     define(function() {
//         return ResizeTable;
//     });
// } else if (freeModule) {

//     freeExports.ResizeTable = ResizeTable;
// } else {
//     root.ResizeTable = ResizeTable;
// }
export default ResizeTable;