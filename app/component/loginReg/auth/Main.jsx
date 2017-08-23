/**
 * Created by Kirk liu on 2017/8/15.
 */
import React from 'react';
import urlManager from '../../../public/js/urlManager';
import utils from '../../../public/js/utils';
import serviceApi from '../../../public/js/serviceApi';
import layer from '../../../public/js/layer';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheck: false,
            codeTime: 0
        };
    }

    handleCodeButton() {
        let phone = this.refs.phone.value;
        if (!phone) {
            layer.msg('手机号不能为空');
            return
        }
        if (!utils.isMobile(phone)) {
            layer.msg('手机号不正确');
            return
        }
        serviceApi('aLoginWpvCode', {phone: phone}, () => {
            this.setState({codeTime: 60});
            this.timer = setInterval(() => {
                if (this.state.codeTime > 0) {
                    this.setState({codeTime: this.state.codeTime - 1})
                }
            }, 1000)
        }, (data) => {
            layer.msg(data.message)
        })

    }

    submit() {
        let phone = this.refs.phone.value;
        if (!phone) {
            layer.msg('手机号不能为空');
            return
        }
        if (!utils.isMobile(phone)) {
            layer.msg('手机号不正确');
            return
        }
        let code = this.refs.code.value;
        if(!code){
            layer.msg('请输入验证码');
            return
        }
        if(code.length < 4){
            layer.msg('验证码错误');
            return
        }
        if(!this.state.isCheck){
            layer.msg('必须同意品推宝用户注册协议');
            return
        }
        serviceApi('aThirdBindPhone',{phone:phone,validateCode:code,code:utils.urlParam('code')},(data)=>{
            window.location.href = 'index.html?LoginSource=wx&token=' + data.userInfo.token
        },(data)=>{
            if(data.code === 1110){
                this.refs.phoneTips.style.display = 'block'
            }else{
                layer.msg(data.message)
            }
        })
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="authBind">
                <div className="title">
                    <span>绑定手机号</span>
                </div>
                <div className="desc">
                    为方便后续交易进行沟通，接收订单通知，并响应<a href="https://baike.baidu.com/item/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8%E6%B3%95/16843044?fr=aladdin" className="safety" target="_bank">《中华人民共和国网络安全法》</a>政策，
                    请您先绑定手机号码。
                </div>
                <div className="line">
                    <span>手机号：</span>
                    <input type="text" placeholder="请填写手机号" ref="phone" maxLength={11}
                           onInput={(e) => {
                               if(this.refs.phoneTips.style.display === 'block'){
                                   this.refs.phoneTips.style.display = 'none'
                               }
                               utils.inputNum(e);
                           }}/>
                    <p ref="phoneTips" style={{display:'none'}}>该手机号已注册暂时无法绑定，您可以换个手机号绑定或联系客服010-85079450解决</p>
                </div>
                <div className="line code">
                    <span>短信验证码：</span>
                    <input type="text" placeholder="4位短信验证码" ref="code"/>
                    {
                        this.state.codeTime == 0 ?
                            <span className="getMsgCode fr"
                                  onClick={this.handleCodeButton.bind(this)}>获取短信验证码</span>
                            :
                            <span className="getMsgCode no fr">{this.state.codeTime}s后重试</span>
                    }
                </div>
                <div className="agreement">
                    <i className={"ico-check-blue " + (this.state.isCheck ? 'on' : '' )}
                       onClick={() => this.setState({isCheck: !this.state.isCheck})}/>
                    我已阅读并同意 <a href={urlManager.pAccount + '#/UserAgreement'}>《品推宝用户注册协议》</a>
                </div>
                <a href="javascript:;" className="submit" onClick={this.submit.bind(this)}>确认提交</a>
            </div>
        );
    }
}
export default Main;