/**
 * Created by Kirk liu on 2017/7/21.
 */
import React from 'react';
import $ from 'jquery';
import layer from '../../public/js/layer';
import urlManager from '../../public/js/urlManager';
import '../../public/plugin/ajaxfileupload';


class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    readFile(obj){
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
            $('#' + obj).prev().attr('src', this.result);
        }
    }
    uploadPic() {
        layer.loading.open();
        $.ajaxFileUpload({
            url: urlManager.aUploadPic,
            type: 'post',
            secureuri: false, //一般设置为false
            fileElementId: 'file1', // 上传文件的id、name属性名
            dataType: 'text', //返回值类型，一般设置为json、application/json
            data: {type: 2}, //传递参数到服务器
            success: function (data, status) {
                layer.loading.close();
                layer.msg('上传成功');
                $('#updateResults').html(JSON.parse(data).data.url);
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
                <img src="" alt=""/>
                <input type="file" id="file1" name="file" accept=".jpg,.jpeg,.png"
                       onChange={this.readFile.bind(this, "file1")}/>
                <button onClick={this.uploadPic.bind(this)}>上传</button>
                <span id="updateResults" />
            </div>
        );
    }
}
export default Update;