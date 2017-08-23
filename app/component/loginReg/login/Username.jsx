/**
 * Created by Kirk liu on 2017/7/21.
 */
import React from 'react';
import cookie from 'react-cookie';
import utils from '../../../public/js/utils';
import Submit from './Submit';

class username extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                api: 'aLogin',
                info: {
                    username: cookie.load('username'),
                    password: ''
                }
            },
            loginType: 1
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div className="login fl">
                    <div className="username fl">
                        <i className="ico-loginReg-username"/>
                        <input type="text" placeholder="手机号" maxLength={11}
                               defaultValue={this.state.userInfo.info.username}
                               onInput={(e) => {
                                   utils.inputNum(e);
                                   let userInfo = this.state.userInfo;
                                   userInfo.info.username = e.target.value;
                                   this.setState({userInfo: userInfo});
                               }}
                               onKeyPress={(e) => {
                                   if (e.which === 13) {
                                       this.refs.submit.login()
                                   }
                               }}
                        />
                    </div>
                    <div className="password fl">
                        <i className="ico-loginReg-password"/>
                        <input type="password" placeholder="密码" maxLength={25}
                               onInput={(e) => {
                                   let userInfo = this.state.userInfo;
                                   userInfo.info.password = e.target.value;
                                   this.setState({userInfo: userInfo});
                               }}
                               onKeyPress={(e) => {
                                   if (e.which === 13) {
                                       this.refs.submit.login()
                                   }
                               }}
                        />
                    </div>
                </div>
                <Submit {...this.state} ref="submit"/>
            </div>
        );
    }
}
export default username;