import React from 'react';

class CreateShopStep3 extends React.Component {
    render() {
        return (
            <div className="realNameAuthSubmitSuccess">
                <i/>
                <div className="title">资料提交成功</div>
                <div className="subTitle">店铺信息提交成功，请等待审核，审核时间一般1～2小时</div>
                <a href="javascript:;" className="next theme-button-bg" onClick={() => this.onNext()}>下一步</a>
            </div>
        );
    }

    onNext() {
        this.props.history.push({
            pathname: '/RealName/Index'
        })
    }
}

export default CreateShopStep3;
