import React from 'react'
import OrderResult from "./OrderResult";
import OrderButtons from "../order/OrderButtons";
import OrderNotes from "./OrderNotes";
import OrderStatus from "./OrderStatus";
import OrderProductUserInfo from "./OrderProductUserInfo";

import layer from '../../../public/js/layer';
import serviceApi from '../../../public/js/serviceApi';
import utils from '../../../public/js/utils'


class OrderShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showHasPay:false,
            order: ''
        }
        this.orderId = ''
    }

    getOrderDetail() {
        layer.loading.open();
        this.postApi = serviceApi('aOrderDetailNew', {
            'orderId': this.orderId
        }, (data) => {
            layer.loading.close();
            this.setState({
                order: data
            });

        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    componentWillMount() {
        this.orderId = utils.urlParam('orderId', this.props.location.search);
        this.userType = utils.urlParam('userType', this.props.location.search);
        this.orderType = utils.urlParam('orderType', this.props.location.search);
    }

    componentDidMount() {
        this.getOrderDetail();
    }

    onComplete(orderId, operate) {
        if (operate == 'aOrderSellerDelete' || operate == 'aOrderBuyerDelete') {
            history.back();
        } else {
            this.getOrderDetail()
        }
    }

    render() {
        var order = this.state.order;
        var orderInfo = order.orderInfo;
        return (
            <div>
                {order ?
                    <div>
                        <OrderStatus orderInfo={orderInfo} userType={this.userType}/>
                        <OrderProductUserInfo serviceInfo={order.serviceInfo}
                                              userInfo={this.userType == 1 ? order.sellerInfo : order.buyerInfo}
                                              answerInfo={order.answerInfo} isOrderSubmit={false} shopInfo={order.shopInfoVO}/>
                        <div className="orderShow fl">
                            <div className="title">订单号：</div>
                            <div className="subTitle">{orderInfo.orderNo}</div>
                            {orderInfo.statusType !== 2 ?
                                <div>
                                    <div className="title">订单金额：</div>
                                    <div className="subTitle price clear">
                                        <div className="fl">
                                            {orderInfo.sellerTotalPrice > 0 ? "￥"+orderInfo.sellerTotalPrice / 100 : "￥"+orderInfo.buyerTotalPrice / 100}
                                        </div>
                                        {
                                            orderInfo.statusType==9 ?
                                                <div className="hasPayCon"
                                                     onMouseEnter={() => {
                                                         this.setState({showHasPay: true})
                                                     }}
                                                     onMouseLeave={() => {
                                                         this.setState({showHasPay: false})
                                                     }}>
                                                    <i className="ico-trues fl"></i>
                                                    {
                                                        this.state.showHasPay ?
                                                            <span>已付款</span>
                                                            :
                                                            null
                                                    }
                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                                    {orderInfo.buyerPrepayPrice ?
                                        <div>
                                            <div className="title">预付金额：</div>
                                            <div className="subTitle price clear">
                                              <div className="fl">
                                                  ￥{orderInfo.sellerPrepayPrice > 0 ? orderInfo.sellerPrepayPrice / 100 : orderInfo.buyerPrepayPrice / 100}
                                              </div>
                                                {
                                                    (orderInfo.statusType > 4 && orderInfo.statusType <= 9) ?
                                                        <div className="hasPayCon"
                                                             onMouseEnter={() => {
                                                                 this.setState({showHasPay: true})
                                                             }}
                                                             onMouseLeave={() => {
                                                                 this.setState({showHasPay: false})
                                                             }}>
                                                            <i className="ico-trues fl"></i>
                                                            {
                                                                this.state.showHasPay ?
                                                                    <span>已付款</span>
                                                                    :
                                                                    null
                                                            }
                                                        </div>
                                                        :
                                                        null
                                                }
                                            </div>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                :
                              <div className="allPrice">
                                  <div className="titless">
                                      <div className="fl originPrice">原订单价格</div>
                                      <div className="fl">卖家反馈价格</div>
                                  </div>
                                 <ul>
                                     <li>
                                         <div>订单金额</div>
                                         <div>￥{orderInfo.buyerTotalPrice / 100}</div>
                                         <div>{orderInfo.buyerTotalPrice === orderInfo.sellerTotalPrice ? "接受订单价格" : "￥"+orderInfo.sellerTotalPrice / 100}</div>
                                     </li>
                                     {orderInfo.buyerPrepayPrice ?
                                         <li>
                                             <div>预付金额</div>
                                             <div>￥{orderInfo.buyerPrepayPrice / 100}</div>
                                             <div>{orderInfo.buyerPrepayPrice === orderInfo.sellerPrepayPrice ? "接受预付价格" : "￥"+orderInfo.sellerPrepayPrice / 100}</div>
                                         </li>
                                         :
                                         null
                                     }
                                 </ul>
                              </div>
                            }
                            <div className="title">需求描述：</div>
                            <div className="subTitle">
                                {orderInfo.orderDesc}
                            </div>
                        </div>
                        {orderInfo.deliveryResults ? <OrderResult result={orderInfo.deliveryResults}/> : null}
                        <OrderButtons onComplete={this.onComplete.bind(this)} orderInfo={orderInfo}
                                      userType={this.userType}/>
                        {
                            (orderInfo.statusType == 6 && this.userType == 1) ?
                                <div className="goodsReceipt fr">
                                    确认收货则代表买卖双方对执行结果达成一致，对订单金额尾款支付无异议
                                </div>
                                    :
                                (orderInfo.statusType == 2 && this.userType == 1) ?
                                    <div className="goodsReceipt fr">
                                        确认执行代表双方确认需求和价格无误，可以开始执行
                                    </div>
                                    :
                                    null
                        }
                        <OrderNotes notes={order.timeAxis}/>
                    </div>
                    : null
                }
            </div>

        );
    }

    componentWillUnmount() {
        this.postApi.abort();
        /*组件卸载 停止ajax请求*/
    }
}

export default OrderShow;