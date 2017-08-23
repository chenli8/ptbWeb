/**
 * Created by Kirk liu on 2017/7/19.
 */
import React from 'react';
import cookie from 'react-cookie';
import serviceApi from '../../public/js/serviceApi';
import urlManager from '../../public/js/urlManager';
import layer from '../../public/js/layer';
import utils from '../../public/js/utils';
import PriceFormat from '../common/PriceFormat';

const DemandItem = (props) => {
    let demand = props.demand;
    let systemDate = props.systemDate;
    return (
        <div className="ConItem">
            <div className="fl ConItemLeft">
                <div className="Secondary">{demand.userName} 在 {utils.timeBefore(systemDate, demand.updateTime)} 发布需求：
                </div>
                <div className="Headlines"><a
                    href={urlManager.pDemandDetail + '#/' + demand.id}>{demand.requireName}</a>
                </div>
            </div>
            <div className="fr ConItemRight">
                <div className="budget">
                    预算
                    <PriceFormat data={{
                        type:demand.budgetType,
                        min:demand.budgetMinPrice,
                        max:demand.budgetMaxPrice,
                        position:'list'
                    }}/>
                </div>
            </div>
        </div>
    )
};
const ShopItem = (props) => {
    let shop = props.shop;
    let systemDate = props.systemDate;
    return (
        <div className="ConItem">
            <div className="fl ConItemLeft">
                <div className="Secondary">{shop.userName} 在 {utils.timeBefore(systemDate, shop.updateTime)} 新开店铺：</div>
                <div className="Headlines"><a href={urlManager.pShopDetail + '?shopId=' + shop.id}>{shop.shopName}</a></div>
            </div>
            <div className="fr ConItemRight">
                {shop.shopServiceIdNameList.map((item,index) => {
                    if(index<1){
                        return (
                            <a className="serverBtn" href={urlManager.pService + '#/ShopService/?c1='+ item.serviceTypeId +'&l1=1'}
                               key={index}>{item.serviceName}</a>
                        )
                    }
                })}

            </div>
        </div>
    )
};
class NewFeature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            demandList: [],
            shopList: [],
            systemDate: ''
        };
    }

    componentDidMount() {
        this.getDemandRecent();
        this.getShopRecent();
    }

    getDemandRecent() {
        this.postApi = serviceApi('aDemandRecent', {
            start: 0, end: 3
        }, (data, systemDate) => {
            this.setState({
                demandList: data.requireList,
                systemDate: systemDate
            })

        }, (data) => {
        });
    }

    getShopRecent() {
        this.postApi = serviceApi('aShopRecent', {
            start: 0, end: 3
        }, (data) => {
            this.setState({
                shopList: data.shopInfoVOList
            })
        }, (data) => {
        });
    }

    componentWillUnmount() {
        this.postApi.abort();
        /*组件卸载 停止ajax请求*/
    }

    render() {
        let demandList = this.state.demandList;
        let shopList = this.state.shopList;
        return (
            <div className="newFeature">
                <div className="newLeft fl">
                    <div className="newTitle">
                        <i className="fl ico-demand"/>
                        新发布的需求
                    </div>
                    <div className="newCon">
                        {
                            demandList.length > 0 ?
                                demandList.map((item) => {
                                    return (
                                        <DemandItem demand={item} key={item.id} systemDate={this.state.systemDate}/>)
                                })
                                :
                                null
                        }
                    </div>
                    <div className="btnCon">
                        <b>海量专业服务商为您服务</b>
                        <a href={urlManager.pDemandCreate} className="Demand">立即发需求</a>
                    </div>
                </div>
                <div className="newRight fr">
                    <div className="newTitle">
                        <i className="fl ico-supply"/>
                        新开店的服务商
                    </div>
                    <div className="newCon">
                        {
                            shopList.length > 0 ?
                                shopList.map((item) => {
                                    return (<ShopItem shop={item} key={item.id} systemDate={this.state.systemDate}/>)
                                })
                                :
                                null
                        }
                        <div className="btnCon">
                            <b>海量订单等您来接</b>
                            <a href="javascript:;" onClick={()=>{
                                if(cookie.load('shopId') > 0){
                                    layer.msg('已开通店铺');
                                }else{
                                    window.location.href = urlManager.pCreateShop;
                                }
                            }}
                               className="Settled">立即入驻</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default NewFeature;