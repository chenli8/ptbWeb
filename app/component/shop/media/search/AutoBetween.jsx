import React from 'react'
class Auto extends React.Component {
    handleExpend() {
        // this.props.onExpend(false);
    }

    handlePriceAuto(e) {
        e.nativeEvent.stopImmediatePropagation();
        var s_price = this.refs.s_price.value,
            e_price = this.refs.e_price.value;
        this.props.onExpend(false);
        if (s_price.length == 0 && e_price.length == 0) {
            this.props.onAuto(0, 0);
        } else {
            this.props.onAuto(s_price, e_price);
        }
        //this.props.onExpend(false);
    }

    regularCardID(e) {
        //e.target.value = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = e.target.value.replace(/^([^0-9]*)(?:0(?=[1-9]))?([1-9][0-9]*|0|)(([^0-9]*)([0-9]*))*$/, '$2');
    }

    tenThousandUnit(data) {
        return data.substr(0, data.indexOf('万')) * 10000;
    }

    calculatePrice(price) {
        var data = price, minPrice = 0, maxPrice = 0;
        if (data == 0 || data == '不限') {
            return {minPrice: '', maxPrice: ''};
        } else if (data.indexOf('以上') != -1) {
            minPrice = data.indexOf('万') != -1 ? this.tenThousandUnit(data) : data.substr(0, data.indexOf('以')) * 1;
            return {minPrice: minPrice, maxPrice: ''};
        } else if (data.indexOf('以下') != -1) {
            maxPrice = data.indexOf('万') != -1 ? this.tenThousandUnit(data) : data.substr(0, data.indexOf('以')) * 1;
            return {minPrice: '', maxPrice: maxPrice};
        } else if (data.indexOf('-') != -1) {
            var tempData = data.split('-');
            minPrice = tempData[0].indexOf('万') != -1 ? this.tenThousandUnit(tempData[0]) : tempData[0] * 1;
            maxPrice = tempData[1].indexOf('万') != -1 ? this.tenThousandUnit(tempData[1]) : tempData[1] * 1;
            return {minPrice: minPrice, maxPrice: maxPrice};
        }
    }

    componentDidMount() {
        document.getElementsByTagName('body')[0].addEventListener('click', function (e) {
            var stopTarget = e.target.getAttribute('class') ? e.target.getAttribute('class').indexOf('keyNumIndetity') : -1;
            if (stopTarget != -1) {
            } else {
                this.props.onExpend(false);
            }
        }.bind(this), false);
    }

    render() {
        var defaultPrice = this.calculatePrice(this.props.price.name);
        return (
            <div className="inputNum keyNumIndetity" key="b1">
                <div className="clear keyNumIndetity">
                    <div className="fl keyNumIndetity">{this.props.title + ':'}</div>
                    {/*<div className="fr"><a href="javascript:;" onClick={this.handleExpend}>关闭</a></div>*/}
                </div>
                <div className="clear keyNumIndetity">
                    <div className="fl">
                        <input type="text" ref="s_price" defaultValue={defaultPrice.minPrice}
                               onKeyUp={this.regularCardID} className="keyNumIndetity"/>
                        <span className="line keyNumIndetity"/>
                        <input type="text" ref="e_price" defaultValue={defaultPrice.maxPrice}
                               onKeyUp={this.regularCardID} className="keyNumIndetity"/>
                    </div>
                    <div className="fr">
                        <a href="javascript:;" onClick={this.handlePriceAuto.bind(this)} className="keyNumIndetity">确定</a>
                    </div>
                </div>
            </div>
        )
    }
}
export default Auto;