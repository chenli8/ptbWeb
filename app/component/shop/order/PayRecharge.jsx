/**
 * Created by Kirk liu on 2017/8/4.
 */
import React,{Component} from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import '../../../public/css/orderbuttons.css';
/*
*
http://test.pintuibao.cn/payRecharge.html#/RechargeSuccess
http://test.pintuibao.cn/static/pc/payRecharge.html#/RechargeSuccess?body=%E5%93%81%E6%8E%A8%E5%AE%9D%E8%B4%A6%E6%88%B7%E5%85%85%E5%80%BC&
*
* */
class PayRecharge extends Component {
    render() {
        return (
            <div>
                <Header/>
                    <div className="payRecharge">
                        <div className="cont">
                            <i className="ico-auth-success" />
                            <span>支付成功</span>
                        </div>
                    </div>
                <Footer/>
            </div>
        );
    }
}

export default PayRecharge;