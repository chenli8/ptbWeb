import React from 'react'
import Reflux from 'reflux'
import Page from '../Page.jsx'
import SearchStore from './SearchStore.js'
import SearchAction from './SearchAction.js'
import urlManager from '../../../../../public/js/urlManager.js'
import None from '../None.jsx'
import Load from '../Loading.jsx'
import pubFun from '../../../../../public/js/pubFun.js'

class Items extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.store = SearchStore;
    }
    handleSearch (start, end) {
        SearchAction.questSearch(start, end);
    }
    linkMediaDetail (pMid, type) {
        window.open(urlManager.pMediaDetail + '?pMid=' + pMid + '&type=' + type,'_blank');
    }
    render () {
        let data = this.state.data, list = data.searchList;
        return (
            <div className="list wx wb" id="list">
                <div className="thead clear">
                    <div className="w1">媒体</div>
                    <div className="w2">标签</div>
                    <div className="w3">粉丝数</div>
                    <div className="w3">转发数</div>
                    <div className="w3">评论数</div>
                    <div className="w3">点赞数</div>
                    {/* <div className="w4">直发</div>
                    <div className="w5">转发</div>
                    <div className="w6">微任务直发</div>
                    <div className="w7">微任务转发</div>
                    <div className="w8">成交</div>
                    <div className="w9">卖家</div>*/}
                </div>
                {!data.isLoading ? <Load/> : data.isLoading && list.length == 0 ? <None/> : null}
                {data.isLoading && list.length ?
                    <ul>
                        {
                            list.map(function (data) {
                                return (
                                    <li onClick={this.linkMediaDetail.bind(this, data.pMid, data.type)} key={data.pMid}>
                                        <div className="media w1">
                                            <div className="headPic">
                                                <i className="wb_img bg_img"
                                                   style={{backgroundImage: 'url(' + data.mediaImage + ')'}}/>
                                                <i className={
                                                    data.isAuth == 2 ?
                                                        "icn_wbAuth ico_wbAuthBlue"
                                                        :
                                                        data.isAuth == 1 ?
                                                            "icn_wbAuth ico_wbAuthYellow"
                                                            :
                                                            data.isAuth == 0 ?
                                                                "icn_wbAuth"
                                                                :
                                                                null
                                                }/> {/*isAuth0.未认证 1 黄标 2 蓝标 ico_wbAuthYellow*/}
                                            </div>
                                            <div className="title">
                                                <div className="userInfo">
                                                    <span className="icn_type icn_wb"/>
                                                    <span className="username">{data.mediaName}</span>
                                                </div>
                                                <div className="desc">ID：{data.pMid}</div>
                                            </div>
                                        </div>
                                        <div className="label w2">
                                            {data.tagList.length ? data.tagList.map(function (data, index) {
                                                return (
                                                    <span key={'abcd' + index}>{data.length > 6 ? data.substr(0,5) + '...' : data}</span>
                                                )
                                            }) : <span>暂无标签</span>}
                                        </div>
                                        <div className="info w3">
                                            <div className="data">
                                                <span
                                                    className="data">{pubFun.toFixedNumOne(data.fansNum)}</span>
                                            </div>
                                        </div>
                                        <div className="info w3">
                                            <div className="data">
                                                <span
                                                    className="data">{pubFun.toFixedNumOne(data.avgSpread)}</span>
                                            </div>
                                        </div>
                                        <div className="info w3">
                                            <div className="data">
                                                <span
                                                    className="data">{pubFun.toFixedNumOne(data.avgComment)}</span>
                                            </div>
                                        </div>
                                        <div className="info w3">
                                            <div className="data">
                                                <span
                                                    className="data">{pubFun.toFixedNumOne(data.avgLike)}</span>
                                            </div>
                                        </div>
                                        <div className="info w10">
                                            <span
                                                className="data">查看详情</span>
                                        </div>
                                       {/* <div className="info">
                                            <div className="desc">粉丝数：{pubFun.toFixedNumOne(data.fansNum)}</div>
                                            <div className="data">
                                                <span className="data">篇均转发：{pubFun.toFixedNumOne(data.avgSpread)}</span>
                                                <span className="data pl">篇均评论：{pubFun.toFixedNumOne(data.avgComment)}</span>
                                                <span className="data pl">篇均点赞：{pubFun.toFixedNumOne(data.avgLike)}</span>
                                            </div>

                                        </div>*/}
                                        {/*<div className="price w4">
                                            <span className="num" dangerouslySetInnerHTML={{__html:pubFun.toFixedNumPriceOne(data.minZhiFaPrice / 100,1)}}/>
                                        </div>
                                        <div className="price w5">
                                            <span className="num" dangerouslySetInnerHTML={{__html:pubFun.toFixedNumPriceOne(data.minZhuanFaPrice / 100,1)}}/>
                                        </div>
                                        <div className="price w6">
                                            <span className="num" dangerouslySetInnerHTML={{__html:pubFun.toFixedNumPriceOne(data.minWRWZhiFaPrice / 100,1)}}/>
                                        </div>
                                        <div className="price w7">
                                            <span className="num" dangerouslySetInnerHTML={{__html:pubFun.toFixedNumPriceOne(data.minWRWZhuanFaPrice / 100,1)}}/>
                                        </div>
                                        <div className="orderNum w8">
                                            <span className="">{data.dealNum}</span>
                                        </div>
                                        <div className="sellNum w9">
                                            <span className="">{data.bindNum}</span>
                                        </div>*/}
                                    </li>
                                )
                            }.bind(this))
                        }
                    </ul> : null}
                {data.isLoading && list.length ?
                    <Page total={data.listTotal} currPage={data.currPage} onSearch={this.handleSearch}/> : null}
            </div>
        )
    }
}
export default Items;