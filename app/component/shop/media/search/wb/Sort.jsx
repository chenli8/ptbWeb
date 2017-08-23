import React from 'react'
import Reflux from 'reflux'
import SearchAction from './SearchAction.js'
import SearchStore from './SearchStore.js'
import SortType from '../SortType.jsx'

class Sort extends Reflux.Component {
    constructor(props){
        super(props);
        this.state = {}; // our store will add its own state to the component's
        this.store = SearchStore; // <- just assign the store class itself
    }
    handleSort(index) {
        if (index >= 7) {
            SearchAction.handleSort(index);
        } else {
            SearchAction.handleSort(index + 1);
        }
    }

    handleFilterCheck(currObj, event) {
        SearchAction.handleCheck(event.currentTarget.checked, currObj);
    }

    handleDrop(index, dropType) {
        SearchAction.handleDrop(index, dropType)
    }

    handleToggle(dropType) {
        SearchAction.handleToggle(dropType);
    }

    render() {
        let data = this.state.data;
        let sort = data.result.sort;
        let sortType = data.result.priceType.id, currTypeSort = null;

        switch (sortType) {
            case 0:
                currTypeSort = <SortType data={[{type: 7, name: '直发报价 低-高'},
                    {type: 8, name: '直发报价 高-低'},
                    {type: 9, name: '转发报价 低-高'},
                    {type: 10, name: '转发报价 高-低'},
                    {type: 11, name: '微任务直发报价 低-高'},
                    {type: 12, name: '微任务直发报价 高-低 '},
                    {type: 13, name: '微任务转发报价 低-高'},
                    {type: 14, name: '微任务转发报价 高-低'},
                ]} dropType="d9wb" onDrop={this.handleDrop}
                                         isDisplayed={data.dropDisplaySortType} onToggle={this.handleToggle}
                                         currIndex={data.result.sort} onSort={this.handleSort}/>;
                break;
            case 1:
                currTypeSort = <SortType data={[{type: 7, name: '直发报价 低-高'},
                    {type: 8, name: '直发报价 高-低'}
                ]} dropType="d9wb" onDrop={this.handleDrop}
                                         isDisplayed={data.dropDisplaySortType} onToggle={this.handleToggle}
                                         currIndex={data.result.sort} onSort={this.handleSort}/>;
                break;
            case 2:
                currTypeSort = <SortType data={[
                    {type: 9, name: '转发报价 低-高'},
                    {type: 10, name: '转发报价 高-低'}
                ]} dropType="d9wb" onDrop={this.handleDrop}
                                         isDisplayed={data.dropDisplaySortType} onToggle={this.handleToggle}
                                         currIndex={data.result.sort} onSort={this.handleSort}/>;
                break;
            case 3:
                currTypeSort = <SortType data={[
                    {type: 11, name: '微任务直发报价 低-高'},
                    {type: 12, name: '微任务直发报价 高-低 '}
                ]} dropType="d9wb" onDrop={this.handleDrop}
                                         isDisplayed={data.dropDisplaySortType} onToggle={this.handleToggle}
                                         currIndex={data.result.sort} onSort={this.handleSort}/>;
                break;
            case 4:
                currTypeSort = <SortType data={[
                    {type: 13, name: '微任务转发报价 低-高'},
                    {type: 14, name: '微任务转发报价 高-低'}
                ]} dropType="d9wb" onDrop={this.handleDrop}
                                         isDisplayed={data.dropDisplaySortType} onToggle={this.handleToggle}
                                         currIndex={data.result.sort} onSort={this.handleSort}/>;
                break;
        }
        return (
            <div className="sorting clear wx wbSort">
                <div className="fl">
                    <ul className="clear">
                        {/*<li className="fl">
                            <input type="checkbox" name="type" id="sellOwner"
                                   onChange={this.handleFilterCheck.bind(this, 1)}/>
                            <label htmlFor="sellOwner">有卖家</label>
                        </li>*/}
                        {/*<li className="fl">
                         <input type="checkbox" name="type" id="originOwner"
                         onChange={this.handleFilterCheck.bind(this, 2)}/>
                         <label htmlFor="originOwner">有原创</label>
                         </li>*/}
                        <li className="fl">
                            <input type="checkbox" name="type" id="authOwner"
                                   onChange={this.handleFilterCheck.bind(this, 3)}/>
                            <label htmlFor="authOwner">有认证</label>
                        </li>
                    </ul>
                </div>
                <div className="fr sortType" style={{paddingRight:0}}>
                    <span>排序方式：</span>
                    {/*, '卖家数'*/}
                    {
                        ['综合排序', '粉丝数', '转发数', '评论数', '点赞数'].map(function (data, index) {
                            return <a href="javascript:;" className={(index + 1) == sort ? "curr" : ''}
                                      onClick={this.handleSort.bind(this, index)} key={'efd' + index}>{data}</a>
                        }.bind(this))
                    }
                    {/*{currTypeSort}*/}
                </div>
            </div>
        )
    }
}
export default Sort;