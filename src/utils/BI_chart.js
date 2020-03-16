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
