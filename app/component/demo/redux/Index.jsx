/**
 * Created by Kirk liu on 2017/7/17.
 */
import React, {Component} from 'react'

import {Provider, connect} from 'react-redux'
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
const middleware = [thunk];

class Index extends Component {
    render() {
        const {value, onIncreaseClick} = this.props;
        return (
            <div>
                <div>计数器:{value}</div>
                <a href="javascript:;" onClick={onIncreaseClick.bind(this,1)}> + </a>
                <a href="javascript:;" onClick={onIncreaseClick.bind(this,0)}> - </a>
            </div>
        );
    }
}
function counter(state = {count: 0}, action) {
    const count = state.count;
    switch (action.type) {
        case 'ADD':
            return {count: count + 1};
        case 'DEL':
            return {count: count - 1};
        default:
            return state;
    }
}
const store = createStore(counter, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(...middleware));
const mapStateToProps = (state) => {
    return {
        value: state.count
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIncreaseClick: (type) => type == 1 ? dispatch({type: 'ADD'}) : dispatch({type: 'DEL'})
    }
};
const IndexExport = connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);

const App = () => (
    <Provider store={store}>
        <IndexExport />
    </Provider>
);

export default App;