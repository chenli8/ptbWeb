import React from 'react'

import SearchBtn from "../../common/SearchBtn";
import SalerAuthInfo from "../serviceDetail/SalerAuthInfo";
import ShopInfo from "../serviceDetail/ShopInfo";
import ServiceList from "./ServiceList";

import utils from '../../../public/js/utils'

import '../../../public/css/shopDetail.css'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0
        };
    }

    componentWillMount() {
        this.shopId = utils.urlParam('shopId', window.location.href);
    }

    componentDidMount() {
    }

    clickType(index) {
        if (index === this.state.tabIndex)
            return
        this.setState({
            tabIndex: index
        })
    }

    render() {
        return (
            <div className="shopDetail">
                <SearchBtn/>
                <div>
                    <ShopInfo shopId={this.shopId}/>
                    <div className="tab_container">
                            <span className={this.state.tabIndex ? 'tab' : 'tab_s'}
                                  onClick={(index) => this.clickType(0)}>买服务</span>
                        <span className={this.state.tabIndex ? 'tab_s' : 'tab'}
                              onClick={(index) => this.clickType(1)}>资质认证</span>
                    </div>

                    <div className="tabContentContainer">
                        {this.state.tabIndex ?
                            <SalerAuthInfo shopId={this.shopId}/>
                            :
                            <ServiceList/>
                        }
                    </div>

                </div>
            </div>
        );
    }

    componentWillUnmount() {
        this.postApi.abort();
        /*组件卸载 停止ajax请求*/
    }
}

export default Main;