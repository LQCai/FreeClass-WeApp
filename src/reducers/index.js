import { combine, combineReducers } from 'redux';
import counter from './counter';
import classMenu from './classMenu';
import judgeRole from './judgeRole';
import openId from './openId';

export default combineReducers({
    counter,
    classMenu,
    judgeRole,
    openId,
})