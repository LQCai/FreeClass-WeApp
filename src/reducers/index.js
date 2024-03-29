import { combine, combineReducers } from 'redux';
import counter from './counter';
import classMenu from './classMenu';
import judgeRole from './judgeRole';
import user from './user';
import classInfo from './classInfo';
import homework from './homework';
import attendance from './attendance';
import announce from './announce';
import detection from './detection';

export default combineReducers({
    counter,
    classMenu,
    judgeRole,
    user,
    classInfo,
    homework,
    attendance,
    announce,
    detection
});