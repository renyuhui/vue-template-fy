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
    import {mapGetters} from 'vuex'
    export default {
        name: "LayoutCharts",
        mixins: [resize],
        components: {
            Navbar,
            FootMarquee,
            AppMain
        },
        computed:{
            ...mapGetters([
                'BIBG'
            ])
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
    .main-container{
        margin-left: 0px!important;
    }

</style>
