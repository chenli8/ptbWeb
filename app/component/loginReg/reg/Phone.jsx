/**
 * Created by Kirk liu on 2017/7/22.
 */
import React from 'react';
import cookie from 'react-cookie';
import serviceApi from '../../../public/js/serviceApi';
import layer from '../../../public/js/layer';
import utils from '../../../public/js/utils';
import urlManager from '../../../public/js/urlManager';

class Phone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            code: '',
            codeTime: 0,
            agreed: false
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

    handleRegVCode() {
        let state = this.state;
        if (!utils.isMobile(state.phone)) {
            layer.msg('请输入手机号');
            return
        }
        if (state.phone.toString().length != 11) {
            layer.msg('手机号错误');
            return
        }
        if (state.password.toString().length < 6) {
            layer.msg('密码必须是6到25个字符');
            return
        }
        let data = {
            phone: state.phone
        };
        serviceApi('aRegVCode', data, () => {
            this.handleCodeButton()
        }, (data) => {
            layer.msg(data.message)
        });
    }

    handleRegister() {
        let state = this.state;
        if (!utils.isMobile(state.phone)) {
            layer.msg('请输入手机号');
            return
        }
        if (state.phone.toString().length != 11) {
            layer.msg('手机号错误');
            return
        }
        if (state.password.toString().length < 6) {
            layer.msg('密码必须是6到25个字符');
            return
        }
        if (!state.code) {
            layer.msg('请输入验证码');
            return
        }
        if (state.code.toString().length != 4) {
            layer.msg('验证码错误');
            return
        }
        if(!this.state.agreed){
            layer.msg('请同意品推宝用户服务协议');
            return
        }
        if(cookie.load('token')){
            layer.msg('请先退出后再注册');
            return
        }
        let data = {
            phone: state.phone,
            password: state.password,
            validateCode: state.code
        };
        let dataLogin = {
            username: state.phone,
            password: state.password
        };
        layer.loading.open();
        serviceApi('aRegister', data, () => {
            layer.loading.close();
            serviceApi('aLogin', dataLogin, (data) => {
                let day = (dayNum) => {
                    return new Date(new Date().getTime() + (dayNum * (24 + 8) * 60 * 60 * 1000))
                };
                cookie.save('phone', this.state.phone, {expires: day(100)});
                cookie.save('token', data.userInfo.token, {expires: day(1)});

                cookie.save('userImage', data.userInfo.headImg, {expires: day(100)});
                cookie.save('nickName', data.userInfo.nickName, {expires: day(100)});
                cookie.save('username', this.state.phone, {expires: day(100)});
                cookie.save('chatUid', data.userInfo.userId, {expires: day(100)});

                window.location.hash = '#/Reg/Success';
            }, (data) => {
                layer.msg(data.message)
            });
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="reg">
                <div className="cont">
                    <div className="title">
                        <span>用户注册</span>
                    </div>
                    <div className="box">
                        <div className="line">
                            <div className="title">手机号：</div>
                            <input type="text" placeholder="请填写手机号"
                                   maxLength={11}
                                   onInput={(e) => {
                                       utils.inputNum(e);
                                       this.setState({phone: e.target.value});
                                   }}
                            />
                        </div>
                        <div className="line">
                            <div className="title">密码：</div>
                            <input type="password" placeholder="密码(6-25位字母,数字或符号)"
                                   maxLength={25}
                                   onInput={(e) => {
                                       this.setState({password: e.target.value});
                                   }}
                            />
                        </div>
                        <div className="line sysCode" style={{display: 'none'}}>
                            <div className="title">验证码：</div>
                            <input type="text" placeholder="4位验证码"/>
                            <img src="" alt=""/>
                        </div>
                        <div className="line msgCode">
                            <div className="title">短信验证码：</div>
                            <input type="text" placeholder="4位短信验证码"
                                   maxLength={4}
                                   onInput={(e) => {
                                       utils.inputNum(e);
                                       this.setState({code: e.target.value});
                                   }}
                            />
                            {
                                this.state.codeTime == 0 ?
                                    <span className="getMsgCode fl"
                                          onClick={this.handleRegVCode.bind(this)}>获取短信验证码</span>
                                    :
                                    <span className="getMsgCode no fl">{this.state.codeTime}s后重试</span>
                            }
                        </div>
                        <div className="agr fl">
                            <i className={this.state.agreed ? "ico-check-blue on fl" : "ico-check-blue fl" } onClick={
                                () => {
                                    this.setState({agreed: !this.state.agreed})
                                }
                            }/>
                            <span>
                                   我已阅读并同意 <a href={urlManager.pAgreement+"#/UserAgreement"}>《品推宝用户注册协议》</a> 及
                                  <a href={urlManager.pAgreement+"#/ServiceAgreement"}>《品推宝用户服务协议》</a>

                                </span>
                        </div>
                        <a href="javascript:;" className="submit theme-button-bg fl"
                           onClick={this.handleRegister.bind(this)}>确认注册</a>
                    </div>
                </div>
            </div>
        );
    }
}
export default Phone;