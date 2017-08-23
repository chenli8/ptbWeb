import React from 'react';
import '../../../../public/css/sellerWithdrawals.css';
import layer from "../../../../public/js/layer";
import urlManager from "../../../../public/js/urlManager";
import serviceApi from "../../../../public/js/serviceApi";

import cookie from 'react-cookie'
import moment from 'moment-kirk';
import utils from '../../../../public/js/utils';
import Page from "../../../common/Page";

class TransRecordDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transRecordDetail:null
        };
    }

    componentDidMount() {
        this.getRecordDetail();
    }

    getRecordDetail(){
        var params = {
            detailId: this.props.recordId
        }

        this.postApi = serviceApi('txdetail', params, (data) => {
            this.setState({
                transRecordDetail:data
            })
        }, (data) => {
            layer.msg(data.message)
        });
    }

    close(){
        this.props.onHideDetailClick();
    }

    render() {
        var info = this.state.transRecordDetail;
        return (
            <div className="layerModal">
                {
                    info ?
                        <div className="withdrawDetailCon">
                            <div className="withdrawDetailTop">
                                <div className="title fl">提现详情</div>
                                <a href="javascript:;" className="fr" onClick={this.close.bind(this)}/>
                            </div>
                            <div className="transRecordDetailPrice">
                                <div className="clear">
                                    <div className="price fl">
                                        <b dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceTwo(info.money / 100, 0)}}/>
                                    </div>
                                    <div className="status fr">{info.withdrawStatus == 1 ? "审核中" : info.withdrawStatus == 2 ? "提现成功" : "提现驳回"}</div>
                                </div>
                                <div className="moneyPrompt">
                                    到账时间：收到发票后5-7个工作日
                                </div>
                            </div>
                            <div className="common-h50">
                                <div className="fl common-gray">流水号</div>
                                <div className="fr">{info.orderNo}</div>
                            </div>
                            <div className="common-h50">
                                <div className="fl common-gray">创建时间</div>
                                <div className="fr">
                                    <span>{moment(info.applicationTime, "x").format('YYYY-MM-DD HH:mm:ss')}</span>
                                </div>
                            </div>
                            <div className="common-h50">
                                <div className="fl common-gray">提现账户</div>
                                <div className="fr">
                                    <span>{info.bankName + "  " + "  " + info.bankCardNo}</span>
                                </div>
                            </div>
                            <div className="common-h50">
                                <div className="fl common-gray">提现金额</div>
                                <div className="fr txMoney">
                                    <b dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceTwo(info.money / 100, 0)}}/>
                                </div>
                            </div>
                            <ul className="withdrawOrderListTitle">
                                <li className="withdrawOrderListTitleItem">订单号</li>
                                <li>订单金额</li>
                                <li>提现金额</li>
                                <li>时间</li>
                            </ul>
                            <ul className="withdrawOrderList">
                                {
                                    info.orderList ?
                                        info.orderList.map((item) => {
                                            return ( <li key={item.orderId}>
                                                <div className="withdrawItem">
                                                    <div className="orderNo fl">
                                                        {item.rechargeOrderNo}
                                                    </div>
                                                    <div className="orderMoney fl">
                                                        <b dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceTwo(item.orderTotalPrice / 100, 0)}}/>
                                                    </div>
                                                    <div className="txMoney fl">
                                                        <b dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceTwo(item.totalAmount / 100, 0)}}/>
                                                    </div>
                                                    <div className="date fl">
                                                        {moment(item.createTime, "x").format('YYYY-MM-DD HH:mm:ss')}
                                                    </div>
                                                </div>
                                            </li>)
                                        })
                                        :
                                        null
                                }
                            </ul>
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}

class OrderItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetail:false,
        };
    }

    onShowDetailClick(){
        this.setState({
            isShowDetail:true,
        })
    }

    onHideDetailClick(){
        this.setState({
            isShowDetail:false,
        })
    }

    render() {
        var record = this.props.record;
        return (
            <li>
                <div className="RecorHis">
                    <ul>
                        <li>
                            <div className="date fl">
                                <span>{moment(record.createdTime, "x").format('YYYY-MM-DD HH:mm:ss')}</span>
                            </div>
                            <div className="desc fl">
                                {record.status === 1 ? "处理中" : record.status === 2 ? "已处理" : "提现驳回"}
                            </div>
                            <div className="price fl">
                                <b dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceOne(record.money / 100, 0)}}/>
                            </div>
                            <a href="javascript:;" className="findDesc" onClick={() => this.onShowDetailClick()}>查看详情</a>
                        </li>
                    </ul>
                </div>
                {this.state.isShowDetail ?
                    <TransRecordDetail recordId={record.detailId} onHideDetailClick={this.onHideDetailClick.bind(this)}/> : null}
            </li>
        )
    }
}

class OrderHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalNum: 0,
            start: 0,
            pageSize: 10,
            recordList: [],
            isLoad:false
        };
    }

    componentDidMount() {
        this.getRecordList();
    }

    getRecordList(){
        var state = this.state;

        var params = {
            start: state.start,
            end: state.start + state.pageSize,
            type: 3,
        }
        layer.loading.open();
        this.postApi = serviceApi('queryList', params, (data) => {
            layer.loading.close();
            this.setState({
                totalNum: data.totalNum,
                recordList: data.list,
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
            this.getRecordList()
        })
    }

    render() {
        var state = this.state;
        return (
            <div className="dealRecordCon">
                <div className="title">提现记录</div>
                <div className="RecorbtmNav">
                    <ul>
                        <li>时间</li>
                        <li>说明</li>
                        <li>金额</li>
                    </ul>
                </div>
                <ul className="recordList">
                    {
                        state.isLoad ?
                         state.recordList.length>0?
                            state.recordList.map((item) => {
                                return ( <OrderItem record={item} key={item.detailId}/>)
                            })
                                :
                            <p className="noListTap">还未申请提现。</p>
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

class UserCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBandBankCard:false,
            data:{}
        };
    }

    componentDidMount() {
        this.getUserInfo();
        this.getBankCardInfo();
    }

    getUserInfo() {
        layer.loading.open();
        this.postApi = serviceApi('account', {
        }, (data) => {
            layer.loading.close();
            this.setState({
                data: data,
            });
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    getBankCardInfo() {
        this.postApi = serviceApi('abankcard', {
            userid:cookie.load('chatUid')
        }, (data) => {
            if(data.list[0]){
                this.setState({
                    isBandBankCard:true
                })
            }
        }, (data) => {
            layer.msg(data.message)
        });
    }

    bindCard(){
        this.props.jumpToBankCardInfo();
    }

    withdrawApply(){
        this.props.withdrawApply();
    }

    render() {
        var state = this.state;
        var data = state.data;

        return (
            <div className="accountInfoCon">
                {
                    data ?
                        <div className="Total">
                            <div className="Totaltop">
                                <span>总资产</span>
                                <b><i className="sub">¥</i>{utils.toDecimal2(data.masterAccountMoney / 100 + data.frozenAccountMoney / 100)}</b>
                            </div>
                            <div className="bindCar fr" onClick={() => this.bindCard()}>
                                <i className={state.isBandBankCard ? "ico-addCar hide" : "ico-addCar"}> </i>
                                <span>
                                    {
                                        state.isBandBankCard ?
                                            <div className="fr">
                                                <i className="ico-bandCards"> </i>
                                                <span>银行卡账户信息</span>
                                            </div>
                                        :
                                        "绑定银行卡"
                                }
                                </span>
                            </div>
                            <div className="Totalbtm">
                                <ul>
                                    <li>
                                        <spn>可提现</spn>
                                        <b><i className="sub">¥</i>{utils.toDecimal2(data.masterAccountMoney / 100)}</b>
                                    </li>
                                    <li>
                                        <spn>累计收入</spn>
                                        <b><i className="sub">¥</i>{utils.toDecimal2(data.sellerIncomeAmount / 100)}</b>
                                    </li>
                                </ul>
                            </div>
                            <div className="apply fr">
                                <a href="javascript:;" className="theme-button-bg" onClick={() => this.withdrawApply()}>提现</a>
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        );
    }
}

class WithdrawHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    jumpToBankCardInfo(){
        this.props.history.push({ pathname: '/AccountManager'});
    }

    withdrawApply(){
        this.props.history.push({ pathname: '/WithdrawApply/Main'});
    }

    render() {
        return (
            <div className="sellerTransRecordCon">
                <UserCard jumpToBankCardInfo={this.jumpToBankCardInfo.bind(this)}
                          withdrawApply={this.withdrawApply.bind(this)}/>
                <OrderHistory/>
            </div>
        );
    }
}

export default WithdrawHistory;