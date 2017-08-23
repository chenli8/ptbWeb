/**
 * Created by Kirk liu on 2017/7/30.
 */
import React from 'react';
import store from '../searchListState/store'
import {
    actionServiceAjaxListData,
    actionServiceAjaxSearchData,
    actionSupplierAjaxListData,
    actionSupplierAjaxSearchData,
    actionDemandAjaxListData,
    actionDemandAjaxSearchData
} from '../searchListState/action'

import serviceApi from '../../../../public/js/serviceApi';
import layer from '../../../../public/js/layer';

class Region extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            provinceListCommon: [],
            provinceList: [],
            provincesName: '',
            provincesId: '',
            provincesShow: false,
            cityList: [],
            cityName: '',
            cityId: '',
            cityShow: false,
            countyList: [],
            countyName: '',
            countyId: '',
            countyShow: false,
            regionName: '',
            regionShow: false
        };
    }

    regionList(obj) {
        serviceApi('aRegionList', obj, (data) => {
            if (obj.regionType == 0) {
                this.setState({provinceList: data.regionList})
            } else if (obj.regionType == 1) {
                this.setState({cityList: data.regionList})
            } else if (obj.regionType == 2) {
                this.setState({countyList: data.regionList})
            }
        }, (data) => {
            layer.msg(data.message)
        })
    }

    regionListCommon() {
        let url = window.location.href;
        let api = '';
        if(url.indexOf('demand.html') != -1){
            api = 'REQUIRE_REC_REGIONS'
        }
        if(url.indexOf('/ShopService') != -1){
            api = 'SERVICE_REC_REGIONS'
        }
        if(url.indexOf('#/ShopSupplier') != -1){
            api = 'SHOP_REC_REGIONS'
        }
        serviceApi('aCommonBlock', {code:api}, (data) => {
            this.setState({provinceListCommon: JSON.parse(data)})
        }, (data) => {
            layer.msg(data.message)
        })
    }

    regionClick() {
        let state = this.state;
        let storeState = this.props.storeState;
        /*判断模型*/
        let modelType = storeState.modelType;
        if (modelType == 1) {
            let keywords = storeState.key;
            store.dispatch({
                type: 'SERVICE_REGION',
                regionId: state.cityId || state.provincesId,
                regionType: state.cityId ? 2 : 1
            });
            if (keywords) {
                store.dispatch(actionServiceAjaxSearchData());
            } else {
                store.dispatch(actionServiceAjaxListData());
            }
        }
        if (modelType == 2) {
            let keywords = storeState.key;
            store.dispatch({type: 'SUPPLIER_REGION', provinces: state.provincesId, city: state.cityId});
            if (keywords) {
                store.dispatch(actionSupplierAjaxSearchData());
            } else {
                store.dispatch(actionSupplierAjaxListData());
            }
        }
        if (modelType == 3) {
            let keywords = storeState.key;
            store.dispatch({
                type: 'DEMAND_REGION',
                regionId: state.cityId || state.provincesId,
                regionLevel: state.cityId ? 2 : 1
            });
            if (keywords) {
                store.dispatch(actionDemandAjaxSearchData());
            } else {
                store.dispatch(actionDemandAjaxListData());
            }
        }
    }

    componentDidMount() {
        this.regionList({
            regionId: '',
            regionType: 0
        });
        this.regionListCommon();
    }

    render() {
        let state = this.state;
        return (
            <div className="region"
                 onMouseEnter={() => {
                     this.setState({regionShow: true});
                 }}
                 onMouseLeave={() => {
                     this.setState({regionShow: false, provincesShow: false, cityShow: false});
                 }}
            >
                <div className={state.regionShow ? "default on" : "default"}>
                    <span className="text fl">{state.regionName || '所在地' }</span>
                    <i className={"ico-arrow-down on fl " + (state.regionShow ? "rotate-anti-clockwise-180" : "rotate-clockwise-180" )}/>
                </div>
                {
                    state.regionShow ?
                        <div className="pull_Mask">
                            <div className="pull">
                                <div className="default fl">
                                    <ul>
                                        <li onClick={
                                            () => {
                                                this.setState({
                                                    regionName: '不限',
                                                    provincesName: '',
                                                    provincesId: '',
                                                    cityId: '',
                                                    cityName: '',
                                                    cityList: []
                                                }, () => {
                                                    this.setState({regionShow: false});
                                                    this.regionClick();
                                                });

                                            }
                                        }>不限
                                        </li>
                                        {
                                            state.provinceListCommon && state.provinceListCommon.length > 0 ?
                                                state.provinceListCommon.map((data, index) => {
                                                    return (
                                                        <li key={data.regionId}
                                                            onClick={
                                                                () => {
                                                                    this.setState({
                                                                        regionName: data.regionName,
                                                                        provincesName: '',
                                                                        provincesId: data.level == 1 ? data.regionId : '',
                                                                        cityId:data.level == 2 ? data.regionId : '',
                                                                        cityName: '',
                                                                        cityList: []
                                                                    }, () => {
                                                                        this.setState({regionShow: false});
                                                                        this.regionClick();
                                                                        //this.regionClick(data.regionId, 1);
                                                                    });

                                                                }
                                                            }
                                                        >{data.regionName}</li>
                                                    )
                                                })
                                                :
                                                null
                                        }
                                    </ul>
                                </div>
                                <div className="select fl">
                                    <div className="option fl">
                                        <div className="default fl" onClick={() => {
                                            this.setState({provincesShow: !this.state.provincesShow});
                                        }}>
                                            <span className="text fl">{this.state.provincesName || '省'}</span>
                                            <i className="ico-arrow-down on fl"/>
                                        </div>
                                        {
                                            state.provinceList.length > 0 ?
                                                <div className="pull"
                                                     style={{display: this.state.provincesShow ? 'block' : 'none'}}>
                                                    <ul>
                                                        {
                                                            state.provinceList.map((data) => {
                                                                return (
                                                                    <li key={data.regionId}
                                                                        onClick={
                                                                            () => {
                                                                                this.setState({
                                                                                    regionName: data.regionName,
                                                                                    provincesName: data.regionName,
                                                                                    provincesId: data.regionId,
                                                                                    provincesShow: !this.state.provincesShow,
                                                                                    cityList: [],
                                                                                    cityName: '',
                                                                                    cityId: '',
                                                                                    cityShow: false,
                                                                                    countyList: [],
                                                                                    countyName: '',
                                                                                    countyId: '',
                                                                                    countyShow: false
                                                                                }, () => {
                                                                                    this.regionList({
                                                                                        regionId: data.regionId,
                                                                                        regionType: 1
                                                                                    })
                                                                                });

                                                                            }
                                                                        }
                                                                    >{data.regionName}</li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                                :
                                                null
                                        }

                                    </div>
                                    <div className="option fl" onClick={() => {
                                        this.setState({cityShow: !this.state.cityShow});
                                    }}>
                                        <div className="default fl">
                                            <span className="text fl">{this.state.cityName || '市'}</span>
                                            <i className="ico-arrow-down on fl"/>
                                        </div>
                                        {
                                            state.cityList.length > 0 ?
                                                <div className="pull"
                                                     style={{display: this.state.cityShow ? 'block' : 'none'}}>
                                                    <ul>
                                                        {
                                                            state.cityList.map((data) => {
                                                                return (
                                                                    <li key={data.regionId}
                                                                        onClick={
                                                                            () => {
                                                                                this.setState({
                                                                                    regionName: data.regionName,
                                                                                    cityName: data.regionName,
                                                                                    cityId: data.regionId,
                                                                                    cityShow: !this.state.cityShow,
                                                                                    countyList: [],
                                                                                    countyName: '',
                                                                                    countyId: '',
                                                                                    countyShow: false
                                                                                }, () => {
                                                                                    this.setState({regionShow: false});
                                                                                    this.regionClick();
                                                                                });

                                                                            }
                                                                        }
                                                                    >{data.regionName}</li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                }

            </div>
        );
    }
}
export default Region;