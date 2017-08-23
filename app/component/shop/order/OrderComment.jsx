import React from 'react'
import layer from '../../../public/js/layer';
import serviceApi from '../../../public/js/serviceApi';
import urlManager from '../../../public/js/urlManager';
import $ from 'jquery';

import '../../../public/css/orderbuttons.css';

// 评价订单
class OrderComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            order: {},
            commentQuality: 0,
            data: ['好评', '中评', '差评'],
            isAnonymous: 0,
            anonymous: ['公开', '匿名'],
            descScore: 0,
            ontimeScore: 0
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
    commentOrder() {
        if (this.content === '') {
            $('#inputResult').css({'border': '1px solid #f00000'}).focus();
            return
        }
        let data = {
            productId: this.orderInfo.productId,//商品ID
            orderDetailId: this.orderInfo.orderDetailId,//	订单明细ID
            sellerId: this.orderInfo.sellerId,//卖家用户ID
            content: this.content,//	评论内容
            commentQuality: this.state.commentQuality + 1,//评论质量(1-好;2-中;3-差;)
            descScore: this.state.descScore,//描述和报价评分
            ontimeScore: this.state.ontimeScore,//发布准时度评分
            isAnonymous: this.state.isAnonymous,//是否匿名(0-非匿名;1-匿名;)
        };
        layer.loading.open();
        this.postApi = serviceApi('aCommentOrder', data, (data) => {
            layer.loading.close();
            this.onChangeLayerIndex(200, 'aCommentOrder')
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    render() {
        let state = this.state;
        let descScore = state.descScore;
        let ontimeScore = state.ontimeScore;
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
                        {state.order.orderInfo ?
                            <div className="contens">
                                <div>
                                    <span>订单:{this.orderInfo.orderDesc}</span>
                                    <div className="orderSeller">卖家:{state.order.sellerInfo.userName}</div>
                                </div>
                                <div className="chooseComment">
                                    {state.data.map((item, index) => {
                                        return (
                                            <div className="item fl" key={item}>
                                                <li onClick={() => {
                                                    this.setState({
                                                        commentQuality: index
                                                    })
                                                }}>
                                                    <i className={state.commentQuality == index ? "ico-radio on" : "ico-radio"}
                                                    />
                                                    <span>{item}</span>
                                                </li>
                                            </div>
                                        )
                                    })}
                                </div>
                                <textarea id="inputResult" className="inputReason" placeholder="详细的需求描述(不少于15字)"
                                          onChange={(e) => this.onResultChange(e)} defaultValue={this.result}/>
                                <div className="commentStart">
                                    <div>
                                        <ul>
                                            <li><span>服务态度：</span></li>
                                            {
                                                [1,2,3,4,5].map((data)=>{
                                                    return (
                                                        <li onClick={()=>{this.setState({descScore:data})}} key={data}>
                                                            <i className={descScore >=data ? "ico-onStart" :"ico-greyStart" }/>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div>
                                        <ul>
                                            <li><span>服务准确度：</span></li>
                                            {
                                                [1,2,3,4,5].map((data)=>{
                                                    return (
                                                        <li onClick={()=>{this.setState({ontimeScore:data})}} key={data}>
                                                            <i className={ontimeScore >=data ? "ico-onStart" :"ico-greyStart" }/>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div style={{clear: "both"}}></div>
                                <div className="chooseThink">
                                    {state.anonymous.map((item, index) => {
                                        return (
                                            <div className="item fl" key={item}>
                                                <li onClick={() => {
                                                    this.setState({
                                                        isAnonymous: index
                                                    })
                                                }}>
                                                    <i className={state.isAnonymous == index ? "ico-radio on" : "ico-radio"}
                                                    />
                                                    <span>{item}</span>
                                                </li>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            :
                            null
                        }
                        <div className="layerBtm">
                            <div href="javascrip:;" className="btn theme-button-bg"
                                 onClick={(type) => this.onChangeLayerIndex(0)}>
                                取消
                            </div>
                            <div href="javascrip:;" className="btn theme-button-bg"
                                 onClick={(type) => this.commentOrder()}>
                                确认提交
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderComment;