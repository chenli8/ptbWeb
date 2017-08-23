/*

 /!**
 * Created by Kirk liu on 2017/7/22.
 *!/
 import React from 'react';
 import layer from '../../../../public/js/layer';
 import serviceApi from '../../../../public/js/serviceApi';

 class Item extends React.Component {
 constructor(props) {
 super(props);
 this.state = {
 isLoaded:true,
 data:{}
 };
 }
 getCollectShop() {
 //  layer.loading.open();
 var data={

 }
 /!*  this.postApi = serviceApi('aorderList', {
 start:0,
 end:10,
 orderStatus:4,
 userType:1
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
 });*!/
 }
 componentDidMount() {
 this.getCollectShop()
 }

 render() {
 var state=this.state;
 return (
 <div>
 <div className="aseSubNav">
 <ul>
 <li>
 <i className="ico-checked"> </i>
 <span>全部评价(1000)</span>
 </li>
 <li>
 <i className="ico-checked"> </i>
 <span>好评(1000)</span>
 </li>
 <li>
 <i className="ico-checked"> </i>
 <span>中评(1000)</span>
 </li>
 <li>
 <i className="ico-checked"> </i>
 <span>差评(1000)</span>
 </li>
 </ul>
 </div>
 <div className="aseItem">
 <div className="items">
 <div className="aseInfo fl">
 <b>我需要界面设计服务</b>
 <div>订单号：QN12123123124312</div>
 <div>卖家：   恒辉文化有限公司</div>
 </div>
 <div className="asePrice fl">
 ￥12000.00
 </div>
 <div className="aseDesc">
 <div className="fl">
 <i className="ico-sadFace"> </i>
 <b>差评</b>
 </div>
 <div className="fl aseCons">
 <span>卖家印象</span>
 <b>做事效率低态度比较差。</b>
 <div>2017-07-12 13:52</div>
 <div className="userAwser">
 我的回复 <i className="ico-arrow-down"> </i>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
 }
 }
 export default Item;
 */
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
