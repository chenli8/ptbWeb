/**
 * Created by Kirk liu on 2017/7/19.
 */
import React from 'react';
import urlManager from './../../public/js/urlManager'
import utils from './../../public/js/utils'
class HeaderNo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        let url = window.location.href;
        return (
            <div>
                {
                    url.indexOf('loginReg.html') != -1 ?
                        null
                        :
                        <div className="login fr">
                            <i className="loginImg"> </i>
                            <div className="loginStatus fl">
                                <a href="javascript:;" onClick={() => utils.loginReturnUrl()}>登录</a>
                                <i className="tip"> </i>
                                <a href={urlManager.pLoginReg + '#/Reg'}>注册</a>
                            </div>
                        </div>
                }
            </div>
        );
    }
}
export default HeaderNo;