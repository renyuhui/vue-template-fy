<template>
    <!--<div :class="className" :style="{height:height,width:width}"/>-->
    <div>
        <province-map />
    </div>
</template>

<script>
    import echarts from 'echarts'
    import ProvinceMap from './components/province'

    require('echarts/theme/macarons') // echarts theme
    // import resize from './mixins/resize'

    const animationDuration = 6000

    export default {
        // mixins: [resize],
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '300px'
            }
        },
        components:{
            ProvinceMap
        },
        data() {
            return {
                chart: null
            }
        },
        // computed(){
        //
        // },
        beforeCreate(){

        },
        created(){

        },
        beforeMount(){
            this.$store.dispatch('settings/changeDetailBg', true)
        },
        mounted() {
            this.$nextTick(() => {
                // this.initChart()
            });
        },
        beforeUpdate(){

        },
        updated(){

        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        destroyed(){
            this.$store.dispatch('settings/changeDetailBg', false)
        },
        methods: {
            add(){
                console.log('qwer')
                // this.$store.dispatch('settings/changeDetailBg', true);
            },
            initChart() {
                this.chart = echarts.init(this.$el, 'macarons')

                this.chart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        top: 10,
                        left: '2%',
                        right: '2%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        axisTick: {
                            show: false
                        }
                    }],
                    series: [{
                        name: 'pageA',
                        type: 'bar',
                        stack: 'vistors',
                        barWidth: '60%',
                        data: [79, 52, 200, 334, 390, 330, 220],
                        animationDuration
                    }, {
                        name: 'pageB',
                        type: 'bar',
                        stack: 'vistors',
                        barWidth: '60%',
                        data: [80, 52, 200, 334, 390, 330, 220],
                        animationDuration
                    }, {
                        name: 'pageC',
                        type: 'bar',
                        stack: 'vistors',
                        barWidth: '60%',
                        data: [30, 52, 200, 334, 390, 330, 220],
                        animationDuration
                    }]
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .dashboard {
        &-container {
            margin: 30px;
        }
        &-text {
            font-size: 30px;
            line-height: 46px;
        }
    }
</style>
