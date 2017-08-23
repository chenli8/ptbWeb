import React from 'react'
import layer from '../../../public/js/layer';
import serviceApi from '../../../public/js/serviceApi';
import urlManager from '../../../public/js/urlManager';
import $ from 'jquery';

import '../../../public/css/orderbuttons.css';

// 评价订单
class OrderReply extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            order: {}
        };
        this.orderInfo = props.orderInfo
        this.onChangeLayerIndex = props.onChangeLayerIndex
        this.content = ''
    }

    componentDidMount() {
        //获取一下卖家的信息
        this.postApi = serviceApi('aOrderDetailNew', {
            'orderId': this.orderInfo.orderid
        }, (data) => {
            this.setState({
                order: data
            });

        }, (data) => {
            layer.msg(data.message)
        });
    }

    /**
     * 监听输入
     * @param e
     */
    onResultChange(e) {
        this.content = e.target.value;
        $('#inputResult').css({'border': '1px solid #E8E8E8'});
    }

    //操作订单
    replyComment() {
        if (this.content === '') {
            $('#inputResult').css({'border': '1px solid #f00000'}).focus();
            return
        }
        var data = {
            commentId: this.state.order.comment.commentId,
            content: this.content,
        }
        layer.loading.open();
        this.postApi = serviceApi('aReplayComment', data, (data) => {
            layer.loading.close()
            this.onChangeLayerIndex(200, 'aReplayComment')

        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    render() {
        var state = this.state;
        return (
            <div className="layerModal">
                <div className="layerOrder">
                    <div className="commentPro">
                        <div className="layerTop">
                            <span>评价</span>
                            <a className="closeBtn fr" href="javascript:;" onClick={(type) => {
                                this.onChangeLayerIndex(0)
                            }}> </a>
                        </div>
                        {state.order&&state.order.comment ?
                            <div className="contens">
                                <div>
                                    <span>订单：</span>
                                    <span>{this.orderInfo.orderDesc}</span>
                                </div>
                                <div>
                                    <span>卖家：</span>
                                    <span>{state.order.sellerInfo.userName}</span>
                                </div>
                                <div>
                                    <span>评论内容：</span>
                                    <span>{state.order.comment.content}</span>
                                </div>
                                <textarea id="inputResult" className="inputReason" placeholder="详细的需求描述(不少于15字)"
                                          onChange={(e) => this.onResultChange(e)} defaultValue={this.result}/>

                            </div>
                            :
                            null
                        }
                    </div>
                    <div className="layerBtm">
                        <div href="javascrip:;" className="btn theme-button-bg"
                             onClick={(type) => this.replyComment()}>
                            确认提交
                        </div>
                        <div href="javascrip:;" className="btn button"
                             onClick={(type) => this.onChangeLayerIndex(0)}>
                            取消
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderReply;