import React from 'react';
import moment from 'moment-kirk';
import layer from "../../../../public/js/layer";
import serviceApi from "../../../../public/js/serviceApi";
import cookie from 'react-cookie'
import utils from "../../../../public/js/utils";
import TimeStep from "../../../shop/common/TimeStep";
import PwInput from "../../../shop/common/payType/PwInput";
import urlManager from "../../../../public/js/urlManager";
import $ from 'jquery';
import md5 from "../../../../public/js/md5";

class WithdrawOrderItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    onItemSelect(order) {
        if (order === null) {
            return;
        }
        let temp = order;
        temp.isSelected = !temp.isSelected;
        this.setState({
            order: temp
        })
        this.props.onItemSelect(temp);
    }

    render() {
        var order = this.props.order;
        return (
            <li>
                <div className="orderItem">
                    <div className="title">
                        <i className={order.isSelected ? "ico-checked" : ""}
                           onClick={this.onItemSelect.bind(this, order)}/>
                        <span>订单号：</span>
                        <b>{order.orderNo}</b>
                        <time className="fr">
                            {moment(order.createTime, "x").format('YYYY-MM-DD HH:mm')}
                        </time>
                    </div>
                    <div className="orderInfo">
                        <div className="require fl commonSingleLine">
                            {order.productName}
                        </div>
                        <div className="orderPrice fl">
                            <span>订单金额</span>
                            <div>
                                <b dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceTwo(order.sellerTotalPrice / 100)}}/>
                            </div>
                        </div>
                        <div className="orderMoney fr clear">
                            {
                                order.txMoney ?
                                    order.txMoney.map((item, idx) => {
                                        return (
                                            <div key={idx}>
                                            <span
                                                className="fl">{item.moneyType == 1 ? '预付：' : item.moneyType == 2 ? '尾款：' : '全款：'}</span><b
                                                className={item.txStatus == 2 ? "dis" : ""}
                                                dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceTwo(item.totalAmount / 100)}}/>{item.txStatus == 0 ? '(可提现)' : item.txStatus == 1 ? '(已提现)' : '(未支付)'}
                                            </div>
                                        )
                                    })
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

class WithdrawApplyMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            isShowAll: false,
            accountInfo: {},
            bankCardInfo: {},
            withdrawList: [],
            selectedWithdrawList: [],
            selectedWithdrawMoney: 0,
            timeStepList: [
                {title: "选择订单提现", subTitle: "", status: 1},
                {title: "输入交易密码", subTitle: "", status: 0},
                {title: "完成", subTitle: "", status: 0}
            ]
        };
    }

    componentDidMount() {
        this.getAccountInfo()
        this.getBankCard()
        this.getWithdrawList();
    }

    getAccountInfo() {
        layer.loading.open();
        this.postApi = serviceApi('account', {}, (data) => {
            layer.loading.close();
            this.setState({
                accountInfo: data,
            });
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    getBankCard() {
        this.postApi = serviceApi('abankcard', {
            userid: cookie.load('chatUid')
        }, (data) => {
            this.setState({
                bankCardInfo: data.list[0],
            });
        }, (data) => {
            layer.msg(data.message)
        });
    }

    getWithdrawList() {
        this.postApi = serviceApi('aTxlist', {}, (data) => {
            layer.loading.close();
            this.formatWithdrawList(data);
            this.setState({
                withdrawList: data
            })
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    formatWithdrawList(list) {
        if (list === null || list.length === 0) {
            return;
        }
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            item.isSelected = false;
            let txMoneyList = item.txMoney;
            let sumMoney = 0;
            for (let j = 0; j < txMoneyList.length; j++) {
                let txMoney = txMoneyList[j];
                if (txMoney.txStatus === 0) {
                    sumMoney += txMoney.totalAmount;
                }
            }
            item.canWithdrawMoney = sumMoney;
        }
    }

    setSelectedWithdrawMoney() {
        let sum = 0;
        for (let i = 0; i < this.state.selectedWithdrawList.length; i++) {
            let item = this.state.selectedWithdrawList[i];
            sum += item.canWithdrawMoney;
        }

        this.setState({
            selectedWithdrawMoney: sum
        })
    }

    onNext() {
        if (this.state.withdrawList.length <= 0) {
            return;
        }

        if (this.state.selectedWithdrawList.length === 0) {
            layer.msg("请选择提现订单");
            return;
        }

        this.state.timeStepList[1].status = 1;
        this.setState({step: 1});
    }

    onItemSelect(item) {
        let THIS = this;

        if (item.isSelected) {
            this.setState({
                selectedWithdrawList: this.state.selectedWithdrawList.concat([item])
            }, function () {
                THIS.setSelectedWithdrawMoney();
            })
        } else {
            var tempArr = [];
            for (let i = 0; i < this.state.selectedWithdrawList.length; i++) {
                let selectedItem = this.state.selectedWithdrawList[i];
                if (item.orderId != selectedItem.orderId) {
                    tempArr.push(selectedItem);
                }
            }

            this.setState({
                selectedWithdrawList: tempArr
            }, function () {
                THIS.setSelectedWithdrawMoney();
            })
        }
    }

    onOpenAll() {
        if (this.state.isShowAll) {
            $("#selectedWithdrawListId").removeClass("openAll");
            $("#selectedWithdrawListId").addClass("openPart");
        } else {
            $("#selectedWithdrawListId").removeClass("openPart");
            $("#selectedWithdrawListId").addClass("openAll");
        }
        this.setState({
            isShowAll: !this.state.isShowAll
        })
    }

    onPswChange(e) {
        $('#pswId').css({'border': '1px solid #E8E8E8'});
    }

    onBack() {
        this.setState({step: 0})
    }

    onSubmit() {
        if (this.refs.password.state.password === undefined || this.refs.password.state.password === '') {
            layer.msg("请输入支付密码");
            return;
        }
        if (this.refs.password.state.password.length != 6) {
            layer.msg("支付密码为六位数字");
            return;
        }

        if (this.refs.password.state.password === 1) {
            this.withdrawApply();
        } else {
            this.checkPayPwd();
        }
    }

    checkPayPwd() {
        layer.loading.open();
        this.postApi = serviceApi('aPayPasswordHas', {}, (data) => {
            layer.loading.close();
            if (data.haspaypwd === 1) {
                this.withdrawApply();
            } else {
                layer.msg("请先设置支付密码")
            }
            this.setState({
                pasPsw: data.haspaypwd
            })
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    withdrawApply() {
        let orderNoList = [];
        for (let i = 0; i < this.state.selectedWithdrawList.length; i++) {
            let item = this.state.selectedWithdrawList[i];
            orderNoList.push(item.orderNo);
        }

        let params = {
            money: this.state.selectedWithdrawMoney,
            realMoney: this.state.selectedWithdrawMoney,
            userBankCardId: this.state.bankCardInfo.userBankCardId,
            payPassword: md5(this.refs.password.state.password).toUpperCase(),
            orderNoList: orderNoList
        };

        layer.loading.open();
        this.postApi = serviceApi('aWithdrawcash', params, (data) => {
            layer.loading.close();
            this.state.timeStepList[2].status = 1;
            this.setState({step: 2})
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    onEnsure(){
        this.props.history.push({ pathname: '/WithdrawHistory'});
    }

    render() {
        let state = this.state;
        var accountInfo = state.accountInfo;
        var bankCardInfo = state.bankCardInfo;
        return (
            <div>
                {
                    state.step == 0 ?
                        <div className="withdrawCon">
                            <div className="withdrawTop">
                                <div className="withdrawTitle">
                                    提现申请
                                </div>
                                <div className="stepCon">
                                    <TimeStep timeData={this.state.timeStepList}/>
                                </div>
                                {
                                    bankCardInfo ?
                                        <div className="bankInfoCon clear">
                                            <div className="bankName fl">
                                                提现账户：{bankCardInfo.bankName}
                                            </div>
                                            <div className="bankAccountName fl">
                                                {bankCardInfo.accountName}
                                            </div>
                                            <div className="bankNo fl">
                                                银行卡号：{bankCardInfo.bankCardNo}
                                            </div>
                                        </div>
                                        :
                                        null
                                }
                                {
                                    accountInfo ?
                                        <div className="sellCardInfo">
                                            <ul className="carBtm">
                                                <li>
                                                    <span>可提现金额</span>
                                                    <b dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceOne(accountInfo.masterAccountMoney / 100, 0)}}/>
                                                </li>
                                                <li>
                                                    <span>已选提现金额</span>
                                                    <b dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceTwo(this.state.selectedWithdrawMoney / 100)}}/>
                                                </li>
                                                <li>
                                                    <span>已选提现订单</span>
                                                    <b>{this.state.selectedWithdrawList.length}</b>
                                                </li>
                                            </ul>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                            <div className="withdrawStep1Con">
                                <div className="orderListCon">
                                    <div className="orderListTop">
                                        <div className="chooseOrderTitle fl">请选择订单：</div>
                                        <div className="search fr" style={{display: "none"}}>
                                            <div className="searchType fl">
                                                <div>
                                                    服务名称<i className="ico-arrow-down"> </i>
                                                </div>
                                            </div>
                                            <input className="searchInput fl" placeholder="请输入关键字"/>
                                            <a href="javascript:;" className="searchBtn theme-button-bg fl">搜索</a>
                                        </div>
                                    </div>
                                    <ul className="withdrawOrderList">
                                        {
                                            (this.state.withdrawList && this.state.withdrawList.length > 0) ?
                                                this.state.withdrawList.map((item) => {
                                                    return (<WithdrawOrderItem order={item} key={item.orderId}
                                                                               onItemSelect={this.onItemSelect.bind(this)}/>)
                                                })
                                                :
                                                <p className="empty">暂无可提现订单</p>
                                        }
                                    </ul>
                                </div>
                                <a href="javascript:;"
                                   className={this.state.withdrawList.length > 0 ? "next theme-button-bg" : "nextDis"}
                                   onClick={() => this.onNext()}>下一步</a>
                            </div>
                        </div>
                        :
                        state.step == 1 ?
                            <div className="withdrawCon">
                                <div className="withdrawTop">
                                    <div className="withdrawTitle">
                                        提现申请
                                    </div>
                                    <div className="stepCon">
                                        <TimeStep timeData={this.state.timeStepList}/>
                                    </div>
                                    {
                                        bankCardInfo ?
                                            <div className="bankInfoCon clear">
                                                <div className="bankName fl">
                                                    提现账户：{bankCardInfo.bankName}
                                                </div>
                                                <div className="bankAccountName fl">
                                                    {bankCardInfo.accountName}
                                                </div>
                                                <div className="bankNo fl">
                                                    银行卡号：{bankCardInfo.bankCardNo}
                                                </div>
                                            </div>
                                            :
                                            null
                                    }
                                    {
                                        accountInfo ?
                                            <div className="sellCardInfo">
                                                <ul className="carBtm">
                                                    <li>
                                                        <span>可提现金额</span>
                                                        <b dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceOne(accountInfo.masterAccountMoney / 100, 0)}}/>
                                                    </li>
                                                    <li>
                                                        <span>已选提现金额</span>
                                                        <b dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceTwo(this.state.selectedWithdrawMoney / 100)}}/>
                                                    </li>
                                                    <li>
                                                        <span>已选提现订单</span>
                                                        <b>{this.state.selectedWithdrawList.length}</b>
                                                    </li>
                                                </ul>
                                            </div>
                                            :
                                            null
                                    }
                                </div>
                                <div className="withdrawStep2Con clear">
                                    <ul className="withdrawStep2TitleCon">
                                        <li>订单号</li>
                                        <li>订单金额</li>
                                        <li>提现金额（预付）</li>
                                        <li>时间</li>
                                    </ul>
                                    <ul className="openPart clear" id="selectedWithdrawListId">
                                        {
                                            this.state.selectedWithdrawList ?
                                                this.state.selectedWithdrawList.map((item) => {
                                                    return (
                                                        <li key={item.orderId}>
                                                            <span>{item.orderNo}</span>
                                                            <span
                                                                dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceTwo(item.sellerTotalPrice / 100)}}/>
                                                            <span
                                                                dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceTwo(item.canWithdrawMoney / 100)}}/>
                                                            <span>{moment(item.createTime, "x").format('YYYY-MM-DD HH:mm')}</span>
                                                        </li>)
                                                })
                                                :
                                                null
                                        }
                                    </ul>
                                    {
                                        this.state.selectedWithdrawList.length > 4 ?
                                            <div className="showMore fr">
                                                <a href="javascript:;"
                                                   onClick={this.onOpenAll.bind(this)}>{this.state.isShowAll ? "收起" : "展开"}<i
                                                    className="ico-arrow-down fr"/></a>
                                            </div>
                                            :
                                            null
                                    }
                                    <div className="withdrawMoneyCon">
                                        <span>到账金额：</span><span
                                        dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceTwo(this.state.selectedWithdrawMoney / 100)}}/>
                                        <b>到账时间：收到发票后5个工作日内</b>
                                    </div>
                                    <div className="password">
                                        <span className="fl">交易密码：</span><PwInput position="right" ref="password"/>
                                        <a href={urlManager.pAccount + "#/PayPassword"} target="_blank">忘记密码?</a>
                                    </div>
                                    <a href="javascript:;" className="nextBtns fr theme-button-bg"
                                       onClick={this.onSubmit.bind(this)}>下一步</a>
                                    <a href="javascript:;" className="returnBtns fr button"
                                       onClick={this.onBack.bind(this)}>返回修改</a>
                                </div>
                            </div>
                            :
                            <div className="withdrawCon">
                                <div className="withdrawTop">
                                    <div className="withdrawTitle">
                                        提现申请
                                    </div>
                                    <div className="stepCon">
                                        <TimeStep timeData={this.state.timeStepList}/>
                                    </div>
                                </div>
                                <div className="withdrawStep3Con">
                                    <i></i>
                                    <div className="title">提现申请提交成功</div>
                                    <div className="subTitle">提现需开具发票，开票信息请联系买方确认，买方收票后款项将在5~7个工作日内到账。
                                        请在“个人中心-提现记录”中查看。
                                    </div>
                                    <a href="javascript:;" className="next theme-button-bg"
                                       onClick={() => this.onEnsure()}>确定</a>
                                </div>
                            </div>
                }
            </div>
        );
    }
}

export default WithdrawApplyMain;
