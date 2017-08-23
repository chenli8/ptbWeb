/**
 * Created by Kirk liu on 2017/7/22.
 */
import React from 'react';
import utils from '../../../../public/js/utils';
import serviceApi from '../../../../public/js/serviceApi';
import layer from '../../../../public/js/layer';
import authConf from './../../../../public/js/authConf';
class Security extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payPassword: 0,
            wx:this.props.userInfo.wx
        };
    }

    /*判断是否有支付密码*/
    payPasswordHas() {
        serviceApi('aPayPasswordHas', {}, (data) => {
            this.setState({payPassword: data.haspaypwd})
        }, () => {

        })
    }

    unBindThirdAccount(type) {
        layer.loading.open();
        serviceApi('aUnBindThirdAccount', {thirdType:type}, (data) => {
            this.setState({wx:''});
            layer.loading.close();
            layer.msg('操作成功');
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message);
        })
    }

    componentDidMount() {
        this.payPasswordHas();
    }

    render() {
        let userInfo = this.props.userInfo;
        let state = this.state;
        return (
            <div className="security fl">
                <div className="title">
                    账号安全
                </div>
                <div className="content">
                    <div className="otherUser">
                        <li>
                            <i className="ico-mobile fl"/>
                            <span className="title fl">绑定手机号</span>
                            <span
                                className="username fl">{userInfo.phone.substring(0, 3) + utils.asterisk(5) + userInfo.phone.substring(8, 11)}</span>
                            <span className="bind fr">{
                                userInfo.phone ?
                                    <a href="#/Phone" style={{color: 'red'}}>修改手机</a>
                                    :
                                    <span>绑定</span>
                            }</span>
                        </li>
                        <li>
                            <i className="ico-other-weixin fl"/>
                            <span className="title fl">绑定微信</span>
                            <span className="username fl">
                                {
                                    state.wx ? state.wx.thirdNick : '未绑定'
                                }
                            </span>
                            {
                                state.wx ?
                                    <span className="bind no fr" onClick={this.unBindThirdAccount.bind(this,0)}>解除绑定</span>
                                    :
                                    <a href={authConf.weiXin(1)} className="bind fr">绑定</a>
                            }

                        </li>
                        {/*
                         <li>
                         <i className="ico-other-qq fl" />
                         <span className="title fl">绑定QQ</span>
                         <span className="username fl">1111111</span>
                         <span className="bind no fr">解除绑定</span>
                         </li>
                         <li>
                         <i className="ico-other-weibo fl" />
                         <span className="title fl">绑定微博</span>
                         <span className="username fl">1111111</span>
                         <span className="bind no fr">解除绑定</span>
                         </li>*/}
                    </div>
                    <div className="otherUser password">
                        <li>
                            <i className="ico-loginReg-password fl"/>
                            <span className="title fl">登录密码</span>
                            <span className="username fl"/>
                            <a href="#/LoginPassword" className="bind fr">修改</a>
                        </li>
                        <li>
                            <i className="ico-payPassword fl"/>
                            <span className="title fl">支付密码</span>
                            <span className="username fl">{state.payPassword ? '已设置' : '未设置'}</span>
                            {
                                state.payPassword ?
                                    <a href="#/PayPassword" className="bind fr">修改</a>
                                    :
                                    <a href="#/PayPassword" className="bind fr">设置</a>
                            }
                        </li>
                    </div>
                </div>
            </div>
        );
    }
}
export default Security;