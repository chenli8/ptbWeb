/**
 * Created by Kirk liu on 2017/7/29.
 */
import React,{Component} from 'react';
import moment from 'moment-kirk';
import utils from '../../../../public/js/utils';
import urlManager from '../../../../public/js/urlManager';
import PriceFormat from '../../../common/PriceFormat';
class Item extends Component {
    render() {
        let deamand = this.props.demand;
        let currentTime = Date.parse(new Date());
        let timeStr = "已结束";
        if (deamand.status != 3 && deamand.dueTime && deamand.dueTime > currentTime) {
            let timeOver = ((deamand.dueTime - currentTime) / 1000 / 60 / 60).toFixed(1);
            if (timeOver >= 24) {
                timeOver = (timeOver / 24).toFixed(0) + '天'
            } else {
                timeOver = timeOver + '小时'
            }
            timeStr = timeOver + "后结束";
        }

        return (
            <div className="Item">
                <div className="itemLeft fl">
                    <div className="headline commonSingleLine">
                        <a href={urlManager.pDemandDetail + '#/' + deamand.id}>{deamand.requireName}</a>
                    </div>
                    <div className="subline">&nbsp;{deamand.requireDesc}</div>
                    <div className="specificInfo ">
                        <div className="times fl">
                            发布时间：{moment(deamand.addTime, "x").format('YYYY-MM-DD HH:mm') + '\n'}
                        </div>
                        <div className="users fl">
                            发布人：<span className="publicUser">{deamand.userName}</span>
                        </div>
                    </div>
                </div>
                <div className="itemRight fr">
                    <ul>
                        <li>
                            <PriceFormat data={{
                                type:deamand.budgetType,
                                min:deamand.budgetMinPrice,
                                max:deamand.budgetMaxPrice,
                                position:'list'
                            }}/>

                        </li>
                        <li>
                            {deamand.answerNum}人应答需求
                            <span className="over">{"剩余"+ (deamand.maxAnswerNum - deamand.answerNum) + "个应答机会"}</span>
                        </li>
                        <li>
                            <span>{timeStr}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Item;