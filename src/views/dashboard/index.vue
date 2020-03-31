<script>
    import {mapGetters} from 'vuex'
    import IMGS from '@/assets/BI_charts/img_pzkz_1.png'
    const ImgBase64 = require('@/assets/BI_charts/img_pzkz_1.png')
    const ZhengshuBase64 = require('@/assets/BI_charts/zhengshu_1.jpg')

    export default {
        name: 'Dashboard',
        data:function(){
            return {
                code: '111111',
                dashboardContainer:{
                    height: 'calc( 100vh - 70px )',
                    padding: '15px',
                    margin: '10px',
                    fontSize: '30px',
                    lineHeight: '46px',
                    backgroundImage: 'url('+IMGS+')',
                    backgroundSize: '100% 100%'
                }
            }
        },
        computed: {
            ...mapGetters([
                'name'
            ])
        },
        mounted(){
          console.log(IMGS)
            console.log(ImgBase64)
            console.log(ZhengshuBase64)
        },
        methods: {},
        render() {
            let {name,code,dashboardContainer} = this;
            console.log(this,name,code)
            return (
                <div>
                    <div class="dashboard-container" {...{style: dashboardContainer}} >
                        <div class="dashboard-text">name: {name}</div>
                        <img class="imgStyle" src={ImgBase64}/>
                        <img class="imgStyle" src={ZhengshuBase64}/>
                    </div>

                </div>
            )
        }
    }
</script>

<style lang="scss" scoped>
    /*.dashboard {*/
        /*&-container {*/
            /*margin: 30px;*/
        /*}*/
        /*&-text {*/
            /*font-size: 30px;*/
            /*line-height: 46px;*/
        /*}*/
    /*}*/
    .imgStyle{
        width: 80vw;
        height: 20vh;
    }
</style>
