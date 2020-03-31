<template>
    <div>
        <div class="header-container" :class="[detail ? 'header-container-bg-detail' : 'header-container-bg']">
            <el-row>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-row type="flex" class="row-bg" justify="end">
                            <el-col :span="9">
                                <div class="grid-content bg-purple fy-menu-item" v-if="detail === false"></div>
                                <div @click="back" class="grid-content bg-purple fy-menu-item"
                                     v-else-if="detail === true">
                                    <i class="el-icon-arrow-left"></i>返回
                                </div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content bg-purple fy-menu-item" v-if="detail">{{noMenuList[0]}}</div>
                                <div class="grid-content bg-purple fy-menu-item" v-else>{{menuList[0]}}</div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content bg-purple fy-menu-item" v-if="detail">{{noMenuList[1]}}</div>
                                <div class="grid-content bg-purple fy-menu-item" v-else>{{menuList[1]}}</div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content bg-purple fy-menu-item" v-if="detail">{{noMenuList[2]}}</div>
                                <div class="grid-content bg-purple fy-menu-item" v-else>{{menuList[2]}}</div>
                            </el-col>
                            <el-col :span="1">
                                <div class="grid-content bg-purple fy-menu-item"></div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                        <h1>{{titles}}</h1>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-row type="flex" class="row-bg" justify="end">
                            <el-col :span="1">
                                <div class="grid-content bg-purple fy-menu-item"></div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content bg-purple fy-menu-item" v-if="detail">{{noMenuList[3]}}</div>
                                <div class="grid-content bg-purple fy-menu-item" v-else>{{menuList[3]}}</div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content bg-purple fy-menu-item" v-if="detail">{{noMenuList[4]}}</div>
                                <div class="grid-content bg-purple fy-menu-item" v-else>{{menuList[4]}}</div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content bg-purple fy-menu-item" v-if="detail">{{noMenuList[5]}}</div>
                                <div class="grid-content bg-purple fy-menu-item" v-else>{{menuList[5]}}</div>
                            </el-col>
                            <el-col :span="8">
                                <div class="grid-content bg-purple fy-date">
                                    <el-date-picker
                                            v-model="date_value"
                                            type="month"
                                            @change="dateChange"
                                            placeholder="选择月">
                                    </el-date-picker>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    // import {setToken} from "../../utils/auth";
    import moment from 'moment'
    import {mapGetters} from 'vuex'
    import IMG_TOP from '@/assets/BI_charts/TOP.png'
    import IMG_TOP_DETAIL from '@/assets/BI_charts/img_top.png'

    export default {
        name: "Navbar",
        data() {
            return {
                URL_IMG_TOP: 'url(' + IMG_TOP + ')',
                URL_IMG_TOPP_DETAIL: 'url(' + IMG_TOP_DETAIL + ')',
                headerContainer: {
                    backgroundImage: 'url(' + IMG_TOP + ')',
                    backgroundSize: '100% 100%'
                },
                headerContainerDetail: {
                    backgroundImage: 'url(' + IMG_TOP_DETAIL + ')',
                    backgroundSize: '100% 120%'
                },
                date_value: null,
            }
        },
        computed: {
            ...mapGetters([
                'detail',
                'titles',
                'menuList',
                'noMenuList'
            ])
        },
        created() {

        },
        beforeMount() {

        },
        mounted() {
            console.log(this.$store.getters.date_value)
            this.date_value = this.$store.getters.date_value
        },
        methods: {
            //返回上一层
            back() {
                this.$router.go(-1);
            },
            dateChange: function (e) {
                let date = moment(e).format("YYYY-MM");
                console.log(date);
                this.$store.dispatch('date/changeDate', date);
            }
        }

    }
</script>

<style scoped>

    .header-container {
        width: 100%;
        height: 70px;
        /*background-size: 100% 100%;*/
        position: relative;
    }
    .header-container-bg{
        background-image: url('../../assets/BI_charts/TOP.png');
        background-size: 100% 100%
    }
    .header-container-bg-detail{
        background-image: url('../../assets/BI_charts/img_top.png');
        background-size: 100% 120%
    }

    .header-container h1 {
        width: 100%;
        height: 70px;
        font-size: 32px;
        line-height: 70px;
        text-align: center;
        color: #B5C2E6;
        margin: 0;
    }

    .fy-menu-item {
        padding: 15px 0 10px 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden;
        cursor: pointer;
        color: #ffffff;
        font-size: 20px;
        text-align: center;
    }

    .fy-date > div {
        width: 100% !important;
    }

    .fy-date input {
        background-color: transparent;
        border: 0px solid #DCDFE6;
    }
</style>
