import React from 'react'
import Reflux from 'reflux'
import SelectInput from '../common/SelectInput.jsx'
import SearchAction from './SearchAction'
import SearchStore from './SearchStore'
import Auto from '../AutoBetween.jsx'
class Filter extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            priceExpend: false
        };
        this.store = SearchStore;
    }

    handleExpend(flag) {
        this.setState({priceExpend: flag});
    }

    handlePriceAuto(s_price, e_price) {
        var name = '';
        if (s_price == 0 && e_price == 0) {
            SearchAction.handleAutoPrice(0, 0);
            return false;
        } else if (s_price.length == 0 && e_price.length != 0) {
            name = e_price + '以下';
        } else if (s_price.length != 0 && e_price.length == 0) {
            name = s_price + '以上';
        } else if (s_price.length != 0 && e_price.length != 0) {
            name = s_price + '-' + e_price;
        }
        SearchAction.handleAutoPrice(3000, name);
    }

    handleChangeLabel(id) {
        SearchAction.handleCategory(id);
    }

    handlePrice(index) {
        SearchAction.handlePrice(index);
    }

    handleDrop(index, dropType) {
        SearchAction.handleDrop(index, dropType)
    }

    handleToggle(dropType) {
        SearchAction.handleToggle(dropType);
    }

    render() {
        let data = this.state.data, labelListDOM = null;
        let resultData = data.result;
        if (data.labelList.length) {
            labelListDOM = data.labelList.map(function (data, index) {
                return <li key={index + data.typeId} onClick={this.handleChangeLabel.bind(this, data.typeId)}
                           className={resultData.category.id == data.typeId ? 'curr' : ''}>{data.name}</li>;
            }.bind(this))
        }

        return (
            <div className="type">
                <div className="item clear">
                    <div className="title">常见分类：</div>
                    <div className="child">
                        <ul className="clear S_type">
                            {labelListDOM}
                        </ul>
                    </div>
                </div>
                {/*<div className="item clear" style={{display:'none'}}>
                    <div className="title">
                        价格：
                    </div>
                    <div className="child prices">
                        <SelectInput data={data.priceType} dropType="d8" onDrop={this.handleDrop}
                                     isDisplayed={data.dropDisplayPriceType} onToggle={this.handleToggle}
                                     currIndex={data.result.priceType.id}/>
                        <ul className="clear">
                            {data.betweenPrice.map(function (data, index) {
                                return <li key={"ae" + index} onClick={this.handlePrice.bind(this, index)}
                                           className={resultData.price.id == index ? 'curr' : ''}>{data}</li>
                            }.bind(this))}
                        </ul>
                    </div>
                    <div className="inputNum right_btn auto_define">
                        <a href="javascript:;" onClick={this.handleExpend.bind(this, true)}>自定</a>
                        {this.state.priceExpend ? <Auto onAuto={this.handlePriceAuto} onExpend={this.handleExpend.bind(this)}
                                                        title="自定义报价" price={resultData.price}/> : null}
                    </div>
                </div>*/}
                <div className="item clear">
                    <div className="title">其他筛选：</div>
                    <div className="child select">
                        <div className="fl s_drop">
                            <span className="fl">头条均阅读：</span>
                            <SelectInput data={data.h1Read} dropType="d1" onDrop={this.handleDrop}
                                         isDisplayed={data.dropDisplayRead} onToggle={this.handleToggle}
                                         currIndex={data.result.read.id}/>
                        </div>
                        <div className="fl s_drop">
                            <span className="fl">头条均点赞：</span>
                            <SelectInput data={data.h1Zan} dropType="d2" onDrop={this.handleDrop}
                                         isDisplayed={data.dropDisplayZan} onToggle={this.handleToggle}
                                         currIndex={data.result.zan.id}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Filter;