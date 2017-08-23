import React, {Component} from 'react';
import cookie from 'react-cookie';
import {HashRouter as Router, Route, NavLink, Redirect} from 'react-router-dom'

import SearchBtn from '../../common/SearchBtn.jsx';

import SellerCenter from "./SellerCenter";
import SellerOrderList from "./SellerOrderList";
import urlManager from "./../../../public/js/urlManager";
import Evaluation from './evaluation/Evaluation'; //待评价
import DemandAswer from './DemandAswer.jsx';
import CollectAswer from './CollectAswer.jsx';
import WithDrawHistory from "./withdraw/WithdrawHistory";
import ShopBaseInfo from "./ShopBaseInfo";
import MannageServer from "./MannageServer";
import AccountManager from "./AccountManager";
import TransRecord from "./TransRecord";
import WithdrawApply from "./withdraw/WithdrawApply";

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    render() {
        return (
            <div className="container">
                <div className="seller">
                    <SearchBtn/>
                    <Router>
                        <div className="sellerCon">
                            <div className="top">
                                <div className="title fl">
                                        <i className="ico-home"/>
                                        <NavLink to="/SellerCenter"  strict activeClassName="on" >卖家中心</NavLink>
                                </div>
                            </div>

                            <div className="main">
                                <div className="leftNav fl">
                                    <div className="CommonNavItem">
                                        <div className="title">
                                            <i className="fl ico-order"/>
                                            <span>交易管理</span>
                                        </div>
                                        <NavLink to="/SellerOrderList"  strict activeClassName="on" >我卖出的</NavLink>
                                        {/*<NavLink to="/Evaluation"  strict activeClassName="on" >我的评价</NavLink>*/}
                                    </div>
                                    <div className="CommonNavItem">
                                        <div className="title">
                                            <i className="fl ico-demands"/>
                                            <span>需求应答</span>
                                        </div>
                                        <NavLink to="/DemandAswer"  strict activeClassName="on" >应答的需求</NavLink>
                                        <NavLink to="/CollectAswer"  strict activeClassName="on" >收藏的需求</NavLink>
                                    </div>
                                    <div className="CommonNavItem">
                                        <div className="title">
                                            <i className="fl icon-user"/>
                                            <span>我的店铺</span>
                                        </div>
                                        <NavLink to="/ShopBaseInfo"  strict activeClassName="on" >店铺基础信息</NavLink>
                                        <NavLink to="/MannageServer"  strict activeClassName="on" >服务管理</NavLink>
                                        <a href={urlManager.pShopDetail + '?shopId=' + cookie.load('shopId')} target="_bank">预览店铺</a>
                                    </div>
                                    <div className="CommonNavItem">
                                        <div className="title">
                                            <i className="fl ico-account"/>
                                            <span>账户管理</span>
                                        </div>
                                        <NavLink to="/TransRecord" strict activeClassName="on">交易记录</NavLink>
                                        <NavLink to="/WithdrawHistory" strict activeClassName="on">提现记录</NavLink>
                                        <NavLink to="/AccountManager" strict activeClassName="on">银行卡账户信息</NavLink>
                                    </div>
                                </div>
                                <div className="rightContent fr">
                                    <Route exact path="/"
                                           render={() => (<Redirect to="/sellerCenter"/>)}/>
                                    <Route path="/SellerCenter" component={SellerCenter}/>
                                    <Route path="/SellerOrderList" component={SellerOrderList}/>
                                    {/*<Route path="/Evaluation" component={Evaluation}/>*/}
                                    <Route path="/DemandAswer" component={DemandAswer}/>
                                    <Route path="/CollectAswer" component={CollectAswer}/>
                                    <Route path="/ShopBaseInfo" component={ShopBaseInfo}/>
                                    <Route path="/MannageServer" component={MannageServer}/>
                                    <Route path="/TransRecord" component={TransRecord}/>
                                    <Route path="/WithdrawHistory" component={WithDrawHistory}/>
                                    <Route path="/WithdrawApply" component={WithdrawApply}/>
                                    <Route path="/AccountManager" component={AccountManager}/>
                                </div>
                            </div>
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}

export default Main;
