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
        //window.location.href = urlManager.pMediaDetail + '?pMid=' + pMid + '&type=' + type;
        window.open(urlManager.pMediaDetail + '?pMid=' + pMid + '&type=' + type,'_blank');
    }
    render () {
        let data = this.state.data, list = data.searchList;
        return (
            <div className="list wx zb" id="list">
                <div className="thead clear">
                    <div className="w1">媒体</div>
                    <div className="w2">标签</div>
                    <div className="w3">粉丝数</div>
                    <div className="w4">最高在线人数</div>
                    <div className="w5">平均在线人数</div>
{/*                    <div className="w6">线上直播</div>
                    <div className="w7">线下活动</div>
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
                                                <i className="bg_img"
                                                   style={{backgroundImage: 'url(' + data.mediaImage + ')'}}/>
                                                {data.isAuth == 1 ? <i className="icn_wxAuth"/> : null}
                                            </div>
                                            <div className="title">
                                                <div className="userInfo">
                                                    <span className={
                                                        data.type == 5 ?
                                                            "icn_type icn_dy"
                                                            :
                                                            data.type == 6 ?
                                                                "icn_type icn_hj"
                                                                :
                                                                data.type == 4 ?
                                                                    "icn_type icn_yzb"
                                                                    :
                                                                    data.type == 3 ?
                                                                        "icn_type icn_yk"
                                                                        :
                                                                        null

                                                    }/>{/*1 2 3-映客 4-一直播 5-斗鱼 6-花椒*/}
                                                    <span className="username">{data.mediaName}</span>
                                                    <i className={
                                                        data.gender == 0 || data.gender == 3 ?
                                                            "ico_gender"
                                                            :
                                                            data.gender == 1 ?
                                                                "ico_gender male"
                                                                :
                                                                data.gender == 2 ?
                                                                    "ico_gender female"
                                                                    :
                                                                    null
                                                    }/>
                                                </div>
                                                <div className="desc">ID：{data.mediaId} <span style={{'paddingLeft':'10px'}}>{data.location}</span></div>
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
                                                    className="data">{pubFun.toFixedNumOne(data.maxLookNum)}</span>
                                            </div>

                                        </div>
                                        <div className="info w3">
                                            <div className="data">
                                                <span
                                                    className="data">{pubFun.toFixedNumOne(data.lookNum)}</span>
                                            </div>

                                        </div>
                                        <div className="info w10">
                                            <span
                                                className="data">查看详情</span>
                                        </div>
                                        {/*<div className="info">
                                            <div className="desc">
                                                <span>ID:{data.mediaId}</span>
                                                <span style={{'paddingLeft':'30px'}}>粉丝数:{pubFun.toFixedNumOne(data.fansNum)}</span>
                                                /!*<span>
                                                    {cs({
                                                        '男': data.gender == 1,
                                                        '女': data.gender == 2,
                                                        '未知': data.gender == 0 || data.gender == 3
                                                    })}
                                                </span>&nbsp;*!/
                                                /!*<span>{data.age}</span>&nbsp;*!/
                                                <span style={{'paddingLeft':'30px'}}>{data.location}</span>
                                            </div>
                                            <div className="data">
                                                <span className="data">最高在线数：{pubFun.toFixedNumOne(data.maxLookNum)}</span>
                                                <span className="data pl">平均在线数：{pubFun.toFixedNumOne(data.lookNum)}</span>
                                            </div>
                                        </div>*/}
                                        {/*<div className="price w6">
                                            <span className="num" dangerouslySetInnerHTML={{__html:pubFun.toFixedNumPriceOne(data.minXianShangPrice / 100,1)}}/>
                                        </div>
                                        <div className="price w7">
                                            <span className="num" dangerouslySetInnerHTML={{__html:pubFun.toFixedNumPriceOne(data.minXianXiaPrice / 100,1)}}/>
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