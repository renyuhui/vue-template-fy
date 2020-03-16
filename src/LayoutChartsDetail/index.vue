<template>
    <div class="fy-bi-bg" v-bind:style="{ backgroundColor: BIBG }">
        <div class="main-header">
            <navbar></navbar>
        </div>
        <div class="main-container">
            <app-main/>
        </div>
        <div class="main-foot">
            <foot-marquee></foot-marquee>
        </div>
    </div>
</template>

<script>
    import {Navbar, AppMain, FootMarquee} from './components'
    import resize from './mixins/resize'

    export default {
        name: "LayoutChartsDetail",
        mixins: [resize],
        components: {
            Navbar,
            FootMarquee,
            AppMain
        },
        data() {
            return {
                BIBG: "#071347",
                menuList: ['驾驶舱', '品质控制', '安全生产', '复医天健智慧医院后勤运营平台', '保洁运送', '工程维修', '膳食餐饮'],
                date_value: '2020-02'
            }
        }

    }
</script>

<style scoped>
    .header-container h1 {
        width: 100%;
        height: 70px;
        font-size: 32px;
        line-height: 70px;
        text-align: center;
        color: #B5C2E6;
        /*margin-top: 0px;*/
        /*margin-bottom: 0px;*/
        margin: 0;
    }

</style>
