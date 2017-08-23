/**
 * Created by Kirk liu on 2017/7/22.
 */
import React from 'react';
import Bottom from './Bottom';
import urlManager from "../../../public/js/urlManager";

class Supplier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        let {shopImage, shopName, shopId} = this.props.data;
        return (
            <div className="navPull supplier">
                <i className="ico-triangle-up"/>
                <div className="top fl">
                    <a href={urlManager.pSellerCenter}>
                        <i className="userImage fl" style={{backgroundImage: 'url(' + shopImage + ')'}}/>
                        <span className="nickName fl">{shopName}</span>
                    </a>
                    <a className="core fr" href={urlManager.pSellerCenter}>卖家中心</a>
                </div>
                <div className="nav fl">
                    <div>
                        <a href={urlManager.pSellerCenter + '#/SellerOrderList'}>
                            <i className="ico-nav-sell-supplier"/>
                            我卖出的
                        </a>
                    </div>
                    <div>
                        <a href={urlManager.pShopDetail + '?shopId=' + shopId}>
                            <i className="ico-nav-shop-supplier"/>
                            我的店铺
                        </a>
                    </div>
                    <div>
                        <a href={urlManager.pSellerCenter + '#/TransRecord'}>
                            <i className="ico-nav-wallet-supplier"/>
                            我的钱包
                        </a>
                    </div>
                </div>
                <Bottom />
            </div>
        );
    }
}
export default Supplier;