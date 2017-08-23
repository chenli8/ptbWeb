import React from 'react'
import store from '../searchListState/store'
import {
    actionServiceAjaxListData,
    actionServiceAjaxSearchData,
    actionSupplierAjaxListData,
    actionSupplierAjaxSearchData,
    actionDemandAjaxListData,
    actionDemandAjaxSearchData
} from '../searchListState/action'
import '../../../../public/css/sort.css'
import Region from "./Region";
import Price from "./Price";
class Sort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onSortClick(sortType) {
        let storeState = this.props.storeState;
        /*判断模型*/
        let modelType = storeState.modelType;
        if (modelType == 1) {
            let orderType = storeState.servicePostData.orderType;
            /*综合排序要求永远为 1  这边为0 才能永远为1*/
            if(sortType == 0){
                orderType = 0
            }
            let keywords = storeState.key;
            store.dispatch({type: 'SERVICE_SORT', sortType: sortType, orderType: orderType == 0 ? 1 : 0});
            if (keywords) {
                store.dispatch(actionServiceAjaxSearchData());
            } else {
                store.dispatch(actionServiceAjaxListData());
            }
        }
        if (modelType == 2) {
            let orderType = storeState.supplierPostData.orderType;
            /*综合排序要求永远为 1  这边为0 才能永远为1*/
            if(sortType == 0){
                orderType = 0
            }
            let keywords = storeState.key;
            store.dispatch({type: 'SUPPLIER_SORT', sortType: sortType, orderType: orderType == 0 ? 1 : 0});
            if (keywords) {
                store.dispatch(actionSupplierAjaxSearchData());
            } else {
                store.dispatch(actionSupplierAjaxListData());
            }
        }
        if (modelType == 3) {
            let orderType = storeState.demandPostData.orderType;
            /*综合排序要求永远为 1  这边为0 才能永远为1*/
            if(sortType == 0){
                orderType = 0
            }
            let keywords = storeState.key;
            store.dispatch({type: 'DEMAND_SORT', sortType: sortType, orderType: orderType == 0 ? 1 : 0});
            if (keywords) {
                store.dispatch(actionDemandAjaxSearchData());
            } else {
                store.dispatch(actionDemandAjaxListData());
            }
        }
    }

    componentDidMount() {

    }

    render() {
        let storeState = this.props.storeState;
        let modelType = storeState.modelType;
        let postData = '';
        if (modelType == 1) {
            postData = storeState.servicePostData
        }
        if (modelType == 2) {
            postData = storeState.supplierPostData
        }
        if (modelType == 3) {
            postData = storeState.demandPostData
        }
        return (
            <div className="sort">
                {
                    this.props.data ?
                        this.props.data.map((data) => {
                            return (
                                <a key={data.name} href="javascript:;" onClick={() => this.onSortClick(data.id)}
                                   className={postData.sortType == data.id ? "on" : null}>
                                    {data.name}
                                    {
                                        postData.sortType == data.id ?
                                            <i className="sortUpDown">
                                                <i className={postData.orderType == 0 ? "ico-arrow-up on" : "ico-arrow-up" }/>
                                                <i className={postData.orderType == 1 ? "ico-arrow-down on" : "ico-arrow-down" }/>
                                            </i>
                                            :
                                            <i className="sortUpDown">
                                                <i className="ico-arrow-up"/>
                                                <i className="ico-arrow-down"/>
                                            </i>
                                    }
                                </a>
                            )
                        })
                        : null
                }
                {
                    modelType == 2 ?
                        null
                        :
                        <Price storeState={storeState}/>
                }
                <Region storeState={storeState}/>
            </div>
        );
    }
}
export default Sort;