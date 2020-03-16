<template>
    <!--<div :class="className" :style="{height:height}"/>-->
    <div>
        <div :class="className" :style="{height:height}" ref="child"></div>
        <div class="cont-right-list">
            <div class="bg-map" :style="{backgroundImage:bg.backgroundImage}">
                <div>
                    <div class="bg-map-title">
                        <span>name</span></div>
                    <div class="bg-map-list" >
                        <div class="bg-map-list-count">
                            <div>数量</div>
                            <div>value</div>
                        </div>
                        <div class="bg-map-list-item" >
                            <div class="fy-hosptials" v-for="item in hospitals">
                                <div @click="jump" :data-tenantCode="item.tenantCode" :data-name="item.name" class="fy-line-clamp">{{item.name}}</div>
                                <!--<div>{{item.value}}</div>-->
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
    import {getMapOption , getProvinceData} from '@/utils/BI_chart'
    // require('echarts/theme/macarons') // echarts theme
    import mapData from "@/assets/map/china"
    import img_bi_bg from '@/assets/BI_charts/img_bi_bg.png'
    import resize from '../mixins/resize'

    export default {
        name: 'china',
        mixins: [resize],
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
            }
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

                chart: null,
                //直辖市和特别行政区-只有二级地图，没有三级地图
                special: ["北京", "天津", "上海", "重庆", "香港", "澳门"],
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
                mapdata: [],
                len: [],
                d: [],
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initChart()
            })
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
                this.chart = echarts.init(this.$refs.child, 'macarons');
                const data = mapData;
                let provinces = getProvinceData(); //34个省、市、自治区的名字拼音映射数组
                let scaleData = [
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
                ];
                let d = [], len = [];
                let countryMapVos = this.countryMapVos;
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
                }
                ;

                // mapdata = d;
                d.forEach(function (item) {
                    if (item.hospitalList.length > 0) {
                        len.push(item)
                    }
                })
                // //注册地图
                echarts.registerMap('china', data);

                //
                //初始化绘制全国地图配置
                let option = getMapOption();

                this.renderMap('china', d, scaleData, option);
                this.chart.setOption(option);

                let count = 0;
                let timeTicket = null;
                timeTicket && clearInterval(timeTicket);
                timeTicket = setInterval(function () {
                    if (len[count]) {

                        count++;
                    } else {
                        count = 0
                    }
                }, 3000);
                //地图点击事件
                this.chart.on('click', function (params) {
                    console.log(params);
                    that.$router.push({path: '/navigation/province'})       // 进入省市级
                    // if (params.name in provinces) {

                    // }
                });
                this.chart.on('dblclick', function (params) {
                    console.log(params);
                    console.log('dblclick');
                    that.hospitals = [
                        {
                            tenantCode: 'shangh',
                            name:"江苏",
                            value:10
                        },{
                            tenantCode: 'shangh',
                            name:"浙江",
                            value:20
                        }
                    ]
                    // hospitalList(params)
                });

            },
            //根据数据绘制地图
            renderMap(map, data, scaleData, option) {
                let rich = {
                    white: {
                        color: '#ddd',
                        align: 'center',
                        padding: [3, 0]
                    }
                };
                let placeHolderStyle = {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        color: 'rgba(0, 0, 0, 0)',
                        borderColor: 'rgba(0, 0, 0, 0)',
                        borderWidth: 0
                    }
                };
                let newData = [];
                let color = ['#00ffff', '#00cfff', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000'];
                for (let i = 0; i < scaleData.length; i++) {
                    newData.push({
                        value: scaleData[i].value,
                        name: scaleData[i].name,
                        itemStyle: {
                            normal: {
                                color: color[i],
                                borderWidth: 0,
                                // shadowBlur: 200,
                                borderColor: "#ccc",
                                // shadowColor: color[i]
                            }
                        }
                    }, {
                        value: 2,
                        name: '',
                        itemStyle: placeHolderStyle
                    });
                }


                // console.log(data,scaleData);
                option.title.subtext = map;
                option.series = [
                    {
                        name: map,
                        type: 'map',
                        mapType: map,
                        top: '5%',
                        // bottom: '25%',
                        // left: 10,
                        roam: false,
                        nameMap: {
                            'china': '中国'
                        },
                        label: {
                            normal: {
                                show: false,
                                formatter: function (params) {
                                    // console.log(params)
                                    // return ' ';
                                },
                                textStyle: {
                                    color: '#999',
                                    fontSize: 13
                                },
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 13
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 1,
                                areaColor: '#080d37',
                                borderColor: '#757cb0',
                                label: {
                                    show: true,
                                    position: 'outside',
                                    color: '#ddd',
                                    textStyle: {
                                        color: '#ccd2e3',
                                        fontSize: '12',
                                    },
                                    formatter: function (params) {
                                        // console.log(params)
                                        // return "ditu"
                                    }
                                },
                                // labelLine: {
                                //     smooth: 0.2,
                                //     length: 40,
                                //     length2: 40
                                // },
                            },
                            emphasis: {
                                areaColor: 'darkorange' //选中后的颜色
                            }
                        },
                        markLine: {
                            slient: true,
                            lineStyle: {
                                normal: {
                                    color: '#C23531',
                                    type: 'dashed'
                                }
                            },
                            //  data: [
                            //      {type: 'average', name: '平均值'}
                            // ,{ xAxis: 10 }
                            //  ]
                        },
                        data: data
                    },
                    {
                        name: '',
                        type: 'pie',
                        zlevel: 1,
                        clockWise: false,
                        radius: [25, 50],
                        center: ["15%", "80%"],
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'outside',
                                    color: '#ddd',
                                    textStyle: {
                                        color: '#ccc',
                                        fontSize: '12',
                                    },
                                    formatter: function (params) {
                                        // console.log(params);
                                        return params.name + '\n(' + params.value + '%)';
                                    },
                                    rich: rich
                                },
                                labelLine: {
                                    length: 30,
                                    length2: 30,
                                    show: true,
                                    color: '#00ffff'
                                }
                            }
                        },
                        data: newData
                    },
                    {
                        type: 'pie',
                        zlevel: 2,
                        // silent: true,
                        radius: [50, 60],
                        center: ["15%", "80%"],
                        hoverAnimation: false,
                        // animation:false,    //charts3 no
                        itemStyle: {
                            normal: {
                                color: 'rgba(20,30,103,0.6)',
                            }
                        },
                        label: {
                            normal: {
                                show: false
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [1]
                    }
                ];
                //渲染地图
                this.chart.setOption(option);
                console.log(data)
            },
            jump(e){
                let that = this;
                console.log(e)
                console.log(e.target.dataset.tenantcode,e.target.dataset.name)
                that.$router.push({path: '/hospital/index',params: { name: e.target.dataset.name,tenantcode: e.target.dataset.tenantcode}})       // 进入医院级
            }
        }
    }

</script>

<style lang="scss" scoped>
    .fy-hosptial-list {
        width: 10vw;
        height: 28vh;
        position: absolute;
        bottom: 150px;
        right: 110px;
        z-index: 9999999;

    }
    .cont-right-list{
        width: 10vw;
        height: 28vh;
        position: absolute;
        bottom: 150px;
        right: 110px;
        z-index: 9999999;
    }
    .bg-map{
        height:300px;
        width:200px;
        background-color: transparent;
        color:#CCCCCC;
        background-size: 100% 100%;
        border: 0;
        padding: 0 10px;
    }
    .bg-map-title{
        height:50px;
        width:100%;
        border-bottom:0px solid #F0F0F0;
        text-align: center
    }
    .bg-map-title>span{
        line-height:50px;
        font-size: 18px;
    }
    .bg-map-list{
        height:110px;
        width:100%;
        cursor: pointer
    }
    .bg-map-list-count{
        padding-left:18px;
        padding-top:22px;
        display: flex;
        justify-content: space-between;
    }
    .fy-hosptials{
        display: flex;
        justify-content: space-between;
        padding: 4px;
    }
    .bg-map-list-item{
        height:180px;
        width:97%;
        cursor: pointer;
        margin-top: 10px;
        overflow: auto;
    }
    #tooltipBarId{
        height:200px;
        width:100%;
        border-radius:0 0 5px 0;
    }
    .fy-line-clamp{
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:1;/*文字超过1行显示...*/
        overflow:hidden;
    }

    ::-webkit-scrollbar {
        width: 0px;
        height: 6px;
    }
    ::-webkit-scrollbar-track{
        /*width: 4px;*/
        /*height: 6px;*/
    }
    ::-webkit-scrollbar-thumb {
        background-color: #c2c2c2;
        background-clip: padding-box;
        min-height: 28px;
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #AAA;
    }
    ::-webkit-scrollbar-track-piece {
        background-color: #fff;
    }
</style>
