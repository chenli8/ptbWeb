import React,{Component} from 'react';
import layer from '../../../../public/js/layer';
import utils from '../../../../public/js/utils';
import serviceApi from '../../../../public/js/serviceApi';
import Page from "../../../common/Page";
import PriceFormat from "../../../common/PriceFormat";
import urlManager from "../../../../public/js/urlManager";
import chatUtils from "../../../common/chat/chatUtils";

class CollectServerItem extends Component {

    onShop(id) {
        window.location.href = urlManager.pShopDetail + '?shopId=' + id;
    }

    onContact(toUser, e) {
        e.stopPropagation() || e.nativeEvent.stopImmediatePropagation() || e.preventDefault();
        chatUtils.chatMsgShow(toUser.from);
        /* 唤起聊天窗口 给redux 转递 卖家 userId */
        chatUtils.chatLocalSaveDefault(toUser); //主动唤起 默认模拟 卖家 发送一个空消息 默认欢迎语
    }

    render() {
        var server = this.props.server;
        var serviceInfo = server.serviceInfo;
        var shopInfo = server.shopInfo;
        return (
            <li>
                {
                    serviceInfo.status == 1 ?
                        <a href={urlManager.pShopDetail + "?shopId=" + shopInfo.id}>
                            <div className="serverItem fl">
                                <div className="serImg">
                                    <img src={serviceInfo.img} alt=""/>
                                </div>
                                <div className="info">
                                    <p className="head">{serviceInfo.serviceName}</p>
                                    <div className="deal">
                                        <span>好评率:<b>{utils.getGoodNum(serviceInfo.positiveNum, serviceInfo.neutralNum, serviceInfo.negativeNum)}</b></span>
                                        <span>成交量:<b>{serviceInfo.dealNum}</b></span>
                                    </div>
                                    <div className="price fl">
                                        <PriceFormat data={{
                                            type:serviceInfo.prepayType,
                                            min:serviceInfo.minPrice,
                                            max:serviceInfo.maxPrice,
                                            position:'list'
                                        }}/>
                                    </div>
                                    <div className="ContBtn fr" onClick={this.onContact.bind(this, {
                                        from: shopInfo.uid,
                                        toUserName: shopInfo.userName,
                                        toUserImage: shopInfo.userImage
                                    })}>联系TA
                                    </div>
                                    <div className="shopName" onClick={(shopId) => this.onShop(shopInfo.id)}>
                                        {shopInfo.shopName}
                                        <i/>
                                    </div>
                                </div>
                            </div>
                        </a>
                        :
                        <div className="serverItem fl">
                            <div className="serImg">
                                <img src={serviceInfo.img} alt=""/>
                                <i className="failure"> </i>
                            </div>
                            <div className="info">
                                <p className="head">{serviceInfo.serviceName}</p>
                                <div className="deal">
                                    <span>好评率:<b>{utils.getGoodNum(serviceInfo.positiveNum, serviceInfo.neutralNum, serviceInfo.negativeNum)}</b></span>
                                    <span>成交量:<b>{serviceInfo.dealNum}</b></span>
                                </div>
                                <div className="price fl">
                                        <span
                                            dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceOne(serviceInfo.minPrice / 10000, 0)}}/>万<sub>起</sub>
                                </div>
                                <div className="ContBtn fr" onClick={this.onContact.bind(this, {
                                    from: shopInfo.uid,
                                    toUserName: shopInfo.shopName,
                                    toUserImage: shopInfo.image
                                })}>联系TA
                                </div>
                                <div className="shopName" onClick={(shopId) => this.onShop(shopInfo.id)}>
                                    {shopInfo.shopName}
                                    <i/>
                                </div>
                            </div>
                        </div>
                }
            </li>
        )
    }
}

class Server extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalNum: 0,
            start: 0,
            pageSize: 10,
            serverList: [],
            isLoad:false
        };
    }

    componentDidMount() {
        this.getCollectServerList()
    }

    getCollectServerList() {
        var params = {
            start: this.state.start,
            end: this.state.start + this.state.pageSize,
        };

        layer.loading.open();
        this.postApi = serviceApi('amyStoreService', params, (data) => {
            layer.loading.close();
            this.setState({
                isLoad:true,
                totalNum: data.total,
                serverList: data.serviceList,
            });
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    onPageClick(start) {
        this.setState({
            start: start
        }, () => {
            this.getCollectShop()
        })
    }

    render() {
        var state = this.state;
        return (
            <div>
                <ul className="collectServerList">
                    {
                        state.isLoad ?
                            state.serverList.length > 0 ?
                                state.serverList.map(function (item, index) {
                                    return (<CollectServerItem server={item} key={index}/>)
                                })
                                :
                                <p className="noListTap">暂无收藏的服务</p>
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
export default Server;