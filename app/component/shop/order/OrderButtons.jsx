/**
 * 变更尾款
 */
import React from 'react'
import $ from 'jquery';

import layer from '../../../public/js/layer';
import serviceApi from '../../../public/js/serviceApi';

import '../../../public/css/orderbuttons.css';
import OrderPay from "./OrderPay";
import OrderComment from "./OrderComment";
import OrderReply from "./OrderReply";
import utils from "../../../public/js/utils";
import PriceFormat from '../../common/PriceFormat';
class UpdateFinalPrice extends React.Component {

    constructor(props) {
        super(props)
        this.state = {};
        this.orderInfo = props.orderInfo
        this.onChangeLayerIndex = props.onChangeLayerIndex
        this.price = ''
    }

    /**
     * 监听输入
     * @param e
     */
    onPriceChange(e) {
        this.price = e.target.value;
        $('#inputPrice').css({'border': '1px solid #E8E8E8'});
    }

    //操作订单
    updateFinalPrice() {
        if (this.price === '') {
            $('#inputPrice').css({'border': '1px solid #f00000'}).focus();
            return
        }
        var data = {
            orderId: this.orderInfo.orderid,
            finalPrice: this.price * 100,
        }

        layer.loading.open();
        this.postApi = serviceApi('aOrderSellerUpdateFinalPrice', data, (data) => {
            layer.loading.close()
            this.onChangeLayerIndex(200, 'aOrderSellerUpdateFinalPrice')

        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    render() {
        var state = this.state;
        return (
            <div className="layerModal">
                <div className="layerOrder">
                    <div className="layerTop">
                        <span>变更尾款</span>
                        <a className="closeBtn fr" href="javascript:;" onClick={(type) => {
                            this.onChangeLayerIndex(0)
                        }}> </a>
                    </div>
                    <div className="changePrice">
                        <div className="changeInfos">
                            <p><span>订单金额：<span className="price-color">￥{this.orderInfo.sellerTotalPrice / 100}</span></span></p>
                            <p>
                                <span>应收尾款：<span className="price-color">￥{(this.orderInfo.sellerTotalPrice - this.orderInfo.sellerPrepayPrice) / 100}</span></span>
                            </p>
                        </div>
                        <div className="myLastPrice">
                            <div>我的尾款金额 ：</div>
                            <input id="inputPrice" className="inputReason" placeholder="请输入尾款金额"
                                   onChange={(e) => this.onPriceChange(e)}
                                   onKeyUp={(e) => {
                                       utils.priceOnKeyUp(e.target);
                                   }}
                                   onBlur={(e) => {
                                       utils.priceOnBlur(e.target);
                                   }}/>
                        </div>
                    </div>
                    <div className="layerBtm">
                        <div href="javascript:;" className="btn theme-button-bg"
                             onClick={(type) => this.onChangeLayerIndex(0)}>
                            取消
                        </div>
                        <div href="javascript:;" className="btn theme-button-bg"
                             onClick={(type) => this.updateFinalPrice()}>
                            确认提交
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * 修改执行结果
 */
class UpdateOrderReuslt extends React.Component {

    constructor(props) {
        super(props)
        this.state = {};
        this.orderInfo = props.orderInfo
        this.onChangeLayerIndex = props.onChangeLayerIndex
        this.result = this.orderInfo.deliveryResults
    }

    /**
     * 监听输入
     * @param e
     */
    onResultChange(e) {
        this.result = e.target.value;
        $('#inputResult').css({'border': '1px solid #E8E8E8'});
    }

    //操作订单
    updateOrderReuslt() {

        if (this.result == '') {
            $('#inputResult').css({'border': '1px solid #f00000'}).focus();
            return
        }
        var data = {
            orderId: this.orderInfo.orderid,
            desc: this.result,
        }
        layer.loading.open();
        this.postApi = serviceApi('aOrderSellerUpdatedesc', data, (data) => {
            layer.loading.close()
            this.onChangeLayerIndex(200, 'aOrderSellerUpdatedesc')

        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    render() {
        var state = this.state;
        return (
            <div className="layerModal">
                <div className="layerOrder">
                    <div className="layerTop">
                        <span>修改执行结果</span>
                        <a className="closeBtn fr" href="javascript:;" onClick={(type) => {
                            this.onChangeLayerIndex(0)
                        }}> </a>
                    </div>
                        <textarea id="inputResult" className="inputReason" placeholder="请输结果描述"
                                  onChange={(e) => this.onResultChange(e)} defaultValue={this.result}/>
                    <div className="layerBtm">
                        <div href="javascrip:;" className="btn theme-button-bg"
                             onClick={(type) => this.onChangeLayerIndex(0)}>
                            取消
                        </div>
                        <div href="javascrip:;" className="btn theme-button-bg"
                             onClick={(type) => this.updateOrderReuslt()}>
                            确认修改
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * 卖家投放完成
 */
class SellerConfirmOrder extends React.Component {

    constructor(props) {
        super(props)
        this.state = {};
        this.orderInfo = props.orderInfo
        this.onChangeLayerIndex = props.onChangeLayerIndex
        this.result=''
    }

    /**
     * 监听输入
     * @param e
     */
    onResultChange(e) {
        this.result = e.target.value;
        $('#inputResult').css({'border': '1px solid #E8E8E8'});
    }

    //操作订单
    sellerConfirmOrder() {

        if (this.result == '') {
            $('#inputResult').css({'border': '1px solid #f00000'}).focus();
            return
        }
        var data = {
            orderId: this.orderInfo.orderid,
            desc: this.result,
        }
        layer.loading.open();
        this.postApi = serviceApi('aOrderSellerConfirm', data, (data) => {
            layer.loading.close()
            this.onChangeLayerIndex(200, 'aOrderSellerConfirm')

        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    render() {
        var state = this.state;
        return (
            <div className="layerModal">
                <div className="layerOrder">
                    <div className="layerTop">
                        <span>执行结果</span>
                        <a className="closeBtn fr" href="javascript:;" onClick={(type) => {
                            this.onChangeLayerIndex(0)
                        }}> </a>
                    </div>
                        <textarea id="inputResult" className="inputReason" placeholder="请输结果描述"
                                  onChange={(e) => this.onResultChange(e)}/>
                    <div className="layerBtm">
                        <div href="javascrip:;" className="btn theme-button-bg"
                             onClick={(type) => this.onChangeLayerIndex(0)}>
                            取消
                        </div>
                        <div href="javascrip:;" className="btn theme-button-bg"
                             onClick={(type) => this.sellerConfirmOrder()}>
                            确认提交
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * 催单
 */
class RemandOrder extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        };
        this.orderInfo = props.orderInfo;
        this.onChangeLayerIndex = props.onChangeLayerIndex
    }

    //操作订单
    remandOrder() {
        if((this.orderInfo.reminderTotalCount - this.orderInfo.reminderCount) <= 0){
            return;
        }

        var data = {
            orderId: this.orderInfo.orderid
        }
        layer.loading.open();
        this.postApi = serviceApi('aOrderSellerRemindepay', data, (data) => {
            layer.loading.close()
            layer.msg("催付款成功")
            this.onChangeLayerIndex(200, 'aOrderSellerRemindepay')
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    render() {
        var state = this.state;
        // count:props.orderInfo.reminderCount,
        // allCount:props.orderInfo.reminderTotalCount
        return (
            <div className="layerModal">
                <div className="layerOrder">
                    <div className="layerTop">
                        <span>催款提示</span>
                        <a className="closeBtn fr" href="javascript:;" onClick={(type) => {
                            this.onChangeLayerIndex(0)
                        }}> </a>
                    </div>
                    <div className="reminderPrice">
                        催付款后会给买家发送短信告知其尽快付款，最多{this.orderInfo.reminderTotalCount}次机会（还剩{this.orderInfo.reminderTotalCount - this.orderInfo.reminderCount}次）。
                        <p>是否确定发送催付款短信？</p>
                    </div>
                    <div className="layerBtm">
                        <div href="javascrip:;" className="btn theme-button-bg"
                             onClick={(type) => this.onChangeLayerIndex(0)}>
                            取消
                        </div>
                        <div href="javascrip:;" className="btn theme-button-bg"
                             onClick={(type) => this.remandOrder()}>
                            确认提交
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * 反馈价格
 */
class FeedbackOrder extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: ['确认订单价格无误', '我要修改订单价格'],
            current: 0
        };
        this.orderInfo = props.orderInfo
        this.onChangeLayerIndex = props.onChangeLayerIndex
        this.price = ''
        this.prepaidPrice = ''
    }

    /**
     * 监听输入
     * @param e
     */
    onPriceChange(e) {
        this.price = e.target.value;
        $('#inputPrice').css({'border': '1px solid #E8E8E8'});
    }

    /**
     * 监听输入
     * @param e
     */
    onPrepaidPriceChange(e) {
        this.prepaidPrice = e.target.value;
        $('#inputPrepaidPrice').css({'border': '1px solid #E8E8E8'});
    }

    //操作订单
    feedbackOrder() {
        var data = {}
        if (this.state.current === 0) {
            data = {
                orderId: this.orderInfo.orderid,
                acceptPrice: 1
            }
        } else {
            if (this.price === '') {
                $('#inputPrice').css({'border': '1px solid #f00000'}).focus();
                return
            }
            if (this.orderInfo.buyerPrepayPrice > 0) {
                if(this.prepaidPrice === ''){
                    $('#inputPrepaidPrice').css({'border': '1px solid #f00000'}).focus();
                    return;
                }
                if(this.prepaidPrice <= 0){
                    layer.msg('预付金额必须大于0');
                    $('#inputPrepaidPrice').css({'border': '1px solid #f00000'}).focus();
                    return;
                }
                if(parseFloat(this.prepaidPrice) > parseFloat(this.price)){
                    layer.msg('预付金额不能超过订单金额');
                    $('#inputPrepaidPrice').css({'border': '1px solid #f00000'}).focus();
                    return;
                }
            }
            data = {
                orderId: this.orderInfo.orderid,
                acceptPrice: 2,
                prepayPrice: (this.prepaidPrice) * 100,
                totalPrice: (this.price) * 100
            }
        }

        layer.loading.open();
        this.postApi = serviceApi('aOrderSellerFeedback', data, (data) => {
            layer.loading.close()
            this.onChangeLayerIndex(200, 'aOrderSellerFeedback')

        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    render() {
        var state = this.state;
        var orderInfo = this.props.orderInfo;
        return (
            <div className="layerModal">
                <div className="layerOrder">
                    <div className="layerTop">
                        <span>反馈价格</span>
                        <a className="closeBtn fr" href="javascript:;" onClick={(type) => {
                            this.onChangeLayerIndex(0)
                        }}> </a>
                    </div>
                    <div className="backPrice">
                            {state.data.map((item, index) => {
                                return (
                                    <div className="item fl" key={item}>
                                        <li onClick={() => {
                                            this.setState({
                                                current: index
                                            })
                                        }}>
                                            <i className={state.current == index ? "ico-radio on" : "ico-radio"}
                                            />
                                            <span>{item}</span>
                                        </li>
                                    </div>
                                )
                            })}
                        {state.current === 1 ? <div className="myOrders">
                            <div style={{clear:"both"}}> </div>
                            <div className="originPrice">
                                 <div>
                                     订单金额 :
                                     <span className="price-color">
                                        &nbsp; <i className="sub">¥</i>{utils.toDecimal2(orderInfo.buyerTotalPrice/ 100)}
                                     </span>

                                     {
                                         orderInfo.buyerPrepayPrice ?
                                             <span>
                                                 <span className="solids">/</span> 预付金额 : &nbsp;
                                                 <span className="price-color">
                                                     <i className="sub">¥</i>{utils.toDecimal2(orderInfo.buyerPrepayPrice/ 100)}
                                                 </span>
                                             </span>
                                             :
                                             null
                                     }
                                 </div>

                            </div>
                            <div style={{clear:"both"}}> </div>
                            <div className="boldFont">
                                我的订单金额 ：
                                <input id="inputPrice" className="inputReason" placeholder="请输入订单金额"
                                       onChange={(e) => this.onPriceChange(e)}
                                       onKeyUp={(e) => {
                                           utils.priceOnKeyUp(e.target);
                                       }}
                                       onBlur={(e) => {
                                           utils.priceOnBlur(e.target);
                                       }}/>
                            </div>
                            {
                                orderInfo.buyerPrepayPrice?
                                    <div>
                                        <div className="boldFont secondMoney">
                                            我的预付金额 ：
                                            <input id="inputPrepaidPrice" className="inputReason" placeholder="请输入预付金额"
                                                   onChange={(e) => this.onPrepaidPriceChange(e)}
                                                   onKeyUp={(e) => {
                                                       utils.priceOnKeyUp(e.target);
                                                   }}
                                                   onBlur={(e) => {
                                                       utils.priceOnBlur(e.target);
                                                   }}/>
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                        </div> : null}
                    </div>
                    <div className="layerBtm">
                        <a href="javascript:;" className="btn theme-button-bg"
                             onClick={(type) => {
                                 this.feedbackOrder()
                             }}>
                            确认提交
                        </a>
                        <a href="javascript:;" className="btn button"
                           onClick={(type) => {
                               this.onChangeLayerIndex(0)
                           }}>
                            取消
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * 拒单
 */
class RefuseOrder extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            types: ['需求不明确', '不符合服务内容', '价格问题', '其他'],
            current: 0
        };
        this.orderId = props.orderId
        this.onChangeLayerIndex = props.onChangeLayerIndex
        this.inputReason = ''
    }

    /**
     * 监听输入
     * @param e
     */
    onReasonChange(e) {
        this.inputReason = e.target.value;
        $('#inputReason').css({'border': '1px solid #E8E8E8'});
    }

    //操作订单
    refuseOrder() {
        if (this.state.current === 3) {
            if (this.inputReason === '') {
                $('#inputReason').css({'border': '1px solid #f00000'}).focus();
                return
            }
        }

        let reason = this.state.types[this.state.current];
        if(this.state.current === 3){
            reason = this.inputReason;
        }
        var data = {
            orderId: this.orderId,
            refuseReason:reason
        }

        layer.loading.open();
        this.postApi = serviceApi('aOrderSellerRefuse', data, (data) => {
            layer.loading.close()
            this.onChangeLayerIndex(200, 'aOrderSellerRefuse')

        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    render() {
        var state = this.state;
        return (
            <div className="layerModal">
                <div className="layerOrder">
                    <div className="layerTop">
                       <span>拒单原因</span>
                        <a className="closeBtn fr" href="javascript:;" onClick={(type) => {
                            this.onChangeLayerIndex(0)
                        }}> </a>
                    </div>
                        <div className="notEnsure">
                            {state.types.map((item, index) => {
                                return (
                                    <div className="item fl" key={item}>
                                        <li onClick={() => {
                                            this.setState({
                                                current: index
                                            })
                                        }}>
                                            <i className={state.current == index ? "ico-check-onblue" : "ico-check-blue"}
                                            />
                                            <span>{item}</span>
                                        </li>
                                    </div>
                                )
                            })}
                       </div>
                    {state.current === 3 ? <input id="inputReason" maxlength={30} className="inputReason" placeholder="请输入其他原因"
                                                  onChange={(e) => this.onReasonChange(e)}
                                                  onInput={(e)=>{
                                                      if(e.target.value.length > 30){
                                                          e.target.value = e.target.value.slice(0, 30);
                                                      }
                                                    }
                                                  }/> : null}
                    <div className="layerBtm">
                        <div href="javascrip:;" className="btn theme-button-bg"
                             onClick={(type) => {
                                 this.onChangeLayerIndex(0)
                             }}>
                            取消
                        </div>
                        <div href="javascrip:;" className="btn theme-button-bg"
                             onClick={(type) => {
                                 this.refuseOrder()
                             }}>
                            确认提交
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/*取消订单*/
class OrderCancel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {};
        this.orderId = props.orderId;
        this.onChangeLayerIndex = props.onChangeLayerIndex
    }

    //操作订单
    remandOrder() {
        layer.loading.open();
        this.postApi = serviceApi("aOrderBuyerCancel", {
            orderId: this.orderId
        }, (data) => {
            layer.loading.close()
            this.onChangeLayerIndex(200, 'aOrderBuyerCancel')
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    render() {
        var state = this.state;
        return (
            <div className="layerModal">
                <div className="layerOrder">
                    <div className="reminderPrice centerTap">
                        是否确认取消订单
                    </div>
                    <div className="layerBtm">
                        <div href="javascrip:;" className="theme-button-bg  centerBtn"
                             onClick={(type) => this.onChangeLayerIndex(0)}>
                            取消
                        </div>
                        <div href="javascrip:;" className="btn theme-button-bg centerBtn"
                             onClick={(type) => this.remandOrder()}>
                            确定
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/*删除订单*/
class OrderDelete extends React.Component {

    constructor(props) {
        super(props)
        this.state = {};
        this.orderId = props.orderId;
        this.onChangeLayerIndex = props.onChangeLayerIndex
    }

    //操作订单
    remandOrder() {
        layer.loading.open();
        this.postApi = serviceApi("aOrderBuyerDelete", {
            orderId: this.orderId
        }, (data) => {
            layer.msg("删除成功");
            layer.loading.close();
            this.onChangeLayerIndex(200, 'aOrderBuyerDelete')
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    render() {
        var state = this.state;
        return (
            <div className="layerModal">
                <div className="layerOrder">
                    <div className="reminderPrice centerTap">
                        是否删除订单
                    </div>
                    <div className="layerBtm">
                        <div href="javascrip:;" className="centerBtn theme-button-bg"
                             onClick={(type) => this.onChangeLayerIndex(0)}>
                            取消
                        </div>
                        <div href="javascrip:;" className="centerBtn theme-button-bg"
                             onClick={(type) => this.remandOrder()}>
                            确定
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



/**
 * 按钮逻辑
 */
class OrderButtons extends React.Component {
    constructor(props) {
        super(props);
        this.onNewProps(props)
    }

    componentWillReceiveProps(nextProps) {
        this.onNewProps(nextProps)
    }

    onNewProps(props) {
        this.classType = props.classType;//样式1为列表，默认为0
        this.userType = props.userType;
        this.orderId = props.orderInfo.orderid;
        this.state = {
            orderInfo: props.orderInfo,
            layerIndex: 0,//拒单 2反馈订单 3催款 4支付 5投放完成 6修改执行结果 7变更尾款 8评价 9回复
            moneyType: 1//1-预付款；2-尾款
        };
    }

    /**
     * 按钮点击
     * @param type
     * @link OrderButtons
     */
    onClickBtn(type) {
        if (this.userType == 1) {//买家
            this.onClickByBuyer(type)
        } else if (this.userType == 2) {//卖家
            this.onClickBySeller(type)
        }
    }

    /**
     * 买家 1取消订单 2确认执行 3确认收货 4评价 5删除订单6支付预付7支付尾款
     * @param type
     */
    onClickByBuyer(type) {
        if (type === 1) {
            this.setState({
                layerIndex: 10
            })
        } else if (type === 2) {
            this.operateOrder('aOrderBuyerConfirmPrice')
        } else if (type === 3) {
            this.operateOrder('aOrderBuyerConfirm')
        } else if (type === 4) {
            this.onChangeLayerIndex(8)
        } else if (type === 5) {
            this.setState({
                layerIndex: 11
            })
        } else if (type === 6) {
            this.setState({
                moneyType: 1,
                layerIndex: 4
            })
        } else if (type === 7) {
            this.setState({
                moneyType: 2,
                layerIndex: 4
            })
        }
    }

    /**
     * 卖家 1反馈价格 2催付款 3投放完成 4修改执行结果 5变更尾款  6拒单 7删除订单 8回复
     * @param type
     */
    onClickBySeller(type) {
        if (type === 1) {
            this.onChangeLayerIndex(2)
        } else if (type === 2) {
            this.onChangeLayerIndex(3)
        } else if (type === 3) {
            this.onChangeLayerIndex(5)
        } else if (type === 4) {
            this.onChangeLayerIndex(6)
        } else if (type === 5) {
            this.onChangeLayerIndex(7)
        } else if (type === 6) {
            this.onChangeLayerIndex(1)
        } else if (type === 7) {
            this.operateOrder('aOrderSellerDelete', {orderId: this.orderId})
        } else if (type === 8) {
            this.onChangeLayerIndex(9)
        }
    }

    //操作订单
    operateOrder(operate, data) {
        layer.loading.open();
        this.postApi = serviceApi(operate, data ? data : {
            orderId: this.orderId
        }, (data) => {
            if("aOrderSellerDelete" === operate || "aOrderBuyerDelete" === operate){
                layer.msg("删除成功");
            }
            layer.loading.close()
            this.props.onComplete(this.orderId, operate)
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    /**
     * 显示订单按钮
     * @param type
     * @returns {number}
     */
    showButton(type) {
        // 1	确认订单 2	取消订单 3	删除订单 4	确认完成 5	评价 6	付预付款
        // 7	付款中置灰8	反馈价格 9	拒绝订单 10	修改尾款 11	修改执行结果 12	投放完成 13催付款 14付尾款 15回复
        var buttonStr = this.state.orderInfo.button;
        if (buttonStr) {
            var buttons = buttonStr.split(',');
            for (var i = 0; i < buttons.length; i++) {
                if (buttons[i] == type)
                    return 1
            }
        }
        return 0
    }

    /**
     * //1拒单 2反馈订单 3催款 4支付 5投放完成 6修改执行结果 7变更尾款 8评价 9回复
     * @param index
     * @param operate
     */
    onChangeLayerIndex(index, operate) {
        if (index == 200) {
            this.props.onComplete(this.orderId, operate)
            index = 0
        }
        this.setState({
            layerIndex: index
        })
    }

    render() {
        var state = this.state
        return (
            <div className={this.classType ? "orderListButtons fl" : "orderDetailButtons fl"}>
                {this.userType == 1 ?
                    <div>
                        <div className="clear">
                            {this.showButton(14) ?
                                <div className="button_yellow fr" onClick={(type) => this.onClickBtn(7)}>
                                    确认收货</div> : null}
                            {this.showButton(6) ?
                                <div className="button_yellow fr" onClick={(type) => this.onClickBtn(6)}>
                                    预付款</div> : null}
                            {this.showButton(5) ?
                                <div className="button_yellow fr" onClick={(type) => this.onClickBtn(4)}>
                                    评价</div> : null}
                            {this.showButton(4) ?
                                <div className="button_yellow fr" onClick={(type) => this.onClickBtn(3)}>
                                    确认完成</div> : null}
                            {this.showButton(1) ?
                                <div className="button_yellow fr" onClick={(type) => this.onClickBtn(2)}>
                                    确认执行</div> : null}
                            {this.showButton(2) ?
                                <div className="button fr" onClick={(type) => this.onClickBtn(1)}>
                                    取消订单</div> : null}
                            {this.showButton(3) ?
                                <div className="button fr" onClick={(type) => this.onClickBtn(5)}>
                                    删除订单</div> : null}
                            {this.showButton(7) ?
                                <div className="button fr">
                                    付款中</div> : null}
                        </div>
                        {/*{!this.classType && this.showButton(1) ?*/}
                            {/*<div className="tips">确认执行则代表卖家的价格，双方确认需求和价格无误，可以进行投放</div> : null}*/}
                    </div>
                    :
                    <div className="clear">
                        {this.showButton(3) ?
                            <div className="button fr" onClick={(type) => this.onClickBtn(7)}>
                                删除订单</div> : null}
                        {this.showButton(10) ?
                            <div className="button_yellow fr" onClick={(type) => this.onClickBtn(5)}>
                                变更尾款</div> : null}
                        {this.showButton(12) ?
                            <div className="button_yellow fr" onClick={(type) => this.onClickBtn(3)}>
                                投放完成</div> : null}
                        {this.showButton(8) ?
                            <div className="button_yellow fr" onClick={(type) => this.onClickBtn(1)}>
                                反馈价格</div> : null}
                        {this.showButton(13) ?
                            <div className={state.orderInfo.reminderTotalCount-state.orderInfo.reminderCount <= 0 ? "disabled fr" : "fr button_yellow" }
                                 onClick={(type) => this.onClickBtn(2)}>
                                催付款</div> : null}
                        {this.showButton(15) ?
                            <div className="button_yellow fr" onClick={(type) => this.onClickBtn(8)}>
                                评价回复</div> : null}
                        {this.showButton(11) ?
                            <div className="button fr" onClick={(type) => this.onClickBtn(4)}>修改执行结果</div> : null}
                        {this.showButton(9) ?
                            <div className="button fr" onClick={(type) => this.onClickBtn(6)}>拒单</div> : null}

                    </div>

                }

                {state.layerIndex == 1 ?
                    <RefuseOrder orderId={this.orderId}
                                 onChangeLayerIndex={this.onChangeLayerIndex.bind(this)}/> : null}
                {state.layerIndex == 2 ?
                    <FeedbackOrder orderInfo={state.orderInfo}
                                   onChangeLayerIndex={this.onChangeLayerIndex.bind(this)}/> : null}
                {state.layerIndex == 3 ?
                    <RemandOrder orderInfo={state.orderInfo}
                                 onChangeLayerIndex={this.onChangeLayerIndex.bind(this)}/> : null}
                {state.layerIndex == 4 ?
                    <OrderPay orderInfo={state.orderInfo}
                              onChangeLayerIndex={this.onChangeLayerIndex.bind(this)}
                              moneyType={state.moneyType}/> : null}
                {state.layerIndex == 5 ?
                    <SellerConfirmOrder orderInfo={state.orderInfo}
                                        onChangeLayerIndex={this.onChangeLayerIndex.bind(this)}/> : null}
                {state.layerIndex == 6 ?
                    <UpdateOrderReuslt orderInfo={state.orderInfo}
                                       onChangeLayerIndex={this.onChangeLayerIndex.bind(this)}/> : null}
                {state.layerIndex == 7 ?
                    <UpdateFinalPrice orderInfo={state.orderInfo}
                                      onChangeLayerIndex={this.onChangeLayerIndex.bind(this)}/> : null}

                {state.layerIndex == 8 ?
                    <OrderComment orderInfo={state.orderInfo}
                                  onChangeLayerIndex={this.onChangeLayerIndex.bind(this)}/> : null}
                {state.layerIndex == 9 ?
                    <OrderReply orderInfo={state.orderInfo}
                                onChangeLayerIndex={this.onChangeLayerIndex.bind(this)}/> : null}
                {state.layerIndex == 10 ?
                <OrderCancel orderId={this.orderId}
                            onChangeLayerIndex={this.onChangeLayerIndex.bind(this)}/> : null}
                {state.layerIndex == 11 ?
                    <OrderDelete orderId={this.orderId}
                                 onChangeLayerIndex={this.onChangeLayerIndex.bind(this)}/> : null}
            </div>
        );
    }
}

export default OrderButtons;