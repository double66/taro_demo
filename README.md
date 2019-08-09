README
===========================
taro_demo  基于taro（[git地址](https://github.com/NervJS/taro)  |  [文档地址](https://nervjs.github.io/taro/docs/README.html)）搭建基础框架  
taro+mobx

****
## 安装环境/运行命令 
首先 确保已安装 node 环境（>=8.0.0）   
#### cli 工具安装
npm install -g @tarojs/cli

（环境安装完成，downLoad项目到本地）

#### 安装依赖
npm install
#### 微信小程序
npm run dev:weapp   /  npm start
#### H5
npm run dev:H5


****
## taro UI 
[文档地址](https://taro-ui.aotu.io/#/docs/introduction)
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


