import React, {Component} from 'react';
import {HashRouter as Router,Route, NavLink, Redirect} from 'react-router-dom'

import UserAgreement from './UserAgreement'
import ServiceAgreement from './ServiceAgreement'
import ServiceGuarantee from './ServiceGuarantee'
import ThirdAgreementTemplate from './ThirdAgreementTemplate'
import DemandGuarantee from './DemandGuarantee'

import '../../../public/css/agreement.css';

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    render() {
        return (
            <div>
                <AgreementRouter/>
            </div>
        );
    }
}

class AgreementRouter extends Component{
    render(){
        return(
            <Router>
                <div className="agreementContainer">
                    <div className="pageContainer clear">
                        <div className="agreementTab fl">
                            <NavLink to="/ServiceAgreement" activeClassName="navS">《品推宝用户服务协议》</NavLink>
                            <NavLink to="/UserAgreement" activeClassName="navS">《品推宝用户注册协议》</NavLink>
                            <NavLink to="/DemandGuarantee" activeClassName="navS">《品推宝需求发布规定》</NavLink>
                            <NavLink to="/ServiceGuarantee" activeClassName="navS">《品推宝服务发布规定》</NavLink>
                            <NavLink to="/ThirdAgreementTemplate" activeClassName="navS">《品推宝三方协议模板》</NavLink>
                        </div>
                        <div className="divider fl"></div>
                        <div className="agreementContent">
                            <Route exact path="/"
                                   render={() => (<Redirect to="/ServiceAgreement"/>)}/>
                            <Route path="/ServiceAgreement" component={ServiceAgreement}/>
                            <Route path="/UserAgreement" component={UserAgreement}/>
                            <Route path="/DemandGuarantee" component={DemandGuarantee}/>
                            <Route path="/ServiceGuarantee" component={ServiceGuarantee}/>
                            <Route path="/ThirdAgreementTemplate" component={ThirdAgreementTemplate}/>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Main;
