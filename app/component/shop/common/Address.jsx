/**
 * Created by Kirk liu on 2017/7/24.
 */
import React from 'react';
import serviceApi from '../../../public/js/serviceApi';
import layer from '../../../public/js/layer';
class Address extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            provinceList: [],
            provincesName: '',
            provincesId: this.props.provincesId || '',
            provincesShow: false,
            cityList: [],
            cityName: '',
            cityId: this.props.cityId || '',
            cityShow: false,
            countyList: [],
            countyName: '',
            countyId: this.props.countyId || '',
            countyShow: false
        };
    }

    regionList(obj) {
        serviceApi('aRegionList', obj, (data) => {
            let regionList = data.regionList;
            if (obj.regionType == 0) {
                let provincesId = this.state.provincesId;
                regionList.map((data) => {
                    if (data.regionId == provincesId) {
                        this.setState({provincesName: data.regionName})
                    }
                });
                this.setState({provinceList: regionList})
            } else if (obj.regionType == 1) {
                let cityId = this.state.cityId;
                regionList.map((data) => {
                    if (data.regionId == cityId) {
                        this.setState({cityName: data.regionName})
                    }
                });
                this.setState({cityList: regionList})
            } else if (obj.regionType == 2) {
                let countyId = this.state.countyId;
                regionList.map((data) => {
                    if (data.regionId == countyId) {
                        this.setState({countyName: data.regionName})
                    }
                });
                this.setState({countyList: regionList})
            }
        }, (data) => {
            layer.msg(data.message)
        })
    }

    componentDidMount() {
        this.regionList({
            regionId: '',
            regionType: 0
        });
        let provincesId = this.state.provincesId;
        let cityId = this.state.cityId;
        let countyId = this.state.countyId;
        if (cityId) {
            this.regionList({
                regionId: provincesId,
                regionType: 1
            });
        }
        if (countyId) {
            this.regionList({
                regionId: cityId,
                regionType: 2
            });
        }
    }

    render() {
        let state = this.state;
        let {province, city, county, unlimited} = this.props.switch;
        return (
            <div className="address">
                {
                    province ?
                        <div className="child">
                            <div className="fl title"
                                 onClick={() => {
                                     this.setState({provincesShow: !this.state.provincesShow});
                                 }}
                            >
                            <span className="text">
                            {this.state.provincesName || '省'}
                            </span>
                                <i className="ico-arrow-down"/>
                            </div>
                            {
                                state.provinceList.length > 0 ?
                                    <div className="list"
                                         style={{display: this.state.provincesShow ? 'block' : 'none'}}>
                                        <ul>
                                            {
                                                unlimited ?
                                                    <li
                                                        onClick={
                                                            () => {
                                                                this.setState({
                                                                    provincesName: '不限',
                                                                    provincesId: '',
                                                                    provincesShow: !this.state.provincesShow,
                                                                    cityList: [],
                                                                    cityName: '',
                                                                    cityId: '',
                                                                    cityShow: false,
                                                                    countyList: [],
                                                                    countyName: '',
                                                                    countyId: '',
                                                                    countyShow: false
                                                                });
                                                            }
                                                        }
                                                    >不限</li>
                                                    : null
                                            }

                                            {
                                                state.provinceList.map((data) => {
                                                    return (
                                                        <li key={data.regionId}
                                                            onClick={
                                                                () => {
                                                                    this.setState({
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
                        :
                        null
                }
                {
                    city ?
                        <div className="child">
                            <div className="fl title"
                                 onClick={() => {
                                     this.setState({cityShow: !this.state.cityShow});
                                 }}
                            >
                            <span className="text">
                            {this.state.cityName || '市'}
                            </span>
                                <i className="ico-arrow-down"/>
                            </div>
                            {
                                state.cityList.length > 0 ?
                                    <div className="list" style={{display: this.state.cityShow ? 'block' : 'none'}}>
                                        <ul>
                                            {
                                                state.cityList.map((data) => {
                                                    return (
                                                        <li key={data.regionId}
                                                            onClick={
                                                                () => {
                                                                    this.setState({
                                                                        cityName: data.regionName,
                                                                        cityId: data.regionId,
                                                                        cityShow: !this.state.cityShow,
                                                                        countyList: [],
                                                                        countyName: '',
                                                                        countyId: '',
                                                                        countyShow: false
                                                                    }, () => {
                                                                        this.regionList({
                                                                            regionId: data.regionId,
                                                                            regionType: 2
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
                        :
                        null
                }
                {
                    county ?
                        <div className="child">
                            <div className="fl title"
                                 onClick={() => {
                                     this.setState({countyShow: !this.state.countyShow});
                                 }}
                            >
                            <span className="text">
                            {this.state.countyName || '区'}
                            </span>
                                <i className="ico-arrow-down"/>
                            </div>
                            {
                                state.countyList.length > 0 ?
                                    <div className="list" style={{display: this.state.countyShow ? 'block' : 'none'}}>
                                        <ul>
                                            {
                                                state.countyList.map((data) => {
                                                    return (
                                                        <li key={data.regionId}
                                                            onClick={
                                                                () => {
                                                                    this.setState({
                                                                        countyName: data.regionName,
                                                                        countyId: data.regionId,
                                                                        countyShow: !this.state.countyShow
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
                        :
                        null
                }
            </div>
        );
    }
}
export default Address;