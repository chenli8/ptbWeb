/**
 * Created by Kirk liu on 2017/7/22.
 */
import React,{Component} from 'react';
import layer from '../../../../public/js/layer';
import Page from '../../../common/Page'
import serviceApi from '../../../../public/js/serviceApi';
import chatUtils from "../../../common/chat/chatUtils";
import urlManager from "../../../../public/js/urlManager";
import utils from "../../../../public/js/utils";

class CooperatShopItem extends Component {

    onContactSeller(toUser) {
        chatUtils.chatMsgShow(toUser.from);
        /* 唤起聊天窗口 给redux 转递 卖家 userId */
        chatUtils.chatLocalSaveDefault(toUser); //主动唤起 默认模拟 卖家 发送一个空消息 默认欢迎语
    }

    render() {
        var shop = this.props.shop.shopInfoVO;
        return (
            <li>
                <div className="shopItem">
                    <div className="lefts fl">
                        <div className="img fl">
                            <div className="pic">
                                <i style={{background: "url(" + shop.image + ")"}} />
                            </div>
                        </div>
                        <div className="info fl">
                            <div className="name commonSingleLine">
                                {shop.shopName}
                            </div>
                            <div className="server commonSingleLine">
                                服务范围：{shop.serviceDesc}
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
                            <a href="javascript:;" className="button fr" onClick={this.onContactSeller.bind(this, {
                                from: shop.uid,
                                toUserName: shop.userName,
                                toUserImage: shop.userImage
                            })}>联系卖家</a>
                            <a href={urlManager.pShopDetail + '?shopId=' + shop.id}
                               className="theme-button-bg fr">进入店铺</a>
                        </div>

                    </div>
                </div>
            </li>
        )
    }
}

class Cooperat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            totalNum: 0,
            start: 0,
            pageSize: 10,
            shopList: []
        };
    }

    componentDidMount() {
        this.getCollectShop()
    }

    getCollectShop() {
        var THIS = this;
        var params = {
            type: 1,
            start: this.state.start,
            end: this.state.start + this.state.pageSize,
        };

        layer.loading.open();
        this.postApi = serviceApi('acooperationlist', params, (data) => {
            layer.loading.close();
            this.setState({
                isLoad: true,
                totalNum: data.totalNum,
                shopList: data.list,
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
            <div className="myCooperateCon">
                <ul className="collectShopList">
                    {
                        state.isLoad ?
                            state.shopList.length > 0 ?
                                state.shopList.map(function (item) {
                                    return (<CooperatShopItem shop={item} key={item.shopInfoVO.id}/>)
                                })
                                :
                                <p className="noListTap">暂无合作服务商。</p>
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
export default Cooperat;