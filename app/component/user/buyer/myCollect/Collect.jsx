import React from 'react';
import layer from '../../../../public/js/layer';
import serviceApi from '../../../../public/js/serviceApi';
import utils from '../../../../public/js/utils';
import Page from "../../../common/Page";
import urlManager from "../../../../public/js/urlManager";
import chatUtils from "../../../common/chat/chatUtils";

class CollectShopItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shopInfo: this.props.shop
        };
        this.onDeleteComplete = this.props.onDeleteComplete;
    }

    onDelete() {
        layer.loading.open();
        serviceApi('aDelCollection', {dataId: this.state.shopInfo.id, type: 1}, () => {
            layer.loading.close();
            layer.msg('删除成功')
            this.onDeleteComplete();
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        })
    }

    onContactSeller(toUser) {
        chatUtils.chatMsgShow(toUser.from);
        /* 唤起聊天窗口 给redux 转递 卖家 userId */
        chatUtils.chatLocalSaveDefault(toUser); //主动唤起 默认模拟 卖家 发送一个空消息 默认欢迎语
    }

    onEnterShop() {
        if (this.state.shopInfo.status === 1) {
            location.href = urlManager.pShopDetail + '?shopId=' + this.state.shopInfo.id;
        }
    }

    render() {
        var shop = this.state.shopInfo;
        return (
            <li>
                <div className="shopItem" key={shop.id}>
                    <div className="lefts fl">
                        <div className="img fl">
                            <div className="pic">
                                <i style={{background: "url(" + shop.image + ")"}}/>
                            </div>
                        </div>
                        <div className="info fl">
                            <div className="name commonSingleLine">
                                {shop.shopName}
                            </div>
                            <div className="server commonSingleLine">
                                服务范围：{shop.serviceDesc || '暂无描述'}
                            </div>
                            <div className="address">
                                <span className="fl">公司</span>
                                <i className="ico-address fl"> </i>
                                <span className="fl">{shop.provincesName + ' ' + (shop.cityName == shop.provincesName ?  shop.countyName : shop.cityName)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="rights fr">
                        <div className="payData fl">
                            <ul>
                                <li>
                                    成交量：<span>{shop.dealNum}笔</span>
                                </li>
                                <li>
                                    好评率：<span>{utils.getGoodNum(shop.positiveNum, shop.neutralNum, shop.negativeNum)}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="rightBtns fr">
                            <i onClick={() => this.onDelete()}/>
                            <a href="javascript:;" className="button fr" onClick={this.onContactSeller.bind(this, {
                                from: shop.uid,
                                toUserName: shop.shopName,
                                toUserImage: shop.image
                            })}>联系卖家</a>
                            <a href="javascript:;" className={shop.status === 1 ? "theme-button-bg fr" : "dis fr"}
                               onClick={this.onEnterShop.bind(this)}>{shop.status === 1 ? "进入店铺" : "闭店中"}</a>
                        </div>

                    </div>
                </div>
            </li>
        )
    }
}

class MyCollectShop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalNum: 0,
            start: 0,
            pageSize: 10,
            shopList: [],
            isLoading:false
        }
    }

    getCollectShop() {
        var params = {
            type: 1,
            start: this.state.start,
            end: this.state.start + this.state.pageSize,
        };
        layer.loading.open();
        this.postApi = serviceApi('aUsercollectshop', params, (data) => {
            layer.loading.close();
            this.setState({
                isLoading:true,
                totalNum: data.total,
                shopList: data.shopInfoVOList,
            });
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    componentDidMount() {
        this.getCollectShop()
    }

    onPageClick(start) {
        this.setState({
            start: start
        }, () => {
            this.getCollectShop()
        })
    }

    onDeleteComplete() {
        this.setState({
            start: 0
        }, () => {
            this.getCollectShop()
        })
    }

    render() {
        var state = this.state;
        var THIS = this;
        return (
            <div>
                <ul className="collectShopList">
                    {
                        state.isLoading ?
                            state.shopList.length > 0 ?
                                state.shopList.map(function (item) {
                                    return (<CollectShopItem key={item.id} shop={item}
                                                             onDeleteComplete={THIS.onDeleteComplete.bind(THIS)}/>)
                                })
                                :
                                <p className="noListTap">暂无收藏的服务商</p>
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
export default MyCollectShop;