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
            fansExpend: false,
            onlineExpend: false
        };
        this.store = SearchStore;
    }

    handlePriceExpend(flag) {
        this.setState({priceExpend: flag, fansExpend: false, onlineExpend: false});
    }

    handleFansExpend(flag) {
        this.setState({fansExpend: flag, onlineExpend: false, priceExpend: false});
    }

    handleOnlineExpend(flag) {
        this.setState({onlineExpend: flag, priceExpend: false, fansExpend: false});
    }

    handleNum(s_price, e_price) {
        if (s_price == 0 && e_price == 0) {
            return 0;
        } else if (s_price.length == 0 && e_price.length != 0) {
            name = e_price + '以下';
        } else if (s_price.length != 0 && e_price.length == 0) {
            name = s_price + '以上';
        } else if (s_price.length != 0 && e_price.length != 0) {
            name = s_price + '-' + e_price;
        }
        return name;
    }

    handlePriceAuto(s_price, e_price) {
        // this.handlePriceExpend(false);
        var name = this.handleNum(s_price, e_price);
        if (name == 0) {
            SearchAction.handleAutoPrice(0, 0);
        } else {
            SearchAction.handleAutoPrice(3000, name);
        }
    }

    handleFansAuto(s_fans, e_fans) {
        //this.handleFansExpend(false);
        var name = this.handleNum(s_fans, e_fans);
        if (name == 0) {
            SearchAction.handleAutoFans(0, 0);
        } else {
            SearchAction.handleAutoFans(3000, name);
        }
        //SearchAction.handleAutoFans(3000, name);
    }

    handleOnlineAuto(s_online, e_online) {
        //this.handleOnlineExpend(false);
        var name = this.handleNum(s_online, e_online);
        if (name == 0) {
            SearchAction.handleAutoOnline(0, 0);
        } else {
            SearchAction.handleAutoOnline(3000, name);
        }
        //SearchAction.handleAutoOnline(3000, name);
    }

    handlePrice(index) {
        SearchAction.handlePrice(index);
    }

    handleFans(index) {
        SearchAction.handleFans(index);
    }

    handleOnline(index) {
        SearchAction.handleOnline(index);
    }

    handleDrop(index, dropType) {
        SearchAction.handleDrop(index, dropType)
    }

    handleToggle(dropType) {
        SearchAction.handleToggle(dropType);
    }

    render() {
        let data = this.state.data;
        let resultData = data.result;
        return (
            <div className="type">
                {/*<div className="item clear">
                    <div className="title">价格：</div>
                    <div className="child prices">
                        <SelectInput data={data.priceType} dropType="zbPrice" onDrop={this.handleDrop}
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
                                return <li key={"llkk" + index} onClick={this.handleFans.bind(this, index)}
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
                    <div className="title">平均在线人数：</div>
                    <div className="child prices">
                        <ul className="clear">
                            {data.online.map(function (data, index) {
                                return <li key={"le" + index} onClick={this.handleOnline.bind(this, index)}
                                           className={resultData.online.id == index ? 'curr' : ''}>{data}</li>
                            }.bind(this))}
                        </ul>
                    </div>
                    <div className="inputNum right_btn auto_define">
                        <a href="javascript:;" onClick={this.handleOnlineExpend.bind(this, true)}>自定</a>
                        {this.state.onlineExpend ?
                            <Auto onAuto={this.handleOnlineAuto.bind(this)} onExpend={this.handleOnlineExpend.bind(this)}
                                  title="自定义平均在线人数" price={resultData.online}/> : null}
                    </div>
                </div>
                <div className="item clear">
                    <div className="title">其他筛选：</div>
                    <div className="child select">
                        <div className="fl s_drop">
                            <span className="fl">平台：</span>
                            <SelectInput data={data.mediaType} dropType="plat" onDrop={this.handleDrop}
                                         isDisplayed={data.dropDisplayPlat} onToggle={this.handleToggle}
                                         currIndex={data.result.mediaType}/>
                        </div>
                        <div className="fl s_drop">
                            <span className="fl">地域：</span>
                            <SelectInput data={data.zone} dropType="zone" onDrop={this.handleDrop}
                                         isDisplayed={data.dropDisplayZone} onToggle={this.handleToggle}
                                         currIndex={data.result.zone.id}/>
                        </div>
                        <div className="fl s_drop">
                            <span className="fl">性别：</span>
                            <SelectInput data={data.sex} dropType="sex" onDrop={this.handleDrop}
                                         isDisplayed={data.dropDisplaySex} onToggle={this.handleToggle}
                                         currIndex={data.result.sex.id}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Filter;