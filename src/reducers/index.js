import {combineReducers} from 'redux';
import authReducer from './authReducer';
import taskReducer from './taskReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    form: formReducer,
    auth: authReducer,
    tasks: taskReducer
});