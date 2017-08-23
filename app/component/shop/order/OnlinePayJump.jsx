import React from 'react'
import $ from 'jquery';
/*Header Footer 必须引入 否则 打公共代码会受到影响*/
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import serviceApi from '../../../public/js/serviceApi';
import utils from '../../../public/js/utils';
import layer from '../../../public/js/layer';
import cookie from 'react-cookie';

class OnlinePayJump extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        let data = {
            rechargeAmount: utils.urlParam('rechargeAmount', window.location.href),
            payType: utils.urlParam('payType', window.location.href),
            orderNo: utils.urlParam('orderNo', window.location.href),
            receiveUserId: utils.urlParam('userId', window.location.href),
            moneyType: utils.urlParam('moneyType', window.location.href),
            rechargeOrderType: 2,
            payMethod: 1//支付方式  1 线上支付  2 线下对公账户充值
        };
        this.postApi = serviceApi('aOrderPay', data, (data) => {
            cookie.save('rechargeOrderNo', data.rechargeOrderNo);
            let orderInfo = data.orderInfo.replace('target="_blank"', '');
            $('body').html(orderInfo);
            /*开发票 str*/
            localStorage.removeItem("todos-list");
            let todos_list = {
                "orderNo": data.rechargeOrderNo,
                "createdTime": '',
                "payMethod": data.payMethod,
                "payType": data.payType,
                "money": '',
                "detailId": data.rechargeOrderId
            };
            localStorage.setItem("todos-list", JSON.stringify(todos_list));

        }, (data) => {
            layer.msg(data.message)
        });

    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default OnlinePayJump;