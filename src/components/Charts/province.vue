<template>
    <div>
        <div :class="className" :style="{height:height}" ref="child"></div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import echarts from 'echarts'
    import {getProvinceOption , getProvinceData ,renderProvince} from '@/utils/BI_chart'

    export default {
        name: "province",
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
            countryMapVos:null,
            scaleData: null
        },
        data(){
            return {
                chart: null,
                mapdata: [],
                specicalZoom: [
                    {name: "上海", zoom: 1.15},
                    {name: "甘肃", zoom: 0.7},
                    {name: "黑龙江", zoom: 0.7},
                    {name: "广东", zoom: 0.7},
                    {name: "河南", zoom: 0.8},
                    {name: "辽宁", zoom: 0.7},
                    {name: "福建", zoom: 0.8},
                ],
                len: [],
                provinceList:[
                    {name: "崇明县",hospitalList: []},
                    {name: "金山区",hospitalList: []},
                    {name: "普陀区",hospitalList: []},
                    {name: "卢湾区",hospitalList: []},
                    {name: "闸北区",hospitalList: []},
                    {name: "奉贤区",hospitalList: []},
                    {name: "杨浦区",hospitalList: [{name: "hfz", value: "复旦大学附属妇产科医院(杨浦院区)"}]},
                    {name: "黄浦区",hospitalList: []},
                    {name: "松江区",hospitalList: []},
                    {name: "宝山区",hospitalList: [{name: "hsby", value: "复旦大学附属华山北院"}]},
                    {name: "嘉定区",hospitalList: [{name: "test1", value: "天下医家"}]},
                    {name: "闵行区",hospitalList: [{name: "hsxy", value: "上海复旦大学附属华山西院"},{name: "mhwy", value: "复旦大学附属上海市第五人民医院"}]},
                    {name: "虹口区",hospitalList: [{name: "first", value: "上海市第一人民医院"}]},
                    {name: "徐汇区",hospitalList: [{name: "fytj", value: "上海复医天健医疗服务产业股份有限公司"}]},
                    {name: "青浦区",hospitalList: []},
                    {name: "浦东新区",hospitalList: [{name: "ly", value: "上海市第六人民医院"},{name: "zzyy", value: "上海质子重离子医院 "}]},
                    {name: "静安区",hospitalList: [{name: "ppyhy", value: "上海和养彭浦养护院"}]},
                ]
            }
        },
        computed:{
            ...mapGetters([
                'area'
            ])
        },
        created(){

        },
        beforeMount(){
            let that = this;
            let area = this.$store.getters.area;
            const privinceMapData = area.privinceMapData;
            that.mapdata = privinceMapData;
        },
        mounted() {
            this.$nextTick(() => {
                this.initChart()
            });
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        activated() {

        },
        deactivated() {

        },
        methods:{
            //初始化加载省市地图
            initChart() {
                let that = this;
                console.log(that.area)
                let provinceList = that.provinceList;
                let d = [], len = [];
                //绘制地图
                that.chart = echarts.init(that.$refs.child, 'macarons');
                const data = that.area.privinceMapData;

                // //注册地图
                echarts.registerMap(that.area.areaName, data);

                for (var i = 0; i < data.features.length; i++) {
                    provinceList.forEach(function (item) {
                        if (data.features[i].properties.name == item.name) {
                            d.push({
                                name: data.features[i].properties.name,
                                value: item.hospitalList.length,
                                hospitalList: item.hospitalList,
                                index: i,
                                itemStyle: {
                                    areaColor: ""
                                }
                            })
                        }
                    })
                };

                d.forEach(function (item) {
                    if (item.hospitalList.length > 0) {
                        len.push(item)
                    }
                });
                let arr = [];
                provinceList.forEach(function (item) {
                    arr.push({name: item.name, hospitalList: item.hospitalList, len: item.hospitalList.length});
                });
                arr.sort(function (a, b) {
                    return b.len - a.len
                });
                console.log(arr, arr[0]);
                //
                //绘制地图配置
                let option = getProvinceOption();
                renderProvince(that.area.areaName, d, option, that.specicalZoom, that);
                that.chart.setOption(option);

                //地图点击事件
                that.chart.on('click', function (params) {
                    console.log(params);
                });
            }

        }
    }
</script>

<style scoped>

</style>