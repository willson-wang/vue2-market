<template>
    <div class="ui-statistics-detail">
        <div class="ui-statistics-detail-header"><span class="pointer" @click="backUpperLevel">&lt;&lt; 返回</span></div>
        <div class="ui-statistics-detail-main">
            <site-sales height="300px" class-name="ui-text-center" legend-direction="center" v-if="type === 'siteSales'" :is-scal-and-del="false"></site-sales>
            <personnel-comparison height="300px" legend-direction="center" v-if="type === 'personnelComparison'" :is-scal-and-del="false"></personnel-comparison>
            <personnel-platform height="300px" legend-direction="center" v-if="type === 'personnelPlatform'" :is-scal-and-del="false"></personnel-platform>
            <platform-personnel-comparison height="300px" v-if="type === 'platformPersonnelComparison'" :is-scal-and-del="false" legend-direction="center"></platform-personnel-comparison>
            <personnel-sales height="300px" v-if="type === 'personnelSales'"  legend-direction="center" :is-scal-and-del="false"></personnel-sales>
            <personnel-profit-and-loss height="300px" v-if="type === 'personnelProfitAndLoss'" legend-direction="center" :is-scal-and-del="false"></personnel-profit-and-loss>
        </div>
        <div class="ui-statistics-detail-data">
            <s-table :list="detailList" class-name="ui-table-bdr ui-table-fixed" :is-stripe="false" :max-height='tbodyMaxHeight' :is-resize="false"  :is-opration="false" :is-select="false" >
            </s-table>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import SiteSales from './components/site-sales';
    import PersonnelComparison from './components/personnel-comparison';
    import PersonnelPlatform from './components/personnel-platform';
    import PlatformPersonnelComparison from './components/platform-personnel-comparison';
    import PersonnelSales from './components/personnel-sales';
    import PersonnelProfitAndLoss from './components/personnel-profit-and-loss';
    import STable from 'components/table/s-table';
    import {getSessionStorage, setSessionStorage} from 'utils/storage';
    export default {
        name: 'statisticsDetail',
        components: {
            SiteSales,
            PersonnelComparison,
            PersonnelPlatform,
            PlatformPersonnelComparison,
            PersonnelSales,
            PersonnelProfitAndLoss,
            STable
        },
        data () {
            return {
                type: this.$route.params.currentView || getSessionStorage('currentStaticticsDetail') || '',
                detailList: [],
                tbodyMaxHeight: 500
            };
        },
        computed: {
            ...mapGetters([
                'siteSalesDetailChart'
            ])
        },
        methods: {
            ...mapActions([
                'GetSiteSalesDetailInfo'
            ]),
            backUpperLevel () {
                this.$router.go(-1);
            },
            getSiteSalesDetailList (queryParams) {
                this.GetSiteSalesDetailInfo(queryParams).then(response => {
                    console.log(response);
                    this.detailList = response;
                }).catch(error => {
                    console.log(error);
                });
            },
            pageSizeChange (size) {
                console.log('product' + size);
                this.getSiteSalesDetailList({
                    limit: size,
                    offset: 1
                });
            },
            currentPageChange ({currentPage, size}) {
                console.log('product' + size);
                this.getSiteSalesDetailList({
                    limit: size,
                    offset: currentPage
                });
            }
        },
        created () {
            if (this.siteSalesDetailChart.value) {
                this.detailList = this.siteSalesDetailChart;
            } else {
                this.getSiteSalesDetailList({
                    limit: 10000,
                    offset: 1
                });
            }
            if (!getSessionStorage('currentStaticticsDetail')) {
                setSessionStorage('currentStaticticsDetail', this.$route.params.currentView);
            }
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../assets/less/index.less';
    .ui-statistics-detail {
        width: 100%;

        .ui-statistics-detail-header {
            text-align: left;
            margin-bottom: 20px; 
            padding-left: 20px;
            color: @base-main;
        }

        .ui-statistics-detail-main {
            width: 100%;
            background-color: @base-white;
            padding: 0 20px;
        }

        .ui-statistics-detail-data {
            margin-top: 30px;
        }
    }
</style>

