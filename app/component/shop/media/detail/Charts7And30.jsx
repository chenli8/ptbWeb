/**
 * Created by Kirk liu on 2017/8/7.
 */
import React from 'react';
import Charts7 from './Charts7';
import Charts30 from './Charts30';

class Charts7And30 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCharts7And30: true,
            type: this.props.type,
            data: this.props.data,
            statistics: this.props.statistics,
            mbInfo: this.props.mbInfo
        };
    }

    isCharts7And30(type) {
        type ? this.setState({isCharts7And30: true}) : this.setState({isCharts7And30: false})
    }

    componentDidMount() {

    }

    render() {
        let state = this.state;
        return (
            <div className="data7And30">
                <div className="Charts7And30 fl">
                    <div className="tj7_30 fl">
                        <div className="fr">
                            <div className="fl tj7_30but">
                                <ul>
                                    <a href="javascript:;" onClick={this.isCharts7And30.bind(this,1)} className={state.isCharts7And30 ? "buttonOrange on" : "buttonGray"}>7日</a>
                                    <a href="javascript:;" onClick={this.isCharts7And30.bind(this,0)} className={state.isCharts7And30 ? "buttonGray" : "buttonOrange on"}>30日</a>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {
                        state.isCharts7And30 ?
                            <Charts7 data={state.data} type={state.type} statistics={state.statistics} mbInfo={state.mbInfo}/>
                            :
                            <Charts30 data={state.data} type={state.type} statistics={state.statistics} mbInfo={state.mbInfo}/>
                    }
                </div>
            </div>
        )
    }
}
export default Charts7And30;