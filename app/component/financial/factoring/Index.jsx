/**
 * Created by Kirk liu on 2017/8/12.
 */
import React from 'react';
import cookie from 'react-cookie';
import serviceApi from '../../../public/js/serviceApi';
import layer from '../../../public/js/layer';
import utils from '../../../public/js/utils';
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            deviceNo:''
        };
    }

    getImgCode() {
        let deviceNo = new Date().getTime();
        this.setState({deviceNo:deviceNo});
        serviceApi('aURegImgCode', {deviceNo: deviceNo}, (data) => {
            this.setState({imgCode: data.kaptcha})
        }, (data) => {
            layer.msg(data.message)
        })
    }

    handleSubmit() {
        let refVal = (ref) => {
            return this.refs[ref].value
        };
        let phone = refVal('phone');
        let companyName = refVal('companyName');
        let orderNo = refVal('orderNo');
        let captcha = refVal('captcha');
        if(!phone){
            layer.msg('联系方式不能为空');
            return
        }
        if(!companyName){
            layer.msg('公司名称不能为空');
            return
        }
        if(!orderNo){
            layer.msg('订单号不能为空');
            return
        }
        if(!captcha){
            layer.msg('验证码不能为空');
            return
        }
        let data = {
            orderNo:orderNo,
            phone:phone,
            companyName:companyName,
            captcha:captcha,
            deviceNo:this.state.deviceNo
        };
        serviceApi('aFinanceCreateOrderLoan',data,()=>{
            this.setState({show:false},()=>{
                layer.msg('提交成功');
            })
        },(data)=>{
            if(data.code === 1002){
                layer.msg('订单号有误');
            }else{
                layer.msg(data.message);
            }

        })
    }
    handleShow(){
        if(cookie.load('token')){
            this.setState({show: true}, () => {
                this.getImgCode();
            })
        }else{
            utils.loginReturnUrl()
        }
    }
    componentDidMount() {
        window.scrollTo(0,0);
        document.title = '项目贷-品推宝'
    }

    render() {
        let state = this.state;
        return (
            <div className="factoring factorCon">
                <div className="banner project-banner1" onClick={() => {
                    this.handleShow()
                }}/>
                <div className="share">
                    <div className="title">品推宝服务商专享</div>
                    <div className="pics projectPics"/>
                </div>
                <div className="step projectStep" onClick={() => {
                    this.handleShow()
                }}/>
                <div className="platform"/>
                {
                    state.show ?
                        <div className="layerBox">
                            <div className="layerCon">
                                <div className="conTop">
                                    <div className="title">
                                        我想申请项目贷
                                        <a href="javascript:;" className="fr closeBtn" onClick={()=>this.setState({show:false})}/>
                                    </div>
                                    <div className="userInfo">
                                        <div className="fl">
                                            <span>用户名：</span>
                                            <span>{cookie.load('nickName')}</span>
                                        </div>
                                        <div className="fl">
                                            <span>用户ID：</span>
                                            <span>{cookie.load('chatUid')}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mid">
                                    <div className="items">
                                        <div>联系电话</div>
                                        <input type="text" className="inputText" placeholder="请输入联系电话" ref="phone"
                                               />
                                    </div>
                                    <div className="items">
                                        <div>公司名称</div>
                                        <input type="text" className="inputText" placeholder="请输入公司名称" ref="companyName"
                                               />
                                    </div>
                                    <div className="items">
                                        <div>订单号</div>
                                        <input type="text" className="inputText" placeholder="请输入需要订单货的订单号..." ref="orderNo"
                                               />
                                    </div>
                                    <div className="items">
                                        <div>验证码</div>
                                        <input type="text" className="inputText codeInput fl" placeholder="请输入右侧验证码" ref="captcha"
                                               />
                                        <img src={state.imgCode && 'data:image/jpg;base64,' + state.imgCode}
                                             alt="点击刷新验证码" onClick={this.getImgCode.bind(this)} className="codePic"/>
                                    </div>
                                </div>
                                <a href="javascript:;" className="fl submit orderSubmit"
                                   onClick={this.handleSubmit.bind(this)}>提交申请</a>
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        );
    }
}
export default Index;