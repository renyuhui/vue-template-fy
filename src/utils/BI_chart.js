//省市名称映射
export function getProvinceData() {
    return {
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
    }
}
//初始化绘制全国地图配置
export function getMapOption() {
    return {
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
                color: ['#090b40', '#74b5e8', '#77ffe3', '#b8aaff', '#c6bbff', '#85ffe8', '#eacaff', '#85c3ed', '#e5ff9f', '#ffb3b3', '#d8606e']
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
}
//根据数据绘制全国地图
export function renderMap(map, data, scaleData, option, that){
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
    that.chart.setOption(option);
}
//初始化绘制省市地图配置
export function getProvinceOption() {
    return {
// backgroundColor: '#000',
        title: {
            show: true,
            // text: 'Echarts3 中国地图下钻至县级',
            // subtext: '三级下钻',
            // link:'http://www.ldsun.com',
            left: 'center',
            textStyle: {
                color: '#fff',
                fontSize: 16,
                fontWeight: 'normal',
                fontFamily: "Microsoft YaHei"
            },
            subtextStyle: {
                color: '#ccc',
                fontSize: 15,
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
            text: [30, 0],
            showLabel: true,
            seriesIndex: [0],
            min: 0,
            max: 15,
            inRange: {
                color: ['#74b5e8', '#b8aaff', '#c6bbff', '#85ffe8', '#eacaff', '#85c3ed', '#e5ff9f', '#ffb3b3', '#d8606e']
                // color: ['#74b5e8', '#77ffe3', '#b8aaff', '#dfff8e', '#e4bbfe', '#fda1a4', ]
                // color: ['#090b40', '#baaaff']
            },
            textStyle: {
                color: '#7B93A7'
            },
            bottom: 30,
            left: 'left',
        },
        tooltip: {
            show: false,
            trigger: 'item',
            // formatter: '{b}'
            position: ['82%', '50%'],
            padding: 0,
            enterable: true,
            transitionDuration: 1,
            backgroundColor: 'rgba(50,50,50,0)',
            textStyle: {
                color: '#000',
                decoration: 'none',
            },
            formatter: function (params) {
                // console.log(params)

                let tipHtml = '';
                if (params.value) {
                    let listDom = '';
                    params.data.hospitalList.forEach(function (item, i) {
                        listDom += `
                        <div code="${item.name}" title="${item.value}" style="padding-left:18px;padding-top:5px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" onclick="window.location.href = ias.config.ctx + 'hospital'+'?tenantCode=${item.name}'">
                           ${item.value}
                         </div>
                         `
                    });
                    tipHtml = `
                        <div class="bg-map" style="
                            height:300px;
                            width:200px;
                            background-color: transparent;
                            color:#CCCCCC;
                            background-size: 100% 100%;
                            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOIAAAEeCAYAAACXN8kBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1ZDkwNTkxNS1hZmY1LTA1NDUtYWQzYS1iNjMzZWE0NjkwZDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzQwMzVDOEMwNzRDMTFFQUEzQjBCQ0YyODFFM0EwMEUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzQwMzVDOEIwNzRDMTFFQUEzQjBCQ0YyODFFM0EwMEUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjYyZWYzMGUzLWRlYTktZTE0OS04YWRhLWI2YmQ2MGM4ZDQzZiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1ZDkwNTkxNS1hZmY1LTA1NDUtYWQzYS1iNjMzZWE0NjkwZDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7+kBdTAAAJN0lEQVR42uzdf2yU5QHA8eeuxTnUDdymqOl0iabbRNwMAzT7x82Y+e9Y/5nZssA/EyfB+BPcRMkAFZlEHSZLWBYz9w+OPzUxJmYZLoWhUcREUrIADeLcD51UEqHtu+d5e21Ke3e21/eulX4+8fGOe9u+x/F8+95de8+VsiwLzfRib+iMJ5viuLly0UtxPHBLR3gnwAwQ52hyVRyPxHFT5eKX47g/jp5WXIfSeZeuaNoX39m9I/3l9sYxb8ymD+NY9qMlPz1oGjDdnt/7bDpYdNeap3E0fZ62f0pIq+LJ0ynYgvc7r3KUXG4aMANsqhLh8Dwt6p7b+jg2TPqIGCNcHU+2NSHC3OBgFt7s/cAUYNot6pgf2sqlVuxqXRybq20o14jwzmZGCLP4yHv3hO6axgjTB25p9jX6+19eC1vue9I/DdPunkdXh6U3Lm7V7lJbA3E8UTPEGOHaSrUj+k/3h61rt4d9u9+c5P6ysOCyL4dH/vBQOO+CuWds+fjEyfDc9p1mADPCn57ZGRYu/ua4eXqy72TYcMdj4b3e9+N9w7aGvnbnNVeGuzbfFs753DmjL95aiXHkSNR2zgXfHo7wwXjy69EffTpG+Ph9vw2vvbp/0hFmg/2h76O+sDce+S78yvzwpYvm51G//uqbYduvtod3jxw3A5gRTnw4ap5efOHQPN39Rnjil9vDkZ7ecOqTU/lIPZw+lcbpCY/jvf8M/3jnSLj++98JbW0jjwTTQ74fxPGvdOcwv2D4yZoY4hk/UEw73hIjfKP7QAMRDuSncHYphVK5raGnTq67YVG8C3x7aJ/TfmYsledpyrU+cevaZxqIMIiQs9jQPb1G5vfrf9ufP8QbV3ZFzRAPvnWogQj7RcjZn2OD87ze8yzl6b5y8JmNscBfDy0kxCwTIbMwxjTvs8GZEWKWDRT6nQE+WzEOFBJjeSZcCZjtMTYeYtqxCGEkxjzIloYYA5zKTuHsrLHxLsoihKJj7G9yiFkmQphIJ4P9zQoxa6h0mKU1TirGcjO+KDC6m6yIEEUIU4vx03//ujyxLwI088hYN0SvpIDipBfKV3FV/RAzEUJRLr38kny1iirScqOdeYg7u3d0jqu34yK3HhTk1lVd45biqMiXFi1XFgHuHrv1wafuzSsGpm7Rkqvrbb45HREfCVUWV517/ty8YqD5Uog31ax46UK3EBRg/963621+qewmguZLSzamZUSrSO+v8UAK8eWaFe854BaEAhw7fDysXfFw2PPKvvztJtKIdoWhN7l5p/TC0azqOzaletMnWn8UivXAzm356cauNaWPjz879Bixa9nKnkqVuwZipWmkatetFCG0SnvfsR3pNL3/2/JNuz/Ij5fekwJay5M1IERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEYFKyLBsZG//6nyyNuQt+Unf8cXeWD+edd776+XpjVGcj7ZXS/4Zt2v3f/A8bu9b4DgVNUnWlbzcLeIwICBGECAgRhAgIEYQICBGECAgRhAgIEYQICBGECAgRhAgIEYQICBGECAgRhAgIEYQICBGECAgRhAgIEYQICBGECAgRhAgIEYQICBGECAgRhAgIEYQICBGECAgRhAgIEYQICBGECAgRhAgIEYQICBGECAgRhAgIEYQICBGECAgRECIIERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEQIiBEECIgRBAiIEQQIiBEECIgRBAiIEQQIiBEECIgRBAiIEQQIiBEECIgRBAiIEQQIiBEECIgRBAiIEQQIiBEECIgRBAiIEQQIiBEECIgRBAiIEQQIiBEECIgRBAiIEQQIiBEECIgRBAiIEQQIiBEECIgRBAiIEQQIiBEECIgRBAiIEQghHY3AbTGZVdcEn58W1dY1DE///Pze5/984u9YV08e1CI0AKXXn5J2LRjfTjvgrmjL/5hHN+LY0nb0pUPhUMfhc44fnfxF879xoIvfj5ccdVXw+Geo+HE//rcglCAn69bEb7WeXm1Teemg2V6jPj1OLpTneVyKaSx9MbFYfPv1+eHUmDqFi1dWG/zTSnEjXHMG7slHULT/Vmg+VKIN9eseMnVbiEowP49B+ptftmPL6AFntu+M5zsO1lt04dx3J9CfKlmxXvfdgtCAd49cjxsuOOxapuWxdGTQlxXqfIMH584mVcMFOO93verXXxw+DFiOrNk7Nb7f/ZQXjFQhFL8r63m1uHHiD3j6j32b7cdFBRhqdxW9yPK9T+5fahkoPEM8whLjYY4umQxQmMRTuxgNoEfXzgyQjMjnGCIk/+iMOsjLE2ul/KkCy+JEepH2DbpTsoNlV7yCzlQO8LJ91Fu5c5AhAWGOLzTUqnNrQ9Dj9umdHAqT3XnYkSEU++gPBOuBHyG748WMv/LxX1HsPwNs67CwuZ9udDvDGUxMosiLHC+1wxx8XevnfYrB2dThJ3XXDmhELPRG+7avCpcd8OiKVxJP/jnbI1w8o8Jv7VsYWzqttpf9YWjI/2tiuPp0QWdPt0fHrvnqfBG94EGrnAWssGBkb7Tuo63ruoaWc0qreGRXnjsNY/MJCOLAFfWa0qrVIyep40cZNIB7e5Hbw9z5ow7iq6PY8PYEJPVcWwbvadTn5wKW9c+Ew6+daixv1k2EBZ0XBQefOreMPf8MxZXzVcBWLfy4XDssBiZfulgkZYRHbMIcD5P0wvlh16jO7kI00O8dO+yfXyEaWWMzdWOiMPujOM3rfrL73llX9hy35NmAdPunkdX52v6tmJXcTxe667paHfHsaUV12hgMAv7ez8wC5h213bMzxfYbqIU211xPDF2Q61nTR+vHDqB4iJcUy3CpN5zsOn+65w4Hm7mtWsrl3Zt7Fqz3L8T0y29O1MYemOYZkT4izi21/qAWndNi9YZht5fY+zS/mkZx2W3dAwtKQfT6cXeuvM0rXTY06x9t+q1TMNLNu6K46PK2FW5TITMFGkuXl+Zm32Vkc4va2aEyf8FGABu9eeWWwJZygAAAABJRU5ErkJggg==')
                        ">
                            <div style="border: 0px solid;">
                                <div style="height:50px;width:100%;border-bottom:0px solid #F0F0F0;text-align: center">
                                    <span style="line-height:50px;font-size: 18px;">${params.name}</span>
                                </div>
                                <div style="
                                height:230px;
                                width:90%;cursor: pointer;
                                margin-top: 10px;
                                overflow: auto;" >
                                    ${listDom}
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    tipHtml = `
                        <div class="bg-map" style="
                            height:300px;
                            width:200px;
                            background-color: transparent;
                            color:#CCCCCC;
                            background-size: 100% 100%;
                            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOIAAAEeCAYAAACXN8kBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1ZDkwNTkxNS1hZmY1LTA1NDUtYWQzYS1iNjMzZWE0NjkwZDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzQwMzVDOEMwNzRDMTFFQUEzQjBCQ0YyODFFM0EwMEUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzQwMzVDOEIwNzRDMTFFQUEzQjBCQ0YyODFFM0EwMEUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjYyZWYzMGUzLWRlYTktZTE0OS04YWRhLWI2YmQ2MGM4ZDQzZiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1ZDkwNTkxNS1hZmY1LTA1NDUtYWQzYS1iNjMzZWE0NjkwZDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7+kBdTAAAJN0lEQVR42uzdf2yU5QHA8eeuxTnUDdymqOl0iabbRNwMAzT7x82Y+e9Y/5nZssA/EyfB+BPcRMkAFZlEHSZLWBYz9w+OPzUxJmYZLoWhUcREUrIADeLcD51UEqHtu+d5e21Ke3e21/eulX4+8fGOe9u+x/F8+95de8+VsiwLzfRib+iMJ5viuLly0UtxPHBLR3gnwAwQ52hyVRyPxHFT5eKX47g/jp5WXIfSeZeuaNoX39m9I/3l9sYxb8ymD+NY9qMlPz1oGjDdnt/7bDpYdNeap3E0fZ62f0pIq+LJ0ynYgvc7r3KUXG4aMANsqhLh8Dwt6p7b+jg2TPqIGCNcHU+2NSHC3OBgFt7s/cAUYNot6pgf2sqlVuxqXRybq20o14jwzmZGCLP4yHv3hO6axgjTB25p9jX6+19eC1vue9I/DdPunkdXh6U3Lm7V7lJbA3E8UTPEGOHaSrUj+k/3h61rt4d9u9+c5P6ysOCyL4dH/vBQOO+CuWds+fjEyfDc9p1mADPCn57ZGRYu/ua4eXqy72TYcMdj4b3e9+N9w7aGvnbnNVeGuzbfFs753DmjL95aiXHkSNR2zgXfHo7wwXjy69EffTpG+Ph9vw2vvbp/0hFmg/2h76O+sDce+S78yvzwpYvm51G//uqbYduvtod3jxw3A5gRTnw4ap5efOHQPN39Rnjil9vDkZ7ecOqTU/lIPZw+lcbpCY/jvf8M/3jnSLj++98JbW0jjwTTQ74fxPGvdOcwv2D4yZoY4hk/UEw73hIjfKP7QAMRDuSncHYphVK5raGnTq67YVG8C3x7aJ/TfmYsledpyrU+cevaZxqIMIiQs9jQPb1G5vfrf9ufP8QbV3ZFzRAPvnWogQj7RcjZn2OD87ze8yzl6b5y8JmNscBfDy0kxCwTIbMwxjTvs8GZEWKWDRT6nQE+WzEOFBJjeSZcCZjtMTYeYtqxCGEkxjzIloYYA5zKTuHsrLHxLsoihKJj7G9yiFkmQphIJ4P9zQoxa6h0mKU1TirGcjO+KDC6m6yIEEUIU4vx03//ujyxLwI088hYN0SvpIDipBfKV3FV/RAzEUJRLr38kny1iirScqOdeYg7u3d0jqu34yK3HhTk1lVd45biqMiXFi1XFgHuHrv1wafuzSsGpm7Rkqvrbb45HREfCVUWV517/ty8YqD5Uog31ax46UK3EBRg/963621+qewmguZLSzamZUSrSO+v8UAK8eWaFe854BaEAhw7fDysXfFw2PPKvvztJtKIdoWhN7l5p/TC0azqOzaletMnWn8UivXAzm356cauNaWPjz879Bixa9nKnkqVuwZipWmkatetFCG0SnvfsR3pNL3/2/JNuz/Ij5fekwJay5M1IERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEYFKyLBsZG//6nyyNuQt+Unf8cXeWD+edd776+XpjVGcj7ZXS/4Zt2v3f/A8bu9b4DgVNUnWlbzcLeIwICBGECAgRhAgIEYQICBGECAgRhAgIEYQICBGECAgRhAgIEYQICBGECAgRhAgIEYQICBGECAgRhAgIEYQICBGECAgRhAgIEYQICBGECAgRhAgIEYQICBGECAgRhAgIEYQICBGECAgRhAgIEYQICBGECAgRhAgIEYQICBGECAgRECIIERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEQIggRECIIERAiCBEQIiBEECIgRBAiIEQQIiBEECIgRBAiIEQQIiBEECIgRBAiIEQQIiBEECIgRBAiIEQQIiBEECIgRBAiIEQQIiBEECIgRBAiIEQQIiBEECIgRBAiIEQQIiBEECIgRBAiIEQQIiBEECIgRBAiIEQQIiBEECIgRBAiIEQQIiBEECIgRBAiIEQghHY3AbTGZVdcEn58W1dY1DE///Pze5/984u9YV08e1CI0AKXXn5J2LRjfTjvgrmjL/5hHN+LY0nb0pUPhUMfhc44fnfxF879xoIvfj5ccdVXw+Geo+HE//rcglCAn69bEb7WeXm1Teemg2V6jPj1OLpTneVyKaSx9MbFYfPv1+eHUmDqFi1dWG/zTSnEjXHMG7slHULT/Vmg+VKIN9eseMnVbiEowP49B+ptftmPL6AFntu+M5zsO1lt04dx3J9CfKlmxXvfdgtCAd49cjxsuOOxapuWxdGTQlxXqfIMH584mVcMFOO93verXXxw+DFiOrNk7Nb7f/ZQXjFQhFL8r63m1uHHiD3j6j32b7cdFBRhqdxW9yPK9T+5fahkoPEM8whLjYY4umQxQmMRTuxgNoEfXzgyQjMjnGCIk/+iMOsjLE2ul/KkCy+JEepH2DbpTsoNlV7yCzlQO8LJ91Fu5c5AhAWGOLzTUqnNrQ9Dj9umdHAqT3XnYkSEU++gPBOuBHyG748WMv/LxX1HsPwNs67CwuZ9udDvDGUxMosiLHC+1wxx8XevnfYrB2dThJ3XXDmhELPRG+7avCpcd8OiKVxJP/jnbI1w8o8Jv7VsYWzqttpf9YWjI/2tiuPp0QWdPt0fHrvnqfBG94EGrnAWssGBkb7Tuo63ruoaWc0qreGRXnjsNY/MJCOLAFfWa0qrVIyep40cZNIB7e5Hbw9z5ow7iq6PY8PYEJPVcWwbvadTn5wKW9c+Ew6+daixv1k2EBZ0XBQefOreMPf8MxZXzVcBWLfy4XDssBiZfulgkZYRHbMIcD5P0wvlh16jO7kI00O8dO+yfXyEaWWMzdWOiMPujOM3rfrL73llX9hy35NmAdPunkdX52v6tmJXcTxe667paHfHsaUV12hgMAv7ez8wC5h213bMzxfYbqIU211xPDF2Q61nTR+vHDqB4iJcUy3CpN5zsOn+65w4Hm7mtWsrl3Zt7Fqz3L8T0y29O1MYemOYZkT4izi21/qAWndNi9YZht5fY+zS/mkZx2W3dAwtKQfT6cXeuvM0rXTY06x9t+q1TMNLNu6K46PK2FW5TITMFGkuXl+Zm32Vkc4va2aEyf8FGABu9eeWWwJZygAAAABJRU5ErkJggg==')
                        ">
                            <div style="border: 0px solid transparent;">
                                <div style="height:50px;width:100%;border-bottom:0px solid #F0F0F0;text-align: center">
                                    <span style="line-height:50px;font-size: 18px;">${params.name}</span>
                                </div>
                                <div style="height:200px;width:97%;cursor: pointer;margin-top: 10px;overflow: auto;" ></div>
                            </div>
                        </div>
                    `;
                }
                // setTimeout(function() {
                //     console.log(1)
                //
                //     // tooltipCharts(params.name);
                // }, 1000);
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
    }
}
//根据数据绘制省市地图
export function renderProvince(map, data, option, specicalZoom, that){
    // console.log(map, data, option, that);
    let zoom = 1;
    specicalZoom.forEach(function (item) {
        if (item.name == map) {
            zoom = item.zoom
        }
    })

    option.title.subtext = map;
    option.series = [
        {
            name: map,
            type: 'map',
            mapType: map,
            roam: false,
            nameMap: {
                'china': '中国'
            },
            zoom: zoom,
            // aspectScale: 0.75,
            // center: ["20%", "50%"],
            label: {
                normal: {
                    show: false,
                    // position: 'inside',
                    // position: [10, 10],
                    // formatter: function(params) {
                    // return '';
                    // },
                    textStyle: {
                        color: '#999',
                        fontSize: 14,
                        position: "inside"
                    }
                },
                emphasis: {
                    show: true,
                    distance: 45,
                    position: 'inside',
                    // position: [100, 100],
                    textStyle: {
                        color: '#fff',
                        fontSize: 12,
                        position: [100, 100],
                        align: "center",
                        verticalAlign: "middle"
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
                            color: '#ccc',
                            fontSize: '10',
                        },
                        formatter: function (params) {
                            // console.log(params)
                            return ""
                        }
                    }
                },
                emphasis: {
                    areaColor: 'darkorange'
                }
            },
            data: data
        }
    ];
    //渲染地图
    that.chart.setOption(option);
}