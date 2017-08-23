import React from 'react'
class OrderResult extends React.Component {

    constructor(props) {
        super(props);
        this.onNewProps(props)
    }

    componentWillReceiveProps(nextProps) {
        this.onNewProps(nextProps)
    }

    onNewProps(props) {
        this.state = {
            result: props.result,
        };
    }

    render() {
        return (

            <div className="orderResult fl">
                <div className="title">执行结果：</div>
                <div className="content">{this.state.result}</div>
            </div>
        );
    }
}
export default OrderResult;