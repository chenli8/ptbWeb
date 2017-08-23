/**
 * Created by Kirk liu on 2017/7/24.
 */
import React from 'react';

import Nav from '../common/Nav';
import TimeStep from '../../common/TimeStep';
import Desc from './../common/Desc';
import Supplier from '../common/Supplier';
import serviceApi from './../../../../public/js/serviceApi';
import layer from './../../../../public/js/layer';

import Head from './Head';

let timeStepList = [
    {position: 0, title: "发布需求", subTitle: "", status: 1},
    {position: 1, title: "需求审核", subTitle: "", status: 1},
    {position: 2, title: "匹配服务商", subTitle: "", status: 1},
    {position: 3, title: "选择服务商,签单", subTitle: "", status: 0}
];
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            longing: false,
            data: [],
            timeStepList: timeStepList
        };

        this.requireId = this.props.match.params.id;
    }

    /*获取需求详情*/
    demandDetail() {
        layer.loading.open();
        serviceApi('aDemandDetail', {requireId: this.requireId}, (data, systemDate) => {
            layer.loading.close();
            data.systemDate = systemDate;
            /* 1/待审核 2/应答中 3/已结束 4/已关闭 5/已删除 */
            if (data.status == 3) {
                timeStepList[3].status = 1;
            }
            this.setState({longing: true, data: data, timeStepList: timeStepList})
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        })
    }


    componentDidMount() {
        this.demandDetail()
    }

    render() {
        let state = this.state;
        let data = state.data;
        return (
            <div>
                <Nav name={timeStepList[2].title}/>
                <div className="BuyerStep">
                    <TimeStep timeData={state.timeStepList}/>
                </div>
                {
                    state.longing ?
                        <div className="container">
                            <div className="Review">
                                <Head data={data} requireId={this.requireId}/>
                                <Desc data={data}/>
                            </div>
                        </div>
                        : null
                }
                <Supplier data={data} requireId={this.requireId}/>
            </div>

        );
    }
}
export default Index;