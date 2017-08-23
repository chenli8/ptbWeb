/**
 * Created by Kirk liu on 2017/7/29.
 */
import React from 'react';
import {Provider, connect} from 'react-redux'
import store from '../../common/searchListState/store'
import {actionDemandAjaxListData, actionDemandAjaxSearchData} from '../../common/searchListState/action'
import Item from './Item'
import Page from "../../../common/Page";
import utils from "../../../../public/js/utils";
class Ongoing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onPageClick(start) {
        const {dispatch} = this.props;
        dispatch({type: 'DEMAND_PAGE', start: start});
        if (this.props.data.match.params.keywords) {
            /*根据关键词 查找服务*/
            dispatch(actionDemandAjaxSearchData());
        } else {
            /*获取服务列表*/
            dispatch(actionDemandAjaxListData());
        }
    }

    componentDidMount() {
        document.title = '进行中_需求_品推宝';
        const {dispatch} = this.props;
        /*模型更新*/
        dispatch({type: 'MODEL_TYPE', modelType: 3});
        /*状态更新*/
        dispatch({type: 'DEMAND_AJAX_STATUS_DATA', status: 2});
        /*服务初始化的时候 通知更新 KEYWORDS*/
        dispatch({type: 'KEYWORDS', keywords: this.props.data.match.params.keywords || ''});
        if (this.props.data.match.params.keywords) {
            /*根据关键词 查找服务*/
            dispatch(actionDemandAjaxSearchData());
        } else {
            /*此处 与 Category.jsx 有关联*/
            let urlParam = (param) => {
                return utils.urlParam(param, window.location.hash)
            };
            let c1 = urlParam('c1');
            let l1 = urlParam('l1');
            let c2 = urlParam('c2');
            let l2 = urlParam('l2');
            if (c1 || l1 || c2 || l2) {
                return
            } else {
                /*获取需求列表*/
                dispatch(actionDemandAjaxListData());
            }
        }

    }

    render() {
        let storeState = this.props.storeState;
        let demandGetData = storeState.demandGetData;
        let demandPostData = storeState.demandPostData;

        let requireList = demandGetData.requireList;
        let totalNum = demandGetData.total;
        let pageSize = storeState.pageSize;
        let start = demandPostData.start;

        return (
            <div>
                <div>
                    {
                        demandGetData ?
                            requireList.map((item) => {
                                return <Item demand={item} key={item.id}/>
                            })
                            :
                            null
                    }
                    {
                        totalNum == 0 ?
                            <p className="noListTap">没有发现需求。</p>
                            :
                            null
                    }
                </div>
                {
                    totalNum > pageSize ?
                        <Page totalNum={totalNum} pageSize={pageSize} start={start}
                              onPageClick={this.onPageClick.bind(this)}/>
                        : null
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        storeState: state
    }
};
const Index = connect(
    mapStateToProps
)(Ongoing);
const App = (props) => (
    <Provider store={store}>
        <Index data={props}/>
    </Provider>
);
export default App;
