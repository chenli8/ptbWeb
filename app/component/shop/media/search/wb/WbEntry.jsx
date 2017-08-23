import React from 'react'
import $ from 'jquery'
import Reflux from 'reflux'
import SearchAction from './SearchAction';
import SearchStore from './SearchStore';

import Menu from '../Menu';
import InputSearch from '../InputSearch';
import Filter from './Filter';
import Result from './Result';
import Sort from './Sort';
import Items from './Item';
import handleScroll from '../isScroll';

class WbEntry extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = SearchStore;
    }
    componentDidMount () {
        SearchAction.requestLabel({start: 0, end: 100, platType: 2});
        SearchAction.questSearch(0,20);
        handleScroll($("#list").offset().top,$(".thead"));
        document.onclick = this.handleDropHide;
    }
    handleSearch (keywords) {
        //搜索框回调
        SearchAction.handleSearch(keywords);
    }
    handleDropHide () {
        SearchAction.handleHideDropAll();
    }
    render () {
        let data = this.state.data;
        return (
            <div className="search">
                <div className="platformNav">
                    <Menu location={this.props.location}/>
                    <InputSearch keywords={data.result.key} onSearch={this.handleSearch}/>
                    <div className="cont">
                        <Filter/>
                    </div>
                </div>
                <div className="results">
                    <Result />
                    <Sort/>
                    <Items/>
                </div>
            </div>
        )
    }
}
export default WbEntry;