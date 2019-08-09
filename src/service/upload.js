import Taro, { Component } from '@tarojs/taro'

const base64 = require('./upload/Base64.js');//Base64,hmac,sha1,crypto相关算法
require('./upload/hmac.js');
require('./upload/sha1.js');
const Crypto = require('./upload/crypto.js');

export async function uploadImg (filePath,type) {
  if(!filePath){
    Taro.showModal({
      title:'',
      content:'图片错误，请重试',
      showCancel:false,
    })
    return;
  }
  Taro.showLoading({
    title: '上传中'
  })

  //oss上传文件夹路径
  const myDate = new Date()
  const date = myDate.getDate()<10 ? '0'+myDate.getDate() : myDate.getDate()
  const month = myDate.getMonth()+1 <10 ? '0'+(myDate.getMonth()+1) : myDate.getMonth()+1
  const nowDate = myDate.getFullYear() +""+ month +""+ date
  const houzui = type?type.split('/').pop():filePath.split('.').pop()
  const fileName = new Date().getTime()+Math.floor(Math.random() * 1000)+"."+houzui
  const fileKey = 'upload/' + nowDate + '/'+fileName
  console.log(type,houzui)
  //失效时间
  let dateNow = new Date();
  const timeout = 80000
  dateNow.setHours(dateNow.getHours() + timeout);
  let srcT = dateNow.toISOString();
  var policyText = {
    "expiration": srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    "conditions": [
      ["content-length-range", 0, 20480000] // 设置上传文件的大小限制 20M
    ]
  };
  //key
  const aliyunServerURL = 'https://OSS地址/';//OSS地址，需要https
  const accesskey= 'accesskey'; // accesskey
  const accessid = 'accessid'; // accessid
  const policyBase64 = base64.encode(JSON.stringify(policyText));
  const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, { asBytes: true }) ;
  const signature = Crypto.util.bytesToBase64(bytes);//获取签名
  //uploadFile
  const option ={
    url: aliyunServerURL,
    filePath: filePath,
    name: 'file',
    formData: {
      name: filePath,
      key: fileKey,
      policy: policyBase64,
      OSSAccessKeyId: accessid,
      success_action_status: "200", //让服务端返回200,不然，默认会返回204
      signature: signature,
    },
    success: (respon)=>{
      Taro.hideLoading()
      if (respon.statusCode != 200) {
        Taro.showModal({
          title: '',
          content: '上传图片最大大小为20M，您上传的图片超过最大大小，请压缩后再次上传',
          showCancel: false,
        })
        console.log(new Error('上传错误:' + JSON.stringify(respon)))
        return;
      }
      console.log('success:'+JSON.stringify(respon));
    },
    fail: (err)=>{
      //在h5端 会依次执行success和fail，加载体判断，在小程序的时候加fail事件
      if(process.env.TARO_ENV === "weapp"){
        Taro.showModal({
          title: '',
          content: '上传错误,请重试',
          showCancel: false,
        })
        console.log('fail:'+JSON.stringify(err));
      }
    }
  }

  let res=await Taro.uploadFile(option);
  if(res.statusCode == 200) return fileKey
  else return
}
