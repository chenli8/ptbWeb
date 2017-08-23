/**
 * Created by Kirk liu on 2017/7/24.
 */
import React from 'react';
import utils from '../../../public/js/utils';
class Budget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            priceType: this.props.priceType || 1,
            minPrice: this.props.minPrice || '',
            maxPrice: this.props.maxPrice || '',
            budgetTypeName: this.props.type == 1 ? ['可议价', '价格区间', '服务价格'] : ['可议价', '预算区间', '预算价格']
        };
    }

    componentDidMount() {

    }

    render() {
        let state = this.state;
        return (
            <div className="demandBudget">
                <div className="price fl">
                    {
                        state.budgetTypeName.map((data, index) => {
                            return (
                                <li key={data}>
                                    <i className={state.priceType == index + 1 ? "ico-radio on" : "ico-radio" }
                                       onClick={() => {
                                           this.setState({priceType: index + 1})
                                       }}
                                    />
                                    <span>{data}</span>
                                </li>
                            )
                        })
                    }
                </div>
                {
                    state.priceType == 2 ?
                        <div className="section fl">
                                <span>
                                    <input key="1" type="text" maxLength={9}
                                           onInput={(e) => {
                                               this.setState({minPrice: utils.priceCents(e.target.value)});
                                           }}
                                           onKeyUp={(e) => {
                                               utils.priceOnKeyUp(e.target);
                                           }}
                                           onBlur={(e) => {
                                               utils.priceOnBlur(e.target);
                                           }}
                                           defaultValue={utils.priceDollars(this.props.minPrice)}
                                    />
                                    <sub>¥</sub></span> -- <span>
                                <input key="2" type="text" maxLength={9}
                                       onInput={(e) => {
                                           this.setState({maxPrice: utils.priceCents(e.target.value)});
                                       }}
                                       onKeyUp={(e) => {
                                           utils.priceOnKeyUp(e.target);
                                       }}
                                       onBlur={(e) => {
                                           utils.priceOnBlur(e.target);
                                       }}
                                       defaultValue={utils.priceDollars(this.props.maxPrice)}
                                /> <sub>¥</sub></span>
                        </div>
                        :
                        state.priceType == 3 ?
                            <div className="section single fl">
                                    <span><input key="3" type="text" maxLength={9}
                                                 onInput={(e) => {
                                                     this.setState({
                                                         minPrice: utils.priceCents(e.target.value),
                                                         maxPrice: utils.priceCents(e.target.value)
                                                     });
                                                 }}
                                                 onKeyUp={(e) => {
                                                     utils.priceOnKeyUp(e.target);
                                                 }}
                                                 onBlur={(e) => {
                                                     utils.priceOnBlur(e.target);
                                                 }}
                                                 defaultValue={utils.priceDollars(this.props.maxPrice)}
                                    /> <sub>¥</sub></span>
                            </div>
                            :
                            null
                }
            </div>
        );
    }
}
export default Budget;