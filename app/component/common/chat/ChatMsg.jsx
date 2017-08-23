/**
 * Created by Kirk liu on 2017/7/27.
 */
import React from 'react'
import cookie from 'react-cookie'
import moment from 'moment-kirk'
import {Provider, connect} from 'react-redux'
import $ from 'jquery'
import TextArea from './TextArea'
import chatUtils from './chatUtils'
import store from './store'
import serviceApi from './../../../public/js/serviceApi'
import layer from './../../../public/js/layer'
import utils from './../../../public/js/utils'

import '../../../public/plugin/jquery.nicescroll';

const PayMsgListMain = (props) => {
    let item = props.data.map((data, index) => {
        let date = moment(data.pushTime, "x").format('YYYY年MM月DD日');
        if (index > 0 && moment(props.data[index - 1].pushTime, "x").format('YYYY年MM月DD日') == date) {
            date = ''
        }
        return <PayMsgListItem data={data} key={data.id} date={date}/>
    });
    return (
        <ul>
            {item}
            <li className="loading" id="payMsgLoading" style={{display: 'none'}}><i className="ico-loading"/>
            </li>
        </ul>
    )
}
const PayMsgListItem = (props) => {
    let data = props.data;
    return (
        <span>
                <li className="date">{props.date}</li>
                <li>
                    <div className="title">{data.title}</div>
                    <div className="message">{data.message}</div>
                    {/*<div className="detail">查看详情</div>*/}
                </li>
            </span>
    )
};

const SysMsgListMain = (props) => {
    let item = props.data.map((data, index) => {
        let date = moment(data.pushTime, "x").format('YYYY年MM月DD日');
        if (index > 0 && moment(props.data[index - 1].pushTime, "x").format('YYYY年MM月DD日') == date) {
            date = ''
        }
        return <SysMsgListItem data={data} key={data.id} date={date}/>
    });
    return (
        <ul>
            {item}
            <li className="loading" id="sysMsgLoading" style={{display: 'none'}}><i className="ico-loading"></i></li>
        </ul>
    )
};
const SysMsgListItem = (props) => {
    let data = props.data;
    return (
        <span>
                <li className="date">{props.date}</li>
                <li>
                    <div className="title">{data.title}</div>
                    <div className="message">{data.message}</div>
                    {/*<div className="detail">查看详情</div>*/}
                </li>
            </span>
    )
};

class UserListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infoTipsRed: this.props.data.read,
            chatInfoOn: this.props.data.data,
            toUserId: this.props.data.from,
            toUserName: this.props.data.toUserName,
            toUserImage: this.props.data.toUserImage,
            isClickClass: 0
        }
    }

    chatData() {
        $('.sysMsg').hide();
        $('#msgUsername').hide().text('');
        $('#msgUsername_chat').show();
        let state = this.state;
        this.props.chatData(state.chatInfoOn, state.toUserName, state.toUserImage, state.toUserId);
        chatUtils.chatMsgReadRemove(state.toUserId);//去除红点
        /*chatUtils.chatMsgReadRemove(state.toUserId);*/ //去除红点
        this.setState({infoTipsRed: 0});
        /*Actions.handleIsChatMsgToUserId(state.toUserId);*/
        //todo
    }

    componentDidMount() {
    }

    render() {
        let state = this.state;
        return (
            <li onClick={this.chatData.bind(this)} data-userid={state.toUserId}>
                {
                    state.infoTipsRed == 1 ? <i className="ico_infoTipsRed"/> : null
                }

                {
                    state.toUserImage ?
                        <i className="pic fl" style={{'backgroundImage': 'url(' + state.toUserImage + ')'}}/> :
                        <i className="pic fl"/>
                }
                <span className="text fl">{state.toUserName ? state.toUserName : null }</span>
            </li>
        )
    }
}
class UserListMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatInfo: [],
            isPayRead: false,
            isSysRead: false,
        }
    }

    componentDidMount() {
        $('.chatMsg .left .list ul li').click(function () {
            $(this).addClass('on').siblings().removeClass('on');
        });
        /* 默认点击第一个 */
        $('.chatMsg .left .list ul li').eq(0).trigger('click');
        /* 主动调起 点击调起的那个 */
        $('.chatMsg .left .list ul li').map(function () {
            if ($(this).data('userid') == store.getState().isChatMsgToUserId) {
                $(this).trigger('click');
                return
            }
        });
    }

    componentDidUpdate() {
        $('.chatMsg .left .list ul li').click(function () {
            $(this).addClass('on').siblings().removeClass('on');
        })
    }

    handleChatAction(type) {
        if (type == 'sys') {
            chatUtils.isChatSysRead(0);
        }
        if (type == 'pay') {
            chatUtils.isChatPayRead(0);
        }
        /*        Actions.handleIsChatMsgRead();
         Actions.handleIsChatMsgToUserId(""); // 清空选中ToUserId*/
    }

    render() {
        let item = this.props.data.map((data) => {
            /* 排除在线客服 */
            if (data.from != chatUtils.chatServiceInfo.toUserId) {
                return <UserListItem data={data} key={data.from} chatData={this.props.chatData.bind(this)}/>
            }
        });
        return (
            <ul>
                <li onClick={function () {
                    $('.sysMsg').hide();
                    $('.sysMsg.pay').show();
                    $('#msgUsername_chat').hide();
                    $('#msgUsername').show().text('交易信息');
                    $('#userImage').css({'background-image': 'url(data:image/png;base64,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)'});
                    localStorage.setItem('payMsgLastDateOld' + cookie.load('chatUid'), localStorage.getItem('payMsgLastDateNew' + cookie.load('chatUid')));
                    (parseInt(localStorage.getItem('payMsgLastDateNew' + cookie.load('chatUid')) ? localStorage.getItem('payMsgLastDateNew' + cookie.load('chatUid')) : 0)) > (parseInt(localStorage.getItem('payMsgLastDateOld' + cookie.load('chatUid')) ? localStorage.getItem('payMsgLastDateOld' + cookie.load('chatUid')) : 0))
                        ?
                        this.setState({isPayRead: true})
                        :
                        this.setState({isPayRead: false});
                    this.handleChatAction('pay');
                }.bind(this)}
                    data-userid="01"
                >
                    {
                        this.state.isPayRead || (parseInt(localStorage.getItem('payMsgLastDateNew' + cookie.load('chatUid')) ? localStorage.getItem('payMsgLastDateNew' + cookie.load('chatUid')) : 0)) > (parseInt(localStorage.getItem('payMsgLastDateOld' + cookie.load('chatUid')) ? localStorage.getItem('payMsgLastDateOld' + cookie.load('chatUid')) : 0))
                            ?
                            <i className="ico_infoTipsRed"/>
                            :
                            null
                    }
                    <i className="pic fl ico-paymsg"/>
                    <span className="text fl">交易信息</span>
                </li>
                <li onClick={function () {
                    $('.sysMsg').hide();
                    $('.sysMsg.sys').show();
                    $('#msgUsername_chat').hide();
                    $('#msgUsername').show().text('系统消息');
                    $('#userImage').css({'background-image': 'url(data:image/png;base64,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)'});
                    localStorage.setItem('sysMsgLastDateOld' + cookie.load('chatUid'), localStorage.getItem('sysMsgLastDateNew' + cookie.load('chatUid')));
                    (parseInt(localStorage.getItem('sysMsgLastDateNew' + cookie.load('chatUid')) ? localStorage.getItem('sysMsgLastDateNew' + cookie.load('chatUid')) : 0)) > (parseInt(localStorage.getItem('sysMsgLastDateOld' + cookie.load('chatUid')) ? localStorage.getItem('sysMsgLastDateOld' + cookie.load('chatUid')) : 0))
                        ?
                        this.setState({isSysRead: true})
                        :
                        this.setState({isSysRead: false});
                    this.handleChatAction('sys');
                }.bind(this)}
                    data-userid="02"
                >
                    {
                        this.state.isSysRead || (parseInt(localStorage.getItem('sysMsgLastDateNew' + cookie.load('chatUid')) ? localStorage.getItem('sysMsgLastDateNew' + cookie.load('chatUid')) : 0)) > (parseInt(localStorage.getItem('sysMsgLastDateOld' + cookie.load('chatUid')) ? localStorage.getItem('sysMsgLastDateOld' + cookie.load('chatUid')) : 0))
                            ?
                            <i className="ico_infoTipsRed"/>
                            :
                            null
                    }
                    <i className="pic fl ico-sysmsg"/>
                    <span className="text fl">系统消息</span>
                </li>
                {item}
            </ul>
        )
    }
}

class Item extends React.Component {
    componentDidMount() {
        $('.chatMsg .right .list').scrollTop($('.chatMsg .right .list')[0].scrollHeight);
    }

    render() {
        let data = this.props.data;
        let type = data.type;
        let info = data.info;
        let mePic = this.props.mePic;
        let toUserImage = this.props.toUserImage;
        let date = this.props.date;
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
                        <li className="meChat">
                            <i className="pic" style={{'backgroundImage': 'url(' + mePic + ')'}}/>
                            <i className="ico_chatRight"/>
                            <div className="info">
                                <span
                                    dangerouslySetInnerHTML={{__html: utils.strURLReplace(info.replace(/ /g, '&nbsp;').replace(/\n/g, '<br/>'))}}/>
                            </div>
                        </li>
                        :
                        <li className="toChat">
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
}
class ItemMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatInfoOn: []
        }
    }

    componentDidMount() {
        $('.chatMsg .right .list').scrollTop($('.chatMsg .right .list')[0].scrollHeight);
    }

    componentDidUpdate() {
        //当前滚动条距离顶部距离
        let chatListScrollTop = $('.chatMsg .right .list')[0].offsetHeight + $('.chatMsg .right .list')[0].scrollTop;
        //文档滚动整个高度
        let chatListScrollHeight = $('.chatMsg .right .list ul').height() + 10;
        if ((chatListScrollHeight - chatListScrollTop) < 10) {
            $('.chatMsg .right .list').scrollTop($('.chatMsg .right .list')[0].scrollHeight);
        }
    }

    render() {
        let mePic = this.props.mePic;
        let toUserImage = this.props.toUserImage;
        let chatInfoOn = this.state.chatInfoOn.length > 0 ? this.state.chatInfoOn : this.props.data;//如果父级有属性

        let date = '';
        /*消息时间*/
        let dateToday = '';
        /*消息今天日期*/
        let dateLocalToday = moment(Date.parse(new Date()), "x").format('YYYY/MM/DD');
        /*本地今天时间*/

        let item = chatInfoOn.map(function (data, index) {
            dateToday = moment(data.date, "x").format('YYYY/MM/DD');
            /*转换成消息日期*/
            /*判断 是不是 今天，如果是今天 则不显示 日期*/
            if (dateLocalToday == dateToday) {
                date = moment(data.date, "x").format('HH:mm');
            } else {
                date = moment(data.date, "x").format('YYYY/MM/DD HH:mm');
            }
            /*判断前后时间 是不是 小于5 分钟 5 * 60 * 1000*/
            if (index > 0 && data.date - chatInfoOn[index - 1].date < 300000) {
                date = ''
            }
            return <Item data={data} key={index} _index={index} mePic={mePic} toUserImage={toUserImage} date={date}/>
        });
        return (
            <ul>
                {item}
            </ul>
        )
    }
}

class ChatMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatInfo: JSON.parse(localStorage.getItem('chatInfo')),
            chatInfoIsLoading: false,
            chatInfoOn: [],
            mePic: cookie.load('userImage'),
            toUserName: '',
            toUserImage: '',
            toUserId: '',
            payMsgList: [],
            payMsgList_start: 0,
            payMsgList_page: 10,
            sysMsgList: [],
            sysMsgList_start: 0,
            sysMsgList_page: 10,
        };
    }

    chatData(chatInfoOn, toUserName, toUserImage, toUserId) {
        this.setState({chatInfoOn: chatInfoOn, toUserName: toUserName, toUserImage: toUserImage, toUserId: toUserId});
    }

    /*查询交易消息列表*/
    _payMessageList(start, end, type) {
        let data = {
            start: start,
            end: end,
            type: type
        };
        let state = this.state;
        this.setState({payMsgList_start: state.payMsgList_start + state.payMsgList_page});
        $('#payMsgLoading').show();
        serviceApi('aMessageList', data, (data) => {
            $('#payMsgLoading').hide();
            if (data.list.length == 0) {
                $('#payMsgLoading').show().html('已加载完毕');
            }
            this.setState({payMsgList: state.payMsgList.concat(data.list)});
        }, (data) => {
            $('#payMsgLoading').hide();
            layer.msg(data.message)
        })
    }

    /*查询系统消息列表*/
    _sysMessageList(start, end, type) {
        let data = {
            start: start,
            end: end,
            type: type
        };
        let state = this.state;
        this.setState({sysMsgList_start: state.sysMsgList_start + state.sysMsgList_page});
        $('#sysMsgLoading').show();
        serviceApi('aMessageList', data, (data) => {
            $('#sysMsgLoading').hide();
            if (data.list.length == 0) {
                $('#sysMsgLoading').show().html('已加载完毕');
            }
            this.setState({sysMsgList: state.sysMsgList.concat(data.list)});
        }, (data) => {
            $('#sysMsgLoading').hide();
            layer.msg(data.message)
        })
    }

    componentDidMount() {
        let THIS = this;
        let clientHeight = window.innerHeight;//document.body.clientHeight
        let $chatMsg = $('.chat.chatMsg');
        let $chatMsgRightList = $('.chat.chatMsg .right .list');
        let $chatMsgLeftList = $('.chat.chatMsg .left .list');
        $chatMsg.css({'height': clientHeight - 70});
        $chatMsgRightList.css({height: clientHeight - 70 - 64 - 257});
        $chatMsgLeftList.css({height: clientHeight - 70 - 64});
        let stInit = $(window).scrollTop();
        if (stInit >= 70) {
            $chatMsg.css({'top': 0, height: clientHeight});
            $chatMsgRightList.css({height: clientHeight - 64 - 257});
            $chatMsgLeftList.css({height: clientHeight - 64});
        }
        $(window).scroll(function () {
            let st = $(window).scrollTop();
            if (st >= 70) {
                $chatMsg.css({'top': 0, height: clientHeight});
                $chatMsgRightList.css({height: clientHeight - 64 - 257});
                $chatMsgLeftList.css({height: clientHeight - 64});
            } else {
                $chatMsg.css({'top': 70 - st, height: clientHeight - 70 + st});
                $chatMsgRightList.css({height: clientHeight - 70 - 64 - 257 + st});
                $chatMsgLeftList.css({height: clientHeight - 70 - 64 + st});
            }
            $chatMsgRightList.scrollTop($chatMsgRightList[0].scrollHeight);
        });
        $('.chatMsg .list,.chatMsg textarea').niceScroll({cursorcolor: "#C1C1C1"});


        //交易信息
        this._payMessageList(this.state.payMsgList_start, this.state.payMsgList_page, 1);
        $('.sysMsg.pay').css({'height': clientHeight - 60}).niceScroll({cursorcolor: "#C1C1C1"});
        $(".sysMsg.pay").scroll(function () {
            var state = THIS.state;
            var divHeight = $(this).height();
            var nScrollHeight = $(this)[0].scrollHeight;
            var nScrollTop = $(this)[0].scrollTop;
            if (nScrollTop + divHeight + 10 >= nScrollHeight) {
                if ($('#payMsgLoading').html() != '已加载完毕') {
                    THIS._payMessageList(state.payMsgList_start, state.payMsgList_start + state.payMsgList_page, 1);
                }
            }
        });
        //系统信息
        this._sysMessageList(this.state.sysMsgList_start, this.state.sysMsgList_page, 2);
        $('.sysMsg.sys').css({'height': clientHeight - 60}).niceScroll({cursorcolor: "#C1C1C1"});
        $(".sysMsg.sys").scroll(function () {
            var state = THIS.state;
            var divHeight = $(this).height();
            var nScrollHeight = $(this)[0].scrollHeight;
            var nScrollTop = $(this)[0].scrollTop;
            if (nScrollTop + divHeight + 10 >= nScrollHeight) {
                if ($('#sysMsgLoading').html() != '已加载完毕') {
                    THIS._sysMessageList(state.sysMsgList_start, state.sysMsgList_start + state.sysMsgList_page, 2);
                }
            }
        });

        /*点击其他地方 销毁自己*/
        document.addEventListener('click', this.handleClickOther)//*其他地方*/
    }

    /*点击自己 冒泡*/
    handleClickMe(e) {
        e.stopPropagation() || e.nativeEvent.stopImmediatePropagation() || e.preventDefault();
    }

    handleClickOther() {
        chatUtils.chatMsgShow()
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOther);
        $(window).unbind('scroll');
    }

    render() {
        let state = this.state;
        return (
            <div className="chat chatMsg" onClick={this.handleClickMe}>
                <div className="left fl">
                    <div className="head">
                        最近联系：
                    </div>
                    <div className="list fl">
                        <UserListMain data={state.chatInfo} chatData={this.chatData.bind(this)}/>
                    </div>
                </div>
                <div className="right fl">
                    <div className="head">
                        <div className="userImage fl">
                            <i id="userImage" style={{backgroundImage: 'url(' + state.toUserImage + ')'}}/>
                        </div>
                        <div className="text">
                            <span id="msgUsername" style={{display: 'none'}}/>
                            <span id="msgUsername_chat">{state.toUserName ? state.toUserName : null}</span>
                            <span className="fr"/>
                        </div>
                    </div>
                    <div className="sysMsg pay fl">
                        {
                            state.payMsgList.length > 0 ?
                                <PayMsgListMain data={state.payMsgList}/>
                                :
                                <ul>
                                    <li className="loading">暂无交易消息</li>
                                </ul>
                        }
                    </div>
                    <div className="sysMsg sys fl">
                        {
                            state.sysMsgList.length > 0 ?
                                <SysMsgListMain data={state.sysMsgList}/>
                                :
                                <ul>
                                    <li className="loading">暂无系统消息</li>
                                </ul>
                        }
                    </div>
                    <div className="list fl">
                        <ItemMain data={this.props.storeState.chatInfoOn || state.chatInfoOn} mePic={state.mePic}
                                  toUserImage={state.toUserImage}
                                  toUserId={state.toUserId}/>
                    </div>
                    <div className="cont fl">
                        <TextArea toUser={
                            {
                                toUserName: state.toUserName,
                                toUserImage: state.toUserImage,
                                toUserId: state.toUserId
                            }
                        } isChatConn={this.props.storeState.isChatConn}/>
                    </div>
                </div>
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
)(ChatMsg);
const App = () => (
    <Provider store={store}>
        <Index />
    </Provider>
);

export default App;
