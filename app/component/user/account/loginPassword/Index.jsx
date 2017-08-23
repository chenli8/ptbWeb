/**
 * Created by Kirk liu on 2017/7/31.
 */
import React from 'react';
import TimeStep from '../../../shop/common/TimeStep';
import serviceApi from '../../../../public/js/serviceApi';
import utils from '../../../../public/js/utils';
import layer from '../../../../public/js/layer';
import urlManager from '../../../../public/js/urlManager';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeData: [
                {position: 0, title: "验证身份", subTitle: "", status: 1},
                {position: 1, title: "设置新登录密码", subTitle: "", status: 0},
                {position: 2, title: "完成", subTitle: "", status: 0}
            ],
            phone: '',
            code: '',
            loading: false,
            codeTime: 0,
            step: 1,
            password: '',
            passwordConfirm: '',
            isLogin: false
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

    getUserInfo() {
        serviceApi('aUserInfo', {}, (data) => {
            this.setState({loading: true, phone: data.userInfo.phone, isLogin: true})
        }, () => {
            this.setState({loading: true, phone: '', isLogin: false})
        })
    }

    getCode() {
        let state = this.state;
        if (!state.isLogin) {
            if (!state.phone) {
                layer.msg('手机号不能为空');
                return
            }
            if (state.phone.length != 11) {
                layer.msg('手机号错误');
                return
            }
        }
        serviceApi('aLoginPasswordSVCode', {phone: state.phone, type: 1}, () => {
            this.handleCodeButton();
            layer.msg('获取验证码成功')
        }, (data) => {
            layer.msg(data.message)
        })
    }

    handleSubmit() {
        let code = this.state.code;
        let state = this.state;
        if (code.length <= 3) {
            layer.msg('验证码不正确');
            return
        } else {
            serviceApi('aLoginPasswordVVCode', {phone: state.phone, validateCode: code, type: 1}, () => {
                let timeData = this.state.timeData;
                timeData[1].status = 1;
                this.setState({step: 2, timeData: timeData});
                this.refs.password.value = '';
                this.refs.passwordConfirm.value = '';
            }, (data) => {
                layer.msg(data.message)
            })

        }
    }

    handleSubmit2() {
        let state = this.state;
        let password = state.password;
        let passwordConfirm = state.passwordConfirm;
        let code = state.code;
        if (password != passwordConfirm) {
            layer.msg('确认密码错误');
            return
        } else {
            serviceApi('aLoginPasswordSet', {
                phone: state.phone,
                validateCode: code,
                newPassword: state.passwordConfirm,
            }, () => {
                let timeData = this.state.timeData;
                timeData[2].status = 1;
                this.setState({step: 3, timeData: timeData})
            }, (data) => {
                layer.msg(data.message)
            })

        }
    }

    componentDidMount() {
        this.getUserInfo();
        document.title = '修改登录密码_品推宝'
    }

    render() {
        let state = this.state;
        return (
            <div className="accountEdit">
                <div className="cont">
                    <div className="content">
                        <div className="step fl">
                            <div className="title">
                                登录密码
                            </div>
                            <TimeStep timeData={state.timeData}/>
                        </div>
                        {
                            state.loading ?
                                state.step == 1 ?
                                    <div className="editCont fl">
                                        <div className="line">
                                            <div className="title">手机号 ：</div>
                                            <div className="input">
                                                {
                                                    state.isLogin ?
                                                        <input type="text" disabled={true}
                                                               defaultValue={state.phone.substring(0, 3) + utils.asterisk(5) + state.phone.substring(8, 11)}/>
                                                        :
                                                        <input type="text" placeholder="请输入手机号码"
                                                               maxLength={11}
                                                               onInput={(e) => {
                                                                   utils.inputNum(e);
                                                                   this.setState({phone: e.target.value});
                                                               }}
                                                        />
                                                }

                                            </div>
                                        </div>
                                        <div className="line">
                                            <div className="title">验证码 ：</div>
                                            <div className="input">
                                                <input type="text" placeholder="4位短信验证码" style={{width: 214}}
                                                       maxLength={4}
                                                       onInput={(e) => {
                                                           utils.inputNum(e);
                                                           this.setState({code: e.target.value});
                                                       }}
                                                />
                                                {
                                                    state.codeTime == 0 ?
                                                        <span className="getCode"
                                                              onClick={this.getCode.bind(this)}>获取短信验证码</span>
                                                        :
                                                        <span className="getCode no">{state.codeTime}s后重试</span>
                                                }
                                            </div>
                                            <div className="tips">若该手机无法收到验证码，清联系客服处理，客服电话010-85079450</div>
                                        </div>
                                        <a href="javascript:;" className="theme-button-bg accountEditSubmit"
                                           onClick={this.handleSubmit.bind(this)}
                                        >下一步</a>
                                    </div>
                                    :
                                    state.step == 2 ?
                                        <div className="editCont fl">
                                            <div className="line">
                                                <div className="title">设置登录密码 ：</div>
                                                <div className="input">
                                                    <input type="password" placeholder="6-25位数字或字母" maxLength={25}
                                                           ref="password"
                                                           onInput={(e) => {
                                                               this.setState({password: e.target.value});
                                                           }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="line">
                                                <div className="title">确认密码 ：</div>
                                                <div className="input">
                                                    <input type="password" placeholder="确认密码" ref="passwordConfirm"
                                                           maxLength={25}
                                                           onInput={(e) => {
                                                               this.setState({passwordConfirm: e.target.value});
                                                           }}
                                                    />
                                                </div>
                                            </div>
                                            <a href="javascript:;" className="theme-button-bg accountEditSubmit"
                                               onClick={this.handleSubmit2.bind(this)}
                                            >下一步</a>
                                        </div>
                                        :
                                        state.step == 3 ?
                                            <div className="success fl">
                                                <i className="ico-auth-success"/>
                                                <div className="title">密码修改成功，跳转到登录页面</div>
                                                <div className="sub">您现在可以用新的密码登录了</div>
                                                <a href={urlManager.pIndex} className="theme-button-bg submit">确定</a>
                                            </div>
                                            :
                                            null
                                :
                                null
                        }
                    </div>
                </div>

            </div>
        );
    }
}
export default Index;