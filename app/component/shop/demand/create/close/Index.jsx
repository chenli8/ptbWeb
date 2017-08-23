/**
 * Created by Kirk liu on 2017/7/24.
 */
import React from 'react';
import Nav from '../../common/Nav';
import Desc from '../../common/Desc';
import Supplier from '../../common/Supplier';
import serviceApi from '../../../../../public/js/serviceApi';
import layer from '../../../../../public/js/layer';
import urlManager from '../../../../../public/js/urlManager';
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            longing: false,
            data: []
        };

        this.requireId = this.props.match.params.id;
    }

    /*获取需求详情*/
    demandDetail() {
        serviceApi('aDemandDetail', {requireId: this.requireId}, (data) => {
            this.setState({longing: true, data: data})
        }, (data) => {
            layer.msg(data.message)
        })
    }

    demandDel() {
        serviceApi('aDemandDel', {requireId: this.requireId}, (data) => {
            layer.msg('删除成功', () => {
                window.location.href = urlManager.pBuyerCenter + '#/myDemand/BuyerDemandList';
            })
        }, (data) => {
            layer.msg(data.message)
        })
    }

    copyDemand() {
        window.location.href = urlManager.pDemandCreate + '#/step1/' + this.requireId + '/1'
    }

    componentDidMount() {
        this.demandDetail()
    }

    render() {
        let state = this.state;
        let data = state.data;
        return (
            <div>
                <Nav name="需求详情"/>
                {
                    state.longing ?
                        <div className="container">
                            <div className="Review">
                                <div className="head">
                                    <i className="ico-demand-close fl"/>
                                    <a href="javascript:;" className="fr theme-button-bg" onClick={this.copyDemand.bind(this)}>复制需求</a>
                                    <a href="javascript:;" className="fr changeBtn" onClick={this.demandDel.bind(this)}>删除需求</a>
                                </div>
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