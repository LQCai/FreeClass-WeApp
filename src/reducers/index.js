import { combine, combineReducers } from 'redux';
import counter from './counter';
import classMenu from './classMenu';
import judgeRole from './judgeRole';
import user from './user';

export default combineReducers({
    counter,
    classMenu,
    judgeRole,
    user,
})