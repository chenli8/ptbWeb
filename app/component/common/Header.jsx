/**
 * Created by Kirk liu on 2017/7/19.
 */
import React from 'react'
import cookie from 'react-cookie'
import HeaderNo from './HeaderNo'
import HeaderYes from './headerYes/Index'
import urlManager from './../../public/js/urlManager'
import serviceApi from '../../public/js/serviceApi'
import utils from '../../public/js/utils'
import chatUtils from '../common/chat/chatUtils'

import ChatFloatWindow from '../common/chat/ChatFloatWindow'

import '../../public/css/common.css'
import '../../public/css/chat.css'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            data: ''
        };
    }

    handleLoginInfo() {
        serviceApi('aUserInfo', {}, (data) => {
            /*判断特殊情况下 没有以下值 就保存 str */
            if (!cookie.load('token')) {
                cookie.save('token', data.userInfo.token);
            }
            if (!cookie.load('userImage')) {
                cookie.save('userImage', data.userInfo.headImg);
            }
            if (!cookie.load('nickName')) {
                cookie.save('nickName', data.userInfo.nickName);
            }
            if (!cookie.load('chatUid')) {
                cookie.save('chatUid', data.userInfo.userId);
            }
            if (!cookie.load('shopId')) {
                cookie.save('shopId', data.userInfo.shopId)
            }
            /*判断特殊情况下 没有以下值 就保存 end */

            this.setState({isLogin: true, data: data.userInfo});
            chatUtils.connOpen();// 建立环信连接

            /* 交易信息 */
            serviceApi('aMessageList', {start: 0, end: 1, type: 1}, (data) => {
                //最新一条消息时间对比
                localStorage.setItem('payMsgLastDateNew' + cookie.load('chatUid'), data.list.length > 0 ? data.list[0].pushTime : 0);
                /*判断交易消息是否显示红点*/
                if (data.list.length > 0 && data.list[0].pushTime > parseInt(localStorage.getItem('payMsgLastDateOld' + cookie.load('chatUid')) ? localStorage.getItem('payMsgLastDateOld' + cookie.load('chatUid')) : 0)) {
                    chatUtils.isChatPayRead(1);
                } else {
                    chatUtils.isChatPayRead(0);
                }
            }, (data) => {
                console.log('交易信息' + data.message)
            });
            /* 系统信息 */
            serviceApi('aMessageList', {start: 0, end: 1, type: 2}, (data) => {
                localStorage.setItem('sysMsgLastDateNew' + cookie.load('chatUid'), data.list.length > 0 ? data.list[0].pushTime : 0);
                /*判断系统消息是否显示红点*/
                if (data.list.length > 0 && data.list[0].pushTime > parseInt(localStorage.getItem('sysMsgLastDateOld' + cookie.load('chatUid')) ? localStorage.getItem('sysMsgLastDateOld' + cookie.load('chatUid')) : 0)) {
                    chatUtils.isChatSysRead(1);
                } else {
                    chatUtils.isChatSysRead(0);
                }
            }, (data) => {
                console.log('交易信息' + data.message)
            });


        }, (data) => {
            if (data.code === 1000) {
                cookie.remove('token');
                cookie.remove('userImage');
                cookie.remove('nickName');
                cookie.remove('chatUid');
                cookie.remove('shopId');
                chatUtils.connClose();// 环信退出
                window.location.href = urlManager.pLoginReg;
            }
        })
    }

    handleIsLogin() {
        if (cookie.load('token')) {
            this.handleLoginInfo();
        } else {
            let url = window.location.href;
            /*以下是不需要登录的页面*/
            if (url.indexOf('html') == -1 /*首页*/
                || url.indexOf('index.html') != -1    /*首页*/
                || url.indexOf('loginReg.html') != -1    /*登录注册页*/
                || url.indexOf('demand.html') != -1  /*需求大厅*/
                || url.indexOf('demandDetail.html') != -1  /*需求详情*/
                || url.indexOf('service.html') != -1  /*服务大厅*/
                || url.indexOf('agreement.html') != -1  /*平台规则*/
                || url.indexOf('shopDetail.html') != -1  /*店铺详情*/
                || url.indexOf('serviceDetail') != -1  /*服务详情*/
                || url.indexOf('mediaDetail') != -1  /*媒体详情*/
                || url.indexOf('LoginPassword') != -1  /*登录密码修改*/
                || url.indexOf('media') != -1  /*媒体库*/
                || url.indexOf('help') != -1  /*帮助*/
                || url.indexOf('notice') != -1  /*公告*/
                || url.indexOf('financial.html') != -1  /*金融*/
                || url.indexOf('about.html') != -1  /*企业介绍*/
            ) {

            } else {
                utils.loginReturnUrl()
            }
        }
    }

    componentDidMount() {
        /*如果是第三方登录 保存token*/
        if (utils.urlParam('LoginSource') == 'wx') {
            cookie.save('token', utils.urlParam('token'));
            window.location.href = urlManager.pIndex
        }else{
            this.handleIsLogin();
        }
    }

    render() {
        let url = window.location.href;
        return (
            <div className="header headerYes">
                <div className="content">
                    {
                        url.indexOf('financial') != -1 ?
                            <a href={urlManager.pFinancial}>
                                <div className="logoFinancial fl"/>
                            </a>
                            :
                            <a href={urlManager.pIndex}>
                                <div className="logo fl"/>
                            </a>
                    }
                    {
                        url.indexOf('financial') != -1 ?
                            <div className={"nav fl " + (url.indexOf('financial') != -1 ? 'financial' : '')}>
                                <a href={urlManager.pFinancial + '#/ProjectCredit'}
                                   className={url.indexOf('ProjectCredit') != -1 ? 'on' : null}
                                >保理 {url.indexOf('ProjectCredit') != -1 ? <i className="ico-half"/> : null} </a>
                                <a href={urlManager.pFinancial + '#/Factoring'}
                                   className={url.indexOf('Factoring') != -1 ? 'on' : null}
                                >项目贷 {url.indexOf('Factoring') != -1 ? <i className="ico-half"/> : null} </a>

                            </div>
                            :
                            <div className="nav fl">
                                <a href={urlManager.pDemand}
                                   target={url.indexOf('index.html') != -1 ? "_blank" : "_self" }
                                   className={url.indexOf('demand') != -1 ? 'on' : null}
                                >需求大厅</a>
                                <a href={urlManager.pService + '?date=' + new Date().getTime() + '#/ShopService'}
                                   target={url.indexOf('index.html') != -1 ? "_blank" : "_self" }
                                   className={url.indexOf('ShopService') != -1 ? 'on' : null}
                                >服务大厅</a>
                                <a href={urlManager.pService + '?date=' + new Date().getTime() + '#/ShopSupplier'}
                                   target={url.indexOf('index.html') != -1 ? "_blank" : "_self" }
                                   className={url.indexOf('ShopSupplier') != -1 ? 'on' : null}
                                >服务商库</a>
                                <a href={urlManager.pMediaSearch}
                                   target={url.indexOf('index.html') != -1 ? "_blank" : "_self" }
                                   className={url.indexOf('media') != -1 ? 'on' : null}
                                >新媒体库</a>
                                <a href={urlManager.pFinancial}
                                   target={url.indexOf('index.html') != -1 ? "_blank" : "_self" }
                                >品推金融</a>
                            </div>
                    }
                    {
                        this.state.isLogin ?
                            <HeaderYes data={this.state.data}/>
                            :
                            <HeaderNo/>
                    }
                    {
                        url.indexOf('financial') != -1 ?
                            <a href={urlManager.pIndex}
                               className={"backIndex " + (cookie.load('token') ? '' : 'loginNo')}
                            >品推宝首页</a>
                            :
                            null
                    }
                </div>
                <ChatFloatWindow />
            </div>
        );
    }
}
export default Header;