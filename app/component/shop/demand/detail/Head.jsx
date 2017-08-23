/**
 * Created by Kirk liu on 2017/7/26.
 */
import React from 'react';
import cookie from 'react-cookie';
import layer from './../../../../public/js/layer';
import serviceApi from './../../../../public/js/serviceApi';
import Supplement from './Supplement';
class Head extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.requireId = this.props.requireId;
    }

    /*提前结束应答*/
    demandAnswerEnd() {
        serviceApi('aDemandEnd', {requireId: this.requireId}, (data) => {
            layer.msg('操作成功', () => {
                window.location.reload()
            })
        }, (data) => {
            layer.msg(data.message)
        })
    }

    componentDidMount() {

    }

    render() {
        let data = this.props.data;
        return (
            <div>
                {
                    data.userId == cookie.load('chatUid') ?
                        data.status == 2 ?
                            <div>
                                <div className="head">
                                    <i className="ico-demand-answer fl"/>
                                    <div className="fl">需求审核成功，等待服务商应答...</div>
                                    <a href="javascript:;"
                                       onClick={() => {
                                           if (data.requireRemainNum != 0) {
                                               this.refs.Supplement.show();
                                           } else {
                                               layer.msg('2次补充需求已经用完,不能再补充')
                                           }

                                       }}
                                       className="fr theme-button-bg">补充需求</a>
                                    <a href="javascript:;" className="fr changeBtn"
                                       onClick={this.demandAnswerEnd.bind(this)}>提前结束应答</a>
                                </div>
                                <Supplement ref="Supplement" requireId={this.requireId} data={data}/>
                            </div>
                            :
                            data.status == 3 ?
                                <div>
                                    <div className="head">
                                        <i className="ico-demand-over fl"/>
                                        <div className="fl">需求应答结束，还可后续进行签单...</div>
                                    </div>
                                </div>
                                :
                                null
                        :
                        null
                }
            </div>
        );
    }
}
export default Head;