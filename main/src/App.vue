<template>
  <div class="layout-wrapper">
     <div class="layout-header">
      <div class="layout-header-content">
        <div class="logo">
          <img src="@/assets/images/logo.jpg" alt="">
        </div>
        <ul class="sub-apps">
          <li v-for="item in microApps" :class="{ active: item.activeRule === current }" :key="item.name" @click="goto(item)">{{ item.name.replace('sub-', '') }}</li>
        </ul>
        <div class="layout-header-info">
          <div class="layout-header-info-search icon" @click="setVisible">
            <span class="iconfont icon-sousuo"></span>
          </div>
          <div class="layout-header-info-theme icon">
            <span class="iconfont icon-icon_yejian-yueliang"></span>
          </div>
          <div class="layout-header-info-login icon">
            <span class="iconfont icon-ren111"></span>
          </div>
        </div>
      </div>
      <search :visible="visible" @closeSearch="closeSearch"></search>
   </div>
    <div id="subapp-viewport"></div>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import microApps from './micro-app'
import store from '@/store'
import search from '@/components/search.vue'
export default {
  name: 'App',
  data () {
    return {
      isLoading: true,
      microApps,
      current: '/sub-vue/',
      visible: false
    }
  },
  computed: {
    state () {
      // 如果只需要取某个命名空间下的state，比如 user ，可以加上参数
      // return store.getGlobalState('user')

      // 返回所有的state则不需添加参数
      return store.getGlobalState()
    }
  },
  watch: {
    isLoading (val) {
      if (val) {
        NProgress.start()
      } else {
        this.$nextTick(() => {
          NProgress.done()
        })
      }
    }
  },
  components: {
    search
  },
  methods: {
    goto (item) {
      history.pushState(null, item.activeRule, item.activeRule)
      // this.current = item.name
    },
    bindCurrent () {
      const path = window.location.pathname
      const item = this.microApps.find(item => item.activeRule === path)
      if (item) {
        this.current = path
        this.setGlobalState({
          curMenu: item
        })
      }
    },
    listenRouterChange () {
      const _wr = function (type) {
        const orig = history[type]
        return function () {
          const rv = orig.apply(this, arguments)
          const e = new Event(type)
          e.arguments = arguments
          window.dispatchEvent(e)
          return rv
        }
      }
      history.pushState = _wr('pushState')

      window.addEventListener('pushState', this.bindCurrent)
      window.addEventListener('popstate', this.bindCurrent)

      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('pushState', this.bindCurrent)
        window.removeEventListener('popstate', this.bindCurrent)
      })
    },
    setVisible () {
      this.visible = !this.visible
    },
    closeSearch () {
      this.visible = false
    }
  },
  created () {
    this.bindCurrent()
    NProgress.start()
  },
  mounted () {
    this.listenRouterChange()
  }
}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
}
html, body{
  margin: 0 !important;
  padding: 0;
  overflow: hidden;
}
  .layout-wrapper{
    overflow: hidden;
    .layout-header{
      height: 80px;
      width: 100%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      line-height: 80px;
      position: relative;
      &-content{
      width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
       .logo {
        width: 100px;
        height: 80px;
        flex: 0 0 auto;
        img{
          width: 100%;
          height: 100%;
        }
        }
      }
      .sub-apps {
        list-style: none;
        margin: 0;
        flex: 1 1 auto;
        li{
          list-style: none;
          display: inline-block;
          padding: 0 20px;
          cursor: pointer;
          &.active{
            color: #42b983;
          }
        }
      }
      &-info{
        display: flex;
        align-items: center;
        flex: 0 0 auto;
        .icon{
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f6f6f6;
          color: #34495e;
          font-size: 14px;
          font-weight: bold;
          margin-right: 8px;
          cursor: pointer;
          &:last-child{
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
