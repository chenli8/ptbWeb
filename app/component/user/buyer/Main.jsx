import React, {Component} from 'react';
import {HashRouter as Router,Route, NavLink, Redirect} from 'react-router-dom'

import SearchBtn from '../../common/SearchBtn.jsx';
import BuyerCenter from './BuyerCenter.jsx';
import BuyerOrderList from './myOrder/BuyerOrderList.jsx';
import Evaluation from './evaluation/Evaluation.jsx';
import BuyerDemandList from './myDemand/BuyerDemandList.jsx';
import TransRecord from './TransRecord.jsx';
import BuyerBankAccountInfo from "./BuyerBankAccountInfo";
import MySupplier from "./myCollect/MySupplier";

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    render() {
        return (
            <div className="container">
                <div className="buyerCenterCon">
                    <SearchBtn/>
                    <Router>
                        <div className="buyerCon">
                            <div className="top">
                                <div className="title fl">
                                    <i className="ico-home" />
                                    <NavLink to="/BuyerCenter"  strict activeClassName="on" >买家中心</NavLink>
                                </div>
                            </div>
                            <div className="main">
                                <div className="leftNav fl">
                                    <div className="CommonNavItem">
                                        <div className="title">
                                            <i className="fl ico-order"> </i>
                                            <span>交易管理</span>
                                        </div>
                                        <NavLink to="/BuyerOrderList"  strict activeClassName="on" >我的订单</NavLink>
                                        {/*<NavLink to="/evaluation/Evaluation" strict activeClassName="on">我的评价</NavLink>*/}
                                    </div>
                                    <div className="CommonNavItem">
                                        <div className="title">
                                            <i className="fl ico-demands"> </i>
                                            <span>需求管理</span>
                                        </div>
                                        <NavLink to="/myDemand/BuyerDemandList" strict activeClassName="on">我的需求</NavLink>
                                    </div>
                                    <div className="CommonNavItem">
                                        <div className="title">
                                            <i className="fl ico-supplier"> </i>
                                            <span>服务商</span>
                                        </div>
                                        <NavLink to="/myCollect/MySupplier/CollectShop/Collect" strict activeClassName="on">我收藏的</NavLink>
                                        <NavLink to="/myCollect/MySupplier/Cooperat" strict activeClassName="on">我合作过的</NavLink>
                                    </div>
                                    <div className="CommonNavItem">
                                        <div className="title">
                                            <i className="fl ico-account"> </i>
                                            <span>账户管理</span>
                                        </div>
                                        <NavLink to="/TransRecord" strict activeClassName="on">交易记录</NavLink>
                                        <NavLink to="/BuyerBankAccountInfo" strict activeClassName="on">银行卡账户信息</NavLink>
                                    </div>
                                </div>
                                <div className="rightContent fr">
                                    <Route exact path="/"
                                           render={() => (<Redirect to="/BuyerCenter"/>)}/>
                                    <Route path="/BuyerCenter" component={BuyerCenter}/>
                                    <Route path="/BuyerOrderList" component={BuyerOrderList}/>
                                    {/*<Route path="/evaluation/Evaluation" component={Evaluation}/>*/}
                                    <Route path="/myDemand/BuyerDemandList" component={BuyerDemandList}/>
                                    <Route path="/myCollect/MySupplier/" component={MySupplier}/>
                                    <Route path="/myCollect/MySupplier2/" component={MySupplier}/>
                                    <Route path="/TransRecord" component={TransRecord}/>
                                    <Route path="/BuyerBankAccountInfo" component={BuyerBankAccountInfo}/>
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
