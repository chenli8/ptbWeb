/**
 * Created by Yhyu on 2017/7/18.
 */
import React, {Component} from 'react';

/**
 * 分页组件，参照 shop/demand/Index.jsx
 */
class Page extends Component {

    constructor(props) {
        super(props)
        this.onNewProps(props)
    }

    componentWillReceiveProps(nextProps) {
        this.onNewProps(nextProps)
    }

    onNewProps(props) {
        this.state = {
            totalNum: props.totalNum,
            pageSize: props.pageSize,
            current: props.start / props.pageSize + 1,
            editCurrentPage: props.start / props.pageSize + 1
        };
    }

    handlePageOnclick(page) {
        if(page=="...") return false;
        this.setState({
            current: page,
            editCurrentPage:page,
        });
        let start = (page - 1) * this.state.pageSize;
        this.props.onPageClick(start)
    }

    handlePreNextOnclick(step) {
        let page = this.state.current + step;
        if (page < 1) {
            return
        }
        let num = Math.ceil(this.state.totalNum / this.state.pageSize);
        if (page > num){
            return;
        }
        this.handlePageOnclick(page);
    }
    goCurrentPage(){
         let num = Math.ceil(this.state.totalNum / this.state.pageSize);
         let currentPage=this.refs.currentPage.value > num || this.refs.currentPage.value < 1 ?  null : this.refs.currentPage.value;
        if(!currentPage){
            return ;
        }else{
            this.handlePageOnclick(currentPage)
        }
    }
    render() {
        let THIS=this;
        //计算
        var state = this.state;
        //总页码

        var num = Math.ceil(state.totalNum / state.pageSize)

        var items = []

        if (num <= state.pageSize) {
            for (var i = 2; i <= num-1; i++) {
                items.push(i)
            }
        }
        if (num > state.pageSize) {
            var kkk = parseInt(state.current) + (state.pageSize/ 2) - 1;
            for (var i = 2; i <= state.pageSize; i++) {
                items.push(i)
            }
            if (kkk > state.pageSize) {
                items = [];
                if (kkk <= num) {
                    for (var i = kkk - state.pageSize + 1; i <= kkk; i++) {
                        items.push(i);
                        items[0]="...";
                    }
                }
                if (kkk > num) {
                    for (var i = num - state.pageSize + 1; i <= num; i++) {
                        items.push(i);
                        items[0]="...";
                    }
                }
            }
        }
        return (
            <div className="page">
                <div className="pageContent">
                    <ul className="fl">
                        <a className={state.current === 1 ? "PrevNextNo" : ''} href="javascript:;"
                           onClick={() => this.handlePreNextOnclick(-1)}>上一页</ a>
                        <a key={1} className={state.current === parseInt(1) ? "on" : '' } href="javascript:;"
                           onClick={() => this.handlePageOnclick(1)}>1</ a>
                        {
                            items.map((item, index) => {
                                if(item==num) return;
                                if(index>7 && item==items[items.length-1]){item='...'; };
                                return (
                                    <a key={index} className={
                                        state.current === parseInt(item) ?
                                            "on"  :
                                          item  == '...' ?
                                              "no"
                                            :
                                            ''
                                    } href="javascript:;"
                                       onClick={() => this.handlePageOnclick(item)}>{item}</a>
                                )
                            })
                        }
                        <a key={num} className={state.current === parseInt(num) ? "on" : '' } href="javascript:;"
                           onClick={() => this.handlePageOnclick(num)}>{num}</a>
                        <a className={state.current === num ? "PrevNextNo" : ''} href="javascript:;"
                           onClick={() => this.handlePreNextOnclick(1)}>下一页</a>
                    </ul>
                    <div className="jumpPage fl">
                        <div className="fl">共{num}页,到第
                            <input className="currentPage" ref="currentPage"  value={state.editCurrentPage}
                                                             onChange={function (e) {
                                                                 THIS.setState({editCurrentPage:e.target.value})
                                                             }}
                                                           />页</div>
                        <a href="javascript:;" className="fl redirectBtn" onClick={this.goCurrentPage.bind(this)}>跳转</a>
                    </div>
                </div>
            </div>
        );

    }
}

export default Page;