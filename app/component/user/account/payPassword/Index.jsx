/**
 * Created by Kirk liu on 2017/7/31.
 */
import React from 'react';
import TimeStep from '../../../shop/common/TimeStep';
import PwInput from '../../../shop/common/payType/PwInput';
import serviceApi from '../../../../public/js/serviceApi';
import utils from '../../../../public/js/utils';
import layer from '../../../../public/js/layer';
import md5 from '../../../../public/js/md5';
import urlManager from '../../../../public/js/urlManager';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeData: [
                {position: 0, title: "验证身份", subTitle: "", status: 1},
                {position: 1, title: "设置新支付密码", subTitle: "", status: 0},
                {position: 2, title: "完成", subTitle: "", status: 0}
            ],
            phone: '',
            code: '',
            loading: false,
            codeTime: 0,
            step: 1,
            password: '',
            passwordConfirm: ''
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
            this.setState({loading: true, phone: data.userInfo.phone})
        }, () => {
        })
    }

    getCode() {
        let state = this.state;
        serviceApi('aPayPasswordSCode', {phone: state.phone, type: 2}, () => {
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
            serviceApi('aPayPasswordVCode', {phone: state.phone, validateCode: code, type: 2}, () => {
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
        let password = this.refs.password.state.password;
        let passwordConfirm = this.refs.passwordConfirm.state.password;
        let code = state.code;
        if (password != passwordConfirm) {
            layer.msg('确认密码错误');
            return
        } else {
            serviceApi('aPayPasswordSet', {
                phone: state.phone,
                validateCode: code,
                payPassword: md5(state.passwordConfirm).toUpperCase(),
                setPayPasswordType: 2
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
        document.title = '修改支付密码_品推宝'
    }

    render() {
        let state = this.state;
        return (
            <div className="accountEdit">
                <div className="cont">
                    <div className="content">
                        <div className="step fl">
                            <div className="title">
                                支付密码
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
                                                <input type="text" disabled={true}
                                                       defaultValue={state.phone.substring(0, 3) + utils.asterisk(5) + state.phone.substring(8, 11)}/>
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
                                            <div className="line fl">
                                                <div className="title fl">设置支付密码 ：</div>
                                                <div className="input fl">
                                                    <PwInput position="right" ref="password"/>
                                                </div>
                                            </div>
                                            <div className="line fl">
                                                <div className="title fl">确认密码 ：</div>
                                                <div className="input fl">
                                                    <PwInput position="bottom" ref="passwordConfirm"/>
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
                                                <div className="title">支付密码设置成功</div>
                                                <div className="sub">您现在可以用新的密码支付了</div>
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