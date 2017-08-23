/**
 * Created by Kirk liu on 2017/7/24.
 */
import React from 'react';
import cookie from 'react-cookie';
import utils from '../../../../../public/js/utils';

class Submit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        let phone = cookie.load('phone').toString();
        return (
            <div className="WriteDemand">
                <span>手机验证<b>(必填):</b> {phone.substring(0, 3) + utils.asterisk(4) + phone.substring(7, 11)}</span>
                {
                    /*isLogin ?
                     phone ?
                     <span> {phone.substring(0, 3) + utils.asterisk(4) + phone.substring(7, 11)} {}</span>
                     :
                     <div>
                     <input type="text" className="writeInput" placeholder="手机号"/>
                     <input type="text" className="wirteTest writeInput" placeholder="短信验证码"/>
                     <a href="javascript:;" className="getTest fr">获取短信验证</a>
                     </div>
                     :
                     null*/
                }
            </div>
        );
    }
}
export default Submit;