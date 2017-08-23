/**
 * Created by Kirk liu on 2017/8/7.
 */
import React from 'react';
import charts from '../../../../public/plugin/chart';
import pubFun from '../../../../public/js/pubFun';
class ChartsZhibo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCharts7And30: true,
            type: this.props.type,
            data: this.props.data,
            statistics: this.props.statistics,
            mbInfo: this.props.mbInfo
        };
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

    }

    render() {
        let state = this.state;
        let statistics = state.statistics;
        if(state.data.fansData.length > 0){
            setTimeout(function () {
                let dataArr = state.data.fansData;
                dataArr.sort(function (a, b) {
                    return a.time > b.time ? 1 : -1;
                });
                let data = this.getData(dataArr);
                charts.mediaDetailLine("barChart", name, data.types, data.seriesData,this.props.type,0);
            }.bind(this), 50);
        }
        return (
            <div className="data7And30">
                <div className="Charts7And30 fl">
                    <div>
                        <div className="topBasicInfo">
                            <div className="topBasicInfo_left">
                                <div className="basicNum zhibo fl left_bottom">
                                    <ul>
                                        <li><b dangerouslySetInnerHTML={{__html:pubFun.toFixedNumInfo(statistics.maxLookNum)}}></b><em>最高观看人数</em></li>
                                        <li><b dangerouslySetInnerHTML={{__html:pubFun.toFixedNumInfo(statistics.avgLookNum)}}></b><em>平均观看人数</em></li>
                                        <li><b dangerouslySetInnerHTML={{__html:pubFun.toFixedNumInfo(statistics.totalZan)}}></b><em>收到打赏</em></li>
                                        <li><b dangerouslySetInnerHTML={{__html:pubFun.toFixedNumInfo(statistics.totalAmount)}}></b><em>主播收入</em></li>
                                        <li><b dangerouslySetInnerHTML={{__html:pubFun.toFixedNumInfo(statistics.totalReward)}}></b><em>总点赞</em></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="topBasicInfo_right">
                                <div className="tongji fl zhibo-tongji">
                                    <div className="head">
                                        <div className="num fl">
                                            <ul id="readType">
                                                <div className="tips fl">30日粉丝变化趋势图</div>
                                            </ul>
                                        </div>
                                    </div>
                                    {state.data.fansData.length>0 ?
                                        <div className="bar-graph fl" id="barChart" style={{width:'608px',height:'165px'}}></div>
                                        :
                                        <div className="bc-noData">
                                            近30日无粉丝
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ChartsZhibo;