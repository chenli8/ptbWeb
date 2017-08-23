/**
 * Created by Kirk liu on 2017/7/22.
 */
import React from 'react';
import serviceApi from '../../../../public/js/serviceApi';
import utils from '../../../../public/js/utils';
import urlManager from '../../../../public/js/urlManager';

class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            enterprise: {},
            personal: {},
            position: {}
        };
    }

    getAuthState() {
        serviceApi('aAuthStateInfo', {}, (data) => {
            this.setState({
                isLoad: true,
                enterprise: data.enterprise,
                personal: data.personal,
                position: data.position
            })
        }, () => {

        });
    }

    componentDidMount() {
        this.getAuthState();
    }

    render() {
        let state = this.state;
        let userInfo = this.props.userInfo;
        let authType = userInfo.authType;
        let realNameAuth = authType.substring(0, 1);
        let companyAuth = authType.substring(1, 2);
        return (
            <div className="auth fl">
                <div className="title fl">
                    身份认证
                </div>
                {
                    state.isLoad ?
                        <div className="content fl">
                            <li>
                                <div className="line">
                                    <div className="fl">企业认证</div>
                                    <div className="fr">{state.enterprise.enterpriseName}</div>
                                </div>
                                {
                                    companyAuth == 0 ?
                                        <a href={urlManager.pCreateShop + '#/Company/Index'} title="点击去认证"><i className="ico-auth-no fl"/></a>
                                        : companyAuth == 1 ?
                                        <i className="ico-auth-md fl"/>
                                        : companyAuth == 2 ?
                                            <a href={urlManager.pCreateShop + '#/Company/Index'} title="点击去认证"><i className="ico-auth-fail fl"/></a>
                                            : companyAuth == 3 ?
                                                <i className="ico-auth-ok fl"/>
                                                :
                                                null
                                }
                            </li>
                            <li>
                                <div className="line">
                                    <div className="fl">实名认证</div>
                                    <div className="fr">
                                        {state.personal.fullName ? state.personal.fullName.substring(0, 1) + utils.asterisk(state.personal.fullName.length - 1) : null}
                                    </div>
                                </div>
                                {
                                    realNameAuth == 0 ?
                                        <a href={urlManager.pCreateShop + '#/RealName/Index'} title="点击去认证"><i className="ico-auth-no fl"/></a>
                                        : realNameAuth == 1 ?
                                        <i className="ico-auth-md fl"/>
                                        : realNameAuth == 2 ?
                                            <a href={urlManager.pCreateShop + '#/RealName/Index'} title="点击去认证"><i className="ico-auth-fail fl"/></a>
                                            : realNameAuth == 3 ?
                                                <i className="ico-auth-ok fl"/>
                                                :
                                                null
                                }
                            </li>
                        </div>
                        :
                        null
                }
            </div>
        );
    }
}
export default Authentication;