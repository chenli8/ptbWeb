/**
 * Created by Kirk liu on 2017/7/22.
 */
import React from 'react';
import layer from '../../../../public/js/layer';
import serviceApi from '../../../../public/js/serviceApi';


class Waitasses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded:false,
            data:{}
        };
    }
    getCollectShop() {
        layer.loading.open();
        this.postApi = serviceApi('auncommentorder', {
            start:0,
            end:10,
        }, (data) => {
            layer.loading.close();
            this.setState({
                start:0,
                end:10,
                data: data.list,
                isLoaded:true
            });
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }
    componentDidMount() {
        this.getCollectShop()
    }

    render() {
        var state=this.state;
        return (
            <div>
                {
                    state.isLoaded ?
                        state.data.length > 0 ?
                            state.data.map(function(data,index){
                                return (
                                    <div className="Items" key={index}>
                                        <div className="title">
                                            <div className=" fl">
                                                订单号:<span className="nums"> {data.orderInfo.orderNo}</span>
                                            </div>
                                            <div className="fr">
                                                <span>{data.orderInfo.createTime}</span>
                                            </div>
                                        </div>
                                        <div className="mid">
                                            <ul>
                                                <li>
                                                    <span>{data.orderInfo.orderDesc}</span>
                                                    <div className="ordersTyps">[{data.orderInfo.orderStatusDesc}]</div>
                                                    <p>
                                                        {data.orderInfo.needDesc}
                                                    </p>
                                                </li>
                                                <li>
                                                    <span className="orderPri">￥{data.orderInfo.buyerTotalPrice}</span>
                                                    <span className="orderBefore">预付:￥{data.orderInfo.buyerPrepayPrice} <i className="ico-trues"></i></span>
                                                </li>
                                                <li>
                                                         <span className="fr">
                                                            {
                                                                data.orderInfo.orderStauts == 0 ?
                                                                    <span>待确认</span>
                                                                    :
                                                                    data.orderInfo.orderStauts == 1 ?
                                                                        <span>执行中</span>
                                                                        :
                                                                        data.orderInfo.orderStauts == 2 ?
                                                                            <span>已完成 </span>
                                                                            :
                                                                            data.orderInfo.orderStauts == 4 ?
                                                                                <span>全部 </span>
                                                                                :
                                                                                null
                                                            }
                                                        </span>
                                                    <div className="fr attchSell">
                                                        <a href="javascript:;">订单详情</a>
                                                        <a href="javascript:;">联系卖家</a>
                                                    </div>

                                                </li>
                                            </ul>
                                        </div>
                                        <div className="btm">
                                            <div className="fl tip">
                                                <i className="ico-shopIco" style={{backgroundImage: 'url(' + data.sellerInfo.userImage + ')'}}> </i>
                                                <span>{data.sellerInfo.userName}</span>
                                            </div>
                                            <a href="javascrvipt:;" className="fr Evalua theme-button-bg">评价</a>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            null
                        :
                        null
                }
            </div>
        );
    }
}
export default Waitasses;