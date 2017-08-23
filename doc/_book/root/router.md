# react-router路由
* 官方: https://reacttraining.com/react-router/web
* 参考: http://localhost:8000/demo.html#/RouterDemo         前提执行:npm run dev
* source:app/component/dome/RouterDemo.jsx

```

import React from 'react';
import {Route,Link} from 'react-router-dom'
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
                <Link to={`${match.url}/Page1/1`}>页面1</Link>
                <Link to={`${match.url}/Page2/2`}>页面2</Link>
                <Link to={{
                    pathname: `${match.url}/Page3/3`,
                    search: '?sort=name',
                    hash: '#the-hash',
                    state: { name: 'hello location state' }
                }}>页面3</Link>
                <Route path={`${match.url}/Page1/:pageId`} component={Page1}/>
                <Route path={`${match.url}/Page2/:pageId`} component={Page2}/>
                <Route path={`${match.url}/Page3/:pageId`} component={Page3}/>
                {this.props.children}
            </div>
        );
    }
}
export default RouterDemo;

```