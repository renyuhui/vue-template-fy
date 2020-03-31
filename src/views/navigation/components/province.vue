<template>
    <div>
        <charts-province  />
        <!--<div class="cont-right-list">
            <div class="bg-map" :style="{backgroundImage:bg.backgroundImage}">
                <div>
                    <div class="bg-map-title">
                        <span>name</span></div>
                    <div class="bg-map-list" >
                        <div class="bg-map-list-item" >
                            <div class="fy-hosptials" v-for="item in hospitals">
                                <div @click="jump" :data-tenantCode="item.tenantCode" :data-name="item.name" class="fy-line-clamp">{{item.name}}</div>
                            </div>
                        </div>
                    </div>
                    <div id="tooltipBarId"></div>
                </div>
            </div>
        </div>-->
    </div>
</template>

<script>
    import echarts from 'echarts'
    import {mapGetters} from 'vuex'
    import {getMapOption , getProvinceData ,renderMap} from '@/utils/BI_chart'
    import mapData from "@/assets/map/china"
    import img_bi_bg from '@/assets/BI_charts/img_bi_bg.png'
    import resize from '../mixins/resize'
    import ChartsProvince from '@/components/Charts/province'

    export default {
        name: 'province',
        mixins: [resize],
        components: {
            ChartsProvince
        },
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
                default: 'calc(75vh - 200px)'
            },
        },
        data() {
            return {
                bg:{
                    backgroundImage: 'url('+img_bi_bg+')'
                }
            }
        },
        computed:{
            ...mapGetters([
                'area'
            ])
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
            // jump(e){
            //     let that = this;
            //     console.log(e)
            //     console.log(e.target.dataset.tenantcode,e.target.dataset.name)
            //     that.$router.push({path: '/navigation/hospital',params: { name: e.target.dataset.name,tenantcode: e.target.dataset.tenantcode,detail: true}})       // 进入医院级
            // }
        }
    }

</script>

<style lang="scss" scoped>
    @import "./china";
</style>
