import React from 'react'
class InputSearch extends React.Component {
    handleSearch() {
        this.props.onSearch(this.refs.keywords.value);
    }

    handleEnter(event) {
        if (event.which == 13) {
            this.handleSearch();
        }
    }

    render() {
        return (
            <div>
                   {/* <div key={this.props.keywords} className="inputSearch">
                         <input type="text" placeholder="请输入媒体名称" maxLength="50"
                         defaultValue={this.props.keywords} ref="keywords" onKeyUp={this.handleEnter.bind(this)}/>
                         <a href="javascript:;" onClick={this.handleSearch.bind(this)}>搜索</a>
                     </div>*/}
                    <div  key={this.props.keywords} className="searchInput inputSearch">
                        <input type="text" id="searchText" className="fl" placeholder="请输入媒体名称" maxLength="50"
                               defaultValue={this.props.keywords} ref="keywords" onKeyUp={this.handleEnter.bind(this)}/>
                        <a className="searchBtn fl theme-button-bg" onClick={this.handleSearch.bind(this)} href="javascript:;">搜索</a>
                    </div>
            </div>
        )
    }
}
export default InputSearch;