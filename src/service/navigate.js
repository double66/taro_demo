import Taro from '@tarojs/taro'

export default {
  jumpUrl(url,options = {}){
    const pages = Taro.getCurrentPages()
    let method  = options.method || 'navigateTo'
    if (url && typeof url === 'string') {
      if (method === 'navigateTo' && pages.length >= 4) {
        method = 'redirectTo'
        // method = 'reLaunch'
        // console.log('redirectTo======')
      }
      else {
        method = method
      }
      console.log("jumpUrl=============",pages.length,method,Taro.getCurrentPages())
      Taro[method]({
        url
      })
    }
  }
}
