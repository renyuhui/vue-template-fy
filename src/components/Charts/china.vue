<template>
    <div>
        <div :class="className" :style="{height:height}" ref="child"></div>
    </div>

</template>

<script>
    import echarts from 'echarts'
    import {getMapOption , getProvinceData ,renderMap} from '@/utils/BI_chart'
    import mapData from "@/assets/map/china"

    export default {
        name: "china",
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
                len: [],
                d: [],
            }
        },
        mounted() {
            console.log(123,this)
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
        methods: {
            //初始化加载中国地图
            initChart() {
                console.log(getProvinceData())
                let that = this;
                //绘制全国地图
                that.chart = echarts.init(that.$refs.child, 'macarons');
                const data = mapData;
                let provinces = getProvinceData(); //34个省、市、自治区的名字拼音映射数组
                let scaleData = that.scaleData;
                let d = [], len = [];
                let countryMapVos = that.countryMapVos;
                for (let i = 0; i < data.features.length; i++) {
                    let code = data.features[i];
                    for (let j = 0; j < countryMapVos.length; j++) {
                        let item = countryMapVos[j];
                        if (code.id === item.areaCode) {
                            d.push({
                                name: code.properties.name,
                                value: item.hospitalList.length,
                                hospitalList: item.hospitalList,
                                areaCode: item.areaCode,
                                index: i,
                                id: item.areaCode,
                            })
                        }
                    }
                };

                // mapdata = d;
                d.forEach(function (item) {
                    if (item.hospitalList.length > 0) {
                        len.push(item)
                    }
                });
                d.sort(function (a,b) {
                    return b.hospitalList.length - a.hospitalList.length
                });
                // that.$store.dispatch('province/getProvinceInfo',);
                that.$store.dispatch('province/getProvinceList',d[0]);
                //注册地图
                echarts.registerMap('china', data);
                //初始化绘制全国地图配置
                let option = getMapOption();
                renderMap('china', d, scaleData, option, that);
                that.chart.setOption(option);

                let count = 0;
                let timeTicket = null;
                timeTicket && clearInterval(timeTicket);
                timeTicket = setInterval(function () {
                    if (len[count]) {
                        console.log(len,len[count].index)
                        that.chart.dispatchAction({
                            type: 'downplay',
                            seriesIndex: 0,
                        });
                        that.chart.dispatchAction({
                            type: 'highlight',
                            seriesIndex: 0,
                            dataIndex: len[count].index
                        });
                        that.chart.dispatchAction({
                            type: 'showTip',
                            seriesIndex: 0,
                            dataIndex: len[count].index
                        });
                        let provinceInfo = {
                            areaName: len[count].name,
                            areaCode: len[count].areaCode,
                            areaNum:len[count].hospitalList.length
                        };
                        let provinceList = len[count].hospitalList;
                        that.$store.dispatch('province/getProvinceInfo',provinceInfo);
                        that.$store.dispatch('province/getProvinceList',provinceList);
                        count++;
                    } else {
                        count = 0
                    }
                }, 3000);
                //地图点击事件
                that.chart.on('click', function (params) {
                    console.log(params.data);
                    const ProvinceData = getProvinceData();
                    const privinceMapData = require("@/assets/map/province/" + ProvinceData[params.data.name])
                    let area = {
                        areaName: params.data.name,
                        areaCode: params.data.areaCode,
                        privinceMapData: privinceMapData
                    };
                    let provinceInfo = {
                        areaName: params.data.name,
                        areaCode: params.data.areaCode,
                        areaNum:params.data.hospitalList.length
                    };
                    console.log(area);
                    that.$store.dispatch('date/changeArea',area)
                    that.$store.dispatch('province/getProvinceInfo',provinceInfo)
                    that.$router.push({path: '/navigation/province',params: {name: params.data.name,areaCode: params.data.areaCode}})
                });
                that.chart.on('mouseover', function (params) {
                    console.log(params)
                    let provinceInfo = {
                        areaName: params.data.name,
                        areaCode: params.data.areaCode,
                        areaNum:params.data.hospitalList.length
                    };
                    let provinceList = params.data.hospitalList;
                    that.$store.dispatch('province/getProvinceInfo',provinceInfo);
                    that.$store.dispatch('province/getProvinceList',provinceList);
                    clearInterval(timeTicket);
                });
                that.chart.on('mouseout', function (params) {
                    timeTicket && clearInterval(timeTicket);
                    timeTicket = setInterval(function () {
                        if(len[count]){

                            that.chart.dispatchAction({
                                type: 'downplay',
                                seriesIndex: 0,
                            });
                            that.chart.dispatchAction({
                                type: 'highlight',
                                seriesIndex: 0,
                                dataIndex: len[count].index
                            });
                            that.chart.dispatchAction({
                                type: 'showTip',
                                seriesIndex: 0,
                                dataIndex: len[count].index
                            });
                            count++;
                        }else{
                            count = 0
                        }
                    }, 3000);
                });

            }
        }
    }
</script>

<style scoped>

</style>