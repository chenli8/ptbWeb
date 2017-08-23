/**
 * Created by Kirk liu on 2017/7/24.
 */
import React from 'react';
import cookie from 'react-cookie';
import serviceApi from '../../../public/js/serviceApi';
import layer from '../../../public/js/layer';


class Type extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oneShow: false,
            oneName: '',
            oneId: this.props.oneId || '',
            oneList: [],

            twoShow: false,
            twoName: '',
            twoId: this.props.twoId || '',
            twoList: [],

        };
    }

    categoryList() {
        let categoryList = 'aCategoryList';
        let data = {};
        if (this.props.type == 'service') {
            categoryList = 'aShopCategoryList';
            data.shopId = cookie.load('shopId');
        }
        serviceApi(categoryList, data, (data) => {
            let categoryList = data.categoryList;
            this.setState({oneList: categoryList});
            let oneId = this.state.oneId;
            let twoId = this.state.twoId;
            if (oneId) {
                categoryList.map((data) => {
                    if (oneId == data.categoryId) {
                        this.setState({oneName: data.categoryName});
                        if (twoId) {
                            data.children.map((childrenData) => {
                                if (twoId == childrenData.categoryId) {
                                    this.setState({twoName: childrenData.categoryName, twoList: data.children})
                                }
                            })
                        }
                    }
                })
            }

        }, (data) => {
            layer.msg(data.message)
        })
    }

    handleClickOther() {
        this.setState({oneShow: false, twoShow: false});
    }

    componentDidMount() {
        this.categoryList();
        document.onclick = this.handleClickOther.bind(this);//*其他地方*/
    }
    componentWillUnmount(){
        document.onclick = null;//*其他地方*/
    }
    render() {
        let state = this.state;
        return (
            <div>
                <div className="DemandType fl" onClick={(e) => {
                    e.stopPropagation() || e.nativeEvent.stopImmediatePropagation() || e.preventDefault();
                    this.setState({oneShow: !this.state.oneShow})
                }}>
                    <span className="fl">
                        {
                            state.oneName || '请选择您要的服务类型'
                        }
                    </span>
                    <i className="ico-arrow-down on fr"/>
                </div>
                {
                    state.oneList.length > 0 ?
                        <div className="list" style={{display: this.state.oneShow ? 'block' : 'none'}}>
                            <ul>
                                {
                                    state.oneList.map((data) => {
                                        return (
                                            <li key={data.categoryId}
                                                onClick={
                                                    () => {
                                                        this.setState({
                                                            oneId: data.categoryId,
                                                            oneName: data.categoryName,
                                                            oneShow: !this.state.oneShow,
                                                            twoList: [],
                                                            twoName: ''
                                                        }, () => {
                                                            this.setState({
                                                                twoList: data.children,
                                                            })
                                                        });
                                                    }
                                                }
                                            >{data.categoryName}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        :
                        null
                }


                <div>
                    <div className="DemandType fl" onClick={(e) => {
                        e.stopPropagation() || e.nativeEvent.stopImmediatePropagation() || e.preventDefault();
                        this.setState({twoShow: !this.state.twoShow})
                    }}>
                                <span className="fl">
                                    {
                                        state.twoName || '请选择您要的服务类型'
                                    }
                                </span>
                        <i className="ico-arrow-down on fr"/>
                    </div>
                    {
                        state.twoList.length > 0 ?
                            <div className="list"
                                 style={{display: this.state.twoShow ? 'block' : 'none', left: 415}}>
                                <ul>
                                    {
                                        state.twoList.map((data) => {
                                            return (
                                                <li key={data.categoryId}
                                                    onClick={
                                                        () => {
                                                            this.setState({
                                                                twoId: data.categoryId,
                                                                twoName: data.categoryName,
                                                                twoShow: !this.state.twoShow
                                                            });
                                                        }
                                                    }
                                                >{data.categoryName}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}
export default Type;