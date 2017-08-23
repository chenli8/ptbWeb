/**
 * Created by Kirk liu on 2017/7/22.
 */
import React from 'react';
import cookie from 'react-cookie';
import serviceApi from './../../../public/js/serviceApi';
import layer from './../../../public/js/layer';
import chatUtils from './../chat/chatUtils';
import urlManager from '../../../public/js/urlManager';
class Bottom extends React.Component {
    handleIsLoginOut() {
        serviceApi('aLoginout', {}, () => {
            cookie.remove('token');
            cookie.remove('userImage');
            cookie.remove('nickName');
            cookie.remove('chatUid');
            cookie.remove('shopId');
            chatUtils.connClose();// 环信退出
            window.location.href = urlManager.pIndex;
        }, (data) => {
            if (data.code == 1000) {
                window.location.href = urlManager.pIndex;
            }
            layer.msg(data.message);
        });
    }

    render() {
        return (
            <div className="bottom fl">
                <a href={urlManager.pAccount}>账号设置</a>
                <a href="javascript:;" onClick={this.handleIsLoginOut.bind(this)}>退出登录</a>
            </div>
        )
    }
}

export default Bottom;