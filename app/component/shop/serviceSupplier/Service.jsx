/**
 * Created by Yhyu on 2017/7/18.
 */
import React, {Component} from 'react';
import {Provider, connect} from 'react-redux'
import store from '../common/searchListState/store'
import {actionServiceAjaxListData, actionServiceAjaxSearchData} from '../common/searchListState/action'
import Sort from "../common/sort/Sort";
import PriceFormat from '../../common/PriceFormat';
import Page from "../../common/Page";
import urlManager from './../../../public/js/urlManager'
import utils from './../../../public/js/utils'
import '../../../public/css/shopService.css';
import chatUtils from '../../common/chat/chatUtils';
class Item extends Component {

    formatComment(serviceInfo) {
        var total = serviceInfo.positiveNum + serviceInfo.neutralNum + serviceInfo.negativeNum;
        if (total > 0) {
            var result = serviceInfo.positiveNum / total * 100
            return result.toFixed(2) + '%';
        }
        return '0%';
    }

    formatPrice(serviceInfo) {
        var price = serviceInfo.minPrice;
        if (price >= 10000) {
            var result = price / 10000
            return result.toFixed(2) + '万';
        }
        return price;
    }

    handelIsChatInfo(toUser) {
        chatUtils.chatMsgShow(toUser.from);
        /* 唤起聊天窗口 给redux 转递 卖家 userId */
        chatUtils.chatLocalSaveDefault(toUser); //主动唤起 默认模拟 卖家 发送一个空消息 默认欢迎语
    }

    render() {
        let service = this.props.service;
        let serviceInfo = service.serviceInfo;
        let shopInfo = service.shopInfo;
        let href = urlManager.pServiceDetail + "?serviceId=" + serviceInfo.serviceId + "&shopId=" + shopInfo.id;
        return (
            <li>
                <a href={href}>
                   {/*<i className="img" style={{background:"url("+serviceInfo.img+")"}}> </i>*/}
                    <img src={serviceInfo.img} alt="" width={288}/>
                </a>
                <div className="serviceDetail">
                    <a href={href}>
                        <div className="title">{serviceInfo.serviceName}</div>
                    </a>
                    <div className="content">好评率：{this.formatComment(serviceInfo)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        成交量：{serviceInfo.dealNum}</div>
                    <div className="center">
                        <div className="price">
                            <PriceFormat data={{
                                type:serviceInfo.prepayType,
                                min:serviceInfo.minPrice,
                                max:serviceInfo.maxPrice,
                                position:'list'
                            }}/>
                        </div>
                        <a href="javascript:;" className="btn"
                           onClick={
                               this.handelIsChatInfo.bind(this,
                                   {
                                       from: shopInfo.uid,
                                       toUserName: shopInfo.shopName,
                                       toUserImage: shopInfo.image
                                   }
                               )
                           }
                        >联系TA</a>
                    </div>
                    <div className="bottom">
                        <a href={urlManager.pShopDetail + '?shopId=' + shopInfo.id}>
                            <i className="ico-shops"></i>
                            {shopInfo.shopName}
                        </a>
                        <i className="ico-blackArrow"> </i>
                    </div>
                </div>
            </li>
        );
    }
}
class ShopService extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onPageClick(start) {
        const {dispatch} = this.props;
        dispatch({type: 'SERVICE_PAGE', start: start});
        if (this.props.data.match.params.keywords) {
            /*根据关键词 查找服务*/
            dispatch(actionServiceAjaxSearchData());
        } else {
            /*获取服务列表*/
            dispatch(actionServiceAjaxListData());
        }
    }

    componentDidMount() {
        document.title = '服务_品推宝';
        const {dispatch} = this.props;
        /*获取关键词*/
        let keywords = this.props.data.match.params.keywords;
        /*模型更新*/
        dispatch({type: 'MODEL_TYPE', modelType: 1});
        /*服务初始化的时候 通知更新 KEYWORDS*/
        dispatch({type: 'KEYWORDS', keywords: keywords || ''});
        if (keywords) {
            /*根据关键词 查找服务*/
            dispatch(actionServiceAjaxSearchData());
        } else {
            /*此处 与 Category.jsx 有关联*/
            let urlParam = (param) =>{return utils.urlParam(param,window.location.hash)};
            let c1 = urlParam('c1');
            let l1 = urlParam('l1');
            let c2 = urlParam('c2');
            let l2 = urlParam('l2');
            if(c1 || l1 || c2 || l2 ){
                return
            }else{
                /*获取服务列表*/
                dispatch(actionServiceAjaxListData());
            }
        }
    }

    render() {
        let storeState = this.props.storeState;
        let serviceGetData = storeState.serviceGetData;
        let servicePostData = storeState.servicePostData;

        let serviceList = serviceGetData.serviceList;
        let totalNum = serviceGetData.total;
        let pageSize = storeState.pageSize;
        let start = servicePostData.start;
        return (
            <div className="shopService clear">
                <Sort data={[{name: '综合排序', id: 0}, {name: '成交量', id: 1}, {name: '好评率', id: 2}]}
                      storeState={storeState}/>
                <div className="shopServices clear">
                    {
                        serviceGetData ?
                            serviceList.map((item) => {
                                return <Item service={item} key={item.serviceInfo.serviceId}/>
                            })
                            :
                            null
                    }
                    {
                        totalNum == 0 ?
                            <p className="noListTap">没有找到服务。</p>
                            :
                            null
                    }
                    {
                        totalNum > pageSize ?
                            <Page totalNum={totalNum} pageSize={pageSize} start={start}
                                  onPageClick={this.onPageClick.bind(this)}/>
                            : null
                    }
                </div>
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
)(ShopService);
const App = (props) => (
    <Provider store={store}>
        <Index data={props}/>
    </Provider>
);
export default App;
