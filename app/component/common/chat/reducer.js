/**
 * Created by Kirk liu on 2017/7/20.
 */
import "core-js/fn/object/assign";
const chatInfo = JSON.parse(localStorage.getItem('chatInfo'));
const chatMsgRead = localStorage.getItem('chatMsgRead');
function reducer(state = {
    chatInfo: chatInfo, /*消息存储名字*/
    isChatConn: false, /*是否连接*/
    chatServiceShow: false, /*显示客服*/
    chatMsgShow: false, /*显示消息*/
    isChatMsgToUserId: '', /*当前聊天ID*/
    chatInfoOn: '', /*当前聊天人*/
    isChatServiceRead: 0, /*客服红点*/
    isChatMsgRead: chatMsgRead || 0, /*消息红点*/
    isChatSysRead: 0, /*系统消息红点*/
    isChatPayRead: 0, /*交易消息红点*/
}, action) {

    switch (action.type) {
        /*添加聊天信息*/
        case 'CHAT_INFO_ADD':
            /*因为chatInfo是数组 所有...state解构 */
            return Object.assign({}, state, {chatInfo: action.chatInfo});
        /*判断聊天是否链接*/
        case 'IS_CHAT_CONN':
            return Object.assign({}, state, {isChatConn: action.isChatConn});
        /*在线客服是否打开*/
        case 'CHAT_SERVICE_SHOW':
            return Object.assign({}, state, {chatServiceShow: !state.chatServiceShow});
        /*消息是否打开*/
        case 'CHAT_MSG_SHOW':
            return Object.assign({}, state, {
                chatMsgShow: !state.chatMsgShow,
                isChatMsgToUserId: action.isChatMsgToUserId
            });
        /*消息当前聊天人*/
        case 'CHAT_INFO_ON':
            return Object.assign({}, state, {chatInfoOn: action.chatInfoOn});
        /*客服红点*/
        case 'IS_CHAT_SERVICE_READ':
            return Object.assign({}, state, {isChatServiceRead: action.isChatServiceRead});
        /*消息红点*/
        case 'IS_CHAT_MSG_READ':
            return Object.assign({}, state, {isChatMsgRead: action.isChatMsgRead});
        /*系统消息红点*/
        case 'IS_CHAT_SYS_READ':
            return Object.assign({}, state, {isChatSysRead: action.isChatSysRead});
        /*交易消息红点*/
        case 'IS_CHAT_PAY_READ':
            return Object.assign({}, state, {isChatPayRead: action.isChatPayRead});
        default:
            return state;
    }
}

export default reducer;
