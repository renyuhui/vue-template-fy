import echarts from 'echarts'
import {getMapOption , getProvinceData} from '@/utils/BI_chart'
// require('echarts/theme/macarons') // echarts theme
import mapData from "@/assets/map/china"
import img_bi_bg from '@/assets/BI_charts/img_bi_bg.png'

export default {
  data() {
    return {
      chart: null,
      provinces: {
        //23个省
        "台湾": "taiwan",
        "河北": "hebei",
        "山西": "shanxi",
        "辽宁": "liaoning",
        "吉林": "jilin",
        "黑龙江": "heilongjiang",
        "江苏": "jiangsu",
        "浙江": "zhejiang",
        "安徽": "anhui",
        "福建": "fujian",
        "江西": "jiangxi",
        "山东": "shandong",
        "河南": "henan",
        "湖北": "hubei",
        "湖南": "hunan",
        "广东": "guangdong",
        "海南": "hainan",
        "四川": "sichuan",
        "贵州": "guizhou",
        "云南": "yunnan",
        "陕西": "shanxi1",
        "甘肃": "gansu",
        "青海": "qinghai",
        //5个自治区
        "新疆": "xinjiang",
        "广西": "guangxi",
        "内蒙古": "neimenggu",
        "宁夏": "ningxia",
        "西藏": "xizang",
        //4个直辖市
        "北京": "beijing",
        "天津": "tianjin",
        "上海": "shanghai",
        "重庆": "chongqing",
        //2个特别行政区
        "香港": "xianggang",
        "澳门": "aomen"
      },
      //直辖市和特别行政区-只有二级地图，没有三级地图
      special: ["北京", "天津", "上海", "重庆", "香港", "澳门"],
      countryMapVos: [{"name":"浙江省","areaCode":"330000","hospitalList":[{"name":"nbjy","value":"宁波市第九医院"},{"name":"blyy","value":"北仑人民医院"},{"name":"lsyy","value":"宁波市镇海龙赛医院"}]},{"name":"上海市","areaCode":"310000","hospitalList":[{"name":"hsxy","value":"上海复旦大学附属华山西院"},{"name":"zlyy","value":"复旦大学附属肿瘤医院"},{"name":"jsgw","value":"金山公共卫生中心医院"},{"name":"first","value":"上海市第一人民医院"},{"name":"hfz","value":"复旦大学附属妇产科医院(杨浦院区)"},{"name":"mhwy","value":"复旦大学附属上海市第五人民医院"},{"name":"lfyhy","value":"临汾养护院"},{"name":"ly","value":"上海市第六人民医院"},{"name":"fytj","value":"上海复医天健医疗服务产业股份有限公司"},{"name":"zzyy","value":"上海质子重离子医院 "},{"name":"hsby","value":"复旦大学附属华山北院"},{"name":"ppyhy","value":"上海和养彭浦养护院"},{"name":"test1","value":"天下医家"}]},{"name":"江苏省","areaCode":"320000","hospitalList":[{"name":"ksyy","value":"昆山第一人民医院"},{"name":"tzrmyy","value":"泰州市人民医院"},{"name":"mjyy","value":"苏州明基医院"},{"name":"lygey","value":"连云港市第二人民医院"}]},{"name":"北京市","areaCode":"110000","hospitalList":[]},{"name":"广东省","areaCode":"440000","hospitalList":[]},{"name":"澳门","areaCode":"820000","hospitalList":[]},{"name":"陕西省","areaCode":"610000","hospitalList":[]},{"name":"四川省","areaCode":"510000","hospitalList":[]},{"name":"辽宁省","areaCode":"210000","hospitalList":[]},{"name":"安徽省","areaCode":"340000","hospitalList":[]},{"name":"云南省","areaCode":"530000","hospitalList":[]},{"name":"台湾省","areaCode":"710000","hospitalList":[]},{"name":"吉林省","areaCode":"220000","hospitalList":[]},{"name":"西藏","areaCode":"540000","hospitalList":[]},{"name":"广西","areaCode":"450000","hospitalList":[]},{"name":"宁夏","areaCode":"640000","hospitalList":[]},{"name":"山西省","areaCode":"140000","hospitalList":[]},{"name":"江西省","areaCode":"360000","hospitalList":[]},{"name":"香港","areaCode":"810000","hospitalList":[]},{"name":"内蒙古","areaCode":"150000","hospitalList":[]},{"name":"河南省","areaCode":"410000","hospitalList":[]},{"name":"甘肃省","areaCode":"620000","hospitalList":[]},{"name":"重庆市","areaCode":"500000","hospitalList":[{"name":"ycetyy","value":"重庆市永川区儿童医院"},{"name":"jlpzyy","value":"重庆市九龙坡区中医院"}]},{"name":"青海省","areaCode":"630000","hospitalList":[]},{"name":"山东省","areaCode":"370000","hospitalList":[]},{"name":"福建省","areaCode":"350000","hospitalList":[{"name":"xmetyy","value":"复旦大学附属儿科医院厦门分院"},{"name":"fdzsxmyy","value":"复旦大学附属中山医院厦门医院"}]},{"name":"贵州省","areaCode":"520000","hospitalList":[]},{"name":"黑龙江省","areaCode":"230000","hospitalList":[]},{"name":"新疆","areaCode":"650000","hospitalList":[]},{"name":"河北省","areaCode":"130000","hospitalList":[]},{"name":"海南省","areaCode":"460000","hospitalList":[]},{"name":"湖南省","areaCode":"430000","hospitalList":[]},{"name":"湖北省","areaCode":"420000","hospitalList":[]},{"name":"天津市","areaCode":"120000","hospitalList":[]},{"name":"中国","areaCode":"0","hospitalList":[]}],
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
      let that = this;
      //绘制全国地图
      this.chart = echarts.init(this.$el, 'macarons');
      const data = mapData;
      let provinces = this.provinces; //34个省、市、自治区的名字拼音映射数组
      let scaleData = [
        {
          name:"民营医院",
          value:"30"
        },{
          name:"二级医院",
          value:"30"
        },{
          name:"三级医院",
          value:"30"
        }
      ];
      let d = [],len = [];
      let countryMapVos = this.countryMapVos;
      for (let i = 0; i < data.features.length; i++) {
        let code = data.features[i];
        for (let j = 0; j < countryMapVos.length; j++) {
          let item = countryMapVos[j];
          if(code.id === item.areaCode){
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
        if(item.hospitalList.length > 0){
          len.push(item)
        }
      })
      // //注册地图
      echarts.registerMap('china', data);

      //
      //初始化绘制全国地图配置
      let option = {
        // backgroundColor: '#000',
        grid: {
          left: "5%",
          top: "5%",
          // bottom: "10%",
          // width: '80%'
        },
        title: {
          show: false,
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'normal',
            fontFamily: "Microsoft YaHei"
          },
          subtextStyle: {
            color: '#ccc',
            fontSize: 13,
            fontWeight: 'normal',
            fontFamily: "Microsoft YaHei"
          }
        },
        visualMap: {
          show: false,
          type: 'continuous',
          orient: 'horizontal',
          itemWidth: 10,
          itemHeight: 80,
          text: [50, 0],
          showLabel: true,
          seriesIndex: [0],
          min: 0,
          max: 10,
          inRange: {
            color:['#090b40','#74b5e8','#77ffe3', '#b8aaff', '#c6bbff',   '#85ffe8',  '#eacaff',  '#85c3ed',   '#e5ff9f',  '#ffb3b3',  '#d8606e']
            // color: ['#74b5e8', '#77ffe3', '#b8aaff', '#dfff8e', '#e4bbfe', '#fda1a4', ]
            // color: ['#090b40', '#baaaff']
          },
          textStyle: {
            color: '#7B93A7'
          },
          top: 30,
          left: 'left',
        },
        tooltip: {
          trigger: 'item',
          // formatter: '{b}'
          position: ['80%', '50%'],
          padding: 0,
          enterable: false,
          transitionDuration: 1,
          backgroundColor: 'rgba(50,50,50,0)',
          textStyle: {
            color: '#000',
            decoration: 'none',
          },
          formatter: function (params) {
            console.log(params)
            let tipHtml = '';
            if (params.value){
              let ellipsis = '';
              let list = [];
              if(params.data.hospitalList.length >6){
                list = params.data.hospitalList.slice(0,6);
                ellipsis = `<div style="text-align: center">...</div>`
              }else{
                list = params.data.hospitalList;
              };
              let listDom = '';
              list.forEach(function(item,i){
                listDom += `
                        <div style="padding-left:18px;padding-top:5px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" title="${item.value}">
                           ${item.value}
                        </div>
                        `
              });
              tipHtml = `<div class="bg-map" style="
                         height:300px;
                            width:200px;
                            background-color: transparent;
                            color:#CCCCCC;
                            background-size: 100% 100%;
                            background-image: url(${img_bi_bg})
                        ">
                            <div style="border: 0px solid transparent;">
                                <div style="height:50px;width:100%;border-bottom:0px solid #F0F0F0;text-align: center">
                                    <span style="line-height:50px;font-size: 18px;">${params.name}</span>
                                    <!--<span style="float:right;line-height:50px;margin-right:18px;color:#5396E3;cursor:pointer" onclick="mapTooltipClick(this);">点击查看详情</span>-->
                                </div>
                                <div style="height:110px;width:100%;cursor: pointer" >
                                    <div style="padding-left:18px;padding-top:22px">
                                        <!--<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgba(92,169,235,1)"></span>-->
                                        <span>数量</span>
                                        <span style="float:right;margin-right:18px"> ${params.value}</span>
                                    </div>
                                    <div style="height:180px;width:97%;cursor: pointer;margin-top: 10px;overflow: auto;" >
                                        ${listDom}
                                        ${ellipsis}
                                    </div>
                                </div>
                                <div id="tooltipBarId" style="height:200px;width:100%;border-radius:0 0 5px 0;"></div>
                            </div>
                        </div>
                    `;
            }else{
              tipHtml = `<div class="bg-map" style="
                         height:300px;
                            width:200px;
                            background-color: transparent;
                            color:#CCCCCC;
                            background-size: 100% 100%;
                            background-image: url(${img_bi_bg})
                        ">
                            <div style="border: 0px solid transparent;">
                                <div style="height:50px;width:100%;border-bottom:0px solid #F0F0F0;text-align: center">
                                    <span style="line-height:50px;font-size: 18px;">${params.name}</span>
                                    <!--<span style="float:right;line-height:50px;margin-right:18px;color:#5396E3;cursor:pointer" onclick="mapTooltipClick(this);">点击查看详情</span>-->
                                </div>
                                <div style="height:110px;width:100%;cursor: pointer" >
                                    <div style="padding-left:18px;padding-top:22px">
                                        <!--<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgba(92,169,235,1)"></span>-->
                                        <span>数量</span>
                                        <span style="float:right;margin-right:18px"> ${0}</span>
                                    </div>
                                </div>
                                <div id="tooltipBarId" style="height:200px;width:100%;border-radius:0 0 5px 0;"></div>
                            </div>
                        </div>
                    `;
            }
            return tipHtml;
          }
        },
        toolbox: {
          show: false,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          },
          iconStyle: {
            normal: {
              color: '#fff'
            }
          }
        },
        animationDuration: 1000,
        animationEasing: 'cubicOut',
        animationDurationUpdate: 1000

      };

      this.renderMap('china', d , scaleData,option);
      this.chart.setOption(option);

      let count = 0;
      let timeTicket = null;
      timeTicket && clearInterval(timeTicket);
      timeTicket = setInterval(function () {
        if(len[count]){
          let dom = that.hospitalList(len[count]);
          // $('.cont-right-list').html(dom);
          count++;
        }else{
          count = 0
        }
      }, 3000);
      //地图点击事件
      this.chart.on('click', function (params) {
        console.log(params);
        if (params.name in provinces) {
          // 跳转点击的是34个省、市、自治区，绘制选中地区的二级地图
          // window.location.href = url +  'province?provinces=' + params.name;
          // window.location.href = ias.config.ctx +  'province?provinces=' + params.name+"&areaCode="+params.data.areaCode;
        }
      });
      this.chart.on('dblclick', function (params) {
        console.log(params);
        console.log('dblclick');
        // hospitalList(params)
      });

    },
    //根据数据绘制地图
    renderMap(map, data , scaleData,option){
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
                formatter: function(params) {
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
    //医院列表的DOM节点
    hospitalList(params) {
      console.log(params)
      let tipHtml = '';
      if (params.value){
        let ellipsis = '';
        let list = [];

        if(params.hospitalList.length >6){
          list = params.hospitalList;
        }else{
          list = params.hospitalList;
        };
        console.log(list)
        let listDom = '';
        list.forEach(function(item,i){
          listDom += `
                        <div style="padding-left:18px;padding-top:5px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" title="${item.value}" onclick="window.location.href = ias.config.ctx + 'hospital'+'?tenantCode=${item.name}&tenantName=${item.value}'">
                           ${item.value}
                        </div>`
        });
        tipHtml = `<div class="bg-map" style="
            height:300px;
            width:200px;
            background-color: transparent;
            color:#CCCCCC;
            background-size: 100% 100%;
            background-image: url(${img_bi_bg})
            ">
            <div style="border: 0px solid transparent;">
            <div style="height:50px;width:100%;border-bottom:0px solid #F0F0F0;text-align: center">
            <span style="line-height:50px;font-size: 18px;">${params.name}</span></div>
            <div style="height:110px;width:100%;cursor: pointer" >
            <div style="padding-left:18px;padding-top:22px"><span>数量</span>
            <span style="float:right;margin-right:18px"> ${params.value}</span>
            </div>
            <div style="height:180px;width:97%;cursor: pointer;margin-top: 10px;overflow: auto;" >
            ${listDom}
            ${ellipsis}
            </div>
            </div>
            <div id="tooltipBarId" style="height:200px;width:100%;border-radius:0 0 5px 0;"></div>
            </div>
            </div>
            `;
      }
      else{
        tipHtml = `<div class="bg-map" style="
            height:300px;
            width:200px;
            background-color: transparent;
            color:#CCCCCC;
            background-size: 100% 100%;
            background-image: url(${img_bi_bg})
            ">
            <div style="border: 0px solid transparent;">
            <div style="height:50px;width:100%;border-bottom:0px solid #F0F0F0;text-align: center">
            <span style="line-height:50px;font-size: 18px;">${params.name}</span></div>
            <div style="height:110px;width:100%;cursor: pointer" >
            <div style="padding-left:18px;padding-top:22px"><span>数量</span>
            <span style="float:right;margin-right:18px"> ${0}</span>
            </div>
            </div>
            <div id="tooltipBarId" style="height:200px;width:100%;border-radius:0 0 5px 0;"></div>
            </div>
            </div>
            `;
      };
      return tipHtml;
    }

  }
}
