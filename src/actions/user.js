import axios from '../apis';
import history from '../history';
import {
    SIGN_UP, 
    SIGN_IN, 
    SIGN_OUT, 
    CLEAR_AUTH, 
    GET_USER_PROFILE,
    UPDATE_USER_PROFILE,
    UPLOAD_USER_AVATAR, 
    CLEAR_USER_ERROR
} from './types';

export const signUp = formValues => async dispatch => {
    try {
        const response = await axios.post('/users', { ...formValues });
        dispatch({ type: SIGN_UP, payload: response.data });
        history.push('/');
    } catch (e) {
        dispatch({ type: SIGN_UP, payload: e.response.data });
    }
}

export const signIn = formValues => async dispatch => {
    try {
        const response = await axios.post('/users/login', { ...formValues });
        dispatch({ type: SIGN_IN, payload: response.data });
        history.push('/');
    } catch (e) {
        dispatch({ type: SIGN_IN, payload: e.response.data });
    }
}

export const signOut = token => async dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const response = await axios.post('/users/logout', {}, config);
        dispatch({ type: SIGN_OUT, payload: response.data });
        history.push('/');
    } catch (e) {
        dispatch({ type: SIGN_OUT, payload: e.response.data });
        history.push('/');
    }
}

export const getUserProfile = token => async dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const response = await axios.get('/users/me', config);
        dispatch({ type: GET_USER_PROFILE, payload: response.data });
    } catch (e) {
        dispatch({ type: CLEAR_AUTH });
        history.push('/');
    }
}

export const updateUserProfile = (formValues, token) => async (dispatch, getState) => {
    if(formValues.avatar && formValues.avatar.length > 0){
        await dispatch(uploadUserAvatar(formValues.avatar, token));
        if (getState().auth.error !== null) return;
        delete formValues.avatar;
    }

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const response = await axios.patch('/users/me', { ...formValues }, config);
        dispatch({ type: UPDATE_USER_PROFILE, payload: response.data });
    } catch (e) {
        dispatch({ type: UPDATE_USER_PROFILE, payload: e.response.data });
    }
}

export const uploadUserAvatar = (file, token) => async dispatch => {
    let fd = new FormData();
    fd.append('avatar',file[0]);

    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    };
    try {
        const response = await axios.post('/users/me/avatar', fd, config);
        dispatch({ type: UPLOAD_USER_AVATAR, payload: response.data });
    } catch (e) {
        dispatch({ type: UPLOAD_USER_AVATAR, payload: e.response.data });
    }
}

export const clearAuth = () => {
    return {
        type: CLEAR_AUTH
    }
}

export const clearUserError = () => {
    return {
        type: CLEAR_USER_ERROR
    }
}