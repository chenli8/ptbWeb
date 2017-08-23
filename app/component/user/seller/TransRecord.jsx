import React from 'react';
import layer from '../../../public/js/layer';
import serviceApi from '../../../public/js/serviceApi';
import utils from '../../../public/js/utils';
import "../../../public/css/sellerDealRecord.css"

import cookie from 'react-cookie'
import moment from 'moment-kirk';
import Page from "../../common/Page";
import urlManager from "../../../public/js/urlManager";

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

        this.postApi = serviceApi('querydetail', params, (data) => {
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
                        <div className="transRecordDetailCon">
                            <div className="transRecordDetailTop ">
                                <div className="title fl">交易详情</div>
                                <a href="javascript:;" className="fr" onClick={this.close.bind(this)}></a>
                            </div>
                            <div className="transRecordDetailPrice">
                                <div className="price fl">
                                    <span className="fl">+</span><b dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceTwo(info.money / 100, 0)}}></b>
                                </div>
                                <div className="status fr">{info.payStatus == 0 ? "未付款" : "已付款"}</div>
                            </div>
                            <div className="common-h50">
                                <div className="fl common-gray">订单编号</div>
                                <div className="fr">{info.orderNo}</div>
                            </div>
                            <div className="common-h50">
                                <div className="fl common-gray">收款时间</div>
                                <div className="fr">
                                    <span>{moment(info.payTime, "x").format('YYYY-MM-DD HH:mm:ss')}</span>
                                </div>
                            </div>
                            {
                                info.otherSideUser ?
                                    <div className="moneyInfoCon">
                                        <div className="moneyInfoTitle">买家信息</div>
                                        <div className="common-h50-b">
                                            <div className="fl">买家名称</div>
                                            <div className="fr">{info.otherSideUser.userName}</div>
                                        </div>
                                        <div className="common-h50-b">
                                            <div className="fl">{info.orderType === 3 ? "购买服务" : "需求应答" }</div>
                                            <div className="fr">{info.productName}</div>
                                        </div>
                                        <div className="common-h50-b">
                                            <div className="fl">交易金额</div>
                                            <div className="fr dealPrice">
                                                <b dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceTwo(info.money / 100, 0)}}></b>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                            }
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
                                {record.productName}
                            </div>
                            <div className="price fl">
                                <span className="add-price fl">+</span><b className="add-price" dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceOne(record.money / 100, 0)}}></b>
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
            type: 1,
            userType: 2
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
                <div className="title">交易记录</div>
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
                        state.recordList.length >0 ?
                            state.recordList.map((item) => {
                                return ( <OrderItem record={item} key={item.detailId}/>)
                            })
                                 :
                            <p className="noListTap">
                              还未产生交易
                            </p>
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
                                <span>{state.isBandBankCard ? "查看账户信息" : "绑定银行卡"}</span>
                            </div>
                            <div className="Totalbtm">
                                <ul>
                                    <li>
                                        <spn>可用余额</spn>
                                        <b><i className="sub">¥</i>{utils.toDecimal2(data.masterAccountMoney / 100)}</b>
                                    </li>
                                    <li>
                                        <spn>累计收入</spn>
                                        <b><i className="sub">¥</i>{utils.toDecimal2(data.sellerIncomeAmount / 100)}</b>
                                    </li>
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

class TransRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    jumpToBankCardInfo(){
        this.props.history.push({ pathname: '/AccountManager'});
    }

    render() {
        return (
            <div className="sellerTransRecordCon">
                <UserCard jumpToBankCardInfo={this.jumpToBankCardInfo.bind(this)}/>
                <OrderHistory/>
            </div>
        );
    }
}
export default TransRecord;