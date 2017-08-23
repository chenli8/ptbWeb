/**
 * Created by Kirk liu on 2017/8/12.
 */
import React from 'react';
import {HashRouter as Router, Route, NavLink, Redirect} from 'react-router-dom'
import Header from '../common/Header';
import Footer from '../common/Footer';
import Main from './Main';
import Factoring from './factoring';
import ProjectCredit from './projectCredit';

const Index = () => (
    <Router>
        <div>
            <Header/>
            <Route exact path="/"
                   render={() => (<Redirect to="/Main"/>)}/>
            <Route path="/Main" exact component={Main}/>
            <Route path="/Factoring" component={Factoring}/>
            <Route path="/ProjectCredit" component={ProjectCredit}/>
            <Footer/>
        </div>
    </Router>
);

export default Index;
