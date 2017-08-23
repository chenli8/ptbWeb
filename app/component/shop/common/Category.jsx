import React from 'react'
import {Provider, connect} from 'react-redux'
import store from './searchListState/store'
import {
    actionServiceAjaxListData,
    actionServiceAjaxSearchData,
    actionSupplierAjaxListData,
    actionSupplierAjaxSearchData,
    actionDemandAjaxListData,
    actionDemandAjaxSearchData
} from './searchListState/action'
import '../../../public/css/category.css';

import serviceApi from '../../../public/js/serviceApi';
import utils from '../../../public/js/utils';

/**
 * 搜索分类组件
 */
class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            categoriesOne: [],
            categoriesOneId: '',
            categoriesName: [],
            pull: false
        };
    }

    categoryList() {
        serviceApi('aCategoryList', {}, (data) => {
            let categoryList = data.categoryList;
            this.setState({
                categories: categoryList,
                categoriesOne: categoryList,//返回时用
            }, () => {
                /*以下是从首页点分类过来 这边要同步控制 各业务组件 阻止list 渲染*/
                let urlParam = (param) => {
                    return utils.urlParam(param, window.location.hash)
                };
                let c1 = urlParam('c1');
                let l1 = urlParam('l1');
                let c2 = urlParam('c2');
                let l2 = urlParam('l2');
                let categoryName = '';
                let children = [];
                if (c1 && l1) {
                    categoryList.map((data) => {
                        if (data.categoryId == c1) {
                            categoryName = data.categoryName;
                            children = data.children;
                        }
                    });
                    if (c2 && l2) {
                        this.onCategoryClick(l2, c2, children, categoryName);
                    } else {
                        this.onCategoryClick(l1, c1, children, categoryName);
                    }
                }
            })
        }, () => {

        })
    }

    onCategoryClick(categoryLevel, categoryId, children, categoryName) {

        if (children.length > 0) {
            let categoriesName = [];
            if (categoriesName) {
                categoriesName.push(categoryName);
            }
            this.setState({categories: children, categoriesName: categoriesName});
            /*服务商需要一级ID*/
            if (categoryLevel == 1) {
                this.setState({categoriesOneId: categoryId})
            }
        }
        let storeState = this.props.storeState;
        /*判断模型*/
        let modelType = storeState.modelType;
        let {dispatch} = this.props;
        let keywords = this.props.storeState.key;
        dispatch({type: 'CATEGORY', categoryLevel: categoryLevel, categoryId: categoryId});
        if (modelType == 1) {
            if (keywords) {
                dispatch(actionServiceAjaxSearchData());
            } else {
                dispatch(actionServiceAjaxListData());
            }
        }
        if (modelType == 2) {
            if (keywords) {
                dispatch(actionSupplierAjaxSearchData());
            } else {
                dispatch(actionSupplierAjaxListData());
            }
        }
        if (modelType == 3) {
            if (keywords) {
                dispatch(actionDemandAjaxSearchData());
            } else {
                dispatch(actionDemandAjaxListData());
            }
        }
    }

    componentDidMount() {
        this.categoryList();
    }

    render() {
        let categories = this.state.categories;
        let categoriesOne = this.state.categoriesOne;
        let categoryId = this.props.storeState.commonPostData.categoryId;
        let state = this.state;
        return (
            <div className="type">
                <div className="alltype">
                    <div className="firstType"
                         onMouseEnter={() => {
                             this.setState({pull: true})
                         }}
                         onMouseLeave={() => {
                             this.setState({pull: false})
                         }}
                    >

                        {
                            state.categoriesName.length > 0 ?
                                state.categoriesName.map((data) => {
                                    return (
                                        <span className="title on" key={data}>{data}
                                            <i className={"ico-arrow-down on " + (state.pull ? "rotate-anti-clockwise-180" : "rotate-clockwise-180")}/></span>
                                    )
                                })
                                :
                                <span className="title on"
                                >全部分类 <i className={"ico-arrow-down on " + (state.pull ? "rotate-anti-clockwise-180" : "rotate-clockwise-180")}/></span>
                        }
                        {
                            state.pull ?
                                <div className="pull">
                                    <i className="ico-arrow-up-white"/>
                                    <span className="titleAll"
                                          onClick={() => {
                                              this.onCategoryClick('', '', state.categoriesOne, '全部分类');
                                              this.setState({pull: false})
                                          }}
                                    >全部分类</span>
                                    {
                                        categoriesOne.length > 0 ?
                                            categoriesOne.map((item) => {
                                                return (
                                                    <li key={item.categoryId}
                                                        onClick={
                                                            () => {
                                                                this.onCategoryClick(item.level, item.categoryId, item.children, item.categoryName);
                                                                this.setState({pull: false})
                                                            }
                                                        }
                                                        className={item.categoryId == categoryId ? "on" : null}
                                                    >
                                                        {item.categoryName}
                                                    </li>
                                                )
                                            })
                                            :
                                            null
                                    }
                                </div>
                                : null
                        }
                    </div>
                </div>
                <div className="typeCon">
                    <div className="item">
                        {
                            categories.length > 0 ?
                                categories.map((item) => {
                                    return (
                                        <li key={item.categoryId}
                                            onClick={
                                                () => {
                                                    /*如果是二级分类 并且是 服务商 读取一级分类 */
                                                    if (item.level == 2 && store.getState().modelType == 2) {
                                                        this.onCategoryClick(1, this.state.categoriesOneId, item.children, item.categoryName)
                                                    } else {
                                                        this.onCategoryClick(item.level, item.categoryId, item.children, item.categoryName)
                                                    }
                                                }
                                            }
                                            className={item.categoryId == categoryId ? "on" : null}
                                        >
                                            {item.categoryName}
                                        </li>
                                    )
                                })
                                :
                                null
                        }
                    </div>
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
)(Category);
const App = () => (
    <Provider store={store}>
        <Index />
    </Provider>
);
export default App;