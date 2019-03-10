import { combine, combineReducers } from 'redux';
import counter from './counter';
import classMenu from './classMenu';
import judgeRole from './judgeRole';

export default combineReducers({
    counter,
    classMenu,
    judgeRole,
})