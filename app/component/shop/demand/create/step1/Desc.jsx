/**
 * Created by Kirk liu on 2017/7/24.
 */
import React from 'react';
class Desc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requireDesc: this.props.data.requireDesc || '',
            numTotal:this.props.data.requireDesc ? this.props.data.requireDesc.length : 0
        };
    }

    componentDidMount() {

    }

    render() {
        let state = this.state;
        return (
            <div className="textarea">
                <textarea className="Demanddesc" placeholder="详细的需求描述(不少15字)"
                          onInput={(e) => {
                              let val = e.target.value;
                              this.setState({requireDesc: e.target.value,numTotal:val.length})
                          }}
                          defaultValue={state.requireDesc}
                          maxLength={1000}
                />
                <span className="numTotal">{state.numTotal}/1000</span>
            </div>
        );
    }
}
export default Desc;