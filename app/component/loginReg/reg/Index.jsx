/**
 * Created by Kirk liu on 2017/7/21.
 */
import React from 'react';
import {HashRouter as Router, Route, NavLink, Redirect} from 'react-router-dom'
import Phone from './Phone'
import Success from './Success'
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        let match = this.props.match;
        return (
            <Router>
                <div className="loginReg">
                    <Route exact path={`${match.url}`} render={() => (
                        <Redirect to={`${match.url}/Phone`}/>
                    )}/>
                    <Route path={`${match.url}/Phone`} component={Phone}/>
                    <Route path={`${match.url}/Success`} component={Success}/>
                </div>
            </Router>
        );
    }
}
export default Index;