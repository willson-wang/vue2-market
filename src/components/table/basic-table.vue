<template>
    <div class="ui-table-wrap" :class="className">
        <div class="ui-table-header-wrap"  >
            <table class="ui-table-header-tab" :id="tableId" cellspacing="0"  cellpadding="0" border="0">
                <slot name='head' :lists="renderList" :tableId="tableId" :isSelect="isSelect" :oprationBtnList="oprationBtnList"></slot>
            </table>
        </div>
        <div class="ui-table-body-wrap">
            <table cellspacing="0" cellpadding="0" border="0" class="ui-table-body-tab ui-table-bdr ui-table-stripe">
                <colgroup>
                    <col :name="'table1-col' + index" v-for="(item, index) in renderList.key" :key="index"  v-if="renderList.key.length"/>
                    <col v-if="oprationBtnList.length" :name="'table1-col' + (renderList.key + 1)"/>
                </colgroup>
                <slot name='body' :lists="renderList" :oprationBtnList="oprationBtnList"></slot>
            </table>
        </div>
        <div class="ui-table-resize-proxy"></div>
    </div>
</template>

<script>
    import ResizeTable from '@/assets/js/resize-table';
    export default {
        name: 'basicTable',
        data () {
            return {};
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
            }
        },
        watch: {
            list: {
                handler: function (newVal) {
                    console.log(newVal);
                    if (!newVal.key.length) return;
                    /* eslint-disable */
                    this.$nextTick(function () {
                            new ResizeTable({
                            resizeMode: 'auto',
                            tableHeaderId: this.tableId
                        });
                    });
                    /* eslint-disable */
                },
                deep: true
            }
        },
        computed: {
            renderList () {
                return this.list || {};
            }
        },
        methods: {
            getCurrentOrderLine () {
                console.log('55555555555');
            }
        }
    };
</script>
