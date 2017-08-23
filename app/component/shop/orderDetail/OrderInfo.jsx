import React from 'react'
class OrderInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="orderInfo fl">
                    <div className="left fl">
                        <p className="topTitle">购买服务：</p>
                        <div>
                            <img className="img fl"/>
                            <div className="info fl">
                                <div className="title">长安福特</div>
                                <div className="desc">价格：可议</div>
                            </div>
                        </div>
                    </div>
                    <div className="right fl">
                        <p className="topTitle">卖家信息：</p>
                        <div>
                            <img className="img fl"/>
                            <div className="info fl">
                                <div className="title">品推宝</div>
                                <div className="desc">好评率50%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default OrderInfo;