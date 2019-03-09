import { combine, combineReducers } from 'redux';
import counter from './counter';
import classMenu from './classMenu';

export default combineReducers({
    counter,
    classMenu,
})