/**
 * Created by Kirk liu on 2017/7/21.
 */
import React from 'react';
import {HashRouter as Router, Route, NavLink, Redirect} from 'react-router-dom'
import Header from './../common/Header';
import Footer from './../common/Footer';
import Login from './login/Index';
import Reg from './reg/Index';
import Auth from './auth/Index';
import '../../public/css/loginReg.css'
import utils from '../../public/js/utils'
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        /*第三方登录 如果有code 跳转*/
        if (utils.urlParam('code')) {
            window.location.hash = 'Auth';
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Route exact path="/" render={() => (
                        <Redirect to="/Login/Username"/>
                    )}/>
                    <Route path="/Login" component={Login}/>
                    <Route path="/Reg" component={Reg}/>
                    <Route path="/Auth" component={Auth}/>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default Index;