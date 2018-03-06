<template>
    <div class='ui-app-wrap'>
        <top-nav-bar></top-nav-bar>
        <mutil-tages :pageTagsList='tagsList' @showCxtMenu="showContextMenuHandler" @hiddenContextMenu="hiddenContextMenuHandler"></mutil-tages>
        <div class='ui-main-wrap'>
            <app-main></app-main>
        </div>
        <side-bar></side-bar>
        <loading v-show='showLoading'></loading>
        <context-menu v-show="showContextMenu" :style="contextMenuStyle" v-click-out-side="hiddenContextMenuHandler"></context-menu>
    </div>
</template>

<script>
    import {AppMain, TopNavBar, MutilTages, SideBar, ContextMenu} from '@/views/layout';
    import Loading from '@/components/loading';
    import {mapGetters} from 'vuex';

    export default {
        name: 'layout',
        components: {
            AppMain,
            TopNavBar,
            MutilTages,
            Loading,
            SideBar,
            ContextMenu
        },
        data () {
            return {
                showContextMenu: false,
                contextMenuStyle: ''
            };
        },
        computed: {
            ...mapGetters([
                'showLoading',
                'showPageTagsList'
            ]),
            tagsList () {
                return this.showPageTagsList;
            }
        },
        mounted () {
            this.$store.commit('SET_TAG');
        },
        methods: {
            showContextMenuHandler (position) {
                this.showContextMenu = true;
                this.contextMenuStyle = {
                    top: position.top + 'px',
                    left: position.left + 'px'
                };
            },
            hiddenContextMenuHandler () {
                this.showContextMenu = false;
            }
        }
    };
</script>

<style lang="less" scoped>
    .ui-main-wrap {
        padding: 0 20px;
        margin-top: 20px;
    }
</style>

