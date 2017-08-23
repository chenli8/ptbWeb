import React from 'react';
import layer from '../../../../public/js/layer';
import serviceApi from '../../../../public/js/serviceApi';
import Page from "../../../common/Page";
import {Component} from "react/lib/ReactBaseClasses";
import moment from 'moment-kirk';
import utils from "../../../../public/js/utils";
import OrderButtons from "../../../shop/order/OrderButtons";
import "../../../../public/css/sellerOrderList.css"
import urlManager from "../../../../public/js/urlManager";

class Item extends Component {

    onOrderDetail(orderInfo) {
        window.location.href = urlManager.pOrder + '#/OrderShow?orderId=' + orderInfo.orderid + '&userType=1&orderType=' + orderInfo.orderType;
    }

    refreshOrder(orderId) {
        var THIS = this
        this.postApi = serviceApi('aOrderDetailNew', {
            'orderId': orderId
        }, (data) => {
            THIS.setState({
                order: data
            })
        }, (data) => {
        });
    }

    onComplete(orderId, operate) {
        if ( operate == 'aOrderBuyerDelete') {
            layer.msg("刷新列表")
        } else {
            this.refreshOrder(orderId)
        }
    }

    render() {
        var order = this.props.order;
        var orderInfo = order.orderInfo;
        var userInfo = order.sellerInfo;
        var serviceInfo = order.serviceInfo;
        return (
            <li>
                <div className="orderInfo">
                    <div className="top">
                        <div className="orderNum fl">
                            订单号：<span>{orderInfo.orderNo}</span>
                        </div>
                        <div className="time fr">
                            {moment(orderInfo.createTime, "x").format('YYYY-MM-DD HH:mm')}
                        </div>
                    </div>
                    <div className="middle">
                        <div className="descCon fl">
                            <div
                                className="title">{serviceInfo && orderInfo.orderType === 3 ? serviceInfo.serviceName : '【需求签单】'}</div>
                            <div className="subTitle">{orderInfo.orderType === 3 ? '【服务派单】' : '【需求签单】'}</div>
                            <div className="desc">
                                {orderInfo.orderDesc}
                            </div>
                        </div>
                        <div className="priceCon fl">
                            <b dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceOne(orderInfo.buyerTotalPrice / 100, 0)}}></b>
                        </div>
                        <div className="statusCon fr">
                            <div className="orderStatus">
                                待确认
                            </div>
                            <div className="orderDetailBtn">
                                <a href="javascript:;" onClick={(order) => this.onOrderDetail(orderInfo)}>订单详情</a>
                            </div>
                            <div className="contactBuyer">
                                <a href="javascript:;">联系卖家</a>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="shopName fl">
                            <i className="ico-shop" style={{background:"url("+userInfo.userImage+")"}}></i>{userInfo.userName}
                        </div>
                        <div className="buttons fr">
                            <OrderButtons onComplete={this.onComplete.bind(this)} orderInfo={orderInfo}
                                          userType='1' classType="1"/>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

class NotEvaluatedOrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalNum: 0,
            start: 0,
            pageSize: 10,
            orderList: []
        }
    }

    componentDidMount() {
        this.getOrderList()
    }

    componentWillUnmount() {
        this.postApi.abort();
        /*组件卸载 停止ajax请求*/
    }

    onPageClick(start) {
        this.setState({
            start: start
        }, () => {
            this.getOrderList()
        })
    }

    getOrderList() {
        var THIS = this;

        var arr = [{
            "orderInfo": {
                "orderid": 4344,
                "orderDetailId": 4313,
                "orderNo": "JYPP170727164804000022",
                "orderStauts": 0,
                "sellerStatus": 0,
                "buyerStatus": 0,
                "originalPrice": 0,
                "payablePrice": 0,
                "sellerId": 572,
                "buyerId": 544,
                "createTime": 1501145284000,
                "orderDesc": "132",
                "payTime": 0,
                "button": "8,9",
                "orderStatusDesc": "待反馈",
                "updateTime": 1501145284000,
                "isPayByOther": 0,
                "payerId": null,
                "payByOtherStatus": 0,
                "isArbitration": 0,
                "arbitrationUserId": null,
                "refundPrice": 0,
                "arbitrationId": null,
                "arbitrationStatus": 0,
                "orderType": 3,
                "packagePrice": 0,
                "buyerPrepayPrice": 0,
                "buyerTotalPrice": 232300,
                "sellerPrepayPrice": null,
                "sellerTotalPrice": null,
                "needDesc": "132",
                "deliveryResults": null,
                "orderVersion": 2,
                "reminderCount": 0,
                "buyerDelStatus": 1,
                "sellerDelStatus": 1
            },
            "productInfo": null,
            "buyerInfo": {
                "userName": "181???",
                "phone": "18510508903",
                "userId": 544,
                "userLevel": 0,
                "userImage": "http://test.pintuibao.cn/image/5441481614371726.JPEG",
                "authType": "333",
                "bindMediaNum": 103,
                "userDealNum": 8,
                "applauseRage": 1.0,
                "goodCmt": null
            },
            "sellerInfo": {
                "userName": "181～462",
                "phone": null,
                "userId": 572,
                "userLevel": 0,
                "userImage": "http://test.pintuibao.cn/image/5721489029569244.JPEG",
                "authType": "100",
                "bindMediaNum": 0,
                "userDealNum": 0,
                "applauseRage": 0.0,
                "goodCmt": null
            },
            "otherBuyerInfo": {
                "userName": null,
                "phone": null,
                "userId": 0,
                "userLevel": 0,
                "userImage": null,
                "authType": "000",
                "bindMediaNum": 0,
                "userDealNum": 0,
                "applauseRage": 0.0,
                "goodCmt": null
            },
            "comment": null,
            "packageInfo": null,
            "serviceInfo": {
                "ownerId": 572,
                "serviceName": "18515588462的测试服务",
                "img": "https://www.baidu.com/img/bd_logo1.png",
                "price": null,
                "prepayType": 2,
                "desc": null,
                "status": 1,
                "minPrice": 1400000,
                "maxPrice": 15000000,
                "provinceCode": 110000,
                "cityCode": 110100,
                "serviceCategoryId": 1001000,
                "serviceCategoryIdTop": 1000000,
                "productId": 47486,
                "createTime": 1501125209000,
                "updateTime": 1501125209000,
                "shopId": 26,
                "serviceId": 17,
                "positiveNum": 0,
                "neutralNum": 0,
                "negativeNum": 0,
                "dealNum": 0
            },
            "answerInfo": {
                "answerId": 0,
                "maxPrice": 0,
                "minPrice": 0,
                "prepayType": 0,
                "requireNo": null,
                "userId": 0,
                "requireName": null
            },
            "orderArticle": null,
            "timeAxis": [
                {
                    "time": 1501145284000,
                    "actionDesc": "创建订单"
                }
            ],
            "orderOperationInfo": [
                {
                    "orderStatus": 0,
                    "actionDesc": "填写需求，签单"
                },
                {
                    "orderStatus": 1,
                    "actionDesc": "确认执行"
                },
                {
                    "orderStatus": 2,
                    "actionDesc": "验收并付款"
                },
                {
                    "orderStatus": 3,
                    "actionDesc": "评价"
                }
            ]
        }];

        layer.loading.open();
        this.postApi = serviceApi('auncommentorder', {
            start:0,
            end:10,
        }, (data) => {
            layer.loading.close();
            this.setState({
                totalNum: data.totalNum,
                orderList: data.list
            }, function () {
                if(THIS.state.orderList.length == 0){
                    THIS.setState({
                        totalNum: 50,
                        orderList: arr
                    })
                }
            });
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    render() {
        var state = this.state;
        return (
            <div className="orderList">
                <ul className="orderInfoList">
                    {
                        state.orderList ?
                            state.orderList.map((item) => {
                                return ( <Item order={item} key={item.orderInfo.orderid}/>)
                            })
                            :
                            null
                    }
                </ul>
                {
                    state.totalNum > state.pageSize ?
                        <Page totalNum={state.totalNum} pageSize={state.pageSize} start={state.start}
                              onPageClick={this.onPageClick.bind(this)}/> : null
                }
            </div>
        );
    }
}

export default NotEvaluatedOrderList;