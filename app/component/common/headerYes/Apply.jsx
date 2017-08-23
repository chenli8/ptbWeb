/**
 * Created by Kirk liu on 2017/8/2.
 */
import React from 'react';
import urlManager from "../../../public/js/urlManager";

class Apply extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="apply">
                <span>
                    您暂时还未成为服务商
                </span>
                <span>
                    立刻入驻，马上开店
                </span>
                <a href={urlManager.pCreateShop + '#/0'}>申请入驻</a>
            </div>
        );
    }
}
export default Apply;