<template>
    <div class="navbar">
        <!--<hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />-->
        <!--<breadcrumb class="breadcrumb-container" />-->
        <div class="left-menu">
            <div class="left-menu-cont">
                <div><img class="left-menu-img" :src="Logo" /></div>
                <div class="left-menu-title">{{title}}</div>
            </div>
        </div>

        <div class="right-menu">

            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <!--<img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">-->
                    <svg-icon icon-class="user"/>
                    <i class="el-icon-caret-bottom"/>
                </div>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                    <router-link to="/">
                        <el-dropdown-item>
                            Home
                        </el-dropdown-item>
                    </router-link>
                    <!--<a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
                      <el-dropdown-item>Github</el-dropdown-item>
                    </a>
                    <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
                      <el-dropdown-item>Docs</el-dropdown-item>
                    </a>-->
                    <el-dropdown-item divided @click.native="logout">
                        <span style="display:block;">退出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Breadcrumb from '@/components/Breadcrumb'
    import Hamburger from '@/components/Hamburger'
    import Logo from '@/assets/404_images/logo.png'

    export default {
        data(){
            return {
                title: '复医天建',
                Logo:Logo
            }
        },
        components: {
            Breadcrumb,
            Hamburger
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'avatar'
            ])
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('app/toggleSideBar')
            },
            async logout() {
                await this.$store.dispatch('user/logout')
                this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .navbar {
        height: 50px;
        overflow: hidden;
        position: relative;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

        .hamburger-container {
            line-height: 46px;
            height: 100%;
            float: left;
            cursor: pointer;
            transition: background .3s;
            -webkit-tap-highlight-color: transparent;

            &:hover {
                background: rgba(0, 0, 0, .025)
            }
        }

        .breadcrumb-container {
            float: left;
        }
        .left-menu{
            float: left;
            height: 100%;
            line-height: 50px;
            .left-menu-cont{
                display: flex;
                justify-content: left;
            }
            .left-menu-img{
                margin-left: 10px;
                width: 36px;
                height: 36px;
                vertical-align: middle;
                display: inline-block;
            }
            .left-menu-title{
                margin-left: 10px;

            }
        }

        .right-menu {
            float: right;
            height: 100%;
            line-height: 50px;

            &:focus {
                outline: none;
            }

            .right-menu-item {
                display: inline-block;
                padding: 0 8px;
                height: 100%;
                font-size: 18px;
                color: #5a5e66;
                vertical-align: text-bottom;

                &.hover-effect {
                    cursor: pointer;
                    transition: background .3s;

                    &:hover {
                        background: rgba(0, 0, 0, .025)
                    }
                }
            }

            .avatar-container {
                margin-right: 30px;

                .avatar-wrapper {
                    margin-top: 5px;
                    position: relative;

                    .user-avatar {
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }

                    .el-icon-caret-bottom {
                        cursor: pointer;
                        position: absolute;
                        right: -20px;
                        top: 25px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>
