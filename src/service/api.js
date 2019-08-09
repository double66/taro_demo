import Taro from '@tarojs/taro'
import { HTTP_STATUS } from '../const/status'
import { logError } from '../utils'
import { getAccessToken} from '../utils/common'
import { base } from './config'
import {login} from './login'
import {getGlobalData} from "./global_data";

export default {
  async baseOptions(params, method = 'GET') {
    let { url, data, needTaken } = params
    let token = ''
    if(needTaken){
      // token = getGlobalData('token')
      // if(!token){
      //   await login()
      //   token = getGlobalData('token')
      // }
    }
    let accesstoken = getAccessToken();
    // console.log('accessToken',accesstoken);
    // console.log('params', params)
    let contentType = 'application/x-www-form-urlencoded'
    contentType = params.contentType || contentType
    const option = {
      isShowLoading: false,
      loadingText: '正在加载',
      url: base+url,
      data: data,
      method: method,
      header: { 'content-type': contentType, 'token': token,'accesstoken':accesstoken },
      success() {

      },
      error(e) {
        logError('api', '请求接口出现问题', e)
      }
    }
    let res = await Taro.request(option);
    if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
      return logError('api', '请求资源不存在')
    } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
      return logError('api', '服务端出现了问题')
    } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
      return logError('api', '没有权限访问')
    } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
      return res.data
    }

  },
  get(url, data = '',needTaken=true) {
    let option = { url, data, needTaken }
    return this.baseOptions(option)
  },
  post: function (url, data, contentType, needTaken=true) {
    let params = { url, data, contentType, needTaken }
    return this.baseOptions(params, 'POST')
  },
}
