/**
 * Created by Kirk liu on 2017/7/21.
 */
import React from 'react';
import cookie from 'react-cookie';
import utils from '../../../public/js/utils';
import layer from '../../../public/js/layer';
import serviceApi from '../../../public/js/serviceApi';
import Submit from './Submit';

class Phone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codeTime: 0,
            userInfo: {
                api: 'aLoginWp',
                info: {
                    phone: cookie.load('phone') || '',
                    code: ''
                }
            },
            loginType: 2
        };
    }

    handleCodeButton() {
        this.setState({codeTime: 60});
        this.timer = setInterval(() => {
            if (this.state.codeTime > 0) {
                this.setState({codeTime: this.state.codeTime - 1})
            }
        }, 1000)
    }

    loginWpvCode() {
        if (this.refs.phone.value.length != 11) {
            layer.msg('手机号错误');
            return
        }
        /*if (this.refs.phoneCode.value.length != 4) {
         layer.msg('验证码错误');
         return
         }*/
        let data = {
            phone: this.state.userInfo.info.phone
        };
        serviceApi('aLoginWpvCode', data, () => {
            this.handleCodeButton();
        }, (data) => {
            layer.msg(data.message)
        })
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    render() {
        let state = this.state;
        return (
            <div>
                <div className="login fl">
                    <div className="username fl">
                        <i className="ico-loginReg-username"/>
                        <input type="text" placeholder="手机号" maxLength={11} ref="phone"
                               defaultValue={this.state.userInfo.info.phone}
                               onInput={(e) => {
                                   utils.inputNum(e);
                                   let userInfo = this.state.userInfo;
                                   userInfo.info.phone = e.target.value;
                                   this.setState({userInfo: userInfo});
                               }}
                        />
                    </div>
                    <div className="password code fl">
                        <i className="ico-loginReg-password"/>
                        <input type="text" placeholder="请输入4位验证码" maxLength={4} ref="phoneCode"
                               onInput={(e) => {
                                   utils.inputNum(e);
                                   let userInfo = this.state.userInfo;
                                   userInfo.info.code = e.target.value;
                                   this.setState({userInfo: userInfo});
                               }}
                               onKeyPress={(e) => {
                                   if (e.which === 13) {
                                       this.refs.submit.login()
                                   }
                               }}
                        />
                        {
                            state.codeTime == 0 ?
                                <span className="codeButton" onClick={this.loginWpvCode.bind(this)}>获取短信验证码</span>
                                :
                                <span className="codeButton no">{state.codeTime}s后重试</span>
                        }

                    </div>
                </div>
                <Submit {...this.state} ref="submit"/>
            </div>
        );
    }
}
export default Phone;