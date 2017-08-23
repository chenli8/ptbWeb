import React, {Component} from 'react';

import {HashRouter as Router, Route, NavLink, Redirect} from 'react-router-dom'
import {Provider, connect} from 'react-redux'
import store from '../../common/searchListState/store'
import Ongoing from './Ongoing'
import Over from './Over'

import SearchBtn from '../../../common/SearchBtn.jsx';
import Category from "../../common/Category";
import Sort from "../../common/sort/Sort";

import '../../../../public/css/demand.css';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {

    }

    render() {
        let storeState = this.props.storeState;
        return (
            <Router>
                <div className="container">
                    <div className="demandContainer">
                        <SearchBtn/>
                        <Category />
                        <div className="demandMain">
                            <div className="title">
                                <div className="stateBtn">
                                    <NavLink to={"/Ongoing/" + this.props.storeState.key}
                                             activeClassName="theme-button-bg on">进行中</NavLink>
                                    <NavLink to={"/Over/" + this.props.storeState.key}
                                             activeClassName="theme-button-bg on">已结束</NavLink>
                                </div>
                            </div>
                            <div className="mainCon">
                                <div className="demandnav">
                                    <Sort
                                        data={
                                            [{name: '综合排序', id: 0}, {name: '发布时间', id: 1}, {
                                                name: '剩余时间',
                                                id: 2
                                            }, {name: '参与人数', id: 3}]
                                        }
                                        storeState={storeState}/>
                                </div>
                                <Route exact path="/"
                                       render={() => (<Redirect to="/Ongoing"/>)}/>
                                <Route path="/Ongoing" exact component={Ongoing}/>
                                <Route path="/Ongoing/:keywords" component={Ongoing}/>
                                <Route path="/Over" exact component={Over}/>
                                <Route path="/Over/:keywords" component={Over}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        storeState: state
    }
};
const Index = connect(
    mapStateToProps
)(Main);
const App = () => (
    <Provider store={store}>
        <Index />
    </Provider>
);
export default App;
