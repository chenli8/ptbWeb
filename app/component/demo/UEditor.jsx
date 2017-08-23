/**
 * Created by Kirk liu on 2017/7/21.
 */
import React from 'react';
import $ from 'jquery';

import layer from '../../public/js/layer';
import urlManager from '../../public/js/urlManager';

import '../../public/plugin/ajaxfileupload';

class UEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    getContent() {

    }

    componentDidMount() {
        $.getScript("plugin/ueditor/ueditor.config.js", function () {

            $.getScript("plugin/ueditor/ueditor.all.min.js", function () {
                UE.getEditor('editor');
            })
        });

        function fun(){
            $('#file').change(function(){
                layer.loading.open();
                $.ajaxFileUpload({
                    url: urlManager.aUploadPic,
                    type: 'post',
                    secureuri: false, //一般设置为false
                    fileElementId: 'file', // 上传文件的id、name属性名
                    dataType: 'text', //返回值类型，一般设置为json、application/json
                    data: {type: 2}, //传递参数到服务器
                    success: function (data, status) {
                        layer.loading.close();
                        layer.msg('上传成功');
                        UE.getEditor('editor').execCommand('insertHtml', '<img src="' + JSON.parse(data).data.url + '" />');
                        $('#file').replaceWith('<input name="file" type="file" id="file" class="upLoadPicFile" />');
                        fun();
                    },
                    error: function (data, status, e) {
                        layer.loading.close();
                        layer.msg('上传失败');
                    }
                });
            })
        }
        fun();

    }

    render() {
        return (
            <div className="UEditor">
                <i className="upLoadPic" />
                <input type="file" id="file" name="file" className="upLoadPicFile" accept=".jpg,.jpeg,.png" />
                <script id="editor" type="text/plain" style={{width: 1024, height: 500}}/>
                <button onClick={this.getContent.bind(this)}>获得内容</button>
            </div>
        );
    }
}
export default UEditor;