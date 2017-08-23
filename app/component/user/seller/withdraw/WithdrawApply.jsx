import React from 'react';
import {HashRouter as Router, Route, Redirect} from 'react-router-dom'
import '../../../../public/css/sellerWithdrawals.css';
import WithdrawApplyMain from "./WithdrawApplyMain";

class WithdrawApply extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        var match = this.props.match;
        return (
            <Router>
                <div>
                    <Route exact path={`${match.url}/WithDrawHistory`}
                           render={() => (<Redirect to="/Main"/>)}/>
                    <Route path={`${match.url}/Main`} component={WithdrawApplyMain}/>
                </div>
            </Router>
        );
    }
}

export default WithdrawApply;
