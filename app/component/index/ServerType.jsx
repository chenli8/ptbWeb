/**
 * Created by Kirk liu on 2017/7/19.
 */
import React from 'react';
import serviceApi from '../../public/js/serviceApi';
import urlManager from '../../public/js/urlManager';

class ServerType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false
        };
    }

    getCategoryList() {
        serviceApi('aCategoryList', {type: 1}, (data) => {
            this.setState({loading: true, data: data.categoryList})
        }, () => {

        })
    }

    componentDidMount() {
        this.getCategoryList();
    }

    render() {
        let state = this.state;
        return (
            <div className="serverType">
                <div className="mainTitle">
                    主要服务类目
                    <i className="tabs"> </i>
                </div>
                <div className="serverCon">
                    {
                        state.loading ?
                            state.data.map((data, index) => {
                                if (index < 9) {
                                    return (
                                        <div className={"serverItem serverTitleSj" + (index%3)} key={data.categoryId}>
                                            <div className={"serverTitle  fl logo"+index}>
                                                <i className="titlefl fl"> </i>
                                                <div className="titles">
                                                    {data.categoryName}
                                                </div>
                                                <div className={"typeLogo" + index}>
                                                </div>
                                            </div>
                                            <div className="serverList fl">
                                                <ul>
                                                    {
                                                        data.children.map((childrenData, ichildrenIndex) => {
                                                            if (ichildrenIndex < 5) {
                                                                return (
                                                                    <li key={childrenData.categoryId}>
                                                                        <a href={
                                                                            urlManager.pService + '#/ShopService/?c1=' + data.categoryId + '&l1=' + data.level +
                                                                            '&c2=' + childrenData.categoryId + '&l2=' + childrenData.level
                                                                        }
                                                                        >{childrenData.categoryName}</a>
                                                                    </li>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </ul>
                                                <a href={
                                                    urlManager.pService + '#/ShopService/?c1=' + data.categoryId + '&l1=' + data.level
                                                } className="getMore fr"/>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}
export default ServerType;
