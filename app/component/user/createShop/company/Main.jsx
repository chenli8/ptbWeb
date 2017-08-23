import React from 'react';
import $ from 'jquery';
import '../../../../public/plugin/ajaxfileupload';
import layer from "../../../../public/js/layer";
import urlManager from "../../../../public/js/urlManager";
import serviceApi from "../../../../public/js/serviceApi";
import cookie from 'react-cookie'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enterpriseName: "",
            enterpriseCode: "",
            licensePhotoUrl: "",
            companyPosition: "",
            accountName: "",
            bankCardNo: "",
            bankName: "",
            companyData:false,
            step:-1,
        };
        this.uploadLicensePhotoUrl = "";
        this.isReUploadPic = false;
        this.isUploadPicThenSubmit = false;
        this.isCompanyAuthSuccess = false;
        this.isPositionAuthSuccess = false;
        this.isBindBankSuccess = false;
    }

    componentDidMount() {
        this.getBankCard();
        this.getAuthInfo();
        $('.timeStepContainer').find('li').eq(1).children('div').eq(0).addClass('stepIco-s');
        $('.timeStepContainer').find('li').eq(1).children('div').eq(3).addClass('leftLine-s');
        $('.timeStepContainer').find('li').eq(1).children('div').eq(4).addClass('rightLine-s');
        $('.timeStepContainer').find('li').eq(2).children('div').eq(0).addClass('stepIco-s');
        $('.timeStepContainer').find('li').eq(2).children('div').eq(3).addClass('leftLine-s');
        $('.timeStepContainer').find('li').eq(2).children('div').eq(4).addClass('rightLine-s');
    }

    getBankCard() {
        this.postApi = serviceApi('abankcard', {
            userid:cookie.load("chatUid")
        }, (data) => {
            if(data.list.length >0 ){
                this.isBindBankSuccess = true;
                this.setState({
                    accountName: data.list[0].accountName,
                    bankCardNo: data.list[0].bankCardNo,
                    bankName: data.list[0].bankName,
                    companyData:true
                });
            }
        }, (data) => {
            layer.msg(data.message)
        });
    }

    getAuthInfo() {
        layer.loading.open();
        serviceApi('aAuthStateInfo', {
            userId:cookie.load('chatUid'),
        }, (data) => {
            layer.loading.close();
            if(data.enterprise && (data.enterprise.idenState == 1 || data.enterprise.idenState == 3)){
                let pic = "";
                if(data.enterprise.picUrl && data.enterprise.picUrl.length > 0){
                    pic = data.enterprise.picUrl[0];
                }
                let position = "";
                if(data.position && (data.position.idenState == 1 || data.position.idenState == 3)){
                    position = data.position.position;
                }

                this.setState({
                    step:2,
                    idenState:data.enterprise.idenState,
                    enterpriseName:data.enterprise.enterpriseName,
                    enterpriseCode:data.enterprise.code,
                    licensePhotoUrl:pic,
                    companyPosition:position,
                })
            } else{
                this.setState({
                    step:0
                })
            }
        }, () => {
            layer.loading.close();
            this.setState({
                step:0
            })
        });
    }

    onNext() {
        let state = this.state;
        if (state.enterpriseName === '') {
            layer.msg('请填写企业名称');
            return
        }
        if (state.enterpriseCode === '') {
            layer.msg('请填写社会信用代码');
            return
        }
        if ($("#licensePhotoImgId").attr("src") === '') {
            layer.msg("请上传营业执照照片");
            return
        }
        if (state.accountName === '') {
            layer.msg("请填写账户名称");
            return
        }
        if (state.bankCardNo === '') {
            layer.msg("请填写账号");
            return
        }
        if (state.bankName === '') {
            layer.msg("请填写开户行");
            return
        }
        this.setState({step:1})
    }

    onBack() {
        this.setState({step:0})
    }

    readFile(elId) {
        var THIS = this;
        let input = document.getElementById(elId);
        if (typeof FileReader === 'undefined') {
            layer.msg("抱歉，你的浏览器不支持 FileReader");
            input.setAttribute('disabled', 'disabled');
            return;
        }
        let file = input.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            THIS.isReUploadPic = true;
            $("#licensePhotoImgId").parent().attr("class", "positivePhoto show");
            $("#licensePhotoImgId").attr("src", this.result);
            THIS.uploadPic();
        }
    }

    uploadPic() {
        let THIS = this;
        $.ajaxFileUpload({
            url: urlManager.aUploadPic,
            type: 'post',
            secureuri: false, // 一般设置为false
            fileElementId: 'licensePhotoInputId', // 上传文件的id、name属性名
            dataType: 'text', // 返回值类型，一般设置为json、application/json
            data: {type: 2}, // 传递参数到服务器
            success: function (data, status) {
                layer.msg('营业执照上传成功');
                THIS.uploadLicensePhotoUrl = JSON.parse(data).data.url;
                if(THIS.isUploadPicThenSubmit){
                    THIS.uploadPicSuccess(this.uploadLicensePhotoUrl);
                }
            },
            error: function (data, status, e) {
                layer.msg('营业执照上传失败');
            }
        });
    }

    uploadPicSuccess(url) {
        this.state.licensePhotoUrl = url;

        if (!this.isCompanyAuthSuccess) {
            this.companyAuth();
        }

        if (this.state.companyPosition != '') {
            this.positionAuth();
        }

        if (!this.isBindBankSuccess) {
            this.bindBank();
        }
    }

    companyAuth() {
        layer.loading.open();
        let params = {
            enterpriseName: this.state.enterpriseName,
            code: this.state.enterpriseCode,
            picList: [this.state.licensePhotoUrl]
        };
        serviceApi('aUpdateenterprise', params, (data) => {
            layer.loading.close();
            this.isCompanyAuthSuccess = true;
            if(this.isBindBankSuccess && (this.state.companyPosition == '' || this.state.isPositionAuthSuccess)){
                window.location.href = urlManager.pCreateShop + '?date='+ new Date().getTime() +'#/Company/Success'
            }
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        })
    }

    positionAuth() {
        let params = {
            positionCompany: this.state.enterpriseName,
            position: this.state.companyPosition,
            picList: [this.state.licensePhotoUrl]
        };
        serviceApi('aUpdateposition', params, (data) => {
            this.isPositionAuthSuccess = true;
            if(this.isCompanyAuthSuccess && this.isBindBankSuccess){
                window.location.href = urlManager.pCreateShop + '?date='+ new Date().getTime() +'#/Company/Success'
            }
        }, (data) => {
            layer.msg(data.message)
        })
    }

    bindBank() {
        let params = {
            accountName: this.state.enterpriseName,
            bankCardNo: this.state.bankCardNo,
            bankName: this.state.bankName,
            accountType: 2
        };
        serviceApi('aBindbankcard', params, (data) => {
            this.isBindBankSuccess = true;
            if(this.isCompanyAuthSuccess && (this.state.companyPosition == '' || this.state.isPositionAuthSuccess)){
                window.location.href = urlManager.pCreateShop + '?date='+ new Date().getTime() +'#/Company/Success'
            }
        }, (data) => {
            layer.msg(data.message)
        })
    }

    onSubmit() {
        if(this.isReUploadPic && this.uploadLicensePhotoUrl == ''){// 是否重新选择图片且还没上传
            this.isUploadPicThenSubmit = true;
            this.uploadPic();
        } else{
            if(this.uploadLicensePhotoUrl != ''){
                this.uploadPicSuccess(this.uploadLicensePhotoUrl);
            } else{
                this.uploadPicSuccess(this.state.licensePhotoUrl);
            }
        }
    }

    updateAuthInfo(){
        this.setState({
            step:0
        },function () {
            if(this.state.licensePhotoUrl){
                $("#licensePhotoImgId").parent().attr("class", "positivePhoto show");
                $("#licensePhotoImgId").attr("src", this.state.licensePhotoUrl);
            }
        })
    }

    render() {
        let state = this.state;
        return (
            <div>
                {/*审核中或者已认证*/}
                <div className="checkCompanyBaseInfo" style={{display: state.step == 2 ? "block" : "none"}}>
                    <div className="checkPrompt commonMt-30">
                        <i /><span className="commonInputPrompt">{state.idenState==1 ? "审核中" : "已认证"}</span>
                        {
                            state.idenState==3 ?
                                <a href="javascript:;" className="updateAutoInfo" onClick={this.updateAuthInfo.bind(this)}>修改认证信息</a>
                                :
                                null
                        }
                    </div>
                    <div className="commonMt-30 commonTitle">
                        企业基本信息
                    </div>
                    <div className="name">
                        <div className="title fl">企业名称：</div>
                        <div className="content commonSingleLine fr">{this.state.enterpriseName}</div>
                    </div>
                    <div className="code">
                        <div className="title fl">企业信用代码：</div>
                        <div className="content commonSingleLine fr">{this.state.enterpriseCode}</div>
                    </div>
                    <div className="position">
                        <div className="title fl">职位：</div>
                        <div className="content commonSingleLine fr">{this.state.companyPosition}</div>
                    </div>
                    <div className="account commonTitle ">
                        企业账户信息
                    </div>
                    <div className="accountName">
                        <div className="title fl">账户名称：</div>
                        <div className="content commonSingleLine fr">{this.state.accountName}</div>
                    </div>
                    <div className="accountId">
                        <div className="title fl">账号：</div>
                        <div className="content commonSingleLine fr">{this.state.bankCardNo}</div>
                    </div>
                    <div className="accountBank">
                        <div className="title fl">开户行：</div>
                        <div className="content commonSingleLine fr">{this.state.bankName}</div>
                    </div>
                    {/*<div className="bottom">*/}
                        {/*<a href="javascript:;" className="submit theme-button-bg"*/}
                           {/*onClick={() => this.onSkipUpdateAutoInfo()}>下一步</a>*/}
                    {/*</div>*/}
                </div>
                {/*提交企业认证*/}
                <div className="companyBaseInfo" style={{display: state.step == 0 ? "block" : "none"}}>
                    <div className="companyBaseInfoTitle commonTitle">
                        企业基本信息
                    </div>
                    <div className="commonMt-30">
                        <div className="title">企业名称<span className="commonInputPrompt">(必填)</span></div>
                        <input type="text" placeholder="请输入公司名称" className="commonInput commonSingleLine"
                               value={state.enterpriseName}
                               onInput={(e) => {
                                   this.setState({enterpriseName: e.target.value})
                               }}/>
                    </div>
                    <div className="commonMt-30">
                        <div className="title">社会信用代码<span className="commonInputPrompt">(必填)</span></div>
                        <input type="text" placeholder="请输入统一社会信用代码" className="commonInput commonSingleLine"
                               value={state.enterpriseCode}
                               onInput={(e) => {
                                   this.setState({enterpriseCode: e.target.value})
                               }}/>
                    </div>
                    <div className="commonMt-30">
                        <div className="title">营业执照照片<span className="commonInputPrompt">(必填)</span></div>
                        <div className="idPhoto">
                            <div className="photo fl">
                                <div className="photoUpload positiveUpload">
                                    <i />
                                    <div className="subTitle">上传营业执照照片</div>
                                </div>
                                <div className="positivePhoto hide">
                                    <img src="" alt="" id="licensePhotoImgId"/>
                                </div>
                                <input type="file" id="licensePhotoInputId" name="file" accept=".jpg,.jpeg,.png"
                                       onChange={this.readFile.bind(this, "licensePhotoInputId")}/>
                            </div>
                            <div className="prompt fl">
                                <div className="title">注意：</div>
                                <div className="subTitle">照片需要字迹清晰，且小于3M</div>
                            </div>
                        </div>
                    </div>
                    <div className="commonMt-30">
                        <div className="title">职位<span className="commonInputPrompt">(选填)</span></div>
                        <input type="text" placeholder="请输入职位名称" className="commonInput commonSingleLine"
                               value={state.companyPosition}
                               onInput={(e) => {
                                   this.setState({companyPosition: e.target.value})
                               }}/>
                    </div>
                    <div className="companyBaseInfoTitle commonTitle">
                        企业账户信息
                    </div>
                    <div className="commonMt-30">
                        <div className="title">账户名称<span className="commonInputPrompt">(必填)</span></div>
                        <input type="text" placeholder="请输入账户名称" className="commonInput commonSingleLine" value={state.accountName} readOnly={state.companyData ?  true : false} onInput={(e) => {
                            this.setState({accountName: e.target.value}
                            )
                        }}/>
                        <div className="title" style={{marginTop:10}}>账户名称需与企业名称一致,否则影响收款</div>
                    </div>
                    <div className="commonMt-30">
                        <div className="title">账号<span className="commonInputPrompt">(必填)</span></div>
                        <input type="text" placeholder="请输入帐号" className="commonInput commonSingleLine" value={state.bankCardNo} readOnly={state.companyData ?  true : false} onInput={(e) => {
                            this.setState({bankCardNo: e.target.value})
                        }}/>
                    </div>
                    <div className="commonMt-30">
                        <div className="title">开户行<span className="commonInputPrompt">(必填)</span></div>
                        <input type="text" placeholder="请输入开户行" className="commonInput commonSingleLine" value={state.bankName} readOnly={state.companyData ?  true : false} onInput={(e) => {
                            this.setState({bankName: e.target.value})
                        }}/>
                    </div>
                    <a href="javascript:;" className="next theme-button-bg" onClick={() => this.onNext()}>下一步</a>
                </div>
                {/*确认提价企业认证*/}
                <div className="checkCompanyBaseInfo" style={{display: state.step == 1 ? "block" : "none"}}>
                    <div className="checkPrompt commonMt-30">
                        <i /><span className="commonInputPrompt">请仔细核对您的企业认证信息</span>
                    </div>
                    <div className="commonMt-30 commonTitle">
                        企业基本信息
                    </div>
                    <div className="name">
                        <div className="title fl">企业名称：</div>
                        <div className="content commonSingleLine fr">{this.state.enterpriseName}</div>
                    </div>
                    <div className="code">
                        <div className="title fl">企业信用代码：</div>
                        <div className="content commonSingleLine fr">{this.state.enterpriseCode}</div>
                    </div>
                    <div className="position">
                        <div className="title fl">职位：</div>
                        <div className="content commonSingleLine fr">{this.state.companyPosition}</div>
                    </div>
                    <div className="account commonTitle ">
                        企业账户信息
                    </div>
                    <div className="accountName">
                        <div className="title fl">账户名称：</div>
                        <div className="content commonSingleLine fr">{this.state.accountName}</div>
                    </div>
                    <div className="accountId">
                        <div className="title fl">账号：</div>
                        <div className="content commonSingleLine fr">{this.state.bankCardNo}</div>
                    </div>
                    <div className="accountBank">
                        <div className="title fl">开户行：</div>
                        <div className="content commonSingleLine fr">{this.state.bankName}</div>
                    </div>
                    <div className="bottom">
                        <a href="javascript:;" className="back" onClick={() => this.onBack()}>返回修改</a>
                        <a href="javascript:;" className="submit theme-button-bg"
                           onClick={() => this.onSubmit()}>确认提交</a>
                    </div>
                </div>
            </div>
        );
    }

}

export default Main;
