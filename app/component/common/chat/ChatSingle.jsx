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

class ChatSingle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mePic: cookie.load('userImage'),
            toUserName: this.props.toUserInfo.userName,
            toUserImage: this.props.toUserInfo.userImage,
            toUserId: this.props.toUserInfo.userId
        };
    }

    componentDidMount() {

        let clientHeight = window.innerHeight;//document.body.clientHeight
        let $chatSingle = $('.chat.chatSingle');
        let $chatSingleList = $('.chat.chatSingle .list');
        $chatSingle.css({'height': clientHeight - 100});
        $chatSingleList.css({height: clientHeight - 100 - 64 - 257});
        let stInit = $(window).scrollTop();
        if (stInit >= 70) {
            $chatSingle.css({'top': 0, height: clientHeight});
            $chatSingleList.css({height: clientHeight - 64 - 257});
        }
        $(window).scroll(function () {
            let st = $(window).scrollTop();
            if (st >= 100) {
                $chatSingle.css({'top': 0, height: clientHeight});
                $chatSingleList.css({height: clientHeight - 64 - 257});
            } else {
                $chatSingle.css({'top': 100 - st, height: clientHeight - 100 + st});
                $chatSingleList.css({height: clientHeight - 100 - 64 - 257 + st});
            }
            $chatSingleList.scrollTop($chatSingleList[0].scrollHeight);
        });





/*
        var clientHeight = document.body.clientHeight;
        $('.chat.chatSingle').css({'height': clientHeight - 70 - 30});
        $('.chat.chatSingle .list').css({height: clientHeight - 70 - 30 - 64 - 257});
        var stInit = $(window).scrollTop();
        if (stInit >= 100) {
            $('.chat.chatSingle').css({'top': 0, height: clientHeight});
            $('.chat.chatSingle .list').css({height: clientHeight - 300});
        }
        $(window).scroll(function () {
            var st = $(window).scrollTop();
            if (st >= 100) {
                $('.chat.chatSingle').css({'top': 0, height: clientHeight - 70 - 30});
                $('.chat.chatSingle .list').css({height: clientHeight - 70 - 30 - 64 - 257});
            } else {
                $('.chat.chatSingle').css({'top': 70 + 30 - st, height: clientHeight - 70 - 30});
                $('.chat.chatSingle .list').css({height: clientHeight - 70 - 30 - 64 - 257});
            }
            $('.chat.chatSingle .list').scrollTop($('.chat.chatSingle .list')[0].scrollHeight);
        });
        /!*$('.chat .list,.chat .cont textarea').niceScroll({cursorcolor: "#C1C1C1"});*!/*/
    }

    render() {
        let state = this.state;
        return (
            <div className="chat chatSingle fl">
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
)(ChatSingle);


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <Provider store={store}>
                <Index toUserInfo={this.props.toUserInfo}/>
            </Provider>
        );
    }
}

/*const App = () => (
 <Provider store={store}>
 <Main />
 </Provider>
 );*/

export default App;