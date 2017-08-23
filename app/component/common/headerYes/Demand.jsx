/**
 * Created by Kirk liu on 2017/7/22.
 */
import React from 'react';
import Bottom from './Bottom';
import urlManager from "../../../public/js/urlManager";

class Demand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        let {userImage, nickName} = this.props;
        return (
            <div className="navPull demand">
                <i className="ico-triangle-up"/>
                <div className="top fl">
                    <a href={urlManager.pBuyerCenter}>
                        <i className="userImage fl" style={{backgroundImage: 'url(' + userImage + ')'}}/>
                        <span className="nickName fl">{nickName}</span>
                    </a>
                    <a className="core fr" href={urlManager.pBuyerCenter}>买家中心</a>
                </div>
                <div className="nav fl">
                    <div>
                        <a href={urlManager.pBuyerCenter + '#/BuyerOrderList'}>
                            <i className="ico-nav-order-demand"/>
                            我的订单
                        </a>
                    </div>
                    <div>
                        <a href={urlManager.pBuyerCenter + '#/myDemand/BuyerDemandList'}>
                            <i className="ico-nav-my-demand"/>
                            我的需求
                        </a>
                    </div>
                    <div>
                        <a href={urlManager.pBuyerCenter + '#/TransRecord'}>
                            <i className="ico-nav-wallet-demand"/>
                            我的钱包
                        </a>
                    </div>
                </div>
                <Bottom />
            </div>
        );
    }
}
export default Demand;