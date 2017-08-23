import React from 'react';
import $ from 'jquery';

class Success extends React.Component {
    componentDidMount() {
        $('.timeStepContainer').find('li').eq(1).children('div').eq(0).addClass('stepIco-s');
        $('.timeStepContainer').find('li').eq(1).children('div').eq(3).addClass('leftLine-s');
        $('.timeStepContainer').find('li').eq(1).children('div').eq(4).addClass('rightLine-s');
        $('.timeStepContainer').find('li').eq(2).children('div').eq(0).addClass('stepIco-s');
        $('.timeStepContainer').find('li').eq(2).children('div').eq(3).addClass('leftLine-s');
        $('.timeStepContainer').find('li').eq(2).children('div').eq(4).addClass('rightLine-s');
        $('.timeStepContainer').find('li').eq(3).children('div').eq(0).addClass('stepIco-s');
        $('.timeStepContainer').find('li').eq(3).children('div').eq(3).addClass('leftLine-s');
    }
    render() {
        return (
            <div className="realNameAuthSubmitSuccess">
                <i></i>
                <div className="title">资料提交成功</div>
                <div className="subTitle">我们正在审核您的资料，请等待消息通知或登录查看</div>
            </div>
        )
    }
}

export default Success;
