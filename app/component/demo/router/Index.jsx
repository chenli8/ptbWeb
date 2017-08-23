/**
 * Created by Kirk liu on 2017/7/16.
 */
import React from 'react';
import {Route, Link, NavLink} from 'react-router-dom'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
class RouterDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        var match = this.props.match;
        return (
            <div>
                <h2>路由</h2>
                <NavLink to={`${match.url}/Page1/1`}>页面1</NavLink>
                <NavLink to={`${match.url}/Page2/2`}>页面2</NavLink>
                <NavLink strict to={{
                    pathname: `${match.url}/Page3/3`,
                    search: '?sort=name',
                    hash: '#the-hash',
                    state: {name: '刷新会消失'}
                }} isActive={(match, location) =>{location.state = {name:'刷新还在'}}}>页面3</NavLink>
                <Route path={`${match.url}/Page1/:pageId`} component={Page1}/>
                <Route path={`${match.url}/Page2/:pageId`} component={Page2}/>
                <Route path={`${match.url}/Page3/:pageId`} component={Page3}/>
                {this.props.children}
            </div>
        );
    }
}
export default RouterDemo;