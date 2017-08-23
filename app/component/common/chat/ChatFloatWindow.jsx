/**
 * Created by Kirk liu on 2017/7/20.
 */
import React from 'react';
import {Provider, connect} from 'react-redux'
import ChatService from './ChatService';
import ChatMsg from './ChatMsg';
import store from './store';
import chatUtils from './chatUtils';
import urlManager from './../../../public/js/urlManager';

class ChatFloatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appCode: false,
        };
    }

    componentDidMount() {

    }

    render() {
        let state = this.state;
        let storeState = this.props.storeState;
        return (
            <div className="FloatWindow"
                 style={{right: storeState.chatServiceShow ? 393 : storeState.chatMsgShow ? 621 : 0}}>
                <div className="sidebar-appDownload theme-button-bg"
                     onMouseEnter={() => {
                         this.setState({appCode: true})
                     }}
                     onMouseLeave={() => {
                         this.setState({appCode: false})
                     }}
                >
                    <i className="ico-sidebar-appDownload"/>
                    <span>APP<br/>下载</span>
                    {
                        state.appCode ?
                            <div className="ico-code">
                                <i className="ico-code1"/>
                            </div>
                            :
                            null
                    }
                </div>
                <div className="sidebar-service" onClick={() => {
                    //store.dispatch({type: 'CHAT_SERVICE_SHOW'});// 通知 redux 打开关闭在线客服
                    chatUtils.chatServiceShow();// 通知 redux 打开关闭在线客服
                }}>
                    <i className="ico-sidebar-service"/>
                    {
                        storeState.isChatServiceRead ? <i className="ico_infoTipsRed" title="在线客服"/> : null
                    }
                </div>
                <div className="sidebar-collection">
                    <a href={urlManager.pBuyerCenter + '#/myCollect/MySupplier/CollectShop/Collect'}><i className="ico-sidebar-collection" title="我收藏的"/></a>
                </div>
                <div className="sidebar-top" onClick={() => {
                    window.scrollTo(0, 0)
                }}>
                    <i className="ico-sidebar-top" title="返回顶部"/>
                </div>
                {
                    storeState.chatServiceShow ? <ChatService/> : null
                }
                {
                    storeState.chatMsgShow ? <ChatMsg/> : null
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        storeState: state
    }
};
const Index = connect(
    mapStateToProps
)(ChatFloatWindow);
const App = () => (
    <Provider store={store}>
        <Index />
    </Provider>
);

export default App;