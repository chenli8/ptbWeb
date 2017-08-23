import React from 'react'
import layer from '../../../public/js/layer';
import serviceApi from '../../../public/js/serviceApi';
import urlManager from '../../../public/js/urlManager';

import '../../../public/css/orderbuttons.css';

class ShowInfo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {};
        this.moneyType = props.moneyType
        this.orderInfo = props.orderInfo
        this.onChangeIndex = props.onChangeIndex
    }

    render() {
        var state = this.state;
        var totalPrice = this.orderInfo.sellerTotalPrice
        var price = this.moneyType == 1 ? this.orderInfo.sellerPrepayPrice : this.orderInfo.sellerTotalPrice - this.orderInfo.sellerPrepayPrice
        return (
            <div className="layerOrder">
                <div className="layerTop">
                    <span>支付{totalPrice == price ? '全款' : this.moneyType == 1 ? '预付款' : '尾款'}</span>
                    <a className="closeBtn fr" href="javascript:;" onClick={(type) => {
                        this.onChangeIndex(0)
                    }}> </a>
                </div>
                <div className="center">
                    <div className="prepayments">
                        <div><span>订单金额：</span><span>{totalPrice / 100}</span></div>
                        <div><span>支付金额：</span><span className="price-color">{price / 100}</span></div>
                    </div>
                </div>
                <div className="layerBtm">
                    <div href="javascript:;" className="btn theme-button-bg"
                         onClick={(type) => {
                             this.onChangeIndex(2)
                         }}>
                        确认付款
                    </div>
                    <div href="javascript:;" className="btn theme-button-bg"
                         onClick={(type) => {
                             this.onChangeIndex(0)
                         }}>
                        取消
                    </div>
                </div>
            </div>
        )
    }
}

class PayType extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.moneyType = props.moneyType;
        this.onChangeIndex = props.onChangeIndex;
        this.orderInfo = props.orderInfo;
    }

    render() {
        var totalPrice = this.orderInfo.sellerTotalPrice;
        var price = this.moneyType == 1 ? this.orderInfo.sellerPrepayPrice : this.orderInfo.sellerTotalPrice - this.orderInfo.sellerPrepayPrice;
        return (
            <div className="layerOrder">
                <div className="layerTop">
                    <span>支付{totalPrice == price ? '全款' :this.moneyType == 1 ? '预付款' : '尾款'}</span>
                    <a className="closeBtn fr" href="javascript:;" onClick={(type) => {
                        this.onChangeIndex(0)
                    }}> </a>
                </div>
                    <div className="layerOrderPay">
                        <a href="javascript:;" onClick={() => {
                            this.onChangeIndex(4)
                        }} className="fl">线上付款</a>
                        或
                        <a href="javascript:;" onClick={() => {
                            this.onChangeIndex(3)
                        }}  className="fr">线下付款</a>
                    </div>
            </div>
        )
    }
}

class PayOffline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            result: {}
        };
        this.moneyType = props.moneyType
        this.orderInfo = props.orderInfo
        this.onChangeIndex = props.onChangeIndex

    }

    componentDidMount() {
        var data = {
            rechargeAmount: this.moneyType == 1 ? this.orderInfo.sellerPrepayPrice : this.orderInfo.sellerTotalPrice - this.orderInfo.sellerPrepayPrice,
            payMethod: 2,
            orderNo: this.orderInfo.orderNo,
            receiveUserId: this.orderInfo.sellerId,
            rechargeOrderType: 2,
            moneyType: this.moneyType
        }
        layer.loading.open();
        this.postApi = serviceApi('aOrderPay', data, (data) => {
            layer.loading.close()
            this.setState({
                result: data
            })

        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    render() {
        var result = this.state.result;
        var totalPrice = this.orderInfo.sellerTotalPrice;
        var price = this.moneyType == 1 ? this.orderInfo.sellerPrepayPrice : this.orderInfo.sellerTotalPrice - this.orderInfo.sellerPrepayPrice;
        return (
            <div className="layerOrder">
                <div className="layerTop">
                    <span>支付{totalPrice == price ? '全款' : this.moneyType == 1 ? '预付款' : '尾款'}-线下支付</span>
                    <a className="closeBtn fr" href="javascript:;" onClick={(type) => {
                        this.onChangeIndex(0)
                    }}> </a>
                </div>

                {result && result.verificationCode ?
                <div className="payLineDown">
                    <div><span>充值中心：</span> <span className="price-color">等待线下付款</span></div>
                    <div>汇款信息:<span> 公司名称：</span> <span>{result.openAccountUserName}</span></div>
                    <div className="paysinfo"><span>账号：</span> <span>{result.openAccountUserNum}</span></div>
                    <div className="paysinfo"><span>开户行：</span> <span>{result.openAccountBankName}</span></div>
                    <div  className="payaddsinfo"><span>附加验证信息：</span> <span className="price-color">{result.verificationCode}</span></div>
                    <div className="addInfotap price-color">
                        请将附加信息填写转账单的附加信息栏
                    </div>
                </div>
                :
                null
            }
                {result && result.verificationCode ?
               <div className="layerBtm">
                   <div href="javascript:;" className="btn theme-button-bg"
                        onClick={() => {
                            this.onChangeIndex(200)
                        }}>
                       完成
                   </div>
               </div>
                    : null
                }
            </div>
        )
    }
}

class PayOnline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            result: {},
            weixinCode: '',
            payType: 1//1 支付宝 2 微信 3 银联
        };
        this.moneyType = props.moneyType;
        this.orderInfo = props.orderInfo;
        this.onChangeIndex = props.onChangeIndex;
    }

    onlinePay() {
        var money = this.moneyType == 1 ? this.orderInfo.sellerPrepayPrice : this.orderInfo.sellerTotalPrice - this.orderInfo.sellerPrepayPrice
        var payType = this.state.payType
        var orderNo = this.orderInfo.orderNo
        var userId = this.orderInfo.sellerId
        var moneyType = this.moneyType
        if (this.state.payType == 2) {
            var data = {
                rechargeAmount: money,
                payMethod: 1,
                payType: payType,
                orderNo: orderNo,
                receiveUserId: userId,
                rechargeOrderType: 2,
                moneyType: moneyType
            }
            layer.loading.open();
            this.postApi = serviceApi('aOrderPay', data, (data) => {
                layer.loading.close()
                this.setState({
                    weixinCode: data.orderInfo
                });
                // THIS.weixinLunxun();

            }, (data) => {
                layer.loading.close();
                layer.msg(data.message)
            });
        } else if (this.state.payType == 1 || this.state.payType == 3) {
            this.onChangeIndex(5)
            window.open(urlManager.pOnlinePayJump + '?' +
                'rechargeAmount=' + money + '&payType=' + payType + "&orderNo=" + orderNo + "&userId=" + userId + "&moneyType=" + moneyType);
        }

    }

    render() {
        var payType = this.state.payType;
        var weixinCode = this.state.weixinCode;
        var totalPrice = this.orderInfo.sellerTotalPrice;
        var price = this.moneyType == 1 ? this.orderInfo.sellerPrepayPrice : this.orderInfo.sellerTotalPrice - this.orderInfo.sellerPrepayPrice;
        return (
            <div className="layerOrder">
                {weixinCode ?
                    <div>

                        <div className="center fl">
                            <i className="weixinCode"
                               style={{backgroundImage: 'url(http://qr.liantu.com/api.php?w=200&m=0&text=' + weixinCode + ')'}}> </i>
                            <div className="text">
                                请用微信扫码支付
                            </div>
                        </div>
                        <div className="bottom">
                            <div href="javascrip:;" className="btn theme-button-bg"
                                 onClick={() => {
                                     this.onChangeIndex(0)
                                 }}>
                                取消
                            </div>
                            <div href="javascrip:;" className="btn theme-button-bg"
                                 onClick={() => {
                                     this.onChangeIndex(200)
                                 }}>
                                已完成支付
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="layerTop">
                            <span>支付{totalPrice == price ? '全款' : this.moneyType == 1 ? '预付款' : '尾款'}-线上支付</span>
                            <a className="closeBtn fr" href="javascript:;" onClick={(type) => {
                                this.onChangeIndex(0)
                            }}> </a>
                        </div>
                            <div className="onlinePayTypes fl" onClick={() => {
                                this.setState({
                                    payType: 1
                                })
                            }}>
                                <li className="ico_payAli  fl"> </li>
                                <li className={payType == 1 ? "ico_check on fr" : "ico_check fr"}> </li>
                            </div>
                            <div className="onlinePayTypes fl" onClick={() => {
                                this.setState({
                                    payType: 2
                                })
                            }}>
                                <li className="ico_payWeixin fl"> </li>
                                <li className={payType == 2 ? "ico_check on fr" : "ico_check fr"}> </li>
                            </div>
                            <div className="onlinePayTypes fl" onClick={() => {
                                this.setState({
                                    payType: 3
                                })
                            }}>
                                <li className="ico_payBank fl"> </li>
                                <li className={payType == 3 ? "ico_check on fr" : "ico_check fr"}> </li>
                            </div>
                        <div className="layerBtm">
                            <div href="javascrip:;" className="btn theme-button-bg"
                                 onClick={() => {
                                     this.onlinePay()
                                 }}>
                                下一步
                            </div>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

class PayOnlineResult extends React.Component {

    constructor(props) {
        super(props)
        this.state = {};
        this.moneyType = props.moneyType
        this.orderInfo = props.orderInfo
        this.onChangeIndex = props.onChangeIndex
    }

    render() {
        return (
            <div className="layerOrder">

                <div className="center">
                        <dl className="payOrderss">
                            <dt>

                            </dt>
                            <dd>
                                   请勿关闭此页面
                                <div>并在弹窗的新窗口中完成充值</div>
                            </dd>
                        </dl>
                </div>
                <div className="layerBtm">
                    <div href="javascript:;" className="btn theme-button-bg"
                         onClick={() => {
                             this.onChangeIndex(200)
                         }}>
                        已确认完成付款
                    </div>
                    <div href="javascript:;" className="btn theme-button-bg"
                         onClick={() => {
                             this.onChangeIndex(0)
                         }}>
                        取消
                    </div>
                </div>
            </div>
        )
    }
}

class OrderPay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 1
        };
        this.moneyType = props.moneyType
        this.orderInfo = props.orderInfo
        this.onChangeLayerIndex = props.onChangeLayerIndex
    }

    onChangeIndex(index) {
        if (index == 0) {
            this.onChangeLayerIndex(0)
        }
        else if (index == 200) {
            this.onChangeLayerIndex(200)
            index = 0
        }
        this.setState({
            index: index
        })
    }

    render() {
        var index = this.state.index
        return (
            <div className="layerModal">
                {index == 1 ? <ShowInfo orderInfo={this.props.orderInfo}
                                        onChangeIndex={this.onChangeIndex.bind(this)}
                                        moneyType={this.moneyType}/> : null}
                {index == 2 ? <PayType orderInfo={this.props.orderInfo}
                                       onChangeIndex={this.onChangeIndex.bind(this)}
                                       moneyType={this.moneyType}/> : null}
                {index == 3 ? <PayOffline orderInfo={this.props.orderInfo}
                                          onChangeIndex={this.onChangeIndex.bind(this)}
                                          moneyType={this.moneyType}/> : null}
                {index == 4 ? <PayOnline orderInfo={this.props.orderInfo}
                                         onChangeIndex={this.onChangeIndex.bind(this)}
                                         moneyType={this.moneyType}/> : null}
                {index == 5 ? <PayOnlineResult orderInfo={this.props.orderInfo}
                                               onChangeIndex={this.onChangeIndex.bind(this)}
                                               moneyType={this.moneyType}/> : null}
            </div>
        )
    }
}

export default OrderPay;