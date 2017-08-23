import React from 'react'

import SearchBtn from "../../common/SearchBtn";
import SalerAuthInfo from "./SalerAuthInfo";
import ShopInfo from "./ShopInfo";
import ServiceInfo from "./ServiceInfo";

import layer from '../../../public/js/layer';
import serviceApi from '../../../public/js/serviceApi';
import utils from '../../../public/js/utils'

import '../../../public/css/serviceDetail.css'
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0
        };
    }

    componentWillMount() {
        this.serviceId = utils.urlParam('serviceId', window.location.href);
        this.shopId = utils.urlParam('shopId', window.location.href);
    }

    componentDidMount() {
        this.getServiceDetail();
    }

    getServiceDetail() {
        layer.loading.open();
        this.postApi = serviceApi('aServiceDetail', {
            'serviceId': this.serviceId
        }, (data) => {
            layer.loading.close();
            this.setState({
                serviceInfo: data.serviceInfo,
                shopInfo:data.shopInfo,
                isLoaded: true
            });

        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    clickType(index) {
        if (index === this.state.tabIndex)
            return
        this.setState({
            tabIndex: index
        })
    }

    render() {
        var state = this.state;
        return (
            <div className="serviceDetail">
                <SearchBtn/>

                {this.state.serviceInfo ?
                    <div>
                        <ShopInfo shopId={ this.shopId}/>
                        <div className="tab_container">
                            <span to="/ServiceInfo" className={this.state.tabIndex ? 'tab' : 'tab_s'}
                                  onClick={(index) => this.clickType(0)}>买服务</span>
                            <span to="/SalerAuthInfo" className={this.state.tabIndex ? 'tab_s' : 'tab'}
                                  onClick={(index) => this.clickType(1)}>资质认证</span>
                        </div>
                        <div className="tabContentContainer">
                            {this.state.tabIndex ?
                                <SalerAuthInfo shopId={this.shopId}/>
                                :
                                <ServiceInfo serviceInfo={state.serviceInfo} shopInfo={state.shopInfo}/>
                            }
                        </div>

                    </div>
                    :
                    null
                }
            </div>
        );
    }

    componentWillUnmount() {
        this.postApi.abort();
        /*组件卸载 停止ajax请求*/
    }
}
export default Main;