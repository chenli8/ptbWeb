/**
 * Created by Kirk liu on 2017/7/27.
 */
import React from 'react';
import $ from 'jquery';
import './../../../../public/plugin/ajaxfileupload';
import layer from './../../../../public/js/layer';
import urlManager from './../../../../public/js/urlManager';
class FileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: this.props.img || ''
        };
    }

    upload(obj) {
        let input = document.getElementById(obj);
        if (typeof FileReader === 'undefined') {
            layer.msg("抱歉，你的浏览器不支持 FileReader");
            input.setAttribute('disabled', 'disabled');
            return;
        }
        let file = input.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            $('#serviceCover').attr('src', this.result);
        };
        if (file) {
            let byteSize = file.size;
            if (byteSize > 5120000) {
                layer.msg('文件不能超过500K');
                return false;
            }
        } else {
            return false;
        }
        let THIS = this;
        $.ajaxFileUpload({
            url: urlManager.aUploadCommon + '&type=7',
            type: 'post',
            secureuri: false, //一般设置为false
            fileElementId: obj, // 上传文件的id、name属性名
            dataType: 'text', //返回值类型，一般设置为json、application/json
            data: {}, //传递参数到服务器
            success: function (data, status) {
                layer.loading.close();
                layer.msg('上传成功');
                THIS.setState({img: JSON.parse(data).data.url})
            },
            error: function (data, status, e) {
                layer.loading.close();
                layer.msg('上传失败');
            }
        });
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <img src={this.props.img} alt="" id="serviceCover"/>
                <div className="fileUpload fl">
                    <a href="javascript:;" className="addAttach fl" onClick={() => {

                    }}>添加附件</a>
                    <input type="file" className="file" name="file" id="file"
                           onChange={this.upload.bind(this, "file")}/>
                </div>
                <div className="tipsText fl">
                    <span>1. 图片尺寸不低于400*400，大小不超过500K <br /> 2. 图片尽量清晰，并能够提现服务卖点</span>
                </div>

            </div>
        );
    }
}
export default FileUpload;