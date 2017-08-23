import React from 'react'
import Reflux from 'reflux'
import SearchAction from './SearchAction';
import SearchStore from './SearchStore';

class Result extends Reflux.Component {
    constructor(props){
        super(props);
        this.state = {}; // our store will add its own state to the component's
        this.store = SearchStore; // <- just assign the store class itself
    }
    handleDel(delKey) {
        SearchAction.handleDel(delKey);
    }

    render() {
        let resultData = this.state.data.result;
        return (
            <div className="conditions">
                <span>筛选条件：</span>
                {resultData.key ? <span className="item" key="p1" onClick={this.handleDel.bind(this, 1)}>
                    {'关键字:' + resultData.key}<i className="icn_x"/></span> : null}

                {resultData.category.id == 0 ? null :
                    <span className="item" key="o1" onClick={this.handleDel.bind(this, 2)}>
                {resultData.category.name}<i className="icn_x"/></span>}

                {resultData.price.id == 0 ? null :
                    <span className="item" key="i1" onClick={this.handleDel.bind(this, 3)}>
                {'价格:' + resultData.price.name}<i className="icn_x"/></span>}

                {resultData.read.id == 0 ? null :
                    <span className="item" key="u1" onClick={this.handleDel.bind(this, 4)}>
                {'阅读:' + resultData.read.name}<i className="icn_x"/></span>}

                {resultData.zan.id == 0 ? null : <span className="item" key="y1" onClick={this.handleDel.bind(this, 5)}>
                {'点赞:' + resultData.zan.name}<i className="icn_x"/></span>}

                {resultData.priceType.id == 0 ? null :
                    <span className="item" key="q1" onClick={this.handleDel.bind(this, 6)}>
                {'发布类型:' + resultData.priceType.name}<i className="icn_x"/></span>}
            </div>
        )
    }
}
export default Result;