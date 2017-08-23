/**
 * Created by Yhyu on 2017/7/18.
 */
import React, {Component} from 'react';

import serviceApi from '../../../public/js/serviceApi';
import layer from '../../../public/js/layer';
import urlManager from './../../../public/js/urlManager'
import utils from '../../../public/js/utils'
import Page from '../../common/Page'
import PriceFormat from '../../common/PriceFormat'
class Item extends Component {

    formatComment(service) {
        var total = service.positiveNum + service.neutralNum + service.negativeNum;
        if (total > 0) {
            var result = service.positiveNum / total * 100
            return result.toFixed(2) + '%';
        }
        return '0%';
    }
    onClickService(service) {
        window.location.href = urlManager.pServiceDetail + "?serviceId=" + service.serviceId + "&shopId=" + this.props.shopId;
    }

    render() {
        var service = this.props.service;
        return (
            <li>
                <div className="pic">
                    <a href="javascript:;" onClick={() => this.onClickService(service)}><img src={service.img} alt="" className="img"/></a>
                </div>
                <div className="serviceDetail">
                    <div className="title"><a href="javascript:;" onClick={() => this.onClickService(service)}>{service.serviceName}</a></div>
                    <div className="content">好评率：{this.formatComment(service)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        成交量：{service.dealNum}</div>
                    <div className="center">
                        <PriceFormat data={{
                            type:service.prepayType,
                            min:service.minPrice,
                            max:service.maxPrice,
                            position:'list'
                        }}/>
                        <a className="btn" href="javascript:;" onClick={() => this.onClickService(service)}>立即购买</a>
                    </div>
                </div>
            </li>
        );
    }
}

class ShopService extends Component {
    constructor(props) {
        super(props)
        this.state = {
            services: [],
            pageSize: 12,
            start: 0,
            totalNum: 0,
        }
    }

    componentWillMount() {
        this.shopId = utils.urlParam('shopId', window.location.href);
    }

    componentDidMount() {
        this.getServiceList();
    }

    componentWillUnmount() {
        this.postApi.abort();
        /*组件卸载 停止ajax请求*/
    }

    getServiceList() {
        var THIS = this;
        var state = this.state;
        var data = {
            start: state.start,
            end: state.start + state.pageSize,
            shopId: this.shopId
        }
        layer.loading.open()
        this.postApi = serviceApi('aShopServiceList', data, (data) => {
            layer.loading.close()
            THIS.setState({
                totalNum:data.total,
                services: data.serviceList
            })
        }, (data) => {
            layer.loading.close()
            layer.msg(data.message)
        });
    }

    onPageClick(start) {
        this.setState({
            start: start
        }, () => {
            this.getServiceList()
        })
    }

    render() {
        let state = this.state;
        return (
            <div className="shopService clear">
                <div className="shopServices clear">
                    {
                        state.services && state.services.length>0 ?
                            state.services.map((item) => {
                                return <Item service={item} key={item.serviceId} shopId={this.shopId}/>
                            })
                            :
                            <p>空空如也</p>
                    }
                    {
                        state.totalNum > state.pageSize ?
                            <Page totalNum={state.totalNum} pageSize={state.pageSize} start={state.start}
                                  onPageClick={this.onPageClick.bind(this)}/> : null
                    }
                </div>
            </div>
        );
    }
}

export default ShopService;
