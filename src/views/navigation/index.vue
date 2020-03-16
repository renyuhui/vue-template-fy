<template>
    <div>
        <div class="count-title"><count-title /></div>
        <div class="count-row">
            <div class="count-left">
                <count-left />
            </div>
            <div class="count-right">
                <china-map/>
            </div>
        </div>

    </div>

</template>

<script>

    import resize from './mixins/resize'
    // import china from './mixins/china'

    import ChinaMap from './components/china'
    import CountTitle from './components/CountTitle'
    import CountLeft from './components/CountLeft'

    const animationDuration = 6000

    export default {
        // mixins: [resize],
        components: {
            ChinaMap,
            CountTitle,
            CountLeft
        },
        data() {
            return {}
        },
        mounted() {
            console.log(this.clientWidth,this.clientHeight)
        },
        beforeDestroy() {

        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
    .count-title {
        width: 100%;
        height: 100px;
    }
    .count-row{
        display: flex;
        justify-content: center;
    }
    .count-left{
        width: 20%;
    }
    .count-right{
        width: 80%;
    }

</style>
