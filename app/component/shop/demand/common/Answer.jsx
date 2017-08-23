/**
 * Created by Kirk liu on 2017/7/26.
 */
import React from 'react';
import Budget from '../../common/Budget';
import serviceApi from './../../../../public/js/serviceApi';
import layer from './../../../../public/js/layer';
import urlManager from './../../../../public/js/urlManager';
import layerModal from './../../../common/layer/Modal';
import $ from 'jquery';
import './../../../../public/plugin/ajaxfileupload';

@layerModal('我要应答')
class Answer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceDesc: '',
            annexList: []
        }
    }

    handleAnswer() {
        let Budget = this.refs.Budget.state;
        let data = {
            requireId: this.props.requireId,//需求ID
            budgetType: Budget.priceType,//预算类型
            budgetMinPrice: Budget.minPrice,//预算资金最小值
            budgetMaxPrice: Budget.maxPrice,//预算资金最大值
            serviceDesc: this.state.serviceDesc,//服务描述
            annexList: this.state.annexList,//附件列表
        };

        if (this.state.serviceDesc.length < 15) {
            layer.msg("需求描述不能少于15个字");
            return;
        }

        serviceApi('aDemandAnswer', data, (data) => {
            layer.msg('应答成功', () => {
                window.location.reload()
            })
        }, (data) => {
            if (data.code == 5001) {
                layer.msg(data.message, () => {
                    window.location.href = urlManager.pCreateShop
                });
            } else {
                layer.msg(data.message);
            }
        })
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
                    data: {type: 1}, //传递参数到服务器  需求相关附件，不传默认0    0- 需求附件  1-应答附件
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
            <div className="cont answer">
                <div className="top fl">
                    <span>报价<span style={{color: 'red'}}>(必填)</span>:</span>
                    <Budget ref="Budget"/>
                </div>
                <div className="md fl">
                    <span>应答描述<span style={{color: 'red'}}>(必填)</span>:</span>
                    <textarea placeholder="详细的应答描述(不少于15字)"
                              onInput={(e) => {
                                  this.setState({serviceDesc: e.target.value})
                              }}
                    />
                </div>
                <div className={"bt fl " + (state.annexList.length > 0 ? 'on' : '' )}>
                    <span className="fl">报价单:</span>
                    <div className="buttonUpload"
                         style={{display: state.annexList.length === 0 ? 'block' : 'none'}}>
                        <a href="javascript:;" className="addAttach fl">上传报价单</a>
                        <input type="file" name="file" id="file1" className="file"
                        />
                    </div>

                    {
                        state.annexList.length > 0 ?
                            state.annexList.map((data) => {
                                return (
                                    <div key={data.annexName} className="newspaperPrice">
                                        <div className="newspaperName fl">{data.annexName}</div>
                                        <a href={data.annexUrl} target="_bank" className="downLoad">下载</a>
                                        <a href="javascript:;" onClick={() => {
                                            this.setState({annexList: []});
                                            layer.msg('删除成功')
                                        }} target="_bank" className="deletes">删除</a>
                                    </div>
                                )
                            })
                            :
                            null
                    }
                </div>
                <div className="submit">
                    <a href="javascript:;" className="theme-button-bg fr ok"
                       onClick={this.handleAnswer.bind(this)}>确认提交</a>
                    <a href="javascript:;" className="fr back"
                       onClick={() => {
                           this.props.show();
                       }}>我再想想</a>
                </div>
            </div>
        );
    }
}

export default Answer;