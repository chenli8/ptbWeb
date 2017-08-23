/**
 * Created by xrr on 2017/7/18.
 */
import React, {Component} from 'react';
import {Provider, connect} from 'react-redux'
import $ from 'jquery'
import {actionSupplierAjaxListData, actionSupplierAjaxSearchData} from '../common/searchListState/action'
import store from '../common/searchListState/store'
import urlManager from '../../../public/js/urlManager';
import chatUtils from '../../common/chat/chatUtils';
import Sort from "../common/sort/Sort";
import Page from "../../common/Page";

import '../../../public/css/shopService.css';
import '../../../public/css/shopSupplier.css';

class Item extends Component {
    onShopDetail(id) {
        window.location.href = urlManager.pShopDetail + '?shopId=' + id;
    }

    handelIsChatInfo(toUser) {
        chatUtils.chatMsgShow(toUser.from);
        /* 唤起聊天窗口 给redux 转递 卖家 userId */
        chatUtils.chatLocalSaveDefault(toUser); //主动唤起 默认模拟 卖家 发送一个空消息 默认欢迎语
    }

    render() {
        let supplier = this.props.supplier;
        return (
            <div className="shopItem">
                <div className="shop_container clearfix">
                    <div className="shopImg">
                        <a href="javascript:;" onClick={() => this.onShopDetail(supplier.id)}>
                            <img src={supplier.image} alt=""/>
                        </a>
                    </div>
                    <div className="shopInfoContainer">
                        <p className="shopName"><a href="javascript:;"
                                                   onClick={() => this.onShopDetail(supplier.id)}>{supplier.shopName}</a>
                        </p>
                        <p className="serviceRange">
                            {
                                supplier.serviceDesc ?
                                    supplier.serviceDesc
                                    :
                                    "暂无描述"
                            }</p>
                        <div className="addressContainer">
                            <span>公司</span>
                            <div className="location">
                                <span><i
                                    className="ico-address" />
                                    {supplier.provincesName + "  " + (supplier.cityName == supplier.provincesName ? supplier.countyName : supplier.cityName)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="dealNumContainer">
                        <p className="dealNum">{supplier.dealNum}笔</p>
                        <p className="dealNumTitle">成交量</p>
                    </div>
                    <div className="favorableRateContainer">
                        <p className="favorableRate">{supplier.positivePrecent}%</p>
                        <p className="favorableRateTitle">好评率</p>
                    </div>
                    <div className="buttonsContainer">
                        <div className="contactSellerBtn" onClick={this.handelIsChatInfo.bind(this, {
                            from: supplier.uid,
                            toUserName: supplier.shopName,
                            toUserImage: supplier.image,
                        })}>联系卖家
                        </div>
                        <div className="enterShopBtn" onClick={() => this.onShopDetail(supplier.id)}>进入店铺</div>
                    </div>
                </div>
            </div>
        );
    }
}
class ShopSupplier extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onSortClick(sortType, orderType) {

    }

    onPageClick(start) {
        const {dispatch} = this.props;
        dispatch({type: 'SUPPLIER_PAGE', start: start});
        if (this.props.data.match.params.keywords) {
            /*根据关键词 查找店铺*/
            dispatch(actionSupplierAjaxSearchData());
        } else {
            /*获取服务列表*/
            dispatch(actionSupplierAjaxListData());
        }
    }

    componentDidMount() {
        document.title = '店铺_品推宝';
        const {dispatch} = this.props;
        /*模型更新*/
        dispatch({type: 'MODEL_TYPE', modelType: 2});
        /*服务初始化的时候 通知更新 KEYWORDS*/
        dispatch({type: 'KEYWORDS', keywords: this.props.data.match.params.keywords || ''});
        if (this.props.data.match.params.keywords) {
            /*根据关键词 查找店铺*/
            dispatch(actionSupplierAjaxSearchData());
        } else {
            /*获取店铺列表*/
            dispatch(actionSupplierAjaxListData());
        }

        /*路由导致的未选中 单独处理选中   顶部导航加上时间后 可以删除以下代码*/
        /*if (window.location.href.indexOf('ShopSupplier') != -1) {
         $('.header .content .nav').children().removeClass('on').eq(2).addClass('on');
         }*/
    }

    render() {
        let storeState = this.props.storeState;
        let supplierGetData = storeState.supplierGetData;
        let supplierPostData = storeState.supplierPostData;

        let shopInfoList = supplierGetData.shopInfoVOList;
        let totalNum = supplierGetData.total;
        let pageSize = storeState.pageSize;
        let start = supplierPostData.start;
        return (
            <div className="shopSupplier clear">
                <Sort data={[{name: '综合排序', id: 0}, {name: '成交量', id: 1}, {name: '好评率', id: 2}, {name: '入驻时间', id: 3}]}
                      storeState={storeState}/>
                <div className="shopSupplier">
                    {
                        supplierGetData ?
                            shopInfoList.map((item) => {
                                return <Item supplier={item} key={item.id}/>
                            })
                            :
                            null
                    }
                    {
                        totalNum == 0 ?
                            <p className="noListTap">没有找到服务商店铺。</p>
                            :
                            null
                    }
                </div>
                {
                    totalNum > pageSize ?
                        <Page totalNum={totalNum} pageSize={pageSize} start={start}
                              onPageClick={this.onPageClick.bind(this)}/>
                        : null
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        storeState: state
    }
};
const Index = connect(
    mapStateToProps
)(ShopSupplier);
const App = (props) => (
    <Provider store={store}>
        <Index data={props}/>
    </Provider>
);
export default App;
