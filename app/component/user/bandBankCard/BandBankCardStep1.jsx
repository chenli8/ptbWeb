import React, {Component} from 'react';
import $ from 'jquery';

class BandBankCardStep1 extends Component {

    constructor(props){
        super(props)
        this.state = {
            bankInfo:{
                accountType:2,
                bankCardNo:"",
                bankName:"",
                accountName:"",
            }
        }
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

        this.props.history.push({ pathname: '/BandBankCardStep2', state:this.state.bankInfo});
    }

    render() {
        return (
                <div className="bandBankCardStep1Con">
                    <div className="companyBaseInfoTitle commonTitle">
                        企业账户基本信息
                    </div>
                    <div className="commonMt-30">
                        <div className="commonSubTitle">
                            账号<span className="commonInputPrompt">(必填)</span>
                        </div>
                        <input type="text" placeholder="" className="commonInput commonSingleLine" id="bankCardNoId" onChange={(e)=>this.onBankCardNoChange(e)}/>
                    </div>
                    <div className="commonMt-30">
                        <div className="commonSubTitle">
                            公司<span className="commonInputPrompt">(必填)</span>
                        </div>
                        <input type="text" placeholder="" className="commonInput commonSingleLine" id="companyNameId" onChange={(e)=>this.onCompanyNameChange(e)}/>
                    </div>
                    <div className="commonMt-30">
                        <div className="commonSubTitle">
                            开户行<span className="commonInputPrompt">(必填)</span>
                        </div>
                        <input type="text" placeholder="" className="commonInput commonSingleLine" id="bankNameId" onChange={(e)=>this.onBankNameChange(e)}/>
                    </div>
                    <a href="javascript:;" className="next theme-button-bg" onClick={() => this.onNext()}>下一步</a>
                </div>
        );
    }
}

export default BandBankCardStep1;
