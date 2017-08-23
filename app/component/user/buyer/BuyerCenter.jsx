/**
 * Created by Kirk liu on 2017/7/22.
 */
import React from 'react';
import cookie from 'react-cookie'
import "../../../public/css/buyerCenter.css"
import layer from '../../../public/js/layer';
import serviceApi from '../../../public/js/serviceApi';
import utils from '../../../public/js/utils';
import urlManager from "../../../public/js/urlManager";

class BuyerCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{},
            userImage: cookie.load('userImage'),
            nickName: cookie.load('nickName'),
        };
    }

    getUserInfo() {
        layer.loading.open();
        this.postApi = serviceApi('account', {
        }, (data) => {
            layer.loading.close();
            this.setState({
                data: data,
                isLoaded:true
            });
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    componentDidMount() {
        this.getUserInfo()
    }

    onSetting(){
        window.location.href = urlManager.pAccount;
    }

    onDealRecord(){
        this.props.history.push({ pathname: '/TransRecord'});
    }

    onOrder(type){
        this.props.history.push({ pathname: '/BuyerOrderList', state:type});
    }

    render() {
        var state=this.state;
        var data=state.data;
        return (
            <div>
                {
                    state.isLoaded ?
                        <div className="userCon">
                            <div className="userCon-top">
                                <div className="info fl">
                                    <div className="userImg fl">
                                        {
                                            (state.userImage === null || state.userImage === undefined || state.userImage === '')?
                                                <i></i>
                                                :
                                                <i style={{background:"url("+state.userImage+")"}}></i>
                                        }
                                    </div>
                                    <div className="UserName fl">
                                        <div className="title">
                                            {state.nickName}
                                        </div>
                                        <div className="Orders">
                                            <ul>
                                                <li>
                                                    <span>成功订单</span>
                                                    <b>
                                                        {
                                                            data.buyerDealNum === null ?
                                                                0
                                                                :
                                                             data.buyerDealNum
                                                        }
                                                        笔</b>
                                                </li>
                                                <li>
                                                    <span>消费金额</span>
                                                    <b><i className="sub">¥</i>{utils.toDecimal2(data.buyerIncomeAmount / 100)}</b>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="userSet fr">
                                    <div className="account fl" onClick={()=>this.onSetting()}>
                                        <i className="ico-setting"> </i>
                                        <a href="javascript:;" >账号设置</a>
                                    </div>
                                    <div className="accInfo fr">
                                        <span>账户余额</span>
                                        <b>
                                            <i className="sub">¥</i>{utils.toDecimal2(data.masterAccountMoney / 100)}
                                        </b>
                                        <div className="withdrawCon clear">
                                            <a href="javascript:;" className="accHistory fl" onClick={()=>this.onDealRecord()}>交易记录</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="userCon-btm">
                                <ul>
                                    <li onClick={()=>this.onOrder(0)}>
                                        <i className="ico-waitsure"> </i>
                                        <a href="javascript:;">待确认订单</a>
                                        <i className="rgtip"> </i>
                                    </li>
                                    <li onClick={()=>this.onOrder(1)}>
                                        <i className="ico-waitmoney"> </i>
                                        <a href="javascript:;">执行中订单</a>
                                        <i className="rgtip"> </i>
                                    </li>
                                    <li onClick={()=>this.onOrder(2)}>
                                        <i className="ico-waitgods"> </i>
                                        <a href="javascript:;">已完成订单</a>
                                        <i className="rgtip"> </i>
                                    </li>
                                    {/*<li onClick={()=>this.onOrder(2)}>*/}
                                        {/*<i className="ico-waitcommon"> </i>*/}
                                        {/*<a href="javascript:;">待评价订单</a>*/}
                                    {/*</li>*/}
                                </ul>
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        );
    }
}
export default BuyerCenter;