/**
 * Created by Kirk liu on 2017/8/10.
 */
import React from 'react';
import urlManager from '../../../../public/js/urlManager';
class Buyer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="buyer">
                <div className="step1"/>
                <div className="step2"/>
                <div className="step3"/>
                <div className="step4"/>
                <div className="step5"/>
                <div className="step6"/>
                <p>图片中涉及的所有协议及规定，请到<a href={urlManager.pAgreement} className="buyerColor" target="_black">平台规则</a>中查阅。</p>
            </div>
        );
    }
}
export default Buyer;