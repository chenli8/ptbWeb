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
            <div className="list wx" id="list">
                <div className="thead clear">
                    <div className="w1">媒体</div>
                    <div className="w2">标签</div>
                    <div className="w3">头条均阅读</div>
                    <div className="w3">头条均点赞</div>
                    {/* <div className="w4">头条</div>
                    <div className="w5">二条</div>
                    <div className="w6">3-N 条</div>
                    <div className="w7">单图文</div>
                    <div className="w8">成交</div>
                    <div className="w9">卖家</div>*/}
                </div>
                <div id="takeplace"/>
                {!data.isLoading ? <Load/> : data.isLoading && list.length == 0 ? <None/> : null}
                {data.isLoading && list.length ?
                    <ul className="clear">
                        {
                            list.map(function (data) {
                                return (
                                    <li onClick={this.linkMediaDetail.bind(this, data.pMid, data.type)} key={data.pMid}>
                                        <div className="media w1">
                                            <div className="headPic">
                                                <i className="wx_img bg_img"
                                                   style={{backgroundImage: 'url(' + data.mediaImage + ')'}}/>
                                                {data.isAuth == 1 ? <i className="icn_wxAuth"/> : null}
                                            </div>
                                            <div className="title">
                                                <div className="userInfo">
                                                    <span className="icn_type icn_wx"/>
                                                    <span className="username">{data.mediaName}</span>
                                                    {data.isOriginal == 1 ? <span className="icn_original"/> : null}
                                                </div>
                                                <div className="desc">微信号：{data.mediaId}</div>
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
                                                    className="data">{pubFun.toFixedNumOne(data.hlavGread)}</span>
                                                {/*<span
                                                    className="data pl">头条均点赞：{pubFun.toFixedNumOne(data.hlavgZan)}</span>*/}
                                            </div>
                                        </div>
                                        <div className="info w3">
                                            <div className="data">
                                                <span
                                                    className="data">{pubFun.toFixedNumOne(data.hlavgZan)}</span>
                                                {/*<span
                                                 className="data pl">头条均点赞：{pubFun.toFixedNumOne(data.hlavgZan)}</span>*/}
                                            </div>
                                        </div>
                                        <div className="info w10">
                                            <span
                                                className="data">查看详情</span>
                                        </div>
                                        {/*<div className="price w4">
                                            <span className="num" dangerouslySetInnerHTML={{__html:pubFun.toFixedNumPriceOne(data.minTouTiaoPrice / 100,1)}}/>
                                            <span className="text">头条</span>
                                        </div>
                                        <div className="price w5">
                                            <span className="num" dangerouslySetInnerHTML={{__html:pubFun.toFixedNumPriceOne(data.minErTiaoPrice / 100,1)}}/>
                                        </div>
                                        <div className="price w6">
                                            <span className="num" dangerouslySetInnerHTML={{__html:pubFun.toFixedNumPriceOne(data.min3NTiaoPrice / 100,1)}}/>
                                        </div>
                                        <div className="price w7">
                                            <span className="num" dangerouslySetInnerHTML={{__html:pubFun.toFixedNumPriceOne(data.minSinglePicTextPrice / 100,1)}}/>
                                        </div>
                                        <div className="orderNum w8">
                                            <span className="">{data.dealNum}</span>
                                            <span className="text">成交</span>
                                        </div>
                                        <div className="sellNum w9">
                                            <span className="">{data.bindNum}</span>
                                            <span className="text">卖家</span>
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