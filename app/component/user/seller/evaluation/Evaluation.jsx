import React from 'react';
import {HashRouter as Router,Route,NavLink,Redirect} from 'react-router-dom';
import "../../../../public/css/sellerEvaluetion.css"
import Waitasses from './Waitasses.jsx';
import AssesSell from './AssesSell.jsx';
import Fromasses from './Fromasses.jsx';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        var match = this.props.match;
        return (
            <div className="assessCon">
                <Router>
                    <div>
                        <div className="serverNav">
                            <NavLink to={`${match.url}/Waitasses`} strict  activeClassName="on">待评价</NavLink>
                            <NavLink to={`${match.url}/AssesSell`} strict activeClassName="on">我回复的买家</NavLink>
                            <NavLink to={`${match.url}/Fromasses`} strict activeClassName="on">来自买家的评价</NavLink>
                        </div>
                        <div className="reItem">
                            <Route exact path={`${match.url}/Evaluation`}
                                   render={() => (<Redirect to="/Waitasses"/>)} />

                            <Route path={`${match.url}/Waitasses`} component={Waitasses}/>
                            <Route path={`${match.url}/AssesSell`} component={AssesSell}/>
                            <Route path={`${match.url}/Fromasses`} component={Fromasses}/>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}
export default Main;