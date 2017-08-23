/**
 * Created by Kirk liu on 2017/7/11.
 */
/*链接环信*/
import React from 'react'
import cookie from 'react-cookie'
import $ from 'jquery'
import layer from '../../../public/js/layer'
import utils from '../../../public/js/utils'

import store from './store'

/* 默认发送消息 */
const chatMsgDefault = {
    chatService: 'Hi.有什么可以帮到您？',
    chatMsg: '您好，请问您有什么需求？',
};
/* 在线客服baseInfo */
const urlMsgInfo = window.location.href;
const chatServiceInfo = {
    toUserId: urlMsgInfo.indexOf('test') != -1 || urlMsgInfo.indexOf('localhost') != -1 ? '1000000000' : urlMsgInfo.indexOf('hera') != -1 ? '1000000194' : '1000000397',
    toUserName: '客服小蜜',
    toUserImage: 'http://www.pintuibao.cn/static/common/img/logo128.png'
};
/* 环信连接配置 */
const conn = new WebIM.connection({
    https: WebIM.config.https,
    url: WebIM.config.xmppURL,
    isAutoLogin: WebIM.config.isAutoLogin,
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions
});
// 建立连接
const connOpen = () => {
    let chatUid = cookie.load('chatUid');
    /* 环信链接参数 */
    let options = {
        apiUrl: WebIM.config.apiURL,
        user: chatUid,
        pwd: chatUid ? chatUid.toString() : null,
        appKey: WebIM.config.appkey
    };
    conn.open(options);
};
// 断开连接
const connClose = () => {
    window.removeEventListener("storage", () => {
    }, false);// 解除监听
    cookie.remove('chatUid');
    localStorage.removeItem('chatInfo');// 删除 聊天信息
    localStorage.removeItem('chatMsgRead'); // 删除信息 红点
    conn.close();
};

/* 消息保存 */
const chatLocalSave = (toUser, isOk) => {
    let chatInfoTempS = JSON.parse(localStorage.getItem('chatInfo'));//读取本地数据
    let chatInfoTempSLength = chatInfoTempS.length;//本地数据长度
    /*isOk 为真 更新消息发送状态 , 为假 保存本地数据*/
    if (isOk >= 0) {
        for (let i = 0; i < chatInfoTempSLength; i++) {
            if (chatInfoTempS[i].from == toUser.from) {
                /* 找到具体消息 */
                for (let j = 0; j < chatInfoTempS[i].data.length; j++) {
                    if (chatInfoTempS[i].data[j].id == toUser.data[0].id) {
                        chatInfoTempS[i].data[j].isOk = isOk;
                    }
                }
            }
        }
    } else {
        /* 如果消息为空 说明是 用户 主动唤起聊天 由卖家模拟发送一条欢迎消息 */
        let toUserInfo = toUser.data[0].info;
        if (toUserInfo == '') {
            toUser.data[0].info = chatMsgDefault.chatMsg;
        }
        if (chatInfoTempSLength > 0) {
            /*如果本地有会话*/
            let isOn = true;//判断对话是否存在 true 不存在,false 存在
            for (var i = 0; i < chatInfoTempSLength; i++) {
                if (chatInfoTempS[i].from == toUser.from) {
                    /* 判断消息是否重复 */
                    for (var j = 0; j < chatInfoTempS[i].data.length; j++) {
                        if (chatInfoTempS[i].data[j].id == toUser.data[0].id) {
                            return
                        }
                    }
                    /* 判断聊天内容是否为空  为空说明是 用户主动唤起聊天卖家模拟的发送 不再保存 */
                    if (toUserInfo != '') {
                        chatInfoTempS[i].data.push(toUser.data[0]);
                    }
                    chatInfoTempS[i].read = toUser.read;
                    store.dispatch({type: 'IS_CHAT_SERVICE_READ', isChatServiceRead: toUser.read});//更新客服红点
                    store.dispatch({type: 'IS_CHAT_MSG_READ', isChatMsgRead: toUser.read});//更新客服红点
                    /*Actions.handleIsChatServiceRead(toUser.read);
                     Actions.handleIsChatMsgRead(toUser.read);*/
                    isOn = false;
                }
            }
            /*如果没有，push进去一个新的对话*/
            if (isOn) {
                chatInfoTempS.push(toUser);
            }
        } else {
            /*如果本地没有会话*/
            chatInfoTempS = [toUser];
        }
    }
    localStorage.chatInfo = JSON.stringify(chatInfoTempS);//保存消息
    store.dispatch({type: 'CHAT_INFO_ADD', chatInfo: JSON.parse(localStorage.getItem('chatInfo'))});// 通知 reflux  chatInfo改变数据
    store.dispatch({type: 'CHAT_INFO_ON', chatInfoOn: chatMsgToUserInfo(toUser.from)});// 通知 reflux chatInfoOn 改变当前用户数据
    /* 如果是在线客服  消息显示红点  主要用于初始化时 没有消息的时候 */
    /*if (chatInfoTempS[0].from == chatServiceInfo.toUserId) {
     Actions.handleIsChatServiceRead(chatInfoTempS[0].read)
     }*/
    /* 通知 其他页签 更新 */
    /*    window.addEventListener("storage", (e) => {
     Actions.handleChatInfo(JSON.parse(e.storageArea.chatInfo));// 通知 reflux 改变数据
     });*/
};
/* 默认消息 */
const chatLocalSaveDefault = (toUser) => {
    let objDefault = {
        from: toUser.from,
        toUserName: toUser.toUserName,
        toUserImage: toUser.toUserImage,
        read: 0,
        data: [{
            type: 2,
            id: '1',
            info: '',
            date: Date.parse(new Date())
        }]
    };
    chatLocalSave(objDefault)
};
/*消息发送后保存该消息体 预制失败消息*/
let toUserObjFail = {};
/* 发送消息 */
const sendPrivateText = (obj, msgInfo, cb, resend) => {
    let id = conn.getUniqueId();                 // 生成本地消息id
    let toUserId = obj.toUserId, toUserName = obj.toUserName, toUserImage = obj.toUserImage;
    /*先保存消息*/
    let objMsg = {
        from: toUserId,
        toUserName: toUserName,
        toUserImage: toUserImage,
        read: 0,
        data: [{
            type: 1,
            id: id,
            info: msgInfo,
            isOk: 0, /*发送状态 0 加载中 1 成功 2 失败*/
            date: Date.parse(new Date())
        }]
    };
    toUserObjFail = objMsg;
    /*消息保存后 保存该消息体*/
    if (resend) {
        chatLocalSave(obj, 2);// 重发消息更新
    } else {
        chatLocalSave(objMsg);// 正常消息保存
    }
    /* 保存成功回调 */
    if (cb) {
        cb()
    }
    let msg = new WebIM.message('txt', id);      // 创建文本消息
    msg.set({
        msg: msgInfo,                  // 消息内容
        to: toUserId,                // 接收消息对象(用户id)
        roomType: false,
        success: function (id, serverMsgId) {
            /*消息发送后保存该消息体 更新消息体  */
            objMsg.data[0].isOk = 1;
            toUserObjFail = objMsg;
            if (resend) {
                chatLocalSave(obj, 1);// 重发消息更新
            } else {
                chatLocalSave(objMsg, 1);// 消息保存
            }
        }
    });
    msg.body.chatType = 'singleChat';
    msg.body.ext = {
        weichat: {originType: "webim"},
        extras: {
            customType: 0,
            headImg: cookie.load('userImage'),
            nickName: cookie.load('nickName')
        }
    };
    conn.send(msg.body);
};
/*添加监听*/
const storageListener = () => {
    window.addEventListener("storage", (e) => {
        /*Actions.handleIsChatServiceRead(e.storageArea.chatInfo && JSON.parse(e.storageArea.chatInfo).length > 0 ? JSON.parse(e.storageArea.chatInfo)[0].read : 0);// 通知 reflux 改变数据
         Actions.handleIsChatMsgRead(e.storageArea.chatMsgRead);// 通知 reflux 改变数据*/
    });
};

/* 监听环信信息 str */
conn.listen({
    //连接成功回调
    onOpened: function (message) {
        /* 如果没有则新建 */
        if (!localStorage.getItem('chatInfo')) {
            localStorage.chatInfo = JSON.stringify([]);
        }
        store.dispatch({type: 'IS_CHAT_CONN', isChatConn: true});//通知 redux 开启
        /*storageListener();//添加监听*/
        console.log('连接成功回调');
    },
    //连接关闭回调
    onClosed: function (message) {
        store.dispatch({type: 'IS_CHAT_CONN', isChatConn: false});//通知 redux 关闭
        console.log('连接关闭回调');
    },
    //本机网络掉线
    onOffline: function (message) {
        store.dispatch({type: 'IS_CHAT_CONN', isChatConn: false});//通知 redux 关闭
        console.log('本机网络掉线', message);
    },
    //收到文本消息
    onTextMessage: function (message) {

        let read = 0;//默认已读
        if (message.from == chatServiceInfo.toUserId) {
            if (!store.getState().chatServiceShow) {
                read = 1;// 如果 消息是 在线客服, 并且 在线客服窗口未打开 设置未读
            }
        } else {
            if (!store.getState().chatMsgShow) {
                read = 1;// 如果 消息是 "消息", 并且 "消息"窗口未打开 设置未读
                localStorage.chatMsgRead = 1;
            }
        }
        let objMsg = {
            from: message.from,
            toUserName: message.ext.extras.nickName,
            toUserImage: message.ext.extras.headImg,
            read: read,
            data: [{
                type: 2,
                id: message.id,
                info: message.data,
                date: Date.parse(new Date())
            }]
        };
        chatLocalSave(objMsg);// 消息保存
    },
    //失败回调
    onError: function (message) {
        /*如果失败消息体 发送状态不等于1 侧该条信息发送失败*/
        if (toUserObjFail.data[0].isOk != 1) {
            chatLocalSave(toUserObjFail, 2);// 消息发送失败保存
        }
        console.log('失败回调', message);
    }
});
/* 监听环信信息 end */

/* 调用窗口起判断用户是否登录 */
const isLogin = function () {
    if (cookie.load('token')) {
        return true
    } else {
        layer.msg('登录失效，请重新登录！', function () {
            utils.loginReturnUrl()
        })
    }
};

/* 调用客服窗口 */
const chatServiceShow = function () {
    /* 默认客服消息 */
    let chatServiceObjDefault = {
        from: chatServiceInfo.toUserId,
        toUserName: chatServiceInfo.toUserName,
        toUserImage: chatServiceInfo.toUserImage,
        read: 0,
        data: [{
            type: 2,
            id: '1',
            info: chatMsgDefault.chatService,
            date: Date.parse(new Date())
        }]
    };
    let chatInfoTemp = JSON.parse(localStorage.getItem('chatInfo'));//读取本地数据
    if (chatInfoTemp && chatInfoTemp.length > 0) {
        /* 如果聊天信息长度不等于0 并且聊天信息第一条 不是客服信息 则在聊天信息前加入 客服信息 */
        if (chatInfoTemp[0].from != chatServiceInfo.toUserId) {
            chatInfoTemp.unshift(chatServiceObjDefault);
            localStorage.chatInfo = JSON.stringify(chatInfoTemp);
        }
        /* 会出现 默认消息不在第一条的情况 */
        /*else{
         /!* 如果第一条是在线客服消息 则 走正常 保存逻辑 *!/
         chatLocalSave(chatServiceObjDefault)
         }*/
    } else {
        /* 新建聊天信息 存储 并加入 客服消息 */
        localStorage.chatInfo = JSON.stringify([chatServiceObjDefault]);
    }
    if (isLogin()) {
        /*Actions.handleIsChatService()*/
        store.dispatch({type: 'CHAT_SERVICE_SHOW'});// 通知 redux 打开关闭在线客服
    }
};
/* 调起信息窗口 */
const chatMsgShow = function (id) {
    if (isLogin()) {
        /*Actions.handleIsChatMsg(id)*/
        store.dispatch({type: 'CHAT_MSG_SHOW', isChatMsgToUserId: id})
    }
};

/*被点击人 消息红点删除*/
const chatMsgReadRemove = (toUserId) => {
    //已读 未读 去掉已读
    let localStorageChatInfo = JSON.parse(localStorage.getItem('chatInfo'));
    let localStorageChatInfoLength = localStorageChatInfo.length;
    for (let i = 0; i < localStorageChatInfoLength; i++) {
        if (localStorageChatInfo[i].from == toUserId) {
            localStorageChatInfo[i].read = 0;
            localStorage.chatInfo = JSON.stringify(localStorageChatInfo);
            chatMsgAllReadRemove();
            /*Actions.handleIsChatMsgRead();*/
            return
        }
    }
};
/*所有用户消息判断*/
const chatMsgAllReadRemove = () => {
    let localStorageChatInfo = JSON.parse(localStorage.getItem('chatInfo'));
    let localStorageChatInfoLength = localStorageChatInfo.length;
    for (let i = 0; i < localStorageChatInfoLength; i++) {
        if (localStorageChatInfo[i].read == 1) {
            store.dispatch({type: 'IS_CHAT_MSG_READ', isChatMsgRead: 1});
            localStorage.chatMsgRead = 1;
            return
        }else{
            store.dispatch({type: 'IS_CHAT_MSG_READ', isChatMsgRead: 0});
            localStorage.chatMsgRead = 0;
        }
    }
};


/*提取用户信息*/
const chatMsgToUserInfo = (toUserId) => {
        let chatInfoOn = [];
        let chatInfo = JSON.parse(localStorage.getItem('chatInfo'));
        let chatInfoLength = chatInfo.length;
        for (let i = 0; i < chatInfoLength; i++) {
            if (chatInfo[i].from == toUserId) {
                chatInfoOn = chatInfo[i].data;
            }
        }
        return chatInfoOn;
    }
;
/*信息红点*/
const isChatMsgRead = (state) => {
    /*Actions.handleIsChatMsgRead(state);*/
    store.dispatch({type: 'IS_CHAT_MSG_READ', isChatMsgRead: state});
};
/*系统红点*/
const isChatSysRead = (state) => {
    /*Actions.handleIsChatMsgRead(state);*/
    store.dispatch({type: 'IS_CHAT_SYS_READ', isChatSysRead: state});
};
/*交易红点*/
const isChatPayRead = (state) => {
    /*Actions.handleIsChatMsgRead(state);*/
    store.dispatch({type: 'IS_CHAT_PAY_READ', isChatPayRead: state});
};
/*消息总红点*/
const isChatAllRead = () => {
    if (store.getState().isChatMsgRead || store.getState().isChatSysRead || store.getState().isChatPayRead) {
        return true
    } else {
        return false
    }
};

export default {
    conn: conn,
    connOpen: connOpen,
    connClose: connClose,
    chatLocalSave: chatLocalSave,
    sendPrivateText: sendPrivateText,
    chatServiceInfo: chatServiceInfo,
    chatServiceShow: chatServiceShow,
    chatMsgShow: chatMsgShow,
    chatLocalSaveDefault: chatLocalSaveDefault,
    chatMsgReadRemove: chatMsgReadRemove,
    chatMsgToUserInfo: chatMsgToUserInfo,
    isChatMsgRead: isChatMsgRead,
    isChatSysRead: isChatSysRead,
    isChatPayRead: isChatPayRead,
    isChatAllRead: isChatAllRead
};