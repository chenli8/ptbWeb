import React, {Component} from 'react';
import '../../../public/css/buyer.css';
class BandBankCardStep3 extends Component {

    render() {
        return (
            <div className="bandBankCardSubmitSuccess">
                <i></i>
                <div className="title">资料提交成功</div>
                <div className="subTitle">我们将于5个工作日内审核您的资料。请关注邮件或登录查看</div>
                {/*<a href="javascript:;" className="next theme-button-bg" onClick={() => this.onNext()}>确定</a>*/}
            </div>
        );
    }
}

export default BandBankCardStep3;
