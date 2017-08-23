/**
 * Created by Kirk liu on 2017/8/10.
 */
import React from 'react';
import {HashRouter as Router,Route, NavLink, Redirect} from 'react-router-dom'
import Seller from './Seller'
import Buyer from './Buyer'
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <Router>
                <div className="notice">
                    <div className="raidersLeft fl">
                        <NavLink to="/Novice/Buyer"  strict activeClassName="on" >买家教程</NavLink>
                        <NavLink to="/Novice/Seller"  strict activeClassName="on" >卖家教程</NavLink>
                    </div>
                    <div className="raidersRight fr">
                        <Route exact path="/Novice"
                               render={() => (<Redirect to="/Novice/Buyer"/>)}/>
                        <Route path="/Novice/Buyer" component={Buyer}/>
                        <Route path="/Novice/Seller" component={Seller}/>
                    </div>
                    <div style={{clear:"both"}}/>
                </div>
            </Router>
        );
    }
}
export default Index;