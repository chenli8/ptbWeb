import React from 'react'
import $ from 'jquery'
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: this.props.currPage,
            totalNum: this.props.total
        };
    }

    handleClick(i) {
        if (this.state.pageIndex == i) return;
        if (this.props.isControlScrollPos) $(window).scrollTop($('.results').offset().top);
        this.handleState(i, this.props.total);
        this.props.onSearch((i - 1) * 20, (i - 1) * 20 + 20);
    }

    handlePrev(e) {
        if ($(e.target).hasClass('no')) return;
        this.handleClick(this.state.pageIndex - 1);
    }

    handleNext(e) {
        if ($(e.target).hasClass('no')) return;
        this.handleClick(this.state.pageIndex + 1);
    }

    componentWillReceiveProps(nextProps) {
        this.handleState(nextProps.currPage, nextProps.total);
    }

    handleState(pageIndex, total) {
        this.setState({pageIndex: pageIndex, totalNum: total});
    }

    handlePageList(pageTotal, currIndex) {
        if (pageTotal > 10) {
            if (currIndex >= (pageTotal - 3)) {
                return total - 9;
            } else if (currIndex <= 6) {
                return 1;
            } else {
                return currIndex - 5;
            }
        } else {
            return 1;
        }
    }

    render() {
        let arr = [], data = this.state,
            totalPage = Math.ceil(data.totalNum / 20),
            currPage = data.pageIndex,
            start = this.handlePageList(totalPage, currPage);
        for (let i = start; i <= Math.min(start + 9, totalPage); i++) {
            arr.push(<a key={i} className={currPage == i ? "curr" : ""}
                        onClick={this.handleClick.bind(this, i)} href="javascript:;">{i}</a>)
        }
        return (
            <div style={{textAlign: 'center'}}>
                <div id="wx-page" className="page clear" style={{display: 'inline-block'}}>
                    <a className={"prev" + (currPage == 1 ? ' no' : null) } onClick={this.handlePrev}
                       href="javascript:;">上一页</a>
                    {arr}
                    <a className={'next' + (currPage == 1 ? ' no' : null)} onClick={this.handleNext}
                       href="javascript:;">下一页</a>
                </div>
            </div>
        )
    }
}
Page.defaultProps = {
    isControlScrollPos: true
};
export default Page;