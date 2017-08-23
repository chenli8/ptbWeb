/**
 * Created by Kirk liu on 2017/8/15.
 */
import React from 'react';
import {HashRouter as Router, Route, NavLink, Redirect} from 'react-router-dom'
import Main from './Main'
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
                <div className="auth">
                    <div className="cont">
                        <Route exact path={`${match.url}`} render={() => (
                            <Redirect to={`${match.url}/Main`}/>
                        )}/>
                        <Route path={`${match.url}/Main`} component={Main}/>
                        <Route path={`${match.url}/Success`} component={Success}/>
                    </div>
                </div>
            </Router>
        );
    }
}
export default Index;