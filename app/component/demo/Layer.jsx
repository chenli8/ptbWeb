/**
 * Created by Kirk liu on 2017/7/17.
 */
import React from 'react';
import layer from './../../public/js/layer';

class Layer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div>弹出层</div>
                <a href="javascript:;" onClick={()=>{layer.msg('Hello World')}}>MSG</a>
                <a href="javascript:;" onClick={()=>{layer.loading.open()}}>Loading open</a>
                <a href="javascript:;" onClick={()=>{layer.loading.close()}}>Loading close</a>
            </div>
        );
    }
}
export default Layer;