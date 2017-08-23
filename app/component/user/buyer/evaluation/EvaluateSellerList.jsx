/**
 * Created by Kirk liu on 2017/7/22.
 */
import React from 'react';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <ul className="evaluateTypeCon">
                    <li className="checked">
                        全部评价(1000)
                    </li>
                    <li>
                        好评(1000)
                    </li>
                    <li>
                        中评(1000)
                    </li>
                    <li>
                        差评(1000)
                    </li>
                </ul>
                <ul className="evaluateSellerList">
                    <li className="evaluateSellerItem clear">
                        <div className="left fl">
                            <div className="title">我需要界面设计服务</div>
                            <div className="orderNo">订单号：QN12123123124312</div>
                            <div className="sellerName">卖家： 恒辉文化有限公司</div>
                        </div>
                        <div className="middle fl">
                            ￥12000.00
                        </div>
                        <div className="right fr">
                            <div className="type fl">
                                <i></i>
                                <span>差评</span>
                            </div>
                            <div className="evaluateDetail fl">
                                <div className="myEvaluateTitle">我的评价</div>
                                <div className="myEvaluateDesc">做事效率低态度比较差。做事效率低态度比较差做事效率低态度比较差做事效率低态度比较差</div>
                                <div className="myEvaluateTime">2017-07-28 12:22</div>
                                <div className="line"></div>
                                <div className="sellerReplyTitle">
                                    <a href="javascript:;">卖家印象</a>
                                </div>
                                <div className="sellerReplyDesc">做事效率低态度比较差。做事效率低态度比较差做事效率低态度比较差做事效率低态度比较差</div>
                                <div className="sellerReplyTime">2017-07-28 12:22</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
export default Main;
