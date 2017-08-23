/**
 * Created by Kirk liu on 2017/7/22.
 */
import React from 'react';
import urlManager from '../../../public/js/urlManager';

class Success extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 10
        };
    }

    time() {
        this.timer = setInterval(() => {
            if (this.state.time > 0) {
                this.setState({time: this.state.time - 1})
            } else {
                window.location.href = urlManager.pIndex;
            }
        }, 1000)
    }

    componentDidMount() {
        this.time();
    }
    componentWillUnmount(){
        this.timer && clearInterval(this.timer)
    }
    render() {
        return (
            <div className="success">
                <i className="ico-success"/>
                <span className="tips">恭喜您绑定成功，之后可以使用微信账号或手机号登录</span>
                <div className="backIndex">
                    <span className="time">{this.state.time}s</span>
                    <span className="back">后返回首页</span>
                </div>
                <a href={urlManager.pIndex} className="backButton theme-button-bg">立即返回首页</a>
            </div>
        );
    }
}
export default Success;