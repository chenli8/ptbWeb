/**
 * Created by Yhyu on 2017/7/18.
 */
import React, {Component} from 'react';
import {Provider, connect} from 'react-redux'
import store from '../common/searchListState/store'
import {HashRouter as Router, Route, NavLink, Redirect} from 'react-router-dom'
import '../../../public/css/shopService.css';
import ShopService from './Service.jsx';
import ShopSupplier from './Supplier.jsx';
import Category from '../common/Category.jsx';
import SearchBtn from "../../common/SearchBtn";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <Router>
                <div className="container">
                    <div className="serviceSupplier">
                        <SearchBtn/>
                        <Category/>
                        <div className="tab_container">
                            <NavLink to={"/ShopService/" + this.props.storeState.key}
                                     activeClassName="tab_s">相关服务</NavLink>
                            <NavLink to={"/ShopSupplier/" + this.props.storeState.key}
                                     activeClassName="tab_s">相关店铺</NavLink>
                        </div>
                        <div className="tabContentContainer">
                            <Route exact path="/"
                                   render={() => (<Redirect to="/ShopService"/>)}/>
                            <Route path="/ShopService" exact component={ShopService}/>
                            <Route path="/ShopService/:keywords" component={ShopService}/>
                            <Route path="/ShopSupplier" exact component={ShopSupplier}/>
                            <Route path="/ShopSupplier/:keywords" component={ShopSupplier}/>
                        </div>
                    </div>
                </div>
            </Router>
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
)(Main);
const App = () => (
    <Provider store={store}>
        <Index />
    </Provider>
);
export default App;
