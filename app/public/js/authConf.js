/**
 * Created by Kirk liu on 2017/8/22.
 */
import cookie from 'react-cookie'

/*微信登录*/

const urlHost = window.location.protocol + '//' + window.location.host;
const urlOnline = window.location.host.indexOf('www') !== -1 ? urlHost : 'http://www.pintuibao.cn';
/*type 0 授权登录  1 绑定 ||  0微信 1qq 2微博*/
const weiXin = (type) => {
    let appId = 'wxdfd6458cfec3b768',
        apiService = urlOnline + '/u/thirdAuth?platform=pc&thirdPlatform=0&type=' + type + (type ? '&token=' + cookie.load('token') : '') + '&',
        returnUrl = 'returnUrl=' + (type ? (urlHost + '/account.html?bind=0') : (urlHost + '/index.html?LoginSource=wx')) + '&',
        bindPhoneUrl = 'bindPhoneUrl=' + urlHost + '/loginReg.html?',
        redirect_uri = encodeURIComponent(apiService + returnUrl + bindPhoneUrl),
        urlConf = {
            appId: appId,
            redirect_uri: redirect_uri,
            response_type: 'code',
            scope: "snsapi_login",
            state: '',
            other: '#wechat_redirect'
        };
    return 'https://open.weixin.qq.com/connect/qrconnect?'
        + 'appid=' + urlConf.appId
        + '&redirect_uri=' + urlConf.redirect_uri
        + '&response_type=' + urlConf.response_type
        + '&scope=' + urlConf.scope
        + '&state=' + urlConf.state
        + urlConf.other
};
const qq = (type) => {
    let appId = '101419461',
        apiService = urlOnline + '/u/thirdAuth?platform=pc&thirdPlatform=1&type=' + type + (type ? '&token=' + cookie.load('token') : '') + '&',
        returnUrl = 'returnUrl=' + (type ? (urlHost + '/account.html?bind=0') : (urlHost + '/index.html?LoginSource=wx')) + '&',
        bindPhoneUrl = 'bindPhoneUrl=' + urlHost + '/loginReg.html?',
        redirect_uri = encodeURIComponent(apiService + returnUrl + bindPhoneUrl),
        urlConf = {
            appId: appId,
            redirect_uri: redirect_uri,
            response_type: 'code',
            scope: ""
        };
    return 'https://graph.qq.com/oauth2.0/authorize?'
        + 'client_id=' + urlConf.appId
        + '&redirect_uri=' + urlConf.redirect_uri
        + '&response_type=' + urlConf.response_type
        + '&scope=' + urlConf.scope
};
export default {
    weiXin: weiXin,
    qq: qq
}