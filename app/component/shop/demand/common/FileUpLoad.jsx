/**
 * Created by Kirk liu on 2017/7/24.
 */
import React from 'react';
import $ from 'jquery';
import urlManager from '../../../../public/js/urlManager';
import layer from '../../../../public/js/layer';
import serviceApi from '../../../../public/js/serviceApi';
import chatUtils from './../../../common/chat/chatUtils';
import './../../../../public/plugin/ajaxfileupload';
class Desc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            annexList: this.props.data ? (this.props.data.annexList || []) : []
        };
    }

    demandUploadDel(index,annexId,requireId) {

        let annexDel = () =>{
            let annexList = this.state.annexList;
            let annexListTemp = [];
            annexList.map((data,indexOf)=>{
                if(index != indexOf){
                    annexListTemp.push(data)
                }
            });
            this.setState({annexList: annexListTemp});
        };
        /*如果附件ID 存在 则删除服务器附件*/
        if(annexId){
            layer.loading.open();
            serviceApi('aDemandDeleteAnnex',{requireId:requireId,annexId:annexId},()=>{
                layer.loading.close();
                annexDel();
            },(data)=>{
                layer.loading.close();
                layer.msg(data.message);
            })
        }else{
            annexDel();
        }
    }

    componentDidMount() {
        let THIS = this;
        function fun() {
            $('#file1').change(function () {
                if (THIS.state.annexList.length >= 5) {
                    layer.msg('最多可添加5个附件');
                    return false
                }
                layer.loading.open();
                let input = this;
                let file = input.files[0];
                if (file) {
                    let byteSize = file.size;
                    if (byteSize > 10240000) {
                        layer.msg('文件不能超过10M');
                        return false;
                    }
                } else {
                    return false;
                }

                $.ajaxFileUpload({
                    url: urlManager.aDemandUpload,
                    type: 'post',
                    secureuri: false, //一般设置为false
                    fileElementId: 'file1', // 上传文件的id、name属性名
                    dataType: 'text', //返回值类型，一般设置为json、application/json
                    data: {type: 0}, //传递参数到服务器  需求相关附件，不传默认0    0- 需求附件  1-应答附件
                    success: function (data, status) {
                        layer.loading.close();
                        layer.msg('上传成功');
                        let annexList = THIS.state.annexList;
                        annexList.push({annexName: file.name, annexUrl: JSON.parse(data).data.annexUrl});
                        THIS.setState({annexList: annexList});
                        $('#file1').replaceWith('<input type="file" name="file" id="file1" class="file" />');
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
        let state = this.state;
        return (
            <div>
                <div className="addFile fl">
                    <a href="javascript:;" className="addAttach fl">添加附件</a>
                    <input type="file" name="file" id="file1" className="file" accept=".jpg,.jpeg,.png"/>
                    <div className="fl Attachtip">最多可添加5个附件，每个大小不超过10M。<a href="javascript:;" onClick={() => {
                        chatUtils.chatServiceShow()
                    }}>上传遇到问题？</a></div>
                </div>
                {
                    state.annexList && state.annexList.length > 0 ?
                        <div className="attach fl">
                            <p>附件: <span style={{color: 'red'}}>{state.annexList.length}</span>/5</p>
                            <ul>
                                {
                                    state.annexList.map((data, index) => {
                                        return (
                                            <li key={data.annexName + index}>
                                                {data.annexName}
                                                <a href="javascript:;" onClick={() => {
                                                 this.demandUploadDel(index,data.id,data.requireId)
                                                 }}>删除</a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        :
                        null
                }
            </div>
        );
    }
}
export default Desc;