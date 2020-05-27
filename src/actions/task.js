import axios from '../apis';
import history from '../history';
import { 
    CREATE_TASK, 
    GET_TASK, 
    UPDATE_TASK,
    DELETE_TASK, 
    GET_ALL_TASKS, 
    CLEAR_TASK_ERROR, 
    CLEAR_ALL_TASKS,
    UPLOAD_TASK_IMAGE 
} from './types';

export const createTask = (formValues, token) => async dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const response = await axios.post('/tasks', { ...formValues }, config);
        if(formValues.taskImg && formValues.taskImg.length > 0){
            await dispatch(uploadTaskImg(formValues.taskImg, response.data._id, token));
        }
        dispatch({ type: CREATE_TASK, payload: response.data });
        history.push('/');
    } catch (e) {
        dispatch({ type: CREATE_TASK, payload: e.response.data });
    }
}

export const uploadTaskImg = (file, taskId, token) => async dispatch => {
    let fd = new FormData();
    fd.append('taskImg',file[0]);

    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    };
    try {
        const response = await axios.post(`/tasks/${taskId}/taskimg`, fd, config);
        dispatch({ type: UPLOAD_TASK_IMAGE, payload: response.data });
    } catch (e) {
        dispatch({ type: UPLOAD_TASK_IMAGE, payload: e.response.data });
    }
}

export const updateTask = (formValues, taskId, token) => async dispatch => {
    if(formValues.taskImg && formValues.taskImg.length > 0){
        await dispatch(uploadTaskImg(formValues.taskImg, taskId, token));
        delete formValues.taskImg;
    }

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const response = await axios.patch(`/tasks/${taskId}`, { ...formValues }, config);
        dispatch({ type: UPDATE_TASK, payload: response.data });
        history.push('/');
    } catch (e) {
        dispatch({ type: UPDATE_TASK, payload: e.response.data });
    }
}

export const getTask = (taskId, token) => async dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const response = await axios.get(`/tasks/${taskId}`, config);
        dispatch({ type: GET_TASK, payload: response.data });
    } catch (e) {
        dispatch({ type: GET_TASK, payload: e.response.data });
    }
}

export const deleteTask = (taskId, token) => async dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const response = await axios.delete(`/tasks/${taskId}`, config);
        dispatch({ type: DELETE_TASK, payload: response.data });
        
        history.push('/');
    } catch (e) {
        dispatch({ type: DELETE_TASK, payload: e.response.data });
    }
}

export const getAllTasks = (token) => async dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        // setTimeout(async () => {
        //     const response = await axios.get('/tasks?sortBy=createdAt:desc', config);
        //     dispatch({ type: GET_ALL_TASKS, payload: response.data });
        //     console.log('tasks fetched');
        // }, 10000);
        const response = await axios.get('/tasks?sortBy=createdAt:desc', config);
        dispatch({ type: GET_ALL_TASKS, payload: response.data });   
    } catch (e) {
        dispatch({ type: GET_ALL_TASKS, payload: e.response.data });
    }
}

export const clearTaskError = () => {
    return {
        type: CLEAR_TASK_ERROR
    }
}

export const clearAllTasks = () => {
    return {
        type: CLEAR_ALL_TASKS
    }
}