import React, {Component} from 'react';
import {HashRouter as Router,Route, NavLink, Redirect} from 'react-router-dom'
import '../../../public/css/notice.css';
import Notice01 from './Notice01';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Router>
                <div className="notice">
                    <Route exact path="/"
                           render={() => (<Redirect to="/Notice01"/>)}/>
                    <Route path="/Notice01" component={Notice01}/>
                </div>
            </Router>
        );
    }
}


export default Main;
