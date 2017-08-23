import React from 'react'
import cookie from 'react-cookie'

import serviceApi from '../../../public/js/serviceApi';
import layer from '../../../public/js/layer';
import chatUtils from '../../common/chat/chatUtils';
import urlManager from "../../../public/js/urlManager";
import utils from "../../../public/js/utils";

class ShopInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shopDetail: {},
            isCollection: 0
        };
        this.shopId = props.shopId
    }

    componentDidMount() {
        this.getShopDetail();
    }

    getShopDetail() {
        let that = this;
        this.postApi = serviceApi('aShopDetail', {shopId: this.shopId}, (data) => {

            that.setState({
                shopDetail: data,
                isCollection: data.isCollection
            })

        }, (data) => {
        });
    }

    handelIsChatInfo(toUser) {
        chatUtils.chatMsgShow(toUser.from);
        /* 唤起聊天窗口 给redux 转递 卖家 userId */
        chatUtils.chatLocalSaveDefault(toUser); //主动唤起 默认模拟 卖家 发送一个空消息 默认欢迎语
    }

    collection() {
        serviceApi('aCollection', {dataId: this.shopId, type: 1}, () => {
            layer.msg('收藏成功');
            this.setState({isCollection: 1})
        }, (data) => {
            layer.msg(data.message)
        })
    }

    collectionDel() {
        serviceApi('aDelCollection', {dataId: this.shopId, type: 1}, () => {
            layer.msg('取消成功');
            this.setState({isCollection: 0})
        }, (data) => {
            layer.msg(data.message)
        })
    }

    render() {
        let shopDetail = this.state.shopDetail;
        let state = this.state;
        return (

            <div className="salerInfo">
                {
                    shopDetail.id ?
                        <div>
                            <a href={urlManager.pShopDetail + '?shopId=' + utils.urlParam('shopId')}>
                                <img src={shopDetail.image} alt="" className="userImg fl"/>
                            </a>
                            <div className="baseInfo fl">
                                <p className="title">
                                    <a href={urlManager.pShopDetail + '?shopId=' + utils.urlParam('shopId')}>
                                        {shopDetail.shopName}
                                    </a>
                                </p>
                                <p className="servers">
                                    服务范围：
                                    {shopDetail.serviceDesc || '暂无描述'}
                                </p>
                                <p className="content">{shopDetail.provincesName + ' ' + (shopDetail.cityName == shopDetail.provincesName ?  shopDetail.countyName : shopDetail.cityName)}</p>
                            </div>
                            <div className="numInfo fl numInfo1">
                                <p className="titleNum">{shopDetail.serviceNum}</p>
                                <p className="content">服务数量</p>
                            </div>
                            <div className="numInfo fl">
                                <p className="titleNum">{shopDetail.dealNum}</p>
                                <p className="content">成交量</p>
                            </div>
                            <div className="numInfo fl">
                                <p className="titleNum">{shopDetail.positivePrecent}%</p>
                                <p className="content">好评率</p>
                            </div>
                            {
                                cookie.load('chatUid') == shopDetail.uid ?
                                    null
                                    :
                                    <span>
                                        <a href={urlManager.pShopDetail + '?shopId=' + shopDetail.id}
                                           className="btn fr">
                                            进入店铺
                                        </a>
                                        <a href="javascript:;" className="btn fr"
                                           onClick={this.handelIsChatInfo.bind(this, {
                                               from: shopDetail.uid,
                                               toUserName: shopDetail.shopName,
                                               toUserImage: shopDetail.image
                                           })}>
                                            联系卖家
                                        </a>
                                        {
                                            state.isCollection == 1
                                                ?
                                                <a href="javascript:;" className="btn fr"
                                                   onClick={this.collectionDel.bind(this)}>取消收藏</a>
                                                :
                                                <a href="javascript:;" className="btn fr" onClick={this.collection.bind(this)}>收藏店铺</a>
                                        }
                                    </span>
                            }
                        </div>
                        : null
                }
            </div>



        );
    }
}
export default ShopInfo;