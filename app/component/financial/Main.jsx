/**
 * Created by Kirk liu on 2017/8/12.
 */
import React from 'react';
import cookie from 'react-cookie';
import utils from '../../public/js/utils';
import urlManager from '../../public/js/urlManager';
import serviceApi from '../../public/js/serviceApi';
import chatUtils from '../common/chat/chatUtils';
import '../../public/css/financial.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            masterAccountMoney: '',
            imgCode: ''
        };
    }

    getDCount() {
        serviceApi('account', {}, (data) => {
            this.setState({masterAccountMoney: data.masterAccountMoney})
        }, () => {

        })
    }

    componentDidMount() {
        this.getDCount();
    }

    render() {
        let state = this.state;
        return (
            <div className="factoring">
                <div className="factBanner">
                    <div className="fl banners"/>
                    <div className="fr loginUser">
                        <div className="uerInfo">
                            {
                                cookie.load('token') ?
                                    <dl>
                                        <a href={urlManager.pBuyerCenter}>
                                            <dt style={{backgroundImage: 'url(' + cookie.load('userImage') + ')'}}/>
                                            <dd>{cookie.load('nickName')}</dd>
                                        </a>
                                    </dl>
                                    :
                                    <dl>
                                        <dt/>
                                        <dd>Hi, 欢迎回来！</dd>
                                    </dl>
                            }
                        </div>
                        {
                            cookie.load('token') ?
                                <div className="userMoney">
                                    <div className="fl">
                                        <span>总资产</span>
                                        <b className="userBrand">¥{state.masterAccountMoney ? utils.priceDollars(state.masterAccountMoney) : 0}</b>
                                    </div>
                                    <div className="fl">
                                        <span>待还款</span>
                                        <b>¥0</b>
                                    </div>
                                </div>
                                :
                                <div className="userMoney">
                                    <a href="javascript:;" onClick={() => utils.loginReturnUrl()} className="loginBtn">登陆品推宝</a>
                                </div>
                        }
                        <div className={"userCont " + (cookie.load('token') ? 'on' : '')}>
                            <a href={urlManager.pBuyerCenter} className="myWallet" />
                            <a href={urlManager.pAccount} className="myAccount" />
                            <a href="javascript:;" onClick={()=>chatUtils.chatServiceShow()} className="myHelp" />
                        </div>
                        <div className="platforms">
                        </div>
                    </div>
                </div>
                <div className="subBanner">
                    <a href="#/Factoring">
                        <div className="fr project">
                        </div>
                    </a>
                    <a href="#/ProjectCredit">
                        <div className="fl protect">
                        </div>
                    </a>
                </div>

                <a href="#/ProjectCredit">
                    <div className="projectCon projectCon2">
                        <div className="Application pro2"/>
                        <div className="money3"/>
                        <div className="moneyBtm"/>
                    </div>
                </a>
                <a href="#/Factoring">
                    <div className="projectCon projectCon1">
                        <div className="Application pro1">
                        </div>
                        <div className="money1"/>
                        <div className="money2"/>
                    </div>
                </a>

            </div>
        );
    }
}
export default Main;