import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'
import '@tarojs/async-await'

import store from './store/'

import './app.scss'
import 'taro-ui/dist/style/index.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
  require('nerv-devtools')
}

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/cart/index',
      'pages/mine/index',
      'pages/wxParse/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar:{
      borderStyle: "black",
      selectedColor: "#1afa29",
      backgroundColor: "#ffffff",
      color: "#C4C9D1",
      list:[
        {
          pagePath:"pages/index/index",
          selectedIconPath:"./common/tabbar/home_def.png",
          iconPath:"./common/tabbar/home.png",
          text:"首页"
        },{
          pagePath:"pages/cart/index",
          selectedIconPath:"./common/tabbar/cart_def.png",
          iconPath:"./common/tabbar/cart.png",
          text:"购物车"
        },{
          pagePath:"pages/mine/index",
          selectedIconPath:"./common/tabbar/center_def.png",
          iconPath:"./common/tabbar/center.png",
          text:"我的"
        }
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
