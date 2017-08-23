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
            deviceNo: ''
        };
    }

    getImgCode() {
        let deviceNo = new Date().getTime();
        this.setState({deviceNo: deviceNo});
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
        let companyName = refVal('companyName');
        let establishTime = refVal('establishTime');
        let registeredFund = refVal('registeredFund');
        let phone = refVal('phone');
        let industryType = refVal('industryType');
        let customerName = refVal('customerName');
        let captcha = refVal('captcha');
        if (!companyName) {
            layer.msg('请输入企业名称');
            return
        }
        if (!establishTime) {
            layer.msg('请输入成立日期');
            return
        }
        if (!registeredFund) {
            layer.msg('请输入注册资金');
            return
        }
        if (!phone) {
            layer.msg('请输入联系方式');
            return
        }
        if (!industryType) {
            layer.msg('请输入行业类别');
            return
        }
        if (!customerName) {
            layer.msg('请输入主要下游客户名称');
            return
        }
        if (!captcha) {
            layer.msg('请输入验证码');
            return
        }
        let data = {
            companyName: companyName,
            establishTime: establishTime,
            registeredFund: utils.priceCents(registeredFund),
            phone: phone,
            industryType: industryType,
            customerName: customerName,
            captcha: captcha,
            deviceNo: this.state.deviceNo
        };
        serviceApi('aFinanceCreateFactoringApply', data, () => {
            this.setState({show: false}, () => {
                layer.msg('提交成功');
            })
        }, (data) => {
            layer.msg(data.message);
        })
    }

    handleShow() {
        if (cookie.load('token')) {
            this.setState({show: true}, () => {
                this.getImgCode();
            })
        } else {
            utils.loginReturnUrl()
        }

    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = '保理-品推宝'
    }

    render() {
        let state = this.state;
        return (
            <div className="projectCredit factorCon">
                <div className="banner protect-banner1" onClick={() => {
                    this.handleShow()
                }}/>
                <div className="share">
                    <div className="title">全网企业专享</div>
                    <div className="sub">
                        保理业务，是指保理商对于买卖双方基于商务合同所产生的应收、应付账款，在卖方转让其应收账款给保理商的前<br/>
                        提下， 为一方或双方提供融资、应收账款催收、管理及坏账担保于一体的综合性金融服务。
                    </div>
                    <div className="pics protectPics"/>
                </div>
                <div className="step protectStep"/>
                <div className="platform"/>
                {
                    state.show ?
                        <div className="layerBox">
                            <div className="layerCon">
                                <div className="conTop">
                                    <div className="title">
                                        我想申请保理服务
                                        <a href="javascript:;" className="fr closeBtn"
                                           onClick={() => this.setState({show: false})}/>
                                    </div>
                                </div>
                                <div className="mid">
                                    <div className="items">
                                        <div>企业名称</div>
                                        <input type="text" className="inputText" placeholder="请输入企业名称" ref="companyName"
                                        />
                                    </div>
                                    <div className="items">
                                        <div>成立日期</div>
                                        <input type="text" className="inputText" placeholder="请输入成立日期"
                                               ref="establishTime"
                                        />
                                    </div>
                                    <div className="items">
                                        <div>注册/实收资本金</div>
                                        <input type="text" className="inputText" placeholder="请输入注册/实收资本金"
                                               ref="registeredFund"
                                        />
                                    </div>
                                    <div className="items fl">
                                        <div>联系方式</div>
                                        <input type="text" className="inputText codeInput fl" placeholder="请输入手机号或座机号"
                                               ref="phone"
                                        />
                                    </div>
                                    <div className="items fr">
                                        <div>行业类别</div>
                                        <input type="text" className="inputText codeInput fl" placeholder="请输入行业类别"
                                               ref="industryType"
                                        />
                                    </div>
                                    <div style={{clear: "both"}}/>
                                    <div className="items" style={{marginTop: "-15px"}}>
                                        <div>主要下游客户名称</div>
                                        <input type="text" className="inputText" placeholder="可输入多个客户名称"
                                               ref="customerName"
                                        />
                                    </div>
                                    <div className="items">
                                        <div>验证码</div>
                                        <input type="text" className="inputText codeInput fl" placeholder="请输入右侧验证码"
                                               ref="captcha"
                                        />
                                        <img src={state.imgCode && 'data:image/jpg;base64,' + state.imgCode}
                                             alt="点击刷新验证码" onClick={this.getImgCode.bind(this)} className="codePic"/>
                                    </div>
                                </div>
                                <a href="javascript:;" className="fl submit protectSubmit"
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