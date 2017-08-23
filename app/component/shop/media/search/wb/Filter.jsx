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
            priceExpend: false,
            fansExpend:false
        };
        this.store = SearchStore;
    }
    handlePriceExpend (flag) {
        this.setState({priceExpend: flag,fansExpend:false});
    }
    handleFansExpend (flag) {
        this.setState({fansExpend: flag,priceExpend:false});
    }
    handleNum (s_price, e_price) {
        if (s_price == 0 && e_price == 0) {
            return 0;
        } else if (s_price.length == 0 && e_price.length != 0) {
            name = e_price + '以下';
        } else if (s_price.length != 0 && e_price.length == 0) {
            name = s_price + '以上';
        } else if (s_price.length != 0 && e_price.length != 0)  {
            name = s_price + '-' + e_price;
        }
        return name;
    }
    handlePriceAuto (s_price, e_price) {
        //this.handlePriceExpend(false);
        var name = this.handleNum(s_price, e_price);
        if(name == 0){
            SearchAction.handleAutoPrice(0, 0);
        }else{
            SearchAction.handleAutoPrice(3000, name);
        }

    }
    handleFansAuto (s_fans,e_fans) {
        //this.handlePriceExpend(false);
        var name = this.handleNum(s_fans, e_fans);
        if(name == 0){
            SearchAction.handleAutoFans(0, 0);
        }else{
            SearchAction.handleAutoFans(3000, name);
        }
    }
    handleChangeLabel (id) {
        SearchAction.handleCategory(id);
    }
    handlePrice (index) {
        SearchAction.handlePrice(index);
    }
    handleFans (index) {
        SearchAction.handleFans(index);
    }
    handleDrop (index, dropType) {
        SearchAction.handleDrop(index, dropType)
    }
    handleToggle (dropType) {
        SearchAction.handleToggle(dropType);
    }
    render () {
        /*var autoHeight = this.state.moreExpend ? 'auto' : '30px',
            autoCls = this.state.moreExpend ? 'arrowGrayDown transform180' : 'arrowGrayDown';*/
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
                {/*<div className="item clear">
                    <div className="title">价格：</div>
                    <div className="child prices wb">
                        <SelectInput data={data.priceType} dropType="jq" onDrop={this.handleDrop}
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
                        <a href="javascript:;" onClick={this.handlePriceExpend.bind(this, true)}>自定</a>
                        {this.state.priceExpend ?
                            <Auto onAuto={this.handlePriceAuto.bind(this)} onExpend={this.handlePriceExpend.bind(this)}
                                  title="自定义报价" price={resultData.price}/> : null}
                    </div>
                </div>*/}
                <div className="item clear">
                    <div className="title">粉丝数：</div>
                    <div className="child prices">
                        <ul className="clear">
                            {data.fans.map(function (data, index) {
                                return <li key={"ce" + index} onClick={this.handleFans.bind(this, index)}
                                           className={resultData.fans.id == index ? 'curr' : ''}>{data}</li>
                            }.bind(this))}
                        </ul>
                    </div>
                    <div className="inputNum right_btn auto_define">
                        <a href="javascript:;" onClick={this.handleFansExpend.bind(this, true)}>自定</a>
                        {this.state.fansExpend ?
                            <Auto onAuto={this.handleFansAuto.bind(this)} onExpend={this.handleFansExpend.bind(this)}
                                  title="自定义粉丝数" price={resultData.fans}/> : null}
                    </div>
                </div>
                <div className="item clear">
                    <div className="title">其他筛选：</div>
                    <div className="child select">
                        <div className="fl s_drop">
                            <span className="fl">篇均转发：</span>
                            <SelectInput data={data.spreads} dropType="zf" onDrop={this.handleDrop}
                                         isDisplayed={data.dropDisplaySpread} onToggle={this.handleToggle}
                                         currIndex={data.result.spread.id}
                            />
                        </div>
                        <div className="fl s_drop">
                            <span className="fl">篇均评论：</span>
                            <SelectInput data={data.comments} dropType="pl" onDrop={this.handleDrop}
                                         isDisplayed={data.dropDisplayComment} onToggle={this.handleToggle}
                                         currIndex={data.result.comment.id}/>
                        </div>
                        <div className="fl s_drop">
                            <span className="fl">篇均点赞：</span>
                            <SelectInput data={data.zan} dropType="dz" onDrop={this.handleDrop}
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