import React from 'react'
import {HashRouter as Router, Route, NavLink, Redirect} from 'react-router-dom'
import Header from '../../../common/Header';
import Footer from '../../../common/Footer';
import chatUtils from '../../../common/chat/chatUtils';
import '../../../../public/css/mediaSearch.css';

import Wx from './wx/WxEntry.jsx';
import Wb from './wb/WbEntry.jsx';
import Zb from './zb/ZbEntry.jsx';

const Main = () => (
    <Router>
        <div>
            <Header />
            <Route exact path="/"
                   render={() => (<Redirect to="/wx"/>)}/>
            <Route path="/wx" component={Wx}/>
            <Route path="/wb" component={Wb}/>
            <Route path="/zb" component={Zb}/>
            <div className="feedback">
                没找到账号？
                <a href="javascript:;"
                   onClick={() => {
                       chatUtils.chatServiceShow()
                   }}
                >点击这里联系客服</a>
            </div>
            <Footer />
        </div>
    </Router>
);
export default Main;
