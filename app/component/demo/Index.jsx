import React from 'react'
import {HashRouter as Router,Route,NavLink,Redirect} from 'react-router-dom'
import Style from './Style'
import Time from './Time'
import RouterDemo from './router/Index'
import reduxDemo from './redux/Index'
import Api from './Api'
import ChatService from './../common/chat/ChatService'
import ChatSingle from './../common/chat/ChatSingle'
import Layer from './Layer'
import Upload from './Upload'
import UEditor from './UEditor'
import Header from './../common/Header'
import '../../public/css/chat.css';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Router>
                <div className="demo">
                    <Header />
                    <NavLink to="/Style" strict activeClassName="on">样式示列</NavLink>
                    <NavLink to="/Time" activeClassName="on">定时器</NavLink>
                    <NavLink to="/RouterDemo" activeClassName="on">路由</NavLink>
                    <NavLink to="/Api" activeClassName="on">接口请求</NavLink>
                    <NavLink to="/Layer" activeClassName="on">弹出层</NavLink>
                    <NavLink to="/reduxDemo" activeClassName="on">状态管理</NavLink>
                    <NavLink to="/ChatService" activeClassName="on">在线客服</NavLink>
                    <NavLink to="/ChatSingle" activeClassName="on">单聊</NavLink>
                    <NavLink to="/Upload" activeClassName="on">文件上传</NavLink>
                    <NavLink to="/UEditor" activeClassName="on">富文本编辑器</NavLink>
                    <div className="route">
                        <Route exact path="/" render={() => (
                            <Redirect to="/Style"/>
                        )}/>
                        <Route path="/Style" component={Style}/>
                        <Route path="/Time" component={Time}/>
                        <Route path="/RouterDemo" component={RouterDemo}/>
                        <Route path="/Api" component={Api}/>
                        <Route path="/Layer" component={Layer}/>
                        <Route path="/reduxDemo" component={reduxDemo}/>
                        <Route path="/ChatService" component={ChatService}/>
                        <Route path="/ChatSingle" component={ChatSingle}/>
                        <Route path="/Upload" component={Upload}/>
                        <Route path="/UEditor" component={UEditor}/>
                    </div>
                </div>
            </Router>
        );
    }
}
export default Index;