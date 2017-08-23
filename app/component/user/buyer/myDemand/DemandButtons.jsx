import React, {Component} from 'react';
import serviceApi from "../../../../public/js/serviceApi";
import layer from "../../../../public/js/layer";
import urlManager from "../../../../public/js/urlManager";

class DemandButtons extends Component {

    constructor(props) {
        super(props)
        this.onNewProps(props)
    }

    componentWillReceiveProps(nextProps) {
        this.onNewProps(nextProps)
    }

    onNewProps(props) {
        this.state = {
            demandInfo: props.demandInfo,
        }
    }

    onClickBtn(type) {
        if (type == 1) {
            this.advanceComplete()
        } else if (type == 2) {
            this.cancelDemand()
        } else if (type == 3) {
            this.changeDemand()
        } else if (type == 4) {
            this.updateDemand()
        } else if (type == 5) {
            this.deleteDemand()
        }
    }

    advanceComplete(){
        var THIS = this;
        layer.loading.open();
        serviceApi('aDemandEnd', {requireId: this.state.demandInfo.id}, (data) => {
            layer.loading.close();
            layer.msg('结束成功');
            THIS.state.demandInfo.status = 4;
            THIS.props.onUpdate(THIS.state.demandInfo);
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        })
    }

    cancelDemand(){
        var THIS = this;
        layer.loading.open();
        serviceApi('aDemandClose', {requireId: this.state.demandInfo.id}, (data) => {
            layer.loading.close();
            layer.msg('取消成功');
            THIS.state.demandInfo.status = 4;
            THIS.props.onUpdate(THIS.state.demandInfo);
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        })
    }

    changeDemand(){
        window.location.href = urlManager.pDemandCreate + '#/Step1/' + this.state.demandInfo.id;
    }

    updateDemand(){
        window.location.href = urlManager.pDemandDetail + '#/' + this.state.demandInfo.id;
    }

    deleteDemand(){
        var THIS = this;
        layer.loading.open();
        serviceApi('aDemandDel', {requireId: this.state.demandInfo.id}, (data) => {
            layer.loading.close();
            layer.msg('删除成功');
            THIS.state.demandInfo.isDelete = true;
            THIS.props.onUpdate(THIS.state.demandInfo);
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        })
    }

    render() {
        return (
            <div className="demandButtons">
                {
                    this.state.demandInfo.status == 2 ?
                        <a href="javascript:;" className="advanceComplete" onClick={(type) => this.onClickBtn(1)}>提前结束应答</a>
                        :
                        null
                }
                {
                    this.state.demandInfo.status == 1 ?
                        <a href="javascript:;" className="changeDemand theme-button-bg" onClick={(type) => this.onClickBtn(2)}>取消需求</a>
                        :
                        null
                }
                {
                    this.state.demandInfo.status == 1 ?
                        <a href="javascript:;" className="changeDemand theme-button-bg" onClick={(type) => this.onClickBtn(3)}>修改需求</a>
                        :
                        null
                }
                {
                    this.state.demandInfo.status == 2 ?
                        <a href="javascript:;" className="updateDemand theme-button-bg" onClick={(type) => this.onClickBtn(4)}>更新需求</a>
                        :
                        null
                }
                {
                    this.state.demandInfo.status == 4 ?
                        <a href="javascript:;" className="deleteDemand" onClick={(type) => this.onClickBtn(5)}>删除需求</a>
                        :
                        null
                }
            </div>
        );
    }
}

export default DemandButtons;
