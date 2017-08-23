/**
 * Created by Kirk liu on 2017/8/17.
 */
import React, {Component} from 'react';
import $ from 'jquery';
export default (title) => (ComponentParam) => {
    return class HOC extends Component {
        constructor(props) {
            super(props);
            this.state = {
                show: false,
            }
        }

        show() {
            this.setState({show: !this.state.show}, () => {
                if (this.state.show) {
                    /*弹窗 自适应 str*/
                    let $modal = $('.layerModal .Modal');
                    let windowInnerHeight = window.innerHeight;
                    let modalHeight = $modal.height() + 100;
                    if (modalHeight < windowInnerHeight) {
                        $modal.css({top: (windowInnerHeight - modalHeight) / 2})
                    }
                    if (modalHeight > windowInnerHeight) {
                        $modal.css({top: 0,});
                        $modal.children('.contScroll').css({'height': windowInnerHeight - 54, 'overflow-y': 'scroll'})
                    }
                    /*弹窗 自适应 end*/
                }
            })
        }

        render() {
            let state = this.state;
            return (
                <div>
                    {
                        state.show ?
                            <div className="layerModal">
                                <div className="Modal">
                                    <div className="head">
                                        <div className="title fl">{title || '我是标题'}</div>
                                        <i className="ico-close fr" onClick={this.show.bind(this)}/>
                                    </div>
                                    <div className="contScroll">
                                        <ComponentParam {...this.props} show={this.show.bind(this)} />
                                    </div>
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            )
        }
    }
};