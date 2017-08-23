import React from 'react'
import ChatSingle from "../../common/chat/ChatSingle";
import utils from '../../../public/js/utils'
import urlManager from '../../../public/js/urlManager';
import PriceFormat from '../../common/PriceFormat';

class OrderProductUserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.onNewProps(props)
    }

    componentWillReceiveProps(nextProps) {
        this.onNewProps(nextProps)
    }

    onNewProps(props) {
        var userType = utils.urlParam('userType', window.location.href);
        this.state = {
            shopInfo: props.shopInfo,
            serviceInfo: props.serviceInfo,
            answerInfo: props.answerInfo,
            userInfo: props.userInfo,
            isOrderSubmit: props.isOrderSubmit,
            userType: userType,
        }
    }

    onShopDetail(id) {
        window.location.href = urlManager.pShopDetail + '?shopId=' + id;
    }

    onRequireClick(){
        if(this.state.isOrderSubmit){
            return;
        }
        window.location.href = urlManager.pDemandDetail + '#/' + this.state.answerInfo.requireId
    }

    onServiceClick(){
        if(this.state.userType == 2){
            return;
        }
        window.location.href = urlManager.pServiceDetail + "?serviceId=" + this.state.serviceInfo.serviceId + "&shopId=" + this.state.shopInfo.id;
    }

    render() {
        var serviceInfo = this.state.serviceInfo;
        var answerInfo = this.state.answerInfo;
        var userInfo = this.state.userInfo;
        var userType = this.state.userType;
        var shopInfo = this.state.shopInfo;
        var priceStr = '';
        var minPrice = '';
        var maxPrice = '';
        var prepayType = '';
        if (serviceInfo&&serviceInfo.serviceId) {
            prepayType = serviceInfo.prepayType;
            minPrice = serviceInfo.minPrice;
            maxPrice = serviceInfo.maxPrice
        }
        if (answerInfo&&answerInfo.answerId) {
            prepayType = answerInfo.prepayType;
            minPrice = answerInfo.minPrice;
            maxPrice = answerInfo.maxPrice
        }


        return (
            <div className="orderProductUserInfo fl">
                {serviceInfo&&serviceInfo.serviceId ?
                    <div className="left fl">
                        <p className="topTitle">{userType == 1 ? '购买服务：' : '出售服务：'}</p>
                        <div className="orderServiceCon" onClick={this.onServiceClick.bind(this)}>
                            <img className="img fl" src={serviceInfo.img}/>
                            <div className="info fl">
                                <div className="title">{serviceInfo.serviceName}</div>
                                <div className="desc">
                                    <PriceFormat data={{
                                        type:prepayType,
                                        min:minPrice,
                                        max:maxPrice,
                                        position:'detail'
                                    }}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
                {answerInfo&&answerInfo.answerId ?
                    <div className="left fl">
                        <div className="topTitle commonSingleLine">需求签单：<span onClick={this.onRequireClick.bind(this)}>{answerInfo.requireName}</span></div>
                        <div className="clear">
                            <div className="info fl">
                                <div className="title requireNo">需求号：{answerInfo.requireNo}</div>
                                <div className="desc">{priceStr}</div>
                            </div>
                            <div className="requirePriceCon fl">
                                <b>
                                    {
                                        prepayType == 1 ?
                                            "" :
                                            prepayType == 2 ?
                                                '预算区间:':
                                                prepayType == 3 ?
                                                    '预算价格:':
                                                    null
                                    }
                                    <PriceFormat data={{
                                        type:prepayType,
                                        min:minPrice,
                                        max:maxPrice,
                                        position:'detail'
                                    }}/>
                                </b>
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
                {
                    userInfo ?
                        <div className="right fl">
                            <p className="topTitle">{userType == 1 ? '卖家信息：' : '买家信息：'}</p>
                            <div>
                                <a href="javascript:;" onClick={() => {
                                    userType == 1 ? this.onShopDetail(shopInfo.id) : null
                                }}>
                                    <img className="img fl" src={userType == 1 ? shopInfo.image : userInfo.userImage}/>
                                    <div className="info fl">
                                        <div className="title" style={{marginTop:userType == 1 ? 0 : 20}}>{userType == 1 ? shopInfo.shopName : userInfo.userName}</div>
                                        <div className="desc">{userType == 1 ? "好评率："+shopInfo.positivePrecent + "%" : ""}</div>
                                    </div>
                                </a>
                            </div>
                            <ChatSingle toUserInfo={userInfo}/>
                        </div>
                        :
                        null
                }
            </div>
        );
    }
}

export default OrderProductUserInfo;