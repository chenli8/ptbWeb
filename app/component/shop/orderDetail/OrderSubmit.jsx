import React from 'react'
import serviceApi from '../../../public/js/serviceApi';
import urlManager from '../../../public/js/urlManager';
import utils from '../../../public/js/utils'
import layer from '../../../public/js/layer';
import $ from 'jquery';
import OrderStatus from "./OrderStatus";
import OrderProductUserInfo from "./OrderProductUserInfo";

class OrderSubmit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isPrepaid: false,
            isUseAgree: true,

            //临时
            answerInfo: {},
            serviceInfo: {},
            userInfo: {},
        };
        this.desc = ''
        this.price = ''
        this.prepaidPrice = ''

    }

    componentWillMount() {
        // productId=47474&userType=1&orderType=3
        this.id = utils.urlParam('id', window.location.href);
        this.userType = utils.urlParam('userType', window.location.href);
        this.orderType = utils.urlParam('orderType', window.location.href);
    }

    componentDidMount() {
        //取服务信息或应答需求信息
        this.getPreOrderInfo();
    }

    /**
     * 获取服务信息
     */
    getPreOrderInfo() {
        layer.loading.open();
        this.postApi = serviceApi('aGetPreOrderInfo', {
            id: this.id,
            type: this.orderType
        }, (data) => {
            layer.loading.close();

            if (this.orderType == 3) {
                this.id = data.serviceInfo.productId
            }
            this.setState({
                loading: true,
                serviceInfo: data.serviceInfo,
                answerInfo: data.answerInfo,
                userInfo: data.sellerInfo,
                shopInfo: data.shopInfoVO,
            });

        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    /**
     * 提交订单
     */
    onSubmitOrder() {

        var THIS = this;
        if (this.state.isUseAgree) {
            layer.msg('请先阅读品推宝用户服务协议')
            return
        }
        if (this.price === '') {
            $('#orderPrice').css({'border': '1px solid #f00000'}).focus();
            return
        }
        if (this.state.isPrepaid) {
            if (this.prepaidPrice === '') {
                $('#orderPrepaidPrice').css({'border': '1px solid #f00000'}).focus();
                return;
            }
            if(this.prepaidPrice <= 0){
                $('#orderPrepaidPrice').css({'border': '1px solid #f00000'}).focus();
                layer.msg('预付金额必须大于0')
                return;
            }
            if (parseInt(this.prepaidPrice) > parseInt(this.price)) {
                layer.msg('预付金额不能超过订单金额')
                $('#orderPrepaidPrice').css({'border': '1px solid #f00000'}).focus();
                return
            }
        }
        if (this.desc === '') {
            $('#orderDesc').css({'border': '1px solid #f00000'}).focus();
            return
        }
        if(this.desc.length < 15){
            layer.msg("订单需求不能少于15个字");
            $('#orderDesc').css({'border': '1px solid #f00000'}).focus();
            return
        }

        var data = {
            "relevantId": this.id,// 服务Id or 需求Id
            "orderType": this.orderType,//订单类型 3-服务 4-需求
            "prepayPrice": this.prepaidPrice * 100,//预付款价格
            "totalPrice": this.price * 100,//总价 尾款=总价-预付款
            "desc": this.desc//描述
        }
        this.postApi = serviceApi('aOrderBuyerCommit', data, (data) => {
            THIS.props.history.push({
                pathname: '/OrderShow',
                search: 'orderId=' + data + '&userType=' + this.userType + '&orderType=' + this.orderType
            })

        }, (data) => {
            layer.msg(data.message)
        });
    }

    onPriceChage(e) {
        this.price = e.target.value;
        $('#orderPrice').css({'border': '1px solid #E8E8E8'});
    }

    onPrepaidPriceChage(e) {
        if (this.state.isPrepaid) {
            this.prepaidPrice = e.target.value;
        } else {
            this.prepaidPrice = ''
        }
        $('#orderPrepaidPrice').css({'border': '1px solid #E8E8E8'});
    }

    onDescChage(e) {
        this.desc = e.target.value;
        $('#orderDesc').css({'border': '1px solid #E8E8E8'})

        let length = this.desc.length;
        $('#descInputCountId').html(length + "/2000");
    }

    onPrepaidClick(flag) {
        if (flag === this.state.isPrepaid)
            return;
        this.setState({
            isPrepaid: flag,
        });
    }

    onUserAgreeClick() {
        var flag = !this.state.isUseAgree;
        this.setState({
            isUseAgree: flag,
        });
    }

    componentWillUnmount() {
        this.postApi.abort();
        /*组件卸载 停止ajax请求*/
    }

    render() {
        var state = this.state;

        return (
            <div>
                <OrderStatus/>
                {
                    state.loading ?
                        <OrderProductUserInfo serviceInfo={state.serviceInfo} userInfo={state.userInfo}
                                              answerInfo={state.answerInfo} isOrderSubmit={true} shopInfo={state.shopInfo}/> : null
                }
                <div className="orderSubmit fl">
                    <div className="clear">
                        <span className="title">订单金额<span className="red"> (必填)</span>:</span>
                    </div>
                    <input id="orderPrice" className="priceInput" placeholder="请输入订单金额"
                           onChange={(e) => this.onPriceChage(e)}
                           onKeyUp={(e) => {
                                utils.priceOnKeyUp(e.target);
                           }}
                           onBlur={(e) => {
                               utils.priceOnBlur(e.target);
                           }}
                    />
                    <span className="tips fr">请填写您的预算或和卖家已经协商好的价格</span>
                    <div className="orderPrepaid">
                        <span className="title">是否预付<span className="red"> (必填)</span>:</span>
                        <div className="orderPrepaids">
                            <li>
                                <i className={!state.isPrepaid ? 'on' : ''} onClick={(flag) => this.onPrepaidClick(false)}> </i>无预付&nbsp;&nbsp;&nbsp;&nbsp;</li>
                            <li>
                                <i className={state.isPrepaid ? 'on' : ''} onClick={(flag) => this.onPrepaidClick(true)}> </i> 有预付
                            </li>
                        </div>
                        {state.isPrepaid ?
                            <input id="orderPrepaidPrice" className="priceInput" placeholder="请输入预付金额"
                                   onChange={(e) => this.onPrepaidPriceChage(e)}
                                   onKeyUp={(e) => {
                                       utils.priceOnKeyUp(e.target);
                                   }}
                                   onBlur={(e) => {
                                       utils.priceOnBlur(e.target);
                                   }}/>
                            :
                            null}
                    </div>
                    <div className="orderDesc fl">
                        <span className="title">订单需求<span className="red"> (必填)</span>:</span>
                        <textarea id="orderDesc" className="descInput" maxLength={2000}
                                  placeholder="请详细说明传播需求,如:发稿日期、内容需求、KPI要求、其他事项。订单需求相当于合同服务条款，将作为纠纷仲裁依据，请务必认真填写"
                                  onChange={(e) => this.onDescChage(e)}/>
                        <div className="descInputCount fr" id="descInputCountId">
                            0/2000
                        </div>
                    </div>

                    <div className="orderSubmitBtns fl">
                        <div className="userAgree fl">
                            <li>
                                <b  className={state.isUseAgree ? 'on' : 'not'} onClick={() => this.onUserAgreeClick()}> </b>我同意
                                <a href={urlManager.pAgreement} target='_blank'>《品推宝用户服务协议》</a>
                            </li>

                        </div>
                        <div className="btn theme-button-bg fr" onClick={() => this.onSubmitOrder()}>提交订单
                        </div>
                    </div>
                </div>
            </div>
        );

    }


}

export default OrderSubmit;