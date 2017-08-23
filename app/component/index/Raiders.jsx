/**
 * Created by Kirk liu on 2017/7/19.
 */
import React from 'react';
import urlManager from '../../public/js/urlManager.js';

class Raiders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="raiders">
                <div className="buyerRaiders fl">
                    <a href={urlManager.pHelp+"#/Novice/Buyer"} className="watchBtn" target="_black">去看看</a>
                </div>
                <div className="sellerRaiders fr">
                    <a href={urlManager.pHelp+"#/Novice/Seller"} className="watchBtn"  target="_black">去看看</a>
                </div>
            </div>
        );
    }
}
export default Raiders;