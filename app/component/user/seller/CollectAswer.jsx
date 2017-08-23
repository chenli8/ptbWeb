import React, {Component}from 'react';

import serviceApi from '../../../public/js/serviceApi';
import layer from '../../../public/js/layer';
import '../../../public/css/sellerDemandAswer.css';
import Page from "../../common/Page";
import urlManager from "../../../public/js/urlManager";
import utils from "../../../public/js/utils";

class Item extends Component {

    render() {
        var requireInfo = this.props.requireInfo;
        return (
            <li>
                <div className="requireItem">
                    <div className="reqiureInfo">
                        <div className="title">
                            订单号 : <span className="orderNum">{requireInfo.requireNo}</span>
                            <div className="times fr"></div>
                        </div>
                        <div className="myRequire">
                            <div className="requireLetf fl">
                                <div className="tops commonSingleLine"><a href={urlManager.pDemandDetail + '#/' + requireInfo.id}>{requireInfo.requireName}</a></div>
                                <div className="requireDetail">
                                    {requireInfo.requireDesc}
                                </div>
                            </div>
                            <div className="requireRight fl">
                                  <span>
                                      {
                                          requireInfo.budgetType == 1 ?
                                              '可议价'
                                              :
                                              requireInfo.budgetType == 2 ?
                                                  "￥"+requireInfo.budgetMinPrice +'起'
                                                  :
                                                  requireInfo.budgetMinPrice +''
                                      }
                                  </span>
                            </div>
                            <a href={urlManager.pDemandDetail + '#/' + requireInfo.id} className="reDetailBtn fr">查看详情</a>
                        </div>
                    </div>
                    {
                        requireInfo.answer ?
                            <div className="myrequs">
                                <div className="uers">我的应答</div>
                                <div className="mydetails">
                                    <div className="rePrice">
                                        报价 :   <b dangerouslySetInnerHTML={{__html: utils.toFixedNumPriceOne(requireInfo.answer.budgetMinPrice / 100, 0)}}></b>
                                    </div>
                                    <div className="serverDesc">
                                        服务描述 ：
                                        <span>{requireInfo.answer.serviceDesc}</span>
                                    </div>
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            </li>
        )
    }
}


class DemandAswer extends Component {

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

    getRequireList() {
        let state = this.state;

        let data = {
            start: state.start,
            end: state.start + state.pageSize,
            status: state.status,
        };
        if (state.keywords) {
            data.key = state.keywords;
            data.type = state.searchType;
        }
        layer.loading.open();
        this.postApi = serviceApi('aCollectrequire', data, (data) => {
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
                        </ul>
                }
                <ul className="orderInfoList">
                    {
                        state.isLoad ?
                       state.requireList.length>0 ?
                            state.requireList.map((item) => {
                                return ( <Item requireInfo={item} key={item.id}/>)
                            })
                        :
                        <p className="noListTap">暂无收藏的需求。</p>
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


export default DemandAswer;
