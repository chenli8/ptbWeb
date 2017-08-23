import React from 'react'
import {Provider, connect} from 'react-redux'
import urlManager from '../../public/js/urlManager'
import layer from '../../public/js/layer'
import '../../public/css/shop.css';
import store from '../shop/common/searchListState/store'
import {
    actionServiceAjaxSearchData,
    actionDemandAjaxSearchData,
    actionSupplierAjaxSearchData,
    actionServiceAjaxListData,
    actionSupplierAjaxListData,
    actionDemandAjaxListData,
} from '../shop/common/searchListState/action'
class SearchBtn extends React.Component {
    constructor(props) {
        super(props);
        this.urlOn = window.location.href.indexOf('service.html') != -1 ? window.location.href.indexOf('ShopService') != -1 ? 1 : 3 : 2;
        this.state = {
            searchName: [
                {name: '找服务', id: 1},
                {name: '找需求', id: 2},
                {name: '找服务商', id: 3}
            ],
            searchNameOn: this.urlOn === 1 ? '找服务' : this.urlOn === 2 ? '找需求' : this.urlOn === 3 ? '找服务商' : '',
            searchIdOn: this.urlOn,
            searchPullShow: false
        };
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        this.refs.keywords.value = this.props.storeState.key;
    }

    render() {
        let state = this.state;
        return (
            <div className="searchCategory">
                <div className="searchContainer">
                    <div className="searchBg">
                        <div className={state.searchPullShow ? "searchType on" : "searchType"}
                             onMouseEnter={() => {
                                 this.setState({searchPullShow: true})
                             }}
                             onMouseLeave={() => {
                                 this.setState({searchPullShow: false})
                             }}
                        >
                            <div className="title">
                                {state.searchNameOn}
                                <i className={"ico-arrow-down on " + (state.searchPullShow ? "rotate-anti-clockwise-180" : "rotate-clockwise-180")}/>
                            </div>
                            <div className="pull on">
                                {
                                    state.searchPullShow ?
                                        state.searchName.map((data) => {
                                            if (data.id != state.searchIdOn) {
                                                return (
                                                    <li key={data.id} onClick={() => {
                                                        this.setState({
                                                            searchNameOn: data.name,
                                                            searchIdOn: data.id,
                                                            searchPullShow: false
                                                        })
                                                    }}>
                                                        {data.name}
                                                    </li>
                                                )
                                            }
                                        })
                                        :
                                        null

                                }
                            </div>
                        </div>
                        <input className="input" placeholder="请输入关键词" ref="keywords"
                               onKeyPress={(e) => {
                                   if (e.which === 13) {
                                       this.refs.searchSubmit.click();
                                   }
                               }}
                        />
                        <a href="javascript:;" className="searchBtn theme-button-bg" onClick={
                            () => {
                                let keywords = encodeURIComponent(this.refs.keywords.value);
                                /* let locationHash = window.location.href.substring(window.location.href.indexOf('#/')+2,window.location.href.length);
                                 let newHash = locationHash.substring(0,locationHash.indexOf('/'));

                                 console.log(newHash);
                                 store.dispatch({type: 'KEYWORDS', keywords: decodeURIComponent(keywords)});
                                 if(!keywords){
                                 window.location.hash = newHash;
                                 return
                                 }*/
                                store.dispatch({type: 'KEYWORDS', keywords: decodeURIComponent(keywords)});
                                /*清空分页*/
                                store.dispatch({type: 'SERVICE_PAGE', start: 0, end: store.getState().pageSize});
                                store.dispatch({type: 'SUPPLIER_PAGE', start: 0, end: store.getState().pageSize});
                                store.dispatch({type: 'DEMAND_PAGE', start: 0, end: store.getState().pageSize});

                                /*判断模型*/
                                let modelType = this.props.storeState.modelType;

                                if (state.searchIdOn == 1) {
                                    window.location.href = urlManager.pService + '?date=' + new Date().getTime() + '#/ShopService/' + keywords;
                                }
                                if (state.searchIdOn == 3) {
                                    window.location.href = urlManager.pService + '?date=' + new Date().getTime() + '#/ShopSupplier/' + keywords;
                                }
                                if (state.searchIdOn == 2) {
                                    window.location.href = urlManager.pDemand + '?date=' + new Date().getTime() + '#/Ongoing/' + keywords;
                                }
                                /*if (this.urlOn) {
                                 if (state.searchIdOn == 1) {
                                 /!*如果在服务大厅 修改hash*!/
                                 if (modelType == 1) {
                                 window.location.hash = 'ShopService/' + keywords;
                                 //store.dispatch({type: 'SERVICE_SORT', sortType: '', orderType: ''});//清空筛选
                                 if (keywords) {
                                 store.dispatch(actionServiceAjaxSearchData());
                                 } else {
                                 store.dispatch(actionServiceAjaxListData());
                                 }
                                 }
                                 if (modelType == 2) {
                                 window.location.hash = 'ShopService/' + keywords;//ShopSupplier
                                 //store.dispatch({type: 'SUPPLIER_SORT', sortType: '', orderType: ''});//清空筛选
                                 if (keywords) {
                                 store.dispatch(actionSupplierAjaxSearchData());
                                 } else {
                                 store.dispatch(actionSupplierAjaxListData());
                                 }

                                 }
                                 } else {
                                 /!*如果在服务大厅 跳转到需求大厅*!/
                                 window.location.href = urlManager.pDemand + '#/Ongoing/' + keywords;
                                 }
                                 } else {
                                 /!*如果在需求大厅*!/
                                 if (state.searchIdOn == 1) {
                                 window.location.href = urlManager.pService + '#/ShopService/' + keywords;
                                 } else {
                                 if (window.location.href.indexOf('demand.html') != -1) {
                                 window.location.hash = 'Ongoing/' + keywords;
                                 //store.dispatch({type: 'DEMAND_SORT', sortType: '', orderType: ''});//清空筛选
                                 if (keywords) {
                                 store.dispatch(actionDemandAjaxSearchData());
                                 } else {
                                 store.dispatch(actionDemandAjaxListData());
                                 }

                                 } else {
                                 window.location.href = urlManager.pDemand + '#/Ongoing/' + keywords;
                                 //store.dispatch({type: 'DEMAND_SORT', sortType: '', orderType: ''});//清空筛选
                                 if (keywords) {
                                 store.dispatch(actionDemandAjaxSearchData());
                                 } else {
                                 store.dispatch(actionDemandAjaxListData());
                                 }
                                 }
                                 }
                                 }*/
                            }
                        } ref="searchSubmit">搜索</a>
                    </div>
                    <a href={urlManager.pDemandCreate} className="demand theme-button-bg">发布需求</a>
                </div>
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
)(SearchBtn);
const App = () => (
    <Provider store={store}>
        <Index />
    </Provider>
);
export default App;