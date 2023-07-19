<template>
  <div class="search-wrapper" v-if="visible">
    <div class="search-wrapper-mask" @click="handleCloseSearch"></div>
    <div class="search-content">
      <div class="search-content-header">
        <div class="search-content-header-left">
          <span class="iconfont icon-sousuo icon" ></span>
          <div class="search-content-header-left-select" @click="showMenu">
            <div class="menu">{{ curSearchMenu }}</div>
            <span class="iconfont icon-below-s" icon></span>
            <div class="menu-list" v-if="isShowMenu">
              <div class="menu-list-item" :class="{active:curSearchMenu === item.key}" @click.stop="handleChangeMenu(item)" v-for="(item,index) in microApps" :key="index">{{ item.key }}</div>
            </div>
          </div>
        </div>
        <div class="search-content-header-right">
          <input type="text" placeholder="请输入搜索内容" v-model="searchValue" ref="searchInput" />
        </div>
      </div>
      <div class="search-content-body">
        <div class="search-content-body-icon iconfont icon-top-s"></div>
        <div class="search-content-body-list">
          <div class="search-content-body-list-item" v-for="item in state.searchHistory" :key="item">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from '@/store'
import microApps from '@/micro-app'
export default {
  data () {
    return {
      searchValue: '',
      curSearchMenu: '',
      microApps,
      isShowMenu: false
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
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
  methods: {
    showMenu () {
      console.log('555123', 123)
      this.isShowMenu = !this.isShowMenu
    },
    handleChangeMenu (item) {
      this.curSearchMenu = item.key
      this.isShowMenu = false
    },
    handleCloseSearch () {
      this.$emit('closeSearch')
    }
  },
  watch: {
    visible (val) {
      console.log(val)
      if (val) {
        this.$nextTick(() => {
          this.$refs.searchInput.focus()
        })
      }
    }
  },
  mounted () {
    this.curSearchMenu = this.state.curMenu.key
  }
}
</script>
<style scoped lang="scss">
  .search-wrapper{
    position:fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    &-mask{
      background: rgba($color: #000000, $alpha: .7);
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
    .search-content{
      position: absolute;
      z-index: 99;
      left: 50%;
      top: 25%;
      transform: translateX(-50%);
      &-header{
        width: 680px;
        height: 60px;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
        background: #fff;
        border-radius: 4px;
        display: flex;
        align-items: center;
        &-left{
          display: flex;
          align-items: center;
          height: 100%;
           .icon{
            width: 60px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
          }
          &-select{
            width: 220px;
            display: flex;
            align-items: center;
            position: relative;
            z-index: 99;
            .menu{
              flex: 1 1 auto;
            }
            .icon{
              flex: 0 0 auto;
            }
            .menu-list{
              position: absolute;
              width: 220px;
              background: #fff;
              top: 70px;
              border: 1px solid rgba(0,0,0,.15);
              border-radius: 4px;
              padding: 10px 0;
              &-item{
                width: 100%;
                height: 32px;
                line-height: 32px;
                cursor: pointer;
                padding: 0 20px;
                &.active{
                  background: #34495e !important;
                }
                &:hover{
                  background: #f5f4f8;
                }
              }
            }
          }
        }
        &-right{
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          input{
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            padding: 0 20px;
            font-size: 14px;
            color: #333;
          }
        }
      }
      &-body{
        background: #fff;
        position: relative;
        margin-top: 16px;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        padding: 10px;
        height: unset;
        &-icon{
          position: absolute;
          top: -43px;
          height: 20px;
          left: 24px;
          color: #fff;
        }
      }
    }
  }
</style>
