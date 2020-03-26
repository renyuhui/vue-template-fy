
<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)"  @click="testClick(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
      testClick(url) {
          // 通过重定向空白路由页面实现当前菜单刷新
          if (JSON.parse(sessionStorage.getItem('defaultActive')) === url) {
              // 点击的是当前路由 手动重定向页面到 '/redirect' 页面
              sessionStorage.setItem('defaultActive', JSON.stringify(url))
              const fullPath = encodeURI(url)
              this.$router.replace({
                  path: '/redirect',
                  query: {
                      path: encodeURI(fullPath)
                  }
              })
          } else {
              sessionStorage.setItem('defaultActive', JSON.stringify(url))
              // 正常跳转
              this.$router.push({
                  path: url
              })
          }
      },
      linkProps(url) {
          return {
              is: 'div'
          }
      }

      //   linkProps(url) {
    //     console.log(url,'?'+ new Date().getTime())
    //   if (isExternal(url)) {
    //     return {
    //       is: 'a',
    //       href: url,
    //       target: '_blank',
    //       rel: 'noopener'
    //     }
    //   }
    //   return {
    //     is: 'router-link',
    //     to: 'redirect' + url
    //   }
    // }
  }
}
</script>
