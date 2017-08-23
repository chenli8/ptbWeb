/**
 * Created by Kirk liu on 2017/7/20.
 */
import React from 'react';
import $ from 'jquery';
import cookie from 'react-cookie'
import moment from 'moment-kirk'
import {Provider, connect} from 'react-redux'
import store from './store'

import TextArea from './TextArea'
import chatUtils from './chatUtils'
import utils from './../../../public/js/utils'

import '../../../public/plugin/jquery.nicescroll';

const Item = function (props) {
    let data = props.data;
    let type = data.type;
    let info = data.info;
    let mePic = props.mePic;
    let toUserImage = props.toUserImage;
    let toUserId = props.toUserId;
    let toUserName = props.toUserName;
    let date = props.date;
    let msgId = data.id;
    return (
        <span>
            {
                date ?
                    <li className="date">{date}</li>
                    :
                    null
            }
            {
                type == 1 ?
                    <li className="buyer">
                        <i className="pic" style={{'backgroundImage': 'url(' + mePic + ')'}}/>
                        <i className="ico_chatRight"/>
                        <div className="info">
                            {data.isOk == 0 ? <i className="ico-loading"/> : data.isOk == 2 ?
                                <i className="ico-chat-sendFail" title="点击重发" onClick={() => {
                                    chatUtils.sendPrivateText({
                                        from: toUserId,
                                        toUserName: toUserName,
                                        toUserImage: toUserImage,
                                        toUserId: toUserId,
                                        data: [
                                            {
                                                id: msgId
                                            }
                                        ]
                                    }, info, () => {
                                    }, true);
                                }
                                }/> : null }
                            <span
                                dangerouslySetInnerHTML={{__html: utils.strURLReplace(info.replace(/ /g, '&nbsp;').replace(/\n/g, '<br/>'))}}/>
                        </div>
                    </li>
                    :
                    <li className="seller">
                        <i className="pic" style={{'backgroundImage': 'url(' + toUserImage + ')'}}/>
                        <i className="ico_chatLeft"/>
                        <div className="info">
                            <span
                                dangerouslySetInnerHTML={{__html: utils.strURLReplace(info.replace(/ /g, '&nbsp;').replace(/\n/g, '<br/>'))}}/>
                        </div>
                    </li>
            }
            </span>
    )
}

class ItemMain extends React.Component {
    componentDidMount() {
        $('.chat .list').scrollTop($('.chat .list')[0].scrollHeight);
    }

    componentDidUpdate() {
        //当前滚动条距离顶部距离
        var chatListScrollTop = $('.chat .list')[0].offsetHeight + $('.chat .list')[0].scrollTop;
        //文档滚动整个高度
        var chatListScrollHeight = $('.chat .list ul').height() + 10;
        //文档可视高度
        if ((chatListScrollHeight - chatListScrollTop) < 100) {//chatListHeight
            $('.chat .list').scrollTop($('.chat .list')[0].scrollHeight);
        }
    }

    render() {
        let mePic = this.props.mePic;
        let toUserImage = this.props.toUserImage;
        let toUserId = this.props.toUserId;
        let toUserName = this.props.toUserName;
        let chatInfoTemp = this.props.data;
        let chatInfoTempLength = chatInfoTemp ? chatInfoTemp.length : [];
        /*未登录调式改过*/
        let chatInfoData = [];
        //找到自己的对话列表
        if (chatInfoTempLength > 0) {
            for (let i = 0; i < chatInfoTempLength; i++) {
                if (chatInfoTemp[i].from == this.props.toUserId) {
                    chatInfoData = chatInfoTemp[i].data;
                }
            }
        }
        let date = '';
        /*消息时间*/
        let dateToday = '';
        /*消息今天日期*/
        let dateLocalToday = moment(Date.parse(new Date()), "x").format('YYYY/MM/DD');
        /*本地今天时间*/
        let item = chatInfoData.map(function (data, index) {
            dateToday = moment(data.date, "x").format('YYYY/MM/DD');
            /*转换成消息日期*/
            /*判断 是不是 今天，如果是今天 则不显示 日期*/
            if (dateLocalToday == dateToday) {
                date = moment(data.date, "x").format('HH:mm');
            } else {
                date = moment(data.date, "x").format('YYYY/MM/DD HH:mm');
            }
            /*判断前后时间 是不是 小于5 分钟 5 * 60 * 1000*/
            if (index > 0 && data.date - chatInfoData[index - 1].date < 300000) {
                date = ''
            }
            return <Item data={data} key={data.id} _index={index} mePic={mePic} toUserImage={toUserImage}
                         toUserId={toUserId} toUserName={toUserName} date={date}/>
        });
        return (
            <ul>
                {item}
            </ul>
        )
    }
}

class ChatService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mePic: cookie.load('userImage'),
            toUserName: chatUtils.chatServiceInfo.toUserName,
            toUserImage: chatUtils.chatServiceInfo.toUserImage,
            toUserId: chatUtils.chatServiceInfo.toUserId
        };
    }

    componentDidMount() {
        let clientHeight = window.innerHeight;//document.body.clientHeight
        let $chatService = $('.chat.chatService');
        let $chatServiceList = $('.chat.chatService .list');
        $chatService.css({'height': clientHeight - 70});
        $chatServiceList.css({height: clientHeight - 70 - 64 - 257});
        let stInit = $(window).scrollTop();
        if (stInit >= 70) {
            $chatService.css({'top': 0, height: clientHeight});
            $chatServiceList.css({height: clientHeight - 64 - 257});
        }
        $(window).scroll(function () {
            let st = $(window).scrollTop();
            if (st >= 70) {
                $chatService.css({'top': 0, height: clientHeight});
                $chatServiceList.css({height: clientHeight - 64 - 257});
            } else {
                $chatService.css({'top': 70 - st, height: clientHeight - 70 + st});
                $chatServiceList.css({height: clientHeight - 70 - 64 - 257 + st});
            }
            $chatServiceList.scrollTop($chatServiceList[0].scrollHeight);
        });
        $('.chatService .list,.chatService .bottom textarea').niceScroll({cursorcolor: "#C1C1C1"});
        /*点击其他地方 销毁自己*/
        document.addEventListener('click', this.handleClickOther);//*其他地方*/
    }

    /*点击自己 冒泡*/
    handleClickMe(e) {
        e.nativeEvent.stopImmediatePropagation();
    }

    handleClickOther() {
        store.dispatch({type: 'CHAT_SERVICE_SHOW'});// 通知 redux 打开关闭在线客服
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOther);
        $(window).unbind('scroll');
    }

    render() {
        let state = this.state;
        return (
            <div className="chat chatService fl" onClick={this.handleClickMe}>
                <div className="top fl">
                    <i className="userImage fl" style={{backgroundImage: 'url(' + state.toUserImage + ')'}}/>
                    <span className="desc fl">与 <span className="userName">{state.toUserName}</span> 聊天</span>
                </div>
                <div className="list fl">
                    <ul>
                        <ItemMain data={this.props.storeState.chatInfo} mePic={state.mePic}
                                  toUserImage={state.toUserImage} toUserId={state.toUserId}
                                  toUserName={state.toUserName}/>
                    </ul>
                </div>
                <TextArea toUser={
                    {
                        toUserName: state.toUserName,
                        toUserImage: state.toUserImage,
                        toUserId: state.toUserId
                    }
                } isChatConn={this.props.storeState.isChatConn}/>
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
)(ChatService);
const App = () => (
    <Provider store={store}>
        <Index />
    </Provider>
);

export default App;