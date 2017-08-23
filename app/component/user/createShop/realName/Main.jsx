import React from 'react';

import $ from 'jquery';
import '../../../../public/plugin/ajaxfileupload';
import serviceApi from "../../../../public/js/serviceApi";
import layer from "../../../../public/js/layer";
import urlManager from "../../../../public/js/urlManager";
import cookie from 'react-cookie'

class Main extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            idenState:0,
            fullName:"",
            identificationNum:"",
            positivePhotoUrl:"",
            backPhotoUrl:"",
            step:-1,
            personal: null,
        }
    }

    componentDidMount(){
        $('.timeStepContainer').find('li').eq(1).children('div').eq(0).addClass('stepIco-s');
        $('.timeStepContainer').find('li').eq(1).children('div').eq(3).addClass('leftLine-s');
        $('.timeStepContainer').find('li').eq(1).children('div').eq(4).addClass('rightLine-s');
        this.getAuthInfo();
    }

    getAuthInfo() {
        layer.loading.open();
        serviceApi('aAuthStateInfo', {
            userId:cookie.load('chatUid'),
        }, (data) => {
            layer.loading.close();
            if(data.personal && (data.personal.idenState == 1 || data.personal.idenState == 3)){
                let pic1 = "";
                let pic2 = "";
                if(data.personal.picUrl){
                    if(data.personal.picUrl.length > 0){
                        pic1 = data.personal.picUrl[0];
                    }
                    if(data.personal.picUrl.length > 1){
                        pic2 = data.personal.picUrl[1];
                    }
                }

                this.setState({
                    step:2,
                    idenState:data.personal.idenState,
                    fullName:data.personal.fullName,
                    identificationNum:data.personal.identificationNum,
                    positivePhotoUrl: pic1,
                    backPhotoUrl:pic2,
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

    onNext(){
        let state = this.state;
        if (state.fullName === '') {
            layer.msg('请填写姓名');
            return
        }
        if (state.identificationNum === '') {
            layer.msg('请填写身份证号码');
            return
        }

        if($("#positivePhotoImgId").attr("src") === ''){
            layer.msg("请上传身份证正面照");
            return;
        }

        if($("#backPhotoImgId").attr("src") === ''){
            layer.msg("请上传身份证背面照");
            return;
        }
        this.setState({step:1})
    }

    onBack(){
        this.setState({step:0})
    }

    readFile(type, elId){
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
            if(type == 0){
                $("#positivePhotoImgId").parent().attr("class", "positivePhoto show");
                $("#positivePhotoImgId").attr("src", this.result);
            } else{
                $("#backPhotoImgId").parent().attr("class", "backPhoto show");
                $("#backPhotoImgId").attr("src", this.result);
            }
        }
    }

    uploadPic(type) {
        let THIS = this;

        let id = "positivePhotoInputId";
        if(type != 0){
            id = "backPhotoInputId";
        }
        $.ajaxFileUpload({
            url: urlManager.aUploadPic,
            type: 'post',
            secureuri: false, // 一般设置为false
            fileElementId: id, // 上传文件的id、name属性名
            dataType: 'text', // 返回值类型，一般设置为json、application/json
            data: {type: 2}, // 传递参数到服务器
            success: function (data, status) {
                // layer.msg('上传成功');
                THIS.uploadPicSuccess(type, JSON.parse(data).data.url);
            },
            error: function (data, status, e) {
                layer.loading.close();
                layer.msg('上传失败');
            }
        });
    }

    uploadPicSuccess(type, url){
        if(type == 0){
            this.state.positivePhotoUrl = url;
            this.uploadPic(1);
        } else{
            this.state.backPhotoUrl = url;
            this.onSubmit();
        }
    }

    onSubmit(){
        layer.loading.open();
        if (this.state.positivePhotoUrl === '') {
            this.uploadPic(0);
            return;
        }
        if (this.state.backPhotoUrl === '') {
            this.uploadPic(1);
            return;
        }
        let params = {
            fullName:this.state.fullName,
            identificationNum:this.state.identificationNum,
            picList:[this.state.positivePhotoUrl, this.state.backPhotoUrl]
        };
        serviceApi('aUpdatepersonal', params, (data) => {
            window.location.href = urlManager.pCreateShop + '?date='+ new Date().getTime() +'#/RealName/Success'
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        })
    }

    updateAuthInfo(){
        this.setState({
            step:0
        },function () {
            if(this.state.positivePhotoUrl){
                $("#positivePhotoImgId").parent().attr("class", "positivePhoto show");
                $("#positivePhotoImgId").attr("src", this.state.positivePhotoUrl);
            }
            if(this.state.backPhotoUrl){
                $("#backPhotoImgId").parent().attr("class", "backPhoto show");
                $("#backPhotoImgId").attr("src", this.state.backPhotoUrl);
            }
        })
    }

    onSkipUpdateAutoInfo(){
        this.props.history.push({
            pathname: '/Company/Index'
        })
    }

    render() {
        let state = this.state;
        return (
            <div>
                {/*审核中或者已认证*/}
                <div className="checkUserBaseInfo" style={{display: state.step == 2 ? "block" : "none" }}>
                    <div className="checkPrompt commonMt-30">
                        <i /><span className="commonInputPrompt">{state.idenState==1 ? "审核中" : "已认证"}</span>
                        {
                            state.idenState==3 ?
                                <a href="javascript:;" className="updateAutoInfo" onClick={this.updateAuthInfo.bind(this)}>修改认证信息</a>
                                :
                                null
                        }
                    </div>
                    <div className="name">
                        <div className="title fl">真实姓名：</div>
                        <div className="content commonSingleLine fr">{state.fullName}</div>
                    </div>
                    <div className="id">
                        <div className="title fl">身份证号码：</div>
                        <div className="content commonSingleLine fr">{state.identificationNum}</div>
                    </div>
                    <div className="bottom">
                        <a href="javascript:;" className="submit theme-button-bg" onClick={() => this.onSkipUpdateAutoInfo()}>下一步</a>
                    </div>
                </div>
                {/*提交认证*/}
                <div className="userBaseInfo" style={{display: state.step == 0 ? "block" : "none" }}>
                    <div className="companyBaseInfoTitle commonTitle">
                        个人基本信息
                    </div>
                    <div className="commonMt-30">
                        <div className="title">真实姓名<span className="commonInputPrompt">(必填)</span></div>
                        <input type="text" placeholder="请输入真实姓名" className="commonInput commonSingleLine" value={state.fullName} onInput={(e)=>{this.setState({fullName:e.target.value})}}/>
                    </div>
                    <div className="commonMt-30">
                        <div className="title">身份证号码<span className="commonInputPrompt">(必填)</span></div>
                        <input type="text" placeholder="请输入身份证号码" className="commonInput commonSingleLine" value={state.identificationNum} onInput={(e)=>{this.setState({identificationNum:e.target.value})}}/>
                    </div>
                    <div className="commonMt-30">
                        <div className="title">身份证照片<span className="commonInputPrompt">(必填)</span></div>
                        <div className="idPhoto">
                            <div className="photo fl">
                                <div className="photoUpload positiveUpload">
                                    <i/>
                                    <div className="subTitle">上传身份证<span className="commonInputPrompt">正面</span>照片</div>
                                </div>
                                <div className="positivePhoto hide">
                                    <img src="" alt="" id="positivePhotoImgId"/>
                                </div>
                                <input type="file" id="positivePhotoInputId" name="file" accept=".jpg,.jpeg,.png" onChange={this.readFile.bind(this, 0, "positivePhotoInputId")}/>
                            </div>
                            <div className="photo fl">
                                <div className="photoUpload backUpload">
                                    <i/>
                                    <div className="subTitle">上传身份证<span className="commonInputPrompt">背面</span>照片</div>
                                </div>
                                <div className="backPhoto hide">
                                    <img src="" alt="" id="backPhotoImgId"/>
                                </div>
                                <input type="file" id="backPhotoInputId" name="file" accept=".jpg,.jpeg,.png" onChange={this.readFile.bind(this, 1, "backPhotoInputId")}/>
                            </div>
                            <div className="prompt fr">
                                <div className="title">注意：</div>
                                <div className="subTitle">照片需要字迹清晰，且小于3M</div>
                            </div>
                        </div>
                    </div>
                    <a href="javascript:;" className="next theme-button-bg" onClick={() => this.onNext()}>下一步</a>
                </div>
                {/*确认提交认证*/}
                <div className="checkUserBaseInfo" style={{display: state.step == 1 ? "block" : "none" }}>
                    <div className="checkPrompt commonMt-30">
                        <i /><span className="commonInputPrompt">请仔细核对您的个人认证信息</span>
                    </div>
                    <div className="commonMt-30 commonTitle">
                        个人基本信息
                    </div>
                    <div className="name">
                        <div className="title fl">真实姓名：</div>
                        <div className="content commonSingleLine fr">{state.fullName}</div>
                    </div>
                    <div className="id">
                        <div className="title fl">身份证号码：</div>
                        <div className="content commonSingleLine fr">{state.identificationNum}</div>
                    </div>
                    <div className="bottom">
                        <a href="javascript:;" className="back" onClick={() => this.onBack()}>返回修改</a>
                        <a href="javascript:;" className="submit theme-button-bg" onClick={() => this.onSubmit()}>确认提交</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
