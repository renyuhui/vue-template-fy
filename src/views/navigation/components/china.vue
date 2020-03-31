<template>
    <div>
        <!--<div :class="className" :style="{height:height}" ref="child"></div>-->
        <charts-china :countryMapVos="countryMapVos" :scaleData="scaleData" />
        <div class="cont-right-list">
            <div class="bg-map" :style="{backgroundImage:bg.backgroundImage}">
                <div>
                    <div class="bg-map-title">
                        <span>{{province.provinceInfo.areaName}}</span>
                    </div>
                    <div class="bg-map-list" >
                        <div class="bg-map-list-count">
                            <div>数量</div>
                            <div>{{province.provinceInfo.areaNum}}</div>
                        </div>
                        <div class="bg-map-list-item" >
                            <div class="fy-hosptials" v-for="item in province.provinceList">
                                <div @click="jump" :data-value="item.value" :data-name="item.name" class="fy-line-clamp">{{item.value}}</div>
                            </div>
                        </div>
                    </div>
                    <div id="tooltipBarId"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import { mapGetters } from 'vuex'
    import {getMapOption , getProvinceData ,renderMap} from '@/utils/BI_chart'
    import mapData from "@/assets/map/china"
    import img_bi_bg from '@/assets/BI_charts/img_bi_bg.png'
    import resize from '../mixins/resize'
    import ChartsChina from '@/components/Charts/china'

    export default {
        name: 'china',
        mixins: [resize],
        components: {
            ChartsChina
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
                default: 'calc(100vh - 200px)'
            },
        },
        data() {
            return {
                bg:{
                    backgroundImage: 'url('+img_bi_bg+')'
                },
                hospitals: [
                    {
                        tenantCode: 'shangh',
                        name:"上海上海上海上海上海上海上海",
                        value:122
                    },{
                        tenantCode: 'shangh',
                        name:"江苏",
                        value:34
                    },{
                        tenantCode: 'shangh',
                        name:"浙江",
                        value:26
                    },{
                        tenantCode: 'shangh',
                        name:"广东",
                        value:5
                    },{
                        tenantCode: 'shangh',
                        name:"重庆",
                        value:2
                    },{
                        tenantCode: 'shangh',
                        name:"河南",
                        value:9
                    },{
                        tenantCode: 'shangh',
                        name:"湖北",
                        value:22
                    },{
                        tenantCode: 'shangh',
                        name:"安徽",
                        value:19
                    }
                ],
                scaleData: [
                    {
                        name: "民营医院",
                        value: "30"
                    }, {
                        name: "二级医院",
                        value: "30"
                    }, {
                        name: "三级医院",
                        value: "30"
                    }
                ],
                countryMapVos: [
                    {
                        "name": "浙江省",
                        "areaCode": "330000",
                        "hospitalList": [{"name": "nbjy", "value": "宁波市第九医院"}, {
                            "name": "blyy",
                            "value": "北仑人民医院"
                        }, {"name": "lsyy", "value": "宁波市镇海龙赛医院"}]
                    }, {
                        "name": "上海市",
                        "areaCode": "310000",
                        "hospitalList": [{"name": "hsxy", "value": "上海复旦大学附属华山西院"}, {
                            "name": "zlyy",
                            "value": "复旦大学附属肿瘤医院"
                        }, {"name": "jsgw", "value": "金山公共卫生中心医院"}, {"name": "first", "value": "上海市第一人民医院"}, {
                            "name": "hfz",
                            "value": "复旦大学附属妇产科医院(杨浦院区)"
                        }, {"name": "mhwy", "value": "复旦大学附属上海市第五人民医院"}, {"name": "lfyhy", "value": "临汾养护院"}, {
                            "name": "ly",
                            "value": "上海市第六人民医院"
                        }, {"name": "fytj", "value": "上海复医天健医疗服务产业股份有限公司"}, {
                            "name": "zzyy",
                            "value": "上海质子重离子医院 "
                        }, {"name": "hsby", "value": "复旦大学附属华山北院"}, {
                            "name": "ppyhy",
                            "value": "上海和养彭浦养护院"
                        }, {"name": "test1", "value": "天下医家"}]
                    }, {
                        "name": "江苏省",
                        "areaCode": "320000",
                        "hospitalList": [{"name": "ksyy", "value": "昆山第一人民医院"}, {
                            "name": "tzrmyy",
                            "value": "泰州市人民医院"
                        }, {"name": "mjyy", "value": "苏州明基医院"}, {"name": "lygey", "value": "连云港市第二人民医院"}]
                    }, {"name": "北京市", "areaCode": "110000", "hospitalList": []}, {
                        "name": "广东省",
                        "areaCode": "440000",
                        "hospitalList": []
                    }, {"name": "澳门", "areaCode": "820000", "hospitalList": []}, {
                        "name": "陕西省",
                        "areaCode": "610000",
                        "hospitalList": []
                    }, {"name": "四川省", "areaCode": "510000", "hospitalList": []}, {
                        "name": "辽宁省",
                        "areaCode": "210000",
                        "hospitalList": []
                    }, {"name": "安徽省", "areaCode": "340000", "hospitalList": []}, {
                        "name": "云南省",
                        "areaCode": "530000",
                        "hospitalList": []
                    }, {"name": "台湾省", "areaCode": "710000", "hospitalList": []}, {
                        "name": "吉林省",
                        "areaCode": "220000",
                        "hospitalList": []
                    }, {"name": "西藏", "areaCode": "540000", "hospitalList": []}, {
                        "name": "广西",
                        "areaCode": "450000",
                        "hospitalList": []
                    }, {"name": "宁夏", "areaCode": "640000", "hospitalList": []}, {
                        "name": "山西省",
                        "areaCode": "140000",
                        "hospitalList": []
                    }, {"name": "江西省", "areaCode": "360000", "hospitalList": []}, {
                        "name": "香港",
                        "areaCode": "810000",
                        "hospitalList": []
                    }, {"name": "内蒙古", "areaCode": "150000", "hospitalList": []}, {
                        "name": "河南省",
                        "areaCode": "410000",
                        "hospitalList": []
                    }, {"name": "甘肃省", "areaCode": "620000", "hospitalList": []}, {
                        "name": "重庆市",
                        "areaCode": "500000",
                        "hospitalList": [{"name": "ycetyy", "value": "重庆市永川区儿童医院"}, {
                            "name": "jlpzyy",
                            "value": "重庆市九龙坡区中医院"
                        }]
                    }, {"name": "青海省", "areaCode": "630000", "hospitalList": []}, {
                        "name": "山东省",
                        "areaCode": "370000",
                        "hospitalList": []
                    }, {
                        "name": "福建省",
                        "areaCode": "350000",
                        "hospitalList": [{"name": "xmetyy", "value": "复旦大学附属儿科医院厦门分院"}, {
                            "name": "fdzsxmyy",
                            "value": "复旦大学附属中山医院厦门医院"
                        }]
                    }, {"name": "贵州省", "areaCode": "520000", "hospitalList": []}, {
                        "name": "黑龙江省",
                        "areaCode": "230000",
                        "hospitalList": []
                    }, {"name": "新疆", "areaCode": "650000", "hospitalList": []}, {
                        "name": "河北省",
                        "areaCode": "130000",
                        "hospitalList": []
                    }, {"name": "海南省", "areaCode": "460000", "hospitalList": []}, {
                        "name": "湖南省",
                        "areaCode": "430000",
                        "hospitalList": []
                    }, {"name": "湖北省", "areaCode": "420000", "hospitalList": []}, {
                        "name": "天津市",
                        "areaCode": "120000",
                        "hospitalList": []
                    }, {"name": "中国", "areaCode": "0", "hospitalList": []}],
            }
        },
        computed:{
            ...mapGetters([
                'province'
            ])
        },
        mounted() {
console.log(this.province)
        },
        beforeDestroy() {

        },
        activated() {

        },
        deactivated() {

        },
        methods: {
            jump(e){
                let that = this;
                let area = {
                    areaName: e.target.dataset.value,
                    areaCode: e.target.dataset.name
                };
                this.$store.dispatch("date/changeArea",area)
                console.log(e)
                console.log(e.target.dataset.name,e.target.dataset.value)
                that.$router.push({path: '/navigation/hospital',params: { name: e.target.dataset.value,tenantcode: e.target.dataset.name}})       // 进入医院级
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "./china";
</style>
