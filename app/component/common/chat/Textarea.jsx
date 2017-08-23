import React from 'react'
import cookie from 'react-cookie'
import chatUtils from './chatUtils'
class TextArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleMsgValue() {
        let val = this.refs.textArea.value;
        let toUser = this.props.toUser;
        if (val.substring(val.length - 1, val.length) == '\n') {
            val = val.substring(0, val.length - 1)
        }
        if (val.trim()) {
            chatUtils.sendPrivateText(toUser, val, () => {
                this.refs.textArea.value = '';
            });
        }
    }

    handleTextArea(e) {
        /*shift enter*/
        if (e.shiftKey && e.keyCode == 13) {
            return
        }
        /*enter*/
        if (e && e.keyCode == 13) {
            this.handleMsgValue();
        }
    }

    handleSend() {
        /*按钮发送*/
        this.handleMsgValue();
    }

    render() {
        let placeholder = '';
        let isChatMe = false;
        if(this.props.toUser.toUserId == cookie.load('chatUid')){
            isChatMe = true
        }
        if(!this.props.isChatConn){
            placeholder = '会话连接中...或请刷新页面重试';
        }else if(isChatMe){
            placeholder = '亲，不能跟自己说话哦';
        }else{
            placeholder = '请输入聊天内容，回车键发送';
        }
        return (
            <div className="bottom fl">
                <textarea placeholder={placeholder} onKeyUp={this.handleTextArea.bind(this)} ref="textArea"
                          disabled={this.props.isChatConn && !isChatMe ? null : "disabled"}
                          defaultValue=""/>
                <div className="send theme-button-bg fr" onClick={this.handleSend.bind(this)}>发送</div>
            </div>
        );
    }
}
export default TextArea;