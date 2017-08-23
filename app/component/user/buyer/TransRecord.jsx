import React from 'react';
import layer from '../../../public/js/layer';
import serviceApi from '../../../public/js/serviceApi';
import utils from '../../../public/js/utils';
import "../../../public/css/buyerDealRecord.css"
import urlManager from "../../../public/js/urlManager";
import cookie from 'react-cookie'
import moment from 'moment-kirk';
import Page from "../../common/Page";

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
                    info?
                        <div className="transRecordDetailCon">
                            <div className="transRecordDetailTop ">
                                <div className="title fl">交易详情</div>
                                <a href="javascript:;" className="fr" onClick={this.close.bind(this)}/>
                            </div>
                            <div className="transRecordDetailPrice">
                                <div className="price fl">
                                   <span className="fl price-color" style={{fontSize:30}}>-</span><b dangerouslySetInnerHTML={{__html:utils.toFixedNumPriceTwo(info.money / 100, 0)}}/>
                                </div>
                                <div className="status fr">{info.payStatus == 0 ? "未支付" : "已支付"}</div>
                            </div>
                            <div className="common-h50">
                                <div className="fl common-gray">交易流水号</div>
                                <div className="fr">{info.rechargeOrderNo}</div>
                            </div>
                            <div className="common-h50">
                                <div className="fl common-gray">创建时间</div>
                                <div className="fr">
                                    <span>{moment(info.createdTime, "x").format('YYYY-MM-DD HH:mm:ss')}</span>
                                </div>
                            </div>
                            <div className="common-h50">
                                <div className="fl common-gray">订单号</div>
                                <div className="fr">{info.orderNo}</div>
                            </div>
                            <div className="common-h50">
                                <div className="fl common-gray">付款方式</div>
                                <div className="fr">{info.payMethod == 2 ? "线下支付" : info.payType == 1 ? "支付宝" : info.payType == 2 ? "微信" : "银联"}</div>
                            </div>
                            {
                                info.bankInfo ?
                                    <div className="moneyInfoCon">
                                        <div className="moneyInfoTitle">汇款信息</div>
                                        <div className="payMoneyCon common-h50-b">
                                            <div className="payMoneyLeft fl">
                                                <div className="fl">付款金额</div>
                                                <div className="fr">
                                                    <b dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceTwo(info.money / 100, 0)}}></b>
                                                </div>
                                            </div>
                                                <div className="payMoneyRight fr">
                                                <div className="fl">账号</div>
                                                <div className="fr">{info.bankInfo.openAccountUserNum}</div>
                                            </div>
                                        </div>
                                        <div className="common-h50-b">
                                            <div className="fl">公司名称</div>
                                            <div className="fr">{info.bankInfo.openAccountUserName}</div>
                                        </div>
                                        <div className="common-h50-b">
                                            <div className="fl">开户行</div>
                                            <div className="fr">{info.bankInfo.openAccountBankName}</div>
                                        </div>
                                        <div className="verificationInfoCon common-h50-b">
                                            <div className="verificationInfoLeft fl">
                                                <div className="fl">附加验证信息</div>
                                                <div className="verificationInfoCode fr">{info.verificationCode}</div>
                                            </div>
                                            <div className="verificationInfoRight fr">请将附加验证信息填写入转账单的附加信息栏</div>
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
                               {/* {
                                    record.money < 0 ?
                                        <span>-</span>
                                        :
                                        null
                                }*/}
                                <span>-</span><b dangerouslySetInnerHTML={{__html:utils.toFixedNumPriceOne(record.money / 100, 0)}}/>
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
            userType: 1
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
                        state.recordList.length > 0 ?
                            state.recordList.map((item) => {
                                return ( <OrderItem record={item} key={item.detailId}/>)
                            })
                            :
                           <p className="noListTap">还未产生交易。</p>
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
                                      <spn>累计消费</spn>
                                      <b><i className="sub">¥</i>{utils.toDecimal2(data.buyerIncomeAmount / 100)}</b>
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
        this.props.history.push({ pathname: '/BuyerBankAccountInfo'});
    }

    render() {
        return (
            <div className="buyerTransRecordCon">
                <UserCard jumpToBankCardInfo={this.jumpToBankCardInfo.bind(this)}/>
                <OrderHistory/>
            </div>
        );
    }
}

export default TransRecord;