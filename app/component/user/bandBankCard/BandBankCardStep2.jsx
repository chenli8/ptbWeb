import React, {Component} from 'react';
import '../../../public/css/buyer.css';
import layer from "../../../public/js/layer";
import serviceApi from "../../../public/js/serviceApi";
class BandBankCardStep2 extends Component {

    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentWillMount() {
        var THIS = this;
        this.setState({
            bankInfo:THIS.props.location.state
        });
    }

    onBack(){
        this.props.history.push({ pathname: '/BandBankCardStep1', state:this.state.bankInfo});
    }

    onSubmit(){
        layer.loading.open();
        serviceApi('aBindbankcard', this.state.bankInfo, (data) => {
            layer.loading.close();
            this.props.history.push({ pathname: '/BandBankCardStep3'});
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        })
    }

    render() {
        var bankInfo = this.state.bankInfo;
        return (
                <div className="bandBankCardStep2">
                    <div className="commonMt-30 promptTopCon">
                        <i></i><span className="commonInputPrompt">提现账户提交后无法修改 请仔细核对下列信息</span>
                    </div>
                    <div className="commonMt-30 commonTitle">

                    </div>
                    <div className="name">
                        <div className="title fl">账号类型：</div>
                        <div className="content commonSingleLine fr">企业账户</div>
                    </div>
                    <div className="id">
                        <div className="title fl">账号：</div>
                        <div className="content commonSingleLine fr">{bankInfo.bankCardNo}</div>
                    </div>
                    <div className="id">
                        <div className="title fl">公司名称：</div>
                        <div className="content commonSingleLine fr">{bankInfo.accountName}</div>
                    </div>
                    <div className="id">
                        <div className="title fl">开户行：</div>
                        <div className="content commonSingleLine fr">{bankInfo.bankName}</div>
                    </div>
                    <div className="bottom">
                        <a href="javascript:;" className="back" onClick={() => this.onBack()}>返回修改</a>
                        <a href="javascript:;" className="submit theme-button-bg" onClick={() => this.onSubmit()}>确认提交</a>
                    </div>
                </div>
        );
    }
}

export default BandBankCardStep2;
