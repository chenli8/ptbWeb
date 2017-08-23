/**
 * Created by Kirk liu on 2017/7/21.
 */
import React from 'react';
import {HashRouter as Router, Route, NavLink, Redirect} from 'react-router-dom'
import Username from './Username';
import Phone from './Phone';
import authConf from './../../../public/js/authConf';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        let match = this.props.match;
        let urlHost = window.location.host;
        return (
            <Router>
                <div className="loginReg">
                    <div className="cont">
                        <div className="content">
                            <div className="top">
                                <ul>
                                    <NavLink to={`${match.url}/Username`} activeClassName="on">账号密码登录</NavLink>
                                    <NavLink to={`${match.url}/Phone`} activeClassName="on">手机免密登录</NavLink>
                                </ul>
                            </div>
                            <Route exact path={`${match.url}/Login`} render={() => (
                                <Redirect to={`${match.url}/Username`}/>
                            )}/>
                            <Route path={`${match.url}/Username`} component={Username}/>
                            <Route path={`${match.url}/Phone`} component={Phone}/>
                            {
                                !urlHost.indexOf('www') != -1 ?
                                    <div className="otherLogin fl">
                                        <span className="fl">第三方登录：</span>
                                        <a href={authConf.weiXin(0)}><i
                                            className="ico-other-weixin fl"/></a>
                                        <a href={authConf.qq(0)}><i
                                            className="ico-other-qq fl"/></a>
                                        {/*  <i className="ico-other-weibo fl" />*/}
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}
export default Index;