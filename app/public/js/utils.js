import $ from 'jquery';
/*百度统计*/
var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?163d813a156e2a8d8661d6a44862e43b";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
/* 请求方法 */
var request = function () {
    function defaultError(errorCode) {
        return {"result": false, "statusCode": -1}
    }

    function printErrorInfo(data, status, xhr) {
        console.log(data);
        console.log(status);
    }

    function ajax(url, method, data, successCB, errorCB) {
        var dataJson = {
            "channelId": "8080",
            "clientType": "ptb",
            "deviceNo": "8080",
            "deviceType": "pc",
            "resolution": "",
            "version": "4.0.0",
            "data": data
        };
        return $.ajax({
            type: method,
            url: url,
            cache: false,
            dataType: "json",
            data: JSON.stringify(dataJson),
            contentType: 'application/json; charset=utf-8',
            success: function (data, status, xhr) {
                if (data.code == 0) {
                    successCB(data, status, xhr)
                } else {
                    if (errorCB != null) {
                        errorCB(data, status, xhr)
                    }
                }
            },
            error: function (data, status, xhr) {
                printErrorInfo(data, status, xhr);
                if (errorCB != null) {
                    errorCB(defaultError(status), status, xhr)
                }
            }
        });
    }

    function get(url, data, successCB, errorCB) {
        return ajax(url, "get", data, successCB, errorCB);
    }

    function post(url, data, successCB, errorCB) {
        return ajax(url, "post", data, successCB, errorCB);
    }

    return {
        "get": get,
        "post": post
    }

}();
/*截取URL参数*/
var urlParam = (name, url) => {
    var reg = new RegExp(".*[&\?]" + name + "=([^&]*)(&|$)");
    if (url == null) {
        var r = window.location.search.match(reg);
    } else {
        var r = url.match(reg);
    }
    if (r != null) return decodeURIComponent(r[1]);
    return null;
};
/*跳转*/
var redirect = (address) => {
    window.location.href = address;
};
/*登录后跳转*/
var loginReturnUrl = () => {
    window.location.href = 'loginReg.html?returnUrl=' + encodeURIComponent(window.location.href);
};
/*是否为空*/
var isNull = (str) => {
    return str == null || str == "";
};
/*统计中英文数量*/
var getBytesCount = (str) => {
    var bytesCount = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (/^[\u0000-\u00ff]$/.test(c)) //匹配双字节
        {
            bytesCount += 0.5;
        }
        else {
            bytesCount += 1;
        }

    }
    return bytesCount;
}
/*判断是手机端还是电脑端*/
var isPhone = () => {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        return true;
    } else {
        return false;
    }
}
/*验证身份证*/
var isCardId = (str) => {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
}
/*判断是否是手机号*/
var isMobile = (val) => {
    var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    return reg.test(val);
}
/*判断是否是邮箱*/
var isEmail = (val) => {
    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{1,4})+$/;
    return reg.test(val);
}
/*判断上传文件是否合法*/
var isUploadFile = (val, arr) => {
    var extStart = val.lastIndexOf('.');
    var ext = val.substring(extStart, val.length).toLowerCase();
    var release = false;
    arr.map(function (data) {
        if (data == ext) {
            release = true;
            return;
        }
    });
    return release;
}
/*判断价格是否合法*/
var priceIsOk = (price) => {
    var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    if (reg.test(price)) {
        return true;
    } else {
        return false
    }
}
/*页面title*/
var documentTitle = (arr) => {
    var title = document.title;
    var str = '';
    if (typeof arr === 'object') {
        str = arr.join('_');
    } else {
        str = arr;
    }
    document.title = str + '_' + title;
}
/*只能输入数字 替换后 光标在原来位置*/
let inputNum = (e) => {
    e.target.value.replace(/\D/g, function (char, index, val) {
        e.target.value = val.replace(/\D/g, "");
        var rtextRange = null;
        if (e.target.setSelectionRange) {
            e.target.setSelectionRange(index, index);
        } else {//支持ie
            rtextRange = e.target.createTextRange();
            rtextRange.moveStart('character', index);
            rtextRange.collapse(true);
            rtextRange.select();
        }
    });
}
/*替换字符串中的URL*/
let strURLReplace = (str) => {
    let strRegex = '((https|http)://)[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+';
    let regex = new RegExp(strRegex, "gi");

    let replaceReg = (reg, str) => {
        return str.replace(reg, function (m) {
            return '<a href="' + m + '" target="_blank">' + m + '</a>';
        });
    };
    str = replaceReg(regex, str);
    return str;
};
/*星号生成*/
let asterisk = (num) => {
    let returnVal = '';
    for (let i = 0; i < num; i++) {
        returnVal += '*'
    }
    return returnVal;
};
/*转价格*/
let toFixedNumPriceOne = (num, start) => {
    var returnVal = '<span class="no">暂无报价</span>';
    var startStr = '';
    if (start) {
        startStr = '<b>起</b>';
    }
    if (num) {
        returnVal = '<i class="sub">¥</i>' + Math.abs(num.toFixed(2))+ startStr;
    }
    return returnVal;
};
let toFixedNumPriceTwo = (num) => {
    if (num) {
        return '<i class="sub">¥</i>' + Math.abs(num.toFixed(2));
    }
    return '<i class="sub">¥</i>' + 0;
};
/*个人账户*/
let toDecimal2 = (x) => {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}
/*好评率*/

let getGoodNum = (g, m, b) => {
    var total = g + m + b;
    if (g == 0) {
        return 0 + "%"
    } else {
        return (g / total) * 100 + "%"
    }
};
/*几天前*/
let timeBefore = (now, time) => {
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let halfamonth = day * 15;
    let month = day * 30;

    let diffValue = now - time;
    if (diffValue < 0) {
        //若日期不符则弹出窗口告之
        //alert("结束日期不能小于开始日期！");
    }
    let monthC = diffValue / month;
    let weekC = diffValue / (7 * day);
    let dayC = diffValue / day;
    let hourC = diffValue / hour;
    let minC = diffValue / minute;
    let result = '';
    /*下面的空字符串 是发表于 */
    if (monthC >= 1) {
        result = "" + parseInt(monthC) + "个月前";
    }
    else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
    }
    else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
    }
    else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "个小时前";
    }
    else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
    } else
        result = "刚刚";
    return result;
};
/*价格控制*/
let priceOnKeyUp = (th) => {
    let regStrs = [
        ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
        ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
        ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
        ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
    ];
    for (let i = 0; i < regStrs.length; i++) {
        let reg = new RegExp(regStrs[i][0]);
        th.value = th.value.replace(reg, regStrs[i][1]);
    }
};
let priceOnBlur = (th) => {
    let v = th.value;
    if (v === '') {
        v = '0.00';
    } else if (v === '0') {
        v = '0.00';
    } else if (v === '0.') {
        v = '0.00';
    } else if (/^0+\d+\.?\d*.*$/.test(v)) {
        v = v.replace(/^0+(\d+\.?\d*).*$/, '$1');
        v = inp.getRightPriceFormat(v).val;
    } else if (/^0\.\d$/.test(v)) {
        v = v + '0';
    } else if (!/^\d+\.\d{2}$/.test(v)) {
        if (/^\d+\.\d{2}.+/.test(v)) {
            v = v.replace(/^(\d+\.\d{2}).*$/, '$1');
        } else if (/^\d+$/.test(v)) {
            v = v + '.00';
        } else if (/^\d+\.$/.test(v)) {
            v = v + '00';
        } else if (/^\d+\.\d$/.test(v)) {
            v = v + '0';
        } else if (/^[^\d]+\d+\.?\d*$/.test(v)) {
            v = v.replace(/^[^\d]+(\d+\.?\d*)$/, '$1');
        } else if (/\d+/.test(v)) {
            v = v.replace(/^[^\d]*(\d+\.?\d*).*$/, '$1');
            ty = false;
        } else if (/^0+\d+\.?\d*$/.test(v)) {
            v = v.replace(/^0+(\d+\.?\d*)$/, '$1');
            ty = false;
        } else {
            v = '0.00';
        }
    }
    th.value = v;
};
let priceCents = (val) => {
    if (val) {
        return val * 100
    } else {
        return '';
    }
};
let priceDollars = (val) => {
    if (val) {
        return (val / 100).toFixed(2)
    } else {
        return ''
    }
};
/*防盗链iframe*/
parent.imgSrc = {};
let showImg = (url, width, height, key) =>{
    let id = 'imgIfr' + key;
    parent.imgSrc[id] = '<img src=\'' + url + '\' style="width:100%;height:100%; display:block;position:absolute;left:0;top:0;"/>';
    return '<iframe src="javascript:parent.imgSrc[\'' + id + '\'];" frameBorder="0" scrolling="no" style="width:' + width + ';height:' + height + ';overflow: hidden;"></iframe>';
}
export default {
    "get": request.get,
    "post": request.post,
    "urlParam": urlParam,
    "redirect": redirect,
    "loginReturnUrl": loginReturnUrl,
    "isNull": isNull,
    "getBytesCount": getBytesCount,
    "isPhone": isPhone,
    "isCardId": isCardId,
    "isMobile": isMobile,
    "isEmail": isEmail,
    "isUploadFile": isUploadFile,
    "priceIsOk": priceIsOk,
    "documentTitle": documentTitle,
    "inputNum": inputNum,
    "asterisk": asterisk,
    "toFixedNumPriceOne": toFixedNumPriceOne,
    "toFixedNumPriceTwo": toFixedNumPriceTwo,
    "strURLReplace": strURLReplace,
    "toDecimal2": toDecimal2,
    "getGoodNum": getGoodNum,
    "timeBefore": timeBefore,
    "priceOnKeyUp": priceOnKeyUp,
    "priceOnBlur": priceOnBlur,
    "priceCents": priceCents,
    "priceDollars": priceDollars,
    "showImg": showImg
}



