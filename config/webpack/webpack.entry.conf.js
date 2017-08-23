/**
 * Created by Kirk liu on 2017/5/25.
 */
module.exports = {
    //首页
    index: ['./app/entry/index/index.js', '品推宝'],
    loginReg: ['./app/entry/loginReg/index.js', '注册登录'],
    //用户中心
    account:['./app/entry/user/account.js','帐号设置'],
    //案例
    demo: ['./app/entry/demo/index.js', '案例'],
    //服务大厅
    service: ['./app/entry/shop/serviceSupplier.js', '服务大厅'],
    serviceCreate: ['./app/entry/shop/service/create.js', '创建服务'],
    serviceDetail: ['./app/entry/shop/serviceDetail.js', '服务详情'],
    shopDetail: ['./app/entry/shop/shopDetail.js', '店铺详情'],
    //需求大厅
    demand:['./app/entry/shop/demand/index.js', '需求大厅'],
    demandCreate:['./app/entry/shop/demand/create.js', '创建需求'],
    demandDetail:['./app/entry/shop/demand/detail.js', '需求详情'],

    //新媒体
    mediaDetail:['./app/entry/shop/media/detail.js', '媒体详情'],
    mediaSearch:['./app/entry/shop/media/search.js', '新媒体'],

    //平台规则
    agreement:['./app/entry/doc/agreement.js', '平台规则'],

   //买家中心
    buyer:['./app/entry/user/buyer.js', '买家中心'],

   //卖家中心
    seller:['./app/entry/user/seller.js', '卖家中心'],

   //绑定银行卡页面
    bandBankCard:['./app/entry/user/bandBankCard.js', '绑定银行卡'],

    //订单相关
    order:['./app/entry/shop/orderDetail.js', '买家订单详情'],
    //店铺入驻
    createShop:['./app/entry/user/createShop.js', '店铺入驻'],

    onlinePayJump:['./app/entry/shop/onlinePayJump.js', '线上支付'],
    /*支付成功*/
    payRecharge:['./app/entry/shop/payRecharge.js', '支付成功'],
    // 关于
    about:['./app/entry/doc/about.js', '企业介绍'],
    notice:['./app/entry/static/notice.js', '公告'],
    help:['./app/entry/static/help.js', '帮助'],
    financial:['./app/entry/financial/index.js', '金融']
};
