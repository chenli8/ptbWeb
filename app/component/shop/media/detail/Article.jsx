/**
 * Created by Kirk liu on 2017/8/7.
 */
import React from 'react';
import moment from 'moment-kirk';

import serviceApi from "../../../../public/js/serviceApi";
import pubFun from "../../../../public/js/pubFun";
import utils from "../../../../public/js/utils";
import Page from "../../../common/Page.jsx";
import layer from "../../../../public/js/layer";

class Item extends React.Component {
    showImg() {
        return {
            __html: utils.showImg(this.props.data.coverPlan, '70px', '70px', Math.random())
        }
    }

    render() {
        let data = this.props.data;
        let type = this.props.type;
        return (
            <li>
                <a href={data.url} target="_blank">
                    {
                        type == 1 ?
                            <span>
                                <div dangerouslySetInnerHTML={this.showImg()}/>
                                <div>{data.title}</div>
                                <div>{moment(data.pubTime, "x").format('YYYY/MM/DD HH:mm')}</div>
                                <div>{pubFun.toFixedNumW(data.readNum)}</div>
                                <div>{pubFun.toFixedNumW(data.zanNum)}</div>
                                <i className="ico_isOriginalText"/>
                            </span>
                            :
                            type == 2 ?
                                <span className="list_tr_wb">
                                <div dangerouslySetInnerHTML={this.showImg()}/>
                                <div>{data.title}</div>
                                <div>{moment(data.pubTime, "x").format('YYYY/MM/DD HH:mm')}</div>
                                <div dangerouslySetInnerHTML={{__html: pubFun.toFixedNumInfo(data.spreadNum)}}/>
                                <div dangerouslySetInnerHTML={{__html: pubFun.toFixedNumInfo(data.commentNum)}}/>
                                <div dangerouslySetInnerHTML={{__html: pubFun.toFixedNumInfo(data.zanNum)}}/>
                            </span>
                                :
                                type == 3 ?
                                    <span className="list_tr_yk">
                                <div dangerouslySetInnerHTML={this.showImg()}/>
                                <div>{data.title}</div>
                                <div>{moment(data.pubTime, "x").format('YYYY/MM/DD HH:mm')}</div>
                                <div dangerouslySetInnerHTML={{__html: pubFun.toFixedNumInfo(data.lookNum)}}/>
                            </span>
                                    :
                                    type == 4 ?
                                        <span className="list_tr_wb list_tr_yzb">
                                <div dangerouslySetInnerHTML={this.showImg()}/>
                                <div>{data.title}</div>
                                <div>{moment(data.pubTime, "x").format('YYYY/MM/DD HH:mm')}</div>
                                <div dangerouslySetInnerHTML={{__html: pubFun.toFixedNumInfo(data.lookNum)}}/>
                                <div dangerouslySetInnerHTML={{__html: pubFun.toFixedNumInfo(data.commentNum)}}/>
                                <div dangerouslySetInnerHTML={{__html: pubFun.toFixedNumInfo(data.zanNum)}}/>
                            </span>
                                        :
                                        type == 6 ?
                                            <span>
                                <div dangerouslySetInnerHTML={this.showImg()}/>
                                <div>{data.title}</div>
                                <div>{moment(data.pubTime, "x").format('YYYY/MM/DD HH:mm')}</div>
                                <div dangerouslySetInnerHTML={{__html: pubFun.toFixedNumInfo(data.lookNum)}}/>
                                <div dangerouslySetInnerHTML={{__html: pubFun.toFixedNumInfo(data.zanNum)}}/>
                            </span>
                                            :
                                            null
                    }
                </a>
            </li>
        )
    }
}
class ItemMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalNum: this.props.totalNum,
            pageSize: this.props.pageSize
        };
    }

    render() {
        let THIS = this;
        let item = this.props.data.map(function (data, index) {
            return <Item data={data} key={index} _index={index} type={THIS.props.type} start={THIS.props.start}/>
        });
        return (
            <div>
                {item}
            </div>
        )
    }
}

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            data: [],
            type: this.props.type,
            totalNum: 0,
            pageSize: 10,
            isLoading: false,
            start: 0
        };
    }

    getMediaArticleList(start) {
        let end = start + this.state.pageSize;
        let pMid = this.props.pMid;
        let type = this.props.type;
        this.setState({start: start});
        let data = {
            pMid: pMid,
            type: type,
            atype: 'recent',
            start: start,
            end: end
        };
        if (end >= 10) {
            this.setState({isLoading: true});
        }
        layer.loading.open();
        serviceApi('aMediaArticleList', data, (data) => {
            layer.loading.close();
            this.setState({isLoad: true, data: data.list, totalNum: 0, isLoading: false}, () => {
                this.setState({totalNum: data.totalNum});
            })
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message);
        });
    }

    componentDidMount() {
        this.getMediaArticleList(0, this.state.pageSize);//默认10条
    }

    render() {
        let type = this.props.type;
        let state = this.state;
        return (
            <div className="article fl">
                <div className="list fl">
                    <ul className="th fl">
                        {
                            type == 1 ?
                                <li className="list_th_wx">
                                    <div>文章标题</div>
                                    <div>发布日期{/*<i className="triangleBlackDownSort"></i>*/}</div>
                                    <div>阅读数{/*<i className="triangleGrayDownSort"></i>*/}</div>
                                    <div>点赞数{/*<i className="triangleGrayDownSort"></i>*/}</div>
                                </li>
                                :
                                type == 2 ?
                                    <li className="list_th_wb">
                                        <div>文章标题</div>
                                        <div>发布日期{/*<i className="triangleBlackDownSort"></i>*/}</div>
                                        <div>转发数{/*<i className="triangleGrayDownSort"></i>*/}</div>
                                        <div>评论数{/*<i className="triangleGrayDownSort"></i>*/}</div>
                                        <div>点赞数{/*<i className="triangleGrayDownSort"></i>*/}</div>
                                    </li>
                                    :
                                    type == 3 ?
                                        <li className="list_th_yk">
                                            <div>文章标题</div>
                                            <div>发布日期{/*<i className="triangleBlackDownSort"></i>*/}</div>
                                            <div>观看数{/*<i className="triangleGrayDownSort"></i>*/}</div>
                                        </li>
                                        :
                                        type == 4 ?
                                            <li className="list_th_wb">
                                                <div>文章标题</div>
                                                <div>发布日期{/*<i className="triangleBlackDownSort"></i>*/}</div>
                                                <div>观看数{/*<i className="triangleGrayDownSort"></i>*/}</div>
                                                <div>评论数{/*<i className="triangleGrayDownSort"></i>*/}</div>
                                                <div>点赞数{/*<i className="triangleGrayDownSort"></i>*/}</div>
                                            </li>
                                            :
                                            type == 6 ?
                                                <li className="list_th_wx">
                                                    <div>文章标题</div>
                                                    <div>发布日期{/*<i className="triangleBlackDownSort"></i>*/}</div>
                                                    <div>观看数{/*<i className="triangleGrayDownSort"></i>*/}</div>
                                                    <div>点赞数{/*<i className="triangleGrayDownSort"></i>*/}</div>
                                                </li>
                                                :
                                                null
                        }
                    </ul>
                    <ul className="tr fl">
                        {
                            state.isLoad ?
                                state.data.length
                                    ?
                                    <span>
                                        <ItemMain data={state.data}
                                                  getMediaArticlelist={this.getMediaArticleList}
                                                  totalNum={state.totalNum} pageSize={state.pageSize} type={type}
                                                  start={state.start}/>
                                    </span>
                                    :
                                    <div className="noData fl">
                                        {this.props.pubArticle == -1 ? '正在获取数据，请在24小时后查看' : '媒体近7日未发文'}
                                    </div>
                                :
                                null
                        }
                    </ul>
                    {
                        state.totalNum > state.pageSize ?
                            <Page totalNum={state.totalNum} pageSize={state.pageSize} start={state.start}
                                  onPageClick={this.getMediaArticleList.bind(this)}/>
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}
export default Article;