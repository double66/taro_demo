var MD5Encode = require("./MD5Encode");
export const promisify = (func, ctx) => {
  // 返回一个新的function
  return function () {
    // 初始化this作用域
    var ctx = ctx || this;
    // 新方法返回的promise
    return new Promise((resolve, reject) => {
      // 调用原来的非promise方法func，绑定作用域，传参，以及callback（callback为func的最后一个参数）
      func.call(ctx, ...arguments, function () {
        // 将回调函数中的的第一个参数error单独取出
        var args = Array.prototype.map.call(arguments, item => item);
        var err = args.shift();
        // 判断是否有error
        if (err) {
          reject(err)
        } else {
          // 没有error则将后续参数resolve出来
          args = args.length > 1 ? args : args[0];
          resolve(args);
        }
      });
    })
  };
};

// 下载图片
export const downLoadImg = (imgurl, msg) => {
  return new Promise((resolve, reject) => {
    let that = this
    // util.showToast(msg + 'download...')
    wx.downloadFile({
      url: imgurl,
      complete: function (res) {
        console.log(res)
        if (res.statusCode === 200) {
          resolve(res.tempFilePath)
        } else {
          console.log('downloadstatusCode', res)
          reject(new Error(res))
        }
      },
      fail: function (res) {
        console.log('downloadFilefail', res)
      }
    })
  })
}

export const promiseImage = (url) => {
  return new Promise(function (resolve, reject) {
    resolve(url)
  })
}

export const isChinese = (str) => {
  if (escape(str).indexOf("%u") < 0) return false
  return true
}

export const handleName = (str) => {
  let res = emoj2str(str)
  if (isChinese(res)) {
    res = res.length > 4 ? res.slice(0, 4) + '...' : res
  } else {
    res = res.length > 7 ? res.slice(0, 7) + '...' : res
  }
  return res
}

export const emoj2str = (str) => {
  return unescape(escape(str).replace(/\%uD.{3}/g, ''))
}
/*获取当前页url*/
export const getCurrentPageUrl = () => {
  let pages = getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url
}

export const getSysteminfo = () => {
  try {
    let deviceInfo = wx.getSystemInfoSync()
    const device = JSON.stringify(deviceInfo)
  } catch (e) {
    console.error('not support getSystemInfoSync api', err.message)
  }
  return device
}

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



export const  getAccessToken = () => {
  const data = new Date();
  const accessStr = Date.parse(data)/1000+'_'+MD5Encode.hexMD5(data.Format("yyyyMMdd")+'_yc_api_key');
//  console.log(data.Format("yyyyMMdd")+'_yc_api_key');
  // console.log(accessStr);
  // return datestr;
  return Base64.encode(accessStr);

}


export const  Base64 = {
	_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	encode: function(e) {
		var t = "";
		var n, r, i, s, o, u, a;
		var f = 0;
		e = Base64._utf8_encode(e);
		while (f < e.length) {
			n = e.charCodeAt(f++);
			r = e.charCodeAt(f++);
			i = e.charCodeAt(f++);
			s = n >> 2;
			o = (n & 3) << 4 | r >> 4;
			u = (r & 15) << 2 | i >> 6;
			a = i & 63;
			if (isNaN(r)) {
				u = a = 64
			} else if (isNaN(i)) {
				a = 64
			}
			t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
		}
		return t
	},
	decode: function(e) {
		var t = "";
		var n, r, i;
		var s, o, u, a;
		var f = 0;
		e = e.replace(/[^A-Za-z0-9+/=]/g, "");
		while (f < e.length) {
			s = this._keyStr.indexOf(e.charAt(f++));
			o = this._keyStr.indexOf(e.charAt(f++));
			u = this._keyStr.indexOf(e.charAt(f++));
			a = this._keyStr.indexOf(e.charAt(f++));
			n = s << 2 | o >> 4;
			r = (o & 15) << 4 | u >> 2;
			i = (u & 3) << 6 | a;
			t = t + String.fromCharCode(n);
			if (u != 64) {
				t = t + String.fromCharCode(r)
			}
			if (a != 64) {
				t = t + String.fromCharCode(i)
			}
		}
		t = Base64._utf8_decode(t);
		return t
	},
	_utf8_encode: function(e) {
		e = e.replace(/rn/g, "n");
		var t = "";
		for (var n = 0; n < e.length; n++) {
			var r = e.charCodeAt(n);
			if (r < 128) {
				t += String.fromCharCode(r)
			} else if (r > 127 && r < 2048) {
				t += String.fromCharCode(r >> 6 | 192);
				t += String.fromCharCode(r & 63 | 128)
			} else {
				t += String.fromCharCode(r >> 12 | 224);
				t += String.fromCharCode(r >> 6 & 63 | 128);
				t += String.fromCharCode(r & 63 | 128)
			}
		}
		return t
	},
	_utf8_decode: function(e) {
		var t = "";
		var n = 0;
		var r = c1 = c2 = 0;
		while (n < e.length) {
			r = e.charCodeAt(n);
			if (r < 128) {
				t += String.fromCharCode(r);
				n++
			} else if (r > 191 && r < 224) {
				c2 = e.charCodeAt(n + 1);
				t += String.fromCharCode((r & 31) << 6 | c2 & 63);
				n += 2
			} else {
				c2 = e.charCodeAt(n + 1);
				c3 = e.charCodeAt(n + 2);
				t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
				n += 3
			}
		}
		return t
	}
}



Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3),  //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) 
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}