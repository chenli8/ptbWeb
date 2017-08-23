/**
 * Created by Kirk liu on 2017/7/22.
 */
import React from 'react';
import chatUtils from './../chat/chatUtils';
class Msg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        let storeState = this.props.storeState;
        return (
            <div className="msg">
                <i className="ico-triangle-up"/>
                <a href="javascript:;" onClick={() => {
                    chatUtils.chatMsgShow('02');
                }}>
                    系统消息
                    {storeState.isChatSysRead ? <i className="ico_infoTipsRed"/> : null}
                </a>
                <a href="javascript:;" onClick={() => {
                    chatUtils.chatMsgShow('01');
                }}>
                    交易消息
                    {storeState.isChatPayRead ? <i className="ico_infoTipsRed"/> : null}
                </a>
                <a href="javascript:;" onClick={() => {
                    chatUtils.chatMsgShow('03');
                }}>
                    聊天消息
                    {storeState.isChatMsgRead ? <i className="ico_infoTipsRed"/> : null}
                </a>
            </div>
        );
    }
}
export default Msg;