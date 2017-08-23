import React from 'react';
import {HashRouter as Router, Route, Redirect} from 'react-router-dom'

import '../../../public/css/createShop.css';

import layer from '../../../public/js/layer';
import serviceApi from '../../../public/js/serviceApi';

import TimeStep from "../../shop/common/TimeStep";
import ShopIndex from './shop/Index';
import RealNameIndex from "./realName/Index";
import CompanyIndex from "./company/Index";

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timeStepList: [
                {title: "店铺入驻", subTitle: "", status: 1},
                {title: "实名认证", subTitle: "", status: 0},
                {title: "企业认证", subTitle: "", status: 0},
                {title: "提交资料，等待审核", subTitle: "", status: 0}
            ]
        };
    }

    componentDidMount() {
        this.serviceGetData();
    }

    serviceGetData() {
        layer.loading.open();
        this.postApi = serviceApi('aShopProgressquery', {},
            (data) => {
                layer.loading.close();
                let dataObj = JSON.parse(data.status);
                this.formatData(dataObj);
            }, (data) => {
                layer.loading.close();
                layer.msg(data.message)
            });
    }

    formatData(dataObj) {
        let dataList = this.state.timeStepList;
        /*店铺认证状态*/
        let shopStatus = dataObj.shopBasicInfo;
        /*实名认证状态*/
        let realNameStatus = dataObj.personState;
        /*企业认证状态*/
        let companyStatus = dataObj.enterpriseState;
        dataList[0].subTitle = shopStatus == 1 ? "审核中" : shopStatus == 2 ? "审核失败" : shopStatus == 3 ? "已认证" : null;
        dataList[1].subTitle = realNameStatus == 1 ? "审核中" : realNameStatus == 2 ? "审核失败" : realNameStatus == 3 ? "已认证" : null;
        dataList[2].subTitle = companyStatus == 1 ? "审核中" : companyStatus == 2 ? "审核失败" : companyStatus == 3 ? "已认证" : null;
        if (shopStatus == 3 && realNameStatus == 3 && companyStatus == 3) {
            dataList[3].subTitle = "已完成";
            dataList[3].subTitle = "审核通过,开始营业";
        }
        this.setState({timeStepList: dataList});
    }

    render() {
        return (
            <Router>
                <div className="outContainer">
                    <div className="contentContainer">
                        <div className="headerContainer">
                            <TimeStep timeData={this.state.timeStepList} id="timeStep"/>
                        </div>
                        <div>
                            <Route exact path="/"
                                   render={() => (<Redirect to="/Shop/Index"/>)}/>
                            <Route exact path="/0"
                                   render={() => (<Redirect to="/Shop/Index"/>)}/>
                            <Route exact path="/1"
                                   render={() => (<Redirect to="/RealName/Index"/>)}/>
                            <Route exact path="/2"
                                   render={() => (<Redirect to="/Company/Index"/>)}/>
                            <Route path="/Shop" component={ShopIndex}/>
                            <Route path="/RealName" component={RealNameIndex}/>
                            <Route path="/Company" component={CompanyIndex}/>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Main;
