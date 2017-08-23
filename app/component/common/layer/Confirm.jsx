/**
 * Created by Kirk liu on 2017/8/12.
 */
import React from 'react';

class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false
        };
    }
    show(){
        this.setState({show:!this.state.show})
    }
    componentDidMount() {

    }

    render() {
        return (
            <div>
                {
                    this.state.show ?
                        <div className="layerModal confirm">
                            <div className="Modal">
                                <div className="head fl">
                                    <i className="fr ico-close" onClick={this.show.bind(this)}/>
                                </div>
                                <div className="content fl">
                                    <div className="cont">
                                        确认删除该服务商?
                                    </div>
                                    <div className="bottom">
                                        <a className="no theme-button-bg" onClick={this.show.bind(this)}>我再想想</a>
                                        <a className="ok theme-button-bg" onClick={()=>{
                                            this.props.callBack();
                                            this.show();
                                        }}>确定</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                        : null
                }
            </div>
        );
    }
}
export default Confirm;