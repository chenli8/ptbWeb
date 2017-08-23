/**
 * Created by Kirk liu on 2017/7/26.
 */
import React from 'react';
import serviceApi from '../../../../public/js/serviceApi';
import layer from '../../../../public/js/layer';
import FileUpLoad from './../common/FileUpLoad';

class Supplement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tips: false,
            show: false,
            requireDesc: ''
        };
    }

    show() {
        this.setState({show: !this.state.show})
    }

    demandUpdate() {
        let state = this.state;
        let requireDesc = state.requireDesc.trim();
        if (requireDesc.length < 15) {
            layer.msg('描述不能少于15个字');
            return
        }
        let data = {
            requireId: this.props.requireId,
            requireDesc: requireDesc,
            requireAnnexList: this.refs.FileUpLoad.state.annexList
        };

        serviceApi('aDemandUpdate', data, () => {
            layer.msg('更新成功', () => {
                window.location.reload();
            })
        }, (data) => {
            layer.msg(data.message)
        })
    }

    componentDidMount() {

    }

    render() {
        let state = this.state;
        let data = this.props.data;
        return (
            <div>
                {
                    state.show ?
                        <div className="layerModal">
                            <div className="Modal">
                                <div className="head">
                                    <div className="title fl">补充需求</div>
                                    <i className="ico-close fr" onClick={this.show.bind(this)}/>
                                </div>
                                <div className="cont" style={{display: !state.tips ? 'block' : 'none'}}>
                                    <div className="top">需求发布后可进行2次补充说明需求 / <span style={{color: 'red'}}>剩余{data.requireRemainNum}次</span>
                                    </div>
                                    <div className="md">
                                        <textarea onInput={(e) => {
                                            this.setState({requireDesc: e.target.value})
                                        }}/>
                                    </div>
                                    <div className="bottom">
                                        <FileUpLoad ref="FileUpLoad"/>
                                    </div>
                                    <div className="submit">
                                        <a href="javascript:;" className="theme-button-bg fr ok" onClick={() => {
                                            this.setState({tips: true})
                                        }}>确认提交</a>
                                    </div>
                                </div>
                                <div className="cont" style={{display: state.tips ? 'block' : 'none'}}>
                                    <div className="tips">
                                        补充需求一旦提交后不可更改，是否确认提交？
                                    </div>
                                    <div className="submit">
                                        <a href="javascript:;" className="theme-button-bg fr ok"
                                           onClick={this.demandUpdate.bind(this)}>确认提交</a>
                                        <a href="javascript:;" className="fr back" onClick={() => {
                                            this.setState({tips: false})
                                        }}>返回修改</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        null
                }
            </div>

        );
    }
}
export default Supplement;