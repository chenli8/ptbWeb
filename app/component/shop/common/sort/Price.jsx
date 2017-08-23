/**
 * Created by Kirk liu on 2017/7/30.
 */
import React from 'react';
import store from '../searchListState/store'
import {
    actionServiceAjaxListData,
    actionServiceAjaxSearchData,
    actionDemandAjaxListData,
    actionDemandAjaxSearchData
} from '../searchListState/action'
import layer from '../../../../public/js/layer';
import utils from '../../../../public/js/utils';

class Region extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: '',
            list: [
                {name: '不限', min: '', max: ''},
                {name: '5000以下', min: '', max: '5000'},
                {name: '5000-1万', min: '5000', max: '10000'},
                {name: '1万-10万', min: '10000', max: '100000'},
                {name: '10万-50万', min: '100000', max: '500000'},
                {name: '50万以上', min: '500000', max: '999999999'}
            ],
            minPrice: '',
            maxPrice: ''
        };
    }

    onPriceClick() {
        this.setState({show: false});
        let state = this.state;
        let storeState = this.props.storeState;
        /*判断模型*/
        let modelType = storeState.modelType;
        if (modelType == 1) {
            let keywords = storeState.key;
            store.dispatch({
                type: 'SERVICE_PRICE',
                minPrice: utils.priceCents(state.minPrice),
                maxPrice: utils.priceCents(state.maxPrice)
            });
            if (keywords) {
                store.dispatch(actionServiceAjaxSearchData());
            } else {
                store.dispatch(actionServiceAjaxListData());
            }
        }
        if (modelType == 3) {
            let keywords = storeState.key;
            store.dispatch({
                type: 'DEMAND_PRICE',
                minPrice: utils.priceCents(state.minPrice),
                maxPrice: utils.priceCents(state.maxPrice)
            });
            if (keywords) {
                store.dispatch(actionDemandAjaxSearchData());
            } else {
                store.dispatch(actionDemandAjaxListData());
            }
        }
    }

/*    /!*点击自己 冒泡*!/
    handleClickMe(e) {
        e.stopPropagation() || e.nativeEvent.stopImmediatePropagation() || e.preventDefault();
    }

    handleClickOther() {
        this.setState({show: false})
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOther.bind(this))//!*其他地方*!/
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOther);
    }*/

    render() {
        let state = this.state;
        return (
            <div className="price"
                 onMouseEnter={() => {
                     this.setState({show: true});
                 }}
                 onMouseLeave={() => {
                     this.setState({show: false});
                 }}
            >
                <div className={state.show ? "default on" : "default"} onClick={() => {
                    this.setState({show: !state.show});
                }}>
                    <span className="text fl">{state.name || '预算' }</span>
                    <i className={"ico-arrow-down on fl " + (state.show ? "rotate-anti-clockwise-180" : "rotate-clockwise-180" )}/>
                </div>
                {
                    state.show ?
                        <div className="pull">
                            <div className="top fl">
                                {
                                    state.list.map((data) => {
                                        return (
                                            <li key={data.name} onClick={() => {
                                                this.setState({
                                                    name: data.name,
                                                    minPrice: data.min,
                                                    maxPrice: data.max
                                                }, () => this.onPriceClick())
                                            }}>{data.name}</li>
                                        )
                                    })
                                }
                            </div>
                            <div className="bottom fl">
                                <input type="text" ref="min" placeholder="最小价格"
                                       onKeyUp={(e) => {
                                           utils.priceOnKeyUp(e.target);
                                       }}
                                       onBlur={(e) => {
                                           utils.priceOnBlur(e.target);
                                       }}
                                       maxLength={9}/>
                                -- {' '}
                                <input type="text" ref="max" placeholder="最大价格"
                                       onKeyUp={(e) => {
                                           utils.priceOnKeyUp(e.target);
                                       }}
                                       onBlur={(e) => {
                                           utils.priceOnBlur(e.target);
                                       }}
                                       maxLength={9}/>
                                <a href="javascript:;" className="theme-button-bg" onClick={() => {
                                    let min = this.refs.min.value;
                                    let max = this.refs.max.value;

                                    if (!min && !max) {
                                        /*this.setState({
                                         name: '不限',
                                         minPrice: '',
                                         maxPrice: ''
                                         }, () => this.onPriceClick());*/
                                        layer.msg('请输入价格');
                                    }
                                    if (!min && max) {
                                        if(max == '0.00'){
                                            layer.msg('最高价格不能为0');
                                            return
                                        }
                                        this.setState({
                                            name: max + '以下',
                                            minPrice: '',
                                            maxPrice: max
                                        }, () => this.onPriceClick());
                                    }
                                    if (!max && min) {
                                        this.setState({
                                            name: min + '以上',
                                            minPrice: min,
                                            maxPrice: ''
                                        }, () => this.onPriceClick());
                                    }
                                    if (min && max) {
                                        if (min > max) {
                                            layer.msg('价格有误');
                                        } else {
                                            this.setState({
                                                name: min + '-' + max,
                                                minPrice: min,
                                                maxPrice: max
                                            }, () => this.onPriceClick());
                                        }
                                    }
                                }}>确定</a>
                            </div>
                        </div>
                        : null
                }

            </div>
        );
    }
}
export default Region;