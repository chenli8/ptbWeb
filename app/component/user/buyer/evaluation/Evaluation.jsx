import React from 'react';
import {HashRouter as Router,Route,NavLink,Redirect} from 'react-router-dom';

import NotEvaluatedOrderList from "./NotEvaluatedOrderList";
import "../../../../public/css/buyerEvaluated.css"
import EvaluateSellerList from "./EvaluateSellerList";
import SellerReply from "./SellerReply";

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
            <div className="evaluationCon">
                <Router>
                    <div>
                        <div className="serverNav">
                            <NavLink to={`${match.url}/NotEvaluatedOrderList`} strict  activeClassName="on">待评价</NavLink>
                            <NavLink to={`${match.url}/EvaluateSellerList`} strict activeClassName="on"> 我评价的卖家</NavLink>
                            <NavLink to={`${match.url}/SellerReply`} strict activeClassName="on">来自卖家的印象</NavLink>
                        </div>
                        <div className="reItem">
                            <Route exact path={`${match.url}/Evaluation`}
                                   render={() => (<Redirect to="/NotEvaluatedOrderList"/>)} />
                            <Route path={`${match.url}/NotEvaluatedOrderList`} component={NotEvaluatedOrderList}/>
                            <Route path={`${match.url}/EvaluateSellerList`} component={EvaluateSellerList}/>
                            <Route path={`${match.url}/SellerReply`} component={SellerReply}/>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}
export default Main;