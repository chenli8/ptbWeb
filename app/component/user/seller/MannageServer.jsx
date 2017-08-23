/**
 * Created by Kirk liu on 2017/7/22.
 */
import React from 'react';
import cookie from 'react-cookie';
import '../../../public/css/mannageServer.css';
import layer from '../../../public/js/layer';
import utils from '../../../public/js/utils';
import serviceApi from '../../../public/js/serviceApi';
import urlManager from "../../../public/js/urlManager";
import Page from "../../common/Page";
import PriceFormat from "../../common/PriceFormat";
class Item extends React.Component {
    render() {
        let serviceList = this.props.serviceList;
        return (
            <div>
                {
                    serviceList.map((data, index) => {
                        let className = 'serverItem fl';
                        if ((index + 1) % 3 === 0) {
                            className = "serverItem mrNone fl"
                        }
                        return (
                            <div className={className} key={index}>
                                <div className="serImg">
                                    <a href={urlManager.pServiceDetail + '?serviceId=' + data.serviceId + '&shopId=' + this.props.shopId}>
                                        <i style={{backgroundImage: "url(" + data.img + ")"}}> </i>
                                        {
                                            data.status == 1 ? <span className="status">已上架</span> :
                                                <span className="status no">已下架</span>
                                        }
                                    </a>
                                </div>
                                <div className="info">
                                    <a href={urlManager.pServiceDetail + '?serviceId=17&shopId=26'}>
                                        <p className="head">{data.serviceName}</p>
                                    </a>
                                    <div className="deal">
                                        <span>好评率:<b>{utils.getGoodNum(data.positiveNum, data.neutralNum, data.negativeNum)}</b></span>
                                        <span>成交量:<b>
                                                 {data.dealNum}
                                                 </b></span>
                                    </div>
                                    <div className="price fl">
                                        <PriceFormat data={{
                                            type:data.prepayType,
                                            min:data.minPrice,
                                            max:data.maxPrice,
                                            position:'list'
                                        }}/>

                                    </div>
                                    <a href="javascript:;" className="ContBtn theme-button-bg fr" onClick={() => {
                                        window.location.href = urlManager.pServiceCreate + '#/' + data.serviceId
                                    }}>修改服务</a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
class MannageServer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shopStatus:0,
            totalNum: 0,
            start: 0,
            pageSize: 9,
            isLoad:false,
            serviceList: [],
            keywords: '',
            shopId: cookie.load('shopId')
        };
    }

    getMyServiceList() {
        let params = {
            start: this.state.start,
            end: this.state.start + this.state.pageSize,
        }
        if (this.state.keywords) {
            params.keyWord = this.state.keywords;
        }

        layer.loading.open();
        this.postApi = serviceApi('aServiceMyServiceList', params, (data) => {
            layer.loading.close();
            this.setState({
                totalNum: data.total,
                serviceList: data.serviceList,
                isLoad:true
            });
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    componentDidMount() {
        this.getMyServiceList();
        this.getAuthStatus();
    }

    getAuthStatus(){
        this.postApi = serviceApi('aShopProgressquery', {},
            (data) => {
                layer.loading.close();
                var dataObj = eval("(" + data.status + ")");
                this.setState({
                    shopStatus:dataObj.shopBasicInfo
                })

            }, (data) => {
            });
    }

    onPageClick(start) {
        this.setState({
            start: start
        }, () => {
            this.getMyServiceList()
        })
    }

    searchSubmit() {
        this.setState({keywords:this.refs.searchInput.value},()=>{
            this.getMyServiceList();
        })
    }

    onCreateService(){
        if(this.state.shopStatus === 1 || this.state.shopStatus === 3){
            location.href = urlManager.pServiceCreate;
        } else{
            layer.msg("必须先完善店铺信息才能创建服务");
        }
    }

    render() {
        let state = this.state;
        let serviceList = state.serviceList;
        return (
            <div className="mannageServers">
                <div className="serverType">
                    <div className="tops">
                        <div className="search fl">
                            {/*<div className="searchType fl">*/}
                                {/*<div>*/}
                                    {/*服务名称<i className="ico-arrow-down"> </i>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            <input className="searchInput fl" placeholder="请输入关键字" ref="searchInput" onKeyPress={(e) => {
                                if (e.which === 13) {
                                    this.refs.searchSubmit.click()
                                }
                            }}/>
                            <a href="javascript:;" className="searchBtn theme-button-bg fl" ref="searchSubmit"
                               onClick={() => {
                                this.searchSubmit();
                            }}>查询</a>
                            <a href="javascript:;"
                               className="createBtn theme-button-bg fr" onClick={this.onCreateService.bind(this)}>创建服务</a>
                        </div>
                    </div>
                    {/* <div className="chooseType">
                     <div>全部分类 <i className="ico-arrow-down"></i></div>
                     <div className="typeCons">
                     <a href="javascript:;">投放合作</a>
                     <a href="javascript:;">内容制作</a>
                     <a href="javascript:;">策略/舆情/监测</a>
                     <a href="javascript:;">翻译/速记</a>
                     <a href="javascript:;">活动执行</a>
                     <a href="javascript:;">摄影摄像</a>
                     <a href="javascript:;">机票/旅行社</a>
                     <a href="javascript:;">演艺经纪及兼职</a>
                     <a href="javascript:;">车辆</a>
                     <a href="javascript:;">快递外卖</a>
                     <a href="javascript:;">设计</a>
                     <a href="javascript:;">IT 数字技术应用</a>
                     <a href="javascript:;">电商营销</a>
                     <a href="javascript:;">行政运营</a>
                     <a href="javascript:;">行政办公/安保/物料制作</a>
                     </div>
                     </div>*/}
                </div>
                {/*<div className="mannaCon">
                 <div className="nav">
                 <a href="javascript:;">创建时间 <i className="ico-upAdown"> </i></a>
                 <a href="javascript:;">修改时间 <i className="ico-upAdown"> </i></a>
                 <a href="javascript:;">成交量 <i className="ico-upAdown"> </i></a>
                 <a href="javascript:;">好评率 <i className="ico-upAdown"> </i></a>
                 <a href="javascript:;">价格 <i className="ico-arrow-down"> </i></a>
                 <a href="javascript:;">地区 <i className="ico-arrow-down"> </i></a>
                 <a href="javascript:;">发布状态 <i className="ico-arrow-down"> </i></a>
                 </div>
                 </div>*/}
                <div className="ItemsCon">
                    {
                        state.isLoad ?
                          serviceList?
                            <Item serviceList={serviceList} shopId={state.shopId}/>
                                :
                            <p className="noListTap">您还没有服务，立刻发布服务。</p>
                            :
                            null
                    }
                </div>
                {
                    state.totalNum > state.pageSize ?
                        <Page totalNum={state.totalNum} pageSize={state.pageSize} start={state.start}
                              onPageClick={this.onPageClick.bind(this)}/> : null
                }
            </div>
        );
    }
}
export default MannageServer;