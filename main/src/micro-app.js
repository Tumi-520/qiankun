import store from './store'

const microApps = [
  {
    name: 'sub-vue',
    key: 'Vue',
    entry: process.env.VUE_APP_SUB_VUE,
    activeRule: '/sub-vue'
  },
  {
    name: 'sub-react',
    key: 'React',
    entry: process.env.VUE_APP_SUB_REACT,
    activeRule: '/sub-react'
  },
  {
    name: 'sub-html',
    key: 'Html',
    entry: process.env.VUE_APP_SUB_HTML,
    activeRule: '/sub-html'
  }
]

const apps = microApps.map( item => {
  return {
    ...item,
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState // 下发getGlobalState方法
    }
  }
} )

export default apps
