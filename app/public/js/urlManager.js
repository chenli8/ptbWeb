import cookie from 'react-cookie'
var token = cookie.load('token');
var domain = '';
var cdn = '';
var postApi = (host, path) => {
    return host + path + '?token=' + token + '&time=' + Math.floor(new Date().getTime() / 60000);
};
var getUrl = (host, path) => {
    return host + path;
};

export default {
/*API 管理*/
    /*demo*/
    "aBanner_01": postApi(domain, "/common/bannerV2"), /*首页banner_01*/
    "aUploadPic": postApi(domain, "/api/u/iden/uploadpic"), /*上传图片*/
    "aUploadportrait": postApi(domain, "/u/uploadportrait"), /*上传头像*/
    /*用户中心*/
    "aUserInfo": postApi(domain, "/u/info"),/*用户基本信息*/
    "aLoginout": postApi(domain, "/u/logout"),/*退出*/
    "aLogin": postApi(domain, "/u/login"),/*登录*/
    "aLoginWp": postApi(domain, "/u/loginwp"),/*无密码登录 手机登录*/
    "aLoginWpvCode": postApi(domain, "/u/loginwpvcode"),/*无密码登录 手机登录 获取验证码*/
    "aRegVCode": postApi(domain, "/u/regvcode"),/*注册 发送手机验证码*/
    "aRegister": postApi(domain, "/u/register"),/*注册 手机注册*/
    "aUserInfoModify": postApi(domain, "/u/changeuserinfo"),/*用户呢陈及简介修改*/
    "aUserNickname": postApi(domain, "/u/changenickname"),/*用户呢陈及简介修改*/
    "aAuthStateInfo":postApi(domain, "/api/u/iden/getinfo"),/*用户认证信息*/
    "aUpdatepersonal":postApi(domain, "/api/u/iden/updatepersonal"),/*实名认证*/
    "aUpdateenterprise":postApi(domain, "/api/u/iden/updateenterprise"),/*企业认证*/
    "aUpdateposition": postApi(domain, "/api/u/iden/updateposition"), /*职位认证*/
    "aMessageList":postApi(domain, "/api/m/messagelist"),//查询消息列表
    "aBindPhoneVCode":postApi(domain, "/u/bindphonevcode"),//获取绑定手机验证码
    "aPayPasswordHas":postApi(domain, "/api/payPassword/haspaypwd"),//获取绑定手机验证码
    /*支付密码*/
    "aPayPasswordSCode":postApi(domain, "/api/payPassword/svcode"),//	短信验证码类型（1-首次设置发送  2-找回支付密码发送）
    "aPayPasswordVCode":postApi(domain, "/api/payPassword/vvcode"),//	短信验证码类型（1-设置支付密码  2-找回支付密码）
    "aPayPasswordSet":postApi(domain, "/api/payPassword/set"),//	短信验证码类型（1-设置支付密码  2-找回支付密码）
    /*登录密码*/
    "aLoginPasswordSVCode":postApi(domain, "/u/svcode"),//	设置 修改 登录密码  发送短信验证码
    "aLoginPasswordVVCode":postApi(domain, "/u/vvcode"),//	设置 修改 登录密码  验证短信验证码
    "aLoginPasswordSet":postApi(domain, "/u/findpassword"),//	设置登录密码
    /*修改手机号*/
    "aPhoneSCode":postApi(domain, "/u/changephonecode"),//用户修改手机号验证码获取
    "aPhoneVCode":postApi(domain, "/u/changephonevalidate"),//用户修改手机号验证旧手机号
    "aPhoneSet":postApi(domain, "/u/changephone"),//用户修改手机号验证


    /*需求 */
    "aDemandCreate": postApi(domain, "/api/require/create"),/*创建需求  */
    "aDemandUpload": postApi(domain, "/api/require/uploadannex"),/*上传需求附件 需求相关附件，不传默认0    0- 需求附件  1-应答附件*/
    "aDemandDeleteAnnex": postApi(domain, "/api/require/deleteannex"),/*删除需求附件*/
    "aDemandDetail": postApi(domain, "/api/require/detail"),/*需求详情*/
    "aDemandList": postApi(domain, "/api/require/list"),/*需求列表*/
    "aDemandSearch": postApi(domain, "/api/search/require"),/*需求搜索*/
    "aDemandClose": postApi(domain, "/api/require/close"),/*需求关闭*/
    "aDemandDel": postApi(domain, "/api/require/delete"),/*需求删除*/
    "aDemandUpdate": postApi(domain, "/api/require/update"),/*需求更新*/
    "aDemandAnswer": postApi(domain, "/api/require/answer"),/*应答需求*/
    "aDemandEnd": postApi(domain, "/api/require/end"),/*结束需求*/
    "aDemandShopList": postApi(domain, "/api/require/shoplist"),/*需求详情-已应答服务商列表*/
    "aDemandEdit": postApi(domain, "/api/require/edit"),/*修改需求*/
    "aDemandRecent": postApi(domain, "/api/require/recent"),/*首页信息需求*/
    "aDemandAnswerEdit": postApi(domain, "/api/require/answeredit"),/*编辑需求应答*/
    /*订单系统*/
    "aOrderBuyerCommit": postApi(domain, "/api/order/buyer/commit"),/*买家提交订单*/
    "aOrderDetailNew": postApi(domain, "/api/order/detailnew"),/*订单详情*/
    "aServiceDetail": postApi(domain, "/api/service/detail"),/*服务详情*/
    "aGetPreOrderInfo": postApi(domain, "/api/order/getpreorderinfo"),/*下单前获取服务或应答信息*/
    "aOrderBuyerCancel": postApi(domain, "/api/order/buyer/cancel"),/*买家取消订单*/
    "aOrderBuyerConfirmPrice": postApi(domain, "/api/order/buyer/confirmPrice"),/*买确认价格*/
    "aOrderBuyerConfirm": postApi(domain, "/api/order/buyer/confirm"),/*买家确认收货*/
    "aOrderBuyerDelete": postApi(domain, "/api/order/buyer/delete"),/*买家删除*/

    "aOrderSellerFeedback": postApi(domain, "/api/order/seller/feedback"),/*卖家反馈订单价格*/
    "aOrderSellerRefuse": postApi(domain, "/api/order/seller/refuse"),/*卖家拒单*/
    "aOrderSellerConfirm": postApi(domain, "/api/order/seller/confirm"),/*卖家投放完成*/
    "aOrderSellerUpdatedesc": postApi(domain, "/api/order/seller/updatedesc"),/*卖家修改执行放结果*/
    "aOrderSellerUpdateFinalPrice": postApi(domain, "/api/order/seller/updateFinalPrice"),/*卖家修改尾款*/
    "aOrderSellerRemindepay": postApi(domain, "/api/order/seller/remindepay"),/*卖家退款*/
    "aOrderSellerDelete": postApi(domain, "/api/order/seller/delete"),/*卖家删除*/
    "aOrderList": postApi(domain, "/api/order/listnew"),/*订单列表*/
    "aOrderPay": postApi(domain, "/api/rechargeOrder/add"),/*创建充值（支付）订单（线上充值返回加密参数）*/
    "aCommentOrder": postApi(domain, "/api/comment/publish"),/*发布评论*/
    "aReplayComment": postApi(domain, "/api/comment/reply"),/*回复评论*/



    /*店铺及服务*/
    "aServiceCreate": postApi(domain, "/api/service/create"),/*创建服务*/
    "aSupplierList": postApi(domain, "/api/shop/getshoplist"),/*店铺列表*/
    "aServiceList": postApi(domain, "/api/service/list"),/*服务列表*/
    "aShopServiceList": postApi(domain, "/api/service/shopService"),/*店铺服务列表*/
    "aShopCreate": postApi(domain, "/api/shop/create"),/*店铺入驻*/
    "aShopProgressquery": postApi(domain, "/api/shop/progressquery"),/*服务详情*/
    "aShopDetail": postApi(domain, "/api/shop/getinfocollectbyshopid"),/*服务详情*/
    "aShopRecent": postApi(domain, "/api/shop/newopenlist"),/*首页新开店*/
    "aGetshopinfo": postApi(domain, "/api/shop/getshopinfo"),/*获取店铺信息*/
    "aUpdateShopInfo": postApi(domain, "/api/shop/update"),/*修改店铺信息*/
    "aUpdateservice": postApi(domain, "/api/shop/updateservice"),/*修改店铺服务类别*/
    "aGetchangenamelog": postApi(domain, "/api/shop/getchangenamelog"),/*获取店铺名称修改日志*/
    "aServiceCommentList": postApi(domain, "/api/comment/productcommentlist"),/*服务评论列表*/
    "aServiceSearch": postApi(domain, "/api/search/service"),/*服务搜索*/
    "aSupplierSearch": postApi(domain, "/api/search/shop"),/*店铺搜索*/
    "aServiceMyServiceList": postApi(domain, "/api/service/myService"),/*卖家中心-我的服务列表（服务管理）*/
    "aShopCategoryList": postApi(domain, "/api/service/shopCategoryList"),/*获取商铺服务类别列表，用于创建服务*/

    //媒体中心
    "aMediaDetail": postApi(domain, "/media/detail"),//媒体详情
    "aMediaArticleList": postApi(domain, "/media/articlelist"),//媒体文章列表
    "aTypeListV2":postApi(domain, "/media/typelistV2"),//媒体推荐
    //媒体中心 搜索结果
    "aSearchWxComplex":postApi(domain, "/media/search/wxcomplex"),
    "aSearchWbComplex":postApi(domain, "/media/search/wbcomplex"),
    "aSearchZbComplex":postApi(domain, "/media/search/livecomplex"),

    //买家中心
    "auncommentorder": postApi(domain, "/api/comment/uncommentorderlist"),/*未评价订单*/
    "acomment": postApi(domain, "/api/comment/productcommentlist"),/*评价订单*/
    "aUsercollectshop": postApi(domain, "/api/shop/getusercollectshop"),/*买家收藏店铺*/
    "amyStoreService": postApi(domain, "/api/service/myStoreService"),/*买家收藏服务*/
    "acooperationlist": postApi(domain, "/api/shop/cooperationlist"),/*买家合作过的店铺*/
    "arequirelist": postApi(domain, "/api/u/buyer/requirelist"),/*买家需求*/
    "account": postApi(domain, "/api/account/queryInfo"),/*个人账户*/
    "queryList": postApi(domain, "/api/account/queryList"),/*交易记录*/
    "querydetail": postApi(domain, "/api/account/querydetail"),/*交易记录详情*/
    "txdetail": postApi(domain, "/api/account/txdetail"),/*提现记录详情*/

   //卖家中心
    "abankcard": postApi(domain, "/api/account/bankcard"),/*银行卡信息*/
    "aBindbankcard": postApi(domain, "/api/account/bindbankcard"),/*绑定银行卡*/
    "aWithdrawcash": postApi(domain, "/api/account/withdrawcash"),/*提现申请*/
    "aNswerlist": postApi(domain, "/api/u/seller/answerlist"),/*卖家需求应答*/
    "aCollectrequire": postApi(domain, "/api/u/seller/collectrequirelist"),/*卖家收藏需求*/
    "amyService": postApi(domain, "/api/service/myService"),/*服务管理*/
    "aTxlist": postApi(domain, "/api/order/seller/txlist"),/*可提现订单列表*/

    //金融
    "aFinanceCreateOrderLoan": postApi(domain, "/api/finance/createOrderLoan"),/*创建订单(项目)贷款*/
    "aFinanceCreateFactoringApply": postApi(domain, "/api/finance/createFactoringApply"),/*创建保理申请*/

    /*其他*/
    "aCollection": postApi(domain, "/u/store"),/*收藏*/
    "aCommonBlock": postApi(domain, "/common/block"),/*块接口*/
    "aDelCollection": postApi(domain, "/u/delStore"),/*取消收藏*/
    "aCategoryList": postApi(domain, "/api/service/categoryList"),/*分类*/
    "aRegionList": postApi(domain, "/api/service/regionList"),/*地域列表 */
    "aRegionListCommon": postApi(domain, "/api/service/region/commonlyUsedList"),/*常用地区列表 */
    "aUploadCommon": postApi(domain, "/common/uploadportrait"),/*上传图片 再具体接口处 &type=  0:media_group 1:article_group 6.上传商铺封面图片 7.上传服务封面地址 */
    "aURegImgCode": postApi(domain, "/u/regImgCode"),/*获取图片验证码 */
    "aThirdBindPhone": postApi(domain, "/u/thirdbindphone"),/* 第三方授权提交绑定手机请求-未登陆状态 */
    "aUnBindThirdAccount": postApi(domain, "/u/unbindthirdaccount"),/* 解绑用户绑定的微信、微博、QQ */

/*页面管理*/
    "pIndex": getUrl(cdn, "index.html" + "?" + new Date().getTime()),//登录首页
    "pLoginReg": getUrl(cdn, "loginReg.html"),//登录页
    "pAccount": getUrl(cdn, "account.html"),//帐号设置
    "pService": getUrl(cdn, "service.html"),//服务大厅
    "pDemand": getUrl(cdn, "demand.html"),//需求大厅
    "pDemandDetail": getUrl(cdn, "demandDetail.html"),//需求详情
    "pDemandCreate": getUrl(cdn, "demandCreate.html"),//需求创建
    "pAgreement": getUrl(cdn, "agreement.html"),//平台规则
    "pOrder": getUrl(cdn, "order.html"),//订单
    "pServiceDetail": getUrl(cdn, "serviceDetail.html"),//服务详情
    "pShopDetail": getUrl(cdn, "shopDetail.html"),//店铺详情
    "pBuyerCenter": getUrl(cdn, "buyer.html"),//买家中心
    "pSellerCenter": getUrl(cdn, "seller.html"),//卖家中心
    "pCreateShop": getUrl(cdn, "createShop.html"),//创建店铺
    "pOnlinePayJump": getUrl(cdn, "onlinePayJump.html"),//支付宝和银联
    "pServiceCreate": getUrl(cdn, "serviceCreate.html"),//发布服务
    "pBandBankCard": getUrl(cdn, "bandBankCard.html"),//绑定银行卡
    "pAbout": getUrl(cdn, "about.html"),//关于,
    "pNotice": getUrl(cdn, "notice.html"),//公告,
    "pHelp": getUrl(cdn, "help.html"),//教程,
    "pMediaDetail":getUrl(cdn, "mediaDetail.html"),//媒体详情页,
    "pMediaSearch":getUrl(cdn, "mediaSearch.html"),//媒体搜索页,
    "pFinancial":getUrl(cdn, "financial.html"),//金融,

};