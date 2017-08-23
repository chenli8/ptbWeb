/**
 * Created by Kirk liu on 2017/7/22.
 */
import React from 'react';
import {HashRouter as Router, Route, NavLink, Redirect} from 'react-router-dom'

import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Index from './index/Index';
import Phone from './phone/Index';
import LoginPassword from './loginPassword/Index';
import PayPassword from './payPassword/Index';

import '../../../public/css/account.css';

const Main = () => (
    <Router>
        <div>
            <Header />
            <Route exact path="/"
                   render={() => (<Redirect to="/Index"/>)}/>
            <Route path="/Index" exact component={Index}/>
            <Route path="/Phone" exact component={Phone}/>
            <Route path="/LoginPassword" exact component={LoginPassword}/>
            <Route path="/PayPassword" exact component={PayPassword}/>
            <Footer />
        </div>
    </Router>
)
export default Main;