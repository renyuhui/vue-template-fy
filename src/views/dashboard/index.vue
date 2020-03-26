<script>
    import {mapGetters} from 'vuex'
    import IMGS from '@/assets/BI_charts/img_pzkz.png'

    export default {
        name: 'Dashboard',
        data:function(){
            return {
                code: '111111',
                dashboardContainer:{
                    height: '600px',
                    padding: '15px',
                    margin: '30px',
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
          console.log(this.code)
        },
        methods: {},
        render() {
            let {name,code,dashboardContainer} = this;
            console.log(this,name,code)
            return (
                <div class="dashboard-container" {...{style: dashboardContainer}} >
                    <div class="dashboard-text">name: {name}</div>
                </div>
            )
        }
    }
</script>

<!--<style lang="scss" scoped>
    .dashboard {
        &-container {
            margin: 30px;
        }
        &-text {
            font-size: 30px;
            line-height: 46px;
        }
    }
</style>-->
