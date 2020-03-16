<template>
    <div class="cont-title" >
        <div  v-for="item in list">
            <div class="cont-title-bg" :style="{borderImage:bg.borderImageTitle}">
                <div class="cont-title-list">
                    <div>
                        <div>
                            <img src=""/>
                        </div>
                        <div>{{item.name}}</div>
                    </div>
                    <div><span class="fy-fwyh">{{item.value}}</span>{{item.unit}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import img_pzkz_1 from '@/assets/BI_charts/img_pzkz_1.png'

    export default {
        name: "CountTitle",
        data() {
            return {
                list: [
                    {name: "服务医院", icon: '', value: "100",unit: "家"},
                    {name: "服务面积", icon: '', value: "100",unit: "m²"},
                    {name: "资产总额", icon: '', value: "100",unit: "万元"},
                    {name: "服务医护", icon: '', value: "100",unit: "人"},
                    {name: "服务就诊", icon: '', value: "100",unit: "次"}
                ],
                bg: {
                    borderImageTitle: "url(" + img_pzkz_1 + ")20 round",
                }
            }
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {}
    }
</script>

<style scoped>
    .cont-title {
        width: 100%;
        /*height: 100px;*/
        padding: 0px 5px;
        display: flex;
        justify-content: space-between;
        color: #CCCCCC;
    }
    .cont-title>div {
        width: 20%;
        text-align: center;
        padding: 10px 5px 5px 5px;
    }
    .cont-title-bg {
        width: 100%;
        height: 100%;
        border: 10px solid transparent;
        /*border-image: url(require(img_pzkz_1))20 round;*/
    }

    .cont-title-list {
        display: flex;
        justify-content: space-between;
        padding: 10px 10px;
    }

    .cont-title-list > div:first-child {
        font-size: 20px;
        font-weight: 600;
        display: flex;
        justify-content: flex-start;
    }

    .cont-title-list > div:first-child > div:last-child {
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        font-size: 20px;
        font-weight: 500;
    }
</style>
