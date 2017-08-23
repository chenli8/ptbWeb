import React from 'react';
import '../../../public/css/sellerAccountManager.css';
import layer from '../../../public/js/layer';
import serviceApi from '../../../public/js/serviceApi';
import cookie from 'react-cookie'
import $ from 'jquery';
import {Component} from "react/lib/ReactBaseClasses";

class BandBankCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bankInfo:{
                accountType:2,
                bankCardNo:"",
                bankName:"",
                accountName:"",
            }
        };
    }

    onBankCardNoChange(e){
        this.state.bankInfo.bankCardNo = e.target.value;
        $('#bankCardNoId').css({'border': '1px solid #E8E8E8'});
    }

    onCompanyNameChange(e){
        this.state.bankInfo.accountName = e.target.value;
        $('#companyNameId').css({'border': '1px solid #E8E8E8'});
    }

    onBankNameChange(e){
        this.state.bankInfo.bankName = e.target.value;
        $('#bankNameId').css({'border': '1px solid #E8E8E8'});
    }

    onNext(){
        if (this.state.bankInfo.bankCardNo === '') {
            $('#bankCardNoId').css({'border': '1px solid #f00000'}).focus();
            return
        }
        if (this.state.bankInfo.accountName === '') {
            $('#companyNameId').css({'border': '1px solid #f00000'}).focus();
            return
        }
        if (this.state.bankInfo.bankName === '') {
            $('#bankNameId').css({'border': '1px solid #f00000'}).focus();
            return
        }

        this.bandBankCard();
    }

    bandBankCard(){
        layer.loading.open();
        serviceApi('aBindbankcard', this.state.bankInfo, (data) => {
            layer.loading.close();
            this.props.onBandBankCardSuccess();
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        })
    }

    render() {
        return (
            <div className="bandBankCardStep1Con">
                <div className="companyBaseInfoTitle commonTitle commonGray">
                    企业账户基本信息
                </div>
                <div className="commonMt-30">
                    <div className="commonSubTitle commonGray">
                        账号<span className="commonInputPrompt">(必填)</span>
                    </div>
                    <input type="text" placeholder="" className="commonInput commonSingleLine" id="bankCardNoId" onChange={(e)=>this.onBankCardNoChange(e)}/>
                </div>
                <div className="commonMt-30">
                    <div className="commonSubTitle commonGray">
                        公司<span className="commonInputPrompt">(必填)</span>
                    </div>
                    <input type="text" placeholder="" className="commonInput commonSingleLine" id="companyNameId" onChange={(e)=>this.onCompanyNameChange(e)}/>
                </div>
                <div className="commonMt-30">
                    <div className="commonSubTitle commonGray">
                        开户行<span className="commonInputPrompt">(必填)</span>
                    </div>
                    <input type="text" placeholder="" className="commonInput commonSingleLine" id="bankNameId" onChange={(e)=>this.onBankNameChange(e)}/>
                </div>
                <a href="javascript:;" className="next theme-button-bg" onClick={() => this.onNext()}>绑定银行卡</a>
            </div>
        );
    }
}

class AccountManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded:false,
            data:{}
        };
    }

    getBankCard() {
        layer.loading.open();
        this.postApi = serviceApi('abankcard', {
            userid:cookie.load("chatUid")
        }, (data) => {
            layer.loading.close();
            this.setState({
                data: data.list[0],
                isLoaded:true
            });
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    componentDidMount() {
       this.getBankCard()
    }

    onBandBankCardSuccess(){
        this.getBankInfo()
    }

    render() {
        var state=this.state;
        var data=this.state.data;
        return (
            <div className="account">
              {
                  state.isLoaded ?
                      data?
                          <div className="cont">
                              <div className="bankInfo">
                                  <div className="type clear">
                                      <div className="fl">
                                          <p className="commonTitle">账户类型</p>
                                          <p className="commonSubTitle">
                                              {
                                                  data.accountType ?
                                                      data.accountType== 1 ? '个人账户' : '企业账户'
                                                      :
                                                      null
                                              }
                                          </p>
                                      </div>
                                      <div className="rights fl">
                                          <p className="commonTitle">开户行</p>
                                          <p className="commonSubTitle openBank">{data.bankName}</p>
                                      </div>
                                  </div>
                                  <div className="name">
                                      <div>
                                          <p className="commonTitle">开户名称</p>
                                          <p className="commonSubTitle">{data.accountName}</p>
                                      </div>
                                  </div>
                                  <div className="bankNum">
                                      <div>
                                          <p className="commonTitle">银行卡号</p>
                                          <p className="commonSubTitle">{data.bankCardNo}</p>
                                      </div>
                                  </div>
                              </div>
                              <div className="desc">
                                  <p>若信息有误，请联系在线客服或致电010-85079618，发邮件至xiaomi@pintuibao.cn</p>
                                  <p>通知系统更改，客服会告知更改信息需要准备的材料。</p>
                              </div>
                          </div>
                          :
                          <BandBankCard/>
                      :
                      null
              }
          </div>
        );
    }
}
export default AccountManager;