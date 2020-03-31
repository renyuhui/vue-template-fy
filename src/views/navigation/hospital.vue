<template>
    <!--<div :class="className" :style="{height:height,width:width}"/>-->
    <div>
        <el-button @click="add">
            点击
        </el-button>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import resize from './mixins/resize'

    export default {
        mixins: [resize],
        props: {

        },
        components:{
        },
        data() {
            return {
                chart: null
            }
        },
        // computed(){
        //
        // },
        beforeCreate(){

        },
        created(){

        },
        beforeMount(){
            this.$store.dispatch('settings/changeDetailBg', true)
        },
        mounted() {
        },
        beforeUpdate(){

        },
        updated(){

        },
        beforeDestroy() {

        },
        destroyed(){
            this.$store.dispatch('settings/changeDetailBg', false)
        },
        methods: {
            add(){
                console.log('qwer')
            }

        }
    }
</script>
<style lang="scss" scoped>
    .dashboard {
        &-container {
            margin: 30px;
        }
        &-text {
            font-size: 30px;
            line-height: 46px;
        }
    }
</style>
