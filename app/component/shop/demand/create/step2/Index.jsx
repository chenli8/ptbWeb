/**
 * Created by Kirk liu on 2017/7/24.
 */
import React from 'react';
import Nav from '../../common/Nav';
import TimeStep from '../../../common/TimeStep';
import Desc from '../../common/Desc';
import serviceApi from './../../../../../public/js/serviceApi';
import layer from './../../../../../public/js/layer';
import urlManager from './../../../../../public/js/urlManager';
const timeStepList = [
    {position: 0, title: "发布需求", subTitle: "", status: 1},
    {position: 1, title: "需求审核", subTitle: "", status: 1},
    {position: 2, title: "匹配服务商", subTitle: "", status: 0},
    {position: 3, title: "选择服务商,签单", subTitle: "", status: 0}
];
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            longing: false,
            data: ''
        };

        this.requireId = this.props.match.params.id;
    }

    /*获取需求详情*/
    demandDetail() {
        serviceApi('aDemandDetail', {requireId: this.requireId}, (data) => {
            /*/应答中*/
            if (data.auditStatus == 2) {
                window.location.href = urlManager.pDemandDetail + '#/' + this.requireId;
            }
            this.setState({longing: true, data: data})
        }, (data) => {
            layer.msg(data.message)
        })
    }

    demandClose() {
        serviceApi('aDemandClose', {requireId: this.requireId}, (data) => {
            layer.msg('取消成功', () => {
                window.location.hash = 'Close/' + this.requireId;
            })
        }, (data) => {
            layer.msg(data.message)
        })
    }
    demandDel() {
        serviceApi('aDemandDel', {requireId: this.requireId}, (data) => {
            layer.msg('删除成功', () => {
                window.location.href = urlManager.pBuyerCenter + '#/myDemand/BuyerDemandList';
            })
        }, (data) => {
            layer.msg(data.message)
        })
    }
    copyDemand() {
        window.location.href = urlManager.pDemandCreate + '#/step1/' + this.requireId + '/1'
    }
    componentDidMount() {
        this.demandDetail()
    }

    render() {
        let state = this.state;
        let data = state.data;
        return (
            <div>
                <Nav name={timeStepList[1].title}/>
                <div className="BuyerStep">
                    <TimeStep timeData={timeStepList}/>
                </div>
                {
                    state.longing ?
                        <div className="container">
                            <div className="Review">
                                {
                                    data.auditStatus == 0 ?
                                        <div className="head">
                                            <i className="ico-demand-wait-audit fl"/>
                                            <div className="fl">需求暂未发布，请耐心等待审核...</div>
                                            <a href={'#/Step1/' + this.requireId}
                                               className="fr theme-button-bg">修改需求</a>
                                            <a href="javascript:;" className="fr changeBtn"
                                               onClick={this.demandClose.bind(this)}>取消需求</a>
                                        </div>
                                        :
                                        data.auditStatus == 1 ?
                                            <div className="head">
                                                <i className="ico-demand-close fl"/>
                                                <div className="fl">
                                                    <span style={{color: 'red'}}>审核失败</span>
                                                    <span style={{fontSize:16,marginLeft:10}}>失败原因：{data.reason}</span>
                                                </div>
                                                <a href={'#/Step1/' + this.requireId} className="fr theme-button-bg" onClick={this.copyDemand.bind(this)}>复制需求</a>
                                                <a href="javascript:;" className="fr changeBtn"
                                                   onClick={this.demandDel.bind(this)}>删除需求</a>
                                            </div>
                                            :
                                            null
                                }

                                <Desc data={data}/>
                            </div>
                        </div>
                        : null

                }
            </div>

        );
    }
}
export default Index;