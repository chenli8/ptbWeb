import React, {Component}from 'react';
import moment from 'moment-kirk';
import cookie from 'react-cookie';
import serviceApi from '../../../public/js/serviceApi';
import layer from '../../../public/js/layer';
import utils from '../../../public/js/utils';
import urlManager from './../../../public/js/urlManager'
import '../../../public/css/sellerOrderList.css';
import Page from "../../common/Page";
import OrderButtons from '../../shop/order/OrderButtons'
import chatUtils from '../../common/chat/chatUtils';

class Item extends Component {

    constructor(props) {
        super(props)
        this.state = {
            order: this.props.order
        }
    }

    onOrderDetail(orderInfo) {
        window.location.href = urlManager.pOrder + '#/OrderShow?orderId=' + orderInfo.orderid + '&userType=2&orderType=' + orderInfo.orderType;
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
    handelIsChatInfo(toUser) {
        chatUtils.chatMsgShow(toUser.from);
        /* 唤起聊天窗口 给redux 转递 卖家 userId */
        chatUtils.chatLocalSaveDefault(toUser); //主动唤起 默认模拟 卖家 发送一个空消息 默认欢迎语
    }
    onComplete(orderId, operate) {
        if (operate == 'aOrderSellerDelete') {
            this.props.onRefreshList()
        } else {
            this.refreshOrder(orderId)
        }
    }
    render() {
        var order = this.state.order;
        var orderInfo = order.orderInfo;
        var userInfo = order.buyerInfo;
        var serviceInfo = order.serviceInfo;
        var answerInfo = order.answerInfo;
        let shopInfoVO = order.shopInfoVO;
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
                            <a href="javascript:;" onClick={(order) => this.onOrderDetail(orderInfo)}>
                                <div
                                    className="title">{orderInfo.productName}</div>
                                <div className="subTitle">{orderInfo.orderType <= 3 ? '【服务派单】' : '【需求签单】'}</div>
                                <div className="desc">
                                    {orderInfo.orderDesc}
                                </div>
                            </a>
                        </div>
                        <div className="priceCon fl">
                            <b dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceOne(orderInfo.sellerTotalPrice / 100, 0)}}/>
                        </div>
                        <div className="statusCon fr">
                            <div className="orderStatus">
                                <i className={"orderStatus"+orderInfo.statusType}/>
                            </div>
                            <div className="orderDetailBtn">
                                <a href="javascript:;" onClick={(order) => this.onOrderDetail(orderInfo)}>订单详情</a>
                            </div>
                            <div className="contactBuyer">
                                <a href="javascript:;"
                                   onClick={
                                       this.handelIsChatInfo.bind(this,
                                           {
                                               from: order.buyerInfo.userId,
                                               toUserName:order.buyerInfo.userName,
                                               toUserImage: order.buyerInfo.userImage
                                           }
                                       )
                                   }
                                >联系买家</a>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="shopName fl">
                            {/*<i className="ico-shop"/>*/}
                            <span>买家: {userInfo.userName}</span>
                        </div>
                        <div className="buttons fr">
                            <OrderButtons onComplete={this.onComplete.bind(this)} orderInfo={orderInfo}
                                          userType='2' classType="1"/>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}


/**
 * 卖家订单列表
 */
class SellerOrderList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalNum: 0,
            start: 0,
            pageSize: 10,
            isLoad:false,
            orderList: [],

            orderStatus: 4,
            orderType: 0,
            /*搜索*/
            searchShow: false,
            searchTypeList: [
                {name: '订单号', id: 1},
                {name: '服务名称', id: 5},
                {name: '买家名称', id: 2}
            ],
            searchTypeName: '订单号',
            searchType: 1,
            keywords: '',
        }
    }

    componentWillMount() {
        if (this.props.location.state !== undefined) {
            this.onOrderStatusClick(this.props.location.state);
        }
    }

    onOrderTypeClick(orderType) {
        if (this.state.orderType === orderType)
            return
        this.setState({
            orderType: orderType,
            start: 0
        }, () => {
            this.getOrderList()
        })
    }
    searchSubmit() {
        this.setState({keywords:this.refs.searchInput.value},()=>{
            this.getOrderList();
        })
    }
    onOrderStatusClick(orderStatus) {
        if (this.state.orderStatus === orderStatus)
            return
        this.setState({
            orderStatus: orderStatus,
            start: 0
        }, () => {
            this.getOrderList()
        })
    }

    getOrderList() {
        let state = this.state;
        let data = {
            start: state.start,
            end: state.start + state.pageSize,
            orderStatus: state.orderStatus,
            orderType: state.orderType,
            userType: 2
        };
        if (state.keywords) {
            data.keywords = state.keywords;
            data.searchType = state.searchType;
        }
        layer.loading.open();
        this.postApi = serviceApi('aOrderList', data, (data) => {
            layer.loading.close();
            this.setState({
                totalNum: data.totalNum,
                orderList: data.list,
                isLoad:true
            })
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    onPageClick(start) {
        this.setState({
            start: start
        }, () => {
            this.getOrderList()
        })
    }

    componentDidMount() {
        this.getOrderList();
    }

    componentWillUnmount() {
        this.postApi.abort();
        /*组件卸载 停止ajax请求*/
    }
    onRefreshList(){
        this.getOrderList()
    }

    render() {
        let state = this.state;
        return (
            <div className="orderList">
                <div className="top">
                    <div className="search fl">
                        <div className="searchType fl">
                            <div className="ties"
                                 onClick={() => this.setState({searchShow: !state.searchShow})}>
                                {state.searchTypeName}<i className="ico-arrow-down"> </i>
                            </div>
                            {
                                state.searchShow ?
                                    <div className="pull">
                                        <ul>
                                            {
                                                state.searchTypeList.map((data) => {
                                                    if (data.id != state.searchType) {
                                                        return (
                                                            <li key={data.id} onClick={() => {
                                                                this.setState({
                                                                    searchType: data.id,
                                                                    searchTypeName: data.name,
                                                                    searchShow: false
                                                                })
                                                            }}>
                                                                {data.name}
                                                            </li>
                                                        )
                                                    }
                                                })
                                            }
                                        </ul>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        <input className="searchInput fl" placeholder="请输入关键字" ref="searchInput" onKeyPress={(e) => {
                            if (e.which === 13) {
                                this.refs.searchSubmit.click()
                            }
                        }}/>
                        <a href="javascript:;" ref="searchSubmit" className="searchBtn theme-button-bg fl"
                           onClick={() => {
                               this.searchSubmit();
                           }}>搜索</a>
                    </div>
                    {
                        state.keywords ?
                            null
                            :
                            <ul className="orderType fr">
                                <li >订单类型：</li>
                                <li className={state.orderType === 0 ? "current" : ''}
                                    onClick={(type) => this.onOrderTypeClick(0)}>不限
                                </li>
                                <li className={state.orderType === 4 ? "current" : ''}
                                    onClick={(type) => this.onOrderTypeClick(4)}>需求签单
                                </li>
                                <li className={state.orderType === 3 ? "current" : ''}
                                    onClick={(type) => this.onOrderTypeClick(3)}>服务派单
                                </li>
                            </ul>
                    }
                </div>
                {
                    state.keywords ?
                        null
                        :
                        <ul className="orderTab">
                            <li><a href="javascript:;" className={state.orderStatus === 4 ? "current" : ''}
                                   onClick={(status) => this.onOrderStatusClick(4)}>全部订单</a></li>
                            <li><a href="javascript:;" className={state.orderStatus === 0 ? "current" : ''}
                                   onClick={(status) => this.onOrderStatusClick(0)}>待确认</a></li>
                            <li><a href="javascript:;" className={state.orderStatus === 1 ? "current" : ''}
                                   onClick={(status) => this.onOrderStatusClick(1)}>执行中</a></li>
                            <li><a href="javascript:;" className={state.orderStatus === 2 ? "current" : ''}
                                   onClick={(status) => this.onOrderStatusClick(2)}>已完成</a></li>
                        </ul>
                }
                <ul className="orderInfoList">
                    {
                        state.isLoad ?
                         state.orderList.length > 0 ?
                            state.orderList.map((item) => {
                                return ( <Item order={item} key={item.orderInfo.orderid} onRefreshList={this.onRefreshList.bind(this)}/>)
                            })
                            :
                            <p className="noListTap">您还没有订单。</p>
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
        )
    }
}


export default SellerOrderList;
