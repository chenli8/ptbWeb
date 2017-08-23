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
        var match = this.props.match;
        return (
            <div className="">
                来自买家的评价
            </div>
        );
    }
}
export default Main;
