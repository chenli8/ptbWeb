import React, {Component} from 'react';
import {HashRouter as Router,Route, NavLink, Redirect} from 'react-router-dom'
import '../../../public/css/help.css';
import Novice from './novice';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Router>
                <div className="help">
                    <Route exact path="/"
                           render={() => (<Redirect to="/Novice"/>)}/>
                    <Route path="/Novice" component={Novice}/>
                </div>
            </Router>
        );
    }
}


export default Main;
