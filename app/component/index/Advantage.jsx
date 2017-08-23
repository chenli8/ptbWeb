/**
 * Created by Kirk liu on 2017/7/19.
 */
import React from 'react';


class Advantage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin:false
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="advantage">
                <div className="advantageTitle">
                    品推宝平台优势
                </div>
                <div className="advantageCon">
                    <dl>
                        <dt className="platformGuarantee">
                        </dt>
                        <dd>
                            平台担保，安心交易
                        </dd>
                    </dl>
                    <dl>
                        <dt className="fastMoney">
                        </dt>
                        <dd>
                            缩短账期，快速回款
                        </dd>
                    </dl>
                    <dl>
                        <dt className="Certification">
                        </dt>
                        <dd>
                            资质认证，靠谱买卖
                        </dd>
                    </dl>
                    <dl>
                        <dt className="massiveResources">
                        </dt>
                        <dd>
                            海量资源，优质服务
                        </dd>
                    </dl>
                    <dl>
                        <dt className="financialSecurity">
                        </dt>
                        <dd>
                            信用体系，金融保障
                        </dd>
                    </dl>
                </div>
            </div>
        );
    }
}
export default Advantage;