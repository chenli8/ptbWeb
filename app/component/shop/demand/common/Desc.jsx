/**
 * Created by Kirk liu on 2017/7/25.
 */
import React from 'react';
import moment from 'moment-kirk';
import PriceFormat from '../../../common/PriceFormat';
import serviceApi from "../../../../public/js/serviceApi";
import layer from "../../../../public/js/layer";


class Desc extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            requireId: this.props.data.id,
            isCollection: this.props.data.isCollection
        };
    }

    componentDidMount() {
    }

    collection() {
        serviceApi('aCollection', {dataId: this.props.data.id, type: 3}, () => {
            this.setState({isCollection: 1});
            layer.msg('收藏成功')
        }, (data) => {
            layer.msg(data.message)
        })
    }

    collectionDel() {
        serviceApi('aDelCollection', {dataId: this.props.data.id, type: 3}, () => {
            this.setState({isCollection: 0});
            layer.msg('取消成功')
        }, (data) => {
            layer.msg(data.message)
        })
    }

    render() {
        let data = this.props.data;
        let timeOver = ((data.dueTime - data.systemDate) / 1000 / 60 / 60).toFixed(1);
        if (timeOver >= 24) {
            timeOver = (timeOver / 24).toFixed(0) + '天'
        } else {
            timeOver = timeOver + '小时'
        }
        return (
            <div className="main">
                <div className="top">
                    <div className="title">
                        {data.requireName}
                        <b>
                            {
                                data.budgetType == 1 ?
                                    "" :
                                    data.budgetType == 2 ?
                                        '预算区间:' :
                                        data.budgetType == 3 ?
                                            '预算价格:' :
                                            null
                            }
                            <PriceFormat data={{
                                type: data.budgetType,
                                min: data.budgetMinPrice,
                                max: data.budgetMaxPrice,
                                position: 'detail'
                            }}/>
                        </b>
                    </div>
                    <div className="num">
                        <ul>
                            <li>
                                <b>{data.answerNum}</b>名服务商应答需求 / 剩余<b>{data.maxAnswerNum - data.answerNum}</b>次机会
                            </li>
                            <li></li>
                            {
                                data.status == 2 && data.dueTime ?
                                    <li>
                                        距离结束还剩 <b>{timeOver}</b>
                                    </li>
                                    :
                                    null
                            }

                        </ul>
                    </div>
                    <div className="requireCollect fr">
                        {
                            this.state.isCollection == 0 ?
                                <a href="javascript:;" className="addLink fl" onClick={this.collection.bind(this)}> <i
                                    className="ico-collects"/>添加收藏</a>
                                :
                                <a href="javascript:;" className="addLink fl" onClick={this.collectionDel.bind(this)}><i
                                    className="ico-onCollects"/>取消收藏</a>
                        }
                    </div>
                </div>
                <div className="btm">
                    <div className="btmNum">
                        <div style={{fontSize: 16}}>需求号：</div>
                        <b>{data.requireNo}</b>
                    </div>
                    <div className="btmdesc">
                        <div style={{fontSize: 16}}>需求描述:</div>
                        <div className="desc">
                            {data.requireDesc}
                            <div className="descSub">
                                <span>发布时间：{moment(data.addTime, "x").format('YYYY-MM-DD HH:mm')}</span>
                                <span>发布人：{data.userName}</span>
                                <span>地点：{data.region.provincesName || '不限'} {data.region.cityName == data.region.provincesName ? data.region.countyName : data.region.cityName } </span>
                            </div>
                            {
                                data.annexList && data.annexList.length > 0 ?
                                    <div className="attach" style={{'float': 'left'}}>
                                        <p>附件</p>
                                        <ul>
                                            {
                                                data.annexList.map((data) => {
                                                    return (
                                                        <li key={data.id}>
                                                            {data.annexName}
                                                            <a href={data.annexUrl} target="_bank">下载</a>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    :
                                    null
                            }
                            {
                                data.additionalRequireList && data.additionalRequireList.length > 0 ?
                                    <div className="update">
                                        {
                                            data.additionalRequireList.map((data) => {
                                                return (
                                                    <div key={data.id}>
                                                        <div className="text fl">更新时间
                                                            : {moment(data.updateTime, "x").format('YYYY-MM-DD HH:mm')}</div>
                                                        <div className="updateDesc fl">补充说明：{data.requireDesc}</div>
                                                        {
                                                            data.annexList && data.annexList.length > 0 ?
                                                                <div className="updateFile fl">
                                                                    <p>附件</p>
                                                                    {
                                                                        data.annexList.map((annexListData) => {
                                                                            return (
                                                                                <li key={annexListData.id}>
                                                                                    {annexListData.annexName} <a
                                                                                    href={annexListData.annexUrl}
                                                                                    target="_bank">下载</a>
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                    <li>

                                                                    </li>
                                                                </div>
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Desc;