import Taro, { Component } from '@tarojs/taro'
// import api from './api'
// import { setGlobalData ,getGlobalData } from './global_data'

export const login =function () {
  return new Promise((resolve, reject)=>{
    if(process.env.TARO_ENV === "weapp"){
    //  小程序登录
    }
    else if(process.env.TARO_ENV === "h5"){
    //  H5登录
    }
    resolve()
  })
}

