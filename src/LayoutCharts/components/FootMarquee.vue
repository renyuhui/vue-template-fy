<template>
  <div class="app-foot">
    <marquee direction="left" scrolldelay="50" onmouseover="this.stop();" onmouseout="this.start();">
      <ul class="fy-marquee-list">
        <li v-for="item in newsList">
          {{ item.message }}
        </li>
      </ul>
    </marquee>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'

  export default {
    name: 'FootMarquee',
    computed: {
        ...mapGetters([
           'newsList'
        ]),
      key() {
        return this.$route.path
      }
    }
  }
</script>

<style scoped>
  .app-foot {
    width: 100%;
    height: 30px;
    padding: 0 20px;
    background-color: #000;
    color: #ccc;
    opacity: 0.7;
  }
  .fy-marquee-list{
    display: inline-block;
    list-style: none;
    margin-top: 0;
    white-space: nowrap;
  }
  .fy-marquee-list li{
    width: 50vw;
    display: inline-block;
    font-size: 16px;
    margin-top: 5px;
  }
</style>

<style lang="scss">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 15px;
    }
  }
</style>
