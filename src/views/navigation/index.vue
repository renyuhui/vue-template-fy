<!--<template>-->
    <!--<div>-->
        <!--<div class="count-title"><count-title /></div>-->
        <!--<div class="count-row">-->
            <!--<div class="count-left">-->
                <!--<count-left />-->
            <!--</div>-->
            <!--<div class="count-right">-->
                <!--<china-map/>-->
            <!--</div>-->
        <!--</div>-->

    <!--</div>-->

<!--</template>-->

<script>

    import ChinaMap from './components/china'
    import CountTitle from './components/CountTitle'
    import CountLeft from './components/CountLeft'
    import { uuid ,isMobile , digitUppercase } from 'renyh-methods-module'

    const animationDuration = 6000

    export default {
        mixins: [],
        components: {
            ChinaMap,
            CountTitle,
            CountLeft
        },
        data() {
            return {}
        },
        mounted() {
            console.log(this.clientWidth,this.clientHeight,isMobile(),digitUppercase(123));
            // this.$store.dispatch('user/login_BI', {data: 123}).then((res) => {
            //     console.log(res)
            // }).catch((res) => {
            //     console.log(res)
            // })
        },
        beforeDestroy() {

        },
        methods: {

        },
        render(){
            return (
                <div>
                    <div class="count-title">
                        <count-title/>
                    </div>
                    <div class="count-row">
                        <div class="count-left">
                            <count-left/>
                        </div>
                        <div class="count-right">
                            <china-map/>
                        </div>
                    </div>

                </div>
            )
        }
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
