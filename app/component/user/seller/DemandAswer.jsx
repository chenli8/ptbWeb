import React, {Component}from 'react';
import {HashRouter as Router, Route, NavLink, Redirect} from 'react-router-dom'
import moment from 'moment-kirk';
import urlManager from '../../../public/js/urlManager';
import serviceApi from '../../../public/js/serviceApi';
import layer from '../../../public/js/layer';
import utils from '../../../public/js/utils';
import '../../../public/css/sellerDemandAswer.css';
import Page from "../../common/Page";
import OrderButtons from '../../shop/order/OrderButtons'
import cookie from 'react-cookie'
import PriceFormat from '../../common/PriceFormat';

const Menu = () =>(
    <ul className="orderTab">
        <li>
            <NavLink to="/DemandAswer/Wait" strict activeClassName="current">待应答</NavLink>
        </li>
        <li>
            <NavLink to="/DemandAswer/Complete" strict activeClassName="current">已应答</NavLink>
        </li>
    </ul>
);

class Item extends Component {
    constructor(props){
        super(props);
        this.state={
            flug:false,
            look:false
        }
    }
    onShowDesc(flug){
     this.setState({flug:flug})
    }
    render() {
        var requireInfo = this.props.requireInfo;

        let serviceDesc = requireInfo.answer.serviceDesc;
        let serviceDescLength = utils.getBytesCount(serviceDesc);

        return (
            <li>
                <div className="requireItem">
                    <div className="reqiureInfo">
                        <div className="title">
                            需求号 : <span className="orderNum">{requireInfo.requireNo}</span>
                            <div className="times fr" />
                        </div>
                        <div className="myRequire">
                            <div className="requireLetf fl">
                                <div className="tops commonSingleLine">
                                    <a href={urlManager.pDemandDetail + '#/' + requireInfo.id}>{requireInfo.requireName}</a>
                                </div>
                                <div className="requireDetail">
                                    {requireInfo.requireDesc}
                                </div>
                            </div>
                            <div className="requireRight fl">
                                  <span>
                                      <PriceFormat data={{
                                          type: requireInfo.budgetType,
                                          min: requireInfo.budgetMinPrice,
                                          max: requireInfo.budgetMaxPrice,
                                          position: 'list'
                                      }}/>
                                  </span>
                            </div>
                            <a href={urlManager.pDemandDetail + '#/' + requireInfo.id}
                               className="reDetailBtn fr">查看详情</a>
                        </div>
                    </div>
                    {
                        this.props.status == 1 ?
                            <div className="myrequs">
                                <div className="uers">我的应答</div>
                                <div className="mydetails">
                                    <div className="rePrice">
                                        报价:
                                        <PriceFormat data={{
                                            type: requireInfo.answer.budgetType,
                                            min: requireInfo.answer.budgetMinPrice,
                                            max: requireInfo.answer.budgetMaxPrice,
                                            position: 'list'
                                        }}/>
                                    </div>
                                    <div className="serverDesc">
                                        服务描述 ：
                                        <span>
                                    {
                                        serviceDescLength > 125
                                            ?
                                            <span>
                                            {
                                                this.state.look ?
                                                    serviceDesc :
                                                    serviceDesc.substring(0, 125) + '...'
                                            }
                                                {
                                                    this.state.look ?
                                                        <a href="javascript:;" onClick={() => this.setState({look: false})}>收起</a>
                                                        :
                                                        <a href="javascript:;" onClick={() => this.setState({look: true})}>查看全部</a>
                                                }
                                        </span>
                                            :
                                            serviceDesc
                                    }
                                </span>
                                    </div>
                                </div>
                            </div>
                            :
                            null
                    }

                </div>
            </li>
        );
    }
}

class Complete extends Component {

    constructor(props) {
        super(props)
        this.state = {
            totalNum: 0,
            start: 0,
            pageSize: 10,
            requireList: [],
            status: 0,
            isLoad:false,
            /*搜索*/
            searchShow: false,
            searchTypeList: [
                {name: '需求名称', id: 1},
                {name: '需求号', id: 2}
            ],
            searchTypeName: '需求名称',
            searchType: 1,
            keywords: '',
            shopId:null
        }
    }

    componentWillMount() {
        if (this.props.location.state !== undefined) {
            this.onOrderStatusClick(this.props.location.state);
        }
    }

    onOrderStatusClick(status) {
        if (this.state.status === status)
            return
        this.setState({
            status: status,
            start: 0
        }, () => {
            this.getRequireList()
        })
    }

    searchSubmit() {
        this.setState({keywords:this.refs.searchInput.value},()=>{
            this.getRequireList();
        })
    }

    getShopInfo() {
        this.postApi = serviceApi('aGetshopinfo', {
            userid: cookie.load('uid')
        }, (data) => {
            this.setState({
                shopId:data.id
            }, function () {
                this.getRequireList();
            });
        }, (data) => {
        });
    }

    getRequireList() {
        let state = this.state;

        if(state.shopId === null){
            this.getShopInfo();
            return;
        }

        let data = {
            shopId:state.shopId,
            start: state.start,
            end: state.start + state.pageSize,
            status: state.status,
        };
        if (state.keywords) {
            data.key = state.keywords;
            data.type = state.searchType;
        }

        layer.loading.open();
        this.postApi = serviceApi('aNswerlist', data, (data) => {
            layer.loading.close();
            this.setState({
                totalNum: data.total,
                requireList: data.requireList,
                isLoad:true
            })
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    onPageClick(start) {
        this.setState({
            start: start
        }, () => {
            this.getRequireList()
        })
    }

    componentDidMount() {
        this.getRequireList();
    }

    componentWillUnmount() {
        this.postApi.abort();
        /*组件卸载 停止ajax请求*/
    }


    render() {
        var state = this.state;
        return (
            <div className="orderList">
                <div className="top">
                    <div className="search fl">
                        <div className="searchType fl">
                            <div className="ties"
                                 onClick={() => this.setState({searchShow: !state.searchShow})}>
                                {state.searchTypeName}<i className="ico-arrow-down"> </i>
                            </div>
                            {
                                state.searchShow ?
                                    <div className="pull">
                                        <ul>
                                            {
                                                state.searchTypeList.map((data) => {
                                                    if (data.id != state.searchType) {
                                                        return (
                                                            <li key={data.id} onClick={() => {
                                                                this.setState({
                                                                    searchType: data.id,
                                                                    searchTypeName: data.name,
                                                                    searchShow: false
                                                                })
                                                            }}>
                                                                {data.name}
                                                            </li>
                                                        )
                                                    }
                                                })
                                            }
                                        </ul>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        <input className="searchInput fl" placeholder="请输入关键字" ref="searchInput" onKeyPress={(e) => {
                            if (e.which === 13) {
                                this.refs.searchSubmit.click()
                            }
                        }}/>
                        <a href="javascript:;" ref="searchSubmit" className="searchBtn theme-button-bg fl"
                           onClick={() => {
                               this.searchSubmit();
                           }}>搜索</a>
                    </div>
                </div>
                <Menu />
                {
                    state.keywords ?
                        null
                        :
                        <ul className="orderTab">
                            <li><a href="javascript:;" className={state.status === 0 ? "current" : ''}
                                   onClick={(status) => this.onOrderStatusClick(0)}>全部应答</a></li>
                            <li><a href="javascript:;" className={state.status === 2 ? "current" : ''}
                                   onClick={(status) => this.onOrderStatusClick(2)}>应答中</a></li>
                            <li><a href="javascript:;" className={state.status === 3 ? "current" : ''}
                                   onClick={(status) => this.onOrderStatusClick(3)}>已结束</a></li>
                            <li><a href="javascript:;" className={state.status === 4 ? "current" : ''}
                                   onClick={(status) => this.onOrderStatusClick(4)}>已签单</a></li>
                        </ul>
                }
                <ul className="orderInfoList">
                    {
                        state.isLoad ?
                        state.requireList.length > 0  ?
                                state.requireList.map((item) => {
                                    return ( <Item requireInfo={item} key={item.id} status="1"/>)
                                })
                            :
                             <p className="noListTap">暂无应答的需求。</p>
                            :
                            null
                    }
                </ul>
                {
                    state.totalNum > state.pageSize ?
                        <Page totalNum={state.totalNum} pageSize={state.pageSize} start={state.start}
                              onPageClick={this.onPageClick.bind(this)}/> : null
                }
            </div>
        )
    }
}

class Wait extends Component {

    constructor(props) {
        super(props)
        this.state = {
            totalNum: 0,
            start: 0,
            pageSize: 10,
            requireList: [],
            status: 0,
            isLoad:false,
            /*搜索*/
            searchShow: false,
            searchTypeList: [
                {name: '需求名称', id: 1},
                {name: '需求号', id: 2}
            ],
            searchTypeName: '需求名称',
            searchType: 1,
            keywords: '',
            shopId:null
        }
    }

    componentWillMount() {
        if (this.props.location.state !== undefined) {
            this.onOrderStatusClick(this.props.location.state);
        }
    }

    onOrderStatusClick(status) {
        if (this.state.status === status)
            return
        this.setState({
            status: status,
            start: 0
        }, () => {
            this.getRequireList()
        })
    }

    searchSubmit() {
        this.setState({keywords:this.refs.searchInput.value},()=>{
            this.getRequireList();
        })
    }

    getShopInfo() {
        this.postApi = serviceApi('aGetshopinfo', {
            userid: cookie.load('uid')
        }, (data) => {
            this.setState({
                shopId:data.id
            }, function () {
                this.getRequireList();
            });
        }, (data) => {
        });
    }

    getRequireList() {
        let state = this.state;

        if(state.shopId === null){
            this.getShopInfo();
            return;
        }

        let data = {
            answer:0,
            shopId:state.shopId,
            start: state.start,
            end: state.start + state.pageSize,
            status: state.status,
        };
        if (state.keywords) {
            data.key = state.keywords;
            data.type = state.searchType;
        }

        layer.loading.open();
        this.postApi = serviceApi('aNswerlist', data, (data) => {
            layer.loading.close();
            this.setState({
                totalNum: data.total,
                requireList: data.requireList,
                isLoad:true
            })
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    onPageClick(start) {
        this.setState({
            start: start
        }, () => {
            this.getRequireList()
        })
    }

    componentDidMount() {
        this.getRequireList();
    }

    componentWillUnmount() {
        this.postApi.abort();
        /*组件卸载 停止ajax请求*/
    }


    render() {
        var state = this.state;
        return (
            <div className="orderList">
                <div className="top">
                    <div className="search fl">
                        <div className="searchType fl">
                            <div className="ties"
                                 onClick={() => this.setState({searchShow: !state.searchShow})}>
                                {state.searchTypeName}<i className="ico-arrow-down"> </i>
                            </div>
                            {
                                state.searchShow ?
                                    <div className="pull">
                                        <ul>
                                            {
                                                state.searchTypeList.map((data) => {
                                                    if (data.id != state.searchType) {
                                                        return (
                                                            <li key={data.id} onClick={() => {
                                                                this.setState({
                                                                    searchType: data.id,
                                                                    searchTypeName: data.name,
                                                                    searchShow: false
                                                                })
                                                            }}>
                                                                {data.name}
                                                            </li>
                                                        )
                                                    }
                                                })
                                            }
                                        </ul>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        <input className="searchInput fl" placeholder="请输入关键字" ref="searchInput" onKeyPress={(e) => {
                            if (e.which === 13) {
                                this.refs.searchSubmit.click()
                            }
                        }}/>
                        <a href="javascript:;" ref="searchSubmit" className="searchBtn theme-button-bg fl"
                           onClick={() => {
                               this.searchSubmit();
                           }}>搜索</a>
                    </div>
                </div>
                <Menu />
                <ul className="orderInfoList">
                    {
                        state.isLoad ?
                        state.requireList.length > 0  ?
                                state.requireList.map((item) => {
                                    return ( <Item requireInfo={item} key={item.id} status="0"/>)
                                })
                            :
                             <p className="noListTap">暂无应答的需求。</p>
                            :
                            null
                    }
                </ul>
                {
                    state.totalNum > state.pageSize ?
                        <Page totalNum={state.totalNum} pageSize={state.pageSize} start={state.start}
                              onPageClick={this.onPageClick.bind(this)}/> : null
                }
            </div>
        )
    }
}

const Index = ()=>(
    <Router>
        <div>
            <Route exact path="/DemandAswer"
                   render={() => (<Redirect to="/DemandAswer/Wait"/>)}/>
            <Route path="/DemandAswer/Wait" component={Wait}/>
            <Route path="/DemandAswer/Complete" component={Complete}/>
        </div>
    </Router>
);

export default Index;
