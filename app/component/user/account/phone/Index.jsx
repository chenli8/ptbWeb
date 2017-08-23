/**
 * Created by Kirk liu on 2017/7/31.
 */
import React from 'react';
import cookie from 'react-cookie';
import TimeStep from '../../../shop/common/TimeStep';
import chatUtils from '../../../common/chat/chatUtils';
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
                {position: 1, title: "绑定新手机", subTitle: "", status: 0},
                {position: 2, title: "完成", subTitle: "", status: 0}
            ],
            phone: '',
            code: '',
            loading: false,
            codeTime: 0,
            codeTimeNew: 0,
            step: 1,
            phoneNew: '',
            codeNew: ''
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

    handleCodeButtonNew() {
        this.setState({codeTimeNew: 60});
        this.timer2 = setInterval(() => {
            if (this.state.codeTimeNew > 0) {
                this.setState({codeTimeNew: this.state.codeTimeNew - 1})
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
        serviceApi('aPhoneSCode', {phone: state.phone, type: 1}, () => {
            layer.msg('获取验证码成功');
            this.handleCodeButton()
        }, (data) => {
            layer.msg(data.message)
        })
    }

    handleSubmit() {
        let state = this.state;
        let code = state.code;
        if (code.length <= 3) {
            layer.msg('验证码不正确');
            return
        } else {
            serviceApi('aPhoneVCode', {phone: state.phone, code: code}, () => {
                let timeData = this.state.timeData;
                timeData[1].status = 1;
                this.setState({step: 2, timeData: timeData}, () => {
                    this.refs.phoneNew.value = '';
                    this.refs.codeNew.value = '';
                })
            }, (data) => {
                layer.msg(data.message)
            })

        }
    }

    getCodeNew() {
        let state = this.state;
        let phoneNew = state.phoneNew;
        if (!phoneNew) {
            layer.msg('手机号不能为空');
            return
        }
        if (phoneNew.length <11 || !utils.isMobile(phoneNew)) {
            layer.msg('手机号不正确');
            return
        }

        serviceApi('aPhoneSCode', {phone: state.phoneNew, type: 2}, () => {
            layer.msg('获取验证码成功');
            this.handleCodeButtonNew()
        }, (data) => {
            layer.msg(data.message)
        })
    }

    handleSubmit2() {
        let state = this.state;
        let code = state.code;
        let codeNew = state.codeNew;
        let phoneNew = state.phoneNew;
        if (!codeNew) {
            layer.msg('验证码不能为空');
            return
        }
        if (codeNew.length <= 3) {
            layer.msg('验证码不正确');
            return
        }
        serviceApi('aPhoneSet', {phone: phoneNew, code: codeNew, oldCode: code}, () => {
            let timeData = this.state.timeData;
            timeData[2].status = 1;
            this.setState({step: 3, timeData: timeData})
        }, (data) => {
            layer.msg(data.message)
        })
    }
    handleIsLoginOut() {
        serviceApi('aLoginout', {}, () => {
            cookie.remove('token');
            cookie.remove('userImage');
            cookie.remove('nickName');
            cookie.remove('chatUid');
            chatUtils.connClose();// 环信退出
            window.location.href = urlManager.pIndex;
        }, (data) => {
            if (data.code == 1000) {
                window.location.href = urlManager.pIndex;
            }
            layer.msg(data.message);
        });
    }
    handleSubmit3(){
        this.handleIsLoginOut();
    }
    componentDidMount() {
        this.getUserInfo();
        document.title = '绑定手机号_品推宝'
    }

    render() {
        let state = this.state;
        return (
            <div className="accountEdit">
                <div className="cont">
                    <div className="content">
                        <div className="step fl">
                            <div className="title">
                                修改绑定手机号
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
                                            <div className="line">
                                                <div className="title">手机号 ：</div>
                                                <div className="input">
                                                    <input type="text" placeholder="请输入11位中国大陆手机号码" maxLength={11}
                                                           ref="phoneNew"
                                                           onInput={(e) => {
                                                               utils.inputNum(e);
                                                               this.setState({phoneNew: e.target.value});
                                                           }}
                                                           autoComplete="off"
                                                    />
                                                </div>
                                            </div>
                                            <div className="line">
                                                <div className="title">验证码 ：</div>
                                                <div className="input">
                                                    <input type="text" placeholder="4位短信验证码" style={{width: 214}}
                                                           ref="codeNew"
                                                           maxLength={4}
                                                           onInput={(e) => {
                                                               utils.inputNum(e);
                                                               this.setState({codeNew: e.target.value});
                                                           }}
                                                           autoComplete="off"
                                                    />
                                                    {
                                                        state.codeTimeNew == 0 ?
                                                            <span className="getCode"
                                                                  onClick={this.getCodeNew.bind(this)}>获取短信验证码</span>
                                                            :
                                                            <span className="getCode no">{state.codeTimeNew}s后重试</span>
                                                    }
                                                </div>
                                                <div className="tips">若该手机无法收到验证码，清联系客服处理，客服电话010-85079450</div>
                                            </div>
                                            <a href="javascript:;" className="theme-button-bg accountEditSubmit"
                                               onClick={this.handleSubmit2.bind(this)}
                                            >下一步</a>
                                        </div>
                                        :
                                        state.step == 3 ?
                                            <div className="success fl">
                                                <i className="ico-auth-success"/>
                                                <div className="title">手机号修改成功</div>
                                                <div className="sub">下次请使用新手机号登录哦</div>
                                                <a href="javascript:;" onClick={this.handleSubmit3.bind(this)} className="theme-button-bg submit">确定</a>
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