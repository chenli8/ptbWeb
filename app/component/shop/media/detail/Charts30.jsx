/**
 * Created by Kirk liu on 2017/8/7.
 */
import React from 'react';
import $ from 'jquery';
import charts from '../../../../public/plugin/chart';
import pubFun from '../../../../public/js/pubFun';

const NoneChart = (props) => (
    <div className="bc-noData">
        {props.pubArticle30 == -1 ? '正在获取数据，请在24小时后查看' : '媒体近30日未发文'}
    </div>
);

class Charts30 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pubArticle: this.props.data.statistics.pubArticle30,
            barData: this.props.type == 1 ? this.props.data.hlRead30 : this.props.data.spread30,
            currIndex: 0,
            text: this.props.type == 1 ? '阅读' : '转发'
        };
    }

    handleClick(type) {
        let THIS = this, data = THIS.props.data;
        $('#readType').on('click', 'li', function () {
            let index = $(this).index();
            if (type == 1) {
                switch (index) {
                    case 0:
                        THIS.setState({currIndex: 0, barData: data.hlRead30});
                        break;
                    case 1:
                        THIS.setState({currIndex: 1, barData: data.sdRead30});
                        break;
                    case 2:
                        THIS.setState({currIndex: 2, barData: data.tdRead30});
                        break;
                }
            }
            if (type == 2) {
                switch (index) {
                    case 0:
                        THIS.setState({currIndex: 0, barData: data.spread30, text: "转发"});
                        break;
                    case 1:
                        THIS.setState({currIndex: 1, barData: data.comment30, text: "评论"});
                        break;
                    case 2:
                        THIS.setState({currIndex: 2, barData: data.zan30, text: "点赞"});
                        break;
                }
            }
        });
    }

    getData(chartData) {
        let para = {
            types: [],
            seriesData: []
        };
        if (chartData.length > 0) {
            chartData.map((data) => {
                para.types.push(data.time);
                para.seriesData.push(parseInt(data.num));
            });
        }
        return para;
    }

    componentDidMount() {
        this.handleClick(this.props.type);
    }

    render() {
        let state = this.state;
        let type = this.props.type;
        let name = state.text;
        let data = this.props.mbInfo;
        if (state.pubArticle > 0) {
            setTimeout(function () {
                let dataArr = this.state.barData;
                dataArr.sort(function (a, b) {
                    return a.time > b.time ? 1 : -1;
                });
                let data = this.getData(dataArr);
                charts.mediaDetailLine("barChart", name, data.types, data.seriesData, this.props.type,0);
            }.bind(this), 50);
        }
        let statistics = this.props.statistics;
        return (
            <div>
                <div className="topBasicInfo topBasicInfo_wx">
                    <div className="topBasicInfo_left">
                        <div className="left_bottom basicNum fl">
                            {
                                type == 1
                                    ?
                                    <ul>
                                        <li><b dangerouslySetInnerHTML={{__html:pubFun.toFixedNumInfo(statistics.pubArticle30)}}/><em>发布次数</em></li>
                                        <li><b dangerouslySetInnerHTML={{__html:pubFun.toFixedNumInfo(statistics.swjrArticle30)}}/><em>10万+阅读</em></li>
                                        <li><b dangerouslySetInnerHTML={{__html:pubFun.toFixedNumInfo(statistics.hlavGread30,'万+')}}/><em>头条均阅读</em></li>
                                        <li><b dangerouslySetInnerHTML={{__html:pubFun.toFixedNumInfo(statistics.hlavgZan30,'万+')}}/><em>头条均点赞</em></li>
                                        <li><b dangerouslySetInnerHTML={{__html:pubFun.toFixedNumInfo(statistics.totalZan30,'万+')}}/><em>总点赞</em></li>
                                    </ul>
                                    :
                                    <ul className="wb basicNum_wb">
                                        <li><b dangerouslySetInnerHTML={{__html:pubFun.toFixedNumInfo(statistics.originalNum30)}}/><em>原创微博</em></li>
                                        <li><b dangerouslySetInnerHTML={{__html:pubFun.toFixedNumInfo(statistics.avgSpread30)}}/><em>篇均转发</em></li>
                                        <li><b dangerouslySetInnerHTML={{__html:pubFun.toFixedNumInfo(statistics.avgComment30)}}/><em>篇均评论</em></li>
                                        <li><b dangerouslySetInnerHTML={{__html:pubFun.toFixedNumInfo(statistics.avgZan30)}}/><em>篇均点赞</em></li>
                                    </ul>
                            }
                        </div>
                    </div>
                    <div className="topBasicInfo_right">
                        <div className="tongji fl ">
                            <div className="head">
                                <div className="num fl">
                                    {type == 1 ?
                                        <ul id="readType">
                                            <li className={this.state.currIndex == 0 ? "on" : ""}>头条阅读数</li>
                                            <li className={this.state.currIndex == 1 ? "on" : ""}>二条阅读数</li>
                                            <li className={this.state.currIndex == 2 ? "on" : ""}>三条阅读数</li>
                                        </ul>
                                        :
                                        <ul id="readType">
                                            <li className={this.state.currIndex == 0 ? "on" : ""}>日总转发</li>
                                            <li className={this.state.currIndex == 1 ? "on" : ""}>日总评论</li>
                                            <li className={this.state.currIndex == 2 ? "on" : ""}>日总点赞</li>
                                        </ul>
                                    }
                                </div>
                            </div>
                            {(state.pubArticle == -1 || state.pubArticle == 0) ?
                                <NoneChart pubArticle={state.pubArticle}/> :
                                <div className="bar-graph fl" id="barChart" style={{width:'600px',height:'165px'}}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Charts30;