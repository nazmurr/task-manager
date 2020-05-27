// https://jsbin.com/capiyoyusa/1/edit?js,console
import _ from 'lodash';
import {
    CREATE_TASK,
    GET_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    GET_ALL_TASKS,
    CLEAR_TASK_ERROR,
    CLEAR_ALL_TASKS,
    UPLOAD_TASK_IMAGE
} from '../actions/types';

const INITIAL_STATE = {
    allTasks: {},
    tasksFetched: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_TASKS:
            return {...state, allTasks: _.mapKeys(action.payload, '_id'), tasksFetched: true};
        
        case CREATE_TASK:
            if (action.payload.error) return {...state, error: action.payload.error};
            else {
                let allTasks = { ...state.allTasks };
                allTasks = { ...allTasks, [action.payload._id]: action.payload };
                return { ...state, allTasks };
            }

        case UPDATE_TASK:
            if (action.payload.error) return {...state, error: action.payload.error};
            else {
                let allTasks = { ...state.allTasks };
                allTasks = { ...allTasks, [action.payload._id]: action.payload };
                return { ...state, allTasks };
            }
        
        case DELETE_TASK:
            const taskId = action.payload._id;
            return _.omit(state, [`allTasks.${taskId}`]);

        case GET_TASK:
            let allTasks = { ...state.allTasks };
            allTasks = { ...allTasks, [action.payload._id]: action.payload };
            return { ...state, allTasks };
  
        case CLEAR_TASK_ERROR:
            return {...state, error: null};
        
        case UPLOAD_TASK_IMAGE:
            return state;

        case CLEAR_ALL_TASKS:
            return {};

        default:
            return state;
    }
}