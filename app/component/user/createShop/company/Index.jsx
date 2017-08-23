import React from 'react';
import {HashRouter as Router, Route, Redirect} from 'react-router-dom'

import Main from "./Main";
import Success from "./Success";

const Index = (props) => {
    let match = props.match;
    return (
        <div className="cont">
            <Router>
                <div>
                    <Route exact path={`${match.url}/Index`}
                           render={() => (<Redirect to="Main"/>)}/>
                    <Route path={`${match.url}/Main`} component={Main}/>
                    <Route path={`${match.url}/Success`} component={Success}/>
                </div>
            </Router>
        </div>
    );
}

export default Index;