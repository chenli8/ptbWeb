import React, {Component} from 'react';
import layer from "../../../../public/js/layer";
import Page from "../../../common/Page";
import moment from 'moment-kirk';

import serviceApi from '../../../../public/js/serviceApi';
import PriceFormat from '../../../common/PriceFormat';

import '../../../../public/css/buyerDemand.css';

import DemandButtons from "./DemandButtons";
import urlManager from "../../../../public/js/urlManager";
import utils from "../../../../public/js/utils";

class BuyerDemandItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            demand: props.demand,
            look:false
        };
    }

    onUpdate(demandInfo) {
        if(demandInfo.isDelete){
            this.props.refreshList();
        } else{
            this.setState({
                demand: demandInfo
            })
        }
    }

    render() {
        var demand = this.state.demand;

        //console.log(demand);
        var statusDesc = "";
        var subStatusDesc = "";

        var currentTime = Date.parse(new Date());
        if (demand.status == 4 && demand.auditStatus == 1) {
            statusDesc = "审核未通过";
        } else if (demand.auditStatus == 2 && demand.dueTime > currentTime) {
            statusDesc = "距离结束还剩";

            let timeOver = ((demand.dueTime - currentTime) / 1000 / 60 / 60).toFixed(1);
            if (timeOver >= 24) {
                timeOver = (timeOver / 24).toFixed(0) + '天'
            } else {
                timeOver = timeOver + '小时'
            }
            subStatusDesc = timeOver;
        }
        let requireDesc = demand.requireDesc;
        let requireDescLength = utils.getBytesCount(requireDesc);
        return (
            <li>
                <div className="demandInfo">
                    <div className="top">
                        <div className="orderNum fl">
                            需求号：<span>{demand.requireNo}</span>
                        </div>
                        <div className="time fr">
                            {moment(demand.addTime, "x").format('YYYY-MM-DD HH:mm')}
                        </div>
                    </div>
                    <div className="middle">
                        <div className="descCon fl">
                            <div className="title"><a href={urlManager.pDemandDetail + '#/' + demand.id}>{demand.requireName}</a></div>
                            <div className={this.state.look ? "desc on":"desc"}>
                                {
                                    requireDescLength > 55
                                        ?
                                        <span>
                                            {
                                                this.state.look ?
                                                    requireDesc :
                                                    requireDesc.substring(0, 55) + '...'
                                            }
                                            {
                                                this.state.look ?
                                                    <a href="javascript:;" onClick={() => this.setState({look: false})}>收起</a>
                                                    :
                                                    <a href="javascript:;" onClick={() => this.setState({look: true})}>查看全部</a>
                                            }
                                        </span>
                                        :
                                        requireDesc
                                }
                            </div>
                        </div>
                        <div className="priceCon fl">
                            <div className="title">预算</div>
                            <div className="price">
                                <PriceFormat data={{
                                    type: demand.budgetType,
                                    min: demand.budgetMinPrice,
                                    max: demand.budgetMaxPrice,
                                    position: 'list'
                                }}/>
                            </div>
                        </div>
                        <div className="statusCon fr">
                            <div className="status">
                                <i className={demand.status == 1 ? 'wait' : demand.status == 2 ? 'answer' : demand.status == 3 ? 'complete' : 'close'}></i>
                            </div>
                            <div className="statusDesc">
                                {statusDesc}<span>{subStatusDesc}</span>
                            </div>
                            <div className="demandDetailBtn">
                                <a href={urlManager.pDemandDetail + '#/' + demand.id}>需求详情</a>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="answerCountCon fl">
                            <div className="answerCount fl">
                                应答需求<span>{demand.answerNum}人</span>
                            </div>
                            <div className="signCount">
                                已签单<span>{demand.answerNum}人</span>
                            </div>
                        </div>
                        <div className="buttons fr">
                            <DemandButtons demandInfo={demand} onUpdate={this.onUpdate.bind(this, demand)}/>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}


class BuyerDemandList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalNum: 0,
            start: 0,
            pageSize: 10,
            demandList: [],
            status: 0,
            isLoad:false,
            /*搜索*/
            searchShow: false,
            searchTypeList: [
                {name: '需求号', id: 2},
                {name: '需求名称', id: 1}
            ],
            searchTypeName: '需求号',
            searchType: 2,
            keywords: '',
        };
    }

    componentWillMount() {
        if (this.props.location.state !== undefined) {
            this.onDemandTypeClick(this.props.location.state);
        }
    }

    componentDidMount() {
        this.getDemandList();
    }

    componentWillUnmount() {
        this.postApi.abort();
        /*组件卸载 停止ajax请求*/
    }

    onDemandTypeClick(status) {
        if (this.state.status === status) {
            return;
        }
        this.setState({
            status: status,
            start: 0
        }, () => {
            this.getDemandList()
        })
    }

    getDemandList() {
        var state = this.state;
        var params = {
            start: state.start,
            end: state.start + state.pageSize,
            status: state.status,
        }
        if (state.keywords) {
            params.key = state.keywords;
            params.type = state.searchType;
        }

        layer.loading.open();
        this.postApi = serviceApi('arequirelist', params, (data) => {
            layer.loading.close();
            this.setState({
                totalNum: data.total,
                demandList: data.requireList,
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
            this.getDemandList()
        })
    }

    searchSubmit() {
        this.setState({keywords: this.refs.searchInput.value}, () => {
            this.getDemandList();
        })
    }

    refreshList(){
        this.getDemandList();
    }

    render() {
        var state = this.state;
        return (
            <div className="demandList">
                <div className="top clear">
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
                        <input className="searchInput fl" placeholder="请输入关键字" ref="searchInput"
                               onKeyPress={(e) => {
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
                        <ul className="demandTab">
                            <li><a href="javascript:;" className={state.status === 0 ? "current" : ''}
                                   onClick={(status) => this.onDemandTypeClick(0)}>全部需求</a></li>
                            <li><a href="javascript:;" className={state.status === 1 ? "current" : ''}
                                   onClick={(status) => this.onDemandTypeClick(1)}>待审核</a></li>
                            <li><a href="javascript:;" className={state.status === 2 ? "current" : ''}
                                   onClick={(status) => this.onDemandTypeClick(2)}>应答中</a></li>
                            <li><a href="javascript:;" className={state.status === 3 ? "current" : ''}
                                   onClick={(status) => this.onDemandTypeClick(3)}>已结束</a></li>
                            <li><a href="javascript:;" className={state.status === 4 ? "current" : ''}
                                   onClick={(status) => this.onDemandTypeClick(4)}>审核不通过</a></li>
                        </ul>
                }
                <ul className="demandInfoList">
                    {
                        state.isLoad ?
                      state.demandList.length > 0 ?
                            state.demandList.map((item) => {
                                return ( <BuyerDemandItem demand={item} key={item.id} refreshList={this.refreshList.bind(this)}/>)
                            })
                            :
                            <p className="noListTap">您还没有需求。</p>
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
        );
    }
}

export default BuyerDemandList;
