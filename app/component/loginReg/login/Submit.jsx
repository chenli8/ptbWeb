/**
 * Created by Kirk liu on 2017/7/21.
 */
import React from 'react';
import cookie from 'react-cookie';
import serviceApi from '../../../public/js/serviceApi';
import utils from '../../../public/js/utils';
import urlManager from '../../../public/js/urlManager';
import layer from '../../../public/js/layer';
class Submit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginKeep: false
        };
    }

    login() {
        let {userInfo, loginType} = this.props;
        if (loginType == 1) {
            if (userInfo.info.username.toString().length != 11) {
                layer.msg('手机号错误');
                return
            }
            if (userInfo.info.password.toString().length < 6) {
                layer.msg('密码必须是6到25个字符');
                return
            }
        } else if (loginType == 2) {
            if (userInfo.info.phone.toString().length != 11) {
                layer.msg('手机号错误');
                return
            }
            if (userInfo.info.code.toString().length < 4) {
                layer.msg('验证码错误');
                return
            }
        }
        /*loginType 1:username ,2:phone */
        serviceApi(userInfo.api, userInfo.info, (data) => {
            /*记住用户名为100天*/
            let day = (dayNum) => {
                return new Date(new Date().getTime() + (dayNum * (24 + 8) * 60 * 60 * 1000))
            };
            if (loginType == 1) {
                cookie.save('username', userInfo.info.username, {expires: day(100)});
                cookie.save('phone', userInfo.info.username, {expires: day(100)});
            } else if (loginType == 2) {
                cookie.save('phone', userInfo.info.phone, {expires: day(100)});
            }
            /*记住token 及用户信息*/
            let expires = {
                expires: day(1)
            };
            /*保持登录状态7天*/
            if (this.state.loginKeep) {
                expires = {
                    expires: day(7)
                }
            }
            cookie.save('token', data.userInfo.token, expires);
            cookie.save('userImage', data.userInfo.headImg, expires);
            cookie.save('nickName', data.userInfo.nickName, expires);
            cookie.save('chatUid', data.userInfo.userId, expires);
            cookie.save('shopId', data.userInfo.shopId, expires);
            /*如果有返回url*/
            if (utils.urlParam('returnUrl')) {
                window.location.href = decodeURIComponent(utils.urlParam('returnUrl'));
            } else {
                window.location.href = urlManager.pIndex;
            }
        }, (data) => {
            layer.msg(data.message)
        })
    }

    componentDidMount() {

    }

    render() {
        let state = this.state;
        return (
            <div>
                <div className="tool fl">
                    <i className={state.loginKeep ? "ico-check-blue on fl" : "ico-check-blue fl" } onClick={
                        () => {
                            this.setState({loginKeep: !state.loginKeep})
                        }
                    }/> <span>保持登录状态</span>
                    <a href={urlManager.pAccount + '#/LoginPassword'} className="fr">忘记密码？</a>
                </div>
                <a href="#/Reg" className="regButton fl">立即注册</a>
                <a href="javascript:;" className="submit theme-button-bg fl"
                   onClick={this.login.bind(this)}
                >登录</a>
            </div>
        );
    }
}
export default Submit;