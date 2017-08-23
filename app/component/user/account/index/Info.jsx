/**
 * Created by Kirk liu on 2017/7/22.
 */
import React from 'react';
import $ from 'jquery';
import cookie from 'react-cookie';
import layer from '../../../../public/js/layer';
import serviceApi from '../../../../public/js/serviceApi';
import urlManager from '../../../../public/js/urlManager';
import '../../../../public/plugin/ajaxfileupload';
class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userImage: cookie.load('userImage'),
            nickName: cookie.load('nickName'),
            nickNameInput: false,
            nickNameNew:cookie.load('nickName')
        };
    }
    readFile(obj) {
        let input = document.getElementById(obj);
        if (typeof FileReader === 'undefined') {
            layer.msg("抱歉，你的浏览器不支持 FileReader");
            input.setAttribute('disabled', 'disabled');
            return;
        }
        let file = input.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            $('#' + obj).prev().attr('src', this.result);
        };
        /*上传*/
        if (file) {
            let byteSize = file.size;
            if (byteSize > 1024000) {
                layer.msg('文件不能超过1M');
                return false;
            }
            this.uploadPic();
            /*上传*/
        }
    }

    uploadPic() {
        layer.loading.open();
        $.ajaxFileUpload({
            url: urlManager.aUploadportrait,
            type: 'post',
            secureuri: false, //一般设置为false
            fileElementId: 'file', // 上传文件的id、name属性名
            dataType: 'text', //返回值类型，一般设置为json、application/json
            data: {type: -1}, //传递参数到服务器
            success: function (data, status) {
                layer.loading.close();
                layer.msg('上传成功');
                cookie.save('userImage', JSON.parse(data).data.url);
            },
            error: function (data, status, e) {
                layer.loading.close();
                layer.msg('上传失败');
            }
        });
    }

    handleSaveInfo() {
        if (this.state.nickNameInput) {
            let nickNameNew = this.state.nickNameNew;
            if (nickNameNew.toString().trim().length >= 1) {
                let param = {
                    nickname: nickNameNew
                };
                serviceApi('aUserNickname', param, () => {
                    layer.msg('保存成功');
                    cookie.save('nickName', param.nickname);
                    this.setState({nickNameInput: false, nickName: param.nickname});
                }, (data) => {
                    layer.msg(data.message)
                });
            } else {
                layer.msg('不能为空')
            }

        }
    }

    componentDidMount() {

    }

    render() {
        let state = this.state;
        return (
            <div className="info fl">
                <div className="userImage fl">
                    <img src={state.userImage} alt=""/>
                    <input type="file" id="file" name="file" accept=".jpg,.jpeg,.png"
                           onChange={this.readFile.bind(this, "file")}/>
                    <span className="edit">修改</span>
                </div>
                <div className="userName fl">
                    <div className="nikeName">
                        {
                            state.nickNameInput ?
                                <input type="text" defaultValue={state.nickName} placeholder="1-30个字符" maxLength={30}
                                       onInput={(e) => {
                                           this.setState({nickNameNew: e.target.value});
                                       }}
                                />
                                :
                                <span className="fl">{state.nickName}</span>
                        }
                        {
                            state.nickNameInput ?
                                <i className="ico-edit-submit fl" onClick={
                                    () => {
                                        this.setState({nickNameInput: true});
                                        this.handleSaveInfo();
                                    }
                                }/>
                                :
                                <i className="i-account-userName-edit fl" onClick={
                                    () => {
                                        this.setState({nickNameInput: true});
                                        this.handleSaveInfo();
                                    }
                                }/>
                        }

                    </div>
                    <div className="userId fl">用户ID：{cookie.load('chatUid')}</div>
                </div>
            </div>
        );
    }
}
export default Info;