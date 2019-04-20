import { combine, combineReducers } from 'redux';
import counter from './counter';
import classMenu from './classMenu';
import judgeRole from './judgeRole';
import user from './user';
import classInfo from './classInfo';

export default combineReducers({
    counter,
    classMenu,
    judgeRole,
    user,
    classInfo
});