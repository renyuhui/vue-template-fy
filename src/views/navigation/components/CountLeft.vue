<template>
    <div class="cont">
        <div class="cont-left fy-xs-1 ">
            <div class="col-xs-12">
                <div>
                    <div class="cont-title-bg" :style="{borderImage:bg.borderImageTitle}">
                        <h3>今日工单</h3>
                        <div id="cont-left-jrgd" class="cont-left-jrgd">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div>
                    <div class="cont-title-bg" :style="{borderImage:bg.borderImageTitle}">
                        <h3>服务品质</h3>
                        <div id="cont-left-pzgl" class="cont-left-pzgl"></div>
                        <div class="cont-left-pzgl-num">
                            <!--<div>满意度 ≤ 90分</div>-->
                            <!--<div><span style="color: red;font-weight: 600;font-size: 18px">5</span> 家</div>-->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div>
                    <div class="cont-title-bg" :style="{borderImage:bg.borderImageTitle}">
                        <h3>荣誉证书</h3>
                        <div class="row cont-title-bg-active"></div>
                        <div class="row cont-title-bg-list"></div>
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="cont-right fy-xs-4" style="height:100%;z-index: 1;padding: 0px 10px 35px 10px;position: relative;">-->
            <!--<div id="main" style="width: 100%;height:78vh;"></div>-->
            <!--<div class="cont-right-bg">123</div>-->
            <!--<div class="cont-right-list" style="width: 10vw;height: 28vh;position: absolute;bottom: 150px;right: 110px;z-index: 9999999;">去玩儿</div>-->
        <!--</div>-->
    </div>
    
</template>

<script>
    // import resize from './mixins/resize'
    import img_pzkz_1 from '@/assets/BI_charts/img_pzkz_1.png'
    export default {

        name: "CountLeft",
        // mixins: [resize],
        data() {
            return {
                bg: {
                    borderImageTitle: "url(" + img_pzkz_1 + ")20 round",
                },

            }
        },
        mounted() {

        },
        beforeDestroy() {

        },
        activated() {

        },
        deactivated() {

        },
        methods: {

        }
    }
</script>

<style scoped>

    .cont{
        overflow: hidden;
    }
    .cont-left {
        padding: 0px 0px 0px 0px;
    }
    .cont-left>div{
        padding: 0 0 10px 10px;
    }
    .cont-title-bg {
        width: 100%;
        height: 100%;
        border: 10px solid transparent;
        /*border-image: url(../../../images/img_pzkz_1.png)20 round;*/
    }
    h3 {
        width: 100%;
        color: #CCD3E2;
        text-align: center;
        margin-top: 10px;
    }
    .cont-left-jrgd {
        display: flex;
        justify-content: space-around;
        padding-top: 20px;
        height: 80px;
    }
    .cont-left-pzgl {
        height: calc(20vh - 20px);
    }
    .cont-left-pzgl-num {
        position: absolute;
        top: calc(29vh - 120px);
        width: 90%;
        text-align: center;
        display: flex;
        justify-content: space-around;
        margin-left: 5%;
    }
</style>