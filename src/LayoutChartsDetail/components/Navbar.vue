<template>
    <div>
        <div class="header-container">
            <el-row>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-row type="flex" class="row-bg" justify="end">
                            <el-col :span="9">
                                <div @click="back" class="grid-content bg-purple fy-menu-item"><i
                                        class="el-icon-arrow-left"></i>返回
                                </div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content bg-purple fy-menu-item"></div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content bg-purple-light fy-menu-item"></div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content bg-purple fy-menu-item"></div>
                            </el-col>
                            <el-col :span="1">
                                <div class="grid-content bg-purple fy-menu-item"></div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                        <h1>复医天健智慧医院后勤运营平台</h1>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-row type="flex" class="row-bg" justify="end">
                            <el-col :span="1">
                                <div class="grid-content bg-purple fy-menu-item"></div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content bg-purple fy-menu-item"></div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content bg-purple-light fy-menu-item"></div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content bg-purple fy-menu-item"></div>
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

    export default {
        name: "Navbar",
        data() {
            return {
                menuList: ['驾驶舱', '品质控制', '安全生产', '复医天健智慧医院后勤运营平台', '保洁运送', '工程维修', '膳食餐饮'],
                date_value: '2020-02'
            }
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
        background-image: url("../../assets/BI_charts/img_top.png");
        width: 100%;
        height: 70px;
        background-size: 100% 120%;
        position: relative;
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
        padding-top: 15px;
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
