/**
 * Created by Kirk liu on 2017/7/24.
 */
import React from 'react';
class Name extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        };
    }

    componentDidMount() {

    }

    render() {
        let state = this.state;
        return (
            <input type="text" placeholder={this.props.placeholder} defaultValue={state.name}
                   className="DemandName" maxLength={30}
                   onInput={(e) => {
                       this.setState({name: e.target.value})
                   }}
            />
        );
    }
}
export default Name;