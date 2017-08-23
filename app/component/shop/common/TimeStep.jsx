import React, {Component} from 'react';
import '../../../public/css/timeStep.css';

/**
 * 进度组件
 */
class TimeStep extends Component {

    constructor(props) {
        super(props)
        this.state = {
            timeStepList: this.props.timeData,
        };
    }
    componentWillReceiveProps(nextProps) {
        this.state = {
            timeStepList: nextProps.timeData,
        };
        this.props = nextProps;
    }

    componentDidMount() {
        if(this.state.timeStepList.length == 0){
            this.setState({
                timeStepList:[
                    {title:"标题1", subTitle:"副标题1", status:0},
                    {title:"标题2", subTitle:"副标题2", status:0},
                    {title:"标题3", subTitle:"副标题3", status:0},
                    {title:"标题4", subTitle:"副标题4", status:0}
                ]});
        }
    }

    render() {
        let length = this.state.timeStepList.length;
        let percent = 100/length;
        return (
            <div className="timeStepContainer">
                <ul>
                    {this.state.timeStepList.map((item, index) => {
                        return  <li key={index} style={{width:percent+'%'}}>
                            <div className={item.status == 0 ? 'stepIco stepIco-n' : 'stepIco stepIco-s'}>{index+1}</div>
                            <div className="title">{item.title}</div>
                            <div className="subTitle">{item.subTitle}</div>
                            <div className={index == 0 ? 'hidden' : item.status == 0 ? 'line leftLine-n' : 'line leftLine-s'}></div>
                            <div className={index == length-1 ? 'hidden' : item.status == 0 ? 'line rightLine-n' : 'line rightLine-s'}></div>
                        </li>
                    })}
                </ul>
            </div>
        );
    }
}

export default TimeStep;
