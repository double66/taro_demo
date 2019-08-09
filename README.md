README
===========================
taro_demo  基于taro搭建基础框架    
taro+mobx

****
## taro UI
```
// app.js
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
```
组件样式已全局引入，后续使用无需再单独引入

****
## 富文本
【仅限小程序端】具体使用参考 pages/wxParse/index  
转化之后的图片地址是相对地址，在小程序中是无法显示的，所以需要到html2json.js文件中加上图片的域名地址
```diff
//对img添加额外数据
if (node.tag === 'img') {
    node.imgIndex = results.images.length;
+ var imgUrl = '域名地址' + node.attr.src;
- var imgUrl = node.attr.src;
    if (imgUrl[0] == '') {
        imgUrl.splice(0, 1);
    }
    imgUrl = wxDiscode.urlToHttpUrl(imgUrl, __placeImgeUrlHttps);
    node.attr.src = imgUrl;
    node.from = bindName;
    results.images.push(node);
    results.imageUrls.push(imgUrl);
}
```


****
## Api

参数  | 说明 | 默认值 |
--------- | --------| --------|
url  | 请求地址 | 无；必填 |
data  | 请求参数 | 无 |
needTaken  | 是否需要token | true |

****
## upload
调用oss上传，使用的时候需要修改aliyunServerURL、accesskey、accessid值，具体值登录阿里获取
```
//定义上传路径，此处upload仅做测试，在项目使用时请根据项目要求做修改
const fileKey = 'upload/' + nowDate + '/'+fileName
```

****
## navigate
非tabbar页面跳转，防止页面栈溢出


